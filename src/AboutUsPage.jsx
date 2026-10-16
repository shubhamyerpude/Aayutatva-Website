import React from 'react';
import { 
  ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck, CheckCircle2, 
  HeartPulse, Building2, Sparkles, Clock3, Phone, MessageCircle, 
  MapPin, Users, Award, Play, Camera, Bed, Flower2, Waves, Ruler
} from 'lucide-react';
import { SiteHeader, phonePrimary, whatsappPhone } from './SiteHeader.jsx';
import './subpages.css';
import './portal.css';

const instagramUrl = 'https://www.instagram.com/aayu_tatva/';

const clinicStories = [
  { reel: 'DTxZBDJjCjj', image: '/media/hospital-update.png', title: 'Hospital Registration & In-Patient Facility', label: '21 JAN 2026' },
  { reel: 'DTP8HVhie2Z', image: '/media/sciatica-program.png', title: 'Non-Surgical Spine & Sciatica Protocols', label: '08 JAN 2026' },
  { reel: 'DSfP7k_jOOt', image: '/media/growth-care.png', title: 'Pediatric Growth & Height Metabolism', label: '20 DEC 2025' },
];

export function AboutUsPage() {
  return (
    <div className="subpage">
      <SiteHeader breadcrumb="About Us" />

      <main>
        {/* 1. Hero Section */}
        <section className="sub-hero about-hero" style={{ background: '#f5f2e9', position: 'relative' }}>
          <a className="back-link" href="/"><ArrowLeft size={14}/> BACK TO HOME</a>
          <div className="sub-overline">ESTABLISHED AYURVEDIC HOSPITAL · BHANDARA, MAHARASHTRA</div>
          <h1 style={{ color: '#1f3e27' }}>
            Rooted in Classical Wisdom.<br/>
            <em>Guided by Compassionate Care.</em>
          </h1>
          <p style={{ color: '#4a5749', maxWidth: '640px', fontSize: '14px', lineHeight: '1.8' }}>
            AayuTatva Ayurvedic Hospital & Panchakarma Centre is a government-registered hospital in Bhandara providing authentic NABH-aligned in-patient (IPD) admissions, classical teakwood Droni Panchakarma therapies, and doctor-led non-surgical rehabilitation for chronic disorders.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '24px' }}>
            <a href="/book-appointment.html" className="sub-cta" style={{ background: '#22432a' }}>
              <span>Book Doctor Consultation</span>
              <ArrowUpRight size={16}/>
            </a>
            <a href={`tel:${phonePrimary}`} className="sub-secondary" style={{ color: '#22432a', fontWeight: '600' }}>
              <Phone size={15}/> Call Desk: +91 77588 16074
            </a>
          </div>

          <div className="nabh-badge" style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2dacb' }}>
            <ShieldCheck size={28} color="#22432a" />
            <span>
              <b style={{ color: '#22432a' }}>NABH ACCREDITED STANDARDS</b>
              <small style={{ color: '#687566' }}>15,000+ Patients Treated · 100% Cashless Mediclaim</small>
            </span>
          </div>
        </section>

        {/* 2. Philosophy & 3 Pillars Section */}
        <section className="section-pad" style={{ background: '#FAF8F4', borderBottom: '1px solid #ebe5da' }}>
          <div className="treatment-heading" style={{ marginBottom: '32px' }}>
            <div>
              <div className="section-kicker"><span>CLINICAL PHILOSOPHY</span><i/></div>
              <h2 style={{ color: '#22432a' }}>Healing begins when <em>we listen.</em></h2>
            </div>
            <p style={{ color: '#556353' }}>
              Good care is never one-size-fits-all. At AayuTatva, time-honoured Ayurvedic science from the classical Samhitas meets dedicated, personal attention—so your journey to complete wellness is tailored to your unique Prakriti.
            </p>
          </div>

          <div className="values-row" style={{ marginTop: '20px' }}>
            <div style={{ background: '#fff', border: '1px solid #ebe5da', borderRadius: '12px', padding: '24px' }}>
              <span style={{ color: '#98744e', fontWeight: '700', fontSize: '13px' }}>01</span>
              <b style={{ color: '#22432a', fontSize: '17px', display: 'block', margin: '8px 0 6px' }}>Rooted in Tradition</b>
              <p style={{ color: '#556353', fontSize: '12px', lineHeight: '1.65', margin: 0 }}>
                Authentic Panchakarma procedures using pure medicinal oils, classical Droni tables, and classical formulations without dilution or compromise.
              </p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #ebe5da', borderRadius: '12px', padding: '24px' }}>
              <span style={{ color: '#98744e', fontWeight: '700', fontSize: '13px' }}>02</span>
              <b style={{ color: '#22432a', fontSize: '17px', display: 'block', margin: '8px 0 6px' }}>Made Personal</b>
              <p style={{ color: '#556353', fontSize: '12px', lineHeight: '1.65', margin: 0 }}>
                Care shaped around your body’s unique doshic constitution (Vata, Pitta, Kapha), pulse rhythm (Nadi), metabolic Agni, and medical history.
              </p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #ebe5da', borderRadius: '12px', padding: '24px' }}>
              <span style={{ color: '#98744e', fontWeight: '700', fontSize: '13px' }}>03</span>
              <b style={{ color: '#22432a', fontSize: '17px', display: 'block', margin: '8px 0 6px' }}>Accessible in Bhandara</b>
              <p style={{ color: '#556353', fontSize: '12px', lineHeight: '1.65', margin: 0 }}>
                Full-fledged in-patient hospital beds, day-care suites, cashless insurance settlement, and continuous medical supervision close to home.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Medical Directors & Hospital Staff Showcase */}
        <section className="section-pad" style={{ background: '#f5f2ea', borderBottom: '1px solid #ebe5da' }}>
          <div className="treatment-heading" style={{ marginBottom: '32px' }}>
            <div>
              <div className="section-kicker"><span>LEADERSHIP & CLINICAL FACULTY</span><i/></div>
              <h2 style={{ color: '#22432a' }}>Our Doctors & <em>Hospital Staff.</em></h2>
            </div>
            <p style={{ color: '#556353' }}>
              Meet our registered Ayurvedic physicians, specialized Panchakarma therapists, and compassionate nursing team serving Bhandara and Vidarbha.
            </p>
          </div>

          <div className="about-staff-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))' }}>
            {/* Doctor 1: Dr. Manish Santosh Yerpude */}
            <article className="about-staff-card">
              <div className="about-staff-photo-wrap" style={{ height: '270px' }}>
                <img 
                  src="/media/dr-manish-yerpude.jpg" 
                  alt="Dr. Manish Santosh Yerpude - Medical Director" 
                  style={{ objectPosition: 'center 22%' }}
                />
                <span className="about-staff-status-badge">
                  <i/> OPD Available Mon–Sun
                </span>
              </div>
              <div className="about-staff-body">
                <span className="about-staff-role-chip">Medical Director & Founder</span>
                <h3 className="about-staff-name" style={{ fontSize: '20px' }}>Dr. Manish Santosh Yerpude</h3>
                <div className="about-staff-degree">B.A.M.S. (MUHS) · MD (AM) · P.G.P.P. Pune · Height Care Fellow</div>
                <div className="about-staff-reg">Maharashtra Council of Indian Medicine (MCIM Reg. I-117221-A)</div>
                <p className="about-staff-bio">
                  With over 15 years of clinical practice and more than 15,000 patients treated, Dr. Manish Yerpude specializes in non-surgical spine decompression, sciatica nerve pain protocols, classical Panchakarma detox, and pediatric bone-growth evaluations.
                </p>
                <div className="about-staff-tags">
                  <span>Spine & Sciatica</span>
                  <span>Katyavashya / Janu Basti</span>
                  <span>Pediatric Height</span>
                  <span>Authentic Panchakarma</span>
                </div>
                <a href="/book-appointment.html" className="about-staff-btn">
                  <span>Book Consultation with Dr. Manish</span>
                  <ArrowUpRight size={14}/>
                </a>
              </div>
            </article>

            {/* Doctor 2: Dr. Sakshi G. Sonkusare */}
            <article className="about-staff-card">
              <div className="about-staff-photo-wrap" style={{ height: '270px' }}>
                <img 
                  src="/media/dr-sakshi-sonkusare.jpg" 
                  alt="Dr. Sakshi Sonkusare - Consulting Ayurvedic Physician" 
                  style={{ objectPosition: 'center 20%' }}
                />
                <span className="about-staff-status-badge">
                  <i/> OPD Available Mon–Sat
                </span>
              </div>
              <div className="about-staff-body">
                <span className="about-staff-role-chip">Consulting Physician & Cosmetologist</span>
                <h3 className="about-staff-name" style={{ fontSize: '20px' }}>Dr. Sakshi G. Sonkusare</h3>
                <div className="about-staff-degree">B.A.M.S. (MUHS Nashik) · PGDCC (Clinical Cosmetology)</div>
                <div className="about-staff-reg">Maharashtra Council of Indian Medicine (MCIM Registered)</div>
                <p className="about-staff-bio">
                  Dr. Sakshi leads our Women’s Health, Classical Garbha Sanskar, and Skin/Trichology programs. She provides evidence-based Ayurvedic management for PCOD/PCOS, chronic psoriasis, hair loss, and digestive metabolic balance.
                </p>
                <div className="about-staff-tags">
                  <span>Women’s Health & PCOD</span>
                  <span>Garbha Sanskar</span>
                  <span>Chronic Skin & Psoriasis</span>
                  <span>Trichology</span>
                </div>
                <a href="/book-appointment.html" className="about-staff-btn">
                  <span>Book Consultation with Dr. Sakshi</span>
                  <ArrowUpRight size={14}/>
                </a>
              </div>
            </article>

            {/* Staff Card 3: Hospital Care Team */}
            <article className="about-staff-card">
              <div className="about-staff-photo-wrap" style={{ height: '270px', background: '#F8F5EE' }}>
                <img 
                  src="/media/hospital-care-team.png" 
                  alt="AayuTatva Ayurvedic Hospital In-Patient Facility & Clinical Care Staff" 
                  style={{ objectPosition: 'center top', objectFit: 'contain', width: '100%', height: '100%', padding: '6px' }}
                />
                <span className="about-staff-status-badge">
                  <i/> 24/7 Supervised Inpatient Care
                </span>
              </div>
              <div className="about-staff-body">
                <span className="about-staff-role-chip">Inpatient Nursing & Therapy Staff</span>
                <h3 className="about-staff-name" style={{ fontSize: '20px' }}>Hospital Care & Nursing Team</h3>
                <div className="about-staff-degree">NABH Aligned Quality Standards · Certified Panchakarma Therapists</div>
                <div className="about-staff-reg">Dedicated Day-Care & Multi-Day IPD Nursing Support</div>
                <p className="about-staff-bio">
                  Our trained clinical team includes experienced male and female Panchakarma technicians operating classical teakwood Droni chambers, round-the-clock nursing attendants, and dedicated hospital dietary staff preparing customized Ayurvedic Pathya meals.
                </p>
                <div className="about-staff-tags">
                  <span>24/7 IPD Nursing</span>
                  <span>Wooden Droni Therapies</span>
                  <span>Cashless Insurance TPA</span>
                  <span>Pathya Kitchen</span>
                </div>
                <a href="/facilities.html" className="about-staff-btn">
                  <span>Explore Inpatient Facilities</span>
                  <ArrowUpRight size={14}/>
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* 4. Purpose, Vision & Mission */}
        <section className="section-pad" style={{ background: '#FAF8F4', borderBottom: '1px solid #ebe5da' }}>
          <div className="treatment-heading" style={{ marginBottom: '32px' }}>
            <div>
              <div className="section-kicker"><span>OUR PURPOSE</span><i/></div>
              <h2 style={{ color: '#22432a' }}>Rooted in care. <em>Guided by purpose.</em></h2>
            </div>
            <p style={{ color: '#556353' }}>
              We believe ethical medicine prioritizes patient listening, gentle non-invasive protocols, and clinical rigor.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#fff', border: '1px solid #ebe5da', borderRadius: '14px', padding: '28px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '1.4px', fontWeight: '700', color: '#98744e', textTransform: 'uppercase' }}>
                OUR VISION
              </span>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: '#22432a', margin: '12px 0 8px' }}>
                Ayurveda, closer to home.
              </h3>
              <p style={{ color: '#556353', fontSize: '13px', lineHeight: '1.75', margin: 0 }}>
                To make high-quality, patient-centric Ayurvedic hospital care and classical Panchakarma accessible to families in Bhandara, Gondia, Nagpur, and rural Vidarbha—eliminating the need to travel hundreds of kilometres for credible non-surgical healthcare.
              </p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #ebe5da', borderRadius: '14px', padding: '28px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '1.4px', fontWeight: '700', color: '#98744e', textTransform: 'uppercase' }}>
                OUR MISSION
              </span>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: '#22432a', margin: '12px 0 8px' }}>
                Listen first. Care personally.
              </h3>
              <p style={{ color: '#556353', fontSize: '13px', lineHeight: '1.75', margin: 0 }}>
                To dedicate unhurried clinical time to every patient, identify the root metabolic disruption (Hetu), create transparent non-surgical treatment pathways, and uphold the highest NABH standards of patient dignity, safety, and hygiene.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Hospital Accreditations & Cashless Insurance Desk */}
        <section className="section-pad" style={{ background: '#f5f2ea', borderBottom: '1px solid #ebe5da' }}>
          <div className="treatment-heading" style={{ marginBottom: '32px' }}>
            <div>
              <div className="section-kicker"><span>GOVERNMENT REGISTERED & CASHLESS MEDICLAIM</span><i/></div>
              <h2 style={{ color: '#22432a' }}>Accreditations & <em>Insurance Tie-Ups.</em></h2>
            </div>
            <p style={{ color: '#556353' }}>
              AayuTatva is recognized for compliance, clinical standards, and 100% cashless pre-authorization.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#fff', border: '1px solid #ebe5da', borderRadius: '12px', padding: '22px' }}>
              <ShieldCheck size={26} color="#22432a" style={{ marginBottom: '10px' }} />
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#22432a', margin: '0 0 6px' }}>Govt Registered IPD</h4>
              <p style={{ fontSize: '12px', color: '#556353', lineHeight: '1.6', margin: 0 }}>
                Officially licensed Ayurvedic hospital with dedicated in-patient wards, private rooms, and 24-hour medical supervision.
              </p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #ebe5da', borderRadius: '12px', padding: '22px' }}>
              <Building2 size={26} color="#98744e" style={{ marginBottom: '10px' }} />
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#22432a', margin: '0 0 6px' }}>NABH Clinical Protocols</h4>
              <p style={{ fontSize: '12px', color: '#556353', lineHeight: '1.6', margin: 0 }}>
                Stringent clinical audit compliance, sterile Panchakarma suites, biomedical waste management, and quality infection controls.
              </p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #ebe5da', borderRadius: '12px', padding: '22px' }}>
              <HeartPulse size={26} color="#22432a" style={{ marginBottom: '10px' }} />
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#22432a', margin: '0 0 6px' }}>100% Cashless Pre-Auth</h4>
              <p style={{ fontSize: '12px', color: '#556353', lineHeight: '1.6', margin: 0 }}>
                Direct cashless mediclaim support for Star Health, Niva Bupa, ICICI Lombard, HDFC ERGO, Care Health, and all government TPAs.
              </p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #ebe5da', borderRadius: '12px', padding: '22px' }}>
              <Sparkles size={26} color="#98744e" style={{ marginBottom: '10px' }} />
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#22432a', margin: '0 0 6px' }}>Certified Pure Herbs</h4>
              <p style={{ fontSize: '12px', color: '#556353', lineHeight: '1.6', margin: 0 }}>
                Authentic, lab-tested herbal formulations prepared following classical Ayurvedic pharmacopeia without heavy metals or synthetic fillers.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Life at the Clinic Stories */}
        <section className="stories section-pad" id="clinic-life" style={{ background: '#FAF8F4' }}>
          <div className="stories-heading">
            <div>
              <div className="section-kicker"><span>CLINIC ENVIRONMENT & UPDATES</span><i/></div>
              <h2 style={{ color: '#22432a' }}>A look at life at<br/><em>AayuTatva Hospital.</em></h2>
            </div>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="instagram-follow" style={{ border: '1px solid #22432a', color: '#22432a' }}>
              <Camera size={17} color="#98744e"/> Follow @aayu_tatva <ArrowUpRight size={15}/>
            </a>
          </div>

          <div className="stories-grid">
            {clinicStories.map((story) => (
              <a 
                href={`${instagramUrl}reel/${story.reel}/`} 
                target="_blank" 
                rel="noreferrer" 
                className="story-card" 
                key={story.reel}
              >
                <div className="story-image">
                  <img src={story.image} alt={story.title} />
                  <span className="story-play"><Play size={18} fill="currentColor"/></span>
                  <div className="story-label">{story.label}</div>
                </div>
                <div className="story-caption">
                  <span>{story.title}</span>
                  <ArrowUpRight size={16}/>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 7. Bottom CTA to Book Appointment */}
        <section className="section-pad" style={{ background: '#22432a', color: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <span style={{ fontSize: '11px', letterSpacing: '1.6px', fontWeight: '700', color: '#d8b688', textTransform: 'uppercase' }}>
              YOUR PATH TO HEALTH STARTS HERE
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 42px)', margin: '14px 0 16px', color: '#ffffff' }}>
              Ready to meet our doctors?
            </h2>
            <p style={{ color: '#d4ded2', fontSize: '14px', lineHeight: '1.75', marginBottom: '26px' }}>
              Book an OPD appointment at our Bhandara clinic or speak directly with our hospital care desk.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a 
                href="/book-appointment.html" 
                style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '8px', 
                  background: '#d8b688', color: '#18331d', padding: '12px 24px', 
                  borderRadius: '30px', fontWeight: '700', fontSize: '13px', textDecoration: 'none' 
                }}
              >
                <span>Book Appointment Online</span>
                <ArrowUpRight size={16} />
              </a>
              <a 
                href={`tel:${phonePrimary}`} 
                style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '8px', 
                  background: 'rgba(255,255,255,0.12)', color: '#ffffff', padding: '12px 24px', 
                  borderRadius: '30px', fontWeight: '600', fontSize: '13px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)' 
                }}
              >
                <Phone size={15}/> Call +91 77588 16074
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="sub-footer">
        <a href="/" className="sub-brand" aria-label="AayuTatva home">
          <img src="/media/aayutatva-logo.png" alt="AayuTatva Ayurvedic Hospital logo"/>
        </a>
        <span>Dr. Manish Santosh Yerpude · Bhandara, Maharashtra</span>
        <a href="/">Back to home <ArrowRight size={14}/></a>
      </footer>
    </div>
  );
}
