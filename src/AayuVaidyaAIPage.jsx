import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Send, Activity, HelpCircle, BookOpen, MessageCircle, 
  ArrowRight, ArrowUpRight, CheckCircle2, RotateCcw, ShieldCheck, 
  Phone, User, Leaf, Zap, Droplets, Thermometer, Info, ChevronDown, 
  ChevronUp, Search, Compass, RefreshCw, Star, HeartPulse, Building2, Globe
} from 'lucide-react';
import './subpages.css';
import './portal.css';
import './vaidya-ai.css';
import { SiteHeader, phonePrimary } from './SiteHeader.jsx';
import { generateInternalAyurvedicResponse } from './ayurvedicInternalEngine.ts';

const whatsappPhone = '917758816074';

// Predefined Clinical FAQs with authentic classical knowledge
export const PREDEFINED_FAQS = [
  {
    id: 'faq-nadi-how',
    category: 'Nadi & Pulse',
    q: 'What is Nadi Parikshan and how does pulse diagnosis detect root imbalances?',
    sutra: 'यथा वीणागतास्तन्त्री सर्वान् रागान् प्रभाषते। तथा हस्तगता नाडी सर्वान् रोगान् प्रकाशते॥ (Kanada Nadi Vijnana)',
    shortAns: 'Nadi Parikshan is the 8-fold Ayurvedic pulse examination (Ashtavidha Pariksha) where the physician palpates the radial artery at three distinct finger positions (Angushtha Moola) to detect subtle biological rhythms.',
    detail: 'By placing the index, middle, and ring fingers on the radial artery below the thumb, Dr. Manish Santosh Yerpude detects the unique pulse waveforms:\n\n• Index Finger (Vata): Detects Sarpa Gati (wavy, rapid serpentine movement).\n• Middle Finger (Pitta): Detects Manduka Gati (bounding, hot, leaping frog-like movement).\n• Ring Finger (Kapha): Detects Hamsa Gati (deep, slow, graceful swan-like glide).\n\nIt reveals not merely heart rate, but organ vitality, metabolic Ama (toxins), tissue nourishment (Dhatu poshana), and mental stress levels before physical symptoms manifest.',
    prompt: 'Explain how Nadi Parikshan detects deep metabolic imbalances and what the three finger positions mean.'
  },
  {
    id: 'faq-prakriti-vikriti',
    category: 'Doshas & Prakriti',
    q: 'What is the difference between my Prakriti (birth constitution) and Vikriti (current imbalance)?',
    sutra: 'दोषधातुमलमूलं हि शरीरम्॥ (Sushruta Samhita, Sutrasthana 15.3)',
    shortAns: 'Prakriti is your unchangeable genetic and elemental blueprint formed at conception, whereas Vikriti is your present state of Doshic imbalance caused by lifestyle, diet, stress, and seasons.',
    detail: '• Prakriti (Birth Constitution): Determined by parental doshic dominance at conception. It defines your baseline bone density, natural skin type, metabolism, and temperament. A person may be Vata-Pitta, Pitta-Kapha, or Tridoshic.\n\n• Vikriti (Acquired Imbalance): The deviation from your natural state. For instance, a naturally Kapha person may develop severe Vata aggravation (joint pain, anxiety, insomnia) due to cold weather or erratic travel.\n\nIn Ayurvedic therapy, treatment is always tailored to eliminate the Vikriti while honoring and protecting your baseline Prakriti.',
    prompt: 'What is the difference between my natural Prakriti and current Vikriti, and how do doctors treat them?'
  },
  {
    id: 'faq-ahara-diet',
    category: 'Ahara & Diet',
    q: 'What are the core Ayurvedic diet (Ahara) rules for balancing Vata, Pitta, and Kapha?',
    sutra: 'आहारसम्भवं वस्तु रोगाश्चाहारसम्भवाः। (Charaka Samhita, Sutrasthana 28.45)',
    shortAns: 'Ayurveda uses the 6 tastes (Shad Rasa) as medicine: Sweet, Sour, and Salty pacify Vata; Sweet, Bitter, and Astringent pacify Pitta; Pungent, Bitter, and Astringent pacify Kapha.',
    detail: '• For High Vata: Prioritize warm, freshly cooked, grounding foods enriched with cow ghee, warm sesame oil, cooked root vegetables, warm milk with nutmeg, and unrefined grains. Avoid raw cold salads, iced water, and dry snacks.\n\n• For High Pitta: Favor cooling, naturally sweet, and bitter foods like sweet pomegranates, cucumber, coriander, fennel tea, ghee, coconut water, and mung bean soup. Minimize chilies, mustard, excessive vinegar, deep-fried foods, and alcohol.\n\n• For High Kapha: Emphasize light, dry, and warming foods like barley, millets, roasted chickpeas, ginger-black pepper tea, bitter greens, and steamed vegetables. Strictly minimize heavy sweets, dairy curd (yogurt) at night, and oily gravies.',
    prompt: 'Give me a complete Ayurvedic food guide (Ahara) with foods to eat and foods to avoid for my dosha.'
  },
  {
    id: 'faq-sciatica-spine',
    category: 'Panchakarma & Spine',
    q: 'Can Panchakarma treat Sciatica, slip disc, and chronic back pain without surgery?',
    sutra: 'स्नेहस्वेदाभ्यामन्त्रदोषहरणाच्च वातव्याधिः प्रशाम्यति॥ (Charaka Samhita, Chikitsasthana 28)',
    shortAns: 'Yes. Classical Ayurveda categorizes sciatica and lumbar disc herniations under Gridhrasi and Sandhigata Vata, effectively treated with non-surgical decompression and tissue-nourishing therapies.',
    detail: 'At AayuTatva Hospital, Dr. Manish Yerpude uses a targeted 4-pillar non-surgical protocol:\n\n1. Snehana & Swedana: Deep transdermal oleation with warm medicated herbal decoctions (Mahanarayana and Sahacharadi Taila) to rehydrate dried intervertebral discs.\n2. Kati Basti: Medicated warm herbal oil pools retained over the lumbar vertebrae using a black gram dough ring, releasing spinal nerve root compression.\n3. Patra Pinda & Shashtika Shali Sweda: Herbal leaves and medicinal rice poultices steamed in herbal milk to relieve neuromuscular inflammation.\n4. Medicated Basti: Herbal enemas (the primary seat of Vata in the colon) to heal osteoarticular tissue (Asthi Dhatu) from its biological root.',
    prompt: 'Explain the non-surgical Ayurvedic treatment for slip disc and sciatica at AayuTatva Hospital.'
  },
  {
    id: 'faq-prep-nadi',
    category: 'Nadi & Pulse',
    q: 'How should I prepare before an in-person Nadi Parikshan with Dr. Manish Yerpude?',
    sutra: 'प्रातःकाले शुचौ देशे समोपविश्य नाडीं परीक्षेत॥ (Sharangadhara Samhita)',
    shortAns: 'For the most accurate pulse reading, schedule in the morning on an empty stomach or at least 2.5 to 3 hours after a light meal, without caffeine or strenuous exercise.',
    detail: 'Essential pre-consultation guidelines:\n\n1. Fasting or Light Stomach: Morning hours (between 8:00 AM – 11:30 AM) provide the purest baseline reading before midday digestive fire (Pitta) surges.\n2. Avoid Stimulants: Do not consume tea, coffee, energy drinks, tobacco, or heavy oily snacks for 3 hours prior.\n3. Calm Resting State: Arrive 10 minutes early at our Bhandara clinic to allow your respiratory and arterial rhythm to settle.\n4. Avoid Immediately After Bath: Do not undergo pulse testing immediately after a hot bath or heavy gym workout.\n5. Women\'s Health Note: Mention your menstrual cycle phase to the doctor, as hormonal shifts naturally alter the arterial pulse wave.',
    prompt: 'How should I prepare for an in-person pulse diagnosis (Nadi Parikshan) at AayuTatva Hospital?'
  },
  {
    id: 'faq-insurance-cashless',
    category: 'Hospital & Insurance',
    q: 'Is Ayurvedic hospital treatment covered by Cashless Mediclaim Insurance?',
    sutra: 'NABH Quality Accredited Healthcare · IRDAI Approved AYUSH Coverage',
    shortAns: 'Yes! AayuTatva Ayurvedic Hospital is NABH-accredited, qualifying for 100% cashless mediclaim under IRDAI AYUSH guidelines.',
    detail: 'Under Insurance Regulatory and Development Authority of India (IRDAI) guidelines, active health insurance policies cover inpatient (IPD) and qualified day-care Ayurvedic treatments.\n\nWe provide direct cashless pre-authorization and reimbursement assistance for:\n• Star Health & Allied Insurance\n• HDFC ERGO General Insurance\n• ICICI Lombard\n• Niva Bupa Health Insurance\n• Care Health Insurance\n• Leading Third Party Administrators (TPAs: Vidal Health, Medi Assist, FHPL, Raksha, etc.)\n\nOur insurance desk reviews your policy pre-admission to verify zero out-of-pocket hurdles.',
    prompt: 'How does 100% cashless health insurance work for Ayurvedic treatment at AayuTatva Hospital?'
  },
  {
    id: 'faq-herbs-stress',
    category: 'Herbal Medicine',
    q: 'Which classical Ayurvedic herbs help relieve chronic stress, anxiety, and sleeplessness (Nidranasha)?',
    sutra: 'मेध्यानि च रसायनानि विशेषेण शंखपुष्पी ब्राह्मी मण्डूकपर्णी॥ (Charaka Samhita)',
    shortAns: 'Classical Medhya Rasayana herbs such as Brahmi (Bacopa), Shankhpushpi, Ashwagandha, and Jatamansi calm the central nervous system without causing sedative dependency.',
    detail: '• Ashwagandha (Withania somnifera): Potent adaptogen that modulates cortisol, strengthens the adrenal axis, and grounds agitated Prana Vata.\n• Brahmi & Mandukaparni: Enhance neuro-synaptic transmission, calm racing thoughts, and improve cognitive memory.\n• Jatamansi (Nardostachys jatamansi): Renowned in Charaka Samhita for inducing deep, restorative natural sleep.\n• External Shirodhara & Takradhara: Continuous rhythmic pouring of warm medicated herbal oil or cooling medicated buttermilk over the Ajna Chakra (forehead), shown in clinical studies to activate the parasympathetic vagal tone.',
    prompt: 'What Ayurvedic herbs and therapies are best for chronic anxiety, stress, and insomnia?'
  },
  {
    id: 'faq-ai-vs-doctor',
    category: 'Nadi & Pulse',
    q: 'Can an AI assistant replace an in-person pulse examination by an Ayurvedic doctor?',
    sutra: 'प्रत्यक्षं हि अल्पम्, अनल्पम् अप्रत्यक्षम्॥ (Charaka Samhita, Sutrasthana 11.7)',
    shortAns: 'No. While AayuVaidya AI provides comprehensive educational wisdom and lifestyle recommendations, physical pulse palpation (Sparshana Pariksha) requires the tactile expertise of a qualified Vaidya.',
    detail: 'Ayurvedic diagnosis requires the threefold clinical examination:\n1. Darshana (Visual observation of gait, tongue, eyes, and skin complexion).\n2. Sparshana (Tactile palpation of the radial artery, spine, abdominal marmas, and skin temperature).\n3. Prashna (In-depth clinical questioning about diet, bowel habits, sleep patterns, and emotional state).\n\nAayuVaidya AI serves as your 24/7 knowledge companion and initial self-assessment tool. For clinical diagnosis and customized herbal prescriptions, please consult Dr. Manish Santosh Yerpude at AayuTatva Hospital in Bhandara.',
    prompt: 'Explain why physical pulse diagnosis by Dr. Manish Yerpude is essential alongside AI guidance.'
  }
];

