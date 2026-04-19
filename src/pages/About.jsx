import aboutHeroImg from '../../assets/About Us Hero.png'
import { useEffect } from 'react';
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

function About() {
    useEffect(() => {
      document.title = 'East Texas Optical | About Us';
    }, []);
  return (
    <>
      <section className="about-hero" aria-label="About East Texas Optical">
        <div className="about-hero-left">
          <h1>About Us</h1>
        </div>

        <div className="about-hero-right">
          <img src={aboutHeroImg} alt="Patients at East Texas Optical" className="about-hero-image" />
        </div>
      </section>

      <section className="about-story" aria-label="Our story">
        <h2>Your Local Opticians</h2>
        <p>
          With over 40 years of experience in the optical industry, Rich and Marisela Liske have been dedicated to servicing the East Texas community with unwavering commitment. Their mission is to provide the best possible eyewear solutions, ensuring every customer leaves with a product that perfectly matches their needs and lifestyle.
        </p>
        <p>
          At our practice, we understand that eyewear is not just about vision correction; it's about expressing your personality, enhancing your style, and protecting your eyes. We pride ourselves on offering a comprehensive selection of high-quality frames and lenses from leading brands to suit every taste and budget.
        </p>
        <p>
          Our loyal customers come from near and far, with many traveling from as far as the DFW metroplex to experience the personalized service and expert care that Rich and Marisela have become known for. Whether you need prescription glasses, sunglasses or specialized lenses, we ensure that every visit is tailored to meet your specific needs.
        </p>
        <Link className="about-visit-btn" to="/contact">
          VISIT US
        </Link>
      </section>

    </>
  )
}

export default About
