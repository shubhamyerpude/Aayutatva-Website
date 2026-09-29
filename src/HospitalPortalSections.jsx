import React from 'react';
import { 
  Waves, Flower2, Sparkles, ShieldCheck, Ruler, HeartPulse, ArrowUpRight, Bed
} from 'lucide-react';

export function SpecialitiesCompactSection() {
  const specialities = [
    {
      no: '01',
      title: 'Joint & Spine Care',
      desc: 'Specialized non-surgical relief for sciatica, lumbar spondylosis, slip disc, cervical stiffness & arthritis.',
      icon: <Waves size={20}/>,
      link: '/treatments.html#joint-spine'
    },
    {
      no: '02',
      title: 'Authentic Panchakarma',
      desc: 'Classical wooden Droni detox, Takradhara, Shirodhara, Vamana, Virechana & medicated Basti enemas.',
      icon: <Flower2 size={20}/>,
      link: '/treatments.html#panchakarma'
    },
    {
      no: '03',
      title: 'NABH In-Patient (IPD) Care',
      desc: 'Supervised day-care and multi-day hospital admissions with 100% cashless insurance coverage.',
      icon: <Bed size={20}/>,
      link: '/facilities.html'
    },
    {
      no: '04',
      title: 'Height & Growth Assessment',
      desc: 'Individualized pediatric evaluation analyzing bone maturity, nutrition, and metabolic Agni.',
      icon: <Ruler size={20}/>,
      link: '/height-session.html'
    },
    {
      no: '05',
      title: 'Women’s Health & PCOD',
      desc: 'Personalized clinical care for menstrual irregularities, hormonal balance & Garbha Sanskar guidance.',
      icon: <HeartPulse size={20}/>,
      link: '/treatments.html#womens-health'
    },
    {
      no: '06',
      title: 'Clinical Cosmetology & Skin',
      desc: 'Herbal therapies and trichology consultations for chronic psoriasis, eczema, acne & hair loss.',
      icon: <Sparkles size={20}/>,
      link: '/treatments.html#skin'
    },
    {
      no: '07',
      title: 'Metabolic & Digestive Care',
      desc: 'Holistic protocols for IBS, chronic acidity, fatty liver, diabetes management & weight care.',
      icon: <Waves size={20}/>,
      link: '/treatments.html#digestive'
    },
    {
      no: '08',
      title: 'Cashless Insurance Desk',
      desc: 'Direct tie-ups and pre-auth assistance for Star Health, HDFC ERGO, ICICI Lombard, Niva Bupa & TPAs.',
      icon: <ShieldCheck size={20}/>,
      link: '/insurance.html'
    }
  ];

  return (
    <section className="section-pad" id="specialities" style={{ background: '#f5f2ea' }}>
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
              {item.icon}
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <span className="speciality-compact-link">
              Explore care <ArrowUpRight size={14}/>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function DoctorsCardsMinimal() {
  return (
    <section className="section-pad" id="doctors" style={{ background: '#ffffff' }}>
      <div className="doctor-team-heading">
        <div>
          <div className="section-kicker"><span>MEET YOUR CLINICAL TEAM</span><i/></div>
          <h2>Our Doctors.</h2>
        </div>
        <p>Qualified Ayurvedic clinicians leading consultations and therapies at AayuTatva Hospital in Bhandara.</p>
      </div>

      <div className="doctor-cards-minimal">
        <article className="doctor-card-min">
          <div className="doctor-card-min-photo">
            <img src="/media/dr-manish-yerpude.jpg" alt="Dr. Manish Santosh Yerpude"/>
          </div>
          <div className="doctor-card-min-details">
            <span className="doctor-min-kicker">FOUNDER & MEDICAL DIRECTOR</span>
            <h3>Dr. Manish Santosh Yerpude</h3>
            <div className="doctor-min-deg">B.A.M.S. (MUHS) · MD (AM) · P.G.P.P. Pune</div>
            <div className="doctor-min-reg">Reg No. I-117221-A</div>
            <div className="doctor-min-specialties">
              <span>Bone & Joint</span>
              <span>Spine & Sciatica</span>
              <span>Panchakarma</span>
              <span>Height Growth</span>
            </div>
            <a href="#booking" className="under-link" style={{ fontSize: '11px', marginTop: 'auto' }}>
              Consult Dr. Yerpude <ArrowUpRight size={14}/>
            </a>
          </div>
        </article>

        <article className="doctor-card-min">
          <div className="doctor-card-min-photo">
            <img src="/media/dr-sakshi-sonkusare.jpg" alt="Dr. Sakshi G. Sonkusare"/>
          </div>
          <div className="doctor-card-min-details">
            <span className="doctor-min-kicker">CLINICAL COSMETOLOGIST & TRICHOLOGIST</span>
            <h3>Dr. Sakshi G. Sonkusare</h3>
            <div className="doctor-min-deg">B.A.M.S. (MUHS) · PGDCC</div>
            <div className="doctor-min-reg">Reg No. I-117222-A</div>
            <div className="doctor-min-specialties">
              <span>Women's Health</span>
              <span>Garbha Sanskar</span>
              <span>Skin & Cosmetology</span>
              <span>Hair & Scalp</span>
            </div>
            <a href="#booking" className="under-link" style={{ fontSize: '11px', marginTop: 'auto' }}>
              Consult Dr. Sonkusare <ArrowUpRight size={14}/>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

export function DoshaQuizTeaserSection() {
  return (
    <section className="dosha-quiz-teaser-section" id="dosha-quiz">
      <div className="dosha-quiz-teaser-card">
        <div className="dosha-quiz-teaser-left">
          <div className="section-kicker"><span>AI ASSISTANT & CONSTITUTIONAL DIAGNOSIS</span><i/></div>
          <h2 style={{ font: '500 28px "Playfair Display", serif', color: '#1b3b22', margin: '12px 0 14px', lineHeight: '1.25' }}>
            Meet AayuVaidya AI<br/>& <em>Know Your Nadi & Dosha.</em>
          </h2>
          <p style={{ fontSize: '12px', lineHeight: '1.8', color: '#556253', marginBottom: '22px' }}>
            Consult our dedicated Ayurvedic AI assistant trained on classical <em>Charaka Samhita</em> and <em>Kanada Nadi Vijnana</em>. Discover your constitutional balance (Vata, Pitta, Kapha), scriptural Nadi pulse rhythm (Sarpa, Manduka, Hamsa), explore predefined clinical FAQs, and receive personalized dietary (*Ahara*) wisdom.
          </p>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="/vaidya-ai.html" className="btn-primary" style={{ padding: '0 22px', minHeight: '46px', fontSize: '12px' }}>
              Consult AayuVaidya AI ✨ <ArrowUpRight size={16}/>
            </a>
            <a href="/prakriti-quiz.html" className="under-link" style={{ fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Take Nadi & Dosha Quiz <ArrowUpRight size={13}/>
            </a>
            <a href="/vaidya-ai.html" onClick={() => {}} className="under-link" style={{ fontSize: '11px', color: '#6f5739' }}>
              Browse Clinical FAQs <ArrowUpRight size={13}/>
            </a>
          </div>
        </div>

        <div className="dosha-quiz-teaser-right">
          {/* Classical Pulse Quote Card */}
          <div style={{ background: '#faf8f2', border: '1px solid #eae3d2', borderRadius: '14px', padding: '24px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '1.2px', color: '#a88058', textTransform: 'uppercase' }}>
                CLASSICAL NADI SUTRA · KANADA NADI VIJNANA
              </span>
              <span style={{ fontSize: '10px', background: '#2e7d32', color: '#ffffff', padding: '2px 8px', borderRadius: '99px', fontWeight: '600' }}>
                AI Ready
              </span>
            </div>
            <p style={{ font: 'italic 15px "Playfair Display", serif', color: '#1b3b22', margin: '0 0 10px', lineHeight: '1.6' }}>
              “यथा वीणागतास्तन्त्री सर्वान् रागान् प्रभाषते।<br/>
              तथा हस्तगता नाडी सर्वान् रोगान् प्रकाशते॥”
            </p>
            <p style={{ fontSize: '11px', color: '#687364', lineHeight: '1.6', margin: '0 0 16px' }}>
              <em>“Just as strings of a veena express every melodic raga, the radial pulse reveals every subtle state of health and imbalance within the human body.”</em>
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', borderTop: '1px solid #e5decb', paddingTop: '14px' }}>
              <div style={{ textAlign: 'center' }}>
                <b style={{ display: 'block', fontSize: '11px', color: '#1b3b22' }}>Vata Pulse</b>
                <span style={{ fontSize: '9px', color: '#888f82' }}>Sarpa (Serpent)</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <b style={{ display: 'block', fontSize: '11px', color: '#1b3b22' }}>Pitta Pulse</b>
                <span style={{ fontSize: '9px', color: '#888f82' }}>Manduka (Frog)</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <b style={{ display: 'block', fontSize: '11px', color: '#1b3b22' }}>Kapha Pulse</b>
                <span style={{ fontSize: '9px', color: '#888f82' }}>Hamsa (Swan)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
