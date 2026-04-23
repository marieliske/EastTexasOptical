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
  message: 'We will be closed Monday, May 18 and Saturday, May 30, 2026 for family events. We apologize for any inconvenience. Thank you for your understanding. - ETO',
}

const SITE_NOTICE_STORAGE_KEY = 'eto.siteNotice.dismissed'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSiteNotice, setShowSiteNotice] = useState(false)

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
      {showSiteNotice && (
        <div className="site-notice-backdrop" role="presentation">
          <div className="site-notice-modal" role="dialog" aria-modal="true" aria-labelledby="site-notice-title">
            <h2 id="site-notice-title">{SITE_NOTICE.title}</h2>
            <p>{SITE_NOTICE.message}</p>
            <button type="button" className="site-notice-close" onClick={closeSiteNotice}>
              Got it
            </button>
          </div>
        </div>
      )}

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
