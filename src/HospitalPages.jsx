import React, { useState } from 'react';
import { 
  Building2, Calendar, Clock3, Stethoscope, Bed, Pill, Droplets, 
  Activity, CheckCircle2, ChevronDown, ChevronUp, ArrowUpRight, HelpCircle, Compass,
  Phone, ShieldCheck, MapPin, ArrowRight, ArrowLeft
} from 'lucide-react';
import './subpages.css';
import './portal.css';
import { SiteHeader, phonePrimary } from './SiteHeader.jsx';

function SubpageShell({ title, kicker, children }) {
  return (
    <div className="subpage">
      <SiteHeader breadcrumb={title || "Hospital & Facilities"} />

      <main>
        <section className="sub-hero">
          <a className="back-link" href="/"><ArrowLeft size={14}/> BACK TO MAIN PORTAL</a>
          {kicker && <div className="sub-overline">{kicker}</div>}
          <h1>{title}</h1>
        </section>
        {children}
      </main>

      <footer className="sub-footer">
        <a href="/" className="sub-brand" aria-label="AayuTatva home">
          <img src="/media/aayutatva-logo.png" alt="AayuTatva Ayurvedic Hospital logo"/>
        </a>
        <span>Dr. Manish Santosh Yerpude · Bhandara</span>
        <a href="/">Back to home <ArrowRight size={14}/></a>
      </footer>
    </div>
  );
}

