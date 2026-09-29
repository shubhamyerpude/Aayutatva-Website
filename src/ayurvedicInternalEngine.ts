/**
 * AayuTatva In-House Ayurvedic Intelligence Engine (AayuVaidya AI)
 * 
 * Completely self-contained, high-performance in-house knowledge model.
 * Zero external API dependencies (no Gemini, OpenAI, or third-party APIs needed).
 * 
 * Supports Multi-Language Consultation:
 * - Marathi (मराठी) - Default for Maharashtra & Bhandara
 * - Hindi (हिंदी)
 * - English
 * 
 * Grounded in classical Ayurvedic Brihat-Trayi & Laghu-Trayi:
 * - Charaka Samhita (Agnivesha / Charaka)
 * - Sushruta Samhita (Sushruta - Shalya & Sharira)
 * - Ashtanga Hridaya & Sangraha (Vagbhata)
 * - Kanada Nadi Vijnana & Sharangadhara Samhita (Pulse Diagnosis)
 * - Bhavaprakasha Nighantu & Dravyaguna (Herbal pharmacology)
 * 
 * Authored for AayuTatva Ayurvedic Hospital & Panchakarma Centre, Bhandara.
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

interface AyurvedicTopic {
  id: string;
  title: Record<SupportedLanguage, string>;
  sutra?: string;
  keywords: string[];
  generateResponse: (
    query: string, 
    dosha: DoshaProfile | null | undefined, 
    history: ChatMessage[] | undefined,
    lang: SupportedLanguage
  ) => string;
}

const TOPICS: AyurvedicTopic[] = [
  // 1. GREETING & INTRO
  {
    id: 'GREETING',
    title: {
      mr: 'आयुवैद्य एआय मध्ये आपले स्वागत आहे',
      hi: 'आयुवैद्य एआई में आपका स्वागत है',
      en: 'Welcome to AayuVaidya In-House Intelligence'
    },
    keywords: [
      'hello', 'hi', 'namaste', 'namaskar', 'pranam', 'hey', 'start', 'kasa ahes', 'kya haal',
      'नमस्कार', 'नमस्ते', 'प्रणाम', 'कसे आहात', 'सुरु करा', 'मदत'
    ],
    generateResponse: (_q, dosha, _h, lang) => {
      if (lang === 'mr') {
        const doshaNote = dosha?.dominant 
          ? `\n> 🧘 *आपली नोंदणीकृत प्रकृती: **${dosha.dominant}** (${dosha.pulseGati || 'शास्त्रीय नाडी गती'}).*` 
          : '';

        return `### नमस्कार 🙏 आयुवैद्य एआय मध्ये आपले स्वागत आहे
मी **आयुतत्व आयुर्वेदिक हॉस्पिटल व पंचकर्म केंद्र**, भंडारा चा इन-हाउस आयुर्वेदिक ज्ञान सहाय्यक आहे.${doshaNote}

मी **चरक संहिता**, **सुश्रुत संहिता** आणि **काणाद नाडी विज्ञानावर** आधारित खालील विषयांवर मार्गदर्शन करू शकतो:
• 🩺 **नाडी परीक्षा (Nadi Parikshan)**: मनगटावरील ३ बोटांच्या नाडीवरून शरीरातील सूक्ष्म दोष कसे ओळखले जातात.
• 🦴 **मणके व सांधेदुखी**: स्लिप डिस्क, कंबरदुखी, सायटिका (*गृध्रसी*) व संधिवातावर विना-ऑपरेशन उपचार.
• 🌿 **त्रिदोष व पथ्यकर आहार**: आपल्या वात, पित्त किंवा कफ प्रकृतीनुसार काय खावे आणि काय टाळावे.
• 🌸 **५ शास्त्रीय पंचकर्म**: वमन, विरेचन, कटी बस्ती, नस्य, जळू चिकित्सा (रक्तमोक्षण) व शिरोधारा.
• 📏 **मुलांची उंची वाढ व सुवर्णप्राशन**: अस्थी धातू पोषण, हाडांची वाढ व रोगप्रतिकारशक्ती.
• 🏥 **१००% कॅशलेस मेडिक्लेम विमा**: NABH मान्यताप्राप्त हॉस्पिटलमध्ये मोफत कॅशलेस उपचार प्रक्रिया.

*आज मी आपल्या आरोग्यासाठी कशी मदत करू शकतो? खाली दिलेल्या विषयांवर टॅप करा किंवा आपला प्रश्न लिहा.*`;
      }

      if (lang === 'hi') {
        const doshaNote = dosha?.dominant 
          ? `\n> 🧘 *आपकी पंजीकृत प्रकृति: **${dosha.dominant}** (${dosha.pulseGati || 'शास्त्रीय नाड़ी गति'}).*` 
          : '';

        return `### नमस्ते 🙏 आयुवैद्य एआई में आपका स्वागत है
मैं **आयुतत्व आयुर्वेदिक हॉस्पिटल एवं पंचकर्म केंद्र**, भंडारा का इन-हाउस आयुर्वेदिक ज्ञान सहायक हूँ।${doshaNote}

मैं **चरक संहिता**, **सुश्रुत संहिता** और **काणाद नाड़ी विज्ञान** पर आधारित निम्नलिखित विषयों पर मार्गदर्शन कर सकता हूँ:
• 🩺 **नाड़ी परीक्षा**: कलाई की 3 उंगलियों से वात, पित्त, कफ के असंतुलन की सटीक पहचान।
• 🦴 **रीढ़ व जोड़ों का दर्द**: स्लिप डिस्क, साइटिका (*गृध्रसी*), कमर दर्द और गठिया का बिना ऑपरेशन उपचार।
• 🌿 **त्रिदोष एवं आहार नियम**: अपनी प्रकृति अनुसार क्या खाएं और क्या परहेज करें।
• 🌸 **5 शास्त्रीय पंचकर्म**: वमन, विरेचन, बस्ती, नस्य, रक्तमोक्षण और शिरोधारा।
• 📏 **बच्चों की हाइट ग्रोथ एवं सुवर्णप्राशन**: हड्डियों का पोषण और प्राकृतिक लंबाई बढ़ाने के उपाय।
• 🏥 **100% कैशलेस मेडिक्लेम बीमा**: NABH मान्यता प्राप्त अस्पताल में कैशलेस भर्ती की जानकारी।

*कृपया अपना प्रश्न पूछें या नीचे दिए गए विषयों पर क्लिक करें।*`;
      }

      const doshaNote = dosha?.dominant 
        ? `\n> 🧘 *Your assessed constitution: **${dosha.dominant}** (${dosha.pulseGati || 'Classical Rhythm'}).*` 
        : '';

      return `### Namaste 🙏 Welcome to AayuVaidya AI
I am the in-house Ayurvedic Clinical Knowledge Engine for **AayuTatva Ayurvedic Hospital & Panchakarma Centre**, Bhandara.${doshaNote}

I guide you with classical principles from **Charaka Samhita**, **Sushruta Samhita**, and **Kanada Nadi Vijnana**:
• 🩺 **Nadi Parikshan**: How 8-fold radial pulse diagnosis detects subtle metabolic imbalances.
• 🦴 **Spine & Joint Health**: Non-surgical protocols for slip disc, sciatica (*Gridhrasi*), and arthritis (*Sandhigata Vata*).
• 🌿 **Tridosha & Ahara**: Custom food and lifestyle rules for your Vata, Pitta, or Kapha constitution.
• 🌸 **Panchakarma Detox**: Classical 5 purifications (Basti, Virechana, Vamana, Nasya, Raktamokshana).
• 📏 **Pediatric Growth & Height**: Asthi Dhatu nourishment and epiphyseal growth plate guidance.
• 🏥 **100% Cashless Insurance**: NABH hospital admissions and cashless Mediclaim assistance.

*How may I assist your health and wellness journey today?*`;
    }
  },

  // 2. SPINE, SCIATICA & DISC BULGE
  {
    id: 'SPINE_SCIATICA',
    title: {
      mr: 'मणक्याचे आजार, स्लिप डिस्क व सायटिका (गृध्रसी)',
      hi: 'रीढ़ की हड्डी, स्लिप डिस्क व साइटिका (गृध्रसी)',
      en: 'Spine, Sciatica & Slip Disc (Gridhrasi & Kati Shoola)'
    },
    sutra: 'स्नेहस्वेदाभ्यामन्त्रदोषहरणाच्च वातव्याधिः प्रशाम्यति॥ (Charaka Samhita, Chi. 28)',
    keywords: [
      'sciatica', 'gridhrasi', 'back pain', 'spine', 'spinal', 'disc', 'slip disc', 'lumbar', 'l4', 'l5', 's1', 
      'cervical', 'spondylosis', 'kati basti', 'neck pain', 'lower back', 'pith', 'kambar', 'radiculopathy', 
      'pinched nerve', 'manas', 'greeva', 'कंबर', 'कंबरदुखी', 'मणका', 'मणके', 'सायटिका', 'पाठदुखी', 'मानदुखी', 
      'नस दबणे', 'पाठीचा कणा', 'गृध्रसी', 'स्लिप डिस्क', 'सर्वायकल', 'कमर दर्द', 'रीढ़', 'साइटिका'
    ],
    generateResponse: (q, _d, _h, lang) => {
      const isCervical = q.includes('cervical') || q.includes('neck') || q.includes('greeva') || q.includes('मान');

      if (lang === 'mr') {
        const conditionName = isCervical ? 'मानेचे मणके व स्पाँडिलायसिस (ग्रीवा शूल)' : 'कंबरदुखी, स्लिप डिस्क आणि सायटिका (गृध्रसी)';
        const bastiName = isCervical ? 'ग्रीवा बस्ती (Greeva Basti)' : 'कटी बस्ती (Kati Basti)';

        return `### 🦴 ${conditionName} - विना-शस्त्रक्रिया आयुर्वेदिक उपचार

> *स्नेहस्वेदाभ्यामन्त्रदोषहरणाच्च वातव्याधिः प्रशाम्यति॥*  
> *(चरक संहिता: शरीरातील वात दोष वाढल्याने निर्माण झालेले मणक्यांचे आजार हे औषधी स्नेहन, स्वेदन आणि बस्ती चिकित्सेने पूर्ण बरे होतात.)*

आयुर्वेदामध्ये मणक्यातील गादी सरकणे (Disc Bulge), पायात किंवा हातात मुंग्या येणे आणि कळा मारणे याला **गृध्रसी (Sciatica)** किंवा **संधिगत वात** म्हटले जाते. जेव्हा रुक्ष आणि थंड वात मणक्यांमध्ये वाढतो, तेव्हा मणक्यांमधील गादी (Disc) सुकते व मज्जारज्जूवर (Nerve) दाब येतो.

#### आयुतत्व हॉस्पिटलमधील विना-ऑपरेशन शास्त्रीय उपचार:
1. **${bastiName}**: उडदाच्या पिठाचे आळे मणक्यावर सील करून त्यात कोमट औषधी सिद्ध तेल (*सहचरादी तैल, महानारायण तैल, क्षीरबला १०१*) ३५ ते ४५ मिनिटे साठवून ठेवले जाते. यामुळे मणक्यातील सुकलेली गादी पुन्हा हायड्रेट होते व दाबली गेलेली नस मोकळी होते.
2. **पत्रपिंड स्वेद (Patra Pinda Sweda)**: निर्गुंडी, एरंड, रुईची औषधी पाने तेलात परतून तयार केलेल्या पुरचुंडीने शेक दिला जातो, ज्यामुळे मणक्यांमधील ताठरता व वेदना त्वरित कमी होतात.
3. **तिक्त क्षीर बस्ती (Tikta Ksheera Basti - मूळ कारण मुळापासून नष्ट करणे)**: हाडांचे (अस्थी धातूचे) मूळ मोठे आतडे असल्यामुळे, औषधी दुधाचा बस्ती देऊन मणक्यांना थेट कॅल्शियम व पोषण पोहोचवले जाते.
4. **शास्त्रीय औषधी**: योगराज गुग्गुळ, त्रयोदशांग गुग्गुळ, निर्गुंडी काढा, रास्ना सप्तक काढा (तज्ज्ञ डॉक्टरांच्या सल्ल्यानुसार).

#### रुग्णांसाठी महत्त्वाचे घरगुती नियम:
• **काय टाळावे**: वाकून जड वजन उचलणे, खूप मऊ गादीवर झोपणे, थेट एसीच्या गार वाऱ्यात झोपणे आणि शिळे-कोरडे अन्न खाणे.  
• **काय करावे**: तिळाच्या कोमट तेलाने हलक्या हाताने मसाज करा, कडक वा मध्यम गादीवर झोपा, आणि सुंठ घातलेले कोमट पाणी प्या.`;
      }

      if (lang === 'hi') {
        return `### 🦴 स्लिप डिस्क एवं साइटिका (गृध्रसी) - बिना ऑपरेशन आयुर्वेदिक उपचार

आयुर्वेद में रीढ़ की हड्डी में नस दबने और पैर में होने वाले तेज दर्द को **गृध्रसी (Sciatica)** कहा जाता है।

#### आयुतत्व हॉस्पिटल के प्रमुख पंचकर्म उपचार:
1. **कटी बस्ती (Kati Basti)**: रीढ़ के प्रभावित हिस्से पर उड़द के आटे का घेरा बनाकर उसमें गुनगुना औषधीय तेल (*सहचरादि, महानारायण*) 40 मिनट तक रखा जाता है, जिससे दबी हुई नस खुलती है।
2. **पत्र पिंड स्वेद**: औषधीय पत्तियों की पोटली से सिकाई कर मांसपेशियों की अकड़न दूर की जाती है।
3. **तिक्त क्षीर बस्ती**: औषधीय दूध का एनिमा देकर हड्डियों और रीढ़ की मज्जा को भीतर से पोषण दिया जाता है।

• **परहेज**: आगे झुककर भारी वजन न उठाएं, अधिक ठंडी चीजों से बचें और रात को गुनगुने दूध में 1 चम्मच गाय का घी लें।`;
      }

      return `### 🦴 Classical Non-Surgical Protocol for Sciatica & Lumbar Disc Herniation (Gridhrasi & Kati Shoola)

> *स्नेहस्वेदाभ्यामन्त्रदोषहरणाच्च वातव्याधिः प्रशाम्यति॥*  
> *(Charaka Samhita: Musculoskeletal disorders rooted in aggravated Vata resolve through deep therapeutic oleation, fomentation, and localized neuro-nourishment.)*

In classical Ayurveda, spinal nerve compression, lumbar disc bulge, and radiating pain down the leg are classified as **Gridhrasi** (Sciatica) or **Sandhigata Vata** (Degenerative Disc Disease). When dry, cold Vata (*Ruksha-Sheeta Guna*) aggravates in the spinal column, intervertebral discs dehydrate and compress the sciatic nerve.

#### Non-Surgical Clinical Protocols at AayuTatva Hospital:
1. **Kati Basti (lumbar spinal reservoir)**: A leak-proof reservoir of black gram dough is sealed over the affected vertebrae. Medicated warm herbal oils (*Sahacharadi Taila, Mahanarayana Taila, Ksheerabala 101*) are retained for 35–45 minutes, deeply hydrating disc cartilage and relieving radicular nerve irritation.
2. **Patra Pinda Sweda (Elakizhi)**: Fresh medicinal leaves (Nirgundi, Eranda, Arka) sautéed in herbal oils and steamed into cotton poultices to instantly relieve muscular spasm and spinal stiffness.
3. **Tikta Ksheera Basti (Primary Root Cure)**: Because bone tissue (*Asthi Dhatu*) is fed through the large intestine (the chief seat of Vata), medicated milk and herbal decoction enemas transport calcium and nourishing herbs directly into deeper connective tissues without oral digestive loss.
4. **Classical Internal Formulations**: *Yograj Guggulu*, *Trayodashanga Guggulu*, *Nirgundi Kwath*, and *Shallaki* promote natural anti-inflammatory tissue repair.

#### Essential Home Guidelines:
• **Strictly Avoid**: Forward bending with heavy weights, sleeping on an excessively soft sagging mattress, direct exposure to cold AC drafts, and dry cold foods.  
• **Recommended**: Warm sesame oil gentle application down the legs, sleeping on an orthopedic medium-firm mattress, and drinking warm water with a pinch of dry ginger (*Sunthi*).`;
    }
  },

  // 3. JOINTS, KNEE PAIN & ARTHRITIS
  {
    id: 'JOINTS_ARTHRITIS',
    title: {
      mr: 'गुडघेदुखी, सांधेदुखी व संधिवात (संधिगत वात आणि आमवात)',
      hi: 'घुटनों का दर्द, जोड़ों का दर्द व गठिया (संधिगत वात व आमवात)',
      en: 'Knee Pain, Osteoarthritis & Joint Health (Sandhigata Vata & Amavata)'
    },
    sutra: 'सन्धिवाते तु सस्नेहं स्वेदनं बस्तिरेव च॥ (Chakradatta)',
    keywords: [
      'joint', 'knee', 'janu basti', 'arthritis', 'osteoarthritis', 'amavata', 'sandhigata', 'swelling', 'sandhe', 
      'gout', 'vatarakta', 'rheumatoid', 'crepitus', 'cartilage', 'gel', 'knee replacement', 'ghutna', 'sandhe vata',
      'गुडघे', 'गुडघेदुखी', 'सांधे', 'सांधेदुखी', 'संधिवात', 'आमवात', 'वात', 'गुडघ्यात वंगण', 'गुडघा बदलणे',
      'घुटने का दर्द', 'जोड़ों का दर्द', 'गठिया', 'सूजन'
    ],
    generateResponse: (q, _d, _h, lang) => {
      const isAmavata = q.includes('rheumatoid') || q.includes('amavata') || q.includes('आमवात');

      if (lang === 'mr') {
        if (isAmavata) {
          return `### 🌿 आमवात (Rheumatoid Arthritis) व सांध्यांची सूज - आयुर्वेदिक दृष्टीकोन

आयुर्वेदानुसार जेव्हा मंद पचनामुळे शरीरात कच्चा विषारी रस (**आम**) तयार होतो, आणि तो सांध्यांमध्ये जाऊन बसतो, तेव्हा सांध्यांमध्ये तीव्र वेदना, सूज व सकाळी उठल्यावर सांधे जखडणे या तक्रारी सुरू होतात.

#### आयुतत्व हॉस्पिटलमधील उपचार:
• **दीपन-पाचन**: सुंठ, ओवा, पिंपळीच्या काढ्याने शरीरातील आमदोष पचवणे.  
• **वालुका स्वेद (Valuka Sweda)**: गरम वाळूच्या पुरचुंडीने कोरडा शेक देणे, ज्यामुळे सांध्यांमधील सूज ओसरते.  
• **वैतरण बस्ती**: गूळ, सैंधव, चिंच आणि गोमूत्राचा औषधी बस्ती, जो सांध्यांमधील अडथळे दूर करतो.`;
        }

        return `### 🦵 गुडघेदुखी व ऑस्टिओआर्थरायटिस (संधिगत वात) - विना-ऑपरेशन उपचार

> *सन्धिवाते तु सस्नेहं स्वेदनं बस्तिरेव च॥*  
> *(चक्रदत्त: संधिवातामध्ये औषधी तेल साठवणे, शेक देणे आणि बस्ती उपचार हे सांधे पूर्ववत करण्याचे सर्वोत्तम मार्ग आहेत.)*

गुडघ्यांमधील नैसर्गिक वंगण (**श्लेषक कफ**) व कार्टिलेज झिजल्यामुळे हाडे एकमेकांवर घासतात, कट-कट आवाज येतो आणि चालताना त्रास होतो.

#### गुडघे प्रत्यारोपण (Knee Replacement) टाळण्यासाठी आयुतत्व पंचकर्म:
1. **जानू बस्ती (Janu Basti)**: गुडघ्यांवर औषधी तेलाचे आळे बांधून सांध्यांमध्ये तेल जिरवणे, ज्यामुळे झिजलेले वंगण पुन्हा तयार होण्यास मदत होते.
2. **षष्टिक शाली पिंड स्वेद (Navarakizhi)**: औषधी दुधात शिजवलेल्या तांदळाच्या पुरचुंडीने गुडघ्यांचे लिगामेंट्स व स्नायू बळकट करणे.
3. **दशांग लेप**: सूज व जळजळ कमी करण्यासाठी नैसर्गिक औषधी लेप लावणे.

• **घरगुती सल्ला**: रोज रात्री १ चमचा शुद्ध गाईचे तूप कोमट दुधात घ्यावे, खाली मांडी घालून बसणे टाळावे, आणि कोमट पाण्याने आंघोळ करावी.`;
      }

      if (lang === 'hi') {
        return `### 🦵 घुटनों का दर्द एवं गठिया (संधिगत वात) - बिना सर्जरी उपचार

घुटनों का कार्टिलेज और साइनोवियल फ्लुइड (चिकनाई) कम होने पर आयुर्वेद में **जानू बस्ती** और **षष्टिक शाली स्वेद** से प्राकृतिक रूप से घुटनों को पोषण दिया जाता है।

• **जानू बस्ती (Janu Basti)**: घुटनों पर औषधीय तेल का ठहराव कर ग्रीस को पुनर्जीवित किया जाता है।  
• **परहेज**: जमीन पर पालथी मारकर न बैठें, खट्टी व बासी चीजें न खाएं, और वजन नियंत्रित रखें।`;
      }

      return `### 🦵 Non-Surgical Knee Care & Osteoarthritis (*Sandhigata Vata*)

> *सन्धिवाते तु सस्नेहं स्वेदनं बस्तिरेव च॥*  
> *(Chakradatta: Sandhigata Vata responds to deep herbal lubrication, sudation, and colon-targeted bio-nourishment.)*

Osteoarthritis occurs when natural synovial fluid (*Shleshaka Kapha*) depletes, causing friction, crepitus, and stiffness.

#### Hospital Panchakarma Protocols for Knee Restoration:
1. **Janu Basti**: Medicated warm herbal pools sealed over the knee joints to regenerate synovial cushioning.
2. **Shashtika Shali Pinda Sweda (Navarakizhi)**: Steamed herbal rice poultices in medicinal milk to strengthen weakened ligaments.
3. **Lepa Therapy**: Herbal poultices to drain peri-articular edema.`;
    }
  },

  // 4. CLASSICAL NADI PARIKSHAN (PULSE DIAGNOSIS)
  {
    id: 'NADI_PARIKSHAN',
    title: {
      mr: 'शास्त्रीय नाडी परीक्षा (Radial Pulse Diagnosis)',
      hi: 'शास्त्रीय नाड़ी परीक्षा (पल्स डायग्नोसिस)',
      en: 'Classical Nadi Parikshan (Radial Pulse Diagnosis)'
    },
    sutra: 'यथा वीणागतास्तन्त्री सर्वान् रागान् प्रभाषते। तथा हस्तगता नाडी सर्वान् रोगान् प्रकाशते॥ (Kanada Nadi Vijnana)',
    keywords: [
      'nadi', 'pulse', 'parikshan', 'pulse diagnosis', 'radial pulse', 'sarpa', 'manduka', 'hamsa', 'gati', 'finger', 'wrist', 'naadi',
      'नाडी', 'नाडी परीक्षा', 'पल्स', 'मनगट', 'हात बघणे', 'दोष तपासणी', 'नाड़ी', 'नाड़ी परीक्षा'
    ],
    generateResponse: (_q, dosha, _h, lang) => {
      if (lang === 'mr') {
        let doshaDetail = '';
        if (dosha?.dominant) {
          doshaDetail = `\n\n📌 **आपली नोंदणीकृत प्रकृती**: **${dosha.dominant}** आणि **${dosha.pulseGati || 'शास्त्रीय नाडी'}**. प्रत्यक्ष क्लिनिकमध्ये नाडी तपासून याचे अचूक निदान केले जाते.`;
        }

        return `### 🩺 शास्त्रीय नाडी परीक्षा - मनगटावरून शरीराचे अंतरंग निदान

> *यथा वीणागतास्तन्त्री सर्वान् रागान् प्रभाषते। तथा हस्तगता नाडी सर्वान् रोगान् प्रकाशते॥*  
> *(ज्याप्रमाणे वीणेची एक तार सर्व राग प्रकट करते, त्याचप्रमाणे हाताची नाडी शरीरातील सर्व आजार व दोष प्रत्यक्ष प्रकट करते.)*

नाडी परीक्षा ही आयुर्वेदाची सर्वात प्राचीन व अचूक निदान पद्धती आहे. **आयुतत्व आयुर्वेदिक हॉस्पिटल** मध्ये **डॉ. मनिष संतोष येरपुडे** अंगठ्याच्या मुळाशी मनगटावर ३ बोटे ठेवून नाडीचे ३ प्रमुख तरंग तपासतात:

#### नाडीच्या ३ शास्त्रीय गती:
1. **तर्जनी बोट (वात दोष) — सर्प गती (सापासारखी नागमोडी चाल)**:
   - *लक्षणे*: चंचल, जलद व कोरडी गती. नसांचे आजार, कंबरदुखी, गॅस, बद्धकोष्ठता व झोप न लागणे दर्शवते.
2. **मध्यमा बोट (पित्त दोष) — मण्डूक गती (बेडकासारखी उडी मारणारी चाल)**:
   - *लक्षणे*: उष्ण, तीक्ष्ण व वेगवान गती. ऍसिडिटी, शरीरातील उष्णता, यकृत (लिव्हर) विकार व जळजळ दर्शवते.
3. **अनामिका बोट (कफ दोष) — हंस / गज गती (हंसासारखी संथ व भारदस्त चाल)**:
   - *लक्षणे*: मंद, खोल व जड गती. थायरॉईड, मंद पचनक्रिया, लठ्ठपणा, कफ व शरीरातील पाण्याचे साचणे दर्शवते.${doshaDetail}

#### भंडारा क्लिनिकमध्ये नाडी परीक्षेसाठी येण्यापूर्वी पूर्वतयारी:
• सकाळी रिकाम्या पोटी किंवा चहा-नाश्त्यानंतर २.५ ते ३ तासांनी यावे.  
• तपासणीच्या २ तास आधी चहा, कॉफी, तंबाखू व व्यायाम टाळावा.  
• क्लिनिकमध्ये पोहोचल्यावर १० मिनिटे शांत बसावे जेणेकरून हृदयाचे ठोके व रक्तदाब सामान्य होईल.`;
      }

      if (lang === 'hi') {
        return `### 🩺 शास्त्रीय नाड़ी परीक्षा (Pulse Diagnosis)

> *यथा वीणागतास्तन्त्री सर्वान् रागान् प्रभाषते। तथा हस्तगता नाडी सर्वान् रोगान् प्रकाशते॥*

**डॉ. मनीष संतोष येरपुडे** द्वारा कलाई पर 3 उंगलियों से नाड़ी के तरंगों की जांच:
1. **वात नाड़ी (सर्प गति)**: चंचल, लहरदार गति - गैस, जोड़ों का दर्द और अनिद्रा दर्शाती है।
2. **पित्त नाड़ी (मण्डूक गति)**: मेंढक की तरह उछलने वाली गति - एसिडिटी, गर्मी और लिवर की स्थिति।
3. **कफ नाड़ी (हंस गति)**: धीमी, गहरी गति - मोटापा, सुस्त पाचन और थायरॉइड।

• **तैयारी**: सुबह खाली पेट या हल्के नाश्ते के 3 घंटे बाद आएं। चाय, कॉफी न लें।`;
      }

      return `### 🩺 The Classical Science of Nadi Parikshan (Pulse Examination)

> *यथा वीणागतास्तन्त्री सर्वान् रागान् प्रभाषते। तथा हस्तगता नाडी सर्वान् रोगान् प्रकाशते॥*  
> *(Just as the strings of a Veena express every musical raga, the radial pulse reveals all internal disorders and metabolic imbalances before they manifest physically.)*

Dr. Manish Santosh Yerpude palpates the radial artery at the base of the thumb (*Angushtha Moola*) using three distinct finger placements:
1. **Index Finger (Vata)**: Sarpa Gati (snake wave rhythm).
2. **Middle Finger (Pitta)**: Manduka Gati (frog leap rhythm).
3. **Ring Finger (Kapha)**: Hamsa Gati (swan glide rhythm).`;
    }
  },

  // 5. TRIDOSHAS, PRAKRITI & DIET (AHARA)
  {
    id: 'DOSHA_DIET',
    title: {
      mr: 'त्रिदोष प्रकृती व आयुर्वेदोक्त पथ्यकर आहार (Ahara)',
      hi: 'त्रिदोष प्रकृति एवं आयुर्वेदोक्त पथ्यकर आहार',
      en: 'Tridosha Constitution & Classical Ayurvedic Diet (Ahara)'
    },
    sutra: 'आहारसम्भवं वस्तु रोगाश्चाहारसम्भवाः। (Charaka Samhita, Su. 28.45)',
    keywords: [
      'dosha', 'prakriti', 'vikriti', 'vata', 'pitta', 'kapha', 'diet', 'food', 'ahara', 'nutrition', 'eat', 'meal', 'cooking', 'recipes', 'tridosha', 'taste', 'rasa',
      'दोष', 'प्रकृती', 'वात', 'पित्त', 'कफ', 'आहार', 'जेवण', 'काय खावे', 'काय टाळावे', 'पथ्य', 'भोजन'
    ],
    generateResponse: (q, dosha, _h, lang) => {
      const activeDosha = (dosha?.dominant || (q.includes('pitta') || q.includes('पित्त') ? 'Pitta' : (q.includes('kapha') || q.includes('कफ') ? 'Kapha' : 'Vata'))).toLowerCase();

      if (lang === 'mr') {
        let doshaGuidance = '';
        if (activeDosha.includes('pitta')) {
          doshaGuidance = `#### 🌿 पित्त प्रकृतीसाठी खास आहार नियम:
• **गुणधर्म**: उष्ण, तीक्ष्ण, आम्ल व तैलकट.
• **काय खावे**: गोड, कडू व तुरट चवीचे पदार्थ. डाळिंब, काकडी, धणे-जिरे पाणी, आवळा, मुगाची डाळ, साजूक तूप, नारळ पाणी, दुधी भोपळा.
• **काय टाळावे**: हिरवी/लाल मिरची, मोहरी, लसूण, शिळे आंबट पदार्थ, लोणचे, अति तळलेले अन्न आणि मद्यपान.`;
        } else if (activeDosha.includes('kapha')) {
          doshaGuidance = `#### 🌿 कफ प्रकृतीसाठी खास आहार नियम:
• **गुणधर्म**: थंड, जड, स्निग्ध व मंद.
• **काय खावे**: तिखट, कडू व तुरट चवीचे हलके अन्न. भाजलेली ज्वारी व बाजरी, सुंठ घातलेले गरम पाणी, काळी मिरी, हिरव्या पालेभाज्या, मुगाचे कढण.
• **काय टाळावे**: रात्रीचे दही, आइस्क्रीम, गोड पक्वान्ने, बेकरी उत्पादने, अति तेलकट भाज्या आणि दिवसा झोपणे (*दिवा स्वप्न*).`;
        } else {
          doshaGuidance = `#### 🌿 वात प्रकृतीसाठी खास आहार नियम:
• **गुणधर्म**: कोरडा (रुक्ष), थंड, हलका व चंचल.
• **काय खावे**: गरम, ताजे, स्निग्ध व पोषण देणारे अन्न. १ चमचा साजूक तूप, तिळाचे तेल, मुगाची मऊ खिचडी, कोमट दूध (जायफळ टाकून), भिजवलेले बदाम, खजूर.
• **काय टाळावे**: कोरडे फरसाण, कच्चा थंड कोशिंबिरी (Raw Salads), थंड पाणी, शिळे अन्न आणि उपाशी राहणे.`;
        }

        return `### 🍲 आयुर्वेदानुसार त्रिदोष आणि पथ्यकर आहार नियम

> *आहारसम्भवं वस्तु रोगाश्चाहारसम्भवाः। हिताहितविशेषाच्च विशेषाः सुखदुःखयोः॥*  
> *(चरक संहिता: आपले शरीर अन्नातून निर्माण झाले आहे. सर्व आजार व सर्व आरोग्य आहारावर अवलंबून असते.)*

${doshaGuidance}

#### जेवणाचे ४ सुवर्ण नियम:
1. **उष्ण व ताजे अन्न खावे**: गरम अन्नामुळे पचन अग्नी प्रदीप्त होतो.
2. **पोट भरण्याचे प्रमाण**: पोटाचा १/३ भाग घन अन्नाने, १/३ भाग पाण्याने भरावा आणि १/३ भाग हवेसाठी मोकळा ठेवावा.
3. **विरुद्ध आहार टाळावा**: दुधासोबत मासे, आंबट फळे किंवा मीठ खाऊ नये. गरम मधाचे सेवन कधीही करू नये.`;
      }

      if (lang === 'hi') {
        return `### 🍲 त्रिदोष एवं आयुर्वेदिक आहार नियम

आयुर्वेद में भोजन को औषधि माना गया है:
• **वात प्रकृति**: गरम, ताजा, गाय का घी, मूंग दाल खिचड़ी, मेवे। कच्चा ठंडा सलाद और बासी खाना न खाएं।
• **पित्त प्रकृति**: ठंडा, मीठा, कड़वा रस, खीरा, अनार, नारियल पानी, धनिया-सौंफ का पानी। मिर्च-मसाले व तली चीजें छोड़ें।
• **कफ प्रकृति**: ज्वार, बाजरा, सोंठ, काली मिर्च, हल्की सब्जियां। रात को दही, मिठाई और दिन में सोना वर्जित है।`;
      }

      return `### 🍲 Classical Ayurvedic Science of Ahara (Diet as Medicine)

In classical Ayurveda, food is tailored to the 6 Rasas, Virya, and Vipaka to balance your digestive fire (*Agni*).
• **Vata**: Warm, cooked, unctuous foods with ghee. Avoid cold, dry, raw foods.
• **Pitta**: Cooling, naturally sweet and bitter foods. Avoid chilies, sour, deep-fried items.
• **Kapha**: Light, warm, spicy, and bitter foods. Avoid cold dairy, sweets, and daytime sleep.`;
    }
  },

  // 6. PANCHAKARMA DETOXIFICATION & THERAPIES
  {
    id: 'PANCHAKARMA',
    title: {
      mr: '५ शास्त्रीय पंचकर्म आणि इनपेशंट (IPD) उपचार',
      hi: '5 शास्त्रीय पंचकर्म एवं अस्पताल भर्ती (IPD) उपचार',
      en: 'Authentic 5 Panchakarma Cleansing Therapies & Inpatient Care'
    },
    sutra: 'दोषाः कदाचित् कुप्यन्ति जिता लङ्घनपाचनैः। जिताः संशोधनैर्ये तु न तेषां पुनरुद्भवः॥ (Charaka Samhita, Su. 16.20)',
    keywords: [
      'panchakarma', 'detox', 'cleansing', 'vamana', 'virechana', 'basti', 'nasya', 'raktamokshana', 'shirodhara', 'abhyanga', 'swedana', 'takradhara', 'netra tarpana', 'udwarthana',
      'पंचकर्म', 'वमन', 'विरेचन', 'बस्ती', 'नस्य', 'रक्तमोक्षण', 'शिरोधारा', 'अभ्यंग', 'डिटॉक्स', 'शरीर शुद्धी'
    ],
    generateResponse: (q, _d, _h, lang) => {
      const isShirodhara = q.includes('shirodhara') || q.includes('takradhara') || q.includes('शिरोधारा');

      if (lang === 'mr') {
        if (isShirodhara) {
          return `### 💆 शिरोधारा आणि तक्रधारा (Shirodhara Therapy)

शिरोधारा ही कपाळावर (*आज्ञा चक्रावर*) औषधी तेल किंवा थंड ताकाची संतत धार सोडण्याची विशेष शास्त्रीय पद्धत आहे.
• **फायदे**: मानसिक ताण, चिंता, निद्रानाश (शांत झोप न लागणे), उच्च रक्तदाब, मायग्रेन आणि केस गळणे यावर अत्यंत गुणकारी.
• **हॉस्पिटल सुविधा**: आयुतत्व हॉस्पिटलमध्ये मूळ लाकडी द्रोणीवर तज्ज्ञ थेरपिस्टद्वारे ही प्रक्रिया केली जाते.`;
        }

        return `### 🌸 ५ शास्त्रीय पंचकर्म - शरीरातील विषारी घटक (Toxins) बाहेर काढणे

> *दोषाः कदाचित् कुप्यन्ति जिता लङ्घनपाचनैः। जिताः संशोधनैर्ये तु न तेषां पुनरुद्भवः॥*  
> *(चरक संहिता: उपवास किंवा साध्या औषधांनी दबलेले आजार पुन्हा उद्भवू शकतात. परंतु पंचकर्म शुद्धीने मुळापासून नष्ट झालेले आजार कधीही परत येत नाहीत.)*

#### ५ शास्त्रीय पंचकर्म पद्धती:
1. **वमन (Vamana)**: छाती आणि आमाशयातील कफ दोष उलटीवाटे बाहेर काढणे (दमा, ऍलर्जी, लठ्ठपणा, सोरायसिस).
2. **विरेचन (Virechana)**: यकृत (लिव्हर) व पित्ताशयातील अतिरिक्त पित्त व उष्णता शौचावाटे बाहेर काढणे (ऍसिडिटी, त्वचारोग, कावीळ).
3. **बस्ती (Basti - सर्व उपचारांचा राजा)**: मोठ्या आतड्यात औषधी तेल व काढ्याचा बस्ती देणे. मणके, सांधे व वाताच्या सर्व ८० आजारांवर सर्वोत्तम.
4. **नस्य (Nasya)**: नाकातून औषधी थेंब सोडून डोके, मान, मेंदू, सायनस व मायग्रेनचे आजार बरे करणे.
5. **रक्तमोक्षण (Raktamokshana & Jalaukavacharana - जळू चिकित्सा)**: औषधी जळू लावून दूषित रक्त बाहेर काढणे (सोरायसिस, एक्झिमा, व्हेरिकोज व्हेन्स).`;
      }

      if (lang === 'hi') {
        return `### 🌸 5 शास्त्रीय पंचकर्म डिटॉक्स उपचार

1. **वमन**: कफ दोष की सफाई (अस्थमा, त्वचा रोग)।  
2. **विरेचन**: पित्त व लिवर की शुद्धि (एसिडिटी, चर्म रोग)।  
3. **बस्ती**: वात रोगों (साइटिका, कमर दर्द, गठिया) का प्रमुख इलाज।  
4. **नस्य**: सिरदर्द, माइग्रेन व साइनस के लिए नाक द्वारा औषधि।  
5. **रक्तमोक्षण (लीच थेरेपी)**: दूषित रक्त की शुद्धि (सोरायसिस, एक्जिमा)।`;
      }

      return `### 🌸 The 5 Authentic Panchakarma Detoxification Therapies

Panchakarma dislodges deep-seated metabolic toxins (*Ama*) and flushes vitiated Tridoshas from cellular tissues:
1. **Vamana**: Upper therapeutic cleansing for Kapha congestion.
2. **Virechana**: Liver & gallbladder purgation for excess Pitta heat.
3. **Basti**: Medicated enema therapy for Vata disorders (Spine, Sciatica, Joints).
4. **Nasya**: Herbal nasal delivery for head, neck, and sinuses.
5. **Raktamokshana**: Leech therapy and bio-purification for chronic skin disorders.`;
    }
  },

  // 7. PEDIATRIC GROWTH, HEIGHT & SUVARNA PRASHAN
  {
    id: 'PEDIATRIC_GROWTH',
    title: {
      mr: 'मुलांची उंची वाढ (Height Growth) आणि सुवर्णप्राशन',
      hi: 'बच्चों की लंबाई (हाइट ग्रोथ) एवं सुवर्णप्राशन',
      en: 'Pediatric Growth, Height Consultation & Suvarna Prashan'
    },
    sutra: 'सुवर्णप्राशनं हि एतत् मेधाग्निबलवर्धनम्। आयुष्यं मङ्गलं पुण्यं वृष्यं वर्ण्यं ग्रहापहम्॥ (Kashyapa Samhita)',
    keywords: [
      'height', 'growth', 'pediatric', 'child growth', 'teenager', 'puberty', 'suvarna prashan', 'epiphysis', 'tall', 'stunted', 'swarna prashan', 'masterclass', 'october', '20 oct',
      'उंची', 'उंची वाढ', 'उंची कशी वाढवावी', 'मुलांची उंची', 'सुवर्णप्राशन', 'हाइट', 'हाइट ग्रोथ', 'मास्टरक्लास', 'लंबाई', 'कद'
    ],
    generateResponse: (_q, _d, _h, lang) => {
      if (lang === 'mr') {
        return `### 📏 मुलांची उंची वाढ (Height Growth) व सुवर्णप्राशन

> *सुवर्णप्राशनं हि एतत् मेधाग्निबलवर्धनम्। आयुष्यं मङ्गलं पुण्यं वृष्यं वर्ण्यं ग्रहापहम्॥*  
> *(काश्यप संहिता: सुवर्णप्राशनाने मुलांची बुद्धिमत्ता, पचन अग्नी, शारीरिक ताकद, प्रतिकारशक्ती आणि शारीरिक वाढ होते.)*

मुलांची उंची ही हाडांच्या टोकावरील **ग्रोथ प्लेट्स (Epiphyseal Plates)** उघड्या असेपर्यंत (वय ८ ते २१ वर्षे) वेगाने वाढवता येते. यासाठी आयुर्वेदात **अस्थी धातू पोषण** केले जाते.

#### उंची वाढीचे ४ मुख्य शास्त्रीय स्तंभ:
1. **सुवर्णप्राशन (Suvarna Prashan)**: २४ कॅरेट शुद्ध सुवर्ण भस्म, ब्राह्मी, शंखपुष्पी व शुद्ध मध-तूपाचे थेंब दर महिन्याच्या पुष्य नक्षत्रावर दिल्याने पिट्युटरी ग्रंथी उत्तेजित होऊन ग्रोथ हार्मोन्स नैसर्गिकरीत्या वाढतात.
2. **अस्थी-मज्जा पोषक औषधी**: अश्वगंधा, प्रवाळ पिष्टी (नैसर्गिक कॅल्शियम), शतावरी आणि लाक्षादी गुग्गुळ यामुळे हाडांची घनता व लांबी वाढते.
3. **ताण देणारे व्यायाम व योगासने**: ताडासन, वृक्षासन, भुजंगासन आणि पुलावर लटकणे (Hanging).

#### 🌟 २० ऑक्टोबर २०२६ - स्पेशल हाईट ग्रोथ मास्टरक्लास:
आयुतत्व हॉस्पिटलतर्फे डॉ. मनिष संतोष येरपुडे यांच्या मार्गदर्शनाखाली मुलांच्या उंची वाढीसाठी विशेष मार्गदर्शन वर्ग आयोजित केला जातो.`;
      }

      if (lang === 'hi') {
        return `### 📏 बच्चों की लंबाई (हाइट ग्रोथ) और सुवर्णप्राशन

हड्डियों की ग्रोथ प्लेट्स (उम्र 8 से 21 वर्ष) खुली रहने तक प्राकृतिक रूप से हाइट बढ़ाई जा सकती है:
1. **सुवर्णप्राशन**: पुष्य नक्षत्र पर स्वर्ण भस्म व मेध्य जड़ी-बूटियों की खुराक से रोग प्रतिरोधक क्षमता और ग्रोथ हार्मोन्स बढ़ते हैं।
2. **अस्थि पोषक औषधियां**: अश्वगंधा, प्रवाल पिष्टी (प्राकृतिक कैल्शियम) से हड्डियों का विकास।
3. **ताड़ासन व हैंगिंग एक्सरसाइज**: रीढ़ की हड्डी को खिंचाव देने से लंबाई बढ़ती है।`;
      }

      return `### 📏 Classical Ayurvedic Science of Height Growth & Pediatric Vitality

Height growth is governed by **Asthi Dhatu Poshana** (nourishment of bone tissue) while epiphyseal growth plates remain open (ages 8 to 21).
• **Suvarna Prashan**: 24K nano-gold ash with Medhya herbs administered on Pushya Nakshatra.
• **Bone-Nourishing Herbs**: Ashwagandha, Shatavari, Praval Pishti (bioavailable calcium).
• **Spinal Decompression**: Tadasana, Bhujangasana, and hanging exercises.`;
    }
  },

  // 8. 100% CASHLESS MEDICLAIM INSURANCE
  {
    id: 'CASHLESS_INSURANCE',
    title: {
      mr: '१००% कॅशलेस मेडिक्लेम विमा (NABH IPD)',
      hi: '100% कैशलेस मेडिक्लेम बीमा (NABH IPD)',
      en: '100% Cashless Mediclaim Insurance & Hospital Admissions'
    },
    sutra: 'NABH Quality Accredited Healthcare · IRDAI AYUSH Cashless Benefit',
    keywords: [
      'insurance', 'mediclaim', 'cashless', 'nabh', 'tpa', 'star health', 'hdfc ergo', 'icici', 'care', 'claim', 'hospital admission', 'reimbursement', 'free treatment', 'policy',
      'विमा', 'इन्शुरन्स', 'कॅशलेस', 'मेडिक्लेम', 'स्टार हेल्थ', 'फ्री उपचार', 'पॉलिसी', 'टीपीए', 'विमा सुविधा'
    ],
    generateResponse: (_q, _d, _h, lang) => {
      if (lang === 'mr') {
        return `### 🏥 आयुतत्व हॉस्पिटलमध्ये १००% कॅशलेस मेडिक्लेम विमा सुविधा

आयुतत्व आयुर्वेदिक हॉस्पिटल व पंचकर्म केंद्र, भंडारा हे **NABH (National Accreditation Board for Hospitals)** द्वारे मानांकित रुग्णालय आहे.

भारत सरकार व **IRDAI** च्या नियमांनुसार सर्व प्रमुख आरोग्य विमा (Health Insurance) कंपन्यांमधून आयुर्वेदिक रुग्णालयातील भरती उपचारांसाठी १००% कॅशलेस सुविधा उपलब्ध आहे.

#### कॅशलेस विम्यामधून होणारे उपचार:
• मणक्याचे आजार, स्लिप डिस्क, सायटिका (कटी बस्ती उपचार).  
• गुडघेदुखी, ऑस्टिओआर्थरायटिस (जानू बस्ती उपचार).  
• पक्षाघात (Paralysis), सांधेदुखी आणि संपूर्ण पंचकर्म डिटॉक्स.

#### प्रमुख मान्य विमा कंपन्या:
• **Star Health & Allied Insurance**  
• **HDFC ERGO General Insurance**  
• **ICICI Lombard Health Care**  
• **Care Health Insurance**  
• **Niva Bupa Health Insurance**  
• **सर्व TPAs**: Medi Assist, Vidal Health, FHPL, Raksha TPA, MD India.

*प्रक्रियेसाठी रुग्णाचे आधार कार्ड, पॅन कार्ड आणि इन्शुरन्स पॉलिसी कार्ड घेऊन आमच्या हॉस्पिटल हेल्पडेस्कवर संपर्क साधावा.*`;
      }

      if (lang === 'hi') {
        return `### 🏥 100% कैशलेस मेडिक्लेम बीमा सुविधा (NABH मान्यता प्राप्त)

आयुतत्व आयुर्वेदिक हॉस्पिटल में IRDAI के नियमानुसार सभी प्रमुख हेल्थ इंश्योरेंस कंपनियों (स्टार हेल्थ, HDFC Ergo, ICICI Lombard, Care आदि) से 100% कैशलेस भर्ती सुविधा उपलब्ध है।
• **उपचार**: स्लिप डिस्क, साइटिका, घुटनों का दर्द व पंचकर्म।  
• **दस्तावेज**: आधार कार्ड, इंश्योरेंस पॉलिसी कार्ड व डॉक्टर की पुरानी पर्ची।`;
      }

      return `### 🏥 100% Cashless Mediclaim Insurance at AayuTatva Hospital

AayuTatva Ayurvedic Hospital is **NABH-Accredited**, qualifying for cashless insurance under IRDAI AYUSH guidelines:
• **Accepted Insurers**: Star Health, HDFC ERGO, ICICI Lombard, Care Health, Niva Bupa, and leading TPAs.
• **Eligible Admissions**: Non-surgical spine treatments (*Kati Basti*), knee osteoarthritis, sciatica, and Panchakarma IPD stays.`;
    }
  },

  // 9. DIGESTION, ACIDITY & CONSTIPATION
  {
    id: 'DIGESTION_ACIDITY_CONSTIPATION',
    title: {
      mr: 'अॅसिडिटी, गॅसेस व बद्धकोष्ठता (पोट साफ न होणे)',
      hi: 'एसिडिटी, गैस व कब्ज (पेट साफ न होना)',
      en: 'Acidity, GERD, Constipation & Gut Health (Amlapitta & Vibandha)'
    },
    sutra: 'शान्तेऽग्नौ म्रियते युक्ते चिरं जीवत्यनामयः। रोगी स्याद्विकृते मूलमग्निस्तस्मान्निरुच्यते॥ (Charaka Samhita, Chi. 15)',
    keywords: [
      'acidity', 'acid', 'gerd', 'heartburn', 'constipation', 'pet', 'gas', 'bloating', 'ibs', 'grahani', 'amlapitta', 'vibandha', 'motions', 'kabz', 'stomach', 'ulcer', 'piles', 'bawasir',
      'अॅसिडिटी', 'पित्त', 'गॅस', 'पोट', 'बद्धकोष्ठता', 'संडास', 'कब्ज', 'पोटात जळजळ', 'मुळव्याध', 'पोट साफ'
    ],
    generateResponse: (q, _d, _h, lang) => {
      const isAcidity = q.includes('acidity') || q.includes('acid') || q.includes('अॅसिडिटी') || q.includes('जळजळ') || q.includes('पित्त');

      if (lang === 'mr') {
        if (isAcidity) {
          return `### 🔥 अम्लपित्त (Acidity) व छातीतील जळजळ - आयुर्वेदिक उपाय

आयुर्वेदात जठराग्नीतील पित्ताचा **आम्ल गुण** वाढल्याने छातीत जळजळ, आंबट ढेकर आणि डोकेदुखी सुरू होते.

#### शास्त्रीय उपचार व पथ्य:
• **कामदुधा रस, सूतशेखर रस आणि अविपत्तिकर चूर्ण** यामुळे पोटातील आम्लता नैसर्गिकरीत्या शांत होते.  
• **औषधी ताक (Takra)**: दुपारच्या जेवणानंतर १ ग्लास ताकात भाजलेले जिरे आणि सैंधव मीठ टाकून प्यावे.  
• **घरगुती उपाय**: १ चमचा धणे आणि १ चमचा बडीशेप रात्री १ ग्लास पाण्यात भिजवून ठेवा, सकाळी ते पाणी गाळून प्या.  
• **टाळावे**: चहा, कॉफी, तंबाखू, रात्री उशिरा जेवणे, अति तिखट-मसालेदार अन्न.`;
        }

        return `### 🌿 जुनाट बद्धकोष्ठता (Constipation) व गॅस - पोट साफ करण्याचे उपाय

बद्धकोष्ठता हा **अपान वायूचा** आजार आहे. मोठ्या आतड्यात कोरडेपणा (रुक्षता) वाढल्यामुळे शौचास त्रास होतो.

#### आतडे स्वच्छ करणारे उपचार:
• **मात्रा बस्ती**: कोमट तिळाच्या तेलाची किंवा सहचरादी तेलाची बस्ती दिल्याने आतड्यांना आतून वंगण मिळते.  
• **घरगुती उपाय**: रात्री झोपताना १ कप कोमट दुधात १ चमचा शुद्ध गाईचे तूप किंवा एरंडेल तेल (Castor oil) घ्या. सकाळी उठल्याबरोबर २ ग्लास कोमट पाणी प्या.`;
      }

      if (lang === 'hi') {
        return `### 🔥 एसिडिटी एवं कब्ज के आयुर्वेदिक उपाय

• **एसिडिटी (अम्लपित्त)**: कामदुधा रस, सौंफ-धनिया का पानी, और दोपहर में भुने जीरे वाला छाछ। चाय और ज्यादा मिर्च छोड़ें।  
• **कब्ज (Constipation)**: रात को गुनगुने दूध में 1 चम्मच गाय का घी लें, सुबह 2 गिलास गुनगुना पानी पिएं।`;
      }

      return `### 🔥 Classical Ayurvedic Protocol for Acidity & Constipation

In Ayurveda, hyperacidity (*Amlapitta*) occurs when Pitta becomes excessively sour, inflaming the stomach.
• **Soothing Herbs**: *Kamadudha Rasa*, *Avipattikar Churna*, and *Amalaki*.
• **Constipation (*Vibandha*)**: Warm milk with 1 teaspoon of pure cow ghee at bedtime, and *Matra Basti*.`;
    }
  },

  // 10. STRESS, ANXIETY & SLEEP
  {
    id: 'STRESS_INSOMNIA',
    title: {
      mr: 'मानसिक ताण, चिंता व निद्रानाश (शांत झोप न लागणे)',
      hi: 'मानसिक तनाव, चिंता एवं अनिद्रा (नींद न आना)',
      en: 'Anxiety, Chronic Stress & Sleep Disorders (Chittodvega & Nidranasha)'
    },
    sutra: 'निद्रावित्तं सुखं दुःखं पुष्टिः कार्श्यं बलाबलम्॥ (Charaka Samhita)',
    keywords: [
      'stress', 'anxiety', 'sleep', 'insomnia', 'depression', 'mental', 'tension', 'brain', 'calm', 'restless', 'nidra', 'panic', 'headache', 'tired', 'fatigue', 'mind',
      'ताण', 'चिंता', 'झोप', 'निद्रानाश', 'डोकेदुखी', 'तणाव', 'शांत झोप', 'अनिद्रा', 'डिप्रेशन'
    ],
    generateResponse: (_q, _d, _h, lang) => {
      if (lang === 'mr') {
        return `### 🧠 मानसिक ताण, चिंता आणि निद्रानाश - शास्त्रीय उपचार

> *निद्रावित्तं सुखं दुःखं पुष्टिः कार्श्यं बलाबलम्॥*  
> *(चरक संहिता: शरीराचे सुख, दुःख, ताकद, ज्ञान आणि दीर्घायुष्य हे शांत व नैसर्गिक झोपेवर अवलंबून असते.)*

मेंदूतील **प्राण वात** आणि **साधक पित्त** बिघडल्यामुळे सतत विचार येणे आणि शांत झोप न लागणे ही समस्या उद्भवते.

#### आयुतत्व हॉस्पिटलमधील मेंदू-शांत करणारे उपचार:
1. **शिरोधारा (Shirodhara)**: कपाळावर कोमट क्षीरबला तेलाची संतत धार सोडल्याने मज्जासंस्थेचा ताण नष्ट होऊन शांत झोप लागते.
2. **पादाभ्यंग**: रात्री झोपण्यापूर्वी तळपायांना काशाच्या वाटीने किंवा कोमट तिळाच्या तेलाने मसाज करणे.
3. **मेध्य रसायन वनस्पती**: ब्राह्मी, जटामांसी, शंखपुष्पी आणि अश्वगंधा मेंदूच्या पेशींना बळकट करतात.
• झोपण्यापूर्वी मोबाईल स्क्रीन १ तास आधी बंद करा आणि १ कप कोमट दुधात चिमूटभर जायफळ पूड टाकून प्या.`;
      }

      if (lang === 'hi') {
        return `### 🧠 मानसिक तनाव और अनिद्रा (नींद न आना)

• **शिरोधारा**: माथे पर औषधीय तेल की धार से दिमाग की नसों को तुरंत शांति मिलती है।  
• **घरेलू उपाय**: रात को सोने से पहले पैरों के तलवों में तिल के तेल से मालिश करें और गुनगुने दूध में चुटकी भर जायफल लें।`;
      }

      return `### 🧠 Classical Ayurvedic Neuro-Balancing for Stress & Sleep

Shirodhara with warm *Ksheerabala Taila*, foot massage (*Padaabhyanga*), and Medhya Rasayana herbs (*Brahmi*, *Jatamansi*, *Ashwagandha*) restore restful natural sleep without addictive sedatives.`;
    }
  },

  // 11. DOCTOR APPOINTMENTS & CLINIC TIMINGS
  {
    id: 'APPOINTMENTS_CLINIC',
    title: {
      mr: 'डॉ. मनिष येरपुडे - भेटण्याची वेळ व पत्ता',
      hi: 'डॉ. मनीष येरपुडे - मिलने का समय व पता',
      en: 'Dr. Manish Yerpude Consultation, Address & Timings'
    },
    keywords: [
      'doctor', 'manish', 'yerpude', 'timing', 'hours', 'appointment', 'address', 'location', 'fees', 'where', 'bhandara', 'map', 'directions', 'visiting',
      'डॉक्टर', 'पत्ता', 'वेळ', 'भंडारा', 'क्लिनिक', 'भेटायची वेळ', 'अपॉइंटमेंट', 'फी', 'स्थान'
    ],
    generateResponse: (_q, _d, _h, lang) => {
      if (lang === 'mr') {
        return `### 👨‍⚕️ डॉ. मनिष संतोष येरपुडे - क्लिनिक माहिती व भेटण्याची वेळ

**आयुतत्व आयुर्वेदिक हॉस्पिटल व पंचकर्म केंद्र**  
*NABH मानांकित दर्जेदार आरोग्य सेवा केंद्र*

• **मुख्य वैद्यकीय संचालक**: **डॉ. मनिष संतोष येरपुडे** [B.A.M.S. (MUHS), MD (AM), P.G.P.P. पुणे]  
• **खास तज्ज्ञ**: नाडी परीक्षा, मणके व सायटिका विना-ऑपरेशन उपचार, गुडघेदुखी निवारण, मुलांची उंची वाढ, व शास्त्रीय पंचकर्म.  
• **पत्ता**: पहिला माळा, बावणकर भवन, खात रोड, गणेश मार्बल जवळ, शिव नगरी, भंडारा, महाराष्ट्र ४४१९०४.  
• **ओपीडी वेळ**:  
  - **सकाळची वेळ**: १०:०० ते दुपारी २:०० (दररोज)  
  - **संध्याकाळची वेळ**: ५:०० ते रात्री ८:०० (दररोज)  
• **थेट फोन**: [+91 77588 16074](tel:+917758816074)  
• **थेट व्हॉट्सॲप**: [+91 77588 16074](https://wa.me/917758816074)`;
      }

      if (lang === 'hi') {
        return `### 👨‍⚕️ डॉ. मनीष संतोष येरपुडे - क्लिनिक एवं परामर्श समय

**आयुतत्व आयुर्वेदिक हॉस्पिटल एवं पंचकर्म केंद्र** (NABH मान्यता प्राप्त)  
• **चिकित्सक**: डॉ. मनीष संतोष येरपुडे [B.A.M.S., MD (AM), P.G.P.P.]  
• **पता**: प्रथम तल, बावंकर भवन, खात रोड, गणेश मार्बल के पास, शिव नगरी, भंडारा, महाराष्ट्र 441904.  
• **ओपीडी समय**: प्रातः 10:00 से 2:00 एवं सायं 5:00 से 8:00 बजे (प्रतिदिन)।  
• **फोन / व्हाट्सएप**: +91 77588 16074`;
      }

      return `### 👨‍⚕️ Clinic Details & Doctor Consultation

**AayuTatva Ayurvedic Hospital & Panchakarma Centre**  
*NABH Quality Accredited Healthcare Facility*

• **Chief Medical Director**: **Dr. Manish Santosh Yerpude** [B.A.M.S. (MUHS), MD (AM), P.G.P.P. Pune]  
• **Address**: 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904.  
• **OPD Timings**: 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM (Monday to Sunday).  
• **Direct Phone**: [+91 77588 16074](tel:+917758816074)`;
    }
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
  history: ChatMessage[] = [],
  userDoshaProfile?: DoshaProfile | null,
  language: SupportedLanguage = 'mr'
): InternalAIResponse {
  const query = (userMessage || '').toLowerCase().trim();
  const selectedLang: SupportedLanguage = ['mr', 'hi', 'en'].includes(language) ? language : 'mr';

  // 1. Find matching topic based on smart keyword matching
  let matchedTopic: AyurvedicTopic | null = null;

  for (const topic of TOPICS) {
    if (topic.keywords.some(kw => matchesKeyword(query, kw))) {
      matchedTopic = topic;
      break;
    }
  }

  // 2. Generate customized clinical response
  let detailedBody = '';
  let intent = 'GENERAL_AYURVEDIC_GUIDANCE';
  let topicTitle = selectedLang === 'mr' ? 'आयुर्वेदिक आरोग्य मार्गदर्शन' : selectedLang === 'hi' ? 'आयुर्वेदिक स्वास्थ्य मार्गदर्शन' : 'Ayurvedic Health & Wellness Intelligence';

  if (matchedTopic) {
    detailedBody = matchedTopic.generateResponse(query, userDoshaProfile, history, selectedLang);
    intent = matchedTopic.id;
    topicTitle = matchedTopic.title[selectedLang] || matchedTopic.title.mr;
  } else {
    // Default Shastra response
    if (selectedLang === 'mr') {
      detailedBody = `### 🌿 आपल्या प्रश्नावर आयुर्वेदाचा शास्त्रीय दृष्टीकोन

आपण विचारलेल्या **"${userMessage.slice(0, 65)}"** या विषयाबद्दल धन्यवाद.

आयुर्वेदात आरोग्याची व्याख्या *सुश्रुत संहितेमध्ये* स्पष्ट केली आहे:
> *समदोषः समाग्निश्च समधातुमलक्रियः। प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते॥*  
> *(ज्याचे वात, पित्त, कफ हे तिन्ही दोष समतोल आहेत, पचन अग्नी उत्तम आहे, धातू आणि मळांची क्रिया योग्य चालू आहे, आणि ज्याचे मन व इंद्रिये प्रसन्न आहेत, तोच व्यक्ती खऱ्या अर्थाने निरोगी आहे.)*

प्रत्येक व्यक्तीची शारीरिक प्रकृती (*वात, पित्त, कफ*) वेगळी असल्यामुळे, योग्य उपायासाठी प्रत्यक्ष **नाडी परीक्षा (Pulse Examination)** करून औषधोपचार ठरवणे सर्वोत्तम ठरते.`;
    } else if (selectedLang === 'hi') {
      detailedBody = `### 🌿 आपके प्रश्न पर आयुर्वेद का शास्त्रीय दृष्टिकोण

आयुर्वेद के अनुसार सच्चा स्वास्थ्य त्रिदोषों (वात, पित्त, कफ) के संतुलन और मजबूत पाचन अग्नि पर निर्भर करता है। आपकी शारीरिक प्रकृति के अनुसार सही उपचार और आहार जानने के लिए अस्पताल में **नाड़ी परीक्षा** कराना सर्वश्रेष्ठ है।`;
    } else {
      detailedBody = `### 🌿 Ayurvedic Shastra Perspective on Your Query

In classical Ayurveda (*Sushruta Samhita*), health is the harmonious balance of Vata, Pitta, and Kapha, active digestive fire (*Agni*), and a peaceful mind. For individualized herbal prescriptions, in-person radial pulse diagnosis (*Nadi Parikshan*) is recommended.`;
    }
  }

  const encodedQuery = encodeURIComponent(
    `Hello Dr. Manish Yerpude, I am consulting AayuVaidya AI on the website regarding: "${userMessage.slice(0, 80)}". Please guide me on treatment at AayuTatva Hospital in Bhandara.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedQuery}`;
  const phoneDialUrl = `tel:${PRIMARY_PHONE}`;

  let ctaSection = '';
  let headerNotice = '';

  if (selectedLang === 'mr') {
    headerNotice = `**[आयुवैद्य इन-हाउस आयुर्वेदिक बुद्धिमत्ता · शास्त्रीय ज्ञान]**`;
    ctaSection = `---
🏥 **डॉ. मनिष संतोष येरपुडे यांच्याशी संपर्क साधा (आयुतत्व आयुर्वेदिक हॉस्पिटल, भंडारा):**
• 📞 **थेट फोन करा**: [**+91 77588 16074**](${phoneDialUrl}) *(कॉल करण्यासाठी येथे टॅप करा)*
• 💬 **व्हॉट्सॲप मेसेज**: [**व्हॉट्सॲपवर चॅट करा**](${whatsappUrl}) *(व्हॉट्सॲप उघडण्यासाठी येथे टॅप करा)*
• 📍 **पत्ता**: पहिला माळा, बावणकर भवन, खात रोड, गणेश मार्बल जवळ, शिव नगरी, भंडारा, महाराष्ट्र ४४१९०४
• ⏰ **ओपीडी वेळ**: सकाळी १०:०० ते दुपारी २:०० आणि संध्याकाळी ५:०० ते रात्री ८:०० (सोमवार ते रविवार)
• 🛡️ **सुविधा**: NABH मान्यताप्राप्त रुग्णालय · १००% कॅशलेस मेडिक्लेम विमा (Star Health, HDFC Ergo, ICICI, Care, इ.) उपलब्ध.`;
  } else if (selectedLang === 'hi') {
    headerNotice = `**[आयुवैद्य इन-हाउस आयुर्वेदिक ज्ञान · शास्त्रीय परामर्श]**`;
    ctaSection = `---
🏥 **डॉ. मनीष संतोष येरपुडे से संपर्क करें (आयुतत्व आयुर्वेदिक हॉस्पिटल, भंडारा):**
• 📞 **सीधा कॉल करें**: [**+91 77588 16074**](${phoneDialUrl}) *(कॉल करने के लिए टैप करें)*
• 💬 **व्हाट्सएप मैसेज**: [**व्हाट्सएप पर चैट करें**](${whatsappUrl}) *(व्हाट्सएप खोलने के लिए टैप करें)*
• 📍 **पता**: प्रथम तल, बावंकर भवन, खात रोड, गणेश मार्बल के पास, शिव नगरी, भंडारा, महाराष्ट्र 441904
• ⏰ **ओपीडी समय**: प्रातः 10:00 से दोपहर 2:00 एवं सायं 5:00 से रात्रि 8:00 (प्रतिदिन)
• 🛡️ **सुविधाएं**: NABH मान्यता प्राप्त अस्पताल · 100% कैशलेस मेडिक्लेम बीमा (Star Health, HDFC Ergo, ICICI, Care आदि) उपलब्ध।`;
  } else {
    headerNotice = `**[AayuVaidya In-House Ayurvedic Intelligence · Classical Shastra Knowledge]**`;
    ctaSection = `---
🏥 **Connect with Dr. Manish Santosh Yerpude at AayuTatva Hospital:**
• 📞 **Direct Call**: [**+91 77588 16074**](${phoneDialUrl}) *(Tap to Open Dialpad)*
• 💬 **WhatsApp**: [**Chat on WhatsApp**](${whatsappUrl}) *(Tap to Open WhatsApp Chat)*
• 📍 **Hospital**: 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904
• ⏰ **OPD Hours**: 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM (Monday to Sunday)
• 🛡️ **Facilities**: NABH-Accredited IPD · 100% Cashless Mediclaim with Star Health, HDFC ERGO, ICICI Lombard, Care, and all leading TPAs.`;
  }

  const completeReply = `${headerNotice}\n\n${detailedBody}\n\n${ctaSection}`;

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
