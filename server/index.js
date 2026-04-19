import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const app = express()
const port = Number(process.env.PORT || 3001)

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const DEFAULT_PLACE_ID = process.env.GOOGLE_PLACE_ID
const toBoundedInt = (value, fallback, min, max) => {
  const parsed = Number.parseInt(String(value), 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(max, Math.max(min, parsed))
}

const cacheTtlMs = toBoundedInt(process.env.REVIEWS_CACHE_TTL_MS, 30 * 60 * 1000, 60 * 1000, 24 * 60 * 60 * 1000)
const cacheMaxEntries = toBoundedInt(process.env.REVIEWS_CACHE_MAX_ENTRIES, 20, 1, 200)
const rateWindowMs = toBoundedInt(process.env.REVIEWS_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000, 60 * 1000, 60 * 60 * 1000)
const rateMax = toBoundedInt(process.env.REVIEWS_RATE_LIMIT_MAX, 40, 5, 500)
const allowPlaceIdOverride = String(process.env.ALLOW_PLACE_ID_OVERRIDE || '').toLowerCase() === 'true'

const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)
)

const PLACE_ID_PATTERN = /^[A-Za-z0-9_-]{10,200}$/

if (!GOOGLE_API_KEY || !DEFAULT_PLACE_ID) {
  console.error('Missing required server env vars: GOOGLE_API_KEY and GOOGLE_PLACE_ID must be set')
  process.exit(1)
}

const reviewCache = new Map()

const pruneCache = (now) => {
  for (const [key, value] of reviewCache) {
    if (value.expiresAt <= now) {
      reviewCache.delete(key)
    }
  }

  while (reviewCache.size >= cacheMaxEntries) {
    const oldestKey = reviewCache.keys().next().value
    if (!oldestKey) break
    reviewCache.delete(oldestKey)
  }
}

app.set('trust proxy', 1)
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
)
app.use(express.json())
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true)
        return
      }

      if (allowedOrigins.has(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Origin not allowed'))
    }
  })
)

const reviewsLimiter = rateLimit({
  windowMs: rateWindowMs,
  max: rateMax,
  standardHeaders: true,
  legacyHeaders: false
})

const sanitizeReview = (review) => {
  const cleanText = String(review.text || '').replace(/\s+/g, ' ').trim()

  return {
    author_name: String(review.author_name || 'Google User'),
    rating: Number(review.rating) || 5,
    text: cleanText.slice(0, 800),
    relative_time_description: String(review.relative_time_description || ''),
    profile_photo_url: String(review.profile_photo_url || '')
  }
}

const fetchGooglePlaceReviews = async (placeId) => {
  const endpoint = new URL('https://maps.googleapis.com/maps/api/place/details/json')
  endpoint.searchParams.set('place_id', placeId)
  endpoint.searchParams.set('fields', 'name,rating,user_ratings_total,reviews')
  endpoint.searchParams.set('reviews_sort', 'newest')
  endpoint.searchParams.set('key', GOOGLE_API_KEY)

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Google Places request failed with status ${response.status}`)
  }

  const payload = await response.json()

  if (payload.status !== 'OK') {
    const details = payload.error_message || payload.status || 'Unknown Places API error'
    throw new Error(`Places API error: ${details}`)
  }

  const result = payload.result || {}
  const reviews = Array.isArray(result.reviews) ? result.reviews : []

  return {
    reviews: reviews.map(sanitizeReview),
    place: {
      name: String(result.name || ''),
      rating: Number(result.rating) || null,
      user_ratings_total: Number(result.user_ratings_total) || null
    }
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/google-reviews', reviewsLimiter, async (req, res) => {
  try {
    const requestedPlaceId = String(req.query.placeId || '').trim()
    let placeId = String(DEFAULT_PLACE_ID || '').trim()

    if (allowPlaceIdOverride && requestedPlaceId) {
      if (!PLACE_ID_PATTERN.test(requestedPlaceId)) {
        res.status(400).json({ error: 'Invalid placeId format' })
        return
      }
      placeId = requestedPlaceId
    }

    if (!placeId) {
      res.status(500).json({ error: 'GOOGLE_PLACE_ID is not configured on server' })
      return
    }

    const cacheKey = `reviews:${placeId}`
    const now = Date.now()
    const cached = reviewCache.get(cacheKey)

    if (cached && cached.expiresAt > now) {
      res.json({ ...cached.data, cached: true })
      return
    }

    const data = await fetchGooglePlaceReviews(placeId)
    pruneCache(now)
    reviewCache.set(cacheKey, {
      data,
      expiresAt: now + cacheTtlMs
    })

    res.json({ ...data, cached: false })
  } catch (error) {
    console.error('[google-reviews] request failed:', error)
    res.status(502).json({ error: 'Failed to fetch Google reviews' })
  }
})

app.listen(port, () => {
  console.log(`ETO reviews API listening on http://localhost:${port}`)
})