// Interactive Quiz Questions (3-4 questions per instructions)
export const QUIZ_QUESTIONS = [
  {
    id: 'body_frame',
    category: '1. PHYSICAL BUILD (DEHA PRAKRITI)',
    icon: <User size={18}/>,
    q: 'How would you describe your natural physical frame & bone structure?',
    subtext: 'Observed during classical Rogi Pariksha (Charaka Samhita body constitution inspection).',
    options: [
      { label: 'Slender, thin bones, prominent joints, quick movements, difficulty gaining weight', dosha: 'Vata' },
      { label: 'Medium athletic build, balanced muscle tone, easily gains or loses weight with diet', dosha: 'Pitta' },
      { label: 'Broad shoulders, heavy bone density, solid frame, gains weight easily and holds it', dosha: 'Kapha' }
    ]
  },
  {
    id: 'digestion',
    category: '2. DIGESTIVE FIRE (JATHARAGNI & KOSTHA)',
    icon: <Zap size={18}/>,
    q: 'How does your digestive fire (Agni) behave on a day-to-day basis?',
    subtext: 'Central to Ayurvedic pathology: Agni governs metabolic transformation and Ama (toxin) formation.',
    options: [
      { label: 'Irregular (Vishamagni): fluctuating appetite, gas, bloating, tendency toward constipation', dosha: 'Vata' },
      { label: 'Sharp & Intense (Tikshnagni): cannot skip meals without irritability, acidity, heartburn, loose stools', dosha: 'Pitta' },
      { label: 'Slow & Heavy (Mandagni): low appetite, feeling heavy or sluggish for hours after meals', dosha: 'Kapha' }
    ]
  },
  {
    id: 'climate',
    category: '3. THERMAL TOLERANCE (SHEETA / USHNA)',
    icon: <Thermometer size={18}/>,
    q: 'What is your climatic and seasonal temperature tolerance?',
    subtext: 'Classical elemental thermal reactivity evaluated in Svasthavritta (Ayurvedic hygiene).',
    options: [
      { label: 'Averse to cold winds & winter; naturally craves warmth, hot beverages, blankets and summer sun', dosha: 'Vata' },
      { label: 'Averse to hot summers, direct sun & humid heat; craves air conditioning, shade and cold drinks', dosha: 'Pitta' },
      { label: 'Dislikes cold, wet and damp humidity; thrives best in dry, warm, well-ventilated weather', dosha: 'Kapha' }
    ]
  },
  {
    id: 'mind_sleep',
    category: '4. MIND, STRESS & SLEEP (MANASA PRAKRITI & NIDRA)',
    icon: <Activity size={18}/>,
    q: 'When under stress or in your sleep routine, what is your natural tendency?',
    subtext: 'Reflects mental constitution (Manasa Prakriti) and autonomic neuro-endocrine regulation.',
    options: [
      { label: 'Restless overthinking, anxiety under pressure; light, interrupted sleep and easily awakened', dosha: 'Vata' },
      { label: 'Impatience, fiery perfectionism; moderate 6–7 hours sound sleep, wakes up warm and active', dosha: 'Pitta' },
      { label: 'Calm, patient, dislikes conflict; deep heavy 8+ hours sleep and difficulty waking early', dosha: 'Kapha' }
    ]
  }
];

