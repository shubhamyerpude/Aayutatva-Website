import React from 'react';
import { 
  Waves, Flower2, Sparkles, ShieldCheck, Ruler, HeartPulse, ArrowUpRight, Bed, Star, CheckCircle2, Activity, Bot
} from 'lucide-react';


export function SpecialitiesCompactSection() {
  const specialities = [
    {
      no: '01',
      title: 'Joint & Spine Care',
      desc: 'Non-surgical relief for sciatica, slip disc, lumbar & cervical stiffness, and arthritis.',
      icon: <Waves size={18}/>,
      link: '/treatments.html#joint-spine'
    },
    {
      no: '02',
      title: 'Authentic Panchakarma',
      desc: 'Classical wooden Droni detox, Takradhara, Shirodhara, Vamana & medicated Basti.',
      icon: <Flower2 size={18}/>,
      link: '/treatments.html#panchakarma'
    },
    {
      no: '03',
      title: 'NABH In-Patient (IPD)',
      desc: 'Supervised day-care and multi-day hospital admissions with cashless pre-auth.',
      icon: <Bed size={18}/>,
      link: '/facilities.html'
    },
    {
      no: '04',
      title: 'Height & Growth',
      desc: 'Pediatric bone age, metabolic Agni evaluation & documented natural growth care.',
      icon: <Ruler size={18}/>,
      link: '/height-session.html'
    },
    {
      no: '05',
      title: 'Women’s Health & PCOD',
      desc: 'Hormonal balance, menstrual regulation & classical Garbha Sanskar guidance.',
      icon: <HeartPulse size={18}/>,
      link: '/treatments.html#womens-health'
    },
    {
      no: '06',
      title: 'Skin & Cosmetology',
      desc: 'Herbal clinical therapies for chronic psoriasis, eczema, acne & trichology hair care.',
      icon: <Sparkles size={18}/>,
      link: '/treatments.html#skin'
    },
    {
      no: '07',
      title: 'Digestive & Metabolic',
      desc: 'Holistic clinical care for IBS, chronic acidity, fatty liver & diabetes management.',
      icon: <Activity size={18}/>,
      link: '/treatments.html#digestive'
    },
    {
      no: '08',
      title: 'Cashless Insurance Desk',
      desc: 'Direct tie-ups for Star Health, Niva Bupa, ICICI Lombard, HDFC ERGO & TPAs.',
      icon: <ShieldCheck size={18}/>,
      link: '/insurance.html'
    }
  ];

  return (
    <section className="section-pad" id="specialities" style={{ background: '#f8f6f0' }}>
      <div className="treatment-heading">
        <div>
          <div className="section-kicker"><span>CLINICAL EXCELLENCE</span><i/></div>
          <h2>Our Specialities.</h2>
        </div>
        <p>Explore personalized Ayurvedic clinical care and Panchakarma therapies provided at AayuTatva Hospital.</p>
      </div>

      <div className="specialities-compact-grid">
        {specialities.map((item) => (
          <a href={item.link} className="speciality-compact-card" key={item.no}>
            <div className="speciality-compact-top">
              <span>{item.no}</span>
              <span className="speciality-icon-wrap">{item.icon}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <span className="speciality-compact-link">
              Explore care <ArrowUpRight size={13}/>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function HospitalBentoGridSection() {
  return (
    <section className="bento-section" id="clinical-ecosystem">
      <div className="bento-section-head">
        <div>
          <div className="section-kicker"><span>NABH ACCREDITED AYURVEDIC HOSPITAL</span><i/></div>
          <h2>Thoughtful Care,<br/><em>Organized for Healing.</em></h2>
        </div>
        <p>
          Experience authentic NABH-accredited hospitalization, classical Panchakarma suites, non-surgical spine care, and 100% cashless mediclaim support in Bhandara.
        </p>
      </div>

      <div className="bento-container">
        {/* Bento Card 1: NABH IPD & Panchakarma (Col 6) */}
        <a href="/facilities.html" className="bento-card bento-col-6 bento-card-herb">
          <div className="bento-kicker">
            <ShieldCheck size={14} color="#27462e" />
            <span>NABH ACCREDITED · IPD & DAY-CARE SUITES</span>
          </div>
          <h3>Authentic Panchakarma & IPD Hospitalization</h3>
          <p>
            Classical teakwood Droni detox chambers, sterile Panchakarma therapy suites, Takradhara, Shirodhara, Vamana, and medicated Basti with continuous clinical supervision in Bhandara.
          </p>
          <div className="bento-metrics-row">
            <div className="bento-metric-item">
              <b>15,000+</b>
              <span>Patients Healed</span>
            </div>
            <div className="bento-metric-item">
              <b>100%</b>
              <span>Cashless Pre-Auth</span>
            </div>
            <div className="bento-metric-item">
              <b>NABH</b>
              <span>Quality & Safety Standard</span>
            </div>
          </div>
          <span className="bento-bottom-cta">
            Explore hospital facilities <ArrowUpRight size={14}/>
          </span>
        </a>

        {/* Bento Card 2: Spine & Sciatica Non-Surgical Clinic (Col 6) */}
        <a href="/treatments.html#joint-spine" className="bento-card bento-col-6">
          <div className="bento-icon-bubble">
            <Waves size={20} />
          </div>
          <div className="bento-kicker">SPINE & JOINT CARE</div>
          <h3>Non-Surgical Spine & Sciatica Relief</h3>
          <p>
            Targeted Katyavashya, Janu Basti, and Patra Pinda Sweda protocols designed to alleviate lumbar compression, cervical spondylosis, and chronic arthritis without surgery.
          </p>
          <span className="bento-bottom-cta">
            View spine protocols <ArrowUpRight size={14}/>
          </span>
        </a>

        {/* Bento Card 3: Pediatric Height & Growth Assessment (Col 6) */}
        <a href="/height-session.html" className="bento-card bento-col-6">
          <div className="bento-icon-bubble">
            <Ruler size={20} />
          </div>
          <div className="bento-kicker">PEDIATRIC METABOLISM</div>
          <h3>Measured Height & Growth Assessment</h3>
          <p>
            Scientific bone age evaluation, Agni balancing, and non-hormonal Ashwagandha herbal protocols with real documented 2–3 cm height gains in growing children and teens.
          </p>
          <span className="bento-bottom-cta">
            Explore height protocols <ArrowUpRight size={14}/>
          </span>
        </a>

        {/* Bento Card 4: 100% Cashless Insurance Desk (Col 6) */}
        <a href="/insurance.html" className="bento-card bento-col-6 bento-card-herb">
          <div className="bento-icon-bubble">
            <ShieldCheck size={20} />
          </div>
          <div className="bento-kicker">CASHLESS INSURANCE DESK</div>
          <h3>Zero Out-of-Pocket Hospitalization</h3>
          <p>
            Direct cashless claim settlement for Star Health, Niva Bupa, ICICI Lombard, HDFC ERGO, Care Health, and all government-approved TPAs.
          </p>
          <span className="bento-bottom-cta">
            Check insurance coverage <ArrowUpRight size={14}/>
          </span>
        </a>
      </div>
    </section>
  );
}

export function HospitalAboutStaffSection() {
  const staff = [
    {
      name: 'Dr. Manish Santosh Yerpude',
      role: 'Founder & Medical Director',
      badge: 'Chief Vaidya · MCIM I-117221-A',
      degrees: 'B.A.M.S. (MUHS) · MD (AM) · P.G.P.P. Pune',
      image: '/media/dr-manish-yerpude.jpg',
      alt: 'Dr. Manish Santosh Yerpude - Medical Director',
      status: 'In-Clinic OPD Available',
      bio: '15+ years clinical expertise in non-surgical spine care, sciatica management, pediatric growth metabolism & authentic Panchakarma.',
      tags: ['Spine & Sciatica', 'Panchakarma', 'Height Growth'],
      ctaText: 'Consult Dr. Manish',
      ctaLink: '/book-appointment.html'
    },
    {
      name: 'Dr. Sakshi G. Sonkusare',
      role: 'Consulting Ayurvedic Physician',
      badge: 'Cosmetology & Women’s Health',
      degrees: 'B.A.M.S. (MUHS) · PGDCC · Reg. Physician',
      image: '/media/dr-sakshi-sonkusare.jpg',
      alt: 'Dr. Sakshi Sonkusare - Ayurvedic Physician',
      status: 'In-Clinic OPD Available',
      bio: 'Specialized Ayurvedic guidance in PCOD, hormonal balance, classical Garbha Sanskar, skin & psoriasis clinical therapies.',
      tags: ['Women’s Health & PCOD', 'Skin Care', 'Panchakarma'],
      ctaText: 'Consult Dr. Sakshi',
      ctaLink: '/book-appointment.html'
    },
    {
      name: 'Clinical IPD & Panchakarma Staff',
      role: 'Hospital Care & Nursing Team',
      badge: 'NABH Standard In-Patient Care',
      degrees: 'Trained Ayurvedic Therapists & Nursing Staff',
      image: '/media/hospital-care-team.png',
      alt: 'AayuTatva Ayurvedic Hospital clinical care staff & consultation team',
      status: '24/7 Supervised Inpatient Care',
      bio: 'Dedicated nursing staff, wooden Droni Panchakarma therapists, and clinical attendants ensuring hygienic, compassionate in-patient healing.',
      tags: ['24/7 IPD Nursing', 'Droni Therapies', 'Cashless Desk'],
      ctaText: 'View Hospital Facilities',
      ctaLink: '/facilities.html'
    }
  ];

  return (
    <div className="about-staff-wrapper">
      <div className="about-staff-head">
        <div>
          <div className="section-kicker"><span>OUR CLINICAL DIRECTORS & CARE STAFF</span><i/></div>
          <h3>Dedicated Vaidyas &<br/><em>Hospital Care Staff.</em></h3>
        </div>
        <p>
          Meet our experienced Ayurvedic physicians and clinical therapy team providing authentic, compassionate healthcare at AayuTatva Hospital in Bhandara.
        </p>
      </div>

      <div className="about-staff-grid">
        {staff.map((person, idx) => (
          <article className="about-staff-card" key={idx}>
            <div className="about-staff-photo-wrap">
              <img src={person.image} alt={person.alt} loading="lazy" />
              <span className="about-staff-status-badge">
                <i /> {person.status}
              </span>
            </div>
            <div className="about-staff-body">
              <span className="about-staff-role-chip">{person.role}</span>
              <h4 className="about-staff-name">{person.name}</h4>
              <div className="about-staff-degree">{person.degrees}</div>
              <div className="about-staff-reg">{person.badge}</div>
              <p className="about-staff-bio">{person.bio}</p>
              <div className="about-staff-tags">
                {person.tags.map((tag, tIdx) => (
                  <span key={tIdx}>{tag}</span>
                ))}
              </div>
              <a href={person.ctaLink} className="about-staff-btn">
                <span>{person.ctaText}</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