export function OpdSchedulePage() {
  const opdRows = [
    {
      doctor: 'Dr. Manish Santosh Yerpude',
      role: 'Founder & Medical Director',
      degree: 'B.A.M.S. (MUHS) · MD (AM) · P.G.P.P. Pune · Fellowship in Height',
      reg: 'Reg No. I-117221-A',
      image: '/media/dr-manish-yerpude.jpg',
      specialty: 'Bone & Joint Disorders, Sciatica, Spine Rehabilitation, Pediatric Growth & Height Evaluation, Chronic Pain & Panchakarma',
      days: 'Monday to Sunday (All 7 Days)',
      morning: '10:00 AM – 2:00 PM',
      evening: '5:00 PM – 8:00 PM',
      status: 'Open for In-Clinic OPD'
    },
    {
      doctor: 'Dr. Sakshi G. Sonkusare',
      role: 'Clinical Cosmetologist & Trichologist',
      degree: 'B.A.M.S. (MUHS) · PGDCC',
      reg: 'Reg No. I-117222-A',
      image: '/media/dr-sakshi-sonkusare.jpg',
      specialty: 'Women’s Health & PCOD, Garbha Sanskar Prenatal Guidance, Skin Diseases, Scalp & Hair Trichology, Digestive Disorders',
      days: 'Monday to Saturday',
      morning: '11:00 AM – 3:00 PM',
      evening: '6:00 PM – 8:00 PM',
      status: 'Open for In-Clinic OPD'
    },
    {
      doctor: 'Panchakarma & Daycare Unit',
      role: 'Clinical Therapy Suite',
      degree: 'NABH-Standard Classical Ayurvedic Care',
      reg: 'Supervised Clinical Staff',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&q=80',
      specialty: 'Takradhara, Shirodhara, Janu Basti (Knee Care), Kati Basti (Spine Care), Vamana, Virechana, Medicated Enemas (Basti)',
      days: 'All 7 Days (Prior Slot Reservation)',
      morning: '8:00 AM – 1:00 PM',
      evening: '3:00 PM – 6:30 PM',
      status: 'Scheduled Sessions'
    }
  ];

  return (
    <SubpageShell 
      title={<>Doctor Consultation &<br/><em>OPD Timetable.</em></>} 
      kicker="HOSPITAL OPD SCHEDULE · BHANDARA"
    >
      <div className="portal-subpage-content">
        <div className="opd-cards-list">
          {opdRows.map((doc, idx) => (
            <article className="opd-card-full" key={idx}>
              <div className="opd-card-topbar">
                <span className="opd-doc-status"><i/> {doc.status}</span>
                <span className="opd-doc-days">{doc.days}</span>
              </div>
              <div className="opd-card-body">
                <div className="opd-card-photo">
                  <img src={doc.image} alt={doc.doctor}/>
                </div>
                <div className="opd-card-text">
                  <h3>{doc.doctor}</h3>
                  <div className="opd-card-credentials">{doc.degree}</div>
                  <div className="opd-card-reg">{doc.reg}</div>
                  <p className="opd-card-focus"><strong>Focus areas:</strong> {doc.specialty}</p>

                  <div className="opd-timing-blocks">
                    <div className="timing-box">
                      <span className="timing-label"><Clock3 size={13}/> Morning Session</span>
                      <b>{doc.morning}</b>
                    </div>
                    <div className="timing-box">
                      <span className="timing-label"><Clock3 size={13}/> Evening Session</span>
                      <b>{doc.evening}</b>
                    </div>
                  </div>

                  <div className="opd-card-actions">
                    <a href="/#booking" className="btn-primary" style={{ minHeight: '44px', padding: '0 18px', fontSize: '11px' }}>
                      Request Appointment <ArrowUpRight size={14}/>
                    </a>
                    <a href={`tel:${phonePrimary}`} className="under-link" style={{ minHeight: '44px', fontSize: '11px' }}>
                      <Phone size={14}/> Call OPD Reception
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="opd-patient-guidelines">
          <h3>Information for OPD Visitors</h3>
          <ul>
            <li>Please bring previous medical records, blood reports, or spine/joint X-rays/MRIs if available.</li>
            <li>Prior booking helps avoid long waiting times at the clinic during peak evening hours.</li>
            <li>For emergency spine pain or severe mobility restriction, notify the reception desk immediately upon arrival.</li>
          </ul>
        </div>
      </div>
    </SubpageShell>
  );
}

export function FacilitiesPage() {
  const facilities = [
    {
      title: 'Panchakarma Therapy Chambers',
      tag: 'AUTHENTIC THERAPY',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80',
      description: 'Custom-crafted wooden Droni treatment tables with dedicated copper Shirodhara & Takradhara vessels. Hygienic, peaceful, and temperature-controlled.',
      amenities: ['Classical Wooden Droni', 'Shirodhara & Takradhara Vessels', 'Steam & Swedana Box', 'Kati / Janu Basti Equipment', 'Hygienic Disposable Linens']
    },
    {
      title: 'NABH-Compliant In-Patient (IPD) Suites',
      tag: 'CASHLESS ADMISSION',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=700&q=80',
      description: 'Comfortable day-care and multi-day admission beds for intensive spinal traction, knee osteoarthritis rejuvenation cycles, and detox courses with 100% cashless mediclaim support.',
      amenities: ['Private & Semi-Private Beds', '24/7 Nursing Assistance', 'Doctor On-Call Round the Clock', 'Ayurvedic Pathya Diet Service', 'Cashless TPA Desk']
    },
    {
      title: 'Herbal Pharmacy & Classical Dispensary',
      tag: 'AUTHENTIC FORMULATIONS',
      image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=700&q=80',
      description: 'In-house certified classical formulations, freshly prepared medicated oils (Taila), churnas, and decoctions (Kwath) prescribed directly by Dr. Yerpude and Dr. Sonkusare.',
      amenities: ['Fresh Medicated Oils', 'Standardized Ayurvedic Formulations', 'Prescription Verification', 'Patient Dosage Guidance']
    }
  ];

  return (
    <SubpageShell 
      title={<>Clinical Facilities &<br/><em>Hospital Infrastructure.</em></>} 
      kicker="HOSPITAL TOUR & IPD SUITES"
    >
      <div className="portal-subpage-content">
        <p className="facilities-lead">
          AayuTatva Ayurvedic Hospital in Bhandara is equipped to deliver authentic classical therapies under modern clinical hygiene and NABH accreditation benchmarks.
        </p>

        <div className="facilities-detail-list">
          {facilities.map((f, i) => (
            <article className="facility-detail-card" key={i}>
              <div className="facility-detail-img">
                <img src={f.image} alt={f.title} />
                <span className="facility-tag">{f.tag}</span>
              </div>
              <div className="facility-detail-info">
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                <div className="facility-amenities-list">
                  <strong>Key Infrastructure:</strong>
                  <div className="facility-chips">
                    {f.amenities.map((a, j) => (
                      <span key={j}>{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="facilities-cta-card">
          <div>
            <h3>Planning In-Patient or Day-Care Therapy?</h3>
            <p>Our admission coordinators can explain package options, room choices, and check your cashless insurance policy.</p>
          </div>
          <div className="facilities-cta-buttons">
            <a href="/insurance.html" className="btn-primary" style={{ minHeight: '44px', padding: '0 18px', fontSize: '11px' }}>
              Check Cashless Cover <ArrowUpRight size={14}/>
            </a>
            <a href={`tel:${phonePrimary}`} className="under-link" style={{ minHeight: '44px', fontSize: '11px' }}>
              <Phone size={14}/> Call Hospital Desk
            </a>
          </div>
        </div>
      </div>
    </SubpageShell>
  );
}