const PAGE_WELCOME_MESSAGES = {
  mr: `### नमस्कार 🙏 आयुवैद्य एआय मध्ये आपले स्वागत आहे

मी **आयुतत्व आयुर्वेदिक हॉस्पिटल व पंचकर्म केंद्र**, भंडारा चा ज्ञान सहाय्यक आहे. 
खालील विषयांवर विचारून त्वरित मार्गदर्शन मिळवा:

• 🦴 **मणके, स्लिप डिस्क व सायटिका** विना-ऑपरेशन उपचार
• 🦵 **गुडघेदुखी, झीज व संधिवात** पंचकर्म उपचार
• 🩺 **नाडी परीक्षा (Pulse Diagnosis)** व प्रकृती
• 🍲 **वात, पित्त, कफ पथ्यकर आहार नियम**
• 🌸 **५ शास्त्रीय पंचकर्म व डिटॉक्स**
• 🏥 **१००% कॅशलेस मेडिक्लेम विमा सुविधा**

*आपला प्रश्न खाली टाईप करा किंवा खालील सुचवलेल्या बटनांवर टॅप करा.*`,

  hi: `### नमस्ते 🙏 आयुवैद्य एआई में आपका स्वागत है

मैं **आयुतत्व आयुर्वेदिक हॉस्पिटल एवं पंचकर्म केंद्र**, भंडारा का ज्ञान सहायक हूँ।
निम्नलिखित विषयों पर त्वरित मार्गदर्शन प्राप्त करें:

• 🦴 **स्लिप डिस्क, साइटिका व कमर दर्द** बिना ऑपरेशन उपचार
• 🦵 **घुटनों का दर्द, कार्टिलेज घिसना व गठिया**
• 🩺 **नाड़ी परीक्षा** एवं त्रिदोष जांच
• 🍲 **वात, पित्त, कफ आहार एवं परहेज**
• 🌸 **5 शास्त्रीय पंचकर्म डिटॉक्स**
• 🏥 **100% कैशलेस मेडिक्लेम बीमा**

*कृपया अपना प्रश्न नीचे लिखें या दिए गए विषयों पर क्लिक करें।*`,

  en: `### Namaste 🙏 Welcome to AayuVaidya AI

I am your clinical knowledge assistant for **AayuTatva Ayurvedic Hospital & Panchakarma Centre**, Bhandara.
Ask for quick guidance on:

• 🦴 **Slip Disc, Sciatica & Spine Care** (non-surgical)
• 🦵 **Knee Osteoarthritis & Joint Pain**
• 🩺 **Nadi Parikshan (Radial Pulse Diagnosis)**
• 🍲 **Personalized Ahara (Diet) for Vata, Pitta, Kapha**
• 🌸 **5 Panchakarma Cleansing Therapies**
• 🏥 **100% Cashless Mediclaim Insurance**

*Type your question below or tap any suggested prompt chip.*`
};

