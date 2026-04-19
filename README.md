# East Texas Optical

React + Vite website with:
- Google Reviews integration via secure backend proxy
- Google Maps integration on the Contact page

## Install

```bash
npm install
```

## Environment setup

1. Copy `.env.example` to `.env.local` for frontend development values.
2. Add backend values in your server environment (or `.env` when running API locally).

Required values:

Frontend:
- `VITE_REVIEWS_API_URL` (example: `http://localhost:3001/api/google-reviews`)
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_GOOGLE_MAPS_CENTER_LAT`
- `VITE_GOOGLE_MAPS_CENTER_LNG`
- `VITE_GOOGLE_REVIEW_URL` (optional write-review button URL)

Backend:
- `GOOGLE_API_KEY` (server-only)
- `GOOGLE_PLACE_ID`
- `ALLOWED_ORIGINS`

Optional backend tuning:
- `REVIEWS_CACHE_TTL_MS`
- `REVIEWS_CACHE_MAX_ENTRIES`
- `REVIEWS_RATE_LIMIT_WINDOW_MS`
- `REVIEWS_RATE_LIMIT_MAX`
- `ALLOW_PLACE_ID_OVERRIDE` (`false` by default; keep disabled for a single-business site)

Security note:
- Set `ALLOWED_ORIGINS` explicitly in production (for example: `https://easttexasoptical.com,https://www.easttexasoptical.com`).
- By default, the API serves the configured `GOOGLE_PLACE_ID` and ignores query-string place overrides.

## Run locally

Terminal 1 (frontend):

```bash
npm run dev
```

Terminal 2 (reviews API):

```bash
npm run api
```

## Build frontend

```bash
npm run build
npm run preview
```

## Production notes (Hostinger VPS)

1. Build and serve `dist` with Nginx as static files.
2. Run `server/index.js` with PM2 as your API process.
3. Reverse proxy `/api/*` to the Node API port (for example `3001`).
4. Restrict Google API keys:
	- Server key: Places API only + VPS IP restriction
	- Browser key: Maps JavaScript API only + domain referrer restriction
5. Do not expose `GOOGLE_API_KEY` in any `VITE_` variable.
