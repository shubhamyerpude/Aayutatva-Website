import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { generateInternalAyurvedicResponse, isGreetingQuery, isGratitudeQuery } from './src/ayurvedicInternalEngine.ts';
import heightRegistrationsHandler from './api/height-registrations.ts';
import paymentConfigHandler from './api/payment-config.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '1mb' }));

// Security & Compliance Headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');
  next();
});

const geminiApiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const aiClient = new GoogleGenAI({
  apiKey: geminiApiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const HOSPITAL_CONTACT_CTA = `
---
🏥 **To Know More, Contact AayuTatva Ayurvedic Hospital & Panchakarma Centre:**
• **Consultation by**: Dr. Manish Santosh Yerpude [B.A.M.S. (MUHS), MD (AM), P.G.P.P. Pune]
• **Hospital Location**: 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904
• **Call / WhatsApp**: [+91 77588 16074](tel:+917758816074)
• **Facilities**: NABH-Accredited Inpatient (IPD) Care · 100% Cashless Mediclaim Insurance with leading providers & TPAs.`;

const AYURVEDA_SYSTEM_INSTRUCTION = `You are "AayuVaidya AI", an intelligent and authentic educational assistant for AayuTatva Ayurvedic Hospital & Panchakarma Centre in Bhandara, Maharashtra, directed by Dr. Manish Santosh Yerpude [B.A.M.S. (MUHS), MD (AM), P.G.P.P. Pune].

CRITICAL GUIDELINES:
1. GREETINGS & INTRODUCTIONS:
   - When the user sends a greeting (e.g. "Hello", "Hi", "Namaste", "Hey", "Good morning", "नमस्कार", "नमस्ते", "हॅलो") or polite opening WITHOUT specifying a medical condition:
     STRICTLY DO NOT provide medical treatments, herbal prescriptions, or Panchakarma disease therapies!
     Respond with a warm, polite greeting in their language (Marathi, Hindi, or English), introduce yourself as AayuVaidya AI representing AayuTatva Ayurvedic Hospital in Bhandara under Dr. Manish Santosh Yerpude, and ask how you can help them today with their health queries, pulse diagnosis (Nadi Parikshan), or clinic timings.
2. SPECIFIC, PERSONALIZED CLINICAL ANSWERS:
   - When the user asks about a specific condition or query (e.g. slip disc, sciatica, knee pain, acidity, PCOD, skin problems, height growth, diet, stress, seasonal health):
     NEVER give repetitive generic boilerplate text. Answer the user's EXACT query with tailored, insightful Ayurvedic knowledge explaining relevant Doshas (Vata/Pitta/Kapha), Dhatus, Dinacharya, Ahara rules, and classical Panchakarma procedures (Kati Basti, Janu Basti, Virechana, Vamana, Shirodhara, Nasya).
   - If the user asks a follow-up question or conversational question, answer directly in context.
   - Keep answers well-structured, clear, and concise (about 80 to 140 words).
3. MULTILINGUAL SUPPORT:
   - Respond in the language of the user's query: Marathi (मराठी), Hindi (हिंदी), or English. Use natural, warm, and authentic vocabulary.
4. MEDICAL BOUNDARY & HOSPITAL ACTION:
   - Provide educational guidance and note that actual clinical prescription requires in-person pulse diagnosis (*Nadi Parikshan*) and physical examination by Dr. Manish Santosh Yerpude at AayuTatva Hospital in Bhandara.
   - Conclude with the hospital contact details:
   "To know more or book an examination:
   🏥 AayuTatva Ayurvedic Hospital & Panchakarma Centre
   📍 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904
   👨‍⚕️ Dr. Manish Santosh Yerpude [B.A.M.S., MD (AM), P.G.P.P.]
   📞 Call / WhatsApp: +91 77588 16074 (NABH-Accredited · 100% Cashless Mediclaim)"`;

function withTimeout<T>(promise: Promise<T>, ms = 20000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Model timeout')), ms))
  ]);
}

