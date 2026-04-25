import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import EyeExams from './pages/EyeExams'
import etoLogo from '../assets/ETO Logo 1.png'
import instagramIcon from '../assets/Instagram Logo.png'
import facebookIcon from '../assets/facebook.png'
import yelpIcon from '../assets/yelp.png'

const SITE_NOTICE = {
  enabled: true,
  id: 'closure-2026-05-18-2026-05-30',
  title: 'Closure Dates',
  message: (
    <>We will be closed <strong>Monday, May 18</strong> and <strong>Saturday, May 30, 2026</strong> for family events. We apologize for any inconvenience. Thank you for your understanding. - ETO</>
  ),
}

const SITE_NOTICE_STORAGE_KEY = 'eto.siteNotice.dismissed'

// Popup modal — shown once per session (not stored in localStorage)
const HOURS_POPUP = {
  enabled: true,
  title: 'Optometrist In Office',
  message: (
    <>We will be open <strong>Saturday May 9</strong> from <strong>8–5pm</strong> and <strong>Saturday May 16</strong> from <strong>9–3pm</strong>. Call to schedule an eye exam!</>
  ),
  phone: '(903)-878-2452',
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSiteNotice, setShowSiteNotice] = useState(false)
  const [showHoursPopup, setShowHoursPopup] = useState(HOURS_POPUP.enabled)

  useEffect(() => {
    if (!SITE_NOTICE.enabled) {
      return
    }

    const dismissedNoticeId = window.localStorage.getItem(SITE_NOTICE_STORAGE_KEY)
    if (dismissedNoticeId !== SITE_NOTICE.id) {
      setShowSiteNotice(true)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const closeSiteNotice = () => {
    setShowSiteNotice(false)
    window.localStorage.setItem(SITE_NOTICE_STORAGE_KEY, SITE_NOTICE.id)
  }

  return (
    <div className="site-shell">
      {showHoursPopup && (
        <div className="hours-popup-backdrop" role="presentation" onClick={() => setShowHoursPopup(false)}>
          <div className="hours-popup-modal" role="dialog" aria-modal="true" aria-labelledby="hours-popup-title" onClick={e => e.stopPropagation()}>
            <h2 id="hours-popup-title">{HOURS_POPUP.title}</h2>
            <p>{HOURS_POPUP.message}</p>
            {HOURS_POPUP.phone && (
              <a className="hours-popup-phone phone-link" href={`tel:+19038782451`}>{HOURS_POPUP.phone}</a>
            )}
            <button type="button" className="hours-popup-close" onClick={() => setShowHoursPopup(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
      <div className="sticky-header">
        <header className="topbar">
        <NavLink className="brand" to="/" end onClick={closeMobileMenu}>
          <img className="brand-logo" src={etoLogo} alt="East Texas Optical" />
        </NavLink>

        <button
          className={`menu-toggle${isMobileMenuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-primary-nav mobile-secondary-nav"
          onClick={toggleMobileMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="mobile-primary-nav" className={`nav nav-main${isMobileMenuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end onClick={closeMobileMenu}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={closeMobileMenu}>
            About
          </NavLink>
          <NavLink to="/services" onClick={closeMobileMenu}>
            Services
          </NavLink>
          <NavLink to="/contact" onClick={closeMobileMenu}>
            Contact
          </NavLink>
        </nav>

        <nav id="mobile-secondary-nav" className={`nav nav-cta${isMobileMenuOpen ? ' is-open' : ''}`} aria-label="Secondary navigation">
          <NavLink to="/eye-exams" onClick={closeMobileMenu}>
            Eye Exams
          </NavLink>
        </nav>
      </header>

        {showSiteNotice && (
          <div className="announcement-banner" role="region" aria-label="Site announcement">
            <p><strong>{SITE_NOTICE.title}:</strong> {SITE_NOTICE.message}</p>
            <button type="button" className="announcement-dismiss" onClick={closeSiteNotice} aria-label="Dismiss announcement">
              &times;
            </button>
          </div>
        )}
      </div>

      <main className="content-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/eye-exams" element={<EyeExams />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="footer" aria-label="East Texas Optical footer">
        <img className="footer-logo" src={etoLogo} alt="East Texas Optical logo" />
        <p className="footer-address">
          East Texas Optical
          <br />
          2476 West State Hwy 154
          <br />
          Quitman, TX 75783
        </p>
        <p className="footer-phone">
          <a className="phone-link footer-phone-link" href="tel:+19038782451">
            (903)-878-2451
          </a>
        </p>
        <p className="footer-language">Se habla español</p>

        <nav className="footer-social" aria-label="Social links">
          <a href="https://www.instagram.com/easttexasoptical/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/easttexasoptical/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://www.yelp.com/biz/east-texas-optical-quitman" target="_blank" rel="noreferrer" aria-label="Yelp">
            <img src={yelpIcon} alt="Yelp" />
          </a>
        </nav>

        <p className="footer-credit">Designed by Marie Liske</p>
      </footer>
    </div>
  )
}

export default App
