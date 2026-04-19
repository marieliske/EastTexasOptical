

import eyeExamImg from '../../assets/eye chart.png';
import { useEffect } from 'react';

function EyeExams() {
  useEffect(() => {
    document.title = 'East Texas Optical | Eye Exams';
  }, []);
  return (
    <>
      <section className="home-hero" aria-label="Eye Exams hero banner" style={{background: 'var(--deep-blue)'}}>
        <div className="hero-left">
          <h1>Eye Exams</h1>
          <p>Professional care for your vision.</p>
          <p>
            <a className="phone-link hero-phone-link" href="tel:+19038782452">
              (903)-878-2452
            </a>
          </p>
        </div>
        <div className="hero-right">
          <img className="hero-image" src={eyeExamImg} alt="Eye Exam Banner Img" />
        </div>
      </section>

      <section className="home-why">
        <h2 style={{color: 'var(--deep-blue)'}}>Comprehensive Exams by Independent Optometrists</h2>
        <p>
          We are proud to partner with independent optometrists who provide comprehensive eye exams on site. Our doctors maintain varying schedules, so give us a call for the most up-to-date information.
        </p>

        <div className="feature-grid" style={{marginTop: '3rem', marginBottom: '3rem'}}>
          <article className="feature-card">
            <h3>Personalized Care</h3>
            <p>
              Our optometrists take the time to understand your unique vision needs and provide recommendations tailored to you.
            </p>
          </article>
          <article className="feature-card">
            <h3>Thorough Exams</h3>
            <p>
              Exams include vision testing, prescription updates, and a full evaluation of your eye health.
            </p>
          </article>
          <article className="feature-card">
            <h3>Convenient Scheduling</h3>
            <p>
              To schedule an appointment, call us at <a href="tel:+19038782452" className="phone-link">(903)-878-2452</a>. Our staff will help you find a time that fits your schedule.
            </p>
          </article>
        </div>

        <div>
          <article>
            <h2 style={{color: 'var(--deep-blue)'}}>Insurance, Pricing & Exam Information</h2>
            <p>
              For insurance details, eye exam pricing, contact lens fittings, or information about the exam process, please give us a call. We are happy to provide clear, up-to-date information to help you prepare for your visit.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export default EyeExams