export function AayuVaidyaAIPage() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'quiz', 'faqs', 'shastra'
  const [selectedLang, setSelectedLang] = useState('mr'); // Default to Marathi
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: PAGE_WELCOME_MESSAGES.mr,
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [userDoshaProfile, setUserDoshaProfile] = useState(null);

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    if (messages.length <= 1) {
      setMessages([
        {
          role: 'assistant',
          text: PAGE_WELCOME_MESSAGES[lang],
          time: 'Just now'
        }
      ]);
    }
  };
  
  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  // FAQs state
  const [faqCategory, setFaqCategory] = useState('All');
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, activeTab]);

  // Send message to AI
  const handleSendMessage = async (textToSend = inputVal) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    const userMsg = {
      role: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputVal('');
    setLoading(true);

    try {
      const res = await fetch('/api/ayurveda-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          language: selectedLang,
          history: nextMessages.slice(-8).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            content: m.text
          })),
          userDoshaProfile: userDoshaProfile
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || (selectedLang === 'mr' ? 'नमस्कार. मी आपल्या आयुर्वेदिक आरोग्य प्रवासात मार्गदर्शन करण्यास तत्पर आहे.' : 'Namaste. I am ready to guide your Ayurvedic health journey.');

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.warn('AIPage using internal engine:', err);
      const internalRes = generateInternalAyurvedicResponse(trimmed, nextMessages, userDoshaProfile, selectedLang);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: internalRes.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Quiz Selection
  const handleQuizSelect = (dosha) => {
    const currentQ = QUIZ_QUESTIONS[quizStep];
    const newAnswers = { ...quizAnswers, [currentQ.id]: dosha };
    setQuizAnswers(newAnswers);

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      // Calculate results
      let vataCount = 0;
      let pittaCount = 0;
      let kaphaCount = 0;
      Object.values(newAnswers).forEach(d => {
        if (d === 'Vata') vataCount++;
        if (d === 'Pitta') pittaCount++;
        if (d === 'Kapha') kaphaCount++;
      });
      const total = QUIZ_QUESTIONS.length;
      const vataPct = Math.round((vataCount / total) * 100);
      const pittaPct = Math.round((pittaCount / total) * 100);
      const kaphaPct = 100 - (vataPct + pittaPct);

      let dominant = 'Vata';
      let pulseGati = 'Sarpa Gati (Serpent Wave Rhythm)';
      if (pittaPct > vataPct && pittaPct >= kaphaPct) {
        dominant = 'Pitta';
        pulseGati = 'Manduka Gati (Frog Leaping Rhythm)';
      } else if (kaphaPct > vataPct && kaphaPct > pittaPct) {
        dominant = 'Kapha';
        pulseGati = 'Hamsa Gati (Swan Gliding Rhythm)';
      } else if (vataPct === pittaPct && vataPct > kaphaPct) {
        dominant = 'Vata-Pitta (Dual Dosha)';
        pulseGati = 'Sarpa-Manduka Mixed Rhythm';
      }

      const calculatedResult = {
        vata: vataPct,
        pitta: pittaPct,
        kapha: kaphaPct,
        dominant,
        pulseGati
      };

      setQuizResult(calculatedResult);
      setUserDoshaProfile(calculatedResult);
    }
  };

  const handleSendQuizToChat = () => {
    if (!quizResult) return;
    setActiveTab('chat');
    const promptMsg = `I just completed the Know Your Nadi & Dosha Quiz. My results are:\n• Dominant Constitution: ${quizResult.dominant}\n• Breakdown: Vata: ${quizResult.vata}%, Pitta: ${quizResult.pitta}%, Kapha: ${quizResult.kapha}%\n• Pulse Rhythm: ${quizResult.pulseGati}\n\nPlease analyze my results in detail! What foods (Ahara) should I favor or avoid, what daily routine (Dinacharya) should I follow, and which classical herbs would nourish my constitution?`;
    handleSendMessage(promptMsg);
  };

  // Filter FAQs
  const filteredFaqs = PREDEFINED_FAQS.filter(faq => {
    const matchesCat = faqCategory === 'All' || faq.category === faqCategory;
    const matchesSearch = !faqSearch || 
      faq.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
      faq.shortAns.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.detail.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = ['All', 'Nadi & Pulse', 'Doshas & Prakriti', 'Ahara & Diet', 'Panchakarma & Spine', 'Hospital & Insurance', 'Herbal Medicine'];

  return (
    <div className="vaidya-page">
      {/* Uniform Site Header with Breadcrumb */}
      <SiteHeader breadcrumb="AayuVaidya AI Assistant" />

      {/* Hero Section */}
      <section className="vaidya-hero">
        <div className="vaidya-hero-top">
          <div className="vaidya-status-pill">
            <span className="vaidya-pulse-dot" />
            <span>AayuVaidya AI · Online & Ready to Consult</span>
          </div>
          <div className="vaidya-doctor-credit">
            <ShieldCheck size={16} color="#1b3b22"/>
            <span>Clinically Supervised by <b>Dr. Manish Santosh Yerpude</b> (B.A.M.S., MD)</span>
          </div>
        </div>

        <div className="vaidya-hero-headline">
          <span className="vaidya-overline">PERSONALIZED AYURVEDIC INTELLIGENCE</span>
          <h1>
            Meet <em>AayuVaidya AI.</em><br/>
            Ancient Wisdom, Personalized For You.
          </h1>
          <p className="vaidya-hero-desc">
            Consult our dedicated Ayurvedic AI assistant trained on classical *Charaka Samhita*, *Kanada Nadi Vijnana*, and clinical protocols. Discover your constitutional Prakriti, pulse rhythms, healing diets (*Ahara*), and hospital-grade Panchakarma treatments.
          </p>

          {/* Navigation Mode Tabs */}
          <div className="vaidya-nav-tabs" role="tablist">
            <button 
              type="button" 
              role="tab"
              aria-selected={activeTab === 'chat'}
              className={`vaidya-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <Sparkles size={16}/>
              <span>Chat with AayuVaidya AI</span>
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeTab === 'quiz'}
              className={`vaidya-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              <Activity size={16}/>
              <span>Know Your Nadi & Dosha Quiz</span>
              {quizResult && <span className="vaidya-tab-badge">Done: {quizResult.dominant}</span>}
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeTab === 'faqs'}
              className={`vaidya-tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
              onClick={() => setActiveTab('faqs')}
            >
              <HelpCircle size={16}/>
              <span>Predefined Clinical FAQs</span>
              <span className="vaidya-tab-badge">{PREDEFINED_FAQS.length}</span>
            </button>

            <button 
              type="button" 
              role="tab"
              aria-selected={activeTab === 'shastra'}
              className={`vaidya-tab-btn ${activeTab === 'shastra' ? 'active' : ''}`}
              onClick={() => setActiveTab('shastra')}
            >
              <BookOpen size={16}/>
              <span>Shastra & Modern Science</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="vaidya-main-container">
        {/* TAB 1: CONVERSATIONAL CHAT */}
        {activeTab === 'chat' && (
          <div className="vaidya-chat-wrapper">
            <div className="vaidya-chat-box">
              {/* Chat Header */}
              <div className="vaidya-chat-header">
                <div className="vaidya-chat-identity">
                  <div className="vaidya-avatar">🌿</div>
                  <div className="vaidya-chat-title">
                    <b>AayuVaidya AI Consultation</b>
                    <small>Real-time conversational Ayurvedic guidance</small>
                  </div>
                </div>
                <div className="vaidya-header-actions">
                  <button 
                    type="button" 
                    className="vaidya-action-btn-sm"
                    onClick={() => {
                      setMessages([{
                        role: 'assistant',
                        text: 'Namaste! Conversation cleared. How can I assist your health and wellness journey today?',
                        time: 'Just now'
                      }]);
                    }}
                  >
                    <RotateCcw size={13}/> Clear Chat
                  </button>
                  <a 
                    href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent('Hello Dr. Manish Yerpude, I was consulting AayuVaidya AI and would like to arrange an appointment at AayuTatva Hospital in Bhandara.')}`}
                    target="_blank" 
                    rel="noreferrer" 
                    className="vaidya-action-btn-sm"
                    style={{ background: '#25d366', color: '#ffffff', borderColor: '#25d366' }}
                  >
                    <MessageCircle size={13}/> WhatsApp Dr. Manish
                  </a>
                </div>
              </div>

              {/* Language Selection Banner */}
              <div className="vaidya-lang-banner">
                <div className="vaidya-lang-banner-left">
                  <Globe size={16} color="#2e7d32" />
                  <span className="vaidya-lang-banner-title">
                    {selectedLang === 'mr' ? 'उत्तर मिळवण्यासाठी भाषा निवडा:' : selectedLang === 'hi' ? 'उत्तर प्राप्त करने के लिए भाषा चुनें:' : 'Select Response Language:'}
                  </span>
                </div>
                <div className="vaidya-lang-btn-group">
                  <button 
                    type="button" 
                    className={`vaidya-lang-btn ${selectedLang === 'mr' ? 'active' : ''}`}
                    onClick={() => handleLanguageChange('mr')}
                  >
                    मराठी (Default)
                  </button>
                  <button 
                    type="button" 
                    className={`vaidya-lang-btn ${selectedLang === 'hi' ? 'active' : ''}`}
                    onClick={() => handleLanguageChange('hi')}
                  >
                    हिंदी
                  </button>
                  <button 
                    type="button" 
                    className={`vaidya-lang-btn ${selectedLang === 'en' ? 'active' : ''}`}
                    onClick={() => handleLanguageChange('en')}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="vaidya-messages-area">
                {messages.map((m, idx) => (
                  <div key={idx} className={`vaidya-msg-row ${m.role}`}>
                    <div className="vaidya-msg-bubble">
                      {m.text.split('\n\n').map((paragraph, pIdx) => {
                        if (paragraph.startsWith('### ')) {
                          return <h3 key={pIdx}>{paragraph.replace('### ', '')}</h3>;
                        }
                        if (paragraph.startsWith('#### ')) {
                          return <h4 key={pIdx}>{paragraph.replace('#### ', '')}</h4>;
                        }
                        if (paragraph.startsWith('> ')) {
                          return <blockquote key={pIdx}>{paragraph.replace('> ', '')}</blockquote>;
                        }
                        if (paragraph.includes('\n• ') || paragraph.startsWith('• ') || paragraph.startsWith('- ')) {
                          const items = paragraph.split(/\n[•\-] /).map(s => s.replace(/^[•\-] /, ''));
                          return (
                            <ul key={pIdx}>
                              {items.map((it, itIdx) => (
                                <li key={itIdx}>
                                  <span dangerouslySetInnerHTML={{ __html: it.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return (
                          <p 
                            key={pIdx} 
                            dangerouslySetInnerHTML={{ 
                              __html: paragraph
                                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#1b3b22;font-weight:700;text-decoration:underline;">$1</a>')
                                .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                                .replace(/\*(.*?)\*/g, '<em>$1</em>') 
                            }} 
                          />
                        );
                      })}

                      {m.role === 'assistant' && (
                        <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                          <a 
                            href="tel:+917758816074" 
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: '#1b3b22',
                              color: '#ffffff',
                              padding: '10px 18px',
                              borderRadius: '10px',
                              fontSize: '13px',
                              fontWeight: '700',
                              textDecoration: 'none',
                              boxShadow: '0 2px 8px rgba(27,59,34,0.2)'
                            }}
                          >
                            <Phone size={15} /> Call: +91 77588 16074
                          </a>
                          <a 
                            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent('Hello Dr. Manish Yerpude, I am inquiring from the website for a consultation / appointment at AayuTatva Ayurvedic Hospital in Bhandara.')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: '#25d366',
                              color: '#ffffff',
                              padding: '10px 18px',
                              borderRadius: '10px',
                              fontSize: '13px',
                              fontWeight: '700',
                              textDecoration: 'none',
                              boxShadow: '0 2px 8px rgba(37,211,102,0.25)'
                            }}
                          >
                            <MessageCircle size={15} /> WhatsApp Us
                          </a>
                        </div>
                      )}

                      <span className="vaidya-msg-time">{m.time}</span>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="vaidya-msg-row assistant">
                    <div className="vaidya-typing-indicator">
                      <span>AayuVaidya AI is consulting the classical texts</span>
                      <div className="vaidya-typing-dots">
                        <span /><span /><span />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Prompt Chips */}
              <div className="vaidya-chips-tray">
                {selectedLang === 'mr' ? (
                  <>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('नाडी परीक्षा कशी करतात व शरीरातील दोष कसे ओळखतात?')}
                    >
                      <Activity size={13} color="#2e7d32"/> 🩺 नाडी परीक्षा कशी करतात?
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('स्लिप डिस्क, कंबरदुखी आणि सायटिका वर विना-शस्त्रक्रिया काय उपचार आहेत?')}
                    >
                      <Zap size={13} color="#d97706"/> 🦴 कंबरदुखी व सायटिका उपचार
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('माझ्या प्रकृतीनुसार (वात, पित्त, कफ) कोणता आहार व पथ्य पाळावे?')}
                    >
                      <Leaf size={13} color="#9c7852"/> 🍲 प्रकृतीनुसार पथ्यकर आहार
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('५ शास्त्रीय पंचकर्म कोणते आहेत व ते शरीराची शुद्धी कशी करतात?')}
                    >
                      <Droplets size={13} color="#0284c7"/> 🌸 ५ शास्त्रीय पंचकर्म पद्धती
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('आयुतत्व हॉस्पिटलमध्ये १००% कॅशलेस मेडिक्लेम विमा सुविधा कशी मिळते?')}
                    >
                      <ShieldCheck size={13} color="#1b3b22"/> 🏥 १००% कॅशलेस मेडिक्लेम विमा
                    </button>
                  </>
                ) : selectedLang === 'hi' ? (
                  <>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('नाड़ी परीक्षा कैसे की जाती है और दोष कैसे पहचाने जाते हैं?')}
                    >
                      <Activity size={13} color="#2e7d32"/> 🩺 नाड़ी परीक्षा कैसे करते हैं?
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('कमर दर्द, स्लिप डिस्क और साइटिका का बिना ऑपरेशन इलाज क्या है?')}
                    >
                      <Zap size={13} color="#d97706"/> 🦴 कमर दर्द व साइटिका इलाज
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('वात, पित्त और कफ अनुसार कौन सा आहार लेना चाहिए?')}
                    >
                      <Leaf size={13} color="#9c7852"/> 🍲 प्रकृति अनुसार आहार नियम
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('5 शास्त्रीय पंचकर्म कौन से हैं और कैसे काम करते हैं?')}
                    >
                      <Droplets size={13} color="#0284c7"/> 🌸 5 शास्त्रीय पंचकर्म
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('आयुतत्व हॉस्पिटल में 100% कैशलेस मेडिक्लेम बीमा कैसे मिलता है?')}
                    >
                      <ShieldCheck size={13} color="#1b3b22"/> 🏥 100% कैशलेस मेडिक्लेम
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('What is my Dosha and how does Nadi Parikshan detect imbalances?')}
                    >
                      <Activity size={13} color="#2e7d32"/> 🩺 Know My Dosha & Nadi
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('Can Panchakarma treat Sciatica, slip disc, and chronic back pain without surgery?')}
                    >
                      <Zap size={13} color="#d97706"/> 🦴 Sciatica & Spine Care
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('What diet and foods (Ahara) should I follow to balance acidity, joint pain, and sluggish metabolism?')}
                    >
                      <Leaf size={13} color="#9c7852"/> 🍲 Diet (Ahara) Guidelines
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('What are the five authentic Panchakarma cleansing therapies and who needs them?')}
                    >
                      <Droplets size={13} color="#0284c7"/> 🌸 5 Panchakarma Cleanses
                    </button>
                    <button 
                      type="button" 
                      className="vaidya-chip" 
                      onClick={() => handleSendMessage('How does 100% cashless mediclaim health insurance work at AayuTatva Hospital in Bhandara?')}
                    >
                      <ShieldCheck size={13} color="#1b3b22"/> 🏥 Cashless Insurance Desk
                    </button>
                  </>
                )}
              </div>

              {/* Chat Input */}
              <form 
                className="vaidya-chat-input-bar" 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              >
                <input 
                  type="text" 
                  value={inputVal} 
                  onChange={(e) => setInputVal(e.target.value)} 
                  placeholder={
                    selectedLang === 'mr' 
                      ? 'येथे प्रश्न विचारा (उदा. कंबरदुखी, ऍसिडिटी, गुडघेदुखी, नाडी परीक्षा)…'
                      : selectedLang === 'hi'
                      ? 'यहाँ प्रश्न पूछें (उदा. कमर दर्द, एसिडिटी, घुटनों का दर्द, नाड़ी परीक्षा)…'
                      : 'Ask any question about your Dosha, symptoms, herbs, or treatments…'
                  }
                  disabled={loading}
                  aria-label="Ask AayuVaidya AI a question"
                />
                <button 
                  type="submit" 
                  className="vaidya-send-btn" 
                  disabled={loading || !inputVal.trim()}
                  aria-label="Send message"
                >
                  <span>{selectedLang === 'mr' ? 'पाठवा' : selectedLang === 'hi' ? 'भेजें' : 'Send'}</span>
                  <Send size={15}/>
                </button>
              </form>
            </div>

            {/* Sidebar with Quick Features */}
            <div className="vaidya-chat-sidebar">
              {/* Quiz Quick Tile */}
              <div className="vaidya-sidebar-card">
                <h4><Activity size={18} color="#2e7d32"/> Dosha & Nadi Assessment</h4>
                {quizResult ? (
                  <div>
                    <div style={{ background: '#f5f2ea', padding: '12px 14px', borderRadius: '10px', marginBottom: '12px' }}>
                      <b style={{ display: 'block', fontSize: '13px', color: '#1b3b22' }}>{quizResult.dominant} Dominant</b>
                      <small style={{ color: '#687364', display: 'block', marginTop: '4px' }}>Pulse: {quizResult.pulseGati}</small>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontSize: '11px', fontWeight: '600' }}>
                        <span style={{ color: '#2b5270' }}>V: {quizResult.vata}%</span>
                        <span style={{ color: '#9e3b1b' }}>P: {quizResult.pitta}%</span>
                        <span style={{ color: '#276338' }}>K: {quizResult.kapha}%</span>
                      </div>
                    </div>
                    <button 
                      type="button"
                      className="vaidya-sidebar-btn" 
                      onClick={() => setActiveTab('quiz')}
                    >
                      <span>Retake 2-Minute Quiz</span>
                      <ArrowRight size={14}/>
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>Don't know your biological constitution? Take our 7-step classical self-assessment to discover your Vata, Pitta, and Kapha balance.</p>
                    <button 
                      type="button"
                      className="vaidya-sidebar-btn" 
                      onClick={() => setActiveTab('quiz')}
                    >
                      <span>Start Dosha & Nadi Quiz</span>
                      <ArrowRight size={14}/>
                    </button>
                  </div>
                )}
              </div>

              {/* Predefined FAQs Tile */}
              <div className="vaidya-sidebar-card">
                <h4><HelpCircle size={18} color="#9c7852"/> Predefined Clinical FAQs</h4>
                <p>Browse verified answers on pulse diagnosis, herbal medicine, fasting rules, and insurance coverage.</p>
                <button 
                  type="button"
                  className="vaidya-sidebar-btn" 
                  onClick={() => setActiveTab('faqs')}
                >
                  <span>Explore All {PREDEFINED_FAQS.length} FAQs</span>
                  <ArrowRight size={14}/>
                </button>
              </div>

              {/* In-Person Consultation Card */}
              <div className="vaidya-sidebar-card" style={{ background: '#1b3b22', color: '#ffffff' }}>
                <h4 style={{ color: '#ffffff' }}><Building2 size={18} color="#d4a373"/> Consult Dr. Manish Yerpude</h4>
                <p style={{ color: '#d5decb', fontSize: '11px' }}>
                  AayuTatva Ayurvedic Hospital & Panchakarma Centre (NABH Accredited).<br/>
                  1st Floor, Bawankar Bhavan, Khat Road, Bhandara, Maharashtra.
                </p>
                <a 
                  href={`tel:${phonePrimary}`} 
                  className="vaidya-sidebar-btn" 
                  style={{ background: '#ffffff', color: '#1b3b22', borderColor: '#ffffff', justifyContent: 'center' }}
                >
                  <Phone size={14}/> +91 77588 16074
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE DOSHA & NADI QUIZ */}
        {activeTab === 'quiz' && (
          <div className="quiz-board-card">
            {!quizResult ? (
              <>
                <div className="quiz-board-header">
                  <span className="quiz-category-tag">
                    {QUIZ_QUESTIONS[quizStep].icon}
                    <span>{QUIZ_QUESTIONS[quizStep].category}</span>
                  </span>
                  <span className="quiz-step-indicator">
                    Question <b>{quizStep + 1}</b> of {QUIZ_QUESTIONS.length}
                  </span>
                </div>

                <div className="quiz-progress-bar">
                  <div 
                    className="quiz-progress-fill" 
                    style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <div className="quiz-question-box">
                  <h2>{QUIZ_QUESTIONS[quizStep].q}</h2>
                  <p>{QUIZ_QUESTIONS[quizStep].subtext}</p>
                </div>

                <div className="quiz-options-list">
                  {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                    <button 
                      key={i} 
                      type="button"
                      className="quiz-option-card"
                      onClick={() => handleQuizSelect(opt.dosha)}
                    >
                      <div className="quiz-option-body">
                        <p>{opt.label}</p>
                      </div>
                      <ArrowRight size={18} className="quiz-option-arrow"/>
                    </button>
                  ))}
                </div>

                {quizStep > 0 && (
                  <button 
                    type="button" 
                    className="quiz-back-btn" 
                    onClick={() => setQuizStep(prev => prev - 1)}
                  >
                    ← Previous Question
                  </button>
                )}
              </>
            ) : (
              /* Quiz Result Display */
              <div className="quiz-result-view">
                <div className="quiz-result-header">
                  <span className="quiz-result-badge">ASSESSMENT COMPLETE · PRAKRITI EVALUATION</span>
                  <h2>Your Dominant Constitution is <em>{quizResult.dominant}</em></h2>
                  <p>Based on your 7 diagnostic responses, here is your individual Tridosha proportion and classical Nadi pulse rhythm:</p>
                </div>

                {/* Score Breakdown */}
                <div className="quiz-result-meters">
                  <div className="quiz-meter-card vata">
                    <div className="quiz-meter-top">
                      <b>Vata Dosha</b>
                      <span>{quizResult.vata}%</span>
                    </div>
                    <div className="quiz-meter-track">
                      <div className="quiz-meter-fill vata" style={{ width: `${quizResult.vata}%` }}/>
                    </div>
                    <small>Air + Space · Mobility, circulation & nervous activity</small>
                  </div>

                  <div className="quiz-meter-card pitta">
                    <div className="quiz-meter-top">
                      <b>Pitta Dosha</b>
                      <span>{quizResult.pitta}%</span>
                    </div>
                    <div className="quiz-meter-track">
                      <div className="quiz-meter-fill pitta" style={{ width: `${quizResult.pitta}%` }}/>
                    </div>
                    <small>Fire + Water · Digestion, metabolism & body temperature</small>
                  </div>

                  <div className="quiz-meter-card kapha">
                    <div className="quiz-meter-top">
                      <b>Kapha Dosha</b>
                      <span>{quizResult.kapha}%</span>
                    </div>
                    <div className="quiz-meter-track">
                      <div className="quiz-meter-fill kapha" style={{ width: `${quizResult.kapha}%` }}/>
                    </div>
                    <small>Earth + Water · Tissue structure, stability & lubrication</small>
                  </div>
                </div>

                {/* Pulse Rhythm Card */}
                <div style={{ background: '#faf7ef', border: '1px solid #e8e1cf', borderRadius: '14px', padding: '22px', margin: '26px 0' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1.2px', color: '#9c7852', textTransform: 'uppercase' }}>
                    CLASSICAL NADI PULSE IDENTIFICATION (KANADA NADI VIJNANA)
                  </span>
                  <h3 style={{ font: '500 20px Georgia, serif', color: '#1b3b22', margin: '8px 0 6px' }}>
                    {quizResult.pulseGati}
                  </h3>
                  <p style={{ fontSize: '12px', lineHeight: '1.7', color: '#5b695a', margin: 0 }}>
                    In Ayurvedic pulse science, your primary biological energy moves through the radial artery like the gait of its symbolic creature. When palpated by Dr. Manish Yerpude, this rhythm indicates whether your deep metabolic fire (*Agni*) is steady or forming undigested toxins (*Ama*).
                  </p>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={handleSendQuizToChat}
                    style={{ minHeight: '48px', padding: '0 24px', fontSize: '13px' }}
                  >
                    <Sparkles size={16}/> Analyze Results with AayuVaidya AI
                  </button>

                  <a 
                    href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Hello Dr. Manish Yerpude, I completed the Prakriti & Nadi assessment on your website. My Dominant Dosha is ${quizResult.dominant} (Vata: ${quizResult.vata}%, Pitta: ${quizResult.pitta}%, Kapha: ${quizResult.kapha}%, Pulse: ${quizResult.pulseGati}). I would like to schedule a formal in-person pulse diagnosis and consultation at AayuTatva Hospital.`)}`}
                    target="_blank" 
                    rel="noreferrer" 
                    className="vaidya-action-btn-sm"
                    style={{ minHeight: '48px', padding: '0 20px', background: '#25d366', color: '#ffffff', borderColor: '#25d366', borderRadius: '99px', fontSize: '13px' }}
                  >
                    <MessageCircle size={16}/> WhatsApp Results to Dr. Manish
                  </a>

                  <button 
                    type="button" 
                    className="vaidya-action-btn-sm"
                    onClick={() => {
                      setQuizStep(0);
                      setQuizAnswers({});
                      setQuizResult(null);
                    }}
                    style={{ minHeight: '48px', padding: '0 16px', borderRadius: '99px' }}
                  >
                    <RotateCcw size={14}/> Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PREDEFINED CLINICAL FAQS */}
        {activeTab === 'faqs' && (
          <div className="vaidya-faqs-section">
            <div className="vaidya-faqs-header">
              <span className="vaidya-overline">AUTHENTIC CLINICAL KNOWLEDGE</span>
              <h2>Predefined Clinical FAQs</h2>
              <p>Explore answers grounded in classical Ayurvedic scriptures and verified by Dr. Manish Santosh Yerpude at AayuTatva Hospital.</p>
            </div>

            {/* Search Input */}
            <div className="vaidya-faq-search-wrap">
              <Search size={18} />
              <input 
                type="text" 
                value={faqSearch} 
                onChange={(e) => setFaqSearch(e.target.value)} 
                placeholder="Search FAQs by symptom, pulse, diet, or treatment…"
                aria-label="Search FAQs"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="vaidya-faq-categories">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  type="button" 
                  className={`vaidya-faq-cat-pill ${faqCategory === cat ? 'active' : ''}`}
                  onClick={() => setFaqCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQs List */}
            <div className="vaidya-faq-list">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map(faq => {
                  const isOpen = expandedFaq === faq.id;
                  return (
                    <article key={faq.id} className="vaidya-faq-card">
                      <button 
                        type="button" 
                        className="vaidya-faq-trigger"
                        onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                        aria-expanded={isOpen}
                      >
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="vaidya-faq-tag">{faq.category}</span>
                          <span>{faq.q}</span>
                        </span>
                        {isOpen ? <ChevronUp size={18} color="#1b3b22"/> : <ChevronDown size={18} color="#727e70"/>}
                      </button>

                      {isOpen && (
                        <div className="vaidya-faq-body">
                          {faq.sutra && (
                            <div style={{ background: '#fbf8f0', borderLeft: '3px solid #b8986c', padding: '8px 12px', margin: '10px 0', fontSize: '12px', fontStyle: 'italic', color: '#4a5448', borderRadius: '0 6px 6px 0' }}>
                              {faq.sutra}
                            </div>
                          )}
                          <p><b>Quick Summary:</b> {faq.shortAns}</p>
                          <div style={{ whiteSpace: 'pre-line' }}>{faq.detail}</div>

                          <div className="vaidya-faq-body-actions">
                            <button 
                              type="button" 
                              className="vaidya-ask-this-btn"
                              onClick={() => {
                                setActiveTab('chat');
                                handleSendMessage(faq.prompt);
                              }}
                            >
                              <Sparkles size={13}/> Ask AayuVaidya AI About This
                            </button>
                            <a 
                              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Hello Dr. Manish Yerpude, I was reading your clinic FAQ: "${faq.q}". I would like to consult with you.`)}`}
                              target="_blank" 
                              rel="noreferrer" 
                              className="vaidya-action-btn-sm"
                            >
                              <MessageCircle size={13}/> Consult Doctor on WhatsApp
                            </a>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#687364' }}>
                  <p>No questions matched your search. Would you like to ask AayuVaidya AI directly?</p>
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={() => {
                      setActiveTab('chat');
                      handleSendMessage(faqSearch || 'Can you answer my health question?');
                    }}
                    style={{ marginTop: '12px', minHeight: '44px' }}
                  >
                    Ask AayuVaidya AI in Chat <Sparkles size={14}/>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SHASTRA & MODERN SCIENCE */}
        {activeTab === 'shastra' && (
          <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            <div className="vaidya-faqs-header">
              <span className="vaidya-overline">SCRIPTURAL AUTHENTICITY & SCIENTIFIC RIGOR</span>
              <h2>Classical Shastra & Modern Science</h2>
              <p>Explore the scriptural foundations and peer-reviewed research supporting Dr. Manish Yerpude’s practice.</p>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e5ded0', borderRadius: '16px', padding: '26px' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1.2px', color: '#9c7852', textTransform: 'uppercase' }}>
                  CLASSICAL NADI SUTRA · KANADA NADI VIJNANA
                </span>
                <h3 style={{ font: 'italic 18px Georgia, serif', color: '#1b3b22', margin: '10px 0 8px', lineHeight: '1.6' }}>
                  “यथा वीणागतास्तन्त्री सर्वान् रागान् प्रभाषते।<br/>
                  तथा हस्तगता नाडी सर्वान् रोगान् प्रकाशते॥”
                </h3>
                <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#566455', margin: 0 }}>
                  <em>“Just as strings of a veena express every melodious raga, the radial pulse reveals every subtle state of health and cellular balance within the human body.”</em> In classical pulse science, the three fingers positioned at the base of the thumb (*Angushtha Moola*) perceive velocity, depth, and tension in the arterial wall.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e5ded0', borderRadius: '16px', padding: '26px' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1.2px', color: '#9c7852', textTransform: 'uppercase' }}>
                  DEFINITION OF TOTAL HEALTH · SUSHRUTA SAMHITA (SUTRASTHANA 15.41)
                </span>
                <h3 style={{ font: 'italic 18px Georgia, serif', color: '#1b3b22', margin: '10px 0 8px', lineHeight: '1.6' }}>
                  “समदोषः समाग्निश्च समधातुमलक्रियः।<br/>
                  प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते॥”
                </h3>
                <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#566455', margin: 0 }}>
                  <em>“One who is established in self, whose biological humors (Doshas) are in balance, whose digestive fire (Agni) is balanced, whose tissues (Dhatus) and waste functions (Malas) are normal, and whose soul, senses, and mind are pleasantly serene, is called healthy (Svastha).”</em>
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e5ded0', borderRadius: '16px', padding: '26px' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1.2px', color: '#2e7d32', textTransform: 'uppercase' }}>
                  MODERN PEER-REVIEWED SCIENTIFIC RESEARCH & GENOMICS
                </span>
                <h3 style={{ font: '500 19px Georgia, serif', color: '#1b3b22', margin: '10px 0 10px' }}>
                  Ayurgenomics & Arterial Waveform Validation
                </h3>
                <ul style={{ margin: '0 0 12px 18px', padding: 0, fontSize: '13px', lineHeight: '1.8', color: '#566455' }}>
                  <li><b>Ayurgenomics & Gene Expression</b>: National studies published in *PNAS* and *BMC Complementary Medicine* correlate classical Prakriti types with specific genetic polymorphisms (e.g. CD40 inflammatory markers in Pitta types and CYP2C19 drug metabolism differences in Vata types).</li>
                  <li><b>Arterial Waveform Sensor Validation</b>: Modern piezoelectric and photoplethysmography sensors validate that classical *Sarpa*, *Manduka*, and *Hamsa* waveforms correspond to distinct percussion, dicrotic notch, and tidal wave dynamics in radial arterial wall mechanics.</li>
                </ul>
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={() => {
                    setActiveTab('chat');
                    handleSendMessage('Tell me more about the scientific research on Ayurgenomics and digital pulse sensors validating Nadi Parikshan.');
                  }}
                  style={{ minHeight: '44px', fontSize: '12px' }}
                >
                  Discuss Research with AayuVaidya AI <Sparkles size={14}/>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Ethical Medical Disclaimer Band */}
      <aside className="vaidya-disclaimer-band" aria-label="Medical disclaimer">
        <Info size={18}/>
        <div>
          <b>CLINICAL INTEGRITY & MEDICAL DISCLAIMER:</b> AayuVaidya AI provides authentic educational information, scriptural insights, and constitutional self-assessment tools. It does not constitute a formal medical diagnosis or replace tactile physical examination (*Sparshana Pariksha*) by a licensed Ayurvedic physician. In-person clinical consultations and Panchakarma therapies are conducted by <strong>Dr. Manish Santosh Yerpude</strong> [B.A.M.S., MD (AM), P.G.P.P. Pune, Reg No. I-117221-A] at AayuTatva Ayurvedic Hospital & Panchakarma Centre, Bhandara.
        </div>
      </aside>

      {/* Footer */}
      <footer className="footer" style={{ borderTop: '1px solid #e7e1d3' }}>
        <div className="footer-main">
          <a href="/" className="brand footer-brand">
            <img className="brand-logo" src="/media/aayutatva-logo.png" alt="AayuTatva Ayurved Hospital"/>
          </a>
          <p>Rooted in nature.<br/>Guided by classical care.</p>
          <div className="footer-phones">
            <a href={`tel:${phonePrimary}`}><Phone size={16}/> +91 77588 16074</a>
          </div>
          <a className="footer-book" href="/#booking">Book your consultation <ArrowUpRight size={16}/></a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AayuTatva Ayurvedic Hospital & Panchakarma Centre</span>
          <span>DR. MANISH SANTOSH YERPUDE · BHANDARA, MAHARASHTRA</span>
          <a href="#">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  );
}
