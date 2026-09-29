import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check, 
  Clock3, HeartPulse, Leaf, MapPin, Phone, ShieldCheck, Sparkles, Stethoscope, Video 
} from 'lucide-react';
import './subpages.css';
import { SiteHeader, phonePrimary } from './SiteHeader.jsx';
import { 
  PaytmPaymentCard,
  PhonePePaymentCard, 
  saveMasterclassRegistration, 
  exportRegistrationsToCSV, 
  getAllRegistrations,
  HeightAdminModal 
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
        <a href="/#booking" className="sub-cta">Book a consultation <ArrowUpRight size={16}/></a>
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
                <a href="/#booking" className="therapy-book">Ask about this care <ArrowUpRight size={14}/></a>
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
    <PageShell breadcrumb="Cashless Mediclaim Insurance">
      <section className="sub-hero insurance-hero">
        <a className="back-link" href="/"><ArrowLeft size={14}/> BACK TO HOME</a>
        <div className="sub-overline">CARE WITH CLEAR NEXT STEPS</div>
        <h1>Cashless insurance<br/><em>support for eligible care.</em></h1>
        <p>AayuTatva accepts cashless insurance requests for eligible in-patient AYUSH care. Coverage and cashless approval depend on your policy, insurer/TPA network, and pre-authorisation.</p>
        <div className="insurance-hero-actions">
          <a href={`tel:${phone}`} className="sub-cta"><Phone size={15}/> Check your cover</a>
          <a href="#network-list" className="sub-secondary">See insurer information <ArrowRight size={15}/></a>
        </div>
        <div className="nabh-badge">
          <img src="/media/brands/nabh.png" alt="NABH Accredited"/>
          <span><b>NABH-APPROVED HOSPITAL</b><small>Patient safety and quality of care</small></span>
        </div>
      </section>

      <section className="insurance-steps">
        <div className="sub-overline">BEFORE YOUR ADMISSION</div>
        <h2>Understand your<br/><em>insurance steps.</em></h2>
        <div className="steps-grid">
          <article>
            <span>01</span>
            <h3>Check eligibility</h3>
            <p>Call with your insurer or TPA name, policy details, and planned care so the team can help check requirements.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Request pre-authorisation</h3>
            <p>Cashless admission requires approval from your insurer/TPA. The hospital team can guide you on the documents requested.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Confirm what is covered</h3>
            <p>Limits, exclusions, room eligibility, and final approval are decided by your insurer under your policy terms.</p>
          </article>
        </div>
        <div className="insurance-callout">
          <ShieldCheck size={22}/>
          <p><b>Cashless does not mean automatic approval.</b> Please confirm eligibility with your insurer before admission. Reimbursement may be an option if cashless approval is unavailable, subject to your policy.</p>
        </div>
      </section>

      <section className="network-list" id="network-list">
        <div className="network-mark"><ShieldCheck size={24}/></div>
        <div>
          <div className="sub-overline">INSURER / TPA NETWORK</div>
          <h2>Confirm your provider<br/><em>before you visit.</em></h2>
          <p>Browse insurer and TPA information for cashless AYUSH care. Network participation and approval depend on your policy, treatment, and current insurer requirements.</p>
          <div className="insurer-grid">
            {insurers.map((insurer) => (
              <div className="insurer-tile" key={insurer.name}>
                <img src={insurer.logo} alt=""/>
                <span className="insurer-wordmark">{insurer.name}</span>
              </div>
            ))}
          </div>
          <a href={`tel:${phone}`} className="sub-cta">Call to check your insurer <ArrowUpRight size={16}/></a>
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
    if (!form.city.trim()) errs.city = 'Please enter your location/city';
    if (!form.currentHeight.trim()) errs.currentHeight = 'Please enter current height (e.g. 5 ft 3 in or 160 cm)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleStep1Submit(e) {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      const el = document.getElementById('register');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async function handleStep2Submit(e) {
    e.preventDefault();
    if (!form.upiRef.trim() || form.upiRef.trim().length < 6) {
      setErrors({ upiRef: 'Please enter the 12-digit UPI UTR / Transaction Reference ID' });
      return;
    }
    setLoading(true);
    try {
      const saved = await saveMasterclassRegistration(form);
      setConfirmedData(saved);
      setStep(3);
    } catch (err) {
      alert('Could not complete registration. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell breadcrumb="Height Growth Masterclass (20 Oct)">
      {/* Masterclass Hero Section */}
      <section className="sub-hero height-hero">
        <a className="back-link" href="/"><ArrowLeft size={14}/> BACK TO HOME</a>
        <div className="sub-overline">
          🔴 LIVE CAMPAIGN · 20TH OCTOBER 2026 · ONLINE (ZOOM / MEET) · FEE: ₹9 ONLY
        </div>
        <h1>Unlock Your Natural Height:<br/><em>60-Minute Ayurvedic Growth Masterclass</em></h1>
        <p>
          Discover how authentic Ayurvedic <strong>Asthi Dhatu nourishment</strong>, spinal decompression yoga, 
          and pituitary growth hormone stimulation help you unlock your natural height potential safely without harmful chemicals or pills.
        </p>

        <div className="insurance-hero-actions">
          <a className="sub-cta" href="#register">
            <Video size={16}/> Register Now (₹9) <ArrowDownIcon/>
          </a>
          <button 
            type="button" 
            onClick={() => setAdminOpen(true)}
            className="sub-secondary cursor-pointer"
          >
            Hospital Leads & Excel Export <ArrowUpRight size={15}/>
          </button>
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
          <small>ONLINE MASTERCLASS ON 20 OCT 2026 · MEETING LINK SHARED 7 DAYS PRIOR VIA WHATSAPP</small>
        </div>
      </section>

      {/* Registration Section with Direct ₹9 PhonePe UPI Payment */}
      <section className="height-content" id="register">
        <div className="height-copy">
          <div className="sub-overline">OCTOBER 20TH MASTERCLASS DETAILS</div>
          <h2>Join the live session<br/><em>for just ₹9.</em></h2>
          <p>
            We are charging a nominal commitment fee of <strong>₹9</strong> to ensure serious participants. 
            The session link (Zoom / Google Meet) will be shared directly to your WhatsApp and Email <strong>7 days before the session</strong>.
          </p>
          
          <div className="growth-points">
            <div><Check size={15}/><span><strong>Date:</strong> Sunday, 20th October 2026 (Live 60-Min Session)</span></div>
            <div><Check size={15}/><span><strong>Platform:</strong> Online Zoom / Google Meet</span></div>
            <div><Check size={15}/><span><strong>Meeting Link:</strong> Shared 7 days prior directly on WhatsApp</span></div>
            <div><Check size={15}/><span><strong>Who Should Attend:</strong> Ages 12 to 25 & concerned parents</span></div>
            <div><Check size={15}/><span><strong>Live Doctor Q&A:</strong> Ask your personal growth questions</span></div>
          </div>

          <div className="growth-caveat">
            <ShieldCheck size={17}/>
            <p>100% direct hospital settlement via Paytm UPI (paytm.s1j7ydq@pty). Transparent, doctor-led clinical education.</p>
          </div>
        </div>

        {/* Dynamic Multi-Step Card */}
        <div className="session-card">
          <div className="session-card-head">
            <span><CalendarDays size={17}/> 20 OCT MASTERCLASS</span>
            <span className="session-pill">₹9 REGISTRATION FEE</span>
          </div>

          {/* STEP 1: FORM */}
          {step === 1 && (
            <>
              <h3>Reserve your place<br/><em>on 20th October.</em></h3>
              <p>Enter your details below to receive the meeting link 7 days before the session.</p>
              
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
                    Current Height *
                    <input 
                      name="currentHeight" 
                      value={form.currentHeight} 
                      onChange={update} 
                      placeholder="e.g. 5 ft 3 in" 
                      required
                    />
                    {errors.currentHeight && <span className="text-[10px] text-red-600">{errors.currentHeight}</span>}
                  </label>

                  <label>
                    City / Location *
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

                <button className="sub-cta form-cta cursor-pointer" type="submit">
                  Proceed to Pay ₹9 Fee <ArrowUpRight size={16}/>
                </button>
                <small className="form-privacy">Nominal fee of ₹9 ensures dedicated attendees. Meeting link sent via WhatsApp.</small>
              </form>
            </>
          )}

          {/* STEP 2: PHONEPE UPI PAYMENT */}
          {step === 2 && (
            <div className="py-2">
              <div className="text-center mb-3">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                  Step 2 of 2: Pay ₹9 Fee
                </span>
                <h4 className="text-sm font-bold text-[#1B3B22] mt-1">
                  Scan & Pay ₹9 to Confirm Seat
                </h4>
              </div>

              <PaytmPaymentCard 
                upiId="paytm.s1j7ydq@pty"
                name="DR YERPUDES AYUTATVA"
                amount={9}
              />

              <form onSubmit={handleStep2Submit} className="mt-4 bg-stone-100/80 p-3.5 rounded-xl border border-stone-200">
                <label>
                  Enter 12-Digit UPI Ref / UTR No *
                  <input
                    name="upiRef"
                    value={form.upiRef}
                    onChange={update}
                    placeholder="e.g. 427819384920"
                    required
                    className="font-mono text-center tracking-wider text-xs"
                  />
                </label>
                {errors.upiRef && <span className="text-[10px] text-red-600 block">{errors.upiRef}</span>}

                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-stone-200 text-stone-700 text-xs font-bold py-2 rounded"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 bg-emerald-700 text-white text-xs font-bold py-2 rounded shadow"
                  >
                    {loading ? 'Confirming...' : 'Complete Registration'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: TICKET CONFIRMATION */}
          {step === 3 && confirmedData && (
            <div className="session-success">
              <span><Check size={22}/></span>
              <h3>Registration Confirmed!</h3>
              <p>
                Booking ID: <strong>{confirmedData.id}</strong><br/>
                We have registered <strong>{confirmedData.name}</strong> for the 20th Oct Masterclass.
              </p>
              <div className="bg-emerald-50 text-emerald-950 p-3 rounded-lg text-xs my-2 text-left">
                <strong>📅 Meeting Link Notification:</strong><br/>
                The official Zoom / Google Meet joining link will be sent to your WhatsApp (<strong>{confirmedData.whatsapp}</strong>) 7 days before the session.
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <a
                  href={`https://wa.me/917758816074?text=${encodeURIComponent(`Hello AayuTatva Hospital, I have registered for the 20 Oct Height Growth Masterclass. My Booking ID is ${confirmedData.id} (Name: ${confirmedData.name}). Please confirm!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sub-cta text-center"
                >
                  <Phone size={14}/> Send Confirmation to WhatsApp
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
