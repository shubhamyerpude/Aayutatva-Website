import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check, 
  Clock3, HeartPulse, Leaf, MapPin, Phone, ShieldCheck, Sparkles, Stethoscope, Video, MessageCircle 
} from 'lucide-react';
import './subpages.css';
import { SiteHeader, phonePrimary } from './SiteHeader.jsx';
import { 
  saveMasterclassRegistration, 
  exportRegistrationsToCSV, 
  getAllRegistrations,
  HeightAdminModal,
  WHATSAPP_GROUP_LINK 
} from './HeightMasterclassCampaign.jsx';

const phone = phonePrimary;
const googleMaps = 'https://www.google.com/maps/place/Dr.+Yerpude%27s+AayuTatva+Ayurvedic+Hospital+%26+Panchakarma+Centre/@21.1741166,79.6442647,17z/data=!4m6!3m5!1s0x3a2b39df27db6025:0xee597cf866c04adf!8m2!3d21.1741166!4d79.6442647!16s%2Fg%2F11lz6hdbmr';

const therapies = [
  {id:'height-growth',no:'01',title:'Height & growth consultations',label:'CURRENT FOCUS',copy:'A doctor-led starting point for families with questions about a child’s height or growth pattern. The consultation can review age, growth history, family context, and whether further assessment is appropriate.',note:'Growth varies from child to child. A consultation cannot promise a specific height increase; seek an appropriate paediatric assessment for ongoing growth concerns.'},
  {id:'joint-spine',no:'02',title:'Joint & spine care',label:'BONE · JOINT · SPINE',copy:'Consultation for joint and back discomfort, arthritis, sciatica, cervical concerns, frozen shoulder, gout, and related mobility issues. Care options are discussed after an individual assessment.',note:'Seek urgent medical care for sudden weakness, loss of bladder or bowel control, major injury, or rapidly worsening symptoms.'},
  {id:'panchakarma',no:'03',title:'Panchakarma & Takradhara',label:'TRADITIONAL AYURVEDA',copy:'Personalized Panchakarma and Takradhara consultations, with the choice and timing of any therapy guided by a practitioner after discussing your health history and needs.',note:'Therapies are not suitable for everyone. A clinician should review your health history, medicines, and current symptoms before treatment.'},
  {id:'digestive',no:'04',title:'Digestive health',label:'PERSONALIZED CARE',copy:'An Ayurvedic consultation for digestive concerns, including a review of symptoms, routine, diet, and relevant history before discussing next steps.',note:'Severe pain, bleeding, dehydration, unexplained weight loss, or persistent symptoms warrant prompt medical evaluation.'},
  {id:'skin',no:'05',title:'Skin & scalp concerns',label:'SKIN HEALTH',copy:'Consultation for concerns such as psoriasis and other recurring skin or scalp symptoms, with an assessment to help guide an appropriate care plan.',note:'A new, rapidly spreading, infected, or painful rash should be assessed promptly by a qualified clinician.'},
  {id:'womens-health',no:'06',title:'Women’s health & PCOD',label:'WOMEN’S WELLBEING',copy:'A confidential consultation for menstrual and PCOD-related concerns, focused on understanding your history and discussing suitable options with a practitioner.',note:'Treatment decisions should be individualized. Do not stop prescribed medicines without speaking to your treating clinician.'},
  {id:'lifestyle',no:'07',title:'Lifestyle & other concerns',label:'WHOLE-PERSON CONSULTATION',copy:'Consultations are also available for concerns including migraine, piles, and general wellbeing. The doctor can advise whether Ayurvedic care is appropriate or a referral is needed.',note:'Urgent or severe symptoms need appropriate emergency or specialist care.'},
  {id:'infertility',no:'08',title:'Infertility & reproductive wellbeing',label:'FERTILITY CONSULTATIONS',copy:'Private consultations for people seeking support with fertility concerns. The clinician can review your history and discuss appropriate Ayurvedic care alongside any investigations or specialist care.',note:'Fertility concerns have many possible causes. Evaluation by an appropriate fertility specialist may be important; do not delay testing or stop prescribed treatment.'},
  {id:'diabetes',no:'09',title:'Diabetes management support',label:'METABOLIC HEALTH',copy:'Ayurvedic consultations for people living with diabetes, focused on your overall health, daily routine, and supportive care options.',note:'Do not stop insulin or prescribed diabetes medicines. Continue monitoring and care with your diabetes clinician.'},
  {id:'weight-care',no:'10',title:'Weight & obesity management',label:'LIFESTYLE CARE',copy:'Personalized consultation for weight-related health goals, with discussion of health history, routines, and sustainable support options.',note:'Weight management should be individualized, safe, and coordinated with care for any related health conditions.'},
  {id:'hair-care',no:'11',title:'Hair, scalp & trichology care',label:'HAIR & SCALP',copy:'Consultations for concerns such as hair fall, dandruff, scalp psoriasis, and hair thinning, with an assessment before discussing suitable care.',note:'Sudden, patchy, painful, or rapidly progressing hair loss needs medical evaluation.'},
  {id:'garbha-sanskar',no:'12',title:'Garbha Sanskar consultations',label:'MATERNAL WELLBEING',copy:'Consultations for families interested in Garbha Sanskar and wellbeing during pregnancy, with guidance tailored to the parent’s health and stage of pregnancy.',note:'Pregnancy care must remain coordinated with your obstetric team. Check with them before starting herbs, supplements, or therapies.'},
];

