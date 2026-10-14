import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
const Analytics = () => null;
import { motion } from 'framer-motion';
import { 
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, Flower2, 
  Heart, Leaf, MapPin, Menu, Phone, Play, Sparkles, Stethoscope, Waves, X, MessageCircle, 
  Camera, Star, BadgeCheck, ShieldCheck, Ruler, Video, Building2, Calendar, 
  Compass, Bed, Pill, Activity, CheckCircle2, CreditCard, RefreshCw 
} from 'lucide-react';
import { PaytmPaymentCard } from './HeightMasterclassCampaign.jsx';
import './styles.css';
import './sections.css';
import './portal.css';
import { TreatmentsPage, InsurancePage, HeightSessionPage } from './subpages.jsx';
import { LegalCompliancePage } from './LegalCompliancePage.jsx';
import { 
  SpecialitiesCompactSection, 
  DoctorsCardsMinimal,
  DoshaQuizTeaserSection 
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

const patientReviews=[
  {name:'Suhani Selote',initial:'S',type:'HEIGHT & GROWTH · GOOGLE REVIEW',text:'“My height was 151 cm. After two months, it had grown by 2.5 cm.”',translated:true},
  {name:'Sangita Shrawankar',initial:'S',type:'HEIGHT & GROWTH · GOOGLE REVIEW',text:'“After two months of treatment, my daughter’s height was 101 cm, up from 99 cm.”',translated:true},
  {name:'Kalyani Hatwar',initial:'K',type:'HEIGHT & GROWTH · GOOGLE REVIEW',text:'“My height was 153.5 cm; after one month, it was 154 cm.”',translated:true},
  {name:'Simran Besare',initial:'S',type:'PATIENT EXPERIENCE · GOOGLE REVIEW',text:'“The doctors explained the treatment clearly, and the staff were caring and supportive.”',translated:true},
  {name:'Shweta Pal',initial:'S',type:'PATIENT EXPERIENCE · GOOGLE REVIEW',text:'“Good result 👍👍”',translated:false},
  {name:'Lucky',initial:'L',type:'PATIENT EXPERIENCE · GOOGLE REVIEW',text:'“Good results 👍👍”',translated:false},
];

const clinicStories = [
  { reel: 'DTxZBDJjCjj', image: '/media/hospital-update.png', title: 'AayuTatva Reel', label: '21 JAN 2026' },
  { reel: 'DTP8HVhie2Z', image: '/media/sciatica-program.png', title: 'AayuTatva Reel', label: '08 JAN 2026' },
  { reel: 'DSfP7k_jOOt', image: '/media/growth-care.png', title: 'AayuTatva Reel', label: '20 DEC 2025' },
];

const reveal = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: [.22,1,.36,1] } } };

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', department: '', date: '', note: '' });
  const [payOnline, setPayOnline] = useState(true);
  const [bookingStep, setBookingStep] = useState(1); // 1 = Form, 2 = UPI QR & Pay, 3 = Confirmed
  const [bookingId, setBookingId] = useState('');
  const [upiRefInput, setUpiRefInput] = useState('');
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [formError, setFormError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.name || !form.phone || !form.department || !form.date) {
      setFormError('Please enter your full name, phone number, area of care, and preferred date.');
      return;
    }

    if (!payOnline) {
      // Pay at counter / Request via WhatsApp
      const bId = 'AAYU-DOC-' + Math.floor(100000 + Math.random() * 900000);
      setBookingId(bId);
      const message = [
        `*AayuTatva Ayurvedic Hospital — OPD Appointment Request*`,
        `Hello AayuTatva, I would like to request an in-clinic appointment (Pay at Counter).`,
        ``,
        `📋 *Booking ID:* ${bId}`,
        `👤 *Patient Name:* ${form.name}`,
        `📞 *Phone Number:* ${form.phone}`,
        `🌿 *Area of Care:* ${form.department}`,
        `📅 *Preferred Date:* ${form.date}`,
        `📝 *Notes:* ${form.note || 'None'}`,
        `💵 *Consultation Fee:* ₹200 (Pay at Clinic Counter)`,
        `⏳ *Payment Status:* Counter Payment Pending`,
        ``,
        `Kindly check doctor availability and confirm my appointment slot.`
      ].join('\n');
      const waUrl = `https://wa.me/917758816074?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setSubmitted(true);
      return;
    }

    // Pay with UPI - Move to Step 2 (Scan & Pay with UPI)
    const bId = 'AAYU-DOC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(bId);
    setBookingStep(2);
  };

  const handleUpiPaymentConfirm = async () => {
    setSubmittingBooking(true);
    const finalUpiRef = upiRefInput.trim() || ('UPI-' + Math.floor(100000 + Math.random() * 900000));
    const recordEntry = {
      id: bookingId,
      name: form.name,
      whatsapp: form.phone,
      department: form.department,
      date: form.date,
      note: form.note || '',
      fee: 200,
      upiRef: finalUpiRef,
      status: 'Paid ₹200 via UPI (Verification Pending)',
      submittedAt: new Date().toISOString(),
    };

    // Save to local storage and sync to sheet backend
    try {
      const existing = JSON.parse(localStorage.getItem('aayutatva_opd_bookings') || '[]');
      existing.unshift(recordEntry);
      localStorage.setItem('aayutatva_opd_bookings', JSON.stringify(existing));
    } catch (e) {}

    try {
      await fetch('/api/height-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: bookingId,
          name: form.name,
          whatsapp: form.phone,
          city: `OPD Care (${form.department} on ${form.date})`,
          age: 'Adult',
          gender: 'OPD',
          currentHeight: 'N/A',
          goal: form.note || `Doctor Consultation (${form.department})`,
          upiRef: finalUpiRef,
          fee: 200,
          status: 'Paid ₹200 via UPI (Verification Pending)',
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.warn('Backend sheet sync note:', e);
    }

    // WhatsApp redirection with form details, booking ID, payment status
    const message = [
      `*AayuTatva Ayurvedic Hospital — Doctor OPD Appointment*`,
      `Namaste Dr. Yerpude, I have paid the consultation fee of ₹200 via UPI.`,
      ``,
      `📋 *Booking ID:* ${bookingId}`,
      `👤 *Patient Name:* ${form.name}`,
      `📞 *Phone Number:* ${form.phone}`,
      `🌿 *Area of Care:* ${form.department}`,
      `📅 *Preferred Date:* ${form.date}`,
      `📝 *Notes:* ${form.note || 'None'}`,
      `💳 *Payment Method:* Direct Hospital UPI (7758816074@ybl)`,
      `🔢 *UPI UTR / Ref:* ${finalUpiRef}`,
      `✅ *Payment Status:* Paid ₹200 (Please check sheet and confirm)`,
      ``,
      `Kindly verify the payment in your sheet and send my appointment confirmation.`
    ].join('\n');

    const waUrl = `https://wa.me/917758816074?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (e) {}
    }, 600);

    setSubmittingBooking(false);
    setBookingStep(3);
    setSubmitted(true);
  };

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 4800);
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
            <a className="btn-primary" href="#booking">Book consultation <ArrowUpRight size={16}/></a>
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
        <a href="#specialities" className="scroll-cue"><span>EXPLORE SPECIALITIES</span><ArrowDown size={14}/></a>
        <div className="hero-vertical">A PLACE TO PAUSE. A PRACTICE THAT LISTENS.</div>
      </section>

      {/* Our Specialities: Smaller Cards / List for Faster Readability */}
      <SpecialitiesCompactSection />


      {/* Our Doctors in Clean Cards */}
      <DoctorsCardsMinimal />

      {/* Interactive Dosha & Nadi Pulse Quiz Teaser */}
      <DoshaQuizTeaserSection />

      {/* About Section: Approach, Vision/Mission & Look at Life at the Clinic */}
      <section className="intro section-pad" id="about">
        <motion.div className="section-kicker" initial="hidden" whileInView="show" viewport={{once:true}} variants={reveal}>
          <span>ABOUT AAYUTATVA HOSPITAL</span><i/>
        </motion.div>
        <div className="intro-grid">
          <motion.h2 initial="hidden" whileInView="show" viewport={{once:true}} variants={reveal}>
            Healing begins<br/>when <em>we listen.</em>
          </motion.h2>
          <motion.div className="intro-text" initial="hidden" whileInView="show" viewport={{once:true}} variants={reveal}>
            <p>Good care is never one-size-fits-all. At AayuTatva, ancient Ayurvedic wisdom meets considered, personal attention—so your path to feeling better can be your own.</p>
            <a href="#booking" className="under-link">Book a consultation <ArrowUpRight size={15}/></a>
          </motion.div>
        </div>
        <div className="values-row">
          <div><span>01</span><b>Rooted in tradition</b><p>Time-honoured Ayurvedic practices.</p></div>
          <div><span>02</span><b>Made personal</b><p>Care shaped around your needs.</p></div>
          <div><span>03</span><b>Here in Bhandara</b><p>A welcoming space, close to home.</p></div>
        </div>
      </section>

      <section className="vision-mission">
        <div className="vision-mission-head">
          <div className="section-kicker"><span>OUR PURPOSE</span><i/></div>
          <h2>Rooted in care.<br/><em>Guided by purpose.</em></h2>
        </div>
        <div className="vision-mission-grid">
          <article>
            <span>OUR VISION</span>
            <h3>Ayurveda, closer to home.</h3>
            <p>Make thoughtful, patient-centred Ayurvedic and Panchakarma care accessible to families in Bhandara and nearby communities.</p>
          </article>
          <article>
            <span>OUR MISSION</span>
            <h3>Listen first. Care personally.</h3>
            <p>Understand each person’s needs, offer individualized guidance, and support care with respect, clarity, and responsible clinical practice.</p>
          </article>
        </div>
      </section>

      {/* A Little Look at Life at the Clinic (Inside About Area) */}
      <section className="stories section-pad" id="clinic-life">
        <div className="stories-heading">
          <div>
            <div className="section-kicker"><span>CLINIC ENVIRONMENT & UPDATES</span><i/></div>
            <h2>A little look at<br/><em>life at the clinic.</em></h2>
          </div>
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="instagram-follow">
            <Camera size={17}/> Follow @aayu_tatva <ArrowUpRight size={15}/>
          </a>
        </div>
        <div className="stories-grid">
          {clinicStories.map((story,i)=>(
            <motion.a 
              href={`${instagramUrl}reel/${story.reel}/`} 
              target="_blank" 
              rel="noreferrer" 
              className="story-card" 
              key={story.reel} 
              initial={{opacity:0,y:22}} 
              whileInView={{opacity:1,y:0}} 
              viewport={{once:true,amount:.2}} 
              transition={{duration:.55,delay:i*.1}}
            >
              <div className="story-image">
                <img src={story.image} alt="AayuTatva clinic campaign"/>
                <span className="story-play"><Play size={18} fill="currentColor"/></span>
                <span className="story-label"><Camera size={12}/>{story.label}</span>
              </div>
              <div className="story-caption">
                <span>{story.title}<small>WATCH REEL · {story.label}</small></span>
                <ArrowUpRight size={16}/>
              </div>
            </motion.a>
          ))}
        </div>
        <p className="story-note">Select a story to watch the Reel on our Instagram profile.</p>
      </section>

      {/* Quote */}
      <section className="quote-band">
        <div className="quote-leaf"><Leaf size={22}/></div>
        <p>“The best way forward starts with<br/><em>a conversation, not a prescription.</em>”</p>
        <span>— THE AAYUTATVA WAY</span>
      </section>

      {/* Request An Appointment: Updated phone to 7758816074 */}
      <section className="booking section-pad" id="booking">
        <div className="booking-copy">
          <div className="section-kicker"><span>YOUR FIRST STEP</span><i/></div>
          <h2>Let’s talk about<br/><em>your wellbeing.</em></h2>
          <p>Tell us a little about what brings you here. Our team will be in touch to arrange a time that works for you.</p>
          <div className="booking-call">
            <span className="call-icon"><Phone size={18}/></span>
            <div>
              <small>PREFER TO CALL?</small>
              <a href={`tel:${phonePrimary}`}>+91 77588 16074 <ArrowUpRight size={14}/></a>
              <span className="pulse-label"><i/> WE’RE HERE TO HELP</span>
            </div>
          </div>
        </div>

        <motion.div className="form-card" initial="hidden" whileInView="show" viewport={{once:true}} variants={reveal}>
          {submitted ? (
            <div className="success-state">
              <span><Check size={26}/></span>
              <h3>Appointment Request Sent, {form.name || 'there'}.</h3>
              <p>Booking ID: <strong>{bookingId || 'AAYU-DOC'}</strong></p>
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#555' }}>
                We have recorded your details in our system and opened WhatsApp with your booking summary and payment status. We will verify the details in our sheet and send your confirmation!
              </p>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '320px' }}>
                <a
                  href={`https://wa.me/917758816074?text=${encodeURIComponent(`Hello Dr. Yerpude, I have submitted an OPD appointment booking. Booking ID: ${bookingId} (Name: ${form.name}, Phone: ${form.phone}, Department: ${form.department}). Please confirm!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
                >
                  <MessageCircle size={16}/>
                  <span>Open Clinic WhatsApp</span>
                </a>
                <button 
                  className="btn-text" 
                  style={{ justifyContent: 'center' }}
                  onClick={() => { setSubmitted(false); setBookingStep(1); }}
                >
                  Book another appointment <ArrowRight size={16}/>
                </button>
              </div>
            </div>
          ) : bookingStep === 2 ? (
            <div className="py-2 text-center">
              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#065f46', background: '#d1fae5', padding: '3px 10px', borderRadius: '99px', textTransform: 'uppercase' }}>
                  Step 2 of 2: Pay ₹200 via UPI
                </span>
                <h3 style={{ font: '500 20px "Playfair Display", serif', color: '#17331D', margin: '8px 0 4px' }}>
                  Scan & Pay ₹200 Consultation Fee
                </h3>
                <p style={{ fontSize: '11px', color: '#666', margin: 0 }}>
                  Booking ID: <strong style={{ color: '#17331D' }}>{bookingId}</strong> for {form.name} ({form.department})
                </p>
              </div>

              {/* Paytm UPI Standee QR Card */}
              <PaytmPaymentCard 
                upiId="7758816074@ybl"
                name="DR YERPUDES AYUTATVA"
                amount={200}
              />

              <div style={{ marginTop: '14px', background: '#f4efe6', border: '1px solid #e2cfb5', padding: '14px', borderRadius: '12px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', fontSize: '12px', color: '#17331D', marginBottom: '6px' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>Step 2: Confirm Payment & Update Sheet</span>
                </div>
                <p style={{ fontSize: '11px', color: '#555', lineHeight: '1.5', margin: '0 0 10px' }}>
                  Pay ₹200 via Paytm, GPay, PhonePe, or BHIM. Once payment is done, click below to update your details in our clinic Excel sheet and open WhatsApp with your booking details and payment status. We will check the payment status in our sheet and send confirmation!
                </p>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '600', color: '#17331D', display: 'block', marginBottom: '4px' }}>
                    UPI Transaction Ref / UTR No (Optional if available)
                  </label>
                  <input
                    type="text"
                    value={upiRefInput}
                    onChange={(e) => setUpiRefInput(e.target.value)}
                    placeholder="e.g. 427819384920 or last 4 digits"
                    style={{ width: '100%', height: '42px', minHeight: '42px', textAlign: 'center', fontFamily: 'monospace', fontSize: '12px', background: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    style={{ flex: '1', minHeight: '46px', background: '#e5e2da', border: 'none', borderRadius: '10px', fontSize: '12px', fontWeight: '600', color: '#444', cursor: 'pointer' }}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={submittingBooking}
                    onClick={handleUpiPaymentConfirm}
                    className="btn-primary"
                    style={{ flex: '2', minHeight: '46px', background: '#17331D', color: '#E7C697', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    {submittingBooking ? (
                      <>
                        <RefreshCw size={15} className="animate-spin" />
                        <span>Updating Sheet...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle size={16} color="#25D366" />
                        <span>I Have Paid ₹200 — Update Sheet & Open WhatsApp</span>
                      </>
                    )}
                  </button>
                </div>
                <p style={{ fontSize: '10px', color: '#78716c', textAlign: 'center', margin: '8px 0 0' }}>
                  📋 Details & Booking ID will update the clinic Excel sheet automatically.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="form-heading">
                <span>APPOINTMENT REQUEST</span>
                <span className="form-spark"><Sparkles size={17}/></span>
                <p>A few details, and we’ll take it from here.</p>
              </div>
              <form onSubmit={submit}>
                <label>Your name
                  <input name="name" value={form.name} onChange={update} placeholder="e.g. Priya Sharma" required autoComplete="name"/>
                </label>
                <div className="form-row">
                  <label>Phone number
                    <input type="tel" name="phone" value={form.phone} onChange={update} placeholder="+91 00000 00000" required autoComplete="tel" pattern="[+0-9 ()-]{10,}"/>
                  </label>
                  <label>Area of care
                    <span className="select-wrap">
                      <select name="department" value={form.department} onChange={update} required>
                        <option value="" disabled>Select an area</option>
                        <option>Joint & spine care</option>
                        <option>Panchakarma & Takradhara</option>
                        <option>Height & growth</option>
                        <option>Digestive health</option>
                        <option>Skin & scalp care</option>
                        <option>Women’s health & PCOD</option>
                        <option>Fertility & infertility</option>
                        <option>Diabetes management</option>
                        <option>Weight management</option>
                        <option>Hair & trichology</option>
                        <option>Garbha Sanskar</option>
                        <option>Not sure yet</option>
                      </select>
                      <ChevronDown size={16}/>
                    </span>
                  </label>
                </div>
                <label>Preferred date
                  <input type="date" name="date" value={form.date} onChange={update} min={new Date().toISOString().split('T')[0]} required/>
                </label>
                <label>Anything you’d like us to know? <span className="optional">OPTIONAL</span>
                  <textarea name="note" value={form.note} onChange={update} placeholder="Share a little about what brings you in…" rows="3"/>
                </label>

                {/* Booking & Payment Mode Selection */}
                <div style={{ marginTop: '12px', marginBottom: '14px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#17331D', display: 'block', marginBottom: '8px' }}>
                    Payment & Booking Mode
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => { setPayOnline(true); setFormError(''); }}
                      style={{
                        padding: '12px 10px',
                        minHeight: '52px',
                        borderRadius: '10px',
                        border: payOnline ? '2px solid #17331D' : '1px solid #dcd7ce',
                        background: payOnline ? '#f4efe6' : '#fff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '12px',
                        color: '#17331D',
                        fontWeight: payOnline ? '700' : '500',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <Sparkles size={16} color="#17331D" />
                        <span>Pay with UPI (₹200)</span>
                      </div>
                      <small style={{ color: '#059669', display: 'block', fontSize: '10.5px', fontWeight: '600' }}>⚡ Scan QR / Any UPI App</small>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setPayOnline(false); setFormError(''); }}
                      style={{
                        padding: '12px 10px',
                        minHeight: '52px',
                        borderRadius: '10px',
                        border: !payOnline ? '2px solid #17331D' : '1px solid #dcd7ce',
                        background: !payOnline ? '#f4efe6' : '#fff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '12px',
                        color: '#17331D',
                        fontWeight: !payOnline ? '700' : '500',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <Building2 size={16} color="#17331D" />
                        <span>Pay at Counter</span>
                      </div>
                      <small style={{ color: '#78716c', display: 'block', fontSize: '10.5px' }}>Request via WhatsApp</small>
                    </button>
                  </div>
                </div>

                {formError && (
                  <div style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '12px',
                    color: '#b91c1c',
                    fontWeight: '600',
                    lineHeight: '1.4'
                  }}>
                    ⚠️ {formError}
                  </div>
                )}

                {payOnline ? (
                  <button
                    type="submit"
                    className="btn-primary submit-btn"
                    style={{ background: '#17331D', color: '#E7C697', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <span>Proceed to Pay ₹200 via UPI</span>
                    <ArrowRight size={16}/>
                  </button>
                ) : (
                  <button type="submit" className="btn-primary submit-btn">
                    Request an appointment <ArrowUpRight size={16}/>
                  </button>
                )}

                <p className="privacy-note">
                  {payOnline 
                    ? '📲 Direct UPI Payment (Paytm, GPay, PhonePe). After payment, details & booking ID are logged in clinic sheet and sent to WhatsApp.'
                    : 'Submitting opens WhatsApp. Review the message and tap Send to contact the clinic.'}
                </p>
              </form>
            </>
          )}
        </motion.div>
      </section>

      {/* Contact Us: Updated phone to 7758816074 */}
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
        <a className="footer-book" href="#booking">Book your consultation <ArrowUpRight size={16}/></a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 AayuTatva Ayurvedic Hospital & Panchakarma Centre</span>
        <span>DR. MANISH SANTOSH YERPUDE · BHANDARA</span>
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