// Intelligent, dynamic Ayurvedic fallback engine
function getDynamicFallbackResponse(userMessage: string, history: any[] = []): string {
  const q = userMessage.toLowerCase().trim();

  let body = '';

  if (q.includes('hello') || q.includes('hi') || q.includes('namaste') || q.includes('hey') || q === 'start') {
    body = `### Namaste 🙏 Welcome to AayuTatva Ayurvedic Hospital

I am **AayuVaidya AI**, your educational guide for Ayurvedic health knowledge.

Here is what I can share general information about:
• **Ayurvedic Tridoshas**: Understanding Vata, Pitta, and Kapha energies.
• **Classical Nadi Parikshan**: How 8-fold radial pulse diagnosis works.
• **Panchakarma Therapies**: The 5 classical detoxification procedures.
• **Hospital Facilities & Cashless Insurance**: Our NABH-accredited center in Bhandara.

*Please note: I provide general educational information and cannot provide personal medical treatments.*`;
  } else if (q.includes('back') || q.includes('spine') || q.includes('sciatica') || q.includes('disc') || q.includes('joint') || q.includes('pain') || q.includes('neck') || q.includes('knee')) {
    body = `### 🦴 General Ayurvedic Understanding of Spine & Joint Health

In classical Ayurvedic texts (*Charaka Samhita*), joint discomfort, back stiffness, and sciatic pain are traditionally categorized under *Vata Vyadhi* (such as *Gridhrasi* and *Sandhigata Vata*).

**General Principles in Classical Ayurveda:**
• **Vata Pacification**: Vata dosha governs movement and bone-joint spaces. When aggravated by stress, cold, or irregular habits, dryness (*Rookshata*) increases in the musculoskeletal tissues (*Asthi & Majja Dhatu*).
• **Classical Hospital Procedures**: In an in-person hospital setting, therapies such as *Kati Basti* (warm medicated oil pool over the spine), *Janu Basti* (for knees), and *Patra Pinda Sweda* (warm herbal leaf fomentation) are traditionally utilized under doctor supervision.
• **Need for Clinical Assessment**: Because back and joint pain can arise from varied anatomical causes (disc bulge, nerve compression, inflammation), individualized diagnosis is essential.`;
  } else if (q.includes('diet') || q.includes('food') || q.includes('eat') || q.includes('nutrition') || q.includes('ahara')) {
    body = `### 🍲 Classical Ayurvedic Principles of Diet (*Ahara*)

In Ayurveda, diet is viewed as the first pillar of vitality (*Ahara Sambhavam Vastu*).

**General Guidelines by Constitution:**
• **Vata Predominance**: Favor warm, grounding, freshly cooked foods, healthy fats (like cow ghee), and warming spices. Minimize dry, cold salads and carbonated drinks.
• **Pitta Predominance**: Favor cooling, naturally sweet, and soothing foods (cucumber, pomegranate, mung dal). Minimize excessively pungent chilies, heavy sour items, and fried foods.
• **Kapha Predominance**: Favor light, warm, fiber-rich grains (barley, millets) and digestive spices (ginger, black pepper). Minimize heavy dairy, cold sweets, and oily gravies.
• **Agni (Digestive Fire)**: Ayurveda advises eating when hungry and keeping 1/3 of the stomach for solids, 1/3 for liquids, and 1/3 empty for digestive air circulation.`;
  } else if (q.includes('dosha') || q.includes('prakriti') || q.includes('vikriti') || q.includes('quiz') || q.includes('vata') || q.includes('pitta') || q.includes('kapha')) {
    body = `### 🌿 The Three Doshas: Vata, Pitta & Kapha

According to Ayurvedic physiology, every person has a unique elemental constitution (*Prakriti*):
1. **Vata (Space + Air)**: Governs bodily motion, nerve conduction, respiration, and elimination.
2. **Pitta (Fire + Water)**: Governs digestion, metabolic fire (*Agni*), enzymatic breakdown, and body temperature.
3. **Kapha (Water + Earth)**: Governs bodily lubrication, structural stability, immunity (*Ojas*), and cohesion.

**Prakriti vs. Vikriti:**
• *Prakriti* is your natural birth blueprint.
• *Vikriti* is any current imbalance caused by lifestyle, stress, or diet.
An accurate evaluation requires pulse palpation (*Nadi Parikshan*) by a trained physician.`;
  } else if (q.includes('nadi') || q.includes('pulse') || q.includes('parikshan') || q.includes('diagnosis')) {
    body = `### 🩺 How Classical Nadi Parikshan Works

*Nadi Parikshan* is the non-invasive Ayurvedic pulse examination described in *Kanada Nadi Vijnana* and *Sharangadhara Samhita*.

**The Classical Technique:**
• The physician places three fingers below the radial styloid process at the wrist:
  - **Index Finger**: Observes Vata pulse rhythm (traditionally described as *Sarpa Gati* or snake-like wave).
  - **Middle Finger**: Observes Pitta pulse rhythm (*Manduka Gati* or frog-like active leap).
  - **Ring Finger**: Observes Kapha pulse rhythm (*Hamsa Gati* or swan-like slow, deep glide).
• It assesses systemic balance, tissue vitality (*Dhatus*), and digestive fire (*Agni*).
• **Note**: True pulse diagnosis requires physical contact by a qualified Ayurvedic doctor.`;
  } else if (q.includes('panchakarma') || q.includes('detox') || q.includes('basti') || q.includes('shirodhara') || q.includes('vomit') || q.includes('purge')) {
    body = `### 🌸 The Five Classical Cleansing Therapies (*Panchakarma*)

Panchakarma is Ayurveda's specialized bio-purificatory system:
1. **Vamana**: Therapeutic upper cleansing for deep Kapha congestion.
2. **Virechana**: Purgative therapy targeting liver and excess Pitta heat.
3. **Basti**: Medicated herbal enema therapy, known as the primary treatment for Vata imbalances.
4. **Nasya**: Herbal nasal administration for head, neck, and sensory channels.
5. **Raktamokshana**: Classical blood purification therapies for skin and circulation.

*All therapies are prescribed only after thorough individual examination by an Ayurvedic clinician.*`;
  } else if (q.includes('insurance') || q.includes('mediclaim') || q.includes('cashless') || q.includes('cost') || q.includes('tpa') || q.includes('star health')) {
    body = `### 🏥 100% Cashless Mediclaim Insurance at AayuTatva Hospital

AayuTatva Ayurvedic Hospital is **NABH-Accredited**, qualifying for cashless insurance under IRDAI AYUSH guidelines for eligible inpatient (IPD) treatments:
• **Accepted Insurers**: Star Health, HDFC ERGO, ICICI Lombard, Niva Bupa, Care Health, and leading TPAs (Medi Assist, Vidal Health, FHPL, etc.).
• **Process**: Pre-authorization is initiated before planned admission. Bring your policy card and photo ID to the clinic desk.`;
  } else if (q.includes('doctor') || q.includes('manish') || q.includes('timing') || q.includes('appointment') || q.includes('book') || q.includes('contact') || q.includes('where') || q.includes('address')) {
    body = `### 👨‍⚕️ About Dr. Manish Santosh Yerpude & Clinic Details

• **Doctor**: Dr. Manish Santosh Yerpude [B.A.M.S. (MUHS), MD (AM), P.G.P.P. Pune]
• **Specializations**: Spine & Joint Disorders, Non-Surgical Sciatica Care, Classical Panchakarma, Pediatric Growth & Nadi Parikshan.
• **Hospital**: AayuTatva Ayurvedic Hospital & Panchakarma Centre (NABH Accredited)
• **Address**: 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904.
• **OPD Timings**: Monday to Sunday: 10:00 AM – 2:00 PM and 5:00 PM – 8:00 PM.`;
  } else if (q.includes('yes') || q.includes('ok') || q.includes('sure') || q.includes('thank') || q.includes('more') || q.includes('help')) {
    body = `### Thank you for connecting with AayuTatva Hospital

We are glad to provide general Ayurvedic insights. Since every individual's physiological constitution is distinct, classical Ayurveda emphasizes personal touch and detailed consultation rather than generic remedies.

If you have questions about:
• Classical Ayurvedic diet rules (*Ahara*)
• The 5 Panchakarma cleansing therapies
• NABH cashless hospital admissions
• Spine and joint wellness protocols

Feel free to ask, or connect with our clinical team in Bhandara!`;
  } else {
    body = `### 🌿 Ayurvedic Perspective on Your Query

Thank you for your question regarding **"${userMessage.slice(0, 70)}"**.

In classical Ayurveda, optimal health is defined as *Sama Dosha Sama Agnischa Sama Dhatu Mala Kriya* (*Sushruta Samhita*):
• **Balance of Doshas**: Maintaining Vata, Pitta, and Kapha in harmony.
• **Digestive Fire (*Agni*)**: Healthy metabolism prevents the accumulation of undigested toxins (*Ama*).
• **Mind & Vitality**: Daily routine (*Dinacharya*), restful sleep (*Nidra*), and mindful nutrition form the foundation of wellbeing.

Because individual needs vary greatly based on age, constitution (*Prakriti*), and seasonal factors (*Ritucharya*), specific recommendations should always be personalized by a qualified Ayurvedic doctor.`;
  }

  return `**[AI-Assisted Educational Response · General Guidance Only]**

${body}
${HOSPITAL_CONTACT_CTA}`;
}

