import iconRepair from '../../assets/repair-svgrepo-com 1.png'
import iconSameDay from '../../assets/person_heart_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 1.png'
import iconFrames from '../../assets/Group.png'
import iconLens from '../../assets/Vector (1).png'
import iconSunglasses from '../../assets/Group (1).png'
import iconLab from '../../assets/Group (2).png'
import brandCharmant from '../../assets/Charmant.png'
import brandEasyClip from '../../assets/EasyClip.png'
import brandSophiaLoren from '../../assets/Sophia Loren.png'
import brandEuropa from '../../assets/Europa.png'
import brandStetson from '../../assets/Stetson.png'


import { useEffect } from 'react';

const brandLogos = [
  { src: brandCharmant, alt: 'Charmant', isLineArt: true },
  { src: brandEasyClip, alt: 'EasyClip', isLineArt: true },
  { src: brandSophiaLoren, alt: 'Sophia Loren', isLineArt: true },
  { src: brandEuropa, alt: 'Europa' },
  { src: brandStetson, alt: 'Stetson' }
]

const serviceCards = [
  {
    icon: iconRepair,
    title: 'Repairs & Adjustments',
    text: 'Did you accidentally bend your frames out of whack or lose a screw? We can try to fix it! We will work with you to find the best solution!'
  },
  {
    icon: iconSameDay,
    title: 'Same Day Service',
    text: 'With a lab on-site and a wide variety of lenses, we offer same-day service on most prescriptions. No more waiting for weeks for your glasses!'
  },
  {
    icon: iconFrames,
    title: 'Frame Replacements',
    text: 'What if your frames break but your lenses are in good shape? We can insert your lenses into a new frame!'
  },
  {
    icon: iconLens,
    title: 'Lens Replacements',
    text: 'Love your old frames but your prescription changed? You can keep wearing your old glasses until we get your new lenses ready for you. We will cut them into your frame on-site!'
  },
  {
    icon: iconSunglasses,
    title: 'Sunglasses',
    text: 'Whether you need prescription or non-prescription lenses, we have got you covered. Choose from polarized options to reduce glare or tinted lenses for added comfort.'
  },
  {
    icon: iconLab,
    title: 'On-Site Lab',
    text: (
      <>
        With our independent optometrist on site, providing you with personalized and professional eye care, contacts and exams. To contact their office, call{' '}
        <a className="phone-link services-phone-link" href="tel:+19038782452">
          (903)-878-2452
        </a>
        .
      </>
    )
  }
]

function Services() {
  useEffect(() => {
    document.title = 'East Texas Optical | Services';
  }, []);
  return (
    <>
      <section className="services-hero" aria-label="Services hero">
        <h1>Services</h1>
      </section>

      <section className="services-offer" aria-label="Services we offer">
        <h2>Services We Offer</h2>
        <p className="services-subcopy">What we can do to help you see!</p>

        <div className="services-grid-cards">
          {serviceCards.map((item) => (
            <article className="service-tile" key={item.title}>
              <img src={item.icon} alt="" aria-hidden="true" className="service-icon" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-brands services-brands" aria-label="Featured Eyewear Brands">
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
    </>
  )
}

export default Services