const insurers = [
  {name:'Star Health',logo:'/media/brands/star-health.png'},
  {name:'HDFC ERGO',logo:'/media/brands/hdfc-ergo.png'},
  {name:'ICICI Lombard',logo:'/media/brands/icici-lombard.png'},
  {name:'Niva Bupa',logo:'/media/brands/niva-bupa.png'},
  {name:'Care Health',logo:'/media/brands/care-health.png'},
  {name:'New India Assurance',logo:'/media/brands/new-india-assurance.png'},
];

function PageFooter() {
  return (
    <footer className="sub-footer">
      <a href="/" className="sub-brand" aria-label="AayuTatva home">
        <img src="/media/aayutatva-logo.png" alt="AayuTatva Ayurvedic Hospital logo"/>
      </a>
      <span>Dr. Manish Santosh Yerpude · Bhandara</span>
      <button 
        type="button" 
        onClick={() => window.dispatchEvent(new CustomEvent('open-height-admin'))} 
        style={{ background: 'none', border: 'none', color: '#d5aa7c', cursor: 'pointer', fontSize: '11px', textDecoration: 'underline' }}
        title="Internal Staff Access"
      >
        Staff Portal (Leads & Excel)
      </button>
      <a href="/">Back to home <ArrowRight size={14}/></a>
    </footer>
  );
}

function PageShell({ breadcrumb, children }) {
  return (
    <div className="subpage">
      <SiteHeader breadcrumb={breadcrumb} />
      <main>{children}</main>
      <PageFooter/>
    </div>
  );
}