// AI Chat Route with External Gemini API (Primary) & Internal Fallback
app.post('/api/ayurveda-chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], userDoshaProfile = null, language = 'mr' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    // 0. Greetings & Gratitude check: Instant, courteous response without prescribing medical treatments
    if (isGreetingQuery(message) || isGratitudeQuery(message)) {
      const greetingResponse = generateInternalAyurvedicResponse(message, history, userDoshaProfile, language);
      res.json(greetingResponse);
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';

    // Primary: Fast, personalized external Gemini API
    if (apiKey) {
      let contextualPrompt = message;
      if (userDoshaProfile) {
        contextualPrompt = `[Context: User constitutional self-assessment: Dominant: ${userDoshaProfile.dominant}, Vata: ${userDoshaProfile.vata}%, Pitta: ${userDoshaProfile.pitta}%, Kapha: ${userDoshaProfile.kapha}%, Pulse Rhythm: ${userDoshaProfile.pulseGati || 'Classical'}, Preferred Language: ${language}].\n\nUser Question: ${message}`;
      } else {
        contextualPrompt = `[Preferred Language: ${language}].\n\nUser Question: ${message}`;
      }

      // Build conversational history
      const contents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-6);
        for (const item of recentHistory) {
          const role = item.role === 'user' ? 'user' : 'model';
          const text = item.text || item.content || '';
          if (text) {
            contents.push({ role, parts: [{ text }] });
          }
        }
      }
      contents.push({ role: 'user', parts: [{ text: contextualPrompt }] });

      // 1. Try fastest model: gemini-3.1-flash-lite with minimal thinking for ultra-low latency
      try {
        const response = await withTimeout(
          aiClient.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: contents,
            config: {
              systemInstruction: AYURVEDA_SYSTEM_INSTRUCTION,
              thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
              temperature: 0.65,
            },
          }),
          20000
        );

        let replyText = response.text || '';
        if (replyText.trim()) {
          if (!replyText.includes('77588 16074') && !replyText.includes('AayuTatva')) {
            replyText += `\n\n${HOSPITAL_CONTACT_CTA}`;
          }
          res.json({ reply: replyText, source: 'gemini-3.1-flash-lite' });
          return;
        }
      } catch (liteErr: any) {
        console.warn('gemini-3.1-flash-lite attempt failed, trying gemini-3.8-flash:', liteErr?.message || liteErr);
      }

      // 2. Secondary fallback model: gemini-3.8-flash
      try {
        const response = await withTimeout(
          aiClient.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: contents,
            config: {
              systemInstruction: AYURVEDA_SYSTEM_INSTRUCTION,
              temperature: 0.65,
            },
          }),
          20000
        );

        let replyText = response.text || '';
        if (replyText.trim()) {
          if (!replyText.includes('77588 16074') && !replyText.includes('AayuTatva')) {
            replyText += `\n\n${HOSPITAL_CONTACT_CTA}`;
          }
          res.json({ reply: replyText, source: 'gemini-3.8-flash' });
          return;
        }
      } catch (flashErr: any) {
        console.warn('gemini-3.8-flash attempt failed:', flashErr?.message || flashErr);
      }
    }

    // 3. Fallback to internal engine if external API fails or key is missing
    const fallbackResult = generateInternalAyurvedicResponse(message, history, userDoshaProfile, language);
    res.json(fallbackResult);
  } catch (err: any) {
    console.error('Error handling /api/ayurveda-chat:', err);
    const errResult = generateInternalAyurvedicResponse(req.body?.message || 'general', [], null, req.body?.language || 'mr');
    res.status(200).json(errResult);
  }
});

// Height Growth Masterclass Registrations & Excel CSV export API
app.all('/api/height-registrations*', (req: Request, res: Response) => {
  return heightRegistrationsHandler(req, res);
});

// Dynamic Payment & QR Code Configuration API
app.all('/api/payment-config*', (req: Request, res: Response) => {
  return paymentConfigHandler(req, res);
});

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`🌿 AayuTatva Ayurvedic Hospital server running at http://0.0.0.0:${port}`);
  });
}

startServer();
