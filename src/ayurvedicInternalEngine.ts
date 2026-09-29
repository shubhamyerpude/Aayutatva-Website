/**
 * AayuTatva In-House Ayurvedic Intelligence Engine (AayuVaidya AI)
 * 
 * Completely self-contained, high-performance in-house knowledge model.
 * Zero external API dependencies (no Gemini, OpenAI, or third-party APIs needed).
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
  phone: string;
  whatsappUrl: string;
}

const PRIMARY_PHONE = '+917758816074';
const WHATSAPP_NUMBER = '917758816074';

const CLINIC_INFO = {
  doctor: 'Dr. Manish Santosh Yerpude [B.A.M.S. (MUHS), MD (AM), P.G.P.P. Pune]',
  hospital: 'AayuTatva Ayurvedic Hospital & Panchakarma Centre',
  address: '1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904',
  opdTimings: 'Monday to Sunday: 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM',
  insurance: 'NABH-Accredited IPD · 100% Cashless Mediclaim with Star Health, HDFC ERGO, ICICI Lombard, Care, Niva Bupa & leading TPAs.'
};

interface AyurvedicTopic {
  id: string;
  title: string;
  sutra?: string;
  keywords: string[];
  generateResponse: (query: string, dosha?: DoshaProfile | null, history?: ChatMessage[]) => string;
}

const TOPICS: AyurvedicTopic[] = [
  // 1. GREETING & INTRO
  {
    id: 'GREETING',
    title: 'Welcome to AayuVaidya In-House Intelligence',
    keywords: ['hello', 'hi', 'namaste', 'namaskar', 'pranam', 'hey', 'start', 'kasa ahes', 'kya haal'],
    generateResponse: (_q, dosha) => {
      const doshaNote = dosha?.dominant 
        ? `\n> 🧘 *I see your registered constitution is **${dosha.dominant}** (${dosha.pulseGati || 'Classical Pulse Rhythm'}).*` 
        : '';

      return `### Namaste 🙏 Welcome to AayuVaidya AI
I am the in-house Ayurvedic Clinical Knowledge Engine for **AayuTatva Ayurvedic Hospital & Panchakarma Centre**, Bhandara.${doshaNote}

I can guide you on authentic classical principles from **Charaka Samhita**, **Sushruta Samhita**, and **Kanada Nadi Vijnana**:
• 🩺 **Nadi Parikshan**: How 8-fold radial pulse diagnosis detects subtle metabolic imbalances.
• 🦴 **Spine & Joint Health**: Non-surgical protocols for slip disc, sciatica (*Gridhrasi*), and arthritis (*Sandhigata Vata*).
• 🌿 **Tridosha & Ahara**: Custom food and lifestyle rules for your Vata, Pitta, or Kapha constitution.
• 🌸 **Panchakarma Detox**: Classical 5 purifications (Basti, Virechana, Vamana, Nasya, Raktamokshana).
• 📏 **Pediatric Growth & Height**: Asthi Dhatu nourishment and bone epiphysis guidance.
• 🏥 **100% Cashless Insurance**: NABH hospital admissions and cashless Mediclaim assistance.

*How may I assist your health and wellness journey today?*`;
    }
  },

  // 2. SPINE, SCIATICA & DISC BULGE
  {
    id: 'SPINE_SCIATICA',
    title: 'Spine, Sciatica & Slip Disc (Gridhrasi & Kati Shoola)',
    sutra: 'स्नेहस्वेदाभ्यामन्त्रदोषहरणाच्च वातव्याधिः प्रशाम्यति॥ (Charaka Samhita, Chi. 28)',
    keywords: ['sciatica', 'gridhrasi', 'back pain', 'spine', 'spinal', 'disc', 'slip disc', 'lumbar', 'l4', 'l5', 's1', 'cervical', 'spondylosis', 'kati basti', 'neck pain', 'lower back', 'pith', 'kambar', 'radiculopathy', 'pinched nerve', 'manas', 'greeva'],
    generateResponse: (q) => {
      const isCervical = q.includes('cervical') || q.includes('neck') || q.includes('greeva');
      const conditionName = isCervical ? 'Cervical Spondylosis (Manyastambha / Greeva Shoola)' : 'Sciatica & Lumbar Disc Herniation (Gridhrasi & Kati Shoola)';
      const bastiType = isCervical ? 'Greeva Basti (cervical spinal reservoir)' : 'Kati Basti (lumbar spinal reservoir)';

      return `### 🦴 Classical Non-Surgical Protocol for ${conditionName}

> *स्नेहस्वेदाभ्यामन्त्रदोषहरणाच्च वातव्याधिः प्रशाम्यति॥*  
> *(Charaka Samhita: Musculoskeletal disorders rooted in aggravated Vata resolve through deep therapeutic oleation, fomentation, and localized neuro-nourishment.)*

In classical Ayurveda, spinal nerve compression, lumbar disc bulge, and radiating pain down the leg are classified as **Gridhrasi** (Sciatica) or **Sandhigata Vata** (Degenerative Disc Disease). When dry, cold Vata (*Ruksha-Sheeta Guna*) aggravates in the spinal column (*Kati Pradesha*), intervertebral discs dehydrate and compress the sciatic nerve (*Kandara*).

#### Non-Surgical Clinical Protocols at AayuTatva Hospital:
1. **${bastiType}**: A leak-proof reservoir of black gram dough is sealed over the affected vertebrae. Medicated warm herbal oils (such as *Sahacharadi Taila*, *Mahanarayana Taila*, and *Ksheerabala 101*) are retained for 35–45 minutes, deeply hydrating disc cartilage and relieving radicular nerve irritation.
2. **Patra Pinda Sweda (Elakizhi)**: Fresh medicinal leaves (Nirgundi, Eranda, Arka) sautéed in herbal oils and steamed into cotton poultices to instantly relieve muscular spasm and spinal stiffness.
3. **Tikta Ksheera Basti (Primary Root Cure)**: Because bone tissue (*Asthi Dhatu*) is fed through the large intestine (the chief seat of Vata), medicated milk and herbal decoction enemas transport calcium and nourishing herbs directly into deeper connective tissues without oral digestive loss.
4. **Classical Internal Formulations (Prescribed by Doctor)**: Formulations containing *Yograj Guggulu*, *Trayodashanga Guggulu*, *Nirgundi Kwath*, and *Shallaki* promote natural anti-inflammatory tissue repair.

#### Essential Home Guidelines:
• **Strictly Avoid**: Forward bending with heavy weights, sleeping on an excessively soft sagging mattress, direct exposure to cold AC drafts, and dry cold foods (raw salads, stale refrigerated food).  
• **Recommended**: Warm sesame oil (*Tila Taila*) gentle application down the legs, sleeping on an orthopedic medium-firm mattress, and drinking warm water with a pinch of dry ginger (*Sunthi*).`;
    }
  },

  // 3. JOINTS, KNEE PAIN & ARTHRITIS
  {
    id: 'JOINTS_ARTHRITIS',
    title: 'Knee Pain, Osteoarthritis & Joint Health (Sandhigata Vata & Amavata)',
    sutra: 'सन्धिवाते तु सस्नेहं स्वेदनं बस्तिरेव च॥ (Chakradatta)',
    keywords: ['joint', 'knee', 'janu basti', 'arthritis', 'osteoarthritis', 'amavata', 'sandhigata', 'swelling', 'sandhe', 'gout', 'vatarakta', 'rheumatoid', 'crepitus', 'cartilage', 'gel', 'knee replacement', 'ghutna', 'sandhe vata'],
    generateResponse: (q) => {
      const isAmavata = q.includes('rheumatoid') || q.includes('amavata') || q.includes('autoimmune');

      if (isAmavata) {
        return `### 🌿 Ayurvedic Management of Rheumatoid Arthritis (*Amavata*)

In Ayurveda, *Amavata* occurs when weak digestive fire (*Mandagni*) produces systemic metabolic toxins (*Ama*), which travel with aggravated Vata and lodge in the synovial joints (*Sandhi*), causing intense morning stiffness, heat, and swelling.

#### Clinical Approach at AayuTatva Hospital:
• **Deepana & Pachana**: Igniting digestive Agni with classical herbs like *Sunthi*, *Ajwain*, and *Shunthi-Guduchi Kwatha* to digest circulating endotoxins before any heavy oil massage is attempted.
• **Valuka Sweda**: Dry sand and herb poultice fomentation to dry out inflammatory fluid without triggering aggravated joint swelling.
• **Vaitarana Basti**: Specialized medicinal enema using Guda (jaggery), Saindhava, Chincha (tamarind), and Gomutra ark, renowned in *Chakradatta* for clearing joint blockages.`;
      }

      return `### 🦵 Non-Surgical Knee Care & Osteoarthritis (*Sandhigata Vata*)

> *सन्धिवाते तु सस्नेहं स्वेदनं बस्तिरेव च॥*  
> *(Chakradatta: Sandhigata Vata responds to deep herbal lubrication, sudation, and colon-targeted bio-nourishment.)*

Osteoarthritis of the knees occurs when aging, wear-and-tear, or excess weight depletes the natural synovial fluid (*Shleshaka Kapha*), causing bone-on-bone friction, crackling sounds (*Crepitus / Sandhisphutana*), and difficulty walking or sitting cross-legged.

#### Hospital Panchakarma Protocols for Knee Restoration:
1. **Janu Basti**: Medicated warm herbal pools (*Murivenna, Kottamchukkadi, Balashwagandhadi*) sealed over the knee joints to regenerate synovial cushioning and relieve cartilage stress.
2. **Shashtika Shali Pinda Sweda (Navarakizhi)**: Warm poultices of medicinal Shashtika rice cooked in cow milk and herbal decoction (*Bala Kashaya*) to nourish weakened knee ligaments and tendons.
3. **Lepa Therapy**: Localized poultices of anti-inflammatory herbs (*Dashanga Lepa, Rasna, Punarnava*) to drain peri-articular edema and fluid retention.

#### Practical Daily Advice:
• **Avoid**: Squatting on the floor, deep lunges, cold water baths, and prolonged dry fasting.  
• **Beneficial**: Consuming 1 teaspoon of pure cow ghee in warm milk at night to lubricate bodily tissues (*Snehana*), and gentle non-impact quadriceps strengthening.`;
    }
  },

  // 4. CLASSICAL NADI PARIKSHAN (PULSE DIAGNOSIS)
  {
    id: 'NADI_PARIKSHAN',
    title: 'Classical Nadi Parikshan (Radial Pulse Diagnosis)',
    sutra: 'यथा वीणागतास्तन्त्री सर्वान् रागान् प्रभाषते। तथा हस्तगता नाडी सर्वान् रोगान् प्रकाशते॥ (Kanada Nadi Vijnana)',
    keywords: ['nadi', 'pulse', 'parikshan', 'pulse diagnosis', 'radial pulse', 'sarpa', 'manduka', 'hamsa', 'gati', 'finger', 'wrist', 'naadi'],
    generateResponse: (_q, dosha) => {
      let doshaDetail = '';
      if (dosha?.dominant) {
        doshaDetail = `\n\n📌 **Your Online Quiz Profile**: Detected as **${dosha.dominant}** constitution with **${dosha.pulseGati || 'Classical Rhythm'}**. A physical examination validates this against deep organ sub-doshas.`;
      }

      return `### 🩺 The Classical Science of Nadi Parikshan (Pulse Examination)

> *यथा वीणागतास्तन्त्री सर्वान् रागान् प्रभाषते। तथा हस्तगता नाडी सर्वान् रोगान् प्रकाशते॥*  
> *(Just as the strings of a Veena express every musical raga, the radial pulse reveals all internal disorders and metabolic imbalances before they manifest physically.)*

Nadi Parikshan is Ayurveda's signature non-invasive diagnostic science. At **AayuTatva Ayurvedic Hospital**, Dr. Manish Santosh Yerpude palpates the radial artery at the base of the thumb (*Angushtha Moola*) using three distinct finger placements:

#### The Three Classical Waveforms (Gatis):
1. **Index Finger (Vata Sthana) — Sarpa Gati (Snake Wave)**:
   - *Characteristics*: Quick, erratic, light, serpentine wave.
   - *Signifies*: Nervous system sensitivity, dry tissues, gas/bloating, irregular metabolism, sleep disturbances.
2. **Middle Finger (Pitta Sthana) — Manduka Gati (Frog Leap)**:
   - *Characteristics*: Sharp, hot, forceful, leaping pulse.
   - *Signifies*: Elevated metabolic heat, liver stress, hyperacidity, skin redness, inflammatory tendency.
3. **Ring Finger (Kapha Sthana) — Hamsa / Gaja Gati (Swan / Elephant Glide)**:
   - *Characteristics*: Slow, deep, heavy, rhythmic gliding pulse.
   - *Signifies*: Sluggish lymph, mucus accumulation, slow thyroid or digestive fire, tissue water retention.

#### Clinical Depths Examined by Dr. Manish Yerpude:
• **Superficial Pulse (Vikriti)**: Current active stress and immediate bodily imbalances.  
• **Deep Pulse (Prakriti)**: Your true constitutional genetic baseline since birth.  
• **Dhatu Nadi**: Tissue nutrition of the 7 body layers (Plasma, Blood, Muscle, Fat, Bone, Marrow, Reproductive).  
• **Manas Nadi**: Psychological and emotional stress, mental fatigue, and sleep quality.${doshaDetail}

#### How to Prepare for Your In-Person Pulse Reading in Bhandara:
• Best conducted in morning hours (between 8:30 AM – 1:00 PM).  
• Maintain an empty stomach or wait 2.5–3 hours after a light meal.  
• Avoid tea, coffee, smoking, and heavy exercise for 2 hours before the examination.`;
    }
  },

  // 5. TRIDOSHAS, PRAKRITI & DIET (AHARA)
  {
    id: 'DOSHA_DIET',
    title: 'Tridosha Constitution & Classical Ayurvedic Diet (Ahara)',
    sutra: 'आहारसम्भवं वस्तु रोगाश्चाहारसम्भवाः। (Charaka Samhita, Su. 28.45)',
    keywords: ['dosha', 'prakriti', 'vikriti', 'vata', 'pitta', 'kapha', 'diet', 'food', 'ahara', 'nutrition', 'eat', 'meal', 'cooking', 'recipes', 'tridosha', 'taste', 'rasa'],
    generateResponse: (q, dosha) => {
      const activeDosha = (dosha?.dominant || (q.includes('pitta') ? 'Pitta' : q.includes('kapha') ? 'Kapha' : 'Vata')).toLowerCase();

      let doshaSpecificAdvice = '';
      if (activeDosha.includes('pitta')) {
        doshaSpecificAdvice = `#### 🌿 Specific Guidelines for Pitta (Fire + Water):
• **Qualities**: Hot, sharp, intense, oily, acidic.
• **Foods to Favor**: Sweet, bitter, and astringent tastes. Sweet apples, pomegranates, cucumber, coriander, fennel seeds, soaked raisins, pure cow ghee, mung bean khichdi, coconut water.
• **Foods to Avoid**: Green/red chilies, mustard oil, garlic in excess, vinegar, deep-fried items, fermented foods, excessive tomatoes, and hard liquors.
• **Lifestyle**: Cool evening walks, Chandra Bhedana pranayama, swimming, avoiding midday sun.`;
      } else if (activeDosha.includes('kapha')) {
        doshaSpecificAdvice = `#### 🌿 Specific Guidelines for Kapha (Earth + Water):
• **Qualities**: Cold, heavy, moist, static, slow.
• **Foods to Favor**: Pungent, bitter, and astringent tastes. Roasted barley, millets (jowar, bajra), steamed leafy greens, ginger tea, black pepper, turmeric, light legume soups, dry fruits in moderation.
• **Foods to Avoid**: Dairy ice cream, cold full-cream milk, curd (yogurt) especially at night, heavy sweets, oily gravies, and day sleep (*Diva Swapna*).
• **Lifestyle**: Vigorous morning exercise, Surya Namaskars, Udwarthana (dry herbal powder scrub), dry sauna.`;
      } else {
        doshaSpecificAdvice = `#### 🌿 Specific Guidelines for Vata (Space + Air):
• **Qualities**: Dry, light, cold, rough, mobile.
• **Foods to Favor**: Sweet, sour, and salty tastes. Warm, freshly cooked, grounding foods enriched with cow ghee, warm sesame oil, cooked root vegetables, warm milk with nutmeg, moong dal khichdi, soaked almonds.
• **Foods to Avoid**: Raw cold salads, dry crackers, beans without digestive spices, iced beverages, and irregular meal schedules.
• **Lifestyle**: Daily warm oil self-massage (*Abhyanga*), early bedtime by 10:00 PM, regular meditation, staying protected from cold wind.`;
      }

      return `### 🍲 Classical Ayurvedic Science of Ahara (Diet as Medicine)

> *आहारसम्भवं वस्तु रोगाश्चाहारसम्भवाः। हिताहितविशेषाच्च विशेषाः सुखदुःखयोः॥*  
> *(Charaka Samhita: The human body is the exact product of food. All diseases and health originate from diet; wholesome food creates longevity, while unwholesome food breeds illness.)*

In classical Ayurveda, there is no single "one-size-fits-all" diet. Food is evaluated according to the **6 Rasas (Tastes)**, **Virya (Thermal Potency)**, and **Vipaka (Post-Digestive Effect)** to balance your digestive fire (*Agni*).

${doshaSpecificAdvice}

#### The 4 Golden Rules of Ayurvedic Eating (*Ahara Vidhi Visheshaayatana*):
1. **Eat Warm & Fresh (*Ushnam Ashneeyat*)**: Warm food stimulates the gastric enzymes (*Jatharagni*) and promotes unobstructed peristalsis (*Vatanulomana*).
2. **Never Eat Without Hunger**: Eating before the previous meal has fully digested causes undigested metabolic toxins (*Ama*) to accumulate in the tissues.
3. **Follow the 3-Compartment Rule**: Fill 1/3 of the stomach with solid food, 1/3 with warm liquids, and leave 1/3 empty for digestive air and gastric movement.
4. **Beware of Incompatible Combinations (*Viruddha Ahara*)**: Never combine milk with fish, fruit, or sour items; never heat pure honey; and never mix equal quantities of honey and ghee.`;
    }
  },

  // 6. PANCHAKARMA DETOXIFICATION & THERAPIES
  {
    id: 'PANCHAKARMA',
    title: 'Authentic 5 Panchakarma Cleansing Therapies & Inpatient Care',
    sutra: 'दोषाः कदाचित् कुप्यन्ति जिता लङ्घनपाचनैः। जिताः संशोधनैर्ये तु न तेषां पुनरुद्भवः॥ (Charaka Samhita, Su. 16.20)',
    keywords: ['panchakarma', 'detox', 'cleansing', 'vamana', 'virechana', 'basti', 'nasya', 'raktamokshana', 'shirodhara', 'abhyanga', 'swedana', 'takradhara', 'netra tarpana', 'udwarthana', 'purva karma'],
    generateResponse: (q) => {
      const isShirodhara = q.includes('shirodhara') || q.includes('takradhara') || q.includes('stress') || q.includes('head');

      if (isShirodhara) {
        return `### 💆 Shirodhara & Takradhara (Neuro-Therapeutic Relaxation)

Shirodhara is the continuous, rhythmic pouring of warm medicated herbal oil (*Ksheerabala, Chandanadi, Dhanwantharam*) or cooling medicated buttermilk (*Takradhara*) onto the forehead (*Ajna Chakra*).

#### Clinical Benefits Documented in Classical Shastra:
• **Neurological Rest**: Clinically proven to calm the sympathetic nervous system and stimulate vagus nerve parasympathetic activation.
• **Conditions Treated**: Chronic anxiety, insomnia (*Nidranasha*), tension headaches, hair thinning, hypertension, and burnout.
• **Hospital Setup**: Performed at AayuTatva Hospital using authentic carved wooden Droni tables under monitored clinical supervision.`;
      }

      return `### 🌸 The 5 Authentic Panchakarma Detoxification Therapies

> *दोषाः कदाचित् कुप्यन्ति जिता लङ्घनपाचनैः। जिताः संशोधनैर्ये तु न तेषां पुनरुद्भवः॥*  
> *(Charaka Samhita: Diseases subdued by fasting or herbal pacification may recur. But diseases uprooted through authentic Panchakarma bio-purification never return.)*

Panchakarma is not a luxury spa treatment; it is a clinical medical intervention designed to dislodge deep-seated metabolic toxins (*Ama*) and flush out vitiated Tridoshas from cellular tissues.

#### The 5 Classical Procedures (*Pradhana Karma*):
1. **Vamana (Therapeutic Emesis)**:
   - *Target Dosha*: Deep-seated Kapha congestion and lung toxins.
   - *Indications*: Chronic bronchitis, asthma, psoriasis, vitiligo, obesity, sluggish metabolism.
2. **Virechana (Therapeutic Purgation)**:
   - *Target Dosha*: Deep-seated Pitta heat from liver, gallbladder, and small intestine.
   - *Indications*: Liver disorders, chronic skin rashes, acidity, hormonal imbalances, eczema.
3. **Basti (Medicated Enema Therapy — The Master Therapy)**:
   - *Target Dosha*: Vata (responsible for 80 distinct medical disorders).
   - *Types*: *Anuvasana* (nourishing oil enema) and *Niruha / Asthapana* (cleansing herbal decoction enema).
   - *Indications*: Slip disc, sciatica, arthritis, neurological disorders, constipation, chronic fatigue.
4. **Nasya (Herbal Nasal Transmucosal Administration)**:
   - *Seat*: *"Nasa Hi Shiraso Dvaram"* (The nose is the gateway to the brain and head).
   - *Indications*: Sinusitis, migraine, cervical spondylosis, facial paralysis, memory enhancement.
5. **Raktamokshana (Blood Purification & Jalaukavacharana / Leech Therapy)**:
   - *Indications*: Chronic non-healing ulcers, varicose eczema, localized toxicity, alopecia areata.

#### Complete 3-Stage Hospital Protocol:
• **Purva Karma (Preparation)**: Internal oleation with medicated ghee (*Snehapana*) and herbal steam (*Swedana*) to liquefy toxins.  
• **Pradhana Karma**: The chosen cleansing therapy conducted by trained Panchakarma therapists.  
• **Pashchat Karma (Restoration)**: Strict graded dietary recovery (*Samsarjana Krama*) to rebuild digestive Agni.`;
    }
  },

  // 7. PEDIATRIC GROWTH, HEIGHT & SUVARNA PRASHAN
  {
    id: 'PEDIATRIC_GROWTH',
    title: 'Pediatric Growth, Height Consultation & Suvarna Prashan',
    sutra: 'सुवर्णप्राशनं हि एतत् मेधाग्निबलवर्धनम्। आयुष्यं मङ्गलं पुण्यं वृष्यं वर्ण्यं ग्रहापहम्॥ (Kashyapa Samhita)',
    keywords: ['height', 'growth', 'pediatric', 'child growth', 'teenager', 'puberty', 'suvarna prashan', 'epiphysis', 'tall', 'stunted', 'swarna prashan', 'masterclass', 'october', '20 oct'],
    generateResponse: () => {
      return `### 📏 Classical Ayurvedic Science of Height Growth & Pediatric Vitality

> *सुवर्णप्राशनं हि एतत् मेधाग्निबलवर्धनम्। आयुष्यं मङ्गलं पुण्यं वृष्यं वर्ण्यं ग्रहापहम्॥*  
> *(Kashyapa Samhita: Suvarna Prashan improves intelligence, digestive fire, physical stamina, immunity, complexion, and lifespan in growing children.)*

Height growth and skeletal development are governed by **Asthi Dhatu Poshana** (nourishment of bone tissue) and the metabolic transformation of **Meda Dhatu** (adipose tissue) under the regulation of pituitary and thyroid functions.

#### Scientific Pillars of Height Potential (Ages 8 to 21):
1. **Epiphyseal Growth Plates**: Long bones (femur, tibia, fibula) grow at specialized cartilaginous zones called growth plates. As long as these plates remain open before complete post-pubertal fusion, targeted Ayurvedic nutrition and hormonal balance can optimize natural height gains.
2. **Suvarna Prashan (Classical Pediatric Rasayana)**: 24K purified nano-gold ash (*Swarna Bhasma*) fortified with Medhya herbs (Brahmi, Shankhpushpi, Vacha) in pure cow ghee and honey, administered especially on **Pushya Nakshatra** to enhance neuro-endocrine coordination, cellular metabolism, and physical stamina.
3. **Asthi-Majja Rasayana Herbs**: Classical herbs like *Ashwagandha* (increases human growth hormone secretagogues), *Shatavari*, *Praval Pishti* (natural bioavailable coral calcium), and *Lakshadi Guggulu* nourish skeletal tensile strength.
4. **Spinal Decompression & Yoga Asanas**: Daily performance of *Tadasana*, *Vrikshasana*, *Bhujangasana*, and hanging bar exercises open the intervertebral disc spaces and stimulate epiphyseal cellular division.

#### 🌟 20th October 2026 Height Growth Masterclass:
AayuTatva Hospital conducts specialized Height Growth Masterclasses covering clinical pulse examination, bone plate assessment, personalized herbal regimes, and exercise protocols.`;
    }
  },

  // 8. 100% CASHLESS MEDICLAIM INSURANCE
  {
    id: 'CASHLESS_INSURANCE',
    title: '100% Cashless Mediclaim Insurance & Hospital Admissions',
    sutra: 'NABH Quality Accredited Healthcare · IRDAI AYUSH Cashless Benefit',
    keywords: ['insurance', 'mediclaim', 'cashless', 'nabh', 'tpa', 'star health', 'hdfc ergo', 'icici', 'care', 'claim', 'hospital admission', 'reimbursement', 'free treatment', 'policy'],
    generateResponse: () => {
      return `### 🏥 100% Cashless Mediclaim Insurance at AayuTatva Hospital

AayuTatva Ayurvedic Hospital & Panchakarma Centre in Bhandara is proud to be **NABH (National Accreditation Board for Hospitals & Healthcare Providers) Accredited**.

Under Government of India and **IRDAI (Insurance Regulatory and Development Authority of India)** guidelines, health insurance policies must provide parity coverage for AYUSH (Ayurveda) inpatient treatments.

#### Cashless Insurance Desk Highlights:
• **Accepted Insurance Providers**:
  - Star Health & Allied Insurance
  - HDFC ERGO General Insurance
  - ICICI Lombard Health Care
  - Care Health Insurance (Religare)
  - Niva Bupa Health Insurance (Max Bupa)
  - Bajaj Allianz, SBI General, Tata AIG, etc.
• **Accepted TPAs (Third Party Administrators)**: Medi Assist, Vidal Health, FHPL, Raksha TPA, Heritage Health, Paramount, MD India.
• **Eligible Inpatient Admissions**: Non-surgical spine treatments (*Kati Basti, Basti*), severe disc herniations, knee osteoarthritis (*Janu Basti*), chronic sciatica, paralytic rehabilitation, and full Panchakarma detox stays.
• **Zero Out-of-Pocket Worry**: Our hospital insurance desk manages initial pre-authorization paperwork, doctor clinical justification summaries, and discharge approvals directly with the insurer.

#### Documents Needed for Cashless Pre-Authorization:
1. Health Insurance Policy Card or Policy PDF.
2. Patient Government Photo ID (Aadhaar Card / PAN Card).
3. Previous doctor prescriptions, MRI reports, or X-rays.`;
    }
  },

  // 9. SKIN, ECZEMA & PSORIASIS (KUSHTHA)
  {
    id: 'SKIN_KUSHTHA',
    title: 'Ayurvedic Dermatology, Psoriasis & Eczema (Kushtha & Kitibha)',
    sutra: 'वातपित्तकफा दुष्टाः त्वग्रक्तमांसलसिकाः। दूषयन्ति स कुष्ठानां सप्तको द्रव्यसंग्रहः॥ (Charaka Samhita)',
    keywords: ['skin', 'psoriasis', 'eczema', 'kushtha', 'itching', 'allergy', 'rash', 'urticaria', 'sheetapitta', 'dermatitis', 'blood purification', 'pimples', 'acne', 'vitiligo', 'leucoderma'],
    generateResponse: () => {
      return `### 🌺 Ayurvedic Dermatology & Chronic Skin Healing (*Kushtha Roga*)

> *वातपित्तकफा दुष्टाः त्वग्रक्तमांसलसिकाः। दूषयन्ति स कुष्ठानां सप्तको द्रव्यसंग्रहः॥*  
> *(Charaka Samhita: Chronic skin disorders involve the vitiation of all 3 Doshas combined with 4 bodily substrates: skin, blood, muscle, and lymphatic fluid—forming the 7 causative factors.)*

Unlike modern symptomatic steroid creams that merely suppress skin eruptions, Ayurveda treats skin disorders as deep metabolic impurities lodged in the **Rakta Dhatu** (blood tissue) and **Lasika** (lymphatic circulation).

#### Hospital Treatment Protocols at AayuTatva:
1. **Classical Virechana (Therapeutic Purgation)**: The definitive therapy to purge acidic, overheated Pitta from the liver and vascular system, halting chronic scaling and skin inflammation.
2. **Jalaukavacharana (Medicinal Leech Therapy)**: Sterile medical leeches applied directly over stubborn psoriatic plaques or varicose eczema. The leech saliva injects over 100 bioactive compounds (Hirudin, Bdellins) that improve micro-vascular perfusion and dissolve toxic congestion.
3. **Takradhara**: Medicated cooling buttermilk infused with *Musta* and *Amalaki* poured gently over the body to soothe fiery burning and scaling.
4. **Blood-Purifying Formulations (*Rakta Shodhaka*)**: Formulations containing *Manjistha*, *Khadira*, *Sariva*, *Nimba*, and *Guduchi* purify systemic toxins.

#### Dietary Precautions for Skin Disorders:
• **Strictly Avoid**: Curd (yogurt), fermented dosa/idli batters, pickles, deep-fried fast foods, sour tomatoes, brinjal (eggplant), and fish combined with milk.  
• **Favor**: Bitter gourd (*Karela*), bottle gourd (*Lauki*), mung bean soup, pomegranate, neem water, and pure cow ghee.`;
    }
  },

  // 10. STRESS, ANXIETY & SLEEP (CHITTODVEGA & NIDRANASHA)
  {
    id: 'STRESS_INSOMNIA',
    title: 'Anxiety, Chronic Stress & Sleep Disorders (Chittodvega & Nidranasha)',
    sutra: 'निद्रावित्तं सुखं दुःखं पुष्टिः कार्श्यं बलाबलम्। वृषता क्लीबcarried ज्ञानाज्ञानं जीवितं न च॥ (Charaka Samhita)',
    keywords: ['stress', 'anxiety', 'sleep', 'insomnia', 'depression', 'mental', 'tension', 'brain', 'calm', 'restless', 'nidra', 'panic', 'headache', 'tired', 'fatigue', 'mind'],
    generateResponse: () => {
      return `### 🧠 Classical Ayurvedic Neuro-Balancing for Stress & Sleep

> *निद्रावित्तं सुखं दुःखं पुष्टिः कार्श्यं बलाबलम्॥*  
> *(Charaka Samhita: Happiness, misery, physical nourishment, strength, virility, knowledge, and life itself depend upon proper restorative sleep.)*

In classical Ayurveda, chronic stress, racing thoughts, and sleep deprivation (*Nidranasha*) are caused by aggravated **Prana Vata** (which over-activates the nervous system) and high **Sadhaka Pitta** (which causes emotional restlessness and temperature surges).

#### Hospital Neuro-Regenerative Therapies at AayuTatva:
1. **Shirodhara / Takradhara**: The rhythmic pouring of warm *Ksheerabala Taila* or cooling medicated *Takra* over the third eye (*Sthapani Marma*), activating parasympathetic cranial nerves and dramatically reducing serum cortisol.
2. **Nasya with Ksheerabala 101 or Ghee**: Transmucosal herbal delivery directly into the olfactory channels (*Nasa Hi Shiraso Dvaram*) to soothe cranial tension.
3. **Shiroabhyanga & Padaabhyanga**: Massaging the scalp and the soles of the feet with warm sesame or *Brahmi Taila* at bedtime to ground wandering Vata energy.
4. **Classical Medhya Rasayana Herbs**: Herbs such as *Brahmi*, *Shankhpushpi*, *Ashwagandha*, and *Jatamansi* support neuro-synaptic health and promote natural, non-habit-forming sleep.

#### Ayurvedic Sleep Hygiene (Dinacharya Tips):
• Stop looking at mobile / laptop blue screens 60 minutes before bedtime.  
• Drink warm A2 cow milk with a pinch of nutmeg (*Jaiphal*) and turmeric.  
• Practice 5 minutes of *Bhramari Pranayama* (humming bee breath) in a dark, quiet room.`;
    }
  },

  // 11. DIGESTION, ACIDITY & CONSTIPATION (AMLAPITTA & VIBANDHA)
  {
    id: 'DIGESTION_ACIDITY_CONSTIPATION',
    title: 'Acidity, GERD, Constipation & Gut Health (Amlapitta & Vibandha)',
    sutra: 'शान्तेऽग्नौ म्रियते युक्ते चिरं जीवत्यनामयः। रोगी स्याद्विकृते मूलमग्निस्तस्मान्निरुच्यते॥ (Charaka Samhita, Chi. 15)',
    keywords: ['acidity', 'acid', 'gerd', 'heartburn', 'constipation', 'pet', 'gas', 'bloating', 'ibs', 'grahani', 'amlapitta', 'vibandha', 'motions', 'kabz', 'stomach', 'ulcer', 'piles', 'bawasir'],
    generateResponse: (q) => {
      const isAcidity = q.includes('acidity') || q.includes('acid') || q.includes('gerd') || q.includes('heartburn') || q.includes('amlapitta');

      if (isAcidity) {
        return `### 🔥 Classical Ayurvedic Protocol for Hyperacidity (*Amlapitta*)

In Ayurveda, hyperacidity and acid reflux (*Amlapitta*) occur when the digestive Pitta becomes excessively sour (*Amla Guna*) and burning (*Vidagdha*), inflaming the stomach lining and esophagus.

#### Root Causes in Shastra:
• Irregular meal times, skipping meals, eating late at night.  
• Excess tea, coffee, smoking, refined green/red chilies, and fried foods.  
• Suppressing natural burping or hunger urges (*Vega Dharana*).

#### Ayurvedic Remedies & Protocols:
• **Soothing Herbs**: *Kamadudha Rasa*, *Sutshekhar Rasa*, *Avipattikar Churna*, and *Amalaki (Amla)* naturally neutralize gastric pH without suppressing natural digestive fire.  
• **Takra (Medicated Buttermilk)**: Churned buttermilk spiced with roasted cumin (*Jeera*) and rock salt (*Saindhava*) acts as nectar for inflamed stomach mucosa.  
• **Simple Home Remedy**: Soak 1 tablespoon of coriander seeds and 1 teaspoon of fennel seeds in water overnight; drink the strained water in the morning.`;
      }

      return `### 🌿 Ayurvedic Relief for Chronic Constipation (*Vibandha*) & Bloating

> *सर्वेषां रोगाणां निदानं कुपितो मलः॥*  
> *(All systemic diseases begin with sluggish elimination and accumulated metabolic waste.)*

Constipation (*Vibandha*) is a classical disorder of **Apana Vata** (the downward flowing energy governing the colon and pelvic floor). When dryness (*Rukshata*) increases in the large intestine, stools become hard, painful, and difficult to pass.

#### Natural Colon Regulation at AayuTatva Hospital:
1. **Matra Basti**: Gentle medicated oil enemas using warm sesame oil or *Sahacharadi Taila*, instantly lubricating dry colonic walls and restoring natural peristalsis.
2. **Herbal Re-educators**: Classical formulations like *Triphala Churna*, *Castor Oil (Eranda Sneha)* with warm milk, and *Isabgol* gently stimulate elimination without causing bowel dependency.
3. **Daily Fiber & Hydration**: Drink 2 glasses of lukewarm water first thing in the morning (*Ushapan*). Add 1 teaspoon of pure cow ghee to warm dal or soup to lubricate intestinal tissues.`;
    }
  },

  // 12. WOMEN'S HEALTH, PCOS & HORMONES (ARTAVA DUSHTI)
  {
    id: 'WOMENS_HEALTH_HORMONES',
    title: "Women's Health, PCOS, Thyroid & Hormonal Harmony (Artava & Yonivyapat)",
    sutra: 'योनिरोगे समुत्पन्ने न गर्भाधानसम्भवः। (Sushruta Samhita)',
    keywords: ['pcos', 'pcod', 'period', 'periods', 'menstrual', 'hormone', 'hormonal', 'thyroid', 'infertility', 'conceive', 'pregnancy', 'garbhadhana', 'white discharge', 'leucorrhea', 'artava', 'cramps'],
    generateResponse: () => {
      return `### 🌸 Ayurvedic Holistic Management of PCOS, Thyroid & Women's Hormones

In Ayurveda, menstrual irregularities, polycystic ovarian syndrome (PCOS), and hormonal imbalances fall under **Artava Dushti** and **Granthi Roga**—primarily caused by **Kapha-Vata blockage** obstructing the ovarian channels (*Artavavaha Srotas*).

#### The 4-Pillar Clinical Treatment:
1. **Srotoshodhana (Channel Clearance)**: Utilizing classical herbs like *Kanchanar Guggulu*, *Varunadi Kwath*, and *Chitrakadi Vati* to dissolve ovarian cysts and clear metabolic sluggishness (*Meda-Dhatvagni Mandya*).
2. **Uttara Basti (Specialized Local Therapy)**: Direct intrauterine administration of medicated sterile herbal ghee (*Phala Ghrita*) to tone the endometrial lining and stimulate ovulatory follicles.
3. **Virechana & Basti Detox**: Purging excess circulating hormones and revitalizing the liver's estrogen-clearing pathway.
4. **Rasayana Tonics**: *Shatavari* (phyto-estrogenic adaptogen), *Ashoka*, *Lodhra*, and *Kumaryasava* nourish the reproductive tissues (*Shukra/Artava Dhatu*).

#### Lifestyle Rules for Hormonal Health:
• Minimize refined sugar, bakery foods, and non-organic dairy that mimic artificial estrogens.  
• Engage in daily brisk walking, Surya Namaskars, and *Baddha Konasana* (butterfly pose) to boost pelvic circulation.`;
    }
  },

  // 13. WEIGHT MANAGEMENT & FATTY LIVER (STHAULYA & MEDOROGA)
  {
    id: 'WEIGHT_METABOLISM',
    title: 'Ayurvedic Weight Management, Fatty Liver & Metabolism (Sthaulya & Medoroga)',
    sutra: 'गुरु चातर्पणं चेष्टं स्थूलानां कर्शनं प्रति। (Charaka Samhita)',
    keywords: ['weight', 'fat', 'obesity', 'belly', 'slimming', 'lose weight', 'cholesterol', 'fatty liver', 'sthaulya', 'medoroga', 'metabolism', 'lipid', 'triglycerides'],
    generateResponse: () => {
      return `### ⚖️ Ayurvedic Metabolic Reset for Healthy Weight & Liver Vitality

> *गुरु चातर्पणं चेष्टं स्थूलानां कर्शनं प्रति॥*  
> *(Charaka Samhita: Weight reduction in Ayurveda requires foods that are satisfying and bulky in nature, but low in caloric density and nourishing without creating Ama.)*

Ayurveda approaches weight gain not by crash starvation, but by igniting **Medo-Dhatvagni** (fat metabolic fire). When digestive fire is weak, calories turn directly into dense *Ama* and sticky fat tissue (*Meda Dhatu*), leading to central obesity and fatty liver (*Yakrit Vikara*).

#### Authentic Therapies at AayuTatva Hospital:
1. **Udwarthana (Herbal Powder Scrub)**: Vigorous, upward lymphatic scrub using dry medicinal powders (*Kolakulathadi Churna, Triphala, Musta*). It breaks down subcutaneous fat, improves skin tone, and activates cellular metabolism.
2. **Lekhana Basti**: Specialized medicinal enemas formulated with *Triphala*, *Gomutra*, *Madhu (honey)*, and scraping herbs (*Lekhana Dravyas*) to mobilize stubborn visceral fat.
3. **Yakrit Shodhana (Liver Detox)**: Formulations containing *Arogyavardhini Vati*, *Punarnavarishta*, and *Bhumiamalaki* protect hepatocytes, reverse fatty liver, and normalize lipid profiles.

#### 3 Essential Daily Habits:
• Drink warm water infused with dry ginger (*Sunthi*) and cumin throughout the day.  
• Strictly avoid sleeping during daytime (*Diva Swapna*), which triggers immediate Kapha-fat accumulation.  
• Eat your last meal of the day before 7:30 PM, keeping it light (such as vegetable soup or roasted millets).`;
    }
  },

  // 14. DOCTOR APPOINTMENTS & CLINIC TIMINGS
  {
    id: 'APPOINTMENTS_CLINIC',
    title: 'Dr. Manish Yerpude Consultation, Address & Timings',
    keywords: ['doctor', 'manish', 'yerpude', 'timing', 'hours', 'appointment', 'address', 'location', 'fees', 'where', 'bhandara', 'map', 'directions', 'visiting'],
    generateResponse: () => {
      return `### 👨‍⚕️ Clinic Details & Doctor Consultation

**AayuTatva Ayurvedic Hospital & Panchakarma Centre**  
*NABH Quality Accredited Healthcare Facility*

• **Chief Medical Director**: **Dr. Manish Santosh Yerpude** [B.A.M.S. (MUHS Nashik), MD (AM), P.G.P.P. Pune]
• **Specializations**: Nadi Parikshan (Pulse Diagnosis), Non-Surgical Spine & Sciatica Management, Knee & Joint Preservation, Pediatric Growth, Classical Panchakarma Inpatient Detox.
• **Hospital Address**: 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904.
• **OPD Timings**:
  - **Morning Session**: 10:00 AM – 2:00 PM (Daily)
  - **Evening Session**: 5:00 PM – 8:00 PM (Daily)
• **Direct Telephone**: [+91 77588 16074](tel:+917758816074)
• **Direct WhatsApp**: [+91 77588 16074](https://wa.me/917758816074)

*Prior appointment is recommended for detailed pulse examination and Panchakarma evaluations.*`;
    }
  }
];

function matchesKeyword(query: string, keyword: string): boolean {
  if (keyword.length <= 4) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    return regex.test(query);
  }
  return query.includes(keyword);
}

export function generateInternalAyurvedicResponse(
  userMessage: string,
  history: ChatMessage[] = [],
  userDoshaProfile?: DoshaProfile | null
): InternalAIResponse {
  const query = (userMessage || '').toLowerCase().trim();

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
  let topicTitle = 'Ayurvedic Health & Wellness Intelligence';

  if (matchedTopic) {
    detailedBody = matchedTopic.generateResponse(query, userDoshaProfile, history);
    intent = matchedTopic.id;
    topicTitle = matchedTopic.title;
  } else {
    // Comprehensive default response honoring Shastra
    detailedBody = `### 🌿 Ayurvedic Shastra Perspective on Your Query

Thank you for your inquiry regarding **"${userMessage.slice(0, 75)}"**.

In classical Ayurveda, optimal health is defined in *Sushruta Samhita* (Sutrasthana 15.41):
> *समदोषः समाग्निश्च समधातुमलक्रियः। प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते॥*  
> *(One who has balanced Doshas, balanced digestive fire, healthy tissue metabolism, proper excretion of wastes, and a blissful soul, senses, and mind is truly healthy.)*

#### Holistic Pillars for Balanced Wellbeing:
1. **Tridosha Balance**: Every bodily tissue is governed by Vata (nervous & motor activity), Pitta (digestion & hormonal heat), and Kapha (structural stability & immunity).
2. **Digestive Fire (*Jatharagni*)**: Good health begins in the gut. Weak digestion produces undigested toxins (*Ama*), which block microscopic bodily channels (*Srotas*).
3. **Daily Routine (*Dinacharya*) & Diet (*Ahara*)**: Consuming warm, freshly cooked foods suited to your elemental constitution and sleeping before 10:30 PM grounds your biological rhythms.

Because individual physiology (*Deha Prakriti*) and current imbalances (*Vikriti*) are uniquely individual, precise clinical treatments and herbal formulations are customized following in-person pulse palpation (*Nadi Parikshan*).`;
  }

  const encodedQuery = encodeURIComponent(
    `Hello Dr. Manish Yerpude, I was consulting AayuVaidya AI on the website regarding: "${userMessage.slice(0, 80)}". Please guide me on treatment at AayuTatva Hospital.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedQuery}`;
  const phoneDialUrl = `tel:${PRIMARY_PHONE}`;

  const ctaSection = `---
🏥 **Connect with Dr. Manish Santosh Yerpude at AayuTatva Hospital:**
• 📞 **Direct Call**: [**+91 77588 16074**](${phoneDialUrl}) *(Tap to Open Dialpad)*
• 💬 **WhatsApp**: [**Chat on WhatsApp**](${whatsappUrl}) *(Tap to Open WhatsApp Chat)*
• 📍 **Hospital**: 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904
• ⏰ **OPD Hours**: 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM (Monday to Sunday)
• 🛡️ **Facilities**: NABH-Accredited IPD · 100% Cashless Mediclaim with Star Health, HDFC ERGO, ICICI Lombard, Care, and all leading TPAs.`;

  const completeReply = `**[AayuVaidya In-House Ayurvedic Intelligence · Classical Shastra Knowledge]**

${detailedBody}

${ctaSection}`;

  return {
    reply: completeReply,
    source: 'aayutatva-internal-engine',
    intent,
    topicTitle,
    phone: PRIMARY_PHONE,
    whatsappUrl
  };
}
