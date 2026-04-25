import contactHeroImg from '../../assets/Contact Us Her0.png'
import { Link } from 'react-router-dom'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useCallback } from 'react'

import { useEffect } from 'react';

const defaultCenter = {
  lat: Number(import.meta.env.VITE_GOOGLE_MAPS_CENTER_LAT || 32.7936),
  lng: Number(import.meta.env.VITE_GOOGLE_MAPS_CENTER_LNG || -95.4513)
}

const mapContainerStyle = {
  width: '100%',
  minHeight: '540px'
}

const LIBRARIES = ['marker']
const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID || 'DEMO_MAP_ID'

function Contact() {
    useEffect(() => {
      document.title = 'East Texas Optical | Contact';
    }, []);
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  const hasMapsApiKey = Boolean(mapsApiKey)

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'eto-google-map-script',
    googleMapsApiKey: mapsApiKey,
    libraries: LIBRARIES
  })

  const onMapLoad = useCallback((map) => {
    // Default marker only, no custom pin
    if (window.google?.maps?.marker?.AdvancedMarkerElement) {
      new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: defaultCenter,
        title: 'East Texas Optical'
      });
    }
  }, [])

  const mapContent = () => {
    if (!hasMapsApiKey) {
      return <p className="contact-map-status">Add VITE_GOOGLE_MAPS_API_KEY to show the live Google Map.</p>
    }

    if (loadError) {
      return <p className="contact-map-status">Google Map failed to load. Please try again shortly.</p>
    }

    if (!isLoaded) {
      return <p className="contact-map-status">Loading map...</p>
    }

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={14}
        onLoad={onMapLoad}
        options={{
          mapId: MAP_ID || undefined,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true
        }}
      />
    )
  }

  return (
    <>
      <section className="contact-hero" aria-label="Contact East Texas Optical">
        <div className="contact-hero-left">
          <h1>Contact</h1>
        </div>

        <div className="contact-hero-right">
          <img src={contactHeroImg} alt="East Texas Optical sign" className="contact-hero-image" />
        </div>
      </section>

      <section className="contact-info" aria-label="Contact details and office information">
        <div className="contact-info-left">
          <h2>Hours of Operation</h2>
          <p>
            <strong>Monday - Friday:</strong> 9am-5pm
          </p>
          <p>
            <strong>Saturday:</strong> Hours vary, please give us a call to find out the most accurate hours.
          </p>
          <p>
            <strong>Doctor Saturday:</strong> Hours vary call for details.
            <br />
            <strong>No Doctor Saturday:</strong> 9am - 12pm
          </p>
          <p>
            <strong>Sunday:</strong> Closed
          </p>

          <h3>East Texas Optical Phone</h3>
          <p>
            <a className="phone-link contact-phone-link" href="tel:+19038782451">
              (903)-878-2451
            </a>
          </p>

          <h3>Insurance Information</h3>
          <p>At this time, we unfortunately do not accept insurance for any eyewear services.</p>
        </div>

        <div className="contact-info-right">
          <h2>Optometrists Office</h2>

          <h3>Scheduling an Eye Exam</h3>
          <p>See our &ldquo;Eye Exams&rdquo; page for more information</p>
          <Link className="contact-eye-exams-btn" to="/eye-exams">
            Eye Exams
          </Link>

          <h3>Phone Hours</h3>
          <p>
            <strong>Monday - Friday:</strong> 9am-5pm
          </p>
          <p>
            <strong>Saturday:</strong> Hours vary, please give us a call to find out the most accurate hours.
          </p>
          <p>
            <strong>Sunday:</strong> Closed
          </p>

          <h3>Optometrist Office Phone</h3>
          <p>
            <a className="phone-link contact-phone-link" href="tel:+19038782452">
              (903)-878-2452
            </a>
          </p>
        </div>
      </section>

      <section className="contact-visit" aria-label="Visit us">
        <h2>Come Visit Us!</h2>
        <div className="contact-visit-address" aria-label="Office address">
          <address>
            <a
              className="address-link contact-address-link"
              href="https://www.google.com/maps/search/?api=1&query=2476+West+State+Hwy+154+Quitman+TX+75783"
              target="_blank"
              rel="noreferrer"
              aria-label="Open East Texas Optical address in Google Maps"
            >
              2476 West State Hwy 154
              <br />
              Quitman, TX 75783
            </a>
          </address>
        </div>
      </section>

      <section className="contact-map" aria-label="Map location">
        <div className="contact-map-placeholder">
          {mapContent()}
        </div>
      </section>
    </>
  )
}

export default Contact
