import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ArrowUpRight, Check, CheckCircle2, 
  Phone, MessageCircle, Calendar, Clock3, ShieldCheck, MapPin, 
  Building2, Stethoscope, Sparkles, AlertCircle, HeartPulse
} from 'lucide-react';
import { SiteHeader, phonePrimary, whatsappPhone } from './SiteHeader.jsx';
import './subpages.css';
import './portal.css';

const googleMaps = 'https://www.google.com/maps/place/Dr.+Yerpude%27s+AayuTatva+Ayurvedic+Hospital+%26+Panchakarma+Centre/@21.1741166,79.6442647,17z/data=!4m6!3m5!1s0x3a2b39df27db6025:0xee597cf866c04adf!8m2!3d21.1741166!4d79.6442647!16s%2Fg%2F11lz6hdbmr';

export function BookAppointmentPage() {
  const [form, setForm] = useState({ 
    name: '', 
    phone: '', 
    department: 'Joint & Spine Care', 
    doctor: 'Dr. Manish Santosh Yerpude (Spine & Panchakarma)', 
    date: '', 
    note: '' 
  });
  const [bookingStep, setBookingStep] = useState(1); // 1 = Form, 2 = Confirmed Received
  const [bookingId, setBookingId] = useState('');
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [formError, setFormError] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!form.name.trim() || !form.phone.trim() || !form.department || !form.date) {
      setFormError('Please fill in your full name, contact number, area of care, and preferred appointment date.');
      return;
    }

    setSubmittingBooking(true);
    const bId = 'AAYU-DOC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(bId);

    const recordEntry = {
      id: bId,
      name: form.name.trim(),
      whatsapp: form.phone.trim(),
      department: `${form.department} · ${form.doctor}`,
      date: form.date,
      note: form.note || '',
      fee: 0,
      status: 'Appointment Requested (Desk Verification Pending)',
      submittedAt: new Date().toISOString(),
    };

    // Save to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('aayutatva_opd_bookings') || '[]');
      existing.unshift(recordEntry);
      localStorage.setItem('aayutatva_opd_bookings', JSON.stringify(existing));
    } catch (err) {}

    // Send to backend endpoint
    try {
      await fetch('/api/height-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: bId,
          name: form.name.trim(),
          whatsapp: form.phone.trim(),
          city: `OPD (${form.department} on ${form.date})`,
          age: 'Adult',
          gender: 'OPD',
          currentHeight: 'N/A',
          goal: form.note || `Doctor Consultation: ${form.doctor}`,
          fee: 0,
          status: 'Appointment Requested',
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn('Backend sync note:', err);
    }

    // Direct WhatsApp message with appointment details
    const message = [
      `*AayuTatva Ayurvedic Hospital — Doctor OPD Appointment Request*`,
      `Namaste Dr. Yerpude, I would like to book an in-clinic OPD consultation.`,
      ``,
      `📋 *Booking ID:* ${bId}`,
      `👤 *Patient Name:* ${form.name.trim()}`,
      `📞 *Phone Number:* ${form.phone.trim()}`,
      `🌿 *Area of Care:* ${form.department}`,
      `🩺 *Preferred Doctor:* ${form.doctor}`,
      `📅 *Preferred Date:* ${form.date}`,
      `📝 *Notes / Symptoms:* ${form.note || 'None'}`,
      ``,
      `Kindly verify doctor availability and confirm my consultation slot.`
    ].join('\n');

    const waUrl = `https://wa.me/917758816074?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {}
    }, 700);

    setSubmittingBooking(false);
    setBookingStep(2);
  };

  return (
    <div className="subpage" style={{ background: '#FAF8F5', color: '#1C3B24' }}>
      <SiteHeader breadcrumb="Book Appointment" />

      <main>
        {/* 1. Hero Header: Soft, Eye-Friendly Palette */}
        <section className="sub-hero booking-hero" style={{ background: 'linear-gradient(180deg, #F5F2EB 0%, #FAF8F5 100%)', padding: '60px 8% 50px', position: 'relative', borderBottom: '1px solid #EAE4D9' }}>
          <a className="back-link" href="/" style={{ color: '#6A7A6C', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '600', textDecoration: 'none', marginBottom: '18px' }}>
            <ArrowLeft size={14}/> BACK TO HOME
          </a>
          <div className="sub-overline" style={{ color: '#9B784E', fontSize: '11px', letterSpacing: '1.5px', fontWeight: '700' }}>
            OPD CONSULTATIONS & IN-PATIENT ADMISSION · BHANDARA
          </div>
          <h1 style={{ color: '#1C3B24', fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(32px, 4.5vw, 50px)', lineHeight: '1.15', margin: '14px 0 16px' }}>
            Book Your Consultation &<br/>
            <em style={{ color: '#9B784E', fontStyle: 'italic' }}>Visit AayuTatva Hospital.</em>
          </h1>
          <p style={{ color: '#4F5E51', maxWidth: '640px', fontSize: '14.5px', lineHeight: '1.8', margin: '0 0 24px' }}>
            Schedule an in-person doctor consultation with <strong>Dr. Manish Santosh Yerpude</strong> or <strong>Dr. Sakshi Sonkusare</strong> at our Bhandara clinic, or coordinate NABH in-patient admission with 100% cashless mediclaim support.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a 
              href={`tel:${phonePrimary}`} 
              className="sub-cta" 
              style={{ 
                background: '#1C3B24', color: '#FFFFFF', padding: '12px 24px', 
                borderRadius: '30px', fontWeight: '600', fontSize: '13px', 
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 6px 18px rgba(28, 59, 36, 0.15)'
              }}
            >
              <Phone size={15}/> <span>Call Hospital: +91 77588 16074</span>
            </a>
            <a 
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent('Hello AayuTatva Hospital, I would like to inquire about doctor availability and OPD booking.')}`}
              target="_blank" 
              rel="noreferrer" 
              style={{ 
                background: '#EBF5EE', border: '1px solid #C6E2CD', color: '#1B6B38', 
                padding: '12px 22px', borderRadius: '30px', fontWeight: '600', fontSize: '13px',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px'
              }}
            >
              <MessageCircle size={16} color="#1B6B38"/> WhatsApp Quick Desk
            </a>
          </div>
        </section>

        {/* 2. Doctor OPD Timetable Cards: Calming, UI-Friendly */}
        <section className="section-pad" style={{ background: '#FAF8F5', padding: '50px 8%', borderBottom: '1px solid #EAE4D9' }}>
          <div className="treatment-heading" style={{ marginBottom: '24px' }}>
            <div>
              <div className="section-kicker" style={{ color: '#9B784E' }}><span>CLINIC TIMINGS & OPD SCHEDULE</span><i style={{ background: '#9B784E' }}/></div>
              <h2 style={{ color: '#1C3B24', fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 3.5vw, 36px)', margin: '10px 0 6px' }}>Consultation Timetable.</h2>
            </div>
            <p style={{ color: '#5A6B5C', fontSize: '13px' }}>
              Review the OPD consultation hours below before picking your preferred date.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '18px' }}>
            {/* Dr Manish Timings */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E4DED4', borderRadius: '14px', padding: '22px', boxShadow: '0 4px 20px rgba(28, 59, 36, 0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <img 
                  src="/media/dr-manish-yerpude.jpg" 
                  alt="Dr. Manish Yerpude" 
                  style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E4DED4' }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: '16.5px', color: '#1C3B24', fontFamily: 'Playfair Display, serif' }}>
                    Dr. Manish Santosh Yerpude
                  </h4>
                  <small style={{ color: '#758577', fontSize: '10.5px' }}>Medical Director · Spine & Sciatica Specialist</small>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#4A5B4C', lineHeight: '1.7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                  <Clock3 size={14} color="#A07A50"/> <b>Morning:</b> 10:00 AM – 2:00 PM
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                  <Clock3 size={14} color="#A07A50"/> <b>Evening:</b> 5:00 PM – 8:00 PM
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#15803D', background: '#ECFDF5', padding: '3px 10px', borderRadius: '20px', fontWeight: '600', fontSize: '11px', marginTop: '6px' }}>
                  <CheckCircle2 size={13}/> Available Monday to Sunday (All 7 Days)
                </div>
              </div>
            </div>

            {/* Dr Sakshi Timings */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E4DED4', borderRadius: '14px', padding: '22px', boxShadow: '0 4px 20px rgba(28, 59, 36, 0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <img 
                  src="/media/dr-sakshi-sonkusare.jpg" 
                  alt="Dr. Sakshi Sonkusare" 
                  style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E4DED4' }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: '16.5px', color: '#1C3B24', fontFamily: 'Playfair Display, serif' }}>
                    Dr. Sakshi G. Sonkusare
                  </h4>
                  <small style={{ color: '#758577', fontSize: '10.5px' }}>Consulting Physician · Women’s Health & Skin</small>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#4A5B4C', lineHeight: '1.7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                  <Clock3 size={14} color="#A07A50"/> <b>Morning:</b> 11:00 AM – 3:00 PM
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                  <Clock3 size={14} color="#A07A50"/> <b>Evening:</b> 6:00 PM – 8:00 PM
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#15803D', background: '#ECFDF5', padding: '3px 10px', borderRadius: '20px', fontWeight: '600', fontSize: '11px', marginTop: '6px' }}>
                  <CheckCircle2 size={13}/> Available Monday to Saturday
                </div>
              </div>
            </div>

            {/* Panchakarma & IPD Admissions */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E4DED4', borderRadius: '14px', padding: '22px', boxShadow: '0 4px 20px rgba(28, 59, 36, 0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#EBF2EA', display: 'grid', placeItems: 'center', color: '#1C3B24' }}>
                  <Building2 size={24}/>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16.5px', color: '#1C3B24', fontFamily: 'Playfair Display, serif' }}>
                    Panchakarma & IPD Admissions
                  </h4>
                  <small style={{ color: '#758577', fontSize: '10.5px' }}>NABH Inpatient & Cashless Mediclaim</small>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#4A5B4C', lineHeight: '1.7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                  <Clock3 size={14} color="#A07A50"/> <b>IPD Nursing:</b> 24 Hours / 7 Days
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                  <ShieldCheck size={14} color="#15803D"/> <b>Cashless Pre-Auth:</b> Star Health, Niva Bupa & TPAs
                </div>
                <div style={{ color: '#A07A50', fontWeight: '600', marginTop: '6px', fontSize: '11.5px' }}>
                  Prior room reservation recommended
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Interactive Booking Form Section: Pure Appointment Request (No QR, No Payment Step) */}
        <section className="section-pad" style={{ background: '#F5F2EB', padding: '50px 8%' }} id="booking-form-section">
          <div style={{ maxWidth: '740px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '26px' }}>
              <div className="section-kicker" style={{ justifyContent: 'center', color: '#9B784E' }}>
                <span>ONLINE APPOINTMENT REGISTRATION</span><i style={{ background: '#9B784E' }}/>
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 3.5vw, 36px)', color: '#1C3B24', margin: '10px 0 8px' }}>
                Request an Appointment
              </h2>
              <p style={{ color: '#5A6B5C', fontSize: '13.5px', margin: 0 }}>
                Please provide your details below. Our clinic desk will verify your time slot and send confirmation via WhatsApp or phone call.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E1DBD0', borderRadius: '16px', padding: 'clamp(22px, 4.5vw, 38px)', boxShadow: '0 8px 30px rgba(28, 59, 36, 0.05)' }}>
              
              {/* Confirmed State: Request Received */}
              {bookingStep === 2 ? (
                <div style={{ textAlign: 'center', padding: '16px 8px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E8F5EB', color: '#1B6B38', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
                    <Check size={34} strokeWidth={2.5} />
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#1C3B24', margin: '0 0 10px' }}>
                    Appointment Request Received!
                  </h3>
                  <div style={{ background: '#F3EFE6', padding: '8px 18px', borderRadius: '8px', display: 'inline-block', marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', color: '#68776A' }}>Booking Reference ID: </span>
                    <strong style={{ fontSize: '14.5px', color: '#1C3B24', letterSpacing: '0.5px' }}>{bookingId}</strong>
                  </div>
                  <p style={{ color: '#4A5B4C', fontSize: '13.5px', lineHeight: '1.75', maxWidth: '540px', margin: '0 auto 22px' }}>
                    Thank you, <strong>{form.name}</strong>. Your appointment request for <strong>{form.department}</strong> on <strong>{form.date}</strong> with <strong>{form.doctor}</strong> has been logged in our hospital OPD schedule. Our desk coordinator will verify the slot and finalize your timing.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px', margin: '0 auto' }}>
                    <a
                      href={`https://wa.me/917758816074?text=${encodeURIComponent(`Hello Dr. Yerpude, I have requested an OPD consultation on your website. Booking ID: ${bookingId} (Name: ${form.name}, Phone: ${form.phone}, Specialty: ${form.department}). Please confirm!`)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                        background: '#1C3B24', color: '#FFFFFF', padding: '13px 22px', borderRadius: '30px', 
                        fontWeight: '600', fontSize: '13px', textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(28, 59, 36, 0.2)'
                      }}
                    >
                      <MessageCircle size={17}/>
                      <span>Open Clinic WhatsApp Desk</span>
                    </a>
                    <button 
                      type="button"
                      onClick={() => {
                        setBookingStep(1);
                        setForm({ name: '', phone: '', department: 'Joint & Spine Care', doctor: 'Dr. Manish Santosh Yerpude (Spine & Panchakarma)', date: '', note: '' });
                      }}
                      style={{ background: 'none', border: 'none', color: '#9B784E', fontSize: '12.5px', cursor: 'pointer', textDecoration: 'underline', padding: '8px', fontWeight: '600' }}
                    >
                      Request Another Appointment
                    </button>
                  </div>
                </div>
              ) : (
                /* Patient Information Form: Direct & Soothing */
                <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '18px' }}>
                  {formError && (
                    <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <label style={{ display: 'grid', gap: '6px', fontSize: '12.5px', fontWeight: '600', color: '#2A422D' }}>
                      Patient Full Name *
                      <input 
                        type="text" 
                        name="name" 
                        value={form.name} 
                        onChange={update} 
                        placeholder="e.g. Ramesh Patil" 
                        required 
                        style={{ height: '46px', border: '1px solid #D5CEC2', borderRadius: '8px', padding: '0 14px', fontSize: '13.5px', background: '#FCFBF8', color: '#1C3B24', outline: 'none' }}
                      />
                    </label>

                    <label style={{ display: 'grid', gap: '6px', fontSize: '12.5px', fontWeight: '600', color: '#2A422D' }}>
                      Mobile / WhatsApp Number *
                      <input 
                        type="tel" 
                        name="phone" 
                        value={form.phone} 
                        onChange={update} 
                        placeholder="e.g. 9876543210" 
                        required 
                        style={{ height: '46px', border: '1px solid #D5CEC2', borderRadius: '8px', padding: '0 14px', fontSize: '13.5px', background: '#FCFBF8', color: '#1C3B24', outline: 'none' }}
                      />
                    </label>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <label style={{ display: 'grid', gap: '6px', fontSize: '12.5px', fontWeight: '600', color: '#2A422D' }}>
                      Area of Clinical Care *
                      <select 
                        name="department" 
                        value={form.department} 
                        onChange={update}
                        style={{ height: '46px', border: '1px solid #D5CEC2', borderRadius: '8px', padding: '0 12px', fontSize: '13px', background: '#FCFBF8', color: '#1C3B24', outline: 'none' }}
                      >
                        <option value="Joint & Spine Care">Joint & Spine Care (Sciatica / Slip Disc)</option>
                        <option value="Authentic Panchakarma">Authentic Panchakarma (Detox / Takradhara)</option>
                        <option value="Height & Growth">Height & Pediatric Bone Growth</option>
                        <option value="Women’s Health & PCOD">Women’s Health & PCOD / Garbha Sanskar</option>
                        <option value="Skin & Psoriasis">Skin Diseases & Psoriasis Therapies</option>
                        <option value="Digestive & Acidity">Digestive, IBS & Metabolic Health</option>
                        <option value="Cashless IPD Admission">Cashless Hospital IPD Admission (Mediclaim)</option>
                      </select>
                    </label>

                    <label style={{ display: 'grid', gap: '6px', fontSize: '12.5px', fontWeight: '600', color: '#2A422D' }}>
                      Preferred Consulting Doctor
                      <select 
                        name="doctor" 
                        value={form.doctor} 
                        onChange={update}
                        style={{ height: '46px', border: '1px solid #D5CEC2', borderRadius: '8px', padding: '0 12px', fontSize: '13px', background: '#FCFBF8', color: '#1C3B24', outline: 'none' }}
                      >
                        <option value="Dr. Manish Santosh Yerpude (Spine & Panchakarma)">Dr. Manish Santosh Yerpude (Spine & Panchakarma)</option>
                        <option value="Dr. Sakshi G. Sonkusare (Women’s Health & Skin)">Dr. Sakshi G. Sonkusare (Women’s Health & Skin)</option>
                        <option value="Any Available Senior Clinician">Any Available Senior Clinician</option>
                      </select>
                    </label>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <label style={{ display: 'grid', gap: '6px', fontSize: '12.5px', fontWeight: '600', color: '#2A422D' }}>
                      Preferred Consultation Date *
                      <input 
                        type="date" 
                        name="date" 
                        value={form.date} 
                        onChange={update} 
                        min={new Date().toISOString().split('T')[0]} 
                        required 
                        style={{ height: '46px', border: '1px solid #D5CEC2', borderRadius: '8px', padding: '0 14px', fontSize: '13px', background: '#FCFBF8', color: '#1C3B24', outline: 'none' }}
                      />
                    </label>

                    <label style={{ display: 'grid', gap: '6px', fontSize: '12.5px', fontWeight: '600', color: '#2A422D' }}>
                      Brief Symptoms / Notes <span style={{ fontSize: '10.5px', color: '#7E8E80', fontWeight: 'normal' }}>OPTIONAL</span>
                      <input 
                        type="text" 
                        name="note" 
                        value={form.note} 
                        onChange={update} 
                        placeholder="e.g. Back stiffness for 3 months" 
                        style={{ height: '46px', border: '1px solid #D5CEC2', borderRadius: '8px', padding: '0 14px', fontSize: '13px', background: '#FCFBF8', color: '#1C3B24', outline: 'none' }}
                      />
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={submittingBooking}
                    style={{ 
                      height: '50px', background: '#1C3B24', color: '#FFFFFF', 
                      border: 'none', borderRadius: '30px', fontWeight: '700', fontSize: '14px', 
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                      marginTop: '6px', boxShadow: '0 6px 18px rgba(28, 59, 36, 0.18)', transition: 'background 0.2s'
                    }}
                  >
                    <span>{submittingBooking ? 'Submitting Request…' : 'Submit Appointment Request'}</span>
                    <ArrowRight size={16}/>
                  </button>

                  <div style={{ textAlign: 'center', fontSize: '11px', color: '#6A7A6C', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} color="#15803D" />
                    <span>Your request will be sent to our clinic desk for immediate confirmation. No online payment required.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 4. Hospital Location & Contact Info */}
        <section className="section-pad" style={{ background: '#FAF8F5', padding: '50px 8%' }}>
          <div style={{ maxWidth: '920px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <div className="section-kicker" style={{ color: '#9B784E' }}><span>HOSPITAL CAMPUS</span><i style={{ background: '#9B784E' }}/></div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#1C3B24', margin: '10px 0 12px' }}>
                Visit Us in Bhandara
              </h3>
              <p style={{ color: '#556353', fontSize: '13px', lineHeight: '1.7', marginBottom: '16px' }}>
                Dr. Yerpude’s AayuTatva Ayurvedic Hospital & Panchakarma Centre<br/>
                <strong>1st Floor, Bawankar Bhawan, Beside Singh Tower, Khat Road, Bhandara, Maharashtra - 441904</strong>
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href={googleMaps} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#1C3B24', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                  <MapPin size={16} color="#9B784E"/> Open in Google Maps <ArrowUpRight size={14}/>
                </a>
                <a href={`tel:${phonePrimary}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#1C3B24', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                  <Phone size={16} color="#9B784E"/> +91 77588 16074 (Hospital Helpline)
                </a>
              </div>
            </div>

            <div style={{ background: '#F5F2EB', padding: '24px', borderRadius: '14px', border: '1px solid #E4DED4' }}>
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#1C3B24', margin: '0 0 10px' }}>
                100% Cashless Mediclaim Support
              </h4>
              <p style={{ fontSize: '12.5px', color: '#556353', lineHeight: '1.7', margin: 0 }}>
                If you are planning for an in-patient (IPD) admission or Panchakarma therapy course and have active private health insurance (Star Health, Niva Bupa, ICICI Lombard, HDFC ERGO, Care Health, etc.), our hospital insurance desk handles pre-authorization so you incur zero out-of-pocket costs.
              </p>
              <a href="/insurance.html" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#1C3B24', fontWeight: '700', marginTop: '12px', textDecoration: 'none' }}>
                Read Cashless Admission Guide <ArrowUpRight size={14}/>
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
