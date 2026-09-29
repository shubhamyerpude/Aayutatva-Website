import { GoogleGenAI } from '@google/genai';
import { generateInternalAyurvedicResponse } from '../src/ayurvedicInternalEngine.ts';

const HOSPITAL_CONTACT_CTA = `
---
🏥 **To Know More, Contact AayuTatva Ayurvedic Hospital & Panchakarma Centre:**
• **Consultation by**: Dr. Manish Santosh Yerpude [B.A.M.S. (MUHS), MD (AM), P.G.P.P. Pune]
• **Hospital Location**: 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904
• **Call / WhatsApp**: [+91 77588 16074](tel:+917758816074)
• **Facilities**: NABH-Accredited Inpatient (IPD) Care · 100% Cashless Mediclaim Insurance with leading providers & TPAs.`;

const AYURVEDA_SYSTEM_INSTRUCTION = `You are "AayuVaidya AI", an authentic educational assistant for AayuTatva Ayurvedic Hospital & Panchakarma Centre in Bhandara, Maharashtra, directed by Dr. Manish Santosh Yerpude [B.A.M.S., MD (AM), P.G.P.P.].

CRITICAL COMPLIANCE DIRECTIVES (MUST FOLLOW EVERY SINGLE RULE):
1. NATURE OF RESPONSE:
   - Start or clearly mark every answer with: "**[AI-Assisted Educational Response · General Guidance Only]**"
   - You provide GENERAL EDUCATIONAL INFORMATION about Ayurvedic principles, classical concepts, and hospital facilities.
2. DO NOT PROVIDE MEDICAL TREATMENTS OR PRESCRIPTIONS:
   - Strictly DO NOT prescribe specific medicine doses, drug formulations, or customized clinical cure regimes.
   - Do NOT give medical diagnosis.
   - If the user asks for treatment, explain general Ayurvedic concepts (e.g. how Panchakarma or diet works in principle) but explicitly state that treatment requires an in-person doctor consultation.
3. PRIMARY AGENDA IS TO TAKE THE USER TO THE HOSPITAL:
   - Your primary mission is to guide the user to visit or contact AayuTatva Ayurvedic Hospital in Bhandara to consult Dr. Manish Santosh Yerpude for physical clinical examination (Nadi Parikshan, Darshana, Sparshana, Prashna).
   - Always conclude your response with a clear call-to-action directing them to contact or visit the hospital:
   "To know more, contact AayuTatva Ayurvedic Hospital:
   📞 Call / WhatsApp: +91 77588 16074
   📍 Location: 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904
   👨‍⚕️ Consultation by: Dr. Manish Santosh Yerpude [B.A.M.S., MD (AM), P.G.P.P.]
   🏥 NABH-Accredited · 100% Cashless Mediclaim Insurance Accepted"
4. TONE & LANGUAGES:
   - Respectful, welcoming, informative.
   - Respond in English, Hindi, or Marathi based on the user's query.`;

function withTimeout<T>(promise: Promise<T>, ms = 3000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Model timeout')), ms))
  ]);
}

function getDynamicFallbackResponse(userMessage: string, _history: any[] = []): string {
  const q = (userMessage || '').toLowerCase().trim();

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

export default async function handler(req: any, res: any) {
  // Support CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { message, history = [], userDoshaProfile = null, language = 'mr' } = body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const preferInternalEngine = process.env.USE_INTERNAL_AI !== 'false';

    // 1. High-Performance Internal AI Engine (No Gemini API required)
    if (preferInternalEngine) {
      const internalResult = generateInternalAyurvedicResponse(message, history, userDoshaProfile, language);
      return res.status(200).json(internalResult);
    }

    // 2. Optional External Gemini API flow (if explicitly enabled)
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';

    if (apiKey) {
      const candidateModels = [
        'gemini-3.7-flash',
        'gemini-3.8-flash',
        'gemini-3.1-flash-lite',
        'gemini-flash-latest'
      ];

      let contextualPrompt = message;
      if (userDoshaProfile) {
        contextualPrompt = `[Context: User constitutional self-assessment: Dominant: ${userDoshaProfile.dominant}, Vata: ${userDoshaProfile.vata}%, Pitta: ${userDoshaProfile.pitta}%, Kapha: ${userDoshaProfile.kapha}%, Pulse Rhythm: ${userDoshaProfile.pulseGati || 'Classical'}].\n\nUser Question: ${message}`;
      }

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

      const ai = new GoogleGenAI({ apiKey });

      for (const modelName of candidateModels) {
        try {
          const response = await withTimeout(
            ai.models.generateContent({
              model: modelName,
              contents: contents,
              config: {
                systemInstruction: AYURVEDA_SYSTEM_INSTRUCTION,
                temperature: 0.5,
              }
            }),
            3000
          );

          let replyText = response.text || '';
          if (replyText.trim()) {
            if (!replyText.includes('AI-Assisted Educational Response')) {
              replyText = `**[AI-Assisted Educational Response · General Guidance Only]**\n\n${replyText}`;
            }
            if (!replyText.includes('77588 16074') && !replyText.includes('AayuTatva')) {
              replyText += `\n\n${HOSPITAL_CONTACT_CTA}`;
            }

            return res.status(200).json({ reply: replyText, source: modelName });
          }
        } catch {
          // Model timeout or error; try next candidate
        }
      }
    }

    const fallbackResult = generateInternalAyurvedicResponse(message, history, userDoshaProfile);
    return res.status(200).json(fallbackResult);
  } catch (err: any) {
    console.error('Error in Vercel API handler:', err);
    const errResult = generateInternalAyurvedicResponse(req.body?.message || 'general');
    return res.status(200).json(errResult);
  }
}
