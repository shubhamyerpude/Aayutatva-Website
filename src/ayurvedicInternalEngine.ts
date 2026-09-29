/**
 * AayuTatva Crisp & High-Precision In-House Ayurvedic Intelligence Engine
 * 
 * Delivers concise, clinically accurate Ayurvedic answers without redundant context.
 * 100% self-contained: Zero external APIs, zero dependencies, instant responses.
 * 
 * Languages supported: Marathi ('mr' - default), Hindi ('hi'), English ('en').
 * Supervised by Dr. Manish Santosh Yerpude [B.A.M.S., MD (AM), P.G.P.P. Pune].
 */

export type SupportedLanguage = 'mr' | 'hi' | 'en';

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
  topicTitle?: string;
  language: SupportedLanguage;
  phone: string;
  whatsappUrl: string;
}

const PRIMARY_PHONE = '+917758816074';
const WHATSAPP_NUMBER = '917758816074';

interface TopicDefinition {
  id: string;
  title: Record<SupportedLanguage, string>;
  keywords: string[];
  mr: string;
  hi: string;
  en: string;
}

const TOPICS: TopicDefinition[] = [
  // 1. SPINE, SCIATICA & SLIP DISC
  {
    id: 'SPINE_SCIATICA',
    title: {
      mr: 'मणके, सायटिका व स्लिप डिस्क (गृध्रसी)',
      hi: 'स्लिप डिस्क, साइटिका व रीढ़ की हड्डी (गृध्रसी)',
      en: 'Slip Disc, Sciatica & Spine Health (Gridhrasi)'
    },
    keywords: [
      'sciatica', 'gridhrasi', 'back pain', 'spine', 'spinal', 'disc', 'slip disc', 'lumbar', 'l4', 'l5', 's1', 
      'cervical', 'spondylosis', 'kati basti', 'neck pain', 'lower back', 'pith', 'kambar', 'radiculopathy', 
      'pinched nerve', 'greeva', 'कंबर', 'कंबरदुखी', 'मणका', 'मणके', 'सायटिका', 'पाठदुखी', 'मानदुखी', 
      'नस दबणे', 'पाठीचा कणा', 'गृध्रसी', 'स्लिप डिस्क', 'सर्वायकल', 'कमर दर्द', 'रीढ़', 'साइटिका'
    ],
    mr: `### 🦴 कंबरदुखी, स्लिप डिस्क आणि सायटिका (गृध्रसी)

• **आयुर्वेदिक कारण**: मणक्यांमधील रुक्ष वात वाढल्यामुळे गादी (Disc) सुकते आणि नसांवर (Sciatic nerve) दाब येतो.
• **शास्त्रीय पंचकर्म उपचार**:
  - **कटी बस्ती (Kati Basti)**: मणक्यावर कोमट औषधी तेल (सहचरादी / महानारायण तैल) साठवून गादी पुन्हा हायड्रेट केली जाते व दाबली गेलेली नस मोकळी होते.
  - **पत्रपिंड स्वेद (Patra Pinda Sweda)**: निर्गुंडी व एरंडाच्या पानांच्या औषधी पुरचुंडीने शेक देऊन स्नायू मोकळे केले जातात.
  - **तिक्त क्षीर बस्ती**: औषधी दुधाचा बस्ती देऊन हाडांना (अस्थी धातू) आतून पोषण दिले जाते.
• **पथ्य व घरगुती सल्ला**:
  - जड वजन पुढे वाकून उचलणे टाळा; मऊ ऐवजी मध्यम कडक गादीवर झोपा.
  - कोमट तिळाच्या तेलाने हलका मसाज करा; थेट एसीच्या गार वाऱ्यात झोपणे टाळा.`,
    hi: `### 🦴 स्लिप डिस्क एवं साइटिका (गृध्रसी) - बिना सर्जरी उपचार

• **आयुर्वेदिक कारण**: वात दोष बढ़ने से रीढ़ की डिस्क सूखती है और नसों पर दबाव आता है।
• **प्रमुख पंचकर्म उपचार**:
  - **कटी बस्ती (Kati Basti)**: औषधीय तेल का ठहराव कर दबी हुई नस को बिना ऑपरेशन खोला जाता है।
  - **पत्र पिंड स्वेद**: औषधीय पोटली से सिकाई कर जकड़न व दर्द में तुरंत राहत।
  - **तिक्त क्षीर बस्ती**: औषधीय दूध का एनिमा देकर रीढ़ की हड्डियों को पोषण।
• **परहेज व सुझाव**: आगे झुककर भारी वजन न उठाएं, रात को गुनगुने दूध में 1 चम्मच गाय का घी लें।`,
    en: `### 🦴 Slip Disc, Sciatica & Spine Care (Gridhrasi)

• **Ayurvedic Root Cause**: Aggravated Vata dehydrates spinal discs and compresses the sciatic nerve.
• **Hospital Panchakarma Protocols**:
  - **Kati Basti**: Medicated warm herbal oil pool (*Sahacharadi / Mahanarayana*) over vertebrae to decompress nerves and rehydrate discs.
  - **Patra Pinda Sweda**: Medicinal herbal leaf poultice fomentation to relieve muscular spasms.
  - **Tikta Ksheera Basti**: Medicated milk enemas to nourish bone and marrow tissue (*Asthi-Majja Dhatu*).
• **Home Advice**: Avoid forward bending with heavy weights; sleep on a medium-firm mattress; apply warm sesame oil gently.`
  },

  // 2. KNEE PAIN & ARTHRITIS
  {
    id: 'JOINTS_ARTHRITIS',
    title: {
      mr: 'गुडघेदुखी व संधिवात (संधिगत वात व आमवात)',
      hi: 'घुटनों का दर्द व गठिया (संधिगत वात एवं आमवात)',
      en: 'Knee Pain, Osteoarthritis & Joint Health'
    },
    keywords: [
      'joint', 'knee', 'janu basti', 'arthritis', 'osteoarthritis', 'amavata', 'sandhigata', 'swelling', 'sandhe', 
      'gout', 'vatarakta', 'rheumatoid', 'crepitus', 'cartilage', 'knee replacement', 'ghutna', 'sandhe vata',
      'गुडघे', 'गुडघेदुखी', 'सांधे', 'सांधेदुखी', 'संधिवात', 'आमवात', 'वात', 'वंगण', 'गुडघा बदलणे',
      'घुटने का दर्द', 'जोड़ों का दर्द', 'गठिया', 'सूजन'
    ],
    mr: `### 🦵 गुडघेदुखी, झीज आणि संधिवात उपचार

• **आयुर्वेदिक कारण**: गुडघ्यातील वंगण (**श्लेषक कफ**) व कार्टिलेज सुकल्यामुळे हाडांची झीज (ऑस्टिओआर्थरायटिस) होते.
• **आयुतत्व पंचकर्म उपचार (ऑपरेशन टाळण्यासाठी)**:
  - **जानू बस्ती (Janu Basti)**: गुडघ्यावर औषधी तेलाचे आळे बांधून सांध्यांमधील वंगण पुनरुज्जीवित करणे.
  - **षष्टिक शाली पिंड स्वेद (Navarakizhi)**: औषधी दुधात शिजवलेल्या तांदळाच्या पुरचुंडीने लिगामेंट्स बळकट करणे.
  - **लेप चिकित्सा**: सूज व जळजळ कमी करण्यासाठी दशांग लेप.
• **पथ्य व घरगुती सल्ला**:
  - रोज रात्री १ चमचा शुद्ध गाईचे तूप कोमट दुधात घ्यावे (सांध्यांना आतून स्निग्धता मिळते).
  - खाली मांडी घालून बसणे टाळावे; थंड पाण्याऐवजी कोमट पाण्याने आंघोळ करावी.`,
    hi: `### 🦵 घुटनों का दर्द एवं गठिया (संधिगत वात)

• **आयुर्वेदिक कारण**: घुटनों की चिकनाई (श्लेषक कफ) और कार्टिलेज घिसने से दर्द व कट-कट की आवाज होती है।
• **पंचकर्म उपचार (नी-रिप्लेसमेंट से बचाव)**:
  - **जानू बस्ती (Janu Basti)**: औषधीय तेल द्वारा घुटनों के कार्टिलेज को पोषण।
  - **षष्टिक शाली स्वेद**: औषधीय चावल की पोटली से जोड़ों व नसों को मजबूती।
• **परहेज व सुझाव**: जमीन पर पालथी मारकर न बैठें, रात को 1 चम्मच गाय का घी दूध में लें।`,
    en: `### 🦵 Knee Osteoarthritis & Joint Health (Sandhigata Vata)

• **Ayurvedic Cause**: Depletion of synovial lubrication (*Shleshaka Kapha*) leading to cartilage friction and crepitus.
• **Hospital Panchakarma Protocols**:
  - **Janu Basti**: Medicated herbal oil retention over knee joints to restore natural lubrication.
  - **Shashtika Shali Pinda Sweda**: Medicinal rice poultices cooked in herbal milk to strengthen ligaments.
  - **Lepa Therapy**: Herbal paste applications to reduce peri-articular swelling.
• **Home Advice**: Avoid squatting cross-legged; consume 1 tsp pure cow ghee in warm milk at night.`
  },

  // 3. NADI PARIKSHAN (PULSE DIAGNOSIS)
  {
    id: 'NADI_PARIKSHAN',
    title: {
      mr: 'शास्त्रीय नाडी परीक्षा (Radial Pulse Diagnosis)',
      hi: 'शास्त्रीय नाड़ी परीक्षा (Pulse Diagnosis)',
      en: 'Classical Nadi Parikshan (Radial Pulse Diagnosis)'
    },
    keywords: [
      'nadi', 'pulse', 'parikshan', 'pulse diagnosis', 'radial pulse', 'sarpa', 'manduka', 'hamsa', 'gati', 'wrist',
      'नाडी', 'नाडी परीक्षा', 'पल्स', 'मनगट', 'हात बघणे', 'दोष तपासणी', 'नाड़ी', 'नाड़ी परीक्षा'
    ],
    mr: `### 🩺 शास्त्रीय नाडी परीक्षा (Radial Pulse Diagnosis)

• **निदान पद्धती**: मनगटावर ३ बोटे (तर्जनी, मध्यमा, अनामिका) ठेवून शरीरातील दोष तपासले जातात:
  - **तर्जनी (वात दोष) - सर्प गती**: सापासारखी नागमोडी गती → नसांचे आजार, कंबरदुखी, गॅस, निद्रानाश.
  - **मध्यमा (पित्त दोष) - मण्डूक गती**: बेडकासारखी उडी मारणारी गती → ऍसिडिटी, उष्णता, रक्तविकार.
  - **अनामिका (कफ दोष) - हंस गती**: हंसासारखी संथ गती → थायरॉईड, मंद पचन, लठ्ठपणा, कफ.
• **नाडी परीक्षेची पूर्वतयारी**:
  - सकाळी रिकाम्या पोटी किंवा हलक्या नाश्त्यानंतर २.५ ते ३ तासांनी यावे.
  - तपासणीच्या २ तास आधी चहा, कॉफी आणि तंबाखू टाळावी.`,
    hi: `### 🩺 शास्त्रीय नाड़ी परीक्षा (Pulse Diagnosis)

• **कलाई की 3 उंगलियों से त्रिदोष जांच**:
  - **तर्जनी (वात - सर्प गति)**: गैस, जोड़ों का दर्द, अनिद्रा।
  - **मध्यमा (पित्त - मण्डूक गति)**: एसिडिटी, जलन, लिवर दोष।
  - **अनामिका (कफ - हंस गति)**: मोटापा, सुस्त पाचन, थायरॉइड।
• **पूर्वतैयारी**: सुबह खाली पेट या हल्के भोजन के 3 घंटे बाद आएं; चाय-कॉफी न लें।`,
    en: `### 🩺 Classical Radial Pulse Diagnosis (Nadi Parikshan)

• **3 Finger Waveforms at the Radial Artery**:
  - **Index Finger (Vata) — Sarpa Gati (Snake Wave)**: Detects neurological tension, pain, bloating, insomnia.
  - **Middle Finger (Pitta) — Manduka Gati (Frog Leap)**: Detects metabolic heat, acidity, liver inflammation.
  - **Ring Finger (Kapha) — Hamsa Gati (Swan Glide)**: Detects sluggish metabolism, fluid retention, thyroid issues.
• **Pre-Consultation Rule**: Arrive in morning on an empty stomach or 2.5–3 hours after a light meal; avoid caffeine.`
  },

  // 4. PILES, FISSURE & FISTULA
  {
    id: 'PILES_FISSURE',
    title: {
      mr: 'मूळव्याध, फिशर व भगंदर (अर्श व परिकर्तिका)',
      hi: 'बवासीर, फिशर व भगंदर (अर्श व भगन्दर)',
      en: 'Piles, Fissure & Fistula (Arsha & Bhagandara)'
    },
    keywords: [
      'piles', 'bawasir', 'fissure', 'fistula', 'bleeding', 'rectal', 'anal', 'arsha', 'bhagandara', 'ksharsutra', 'mulvyadh',
      'मूळव्याध', 'फिशर', 'भगंदर', 'संडासला रक्त', 'संडासच्या जागी दुखणे', 'मस्सा', 'बवासीर', 'गुद'
    ],
    mr: `### 🌿 मूळव्याध, फिशर आणि भगंदर (विना-शस्त्रक्रिया क्षारसूत्र)

• **आयुर्वेदिक कारण**: जुनाट बद्धकोष्ठता व अति उष्ण आहाराने गुदमार्गातील शिरा सुजतात (अर्श) किंवा त्वचा फाटते (फिशर).
• **हॉस्पिटल उपचार**:
  - **क्षारसूत्र चिकित्सा (Ksharsutra)**: भगंदर व मूळव्याधीसाठी जागतिक आरोग्य संघटनेने (WHO) मान्यता दिलेली आयुर्वेदिक विना-टाके उपचार पद्धती.
  - **अवगाह स्वेद (Sitz Bath)**: त्रिफळा काढ्याच्या कोमट पाण्यात बसल्याने वेदना व सूज त्वरित कमी होते.
• **पथ्य**: तिखट, मसालेदार, मांसाहार व कोरडे अन्न पूर्ण टाळा; भरपूर पाणी, ताक आणि पालेभाज्या खा.`,
    hi: `### 🌿 बवासीर (Piles), फिशर व भगंदर उपचार

• **क्षारसूत्र चिकित्सा**: भगंदर व बवासीर के लिए बिना चीर-फाड़ व बिना टांके की विश्व प्रसिद्ध आयुर्वेदिक तकनीक।
• **घरेलू राहत**: त्रिफला के गुनगुने पानी में टब-बाथ (सिट्ज़ बाथ) लें; छाछ और पपीते का सेवन करें। तेज मिर्च-मसाला छोड़ें।`,
    en: `### 🌿 Piles, Fissure & Fistula (Arsha & Bhagandara)

• **Ayurvedic Management**: Rooted in chronic constipation and aggravated Apana Vata / Pitta.
• **Ksharsutra Therapy**: Specialized medicated linen thread ligation for piles and fistula — minimal recurrence, no stitches.
• **Immediate Relief**: Warm Sitz bath with Triphala decoction; consume buttermilk, papaya, and fiber; strictly avoid chilies.`
  },

  // 5. ACIDITY, GAS & CONSTIPATION
  {
    id: 'DIGESTION_ACIDITY_CONSTIPATION',
    title: {
      mr: 'अॅसिडिटी, गॅस व बद्धकोष्ठता (पोट साफ न होणे)',
      hi: 'एसिडिटी, गैस व कब्ज (पाचन विकार)',
      en: 'Acidity, Gas, Bloating & Constipation'
    },
    keywords: [
      'acidity', 'acid', 'gerd', 'heartburn', 'constipation', 'pet', 'gas', 'bloating', 'ibs', 'grahani', 'amlapitta', 'vibandha', 'motions', 'kabz', 'stomach', 'ulcer',
      'अॅसिडिटी', 'पित्त', 'गॅस', 'पोट', 'बद्धकोष्ठता', 'कब्ज', 'पोटात जळजळ', 'पोट साफ', 'संडास साफ'
    ],
    mr: `### 🔥 अॅसिडिटी (अम्लपित्त), गॅस व बद्धकोष्ठता उपाय

• **अॅसिडिटी व छातीत जळजळ**:
  - **औषधी**: कामदुधा रस, सूतशेखर रस, अविपत्तिकर चूर्ण.
  - **घरगुती उपाय**: १ चमचा धणे व १ चमचा बडीशेप रात्री पाण्यात भिजवून सकाळी पाणी प्या; जेवणानंतर सैंधव-जिरे टाकून ताक प्या.
  - **परहेज**: चहा, तंबाखू, रात्री उशिरा जेवणे, अति तिखट अन्न टाळा.
• **जुनाट बद्धकोष्ठता (पोट साफ न होणे)**:
  - रात्री झोपताना १ कप कोमट दुधात १ चमचा साजूक तूप किंवा एरंडेल तेल घ्या.
  - सकाळी उठल्याबरोबर २ ग्लास कोमट पाणी प्या; आतड्यांच्या रुक्षतेवर **मात्रा बस्ती** अत्यंत गुणकारी आहे.`,
    hi: `### 🔥 एसिडिटी, गैस एवं कब्ज के त्वरित आयुर्वेदिक उपाय

• **एसिडिटी (अम्लपित्त)**: कामदुधा रस, अविपत्तिकर चूर्ण, दोपहर में भुने जीरे वाला ताजा छाछ। खाली पेट चाय व तीखा भोजन बंद करें।
• **कब्ज (Constipation)**: रात को 1 गिलास गुनगुने दूध में 1 चम्मच गाय का घी या त्रिफला चूर्ण लें। सुबह 2 गिलास गुनगुना पानी पिएं।`,
    en: `### 🔥 Acidity (Amlapitta), Gas & Constipation Relief

• **For Acidity & GERD**:
  - Classical remedies: *Kamadudha Rasa*, *Avipattikar Churna*.
  - Home tip: Drink overnight-soaked coriander & fennel water in morning; buttermilk with roasted cumin after lunch.
• **For Chronic Constipation**:
  - Take 1 tsp pure cow ghee in warm milk at bedtime; drink 2 glasses of warm water on waking.
  - Chronic dryness in colon responds rapidly to *Matra Basti* (medicated oil enema).`
  },

  // 6. TRIDOSHA & AHARA (DIET)
  {
    id: 'DOSHA_DIET',
    title: {
      mr: 'त्रिदोष प्रकृती व पथ्यकर आहार नियम',
      hi: 'त्रिदोष प्रकृति एवं आयुर्वेदिक आहार नियम',
      en: 'Tridosha Constitution & Diet (Ahara)'
    },
    keywords: [
      'dosha', 'prakriti', 'vikriti', 'vata', 'pitta', 'kapha', 'diet', 'food', 'ahara', 'nutrition', 'eat', 'meal', 'recipes',
      'दोष', 'प्रकृती', 'वात', 'पित्त', 'कफ', 'आहार', 'जेवण', 'काय खावे', 'काय टाळावे', 'पथ्य'
    ],
    mr: `### 🍲 आयुर्वेदानुसार त्रिदोष आणि पथ्यकर आहार

• **वात प्रकृती**: गरम, ताजे, साजूक तूप, मऊ खिचडी, बदाम, खजूर खावे. कच्च्या थंड कोशिंबिरी, कोरडे फरसाण व शिळे अन्न टाळावे.
• **पित्त प्रकृती**: गोड व कडू चवीचे पदार्थ, काकडी, डाळिंब, आवळा, नारळ पाणी, धणे-जिरे पाणी प्यावे. अति तिखट, लोणचे, तळलेले पदार्थ टाळावे.
• **कफ प्रकृती**: हलके अन्न, भाजलेली ज्वारी-बाजरी, सुंठ पाणी, हिरव्या भाज्या खाव्यात. रात्रीचे दही, अति गोड व तेलकट पदार्थ टाळावे.
• **आहार नियम**: पोटाचा १/३ भाग अन्नाने, १/३ द्रवाने भरावा व १/३ हवेसाठी रिकामा ठेवावा. दूध व आंबट फळे एकत्र खाऊ नये.`,
    hi: `### 🍲 त्रिदोष एवं आयुर्वेदिक आहार नियम

• **वात**: गरम, स्निग्ध, गाय का घी, मूंग दाल खिचड़ी लें। कच्चा ठंडा सलाद व सूखा भोजन न लें।
• **पित्त**: ठंडा, मीठा, कड़वा रस, नारियल पानी, खीरा, अनार लें। तेज मिर्च, खटाई व तला खाना छोड़ें।
• **कफ**: ज्वार, बाजरा, सोंठ, हल्की सब्जियां लें। रात को दही, मिठाई व दिन में सोना वर्जित है।`,
    en: `### 🍲 Classical Ayurvedic Diet (Ahara) Guidelines

• **Vata**: Warm, freshly cooked, grounding foods with cow ghee and warm spices. Avoid dry, raw, cold foods.
• **Pitta**: Cooling, sweet and bitter foods (cucumber, pomegranate, coconut water, fennel). Avoid hot chilies, vinegar, fried foods.
• **Kapha**: Light, warm, spicy, and bitter foods (millets, steamed greens, ginger). Avoid heavy sweets, cold milk, and yogurt at night.
• **Golden Rule**: Keep 1/3 of stomach for food, 1/3 for water, and 1/3 empty for digestion.`
  },

  // 7. PANCHAKARMA DETOX
  {
    id: 'PANCHAKARMA',
    title: {
      mr: '५ शास्त्रीय पंचकर्म आणि शिरोधारा',
      hi: '5 शास्त्रीय पंचकर्म एवं शिरोधारा',
      en: 'The 5 Panchakarma Detox Therapies & Shirodhara'
    },
    keywords: [
      'panchakarma', 'detox', 'cleansing', 'vamana', 'virechana', 'basti', 'nasya', 'raktamokshana', 'shirodhara', 'abhyanga',
      'पंचकर्म', 'वमन', 'विरेचन', 'बस्ती', 'नस्य', 'रक्तमोक्षण', 'शिरोधारा', 'अभ्यंग', 'डिटॉक्स'
    ],
    mr: `### 🌸 ५ शास्त्रीय पंचकर्म व शिरोधारा

1. **वमन (Vamana)**: छातीतील कफ उलटीवाटे बाहेर काढणे (दमा, ऍलर्जी, लठ्ठपणा).
2. **विरेचन (Virechana)**: यकृत (लिव्हर) व पित्ताची शौचावाटे शुद्धी (सोरायसिस, त्वचारोग, ऍसिडिटी).
3. **बस्ती (Basti - उपचारांचा राजा)**: मणके, सांधे व वाताच्या सर्व आजारांवर औषधी तेल व काढ्याचा बस्ती.
4. **नस्य (Nasya)**: नाकात औषधी थेंब सोडून डोकेदुखी, मायग्रेन, सायनस व मानदुखी बरे करणे.
5. **रक्तमोक्षण (Jalauka)**: जळू लावून दूषित रक्त बाहेर काढणे (सोरायसिस, एक्झिमा, व्हेरिकोज व्हेन्स).
• **शिरोधारा**: कपाळावर औषधी तेलाची संतत धार सोडून मानसिक ताण व निद्रानाश दूर करणे.`,
    hi: `### 🌸 5 शास्त्रीय पंचकर्म डिटॉक्स

1. **वमन**: कफ की शुद्धि (अस्थमा, एलर्जी)।
2. **विरेचन**: पित्त व लिवर की शुद्धि (एसिडिटी, चर्म रोग)।
3. **बस्ती**: वात रोगों (साइटिका, स्लिप डिस्क, गठिया) का सर्वोत्तम इलाज।
4. **नस्य**: सिरदर्द, माइग्रेन व साइनस के लिए नाक में औषधि।
5. **रक्तमोक्षण**: लीच थेरेपी द्वारा दूषित खून की सफाई।
• **शिरोधारा**: माथे पर औषधीय तेल की धार से तनाव व अनिद्रा का निवारण।`,
    en: `### 🌸 The 5 Authentic Panchakarma Cleansing Therapies

1. **Vamana**: Therapeutic emesis for deep Kapha congestion (asthma, allergies, obesity).
2. **Virechana**: Herbal purgation for liver and Pitta toxins (acidity, skin diseases).
3. **Basti**: Medicated herbal enemas — master therapy for all Vata and spine disorders.
4. **Nasya**: Nasal administration for sinusitis, migraine, cervical stiffness.
5. **Raktamokshana**: Leech therapy to drain impure blood in psoriasis, eczema, varicose veins.
• **Shirodhara**: Continuous rhythmic oil pour over forehead for stress, anxiety, and insomnia.`
  },

  // 8. PEDIATRIC GROWTH & SUVARNA PRASHAN
  {
    id: 'PEDIATRIC_GROWTH',
    title: {
      mr: 'मुलांची उंची वाढ (Height) व सुवर्णप्राशन',
      hi: 'बच्चों की लंबाई (हाइट) एवं सुवर्णप्राशन',
      en: 'Pediatric Growth & Suvarna Prashan'
    },
    keywords: [
      'height', 'growth', 'pediatric', 'child growth', 'teenager', 'puberty', 'suvarna prashan', 'epiphysis', 'tall', 'stunted', 'swarna prashan', 'masterclass',
      'उंची', 'उंची वाढ', 'उंची कशी वाढवावी', 'मुलांची उंची', 'सुवर्णप्राशन', 'हाइट', 'हाइट ग्रोथ', 'लंबाई'
    ],
    mr: `### 📏 मुलांची उंची वाढ (Height Growth) व सुवर्णप्राशन

• **उंची वाढीचे वय**: हाडांच्या टोकावरील ग्रोथ प्लेट्स (Epiphysis) उघड्या असेपर्यंत (वय ८ ते २१ वर्षे) उंची वाढवता येते.
• **सुवर्णप्राशन (Suvarna Prashan)**: दर महिन्याच्या पुष्य नक्षत्रावर २४ कॅरेट शुद्ध सुवर्ण भस्म व मेध्य वनस्पतींचे थेंब दिल्याने मुलांची प्रतिकारशक्ती, बुद्धिमत्ता व शारीरिक वाढ होते.
• **अस्थी पोषक आहार**: अश्वगंधा, प्रवाळ पिष्टी (नैसर्गिक कॅल्शियम), दूध, खजूर आणि तीळ.
• **व्यायाम**: दररोज १० मिनिटे ताडासन, भुजंगासन आणि पुलावर लटकणे (Hanging).`,
    hi: `### 📏 बच्चों की लंबाई (हाइट ग्रोथ) और सुवर्णप्राशन

• **ग्रोथ प्लेट्स (उम्र 8 से 21 वर्ष)**: खुली रहने तक प्राकृतिक रूप से हाइट बढ़ाई जा सकती है।
• **सुवर्णप्राशन**: पुष्य नक्षत्र पर स्वर्ण भस्म के सेवन से रोग प्रतिरोधक क्षमता और ग्रोथ हार्मोन्स बढ़ते हैं।
• **दैनिक नियम**: अश्वगंधा, दूध, ताड़ासन और हैंगिंग एक्सरसाइज से रीढ़ व पैरों की हड्डियों का विकास होता है।`,
    en: `### 📏 Pediatric Height Growth & Suvarna Prashan

• **Growth Window**: Long bones grow as long as epiphyseal growth plates remain open (ages 8 to 21).
• **Suvarna Prashan**: 24K purified nano-gold ash with Medhya herbs administered on Pushya Nakshatra to stimulate endocrine growth and immunity.
• **Bone Nutrition**: Ashwagandha, bioavailable coral calcium (*Praval Pishti*), A2 milk, and dates.
• **Daily Routine**: Tadasana, Bhujangasana, and bar hanging for 10 minutes daily.`
  },

  // 9. STRESS, INSOMNIA & HEADACHE
  {
    id: 'STRESS_INSOMNIA',
    title: {
      mr: 'मानसिक ताण, निद्रानाश व डोकेदुखी',
      hi: 'मानसिक तनाव, अनिद्रा एवं सिरदर्द',
      en: 'Stress, Insomnia & Headache / Migraine'
    },
    keywords: [
      'stress', 'anxiety', 'sleep', 'insomnia', 'depression', 'mental', 'tension', 'brain', 'nidra', 'headache', 'migraine', 'ardhavabhedaka',
      'ताण', 'चिंता', 'झोप', 'निद्रानाश', 'डोकेदुखी', 'मायग्रेन', 'तणाव', 'अनिद्रा'
    ],
    mr: `### 🧠 मानसिक ताण, चिंता आणि निद्रानाश (शांत झोप)

• **आयुर्वेदिक कारण**: मज्जासंस्थेतील **प्राण वात** आणि **साधक पित्त** बिघडल्यामुळे सतत विचार व अपुरी झोप येते.
• **उपचार**:
  - **शिरोधारा (Shirodhara)**: कपाळावर कोमट क्षीरबला तेलाची धार सोडून मज्जासंस्थेला त्वरित शांत करणे.
  - **पादाभ्यंग**: रात्री तळपायांना काशाच्या वाटीने किंवा कोमट तिळाच्या तेलाने ५ मिनिटे मसाज करणे.
  - **वनस्पती**: ब्राह्मी, जटामांसी, शंखपुष्पी आणि अश्वगंधा.
• **घरगुती नियम**: झोपण्यापूर्वी मोबाईल स्क्रीन १ तास आधी बंद करा; कोमट दुधात चिमूटभर जायफळ पूड टाकून प्या.`,
    hi: `### 🧠 मानसिक तनाव, अनिद्रा और सिरदर्द निवारण

• **शिरोधारा थेरेपी**: कपाव पर औषधीय तेल की धार से तनाव दूर कर गहरी प्राकृतिक नींद लाती है।
• **घरेलू उपाय**: रात को सोने से पहले तलवों की तिल के तेल से मालिश करें; गुनगुने दूध में चुटकी भर जायफल लें।
• **मेध्य औषधियां**: ब्राह्मी, शंखपुष्पी, अश्वगंधा दिमाग की नसों को शक्ति देती हैं।`,
    en: `### 🧠 Stress, Anxiety & Insomnia (Chittodvega & Nidranasha)

• **Root Cause**: Agitation of Prana Vata and Sadhaka Pitta causing neuro-synaptic hyperactivity.
• **Key Therapies**:
  - **Shirodhara**: Continuous rhythmic warm oil flow over forehead to activate parasympathetic calm.
  - **Padaabhyanga**: Massaging soles of feet with warm sesame oil before bed.
  - **Herbs**: *Brahmi*, *Jatamansi*, *Shankhpushpi*, *Ashwagandha*.
• **Sleep Hygiene**: Stop screens 60 mins before bed; drink warm milk with a pinch of nutmeg.`
  },

  // 10. SKIN, PSORIASIS & ECZEMA
  {
    id: 'SKIN_KUSHTHA',
    title: {
      mr: 'सोरायसिस, एक्झिमा व त्वचारोग (कुष्ठ)',
      hi: 'सोरायसिस, एक्जिमा व चर्म रोग (कुष्ठ)',
      en: 'Psoriasis, Eczema & Skin Disorders (Kushtha)'
    },
    keywords: [
      'skin', 'psoriasis', 'eczema', 'kushtha', 'itching', 'allergy', 'rash', 'urticaria', 'sheetapitta', 'dermatitis', 'blood purification',
      'त्वचा', 'सोरायसिस', 'एक्झिमा', 'खाज', 'अॅलर्जी', 'पित्त उठणे', 'त्वचारोग', 'चर्म रोग'
    ],
    mr: `### 🌺 सोरायसिस, एक्झिमा व जुनाट त्वचारोग

• **आयुर्वेदिक कारण**: रक्त धातू आणि लसिका मध्ये पित्त-कफ दोष साचल्यामुळे त्वचेला खाज, खवले व लालसरपणा येतो.
• **हॉस्पिटल पंचकर्म**:
  - **विरेचन (Virechana)**: लिव्हर व रक्तातील आम्लता जुलाबावाटे बाहेर काढणे.
  - **जळू चिकित्सा (Leech Therapy)**: औषधी जळू लावून प्रभावित जागेवरील दूषित रक्त शोषून घेणे.
  - **रक्तशोधक औषधी**: मंजिष्ठा, खदिर, निंब, गुळवेल.
• **पथ्य**: दही, आंबट फळे, लोणचे, मासे आणि दुधाचे मिश्रण पूर्ण टाळा; कडू कारले व मुगाची डाळ खा.`,
    hi: `### 🌺 सोरायसिस, एक्जिमा व एलर्जी (रक्त शुद्धि)

• **पंचकर्म उपचार**: विरेचन (लिवर डिटॉक्स) और जलोकावचारण (लीच थेरेपी) से त्वचा के विकार जड़ से ठीक होते हैं।
• **परहेज**: दही, खट्टी चीजें, अचार, मछली व दूध का साथ में सेवन बंद करें। गिलोय, नीम व मंजीष्ठा लें।`,
    en: `### 🌺 Psoriasis, Eczema & Skin Healing (Kushtha)

• **Root Cause**: Toxins (*Ama*) lodged in blood tissue (*Rakta Dhatu*) and lymph (*Lasika*).
• **Panchakarma Therapies**:
  - **Virechana**: Liver purgation to clear chronic inflammatory Pitta heat.
  - **Leech Therapy (Jalauka)**: Drains localized venous stasis and toxic congestion.
• **Dietary Rules**: Strictly avoid curd, fermented foods, sour pickles, and milk-fish combinations.`
  },

  // 11. WOMEN'S HEALTH, PCOS & THYROID
  {
    id: 'WOMENS_HEALTH',
    title: {
      mr: 'महिलांचे आरोग्य, पीसीओडी (PCOS) व थायरॉईड',
      hi: 'महिलाओं का स्वास्थ्य, पीसीओडी व थायरॉइड',
      en: "Women's Health, PCOS & Thyroid (Artava Dushti)"
    },
    keywords: [
      'pcos', 'pcod', 'period', 'periods', 'menstrual', 'hormone', 'hormonal', 'thyroid', 'infertility', 'artava',
      'मासिक पाळी', 'पाळी', 'पीसीओडी', 'थायरॉईड', 'अनियमित पाळी', 'स्त्रीरोग'
    ],
    mr: `### 🌸 महिलांचे आरोग्य, पीसीओडी व थायरॉईड

• **आयुर्वेदिक कारण**: कफ आणि वातामुळे गर्भाशयाच्या नलिकांमध्ये (आर्तववह स्रोतस) अडथळा निर्माण होतो.
• **उपचार**:
  - **कांचनार गुग्गुळ व वरुणादी काढा**: गर्भाशयातील सिस्ट विरघळवून चयापचय सुधारणे.
  - **उत्तरबस्ती (Uttara Basti)**: गर्भाशयाचे पोषण करून ओव्हुलेशन नियमित करणे.
  - **रसायन औषधी**: शतावरी, अशोकारिष्ट, लोध्रासव.
• **पथ्य**: मैदा, साखर व बेकरी अन्न टाळा; दररोज ३० मिनिटे जलद चाला व फुलपाखरू आसन (Butterfly pose) करा.`,
    hi: `### 🌸 पीसीओडी (PCOD) एवं हार्मोनल असंतुलन

• **आयुर्वेदिक समाधान**: कांचनार गुग्गुलु और वरुणादि क्वाथ से सिस्ट पिघलती है और पीरियड नियमित होते हैं।
• **परहेज व योग**: शक्कर, मैदा व फास्ट फूड छोड़ें; रोजाना बद्ध कोणासन (तितली आसन) और 30 मिनट वॉक करें।`,
    en: `### 🌸 PCOS, Thyroid & Hormonal Balance (Artava Dushti)

• **Ayurvedic Approach**: Clears metabolic Kapha-Vata blockage in ovarian channels.
• **Therapies & Formulations**: *Kanchanar Guggulu*, *Varunadi Kwath*, *Uttara Basti*, *Shatavari*.
• **Lifestyle Advice**: Eliminate refined sugar and bakery flour; practice daily brisk walking and Butterfly pose.`
  },

  // 12. WEIGHT MANAGEMENT & FATTY LIVER
  {
    id: 'WEIGHT_METABOLISM',
    title: {
      mr: 'वजन कमी करणे व फॅटी लिव्हर (मेदोविकार)',
      hi: 'वजन घटाना व फैटी लिवर (मेदोविकार)',
      en: 'Weight Loss, Belly Fat & Fatty Liver (Medoroga)'
    },
    keywords: [
      'weight', 'fat', 'obesity', 'belly', 'slimming', 'lose weight', 'cholesterol', 'fatty liver', 'sthaulya', 'medoroga',
      'वजन', 'चरबी', 'लठ्ठपणा', 'पोट कमी करणे', 'फॅटी लिव्हर', 'कोलेस्टेरॉल'
    ],
    mr: `### ⚖️ वजन कमी करणे व फॅटी लिव्हर निवारण

• **आयुर्वेदिक कारण**: मंद पचनामुळे शरीरात कच्ची चरबी (मेद धातू) साचते आणि यकृतामध्ये फॅट्स जमा होतात.
• **उपचार**:
  - **उद्वर्तन (Udwarthana)**: औषधी पावडरने (त्रिफळा, मुस्ता) शरीराला कोरडा मसाज करून चरबी वितळवणे.
  - **आरोग्यवर्धिनी वटी व पुनर्नवासव**: फॅटी लिव्हर दुरुस्त करून चयापचय (Metabolism) वाढवणे.
• **दैनिक नियम**:
  - दिवसा झोपणे (*दिवा स्वप्न*) पूर्ण बंद करा; संध्याकाळी ७:३० पूर्वी हलके जेवण करा.
  - दिवसभरात गरम पाण्यात सुंठ व जिरे टाकून पाणी प्या.`,
    hi: `### ⚖️ वजन घटाना एवं फैटी लिवर का उपचार

• **उद्वर्तन (Udwarthana)**: औषधीय चूर्ण से मालिश कर अतिरिक्त चर्बी को पिघलाना।
• **दवाएं**: आरोग्यवर्धिनी वटी, मेदोहर गुग्गुलु लिवर को डिटॉक्स करती हैं।
• **नियम**: दिन में सोना बंद करें; रात का खाना 7:30 बजे तक हल्का लें और गुनगुना पानी पिएं।`,
    en: `### ⚖️ Weight Management & Fatty Liver (Medoroga)

• **Ayurvedic Mechanism**: Ignites fat metabolism (*Medo-Dhatvagni*) without crash starvation.
• **Key Protocols**:
  - **Udwarthana**: Upward deep dry herbal powder scrub (*Triphala, Musta*) to mobilize subcutaneous fat.
  - **Liver Detox**: *Arogyavardhini Vati*, *Bhumiamalaki* to reverse hepatic steatosis.
• **Rules**: Strictly avoid daytime sleep; finish a light dinner before 7:30 PM; sip warm ginger water.`
  },

  // 13. 100% CASHLESS MEDICLAIM
  {
    id: 'CASHLESS_INSURANCE',
    title: {
      mr: '१००% कॅशलेस मेडिक्लेम विमा (NABH IPD)',
      hi: '100% कैशलेस मेडिक्लेम बीमा (NABH IPD)',
      en: '100% Cashless Mediclaim Insurance (NABH IPD)'
    },
    keywords: [
      'insurance', 'mediclaim', 'cashless', 'nabh', 'tpa', 'star health', 'hdfc ergo', 'icici', 'care', 'claim',
      'विमा', 'इन्शुरन्स', 'कॅशलेस', 'मेडिक्लेम', 'स्टार हेल्थ', 'पॉलिसी'
    ],
    mr: `### 🏥 आयुतत्व हॉस्पिटलमध्ये १००% कॅशलेस मेडिक्लेम विमा सुविधा

• **NABH मानांकित रुग्णालय**: IRDAI नियमांनुसार आयुर्वेदिक भरती उपचारांसाठी १००% कॅशलेस मंजुरी.
• **उपचार**: मणके, स्लिप डिस्क, सायटिका (कटी बस्ती), गुडघेदुखी (जानू बस्ती), पॅरालिसिस आणि पंचकर्म आयपीडी.
• **मान्य कंपन्या**: Star Health, HDFC ERGO, ICICI Lombard, Care Health, Niva Bupa आणि सर्व TPAs (Medi Assist, Vidal, FHPL इ.).
• **कागदपत्रे**: विमा पॉलिसी कार्ड, आधार कार्ड आणि जुने रिपोर्ट घेऊन हॉस्पिटल हेल्पडेस्कवर संपर्क साधा.`,
    hi: `### 🏥 100% कैशलेस मेडिक्लेम बीमा (NABH मान्यता प्राप्त)

• **कैशलेस सुविधा**: IRDAI नियमानुसार स्टार हेल्थ, HDFC Ergo, ICICI Lombard, Care आदि सभी बीमा कंपनियों से कैशलेस भर्ती।
• **उपचार**: स्लिप डिस्क, साइटिका, घुटनों का दर्द और पंचकर्म डिटॉक्स।
• **दस्तावेज**: आधार कार्ड व इंश्योरेंस पॉलिसी कार्ड लेकर हॉस्पिटल हेल्पडेस्क पर आएं।`,
    en: `### 🏥 100% Cashless Mediclaim Insurance (NABH IPD)

• **NABH Accredited**: Inpatient Ayurvedic admissions covered under IRDAI AYUSH cashless guidelines.
• **Eligible Treatments**: Spine & slip disc (*Kati Basti*), knee osteoarthritis, paralysis rehabilitation, Panchakarma IPD.
• **Accepted Insurers**: Star Health, HDFC ERGO, ICICI Lombard, Care Health, Niva Bupa & leading TPAs.
• **Requirement**: Bring your policy card and Aadhaar card to our hospital insurance desk.`
  },

  // 14. DOCTOR DETAILS & TIMINGS
  {
    id: 'APPOINTMENTS_CLINIC',
    title: {
      mr: 'डॉ. मनिष येरपुडे - भेटण्याची वेळ व पत्ता',
      hi: 'डॉ. मनीष येरपुडे - मिलने का समय व पता',
      en: 'Dr. Manish Yerpude Consultation & Timings'
    },
    keywords: [
      'doctor', 'manish', 'yerpude', 'timing', 'hours', 'appointment', 'address', 'location', 'where', 'bhandara',
      'डॉक्टर', 'पत्ता', 'वेळ', 'भंडारा', 'क्लिनिक', 'भेटायची वेळ', 'अपॉइंटमेंट'
    ],
    mr: `### 👨‍⚕️ डॉ. मनिष संतोष येरपुडे - क्लिनिक माहिती

• **वैद्यकीय संचालक**: **डॉ. मनिष संतोष येरपुडे** [B.A.M.S., MD (AM), P.G.P.P. पुणे]
• **तज्ज्ञ**: नाडी परीक्षा, मणके व सायटिका विना-ऑपरेशन उपचार, गुडघेदुखी, व पंचकर्म.
• **पत्ता**: पहिला माळा, बावणकर भवन, खात रोड, गणेश मार्बल जवळ, शिव नगरी, भंडारा, महाराष्ट्र ४४१९०४.
• **ओपीडी वेळ**: सकाळी १०:०० ते दुपारी २:०० आणि संध्याकाळी ५:०० ते रात्री ८:०० (सोमवार ते रविवार).
• **फोन**: +91 77588 16074`,
    hi: `### 👨‍⚕️ डॉ. मनीष संतोष येरपुडे - परामर्श समय एवं पता

• **चिकित्सक**: डॉ. मनीष संतोष येरपुडे [B.A.M.S., MD (AM), P.G.P.P.]
• **हॉस्पिटल**: आयुतत्व आयुर्वेदिक हॉस्पिटल एवं पंचकर्म केंद्र (NABH मान्यता प्राप्त)
• **पता**: प्रथम तल, बावंकर भवन, खात रोड, गणेश मार्बल के पास, शिव नगरी, भंडारा, महाराष्ट्र 441904.
• **ओपीडी समय**: प्रातः 10:00 से 2:00 एवं सायं 5:00 से 8:00 बजे (प्रतिदिन)।`,
    en: `### 👨‍⚕️ Dr. Manish Santosh Yerpude — Clinic Details

• **Doctor**: Dr. Manish Santosh Yerpude [B.A.M.S. (MUHS), MD (AM), P.G.P.P. Pune]
• **Hospital**: AayuTatva Ayurvedic Hospital & Panchakarma Centre (NABH Accredited)
• **Address**: 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904.
• **OPD Hours**: 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM (Daily).`
  }
];

