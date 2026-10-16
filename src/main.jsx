import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
const Analytics = () => null;
import { motion } from 'framer-motion';
import { 
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, Flower2, 
  Heart, Leaf, MapPin, Menu, Phone, Play, Sparkles, Stethoscope, Waves, X, MessageCircle, 
  Camera, Star, BadgeCheck, ShieldCheck, Ruler, Video, Building2, Calendar, 
  Compass, Bed, Pill, Activity, CheckCircle2, CreditCard, RefreshCw 
} from 'lucide-react';
import './styles.css';
import './sections.css';
import './portal.css';
import { TreatmentsPage, InsurancePage, HeightSessionPage } from './subpages.jsx';
import { LegalCompliancePage } from './LegalCompliancePage.jsx';
import { AboutUsPage } from './AboutUsPage.jsx';
import { BookAppointmentPage } from './BookAppointmentPage.jsx';
import { 
  SpecialitiesCompactSection, 
  HospitalBentoGridSection
} from './HospitalPortalSections.jsx';
import { FacilitiesPage } from './HospitalPages.jsx';
import { DoshaQuizPage } from './DoshaQuizPage.jsx';
import { AayuVaidyaAIPage } from './AayuVaidyaAIPage.jsx';
import { AayuVaidyaWidget } from './AayuVaidyaWidget.jsx';
import { SiteHeader, phonePrimary } from './SiteHeader.jsx';

const whatsappPhone = '+917758816074';

