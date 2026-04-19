import { useEffect, useMemo, useState } from 'react'
import homeHeroImg from '../../assets/Home Hero IMG.png'
import homeReviewImg from '../../assets/Home IMG 1.png'
import iconBolt from '../../assets/bolt_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 1.png'
import iconPersonHeart from '../../assets/person_heart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 1.png'
import iconCheck from '../../assets/check_box_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 1.png'
import brandCharmant from '../../assets/Charmant.png'
import brandEasyClip from '../../assets/EasyClip.png'
import brandSophiaLoren from '../../assets/Sophia Loren.png'
import brandEuropa from '../../assets/Europa.png'
import brandStetson from '../../assets/Stetson.png'
import { Link } from 'react-router-dom'

const brandLogos = [
  { src: brandCharmant, alt: 'Charmant', isLineArt: true },
  { src: brandEasyClip, alt: 'EasyClip', isLineArt: true },
  { src: brandSophiaLoren, alt: 'Sophia Loren', isLineArt: true },
  { src: brandEuropa, alt: 'Europa' },
  { src: brandStetson, alt: 'Stetson' }
]

const dummyReviews = [
  {
    author: 'John Doe',
    rating: 5,
    title: 'Review Title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    author: 'Jane Doe',
    rating: 5,
    title: 'Review Title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis aute irure dolor in reprehenderit.'
  },
  {
    author: 'John Doe',
    rating: 5,
    title: 'Review Title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit.'
  },
  {
    author: 'Jane Doe',
    rating: 5,
    title: 'Review Title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  }
]

const mapGoogleReviewToCard = (review) => ({
  author: (review.author_name ? review.author_name.replace(/^.*?-\s*/, '') : 'Google User'),
  rating: Number(review.rating) || 5,
  title: 'Google Review',
  content: review.text ?? ''
})

function Home() {
    useEffect(() => {
      document.title = 'East Texas Optical';
    }, []);
  const [reviews, setReviews] = useState(dummyReviews)

  useEffect(() => {
    let isMounted = true

    const loadGoogleReviews = async () => {
      const baseUrl = import.meta.env.VITE_REVIEWS_API_URL || '/api/google-reviews'
      const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID

      if (!baseUrl) {
        return
      }

      const endpoint = new URL(baseUrl, window.location.origin)
      if (placeId) {
        endpoint.searchParams.set('placeId', placeId)
      }

      try {
        const response = await fetch(endpoint.toString())
        if (!response.ok) {
          return
        }

        const data = await response.json()

        if (isMounted && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(
            data.reviews
              .filter(r => typeof r.text === 'string' && r.text.trim().length > 0)
              .map(mapGoogleReviewToCard)
          )
        }
      } catch {
        // Keep dummy reviews as a user-safe fallback on API failures.
      }
    }

    loadGoogleReviews()

    return () => {
      isMounted = false
    }
  }, [])

  const reviewCarouselItems = useMemo(() => reviews.concat(reviews), [reviews])

  const writeReviewUrl =
    import.meta.env.VITE_GOOGLE_REVIEW_URL ||
    'https://www.google.com/maps/search/?api=1&query=East+Texas+Optical'

  return (
    <>
      <section className="home-hero" aria-label="East Texas Optical hero banner">
        <div className="hero-left">
          <h1>East Texas Optical</h1>
          <p>Proudly serving East Texas since 1977</p>
          <p>
            <a className="phone-link hero-phone-link" href="tel:+19038782451">
              (903)-878-2451
            </a>
          </p>
          <Link className="hero-cta" to="/contact">
            Visit Us
          </Link>
        </div>

        <div className="hero-right">
          <img className="hero-image" src={homeHeroImg} alt="East Texas Optical hero banner" />
        </div>
      </section>

      <section className="home-why" id="why-choose-eto">
        <h2>Why Choose ETO?</h2>
        <p>
          We are proud to offer a wide variety of frames at every price point to fit your budget! With our on-site lab, we can make most glasses same-day. Have questions or want more details? Call us and we'll be happy to assist!
        </p>

        <a className="services-cta" href="/services">
          View Our Services
        </a>

        <div className="feature-grid">
          <article className="feature-card">
            <img src={iconBolt} alt="On-site lab icon" className="feature-icon" />
            <h3>On-Site Lab</h3>
            <p>
              With our onsite lab, we take your glasses through every step of the process with precision, care and speed, often delivering them to you the very same day!
            </p>
          </article>

          <article className="feature-card">
            <img src={iconPersonHeart} alt="Personalized service icon" className="feature-icon" />
            <h3>Personalized Service</h3>
            <p>
              As a small hometown optical, we know our patients by name and provide the kind of personalized care and attention you won’t find at big chains.
            </p>
          </article>

          <article className="feature-card">
            <img src={iconCheck} alt="Flexibility icon" className="feature-icon" />
            <h3>Flexibility</h3>
            <p>
              For added convenience, we can re-use your favorite frames after inspection, giving you fresh lenses without giving up the look you love.
            </p>
          </article>
        </div>
      </section>

      <section className="home-brands" aria-label="Featured Eyewear Brands">
        <h2>Featured Eyewear Brands</h2>
        <div className="brands-carousel">
          <div className="brands-track">
            {brandLogos.concat(brandLogos).map((brand, index) => (
              <div className="brand-item" key={`${brand.alt}-${index}`}>
                <img className={brand.isLineArt ? 'brand-line-art' : ''} src={brand.src} alt={brand.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-reviews" aria-label="Reviews section">
        <div className="reviews-intro">
          <div className="reviews-photo-wrap">
            <img src={homeReviewImg} alt="Patient reviewing eyewear options at East Texas Optical" className="reviews-photo" />
          </div>

          <div className="reviews-copy">
            <h2>Reviews</h2>
            <p>
              We love to hear from our valued customers! See what our customers are saying about their experience with us, and if we&apos;ve had the pleasure of helping you, we&apos;d love for you to share your own review!
            </p>
          </div>
        </div>

        <div className="reviews-carousel-panel">
          <a className="reviews-write-btn" href={writeReviewUrl} target="_blank" rel="noreferrer">
            WRITE A REVIEW
          </a>

          <div className="reviews-carousel" aria-live="polite">
            <div className="reviews-track">
              {reviewCarouselItems.map((review, index) => (
                <article className="review-card" key={`${review.author}-${index}`}>
                  <h3>{review.author}</h3>
                  <p className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                    {'★'.repeat(Math.round(Math.min(Math.max(review.rating, 0), 5)))}
                    {'☆'.repeat(5 - Math.round(Math.min(Math.max(review.rating, 0), 5)))}
                  </p>
                  <h4>{review.title}</h4>
                  <p>{review.content}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
