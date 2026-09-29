/**
 * AayuTatva Internal Ayurvedic AI Assistant Engine
 * 
 * Provides concise, direct responses with one-tap Call (phone dialpad)
 * and WhatsApp (WhatsApp app) actions for Dr. Manish Santosh Yerpude
 * at AayuTatva Ayurvedic Hospital & Panchakarma Centre, Bhandara.
 */

export interface DoshaProfile {
  dominant?: string;
  vata?: number;
  pitta?: number;
  kapha?: number;
  pulseGati?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'model';
  content?: string;
  text?: string;
}

export interface InternalAIResponse {
  reply: string;
  source: 'aayutatva-internal-engine';
  intent: string;
  phone: string;
  whatsappUrl: string;
}

const PRIMARY_PHONE = '+917758816074';
const WHATSAPP_NUMBER = '917758816074';

const INTENT_TOPICS: Record<string, { patterns: string[]; label: string }> = {
  SPINE_SCIATICA: {
    patterns: ['sciatica', 'gridhrasi', 'back pain', 'spine', 'spinal', 'disc', 'slip disc', 'lumbar', 'cervical', 'spondylosis', 'kati basti', 'neck pain', 'lower back', 'pith dukhne', 'kambar'],
    label: 'Spine & Sciatica non-surgical treatments (Kati Basti, Panchakarma)'
  },
  JOINTS_ARTHRITIS: {
    patterns: ['joint', 'knee', 'janu basti', 'arthritis', 'osteoarthritis', 'amavata', 'sandhigata', 'swelling', 'sandhe', 'gout', 'knee pain'],
    label: 'Joint & Knee pain relief (Janu Basti, Patra Pinda Sweda)'
  },
  PANCHAKARMA: {
    patterns: ['panchakarma', 'detox', 'cleansing', 'vamana', 'virechana', 'basti', 'nasya', 'raktamokshana', 'shirodhara', 'abhyanga'],
    label: 'Authentic 5 Panchakarma detox therapies & IPD admissions'
  },
  NADI_PARIKSHAN: {
    patterns: ['nadi', 'pulse', 'parikshan', 'pulse diagnosis', 'radial pulse', 'sarpa', 'manduka', 'hamsa'],
    label: 'Classical Nadi Parikshan (radial pulse diagnosis)'
  },
  PEDIATRIC_GROWTH: {
    patterns: ['height', 'growth', 'pediatric', 'child growth', 'teenager', 'puberty', 'suvarna prashan'],
    label: 'Pediatric Growth & Height consultation protocols'
  },
  CASHLESS_INSURANCE: {
    patterns: ['insurance', 'mediclaim', 'cashless', 'nabh', 'tpa', 'star health', 'hdfc ergo', 'icici', 'care', 'claim'],
    label: '100% Cashless Mediclaim Insurance & NABH hospital admissions'
  },
  DOSHA_DIET: {
    patterns: ['dosha', 'prakriti', 'vata', 'pitta', 'kapha', 'diet', 'food', 'ahara', 'nutrition', 'agni', 'acidity', 'constipation'],
    label: 'Personalized Dosha balance and Ayurvedic Diet (Ahara) guidance'
  },
  APPOINTMENT_TIMINGS: {
    patterns: ['doctor', 'manish', 'yerpude', 'timing', 'hours', 'appointment', 'address', 'location', 'fees', 'where', 'bhandara'],
    label: 'Doctor consultation appointments and clinic visiting hours'
  },
  GREETING: {
    patterns: ['hello', 'hi', 'namaste', 'pranam', 'hey', 'start'],
    label: 'consultation with Dr. Manish Santosh Yerpude'
  }
};

export function generateInternalAyurvedicResponse(
  userMessage: string,
  _history: ChatMessage[] = [],
  userDoshaProfile?: DoshaProfile | null
): InternalAIResponse {
  const query = (userMessage || '').toLowerCase().trim();

  let matchedTopic = 'consultation with Dr. Manish Santosh Yerpude';
  let matchedIntent = 'GENERAL_INQUIRY';

  for (const [intentKey, data] of Object.entries(INTENT_TOPICS)) {
    if (data.patterns.some(p => query.includes(p))) {
      matchedTopic = data.label;
      matchedIntent = intentKey;
      break;
    }
  }

  const encodedQuery = encodeURIComponent(
    `Hello Dr. Manish Yerpude, I am inquiring from the website regarding: "${userMessage.slice(0, 80)}" at AayuTatva Ayurvedic Hospital.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedQuery}`;
  const phoneDialUrl = `tel:${PRIMARY_PHONE}`;

  let doshaSnippet = '';
  if (userDoshaProfile?.dominant) {
    doshaSnippet = ` (Assessed Dosha: **${userDoshaProfile.dominant}**)`;
  }

  const reply = `Namaste 🙏 For **${matchedTopic}**${doshaSnippet}, please contact **Dr. Manish Santosh Yerpude** [B.A.M.S., MD (AM), P.G.P.P.] directly. Tap below to call or WhatsApp our clinic:

📞 **Phone**: [**+91 77588 16074**](${phoneDialUrl}) *(Tap to Open Dialpad)*
💬 **WhatsApp**: [**Chat on WhatsApp**](${whatsappUrl}) *(Tap to Open WhatsApp)*

📍 **AayuTatva Ayurvedic Hospital**: 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904
⏰ **OPD Timings**: 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM (Daily)`;

  return {
    reply,
    source: 'aayutatva-internal-engine',
    intent: matchedIntent,
    phone: PRIMARY_PHONE,
    whatsappUrl
  };
}