const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1300&q=85', label: 'THE WISDOM OF WELLNESS' },
  { image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1300&q=85', label: 'HEALING ROOTED IN NATURE' },
  { image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1300&q=85', label: 'CARE THAT GROWS WITH YOU' },
];

const instagramUrl = 'https://www.instagram.com/aayu_tatva/';

const patientReviews = [
  { name: 'Suhani Selote', initial: 'S', type: 'HEIGHT & GROWTH · GOOGLE REVIEW', text: '“My height was 151 cm. After two months of natural treatment and guidance, it had grown by 2.5 cm.”' },
  { name: 'Lucky', initial: 'L', type: 'SPINE & SCIATICA · GOOGLE REVIEW', text: '“Outstanding relief from chronic lumbar spine stiffness through authentic Panchakarma Kati Basti. Highly recommended! 👍👍”' },
  { name: 'Sangita Shrawankar', initial: 'S', type: 'PEDIATRIC CARE · GOOGLE REVIEW', text: '“After two months of treatment, my daughter’s height was 101 cm, up from 99 cm. Doctors are so supportive.”' },
  { name: 'Pooja Meshram', initial: 'P', type: 'WOMEN’S HEALTH · GOOGLE REVIEW', text: '“Dr. Sakshi Sonkusare is very gentle, knowledgeable, and empathetic. Best Ayurvedic hospital in Bhandara.”' },
  { name: 'Kalyani Hatwar', initial: 'K', type: 'BONE & GROWTH · GOOGLE REVIEW', text: '“My height was 153.5 cm; after one month, it was 154 cm. Truly effective natural therapy.”' },
  { name: 'Simran Besare', initial: 'S', type: 'PATIENT EXPERIENCE · GOOGLE REVIEW', text: '“The doctors explained the treatment clearly, and the hospital nursing staff were caring and supportive throughout.”' },
  { name: 'Shweta Pal', initial: 'S', type: 'CLINICAL CARE · GOOGLE REVIEW', text: '“Good result and genuine Ayurvedic guidance from Dr. Manish Yerpude. Very happy with the care. 👍👍”' },
  { name: 'Rahul Wanjari', initial: 'R', type: 'PANCHAKARMA · GOOGLE REVIEW', text: '“The Panchakarma therapy centre with teakwood Droni tables is top-class. Real relief for slip disc pain without surgery.”' },
];

function PatientReviewsAutoScroll({ reviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const current = reviews[currentIndex];

  return (
    <div 
      className="reviews-animated-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      style={{ maxWidth: '780px', margin: '0 auto', position: 'relative' }}
    >
      {/* Header controls: Review counter & manual navigation arrows (status badge hidden as requested) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: '#556353', fontWeight: '600', letterSpacing: '0.3px' }}>
            Review {currentIndex + 1} of {reviews.length}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            type="button" 
            onClick={handlePrev} 
            aria-label="Previous review"
            title="Previous review"
            style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #D8D2C4', background: '#FFFFFF', color: '#1C3B24', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            type="button" 
            onClick={handleNext} 
            aria-label="Next review"
            title="Next review"
            style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #D8D2C4', background: '#FFFFFF', color: '#1C3B24', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Animated Review Card */}
      <div style={{ minHeight: '220px', position: 'relative' }}>
        <motion.article 
          key={currentIndex}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ 
            background: '#FFFFFF', 
            border: '1px solid #E2DCD2', 
            borderRadius: '16px', 
            padding: 'clamp(20px, 4vw, 32px)', 
            display: 'flex', 
            flexDirection: 'column',
            boxShadow: '0 8px 30px rgba(28, 59, 36, 0.06)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle animated progress bar for 3-second interval */}
          {!isPaused && (
            <motion.div 
              key={`progress-${currentIndex}`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'linear' }}
              style={{ position: 'absolute', top: 0, left: 0, height: '3px', background: '#D4A373' }}
            />
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.9px', color: '#9B784E', background: '#F8F5EE', padding: '4px 11px', borderRadius: '20px' }}>
              {current.type}
            </span>
            <div style={{ display: 'flex', gap: '3px', color: '#D4A373' }}>
              {[...Array(5)].map((_, s) => <Star key={s} size={14} fill="#D4A373" />)}
            </div>
          </div>

          <p style={{ fontSize: 'clamp(14.5px, 2.2vw, 17px)', lineHeight: '1.7', color: '#1E3524', margin: '0 0 20px', fontStyle: 'italic', fontFamily: 'Playfair Display, Georgia, serif' }}>
            {current.text}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #F0EAE1', paddingTop: '14px', marginTop: 'auto' }}>
            <span style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#EAF0E7', color: '#1C3B24', display: 'grid', placeItems: 'center', fontWeight: '700', fontSize: '14px' }}>
              {current.initial}
            </span>
            <div>
              <b style={{ display: 'block', fontSize: '13.5px', color: '#1C3B24' }}>{current.name}</b>
              <small style={{ fontSize: '10.5px', color: '#6A786A', fontWeight: '500' }}>Google Verified Patient</small>
            </div>
          </div>
        </motion.article>
      </div>

      {/* Pagination dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '18px' }} aria-label="Review pagination">
        {reviews.map((_, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to review ${idx + 1}`}
            style={{
              width: idx === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '99px',
              background: idx === currentIndex ? '#1C3B24' : '#D5CFC3',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0
            }}
          />
        ))}
      </div>
    </div>
  );
}

const clinicStories = [
  { reel: 'DTxZBDJjCjj', image: '/media/hospital-update.png', title: 'AayuTatva Reel', label: '21 JAN 2026' },
  { reel: 'DTP8HVhie2Z', image: '/media/sciatica-program.png', title: 'AayuTatva Reel', label: '08 JAN 2026' },
  { reel: 'DSfP7k_jOOt', image: '/media/growth-care.png', title: 'AayuTatva Reel', label: '20 DEC 2025' },
];

const reveal = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: [.22,1,.36,1] } } };

function App() {
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 4800);
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.replace('#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
    }
    return () => window.clearInterval(timer);
  }, []);

  return <>
    {/* Uniform Site Header */}
    <SiteHeader />

    <main id="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-copy">
          <motion.div initial="hidden" animate="show" variants={reveal} className="eyebrow">
            <span className="eyebrow-line"/> CARE, ROOTED IN NATURE
          </motion.div>
          <motion.h1 initial="hidden" animate="show" transition={{delay:.08}} variants={reveal}>
            Authentic Ayurvedic<br/>Healing Without<br/><em>Surgery.</em>
          </motion.h1>
          <motion.p className="hero-sub" initial="hidden" animate="show" transition={{delay:.16}} variants={reveal}>
            Experience personalized Panchakarma and rooted natural clinical treatments directed by <strong>Dr. Manish Santosh Yerpude</strong> at AayuTatva Hospital.
          </motion.p>
          <motion.div className="hero-actions" initial="hidden" animate="show" transition={{delay:.22}} variants={reveal}>
            <a className="btn-primary" href="/book-appointment.html">Book consultation <ArrowUpRight size={16}/></a>
            <a className="btn-text" href="#specialities">Our specialities <ArrowRight size={17}/></a>
          </motion.div>

          {/* NABH Approved & Cashless Insurance Mention */}
          <div className="nabh-cashless-banner">
            <div className="nabh-cashless-items">
              <div className="nabh-unit">
                <img src="/media/brands/nabh.png" alt="NABH Accredited" />
                <div className="nabh-text">
                  <small>Quality & Safety</small>
                  <b>NABH-Approved Hospital</b>
                </div>
              </div>
              <div className="nabh-unit">
                <div className="nabh-unit-icon"><ShieldCheck size={20}/></div>
                <div className="nabh-text">
                  <small>Mediclaim Pre-Auth</small>
                  <b>100% Cashless Insurance Accepted</b>
                </div>
              </div>
            </div>
            <a href="/insurance.html" className="under-link" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
              Insurance info <ArrowUpRight size={13}/>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <motion.div 
            key={heroSlide} 
            className="hero-image" 
            style={{backgroundImage:`url(${heroSlides[heroSlide].image})`}} 
            initial={{opacity:.25,scale:1.02}} 
            animate={{opacity:1,scale:1}} 
            transition={{duration:.7}}
          >
            <div className="image-wash"/>
            <div className="image-note">
              <span>{String(heroSlide+1).padStart(2,'0')} / 03</span>
              <i/> {heroSlides[heroSlide].label}
            </div>
          </motion.div>
          <div className="hero-dots" aria-label="Hero image controls">
            {heroSlides.map((slide,index)=>(
              <button 
                type="button" 
                key={slide.label} 
                className={index===heroSlide?'active':''} 
                onClick={()=>setHeroSlide(index)} 
                aria-label={`Show image ${index+1}`}
              />
            ))}
          </div>
          <div className="floating-seal">
            <span className="seal-icon"><Flower2 size={25}/></span>
            <span>Rooted in<br/><b>Ayurveda</b></span>
          </div>
          <div className="hero-caption">
            <span>BHANDARA, MAHARASHTRA</span>
            <span>21°10' N · 79°39' E</span>
          </div>
        </div>
        <a href="#clinical-ecosystem" className="scroll-cue"><span>EXPLORE CLINICAL CARE</span><ArrowDown size={14}/></a>
        <div className="hero-vertical">A PLACE TO PAUSE. A PRACTICE THAT LISTENS.</div>
      </section>

      {/* Bento Grid: Modular Clinical Ecosystem & Highlights */}
      <HospitalBentoGridSection />

      {/* Our Specialities: Fast 2- or 3-Column Scanning Layout */}
      <SpecialitiesCompactSection />

      {/* About AayuTatva Hospital Spotlight: Key Points Only */}
      <section className="intro section-pad" id="about" style={{ background: '#FAF8F4', borderBottom: '1px solid #ebe5da' }}>
        <div className="section-kicker">
          <span>ABOUT AAYUTATVA HOSPITAL & DOCTORS</span><i/>
        </div>
        <div className="intro-grid">
          <h2>
            Healing begins<br/>when <em>we listen.</em>
          </h2>
          <div className="intro-text">
            <p>
              At AayuTatva, ancient Ayurvedic wisdom meets dedicated, personal care. Directed by <strong>Dr. Manish Santosh Yerpude</strong> and <strong>Dr. Sakshi Sonkusare</strong>, our government-registered hospital provides authentic Panchakarma, non-surgical spine care, and 24/7 in-patient hospital facilities in Bhandara.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '16px' }}>
              <a href="/about.html" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <span>Learn More About Us & Our Doctors</span>
                <ArrowUpRight size={15}/>
              </a>
              <a href="/facilities.html" className="under-link" style={{ fontSize: '12px' }}>
                View Hospital & IPD Facilities <ArrowRight size={14}/>
              </a>
            </div>
          </div>
        </div>

        {/* Doctor Preview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '28px' }}>
          <a href="/about.html" style={{ background: '#fff', border: '1px solid #ebe5da', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', transition: 'all 0.2s ease', boxShadow: '0 2px 10px rgba(34,67,42,0.03)' }}>
            <img src="/media/dr-manish-yerpude.jpg" alt="Dr. Manish Yerpude" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <small style={{ fontSize: '9px', fontWeight: '700', color: '#98744e', letterSpacing: '0.8px', display: 'block' }}>FOUNDER & MEDICAL DIRECTOR</small>
              <h4 style={{ margin: '2px 0', fontSize: '15.5px', color: '#22432a', fontFamily: 'Playfair Display, serif' }}>Dr. Manish Santosh Yerpude</h4>
              <p style={{ margin: 0, fontSize: '11px', color: '#667364' }}>Spine, Sciatica & Panchakarma Specialist</p>
            </div>
          </a>

          <a href="/about.html" style={{ background: '#fff', border: '1px solid #ebe5da', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', transition: 'all 0.2s ease', boxShadow: '0 2px 10px rgba(34,67,42,0.03)' }}>
            <img src="/media/dr-sakshi-sonkusare.jpg" alt="Dr. Sakshi Sonkusare" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <small style={{ fontSize: '9px', fontWeight: '700', color: '#98744e', letterSpacing: '0.8px', display: 'block' }}>CONSULTING PHYSICIAN</small>
              <h4 style={{ margin: '2px 0', fontSize: '15.5px', color: '#22432a', fontFamily: 'Playfair Display, serif' }}>Dr. Sakshi G. Sonkusare</h4>
              <p style={{ margin: 0, fontSize: '11px', color: '#667364' }}>Women's Health, Skin & Cosmetology</p>
            </div>
          </a>
        </div>
      </section>

      {/* Patient Reviews Section */}
      <section className="reviews section-pad" id="reviews" style={{ background: '#f5f2ea' }}>
        <div className="reviews-heading">
          <div>
            <div className="section-kicker"><span>PATIENT EXPERIENCES</span><i/></div>
            <h2>Trusted by families<br/><em>across Vidarbha.</em></h2>
          </div>
          <div className="review-score">
            <strong>4.9</strong>
            <div>
              <div className="stars">
                {[...Array(5)].map((_,i)=><Star key={i} size={14}/>)}
              </div>
              <small>OVER 200+ GOOGLE REVIEWS</small>
            </div>
          </div>
        </div>

        <PatientReviewsAutoScroll reviews={patientReviews} />
      </section>

      {/* Book an Appointment Callout Banner: Clean & Fast */}
      <section className="section-pad" id="booking" style={{ background: '#22432a', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div className="section-kicker" style={{ justifyContent: 'center' }}>
            <span style={{ color: '#d8b688' }}>YOUR FIRST STEP TO HEALING</span><i style={{ background: '#d8b688' }}/>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: '#ffffff', margin: '14px 0 14px' }}>
            Let’s talk about <em>your wellbeing.</em>
          </h2>
          <p style={{ color: '#FFFFFF', fontSize: '15.5px', lineHeight: '1.8', maxWidth: '660px', margin: '0 auto 24px', fontWeight: '400' }}>
            <strong style={{ color: '#FEE5B5', fontWeight: '700' }}>Schedule an OPD doctor consultation</strong> with Dr. Manish Yerpude or Dr. Sakshi Sonkusare at our Bhandara clinic, view OPD timetables, or coordinate 100% cashless hospital in-patient admissions.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a 
              href="/book-appointment.html" 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '8px', 
                background: '#d8b688', color: '#18331d', padding: '13px 28px', 
                borderRadius: '30px', fontWeight: '700', fontSize: '13px', textDecoration: 'none' 
              }}
            >
              <Calendar size={16}/>
              <span>Book Appointment Online</span>
              <ArrowUpRight size={16}/>
            </a>
            <a 
              href={`tel:${phonePrimary}`} 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '8px', 
                background: 'rgba(255,255,255,0.12)', color: '#ffffff', padding: '13px 24px', 
                borderRadius: '30px', fontWeight: '600', fontSize: '13px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)' 
              }}
            >
              <Phone size={15}/> Call +91 77588 16074
            </a>
          </div>

          <div style={{ marginTop: '20px', fontSize: '11px', color: '#b9c7b7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span>✓ In-Clinic OPD (Mon–Sun)</span>
            <span>✓ ₹200 Consultation Fee (Pay Online / Counter)</span>
            <span>✓ 100% Cashless Mediclaim Desk</span>
          </div>
        </div>
      </section>

      {/* Hospital Campus Location Snippet */}
      <section className="visit-band" id="contact">
        <div className="visit-text">
          <span>WE’D LOVE TO WELCOME YOU</span>
          <h2>Find your way<br/><em>to feeling better.</em></h2>
          <a href="https://maps.google.com/?q=1st+Floor+Bawankar+Bhavan+Khat+Road+Bhandara+Maharashtra+441904" target="_blank" rel="noreferrer" className="map-link">
            <MapPin size={17}/> Get directions <ArrowUpRight size={15}/>
          </a>
        </div>
        <div className="visit-details">
          <div>
            <small>COME SEE US</small>
            <p>1st Floor, Bawankar Bhavan<br/>Khat Road, near Ganesh Marble<br/>Shiv Nagari, Bhandara<br/>Maharashtra 441904</p>
          </div>
          <div>
            <small>CONTACT PHONE</small>
            <p style={{ fontSize: '15px', fontWeight: '600' }}>
              <a href={`tel:${phonePrimary}`}>+91 77588 16074</a>
            </p>
            <small style={{ marginTop: '10px' }}>CONSULTATION HOURS</small>
            <p>Monday to Sunday<br/>10:00 AM – 8:00 PM</p>
          </div>
        </div>
        <div className="visit-decoration"><Flower2 size={145}/></div>
      </section>
    </main>

    {/* Footer: Phone updated strictly to 7758816074 */}
    <footer className="footer">
      <div className="footer-main">
        <a href="#home" className="brand footer-brand">
          <img className="brand-logo" src="/media/aayutatva-logo.png" alt="Dr. Yerpude’s AayuTatva Ayurved Hospital & Panchakarma Centre"/>
        </a>
        <p>Rooted in nature.<br/>Guided by care.</p>
        <div className="footer-phones">
          <a href={`tel:${phonePrimary}`}><Phone size={16}/> +91 77588 16074</a>
        </div>
        <a className="footer-book" href="/book-appointment.html">Book your consultation <ArrowUpRight size={16}/></a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 AayuTatva Ayurvedic Hospital & Panchakarma Centre</span>
        <span>DR. MANISH SANTOSH YERPUDE · BHANDARA</span>
        <a href="/about.html" style={{ color: '#d5aa7c', textDecoration: 'underline', fontSize: '11px' }}>
          About Us & Doctors
        </a>
        <a href="/privacy.html" style={{ color: '#d5aa7c', textDecoration: 'underline', fontSize: '11px' }}>
          Privacy Policy & Security Compliance
        </a>
        <a href="/terms.html" style={{ color: '#d5aa7c', textDecoration: 'underline', fontSize: '11px' }}>
          Hospital Terms & Refund Policy
        </a>
        <button 
          type="button" 
          onClick={() => window.dispatchEvent(new CustomEvent('open-height-admin'))} 
          style={{ background: 'none', border: 'none', color: '#d5aa7c', cursor: 'pointer', fontSize: '10px', textDecoration: 'underline' }}
        >
          📊 Staff: Patient Leads & Excel Export
        </button>
        <a href="#home">BACK TO TOP ↑</a>
      </div>
    </footer>

    {/* Global Floating AI Assistant Widget */}
    <AayuVaidyaWidget />
  </>;
}

function RootRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);

    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (anchor.getAttribute('target') || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) return;

      if (href.startsWith('#')) return;

      if (href.startsWith('/#')) {
        e.preventDefault();
        const hash = href.slice(2);
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
          window.history.pushState({}, '', href);
          setCurrentPath('/');
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      if (href.startsWith('/')) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setCurrentPath(window.location.pathname);
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const p = currentPath.replace(/\/$/, '') || '/';
  if (p === '/about.html' || p === '/about' || p === '/about-us.html' || p === '/about-us') {
    return <><AboutUsPage /><AayuVaidyaWidget /></>;
  }
  if (
    p === '/book-appointment.html' || p === '/book-appointment' || 
    p === '/appointment.html' || p === '/appointment' || 
    p === '/book.html' || p === '/book'
  ) {
    return <><BookAppointmentPage /><AayuVaidyaWidget /></>;
  }
  if (p === '/treatments.html' || p === '/treatments') return <><TreatmentsPage /><AayuVaidyaWidget /></>;
  if (p === '/insurance.html' || p === '/insurance') return <><InsurancePage /><AayuVaidyaWidget /></>;
  if (
    p === '/terms.html' || p === '/terms' ||
    p === '/privacy.html' || p === '/privacy' ||
    p === '/refund.html' || p === '/refund' ||
    p === '/compliance.html' || p === '/compliance' ||
    p === '/merchant-policy.html' || p === '/merchant-policy'
  ) return <><LegalCompliancePage /><AayuVaidyaWidget /></>;
  if (
    p === '/height-session.html' || p === '/height-session' ||
    p === '/height-growth.html' || p === '/height-growth' ||
    p === '/masterclass.html' || p === '/masterclass' ||
    p === '/height-campaign.html' || p === '/height-campaign'
  ) return <><HeightSessionPage /><AayuVaidyaWidget /></>;
  if (p === '/facilities.html' || p === '/facilities') return <><FacilitiesPage /><AayuVaidyaWidget /></>;
  if (
    p === '/vaidya-ai.html' || p === '/vaidya-ai' ||
    p === '/ayurveda-ai.html' || p === '/ayurveda-ai' ||
    p === '/ask-vaidya.html' || p === '/ask-vaidya' ||
    p === '/ai-assistant.html' || p === '/ai-assistant' ||
    p === '/faqs.html' || p === '/faqs' || p === '/faq.html' || p === '/faq'
  ) return <AayuVaidyaAIPage />;
  if (
    p === '/prakriti-quiz.html' || p === '/prakriti-quiz' || 
    p === '/prakriti.html' || p === '/prakriti' || 
    p === '/quiz.html' || p === '/quiz' || 
    p === '/dosha-quiz.html' || p === '/dosha-quiz' ||
    p === '/nadi-parikshan.html' || p === '/nadi-parikshan' ||
    p === '/evaluation.html' || p === '/evaluation'
  ) return <DoshaQuizPage />;
  return <App />;
}

createRoot(document.getElementById('root')).render(
  <>
    <RootRouter />
    <Analytics />
  </>
);