export function TreatmentsPage() {
  return (
    <PageShell breadcrumb="Our Specialities">
      <section className="sub-hero treatments-hero">
        <a className="back-link" href="/"><ArrowLeft size={14}/> BACK TO HOME</a>
        <div className="sub-overline">THOUGHTFUL, PERSONAL AYURVEDIC CARE</div>
        <h1>Our Specialities, with<br/><em>you at the centre.</em></h1>
        <p>Explore consultations across joint and spine care, Panchakarma, women’s health, skin and hair, digestion, fertility, and lifestyle concerns. Each recommendation begins with a personal assessment.</p>
        <a href="/book-appointment.html" className="sub-cta">Book a consultation <ArrowUpRight size={16}/></a>
      </section>

      <section className="treatment-directory">
        <div className="directory-side">
          <div className="sub-overline">AREAS OF CARE</div>
          <h2>Find the right<br/><em>speciality.</em></h2>
          <p>Select an area below to read more about what a first consultation may cover.</p>
          <a className="directory-call" href={`tel:${phone}`}><Phone size={16}/> +91 77588 16074</a>
        </div>
        <div className="directory-list">
          {therapies.map((t) => (
            <article className="therapy-detail" id={t.id} key={t.id}>
              <span className="therapy-number">{t.no} / 12</span>
              <div>
                <span className="therapy-label">{t.label}</span>
                <h3>{t.title}</h3>
                <p>{t.copy}</p>
                <div className="clinical-note">
                  <ShieldCheck size={16}/>
                  <span>{t.note}</span>
                </div>
                <a href="/book-appointment.html" className="therapy-book">Ask about this care <ArrowUpRight size={14}/></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="treatment-disclaimer">
        <Sparkles size={18}/>
        <p>This page describes clinical speciality areas, not a self-diagnosis or guarantee of outcome. Your practitioner will discuss benefits, limitations, and appropriate alternatives for your situation.</p>
      </section>
    </PageShell>
  );
}

export function InsurancePage() {
  return (
    <PageShell breadcrumb="Hospital Admission & In-Patient Guide">
      <section className="sub-hero insurance-hero">
        <a className="back-link" href="/"><ArrowLeft size={14}/> BACK TO HOME</a>
        <div className="sub-overline">NABH-ALIGNED CLINICAL CARE · IN-PATIENT ADMISSION</div>
        <h1>Hospital In-Patient (IPD) Care &<br/><em>Admission Guidelines.</em></h1>
        <p>
          AayuTatva Ayurvedic Hospital provides structured in-patient clinical programs for chronic spine, joint rehabilitation, and supervised classical Panchakarma. 
        </p>
        <div className="insurance-hero-actions">
          <a href={`tel:${phone}`} className="sub-cta"><Phone size={15}/> Call Hospital Desk</a>
          <a href="/terms.html" className="sub-secondary">Hospital Terms & Policies <ArrowRight size={15}/></a>
        </div>
        <div className="nabh-badge">
          <img src="/media/brands/nabh.png" alt="NABH Accredited"/>
          <span><b>NABH-APPROVED HOSPITAL</b><small>Patient safety and clinical quality</small></span>
        </div>
      </section>

      <section className="insurance-steps">
        <div className="sub-overline">IN-PATIENT ADMISSION PROTOCOL</div>
        <h2>Clinical care with<br/><em>transparent steps.</em></h2>
        <div className="steps-grid">
          <article>
            <span>01</span>
            <h3>Clinical Doctor Assessment</h3>
            <p>Our senior doctors (Dr. Manish Yerpude / Dr. Sakshi Sonkusare) examine your pulse, spine X-rays/MRIs, and medical history to design your personalized treatment plan.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Admission & Therapy Regimen</h3>
            <p>Under supervised hospital care, patients receive authentic Panchakarma, Janu Basti, Kati Basti, Takradhara, and specific herbal formulations.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Documentation & Discharge Summary</h3>
            <p>Complete clinical discharge documentation, daily doctor rounding notes, and bill summaries are provided for your permanent medical records.</p>
          </article>
        </div>
        
        <div className="insurance-callout" style={{ marginTop: '28px' }}>
          <ShieldCheck size={24}/>
          <p>
            <b>Mediclaim / TPA Claims:</b> For patients holding valid health insurance policies, in-patient Ayurvedic treatments under AYUSH guidelines may be eligible for TPA claims or reimbursement. All claim facilitation, documentation, and compliance details have been formally relocated to our <a href="/terms.html" style={{ textDecoration: 'underline', fontWeight: 'bold', color: 'inherit' }}>Hospital Terms & Compliance Policy</a>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

export function HeightSessionPage() {
  const [step, setStep] = useState(1); // 1 = Form, 2 = Payment QR, 3 = Confirmed
  const [adminOpen, setAdminOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);
  const [heightUnit, setHeightUnit] = useState('FT'); // 'FT' or 'CM'

  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    email: '',
    age: '',
    gender: 'Male',
    currentHeight: '',
    goal: '',
    city: '',
    upiRef: '',
  });

  const [errors, setErrors] = useState({});

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validateStep1() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your full name';
    if (!form.whatsapp.trim()) {
      errs.whatsapp = 'WhatsApp number is required to receive meeting link';
    } else if (form.whatsapp.replace(/\D/g, '').length < 10) {
      errs.whatsapp = 'Enter a valid 10-digit WhatsApp number';
    }
    if (!form.age) errs.age = 'Please enter your age';
    if (!form.city.trim()) errs.city = 'Please enter your city';
    if (!form.currentHeight.trim()) {
      errs.currentHeight = heightUnit === 'FT' ? 'Please enter height (e.g. 5ft 4 in)' : 'Please enter height (e.g. 150 CM)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleStep1Submit(e) {
    e.preventDefault();
    if (!validateStep1()) return;

    setLoading(true);
    try {
      const rawHeight = form.currentHeight.trim();
      let formattedHeight = rawHeight;
      if (heightUnit === 'CM' && !rawHeight.toLowerCase().includes('cm')) {
        formattedHeight = `${rawHeight} CM`;
      } else if (heightUnit === 'FT' && !rawHeight.toLowerCase().includes('ft') && !rawHeight.includes("'")) {
        formattedHeight = `${rawHeight} ft`;
      }

      const saved = await saveMasterclassRegistration({
        ...form,
        currentHeight: formattedHeight,
        whatsappGroup: WHATSAPP_GROUP_LINK,
        fee: 0,
        upiRef: 'FREE-WORKSHOP',
        status: 'Free Workshop Registration Confirmed'
      });
      setConfirmedData(saved);
      setStep(3);

      // Automatically redirect user to WhatsApp Group
      setTimeout(() => {
        try {
          window.location.href = WHATSAPP_GROUP_LINK;
        } catch (e) {
          window.open(WHATSAPP_GROUP_LINK, '_blank');
        }
      }, 1000);

    } catch (err) {
      alert('Could not update registration in sheet. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleStep2Submit(e) {
    if (e && e.preventDefault) e.preventDefault();
    setStep(3);
  }

  return (
    <PageShell breadcrumb="Height Growth Guidance">
      {/* Masterclass Hero Section */}
      <section className="sub-hero height-hero">
        <a className="back-link" href="/"><ArrowLeft size={14}/> BACK TO HOME</a>
        <div className="sub-overline">
          🔴 AYURVEDIC PEDIATRIC & ADOLESCENT GROWTH GUIDANCE · 100% FREE WORKSHOP
        </div>
        <h1>Unlock Your Natural Height:<br/><em>60-Minute Ayurvedic Growth Masterclass</em></h1>
        <p>
          Discover how authentic Ayurvedic <strong>Asthi Dhatu nourishment</strong>, spinal decompression yoga, 
          and pituitary growth hormone stimulation help you unlock your natural height potential safely without harmful chemicals or pills.
        </p>

        <div className="insurance-hero-actions">
          <a className="sub-cta" href="#register">
            <Video size={16}/> Register Free Seat (25 Oct) <ArrowDownIcon/>
          </a>
        </div>

        <div className="height-doctor-photo">
          <img src="/media/dr-manish-yerpude.jpg" alt="Dr. Manish Santosh Yerpude"/>
          <div className="height-photo-caption">
            <span>CLINICAL MENTORSHIP</span>
            <b>Dr. Manish Santosh Yerpude<br/>[B.A.M.S., MD (AM), P.G.P.P.]</b>
          </div>
        </div>
      </section>

      {/* Campaign Clinical Overview: How We Help Increase Height */}
      <section className="growth-infographic">
        <div className="growth-intro-layout">
          <div className="growth-intro">
            <div className="sub-overline">THE AYURVEDIC SCIENCE OF BONE GROWTH</div>
            <h2>How Ayurveda stimulates<br/><em>natural height gain.</em></h2>
            <p>
              In Ayurveda, skeletal growth is governed by <strong>Asthi Dhatu</strong> (bone tissue metabolism) 
              and <strong>Majja Dhatu</strong> (bone marrow). When metabolic fire (Agni) is stimulated, vital micronutrients 
              and growth factors directly nourish the epiphyseal plates of long bones.
            </p>
          </div>
          <HeightSpineGraphic/>
        </div>

        <div className="growth-steps-visual">
          <article>
            <span className="growth-step-icon"><Leaf size={22}/></span>
            <b>01 · ASTHI NUTRITION</b>
            <h3>Nourish Bone Matrix</h3>
            <p>Classical herbal formulations (Ashwagandha, Shatavari, Asthishrinkhala, Praval) enhance bone density and calcium absorption.</p>
          </article>
          <div className="growth-connector">→</div>
          <article>
            <span className="growth-step-icon"><RulerIcon/></span>
            <b>02 · SPINAL DECOMPRESSION</b>
            <h3>Posture & Disc Hydration</h3>
            <p>Specific asanas decompress the 33 spinal vertebrae, releasing 1–2 inches compressed by poor posture and gravity.</p>
          </article>
          <div className="growth-connector">→</div>
          <article>
            <span className="growth-step-icon chart-icon"><GrowthChart/></span>
            <b>03 · HORMONAL TIMING</b>
            <h3>Pituitary HGH Activation</h3>
            <p>Ayurvedic sleep protocols maximize Human Growth Hormone (HGH) surge released between 10 PM and 2 AM.</p>
          </article>
        </div>

        <div className="growth-quote">
          <span>“Safe, non-surgical bone stimulation rooted in 5,000 years of clinical wisdom.”</span>
          <small>ONLINE CLINICAL SESSION · MEETING LINK SHARED VIA WHATSAPP</small>
        </div>
      </section>

      {/* Registration Section: 100% Free Workshop */}
      <section className="height-content" id="register">
        <div className="height-copy">
          <div className="sub-overline">AYURVEDIC GROWTH SESSION DETAILS</div>
          <h2>Join the live session<br/><em>100% Free Workshop.</em></h2>
          <p>
            Complimentary doctor-led guidance on <strong>Sunday, 25th October 2026 (7:00 PM – 8:00 PM IST)</strong>. 
            The session link (Zoom / Google Meet) will be shared directly to your WhatsApp.
          </p>
          
          <div className="growth-points">
            <div><Check size={15}/><span><strong>Session:</strong> Live 60-Min Doctor Guidance</span></div>
            <div><Check size={15}/><span><strong>Platform:</strong> Online Zoom / Google Meet</span></div>
            <div><Check size={15}/><span><strong>Meeting Link:</strong> Shared directly on WhatsApp</span></div>
            <div><Check size={15}/><span><strong>Who Should Attend:</strong> Ages 12 to 25 & concerned parents</span></div>
            <div><Check size={15}/><span><strong>Live Doctor Q&A:</strong> Ask your personal growth questions</span></div>
          </div>

          <div className="growth-caveat">
            <ShieldCheck size={17}/>
            <p>100% free clinical health education by Dr. Manish Santosh Yerpude at AayuTatva Ayurvedic Hospital, Bhandara.</p>
          </div>
        </div>

        {/* Dynamic Multi-Step Card */}
        <div className="session-card">
          <div className="session-card-head">
            <span><CalendarDays size={17}/> CLINICAL GROWTH SESSION</span>
            <span className="session-pill">100% FREE WORKSHOP</span>
          </div>

          {/* STEP 1: FORM */}
          {step === 1 && (
            <>
              <h3>Reserve your free place<br/><em>on 25th October (Sun, 7–8 PM).</em></h3>
              <p>Enter your details below to receive the meeting link on WhatsApp 3 days before the session (by 22nd Oct).</p>
              
              <form onSubmit={handleStep1Submit} className="space-y-3">
                <label>
                  Full Name of Attendee *
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={update} 
                    placeholder="e.g. Aryan Sharma" 
                    required
                  />
                  {errors.name && <span className="text-[10px] text-red-600">{errors.name}</span>}
                </label>

                <label>
                  WhatsApp Number (To receive Zoom/Meet link) *
                  <input 
                    name="whatsapp" 
                    type="tel" 
                    value={form.whatsapp} 
                    onChange={update} 
                    placeholder="e.g. 9876543210" 
                    required
                  />
                  {errors.whatsapp && <span className="text-[10px] text-red-600">{errors.whatsapp}</span>}
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <label>
                    Age *
                    <input 
                      name="age" 
                      value={form.age} 
                      onChange={update} 
                      placeholder="e.g. 17" 
                      required
                    />
                    {errors.age && <span className="text-[10px] text-red-600">{errors.age}</span>}
                  </label>

                  <label>
                    Gender
                    <span className="sub-select-wrap">
                      <select name="gender" value={form.gender} onChange={update}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span>Current Height *</span>
                      <span style={{ display: 'inline-flex', background: '#e9e3d7', borderRadius: '4px', padding: '2px', fontSize: '10px', fontWeight: 'bold' }}>
                        <button
                          type="button"
                          onClick={() => setHeightUnit('FT')}
                          style={{
                            border: 'none',
                            padding: '2px 7px',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            background: heightUnit === 'FT' ? '#1c3b24' : 'transparent',
                            color: heightUnit === 'FT' ? '#f4eedb' : '#687566'
                          }}
                        >
                          FT
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeightUnit('CM')}
                          style={{
                            border: 'none',
                            padding: '2px 7px',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            background: heightUnit === 'CM' ? '#1c3b24' : 'transparent',
                            color: heightUnit === 'CM' ? '#f4eedb' : '#687566'
                          }}
                        >
                          CM
                        </button>
                      </span>
                    </div>
                    <input 
                      name="currentHeight" 
                      value={form.currentHeight} 
                      onChange={update} 
                      placeholder={heightUnit === 'FT' ? 'e.g. 5ft 4 in' : 'e.g. 150 CM'} 
                      required
                    />
                    <small style={{ display: 'block', fontSize: '10px', color: '#687566', marginTop: '2px' }}>
                      {heightUnit === 'FT' ? 'Example: 5ft 4 in' : 'Example: 150 CM'}
                    </small>
                    {errors.currentHeight && <span className="text-[10px] text-red-600">{errors.currentHeight}</span>}
                  </label>

                  <label>
                    City *
                    <input 
                      name="city" 
                      value={form.city} 
                      onChange={update} 
                      placeholder="e.g. Bhandara" 
                      required
                    />
                    {errors.city && <span className="text-[10px] text-red-600">{errors.city}</span>}
                  </label>
                </div>

                <label>
                  Email Address (Optional)
                  <input 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={update} 
                    placeholder="aryan@gmail.com" 
                  />
                </label>

                <label>
                  Specific Question for the Doctor (Optional)
                  <input 
                    name="goal" 
                    value={form.goal} 
                    onChange={update} 
                    placeholder="e.g. Can I still grow at age 20?" 
                  />
                </label>

                <button 
                  className="sub-cta form-cta cursor-pointer" 
                  type="submit" 
                  disabled={loading}
                  style={{ width: '100%', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', fontWeight: '700' }}
                >
                  <Check size={18}/>
                  <span>{loading ? 'Confirming Seat…' : 'Register Free & Join WhatsApp Group'}</span>
                  <ArrowUpRight size={16}/>
                </button>
                <small className="form-privacy">100% Free Workshop. Meeting link sent via WhatsApp 3 days prior (by 22nd Oct).</small>
              </form>
            </>
          )}

          {/* STEP 3: TICKET CONFIRMATION */}
          {step === 3 && confirmedData && (
            <div className="session-success">
              <span><Check size={22}/></span>
              <h3>Free Workshop Confirmed!</h3>
              <p>
                Booking ID: <strong>{confirmedData.id}</strong><br/>
                We have registered <strong>{confirmedData.name}</strong> for the 25th Oct Masterclass (Sun, 7:00 PM – 8:00 PM Evening).
              </p>
              <div className="bg-emerald-50 text-emerald-950 p-3 rounded-lg text-xs my-2 text-left space-y-1">
                <p>
                  📋 <strong>Updated in Attendee Sheet:</strong> Your details and Booking ID are confirmed in our clinic register.
                </p>
                <p>
                  📲 <strong>WhatsApp Group Redirection:</strong> You are being redirected to the workshop group.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 mt-3">
                <a
                  href={WHATSAPP_GROUP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="sub-cta text-center"
                  style={{ background: '#25D366', borderColor: '#1EBE5D', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700' }}
                >
                  <MessageCircle size={18} fill="#ffffff"/> Join Official WhatsApp Group Now
                </a>
                <a
                  href={`https://wa.me/917758816074?text=${encodeURIComponent([
                    `*AayuTatva Ayurvedic Hospital — Height Masterclass Free Registration*`,
                    `Namaste Dr. Yerpude, I have registered for the Free Natural Height Growth Masterclass.`,
                    ``,
                    `📋 *Booking ID:* ${confirmedData.id}`,
                    `👤 *Attendee Name:* ${confirmedData.name}`,
                    `📞 *WhatsApp Number:* ${confirmedData.whatsapp}`,
                    `🎂 *Age / Gender:* ${confirmedData.age} yrs, ${confirmedData.gender || 'Male'}`,
                    `📏 *Current Height:* ${confirmedData.currentHeight}`,
                    `📍 *City:* ${confirmedData.city}`,
                    `📅 *Session Date & Time:* Sunday, 25 Oct 2026 (Evening 7:00 PM – 8:00 PM)`,
                    `🎟️ *Registration Status:* Free Workshop Confirmed (₹0)`
                  ].join('\n'))}`}
                  target="_blank"
                  rel="noreferrer"
                  className="session-reset text-center"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Phone size={13}/> Send Confirmation Copy to Dr. Yerpude
                </a>
                <button 
                  onClick={() => { setStep(1); setConfirmedData(null); }} 
                  className="session-reset"
                >
                  Register Another Attendee
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Admin Leads & Excel Export Dialog */}
      <HeightAdminModal 
        isOpen={adminOpen} 
        onClose={() => setAdminOpen(false)} 
      />
    </PageShell>
  );
}

function HeightSpineGraphic() {
  return (
    <div className="height-spine-graphic">
      <svg viewBox="0 0 340 280" role="img" aria-label="Height measurement and healthy spine illustration">
        <circle className="spine-halo" cx="178" cy="132" r="102"/>
        <path className="spine-silhouette" d="M183 47c-15 5-24 18-23 33 1 13 10 24 23 28-5 14-7 30-5 47 3 28 13 51 29 72"/>
        <path className="spine-path" d="M176 101c21 7 27 20 15 34-12 13-10 26 4 37 14 12 13 28-1 43"/>
        <g className="vertebrae">
          <circle cx="183" cy="108" r="6"/>
          <circle cx="190" cy="121" r="6"/>
          <circle cx="190" cy="136" r="6"/>
          <circle cx="187" cy="151" r="6"/>
          <circle cx="191" cy="166" r="6"/>
          <circle cx="199" cy="181" r="6"/>
          <circle cx="201" cy="197" r="6"/>
        </g>
        <path className="measure-line" d="M69 54v174M69 66h31M69 96h20M69 126h31M69 156h20M69 186h31M69 216h20"/>
        <path className="growth-arrow" d="M267 218V68m0 0-14 17m14-17 14 17"/>
        <text x="91" y="251">GROWTH · POSTURE · CARE</text>
      </svg>
      <div>
        <b>Understand the whole growth pattern</b>
        <span>Measure consistently, review posture and discuss concerns with a qualified clinician.</span>
      </div>
    </div>
  );
}

function RulerIcon() { return <span className="ruler-emoji" aria-hidden="true">↕</span>; }
function GrowthChart() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M7 39V8M7 39H42M12 34C19 31 19 25 24 25s7-10 14-17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="38" cy="8" r="3" fill="currentColor"/>
    </svg>
  );
}

function ArrowDownIcon() { return <span aria-hidden="true">↓</span>; }