function matchesKeyword(query: string, keyword: string): boolean {
  if (keyword.length <= 4) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    return regex.test(query);
  }
  return query.includes(keyword.toLowerCase());
}

export function generateInternalAyurvedicResponse(
  userMessage: string,
  _history: ChatMessage[] = [],
  _userDoshaProfile?: DoshaProfile | null,
  language: SupportedLanguage = 'mr'
): InternalAIResponse {
  const query = (userMessage || '').toLowerCase().trim();
  const selectedLang: SupportedLanguage = ['mr', 'hi', 'en'].includes(language) ? language : 'mr';

  // 1. Find matching topic
  let matchedTopic: TopicDefinition | null = null;
  for (const topic of TOPICS) {
    if (topic.keywords.some(kw => matchesKeyword(query, kw))) {
      matchedTopic = topic;
      break;
    }
  }

  // 2. Generate crisp response
  let detailedBody = '';
  let intent = 'GENERAL_GUIDANCE';
  let topicTitle = selectedLang === 'mr' ? 'आयुर्वेदिक मार्गदर्शन' : selectedLang === 'hi' ? 'आयुर्वेदिक परामर्श' : 'Ayurvedic Guidance';

  if (matchedTopic) {
    detailedBody = matchedTopic[selectedLang] || matchedTopic.mr;
    intent = matchedTopic.id;
    topicTitle = matchedTopic.title[selectedLang] || matchedTopic.title.mr;
  } else {
    // Crisp default response
    if (selectedLang === 'mr') {
      detailedBody = `### 🌿 आयुर्वेदिक दृष्टीकोन

• **त्रिदोष समतोल**: आयुर्वेदानुसार आरोग्य हे वात, पित्त आणि कफ यांच्या समतोलावर आणि मजबूत पचन अग्नीवर अवलंबून असते.
• **नाडी परीक्षा सल्ला**: अचूक औषधोपचार व पंचकर्मासाठी प्रत्यक्ष **नाडी परीक्षा (Pulse Diagnosis)** करून घेणे सर्वोत्तम ठरते.
• **थेट सल्ला**: डॉ. मनिष संतोष येरपुडे यांच्याशी संपर्क साधा किंवा खाली दिलेल्या बटनांवरून चर्चा करा.`;
    } else if (selectedLang === 'hi') {
      detailedBody = `### 🌿 आयुर्वेदिक दृष्टिकोण

• **त्रिदोष संतुलन**: स्वास्थ्य वात, पित्त, कफ के संतुलन और पाचन अग्नि पर निर्भर है।
• **नाड़ी परीक्षा परामर्श**: सही औषधि व पंचकर्म के लिए अस्पताल में प्रत्यक्ष **नाड़ी परीक्षा** कराना सर्वोत्तम है।`;
    } else {
      detailedBody = `### 🌿 Ayurvedic Perspective

• **Tridosha Harmony**: Health is rooted in balancing Vata, Pitta, and Kapha along with robust digestive fire (*Agni*).
• **Pulse Examination**: For individualized herbal therapies and Panchakarma, in-person radial pulse diagnosis (*Nadi Parikshan*) is recommended.`;
    }
  }

  const encodedQuery = encodeURIComponent(
    `Hello Dr. Manish Yerpude, I was inquiring on the website regarding: "${userMessage.slice(0, 70)}". Please guide me at AayuTatva Hospital in Bhandara.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedQuery}`;
  const phoneDialUrl = `tel:${PRIMARY_PHONE}`;

  // Crisp, clean footer (2 lines only, no massive walls of text)
  let footer = '';
  if (selectedLang === 'mr') {
    footer = `---
📍 **आयुतत्व हॉस्पिटल, भंडारा** | 📞 [**कॉल करा: +91 77588 16074**](${phoneDialUrl}) | 💬 [**व्हॉट्सॲपवर चॅट करा**](${whatsappUrl})`;
  } else if (selectedLang === 'hi') {
    footer = `---
📍 **आयुतत्व हॉस्पिटल, भंडारा** | 📞 [**कॉल करें: +91 77588 16074**](${phoneDialUrl}) | 💬 [**व्हाट्सएप पर चैट करें**](${whatsappUrl})`;
  } else {
    footer = `---
📍 **AayuTatva Hospital, Bhandara** | 📞 [**Call: +91 77588 16074**](${phoneDialUrl}) | 💬 [**Chat on WhatsApp**](${whatsappUrl})`;
  }

  const completeReply = `${detailedBody}\n\n${footer}`;

  return {
    reply: completeReply,
    source: 'aayutatva-internal-engine',
    intent,
    topicTitle,
    language: selectedLang,
    phone: PRIMARY_PHONE,
    whatsappUrl
  };
}
