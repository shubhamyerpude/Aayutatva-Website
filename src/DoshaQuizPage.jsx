import React, { useState } from 'react';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight, Phone, ShieldCheck, 
  Activity, BookOpen, Heart, Sparkles, Droplets, Waves, Leaf, Compass,
  MessageCircle, RefreshCw, Award, Check, ChevronRight, Stethoscope,
  Info, Thermometer, Moon, Zap, User
} from 'lucide-react';
import './subpages.css';
import './portal.css';
import { SiteHeader, phonePrimary, whatsappPhone } from './SiteHeader.jsx';

export function DoshaQuizPage() {
  const [lang, setLang] = useState('mr'); // Default to Marathi for Maharashtra / Vidarbha patients
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const QUIZ_DATA = {
    mr: {
      heroOverline: 'आयुर्वेदिक देह प्रकृती व नाडी परीक्षण चाचणी',
      heroTitle: 'तुमची शारीरिक प्रकृती जाणून घ्या,',
      heroTitleEm: 'शास्त्रीय आयुर्वेदाच्या आधारावर.',
      heroDesc: 'आयुर्वेदात प्रत्येकाचे शरीर आणि आजार वेगवेगळे असतात. तुमची वात, पित्त आणि कफ या त्रिदोषांची रचना समजून घेऊन डॉ. मनीष येरपुडे यांच्या मार्गदर्शनाखाली अचूक दिनचर्या, आहार व पंचकर्म उपचार मिळवा.',
      badge1: '४ शास्त्रीय परीक्षण निकष',
      badge2: 'नाडी परीक्षा (पल्स गती) विश्लेषण',
      badge3: 'अस्सल संस्कृत श्लोक व आधुनिक संशोधन',
      badge4: 'डॉ. मनीष येरपुडे यांचे क्लिनिकल मार्गदर्शन',
      questionOf: 'प्रश्न',
      of: 'पैकी',
      prevBtn: 'मागील प्रश्न',
      nextBtn: 'पुढील प्रश्न',
      analyzeBtn: 'प्रकृती व नाडी विश्लेषण पहा',
      evalComplete: 'शास्त्रीय प्रकृती परीक्षण पूर्ण',
      yourPrakritiIs: 'तुमची आयुर्वेदिक देह प्रकृती:',
      predominant: 'प्रधान',
      dualConstitution: 'द्विदोषात्मक प्रकृती (द्विदोषाज)',
      vataDesc: 'मज्जासंस्था, हालचाल, श्वासोच्छ्वास व रक्ताभिसरण नियंत्रित करतो',
      pittaDesc: 'पचन, चयापचय (मेटाबॉलिझम), शरीराची उष्णता व दृष्टी नियंत्रित करतो',
      kaphaDesc: 'शारीरिक स्थिरता, सांध्यांचे वंगण व रोगप्रतिकारशक्ती (ओजस) वाढवतो',
      physiologyHeading: 'शारीरिक रचना व दोष प्रकृती लक्षणे',
      elementsLabel: 'प्रमुख महाभूते:',
      gunasLabel: 'प्रधान गुण:',
      nadiHeading: 'शास्त्रीय नाडी परीक्षण (रेडियल पल्स) विश्लेषण',
      nadiTag: 'आयुर्वेदिक नाडी परीक्षा पद्धत',
      nadiClinicalLabel: 'आयूतत्त्व हॉस्पिटलमधील क्लिनिकल महत्त्व:',
      researchHeading: 'आधुनिक विज्ञान व आयुर्जेनॉमिक्स संशोधन',
      researchCitation: 'आंतरराष्ट्रीय शोधपत्रिकांद्वारे सिद्ध झालेले आयुर्वेदिक फेनोटायपिंग व नाडी विश्लेषण.',
      nourishingFoods: 'हितकर आहार (काय खावे / काय टाळावे)',
      favoredLabel: 'हितकर व पोषक आहार:',
      avoidLabel: 'टाळावे किंवा कमी करावे:',
      hospitalTherapies: 'हॉस्पिटलमधील शिफारस केलेले पंचकर्म उपचार',
      verifyPulseTitle: 'डॉ. मनीष येरपुडे यांच्याकडून प्रत्यक्ष नाडी तपासा',
      verifyPulseDesc: 'ऑनलाईन चाचणीतून सामान्य प्रकृती समजते. परंतु जुनाट आजार, विकृती आणि अवयवांची कार्यक्षमता समजण्यासाठी प्रत्यक्ष हाताची नाडी परीक्षा (Nadi Parikshan) आवश्यक असते.',
      aiBtn: 'AayuVaidya AI सह चर्चा करा',
      whatsappBtn: 'डॉक्टरांशी WhatsApp वर संपर्क साधा',
      inPersonBtn: 'प्रत्यक्ष भेटीची वेळ निश्चित करा',
      retakeBtn: 'पुन्हा चाचणी द्या',
      questions: [
        {
          id: 'body_frame',
          category: '१. शारीरिक बांधा (देह प्रकृती)',
          icon: <User size={18}/>,
          q: 'तुमची नैसर्गिक शारीरिक ठेवण व हाडांची रचना कशी आहे?',
          subtext: 'चरक संहितेतील शास्त्रीय देह प्रकृती लक्षणानुसार परीक्षण.',
          options: [
            {
              label: 'बारीक अंगकाठी, हलकी हाडे, सांधे ठळक, चपळ हालचाली, वजन वाढण्यास अडचण',
              dosha: 'Vata',
              trait: 'वात (वायू व आकाश) शरीराला हलकेपणा व चपळता देतो.'
            },
            {
              label: 'मध्यम बांधा, प्रमाणबद्ध स्नायू, योग्य आहाराने वजन नियंत्रणात राहते',
              dosha: 'Pitta',
              trait: 'पित्त (अग्नी व जल) शरीराला उष्णता व उत्तम चयापचय देतो.'
            },
            {
              label: 'रुंद खांदे, भरभक्कम हाडे, मजबूत बांधा, वजन सहज वाढते व टिकून राहते',
              dosha: 'Kapha',
              trait: 'कफ (पृथ्वी व जल) शरीराला स्थिरता व ताकद देतो.'
            }
          ]
        },
        {
          id: 'digestion',
          category: '२. पचनशक्ती व भूक (जठराग्नी)',
          icon: <Zap size={18}/>,
          q: 'दैनंदिन जीवनात तुमची भूक आणि पचन कसे असते?',
          subtext: 'आयुर्वेदानुसार जठराग्नी हे आरोग्याचे मूळ असून सर्व आजार बिघडलेल्या अग्नीमुळे होतात.',
          options: [
            {
              label: 'अनियमित (विषमाग्नी): कधी खूप भूक तर कधी अजिबात नाही, गॅस, पोट फुगणे किंवा बद्धकोष्ठता',
              dosha: 'Vata',
              trait: 'वाताच्या चंचल हालचालींमुळे भूक सतत बदलत राहते.'
            },
            {
              label: 'तीव्र (तीक्ष्णाग्नी): जेवणाची वेळ चुकल्यास चिडचिड, ऍसिडिटी, छातीत जळजळ, पातळ शौच',
              dosha: 'Pitta',
              trait: 'पित्ताच्या अतिरिक्त उष्णतेमुळे पोटात तीव्र जळजळ होते.'
            },
            {
              label: 'मंद (मंदाग्नी): कमी भूक, जेवणानंतर अनेक तास सुस्ती, आळस व पोटात जडपणा',
              dosha: 'Kapha',
              trait: 'कफाच्या जड गुणामुळे अन्न पचायला जास्त वेळ लागतो.'
            }
          ]
        },
        {
          id: 'climate',
          category: '३. हवामान व तापमान सहनशीलता (शीत / उष्ण)',
          icon: <Thermometer size={18}/>,
          q: 'हवामानातील बदलांविषयी तुमची नैसर्गिक सहनशीलता कशी आहे?',
          subtext: 'आयुर्वेदिक ऋतुचर्येनुसार शरीराची नैसर्गिक तापमान प्रतिक्रिया.',
          options: [
            {
              label: 'थंडी व गार वारे सहन होत नाहीत; उबदार कपडे, गरम पेये आणि उन्हाळा जास्त आवडतो',
              dosha: 'Vata',
              trait: 'थंड संवेदनशीलता: शरीराला सतत उबदारपणाची गरज असते.'
            },
            {
              label: 'उन्हाळा, कडक ऊन व उष्णता सहन होत नाही; सावली, एसी व थंड पेये हवी असतात',
              dosha: 'Pitta',
              trait: 'उष्ण संवेदनशीलता: शरीरात आधीच उष्णता जास्त असते.'
            },
            {
              label: 'ओलसर, दमट व ढगाळ हवामान नकोसे वाटते; कोरड्या, उबदार आणि हवेशीर हवेत छान वाटते',
              dosha: 'Kapha',
              trait: 'ओलसरपणा नकोसा: शरीराला कोरडेपणा व व्यायामाची गरज असते.'
            }
          ]
        },
        {
          id: 'mind_sleep',
          category: '४. मन, स्वभाव व झोप (मानस प्रकृती व निद्रा)',
          icon: <Moon size={18}/>,
          q: 'ताणतणाव आल्यास तुमची मानसिक प्रतिक्रिया आणि झोप कशी असते?',
          subtext: 'मानस प्रकृती आणि मज्जासंस्थेचे शास्त्रीय अवलोकन.',
          options: [
            {
              label: 'अतिविचार, अस्वस्थता, लवकर चिंता वाटणे; हलकी झोप, आवाजाने लगेच जाग येते',
              dosha: 'Vata',
              trait: 'चंचल वात मज्जासंस्थेला अतिउत्तेजित करतो.'
            },
            {
              label: 'कामात परिपूर्णता, अधीरता, राग लवकर येणे; ६-७ तास शांत झोप, सकाळी लवकर जाग',
              dosha: 'Pitta',
              trait: 'तीक्ष्ण पित्त मनाला तीव्र एकाग्रता व ऊर्जा देतो.'
            },
            {
              label: 'शांत, संयमी, शांतपणे विचार करणे; ८+ तास गाढ झोप, सकाळी उठण्यास आळस',
              dosha: 'Kapha',
              trait: 'स्थिर कफ मानसिक स्थैर्य आणि गाढ झोप देतो.'
            }
          ]
        }
      ],
      doshaInsights: {
        Vata: {
          element: 'वायू + आकाश महाभूत',
          qualities: 'रूक्ष (कोरडा), लघु (हलका), शीत (थंड), खर (खडबडीत), सूक्ष्म, चल (चंचल)',
          title: 'वात प्रधान प्रकृती',
          tagline: 'हालचाली, मज्जासंस्था आणि रक्ताभिसरणाचे नियंत्रण करणारा मुख्य दोष',
          overview: 'तुमच्या प्रकृतीत वायू आणि आकाश तत्त्वांचे प्राधान्य आहे. वात प्रकृतीचे लोक उत्साही, कल्पक, चपळ आणि जलद निर्णय घेणारे असतात. वात समतोल असताना शरीरात प्रचंड उत्साह व चैतन्य असते. परंतु वात बिघडल्यास सांधेदुखी, कंबरदुखी, सायटिका, गॅस, बद्धकोष्ठता आणि झोप न येणे (अनिद्रा) यांसारखे त्रास होतात.',
          nadiName: 'सर्प गती (नागासारखी वळणदार नाडी)',
          nadiSanskrit: '“सर्पवद् वल्गते नाडी वातेन कुटिला च सा। द्रुता च कम्पते मुहुर्मुहुश्चैव प्रचाल्यते॥”',
          nadiSource: '— शारंगधर संहिता (प्रथम खंड ८.४)',
          nadiTranslation: '“वाताचा प्रकोप झाल्यास हाताची नाडी नागासारखी (सर्प गती) जलद, बारीक, वळणदार व कंप पावत तर्जनी बोटाखाली धावते.”',
          nadiClinical: 'डॉ. मनीष येरपुडे यांच्या हाताच्या पहिल्या बोटाखाली (तर्जनी) नाडीची सर्प गती जाणवते. जलद आणि बारीक नाडी मज्जासंस्थेचा ताण, मणक्यांमधील कोरडेपणा किंवा जुनाट वातरोग दर्शवते.',
          researchTitle: 'आयुर्जेनॉमिक्स व मज्जासंस्था संशोधन (Journal of Translational Medicine)',
          researchStudy: 'आधुनिक जनुक संशोधनात सिद्ध झाले आहे की वात प्रकृतीच्या लोकांमध्ये डोपामाइन (DBH) आणि मज्जासंस्थेच्या न्यूरो-सिग्नलिंगशी संबंधित जनुकांची विशिष्ट रचना असते, ज्यामुळे त्यांच्यात संवेदनशीलता जास्त असते.',
          dietaryFavored: 'उबदार, ताजे शिजवलेले स्निग्ध अन्न, शुद्ध गाईचे तूप, तीळ तेल, सुंठ, जिरे, दालचिनी, हिंग, गरम सूप व गरम पाणी.',
          dietaryAvoided: 'थंड पदार्थ, शिळे अन्न, कच्ची सॅलड, कोरडे स्नॅक्स, फ्रीजमधील थंड पाणी, अति प्रमाणात चहा-कॉफी आणि उपवास.',
          panchakarmaTherapies: [
            'कटी बस्ती व जानू बस्ती (मणके, कंबरदुखी व गुडघेदुखीसाठी कोमट औषधी तेलाचे बंध)',
            'शिरोधारा (ब्राह्मी तेलाने कपाळावर संतत धार - निद्रानाश व मानसिक शांततेसाठी)',
            'मात्रा बस्ती व कषाय बस्ती (पोटातील वात मुळापासून शांत करण्यासाठी औषधी काढा व तेल बस्ती)',
            'तक्रधारा (औषधी ताकाची धार - मज्जासंस्थेला थंडावा देण्यासाठी)'
          ]
        },
        Pitta: {
          element: 'अग्नी + जल महाभूत',
          qualities: 'उष्ण (गरम), तीक्ष्ण, लघु (हलका), स्निग्ध (सस्नेह), द्रव (पातळ)',
          title: 'पित्त प्रधान प्रकृती',
          tagline: 'पचनशक्ती, चयापचय (मेटाबॉलिझम) आणि बुद्धिमत्ता नियंत्रित करणारा अग्नी',
          overview: 'तुमच्या प्रकृतीत अग्नी आणि जल तत्त्वांचे प्राधान्य आहे. पित्त प्रकृतीचे लोक कुशाग्र बुद्धिमत्ता, उत्तम पचनशक्ती आणि नेतृत्वगुणांनी संपन्न असतात. पित्त संतुलित असल्यास चेहऱ्यावर तेज, उत्तम भूक व निर्णयक्षमता असते. पित्त बिघडल्यास ऍसिडिटी, छातीत जळजळ, त्वचेवर लाल पुरळ, मायग्रेन, डोकेदुखी व चिडचिड वाढते.',
          nadiName: 'मंडूक गती (बेडकासारखी उडी मारणारी नाडी)',
          nadiSanskrit: '“मण्डूकवद् उत्पत्य गच्छति पित्तेन दीप्यते। चपला तरला नाडी मध्यमाङ्गुलिगामिनी॥”',
          nadiSource: '— योगरत्नाकर (नाडी परीक्षा विधी)',
          nadiTranslation: '“पित्ताचे प्राबल्य असताना नाडी बेडकासारखी (मंडूक गती) उसळणारी, उडी मारणारी व वेगवान अशी मधल्या बोटाखाली जाणवते.”',
          nadiClinical: 'डॉ. मनीष येरपुडे यांच्या मधल्या बोटाखाली नाडीची उछलणारी मंडूक गती जाणवते. ही नाडी यकृतातील उष्णता, उच्च रक्तदाबाची प्रवृत्ती किंवा तीव्र ऍसिडिटी दर्शवते.',
          researchTitle: 'बायोमार्कर्स व दाहक जनुक संशोधन (Indian Journal of Medical Research)',
          researchStudy: 'आयजेएमआरमधील क्लिनिकल संशोधनानुसार पित्त प्रकृतीच्या लोकांमध्ये इन्फ्लेमेटरी मार्कर्स (TNF-alpha, IL-6) आणि CYP2C19 जनुकांची उच्च क्रियाशीलता आढळते.',
          dietaryFavored: 'थंड व गोड गुणधर्माचे पदार्थ: गाईचे शुद्ध तूप, धने-जिरे पाणी, नारळ पाणी, डाळिंब, मनुके, दुधी भोपळा, मूग डाळ.',
          dietaryAvoided: 'अति तिखट, मसालेदार, तळलेले पदार्थ, आंबट फळे, लोणचे, व्हिनेगर आणि कडक उन्हात फिरणे.',
          panchakarmaTherapies: [
            'विरेचन कर्म (यकृत व पित्ताशयातील अतिरिक्त पित्त बाहेर काढण्यासाठी औषधी जुलाब उपचार)',
            'चंदनादी शिरोधारा किंवा तक्रधारा (डोकेदुखी, उच्च रक्तदाब व उष्णतेच्या त्रासावर)',
            'रक्तमोक्षण व जळू उपचार (Jalaukavacharana - रक्त शुद्ध करून सोरायसिस व एक्झिमावर रामबाण)',
            'आयुर्वेदिक मुखलेप (डॉ. साक्षी सोनकुसरे यांच्या मार्गदर्शनाखाली नैसर्गिक त्वचा उपचार)'
          ]
        },
        Kapha: {
          element: 'पृथ्वी + जल महाभूत',
          qualities: 'गुरु (जड), मंद (संथ), शीत (थंड), स्निग्ध (तेलकट), श्लक्ष्ण (मऊ), सांद्र (घन)',
          title: 'कफ प्रधान प्रकृती',
          tagline: 'शारीरिक मजबुती, सांध्यांचे वंगण आणि नैसर्गिक प्रतिकारशक्तीचा मुख्य आधार',
          overview: 'तुमच्या प्रकृतीत पृथ्वी आणि जल तत्त्वांचे प्राधान्य आहे. कफ प्रकृतीचे लोक मजबूत हाडांचे, शांत स्वभावाचे आणि उच्च प्रतिकारशक्ती (ओजस) असलेले असतात. कफ संतुलित असल्यास दीर्घायुष्य व मानसिक संयम मिळतो. कफ बिघडल्यास वजन वाढणे, सुस्ती, सायनस, कफविकार, थायरॉईड आणि पचन मंदावणे या समस्या होतात.',
          nadiName: 'हंस गती (हंसासारखी संथ व डौलदार नाडी)',
          nadiSanskrit: '“हंसवद् गच्छति नाडी कफेन मन्दगामिनी। गभीरा निर्मला पूर्णा तृतीयाङ्गुलिसंस्थिता॥”',
          nadiSource: '— भावप्रकाश संहिता व कणाद नाडी विज्ञान',
          nadiTranslation: '“कफाच्या प्राबल्यात नाडी हंसासारखी (हंस गती) संथ, डौलदार, खोल आणि स्थिर गतीने तिसऱ्या (अनामिका) बोटाखाली चालते.”',
          nadiClinical: 'डॉ. मनीष येरपुडे यांच्या तिसऱ्या बोटाखाली संथ आणि पूर्ण नाडी जाणवते. ही नाडी उत्तम प्रतिकारशक्ती दर्शवते, परंतु सुस्ती असल्यास लठ्ठपणा, मंदाग्नी किंवा कोलेस्टेरॉल वाढल्याची पूर्वसूचना देते.',
          researchTitle: 'मेद चयापचय व जनुक संशोधन (Nature Scientific Reports)',
          researchStudy: 'नेचर सायंटिफिक रिपोर्ट्समधील अभ्यासानुसार कफ प्रकृतीमध्ये FTO आणि PPARG जनुकांचे प्रमाण अधिक असते, जे ऊर्जा साठवून ठेवण्याच्या गुणधर्माशी संबंधित आहेत.',
          dietaryFavored: 'उबदार, हलके, कोरडे व तिखट-कडू चवीचे अन्न: ज्वारी, बाजरीची भाकरी, मध, काळी मिरी, आले, हळद, लसूण, ताजी शिजवलेली भाजी.',
          dietaryAvoided: 'थंड दूध, आइस्क्रीम, मिठाई, अति गोड व तेलकट पदार्थ, शिळे अन्न आणि दुपारी झोपणे.',
          panchakarmaTherapies: [
            'उद्वर्तन (Udwarthana - औषधी सुक्या चूर्णाने मालिश करून अतिरिक्त चरबी व वजन कमी करणे)',
            'वामन कर्म (सायनस, दमा, खोकला आणि छातीतील कफ मुळापासून काढण्यासाठी औषधी उलट्या उपचार)',
            'बाष्प स्वेदन (औषधी वाफेने शरीरातील टॉक्सिन्स घाम वाटे बाहेर काढणे)',
            'नस्य कर्म (डोकेदुखी व सायनससाठी नाकात औषधी तेल थेंब घालणे)'
          ]
        }
      }
    },
    en: {
      heroOverline: 'AYURVEDIC PRAKRITI & NADI PARIKSHAN EVALUATION',
      heroTitle: 'Discover Your Constitution,',
      heroTitleEm: 'Rooted in Classical Science.',
      heroDesc: 'In authentic Ayurveda, healing is never generic. By evaluating your elemental baseline (Vata, Pitta, Kapha) alongside classical radial pulse patterns (Nadi Gati), our clinicians tailor Panchakarma and herbal therapies precisely for your body’s unique bio-rhythm.',
      badge1: '4 Classical Diagnostic Criteria',
      badge2: 'Nadi Parikshan Pulse Gait Analysis',
      badge3: 'Authentic Shastra Verses & Research Quotes',
      badge4: 'Clinical Protocols by Dr. Manish Yerpude',
      questionOf: 'QUESTION',
      of: 'OF',
      prevBtn: 'Previous Question',
      nextBtn: 'Next Question',
      analyzeBtn: 'Analyze Constitution & Nadi',
      evalComplete: 'CLINICAL EVALUATION COMPLETE',
      yourPrakritiIs: 'Your Ayurvedic Constitution:',
      predominant: 'Predominant',
      dualConstitution: 'Dual Constitution (Dvidoshaja)',
      vataDesc: 'Governs neurological mobility, breathing & circulation',
      pittaDesc: 'Governs digestion, metabolism, body heat & vision',
      kaphaDesc: 'Governs physical stability, joint lubrication & Ojas',
      physiologyHeading: 'CONSTITUTIONAL PHYSIOLOGY & BIO-TYPING',
      elementsLabel: 'Governing Elements:',
      gunasLabel: 'Dominant Qualities (Gunas):',
      nadiHeading: 'CLASSICAL NADI PARIKSHAN (RADIAL PULSE GAIT) ANALYSIS',
      nadiTag: 'Ayurvedic Radial Pulse Diagnosis',
      nadiClinicalLabel: 'Clinical Significance at AayuTatva Hospital:',
      researchHeading: 'PEER-REVIEWED AYURGENOMICS & CLINICAL RESEARCH',
      researchCitation: 'Published in international peer-reviewed journals validating Ayurvedic phenotypic profiling and pulse diagnostics.',
      nourishingFoods: 'Nourishing Foods (Ahara)',
      favoredLabel: 'Recommended to favor:',
      avoidLabel: 'Minimize / Moderate:',
      hospitalTherapies: 'Recommended Hospital Therapies',
      verifyPulseTitle: 'Verify Your Pulse with Dr. Manish Santosh Yerpude',
      verifyPulseDesc: 'Online quizzes evaluate broad constitutional tendencies. An in-person Nadi Parikshan (Radial Pulse Examination) reveals deep imbalances (Vikriti), sub-dosha movements, and organ vitality.',
      aiBtn: 'Analyze with AayuVaidya AI',
      whatsappBtn: 'Consult on WhatsApp',
      inPersonBtn: 'Book In-Person Appointment',
      retakeBtn: 'Retake Quiz',
      questions: [
        {
          id: 'body_frame',
          category: '1. PHYSICAL BUILD (DEHA PRAKRITI)',
          icon: <User size={18}/>,
          q: 'How would you describe your natural physical frame & bone structure?',
          subtext: 'Observed during classical Rogi Pariksha (Charaka Samhita body constitution inspection).',
          options: [
            { 
              label: 'Slender, thin bones, prominent joints, quick movements, difficulty gaining weight', 
              dosha: 'Vata',
              trait: 'Vata (Air & Space) imparts lightness and lean mobility.' 
            },
            { 
              label: 'Medium athletic build, balanced muscle tone, easily gains or loses weight with diet', 
              dosha: 'Pitta',
              trait: 'Pitta (Fire & Water) imparts symmetry, warmth and metabolic vigor.' 
            },
            { 
              label: 'Broad shoulders, heavy bone density, solid frame, gains weight easily and keeps it', 
              dosha: 'Kapha',
              trait: 'Kapha (Earth & Water) imparts structural stability and tissue density.' 
            }
          ]
        },
        {
          id: 'digestion',
          category: '2. DIGESTIVE FIRE (JATHARAGNI & KOSTHA)',
          icon: <Zap size={18}/>,
          q: 'How does your digestive fire (Agni) behave on a day-to-day basis?',
          subtext: 'Central to Ayurvedic pathology: Agni governs metabolic transformation and Ama (toxin) formation.',
          options: [
            { 
              label: 'Irregular (Vishamagni): fluctuating appetite, gas, bloating, tendency toward constipation', 
              dosha: 'Vata',
              trait: 'Fluctuating digestive fire caused by unstable Vata movements.' 
            },
            { 
              label: 'Sharp & Intense (Tikshnagni): cannot skip meals without irritability, acidity, heartburn, loose stools', 
              dosha: 'Pitta',
              trait: 'Hyper-metabolic gastric secretion caused by intense Pitta heat.' 
            },
            { 
              label: 'Slow & Heavy (Mandagni): low appetite, feeling heavy or sluggish for hours after meals', 
              dosha: 'Kapha',
              trait: 'Prolonged digestion cycle caused by dense, unctuous Kapha qualities.' 
            }
          ]
        },
        {
          id: 'climate',
          category: '3. THERMAL TOLERANCE (SHEETA / USHNA)',
          icon: <Thermometer size={18}/>,
          q: 'What is your climatic and seasonal temperature tolerance?',
          subtext: 'Classical elemental thermal reactivity evaluated in Svasthavritta (Ayurvedic hygiene).',
          options: [
            { 
              label: 'Averse to cold winds & winter; naturally craves warmth, hot beverages, blankets and summer sun', 
              dosha: 'Vata',
              trait: 'Cold-sensitive constitution requiring thermal stability.' 
            },
            { 
              label: 'Averse to hot summers, direct sun & humid heat; craves air conditioning, shade and chilled drinks', 
              dosha: 'Pitta',
              trait: 'Heat-generating constitution prone to inflammatory overheating.' 
            },
            { 
              label: 'Dislikes cold, wet and damp humidity; thrives best in dry, warm, well-ventilated weather', 
              dosha: 'Kapha',
              trait: 'Moisture-holding constitution requiring drying and warming stimulation.' 
            }
          ]
        },
        {
          id: 'mind_sleep',
          category: '4. MIND, STRESS & SLEEP (MANASA PRAKRITI & NIDRA)',
          icon: <Moon size={18}/>,
          q: 'How do your stress reaction and sleep patterns usually present?',
          subtext: 'Evaluation of mental constitution and autonomic neuro-endocrine regulation.',
          options: [
            { 
              label: 'Restless overthinking, anxiety under pressure; light, interrupted sleep and easily awakened', 
              dosha: 'Vata',
              trait: 'Mobile Vata accelerates neural impulses causing hyper-arousal.' 
            },
            { 
              label: 'Impatience, perfectionism, fiery drive; moderate 6–7 hours sound sleep, wakes up warm or active', 
              dosha: 'Pitta',
              trait: 'Sharp Pitta converts stress into intensity and metabolic wakefulness.' 
            },
            { 
              label: 'Calm, patient, resists change; deep, heavy 8+ hours sleep and loves relaxing in the morning', 
              dosha: 'Kapha',
              trait: 'Stable Kapha buffers stress and induces grounding deep sleep.' 
            }
          ]
        }
      ],
      doshaInsights: {
        Vata: {
          element: 'Vayu (Air) + Akasha (Ether)',
          qualities: 'Dry (Rooksha), Light (Laghu), Cold (Sheeta), Rough (Khara), Subtle (Sukshma), Mobile (Chala)',
          title: 'Vata Predominant Constitution',
          tagline: 'The Master Governor of Movement, Nervous Transmission & Cellular Communication',
          overview: 'You are governed by the wind and ether elements. Vata individuals are enthusiastic, quick-witted, creative visionaries with high agility. When in balance, Vata imparts vitality, mental flexibility, and radiant enthusiasm. When aggravated by stress, cold, or irregular habits, Vata manifests as dry joints, anxiety, constipation, insomnia, and erratic energy.',
          nadiName: 'Sarpa Gati (The Serpent Pulse)',
          nadiSanskrit: '“सर्पवद् वल्गते नाडी वातेन कुटिला च सा। द्रुता च कम्पते मुहुर्मुहुश्चैव प्रचाल्यते॥”',
          nadiSource: '— Sharangadhara Samhita (Prathama Khanda 8.4)',
          nadiTranslation: '“Under Vata aggravation, the radial pulse behaves like a creeping serpent (Sarpa Gati) — moving with rapid, thin, zigzagging, flickering, and irregular waves beneath the physician’s index finger.”',
          nadiClinical: 'In classical Nadi Parikshan, Dr. Manish Yerpude feels the Vata pulse directly beneath the index finger at the radial styloid. A sharp, narrow, light, and undulating pulse wave indicates autonomic arousal, heightened sensory sensitivity, spinal stiffness, or dry metabolic toxins (Vataja Ama).',
          researchTitle: 'Ayurgenomics & Neuro-Metabolic Correlation (Journal of Translational Medicine)',
          researchStudy: 'Peer-reviewed genomic investigations published in the Journal of Translational Medicine and Nature Scientific Reports identify that Vata-dominant phenotypes exhibit distinct gene expression signatures, particularly in dopamine beta-hydroxylase (DBH), neurological signaling, and extracellular matrix remodeling, confirming biological differences in stress reactivity and connective tissue mobility.',
          dietaryFavored: 'Warm, cooked, unctuous foods, healthy fats (pure cow A2 ghee, sesame oil), hearty root vegetables, warm milk with nutmeg, mild warming spices (fresh ginger, cumin, hing, cinnamon, ajwain).',
          dietaryAvoided: 'Cold raw salads, iced drinks, dry crackers, excess caffeine, beans without digestive spices, fasting.',
          panchakarmaTherapies: [
            'Kati Basti & Janu Basti (Warm medicated herbal oil reservoirs for spine & knee disc hydration)',
            'Shirodhara with Brahmi Taila (Warm continuous oil stream over the forehead to soothe racing thoughts & insomnia)',
            'Matra Basti & Kashaya Basti (Medicated herbal enemas to pacify Vata at its root site in the colon)',
            'Takradhara (Medicated herbal buttermilk drip for nervous soothing)'
          ]
        },
        Pitta: {
          element: 'Agni (Fire) + Jala (Water)',
          qualities: 'Hot (Ushna), Sharp (Tikshna), Light (Laghu), Slightly Oily (Sasneha), Liquid (Drava)',
          title: 'Pitta Predominant Constitution',
          tagline: 'The Transformative Fire Governing Digestion, Metabolism & Intellectual Vision',
          overview: 'You are governed by the fire and water elements. Pitta individuals possess sharp intellect, laser focus, decisive leadership, robust digestion, and strong metabolism. When balanced, Pitta radiates courage, charisma, warm digestion, and clear comprehension. When aggravated by spicy foods, summer heat, or excessive ambition, Pitta causes acid reflux, skin flare-ups, liver congestion, burning sensations, and short temper.',
          nadiName: 'Manduka Gati (The Frog Pulse)',
          nadiSanskrit: '“मण्डूकवद् उत्पत्य गच्छति पित्तेन दीप्यते। चपला तरला नाडी मध्यमाङ्गुलिगामिनी॥”',
          nadiSource: '— Yogaratnakara (Nadi Pariksha Vidhi)',
          nadiTranslation: '“Under Pitta predominance, the pulse leaps energetically like a jumping frog (Manduka Gati) — bouncy, buoyant, vibrant, and forceful beneath the physician’s middle finger.”',
          nadiClinical: 'In classical Nadi Parikshan, Dr. Manish Yerpude palpates the Pitta pulse beneath the middle finger. A bounding, high-amplitude, forceful arterial wave indicates heightened cardiac stroke volume, hyperacidity, elevated inflammatory cytokines, or hepatic metabolic heat.',
          researchTitle: 'Biomarkers & Inflammatory Genomics (Indian Journal of Medical Research)',
          researchStudy: 'Clinical genomic studies published in IJMR and Frontiers in Genetics demonstrate that Pitta-classified cohorts show elevated baseline levels of inflammatory mediators (such as TNF-alpha and IL-6) and specific single nucleotide polymorphisms in metabolic gene loci (CYP2C19), directly corroborating classical descriptions of high digestive fire (Tikshnagni) and vascular heat reactivity.',
          dietaryFavored: 'Cooling, sweet, bitter, and astringent foods: fresh cucumbers, coconut water, coriander, fennel, soaked almonds, ripe sweet fruits (pomegranate, sweet grapes), mung dal, and pure cow ghee.',
          dietaryAvoided: 'Excess red chilies, pungent vinegar, fermented foods, deep-fried snacks, sour citrus, excess alcohol.',
          panchakarmaTherapies: [
            'Virechana Karma (Therapeutic medicated purgation to clear excess Pitta heat from liver & gallbladder)',
            'Shirodhara with Chandanadi Taila or Takra (Cooling herbal therapy for hypertension, migraines & anger)',
            'Raktamokshana & Jalaukavacharana (Classical leech therapy for chronic skin eczema, psoriasis & blood purification)',
            'Mukhalepa & Ayurvedic Cosmetology (Cooling herbal face packs and scalp treatments by Dr. Sakshi Sonkusare)'
          ]
        },
        Kapha: {
          element: 'Prithvi (Earth) + Jala (Water)',
          qualities: 'Heavy (Guru), Slow (Manda), Cold (Sheeta), Oily (Snigdha), Smooth (Shlakshna), Dense (Sandra)',
          title: 'Kapha Predominant Constitution',
          tagline: 'The Structural Anchor Governing Physical Immunity, Joint Lubrication & Emotional Stability',
          overview: 'You are governed by the earth and water elements. Kapha individuals have robust bone density, luxurious hair, steady endurance, empathetic calm, and deep emotional loyalty. When balanced, Kapha provides immense physical strength (Ojas), enduring vitality, and serene mental poise. When aggravated by sedentary habits, cold damp foods, or overeating, Kapha manifests as sluggish metabolism, fluid retention, weight gain, sinus congestion, and lethargy.',
          nadiName: 'Hamsa Gati (The Swan Pulse)',
          nadiSanskrit: '“हंसवद् गच्छति नाडी कफेन मन्दगामिनी। गभीरा निर्मला पूर्णा तृतीयाङ्गुलिसंस्थिता॥”',
          nadiSource: '— Bhavaprakasha Samhita & Kanada Nadi Vijnana',
          nadiTranslation: '“Under Kapha predominance, the pulse glides gracefully and majestically like a swimming swan (Hamsa Gati) — slow, deep, rhythmic, full, and steady beneath the physician’s ring finger.”',
          nadiClinical: 'In classical Nadi Parikshan, Dr. Manish Yerpude reads the Kapha pulse beneath the ring finger. A slow, broad, full, deep pulse wave indicates strong structural immunity, stable lipid reserves, but when sluggish, warns of lymphatic stagnation, hypothyroidism tendencies, or metabolic slow-down (Mandagni).',
          researchTitle: 'Lipid Metabolism & PPARG Gene Associations (Nature Scientific Reports)',
          researchStudy: 'Peer-reviewed studies by the Ayurgenomics Research Consortium published in Nature Scientific Reports reveal strong associations between Kapha prakriti phenotypes and genetic variants in the FTO (fat mass and obesity-associated) and PPARG pathways, providing a modern molecular explanation for their metabolic thriftiness and the necessity of Agni-stimulating interventions.',
          dietaryFavored: 'Warm, light, dry, pungent, and bitter foods: roasted barley, millets (jowar, bajra), steamed greens, ginger tea, honey, black pepper, turmeric, fenugreek, and light clear vegetable broths.',
          dietaryAvoided: 'Cold dairy, ice creams, heavy sweets, oily deep-fried foods, excessive sleep after sunrise, refined flours.',
          panchakarmaTherapies: [
            'Udwarthana (Dry medicated herbal powder body scrub for deep lymphatic drainage & visceral fat mobilization)',
            'Vamana Karma (Therapeutic medicated emesis for chronic sinus congestion, asthma, and deep Kapha detox)',
            'Bashpa Swedana (Herbal steam bath to liquefy stagnant toxins and promote metabolic sweating)',
            'Nasya Therapy (Medicated herbal nasal oil drops for clear respiratory passages and sinus relief)'
          ]
        }
      }
    }
  };

  const currentLangData = QUIZ_DATA[lang];
  const questions = currentLangData.questions;
  const doshaInsights = currentLangData.doshaInsights;

  const handleSelectOption = (qId, dosha) => {
    const updated = { ...answers, [qId]: dosha };
    setAnswers(updated);
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const calculateResult = () => {
    const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
    Object.values(answers).forEach((d) => {
      counts[d] = (counts[d] || 0) + 1;
    });

    const totalAnswered = Object.keys(answers).length;
    const vataPct = Math.round((counts.Vata / totalAnswered) * 100);
    const pittaPct = Math.round((counts.Pitta / totalAnswered) * 100);
    const kaphaPct = Math.round((counts.Kapha / totalAnswered) * 100);

    // Identify dominant and secondary dosha
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const primary = sorted[0] ? sorted[0][0] : 'Vata';
    const secondary = sorted[1] && sorted[1][1] >= 1 ? sorted[1][0] : null;

    let profileName = `${primary} Predominant`;
    if (secondary && sorted[1] && sorted[0][1] - sorted[1][1] <= 1) {
      profileName = `${primary}-${secondary} Dual Constitution (Dvidoshaja)`;
    }

    const calculatedResult = {
      primary,
      secondary,
      profileName,
      counts,
      percentages: { Vata: vataPct, Pitta: pittaPct, Kapha: kaphaPct }
    };

    try {
      localStorage.setItem('aayutatva_dosha_profile', JSON.stringify({
        dominant: primary,
        vata: vataPct,
        pitta: pittaPct,
        kapha: kaphaPct,
        profileName
      }));
    } catch {
      // safe fallback if storage is restricted
    }

    setResult(calculatedResult);
    setTimeout(() => {
      const el = document.getElementById('quiz-results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 320, behavior: 'smooth' });
      }
    }, 80);
  };

  const resetQuiz = () => {
    setAnswers({});
    setStep(0);
    setResult(null);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const currentQ = questions[step];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((step + 1) / questions.length) * 100);

  const activeDominant = result ? doshaInsights[result.primary] : null;

  const whatsappMessage = result && activeDominant
    ? (lang === 'mr'
        ? `नमस्कार डॉ. मनीष येरपुडे, मी आयूतत्त्व आयुर्वेदिक हॉस्पिटलच्या वेबसाईटवर प्रकृती व नाडी चाचणी पूर्ण केली. माझी प्रकृती ${activeDominant.title} (वात: ${result.percentages.Vata}%, पित्त: ${result.percentages.Pitta}%, कफ: ${result.percentages.Kapha}%, नाडी गती: ${activeDominant.nadiName}) अशी आली आहे. मला आपल्या हॉस्पिटलमध्ये प्रत्यक्ष नाडी परीक्षा आणि तपासणीसाठी वेळ हवी आहे.`
        : `Hello Dr. Manish Yerpude, I completed the Prakriti Quiz on AayuTatva Hospital website. My result is ${result.profileName} (Vata: ${result.percentages.Vata}%, Pitta: ${result.percentages.Pitta}%, Kapha: ${result.percentages.Kapha}%, Pulse: ${activeDominant.nadiName}). I would like to book an in-person Nadi Parikshan consultation.`
      )
    : '';

  return (
    <div className="subpage quiz-subpage">
      {/* Uniform Site Header with Breadcrumb */}
      <SiteHeader breadcrumb={lang === 'mr' ? 'आयुर्वेदिक देह प्रकृती व नाडी परीक्षण' : 'Dosha & Nadi Evaluation'} />

      <main>
        {/* Hero Section */}
        <section className="sub-hero quiz-hero">
          <a className="back-link" href="/"><ArrowLeft size={14}/> {lang === 'mr' ? 'मुख्य पृष्ठावर परत जा' : 'BACK TO HOSPITAL HOME'}</a>
          
          {/* Language Switcher Bar */}
          <div style={{ margin: '14px 0 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1b3b22' }}>
              {lang === 'mr' ? 'भाषा निवडा / Choose Language:' : 'Choose Language / भाषा निवडा:'}
            </span>
            <div style={{ display: 'inline-flex', background: '#ffffff', borderRadius: '30px', padding: '4px', border: '1.5px solid #2e5939', boxShadow: '0 2px 8px rgba(27,59,34,0.08)' }}>
              <button
                type="button"
                onClick={() => setLang('mr')}
                style={{
                  padding: '6px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  background: lang === 'mr' ? '#1b3b22' : 'transparent',
                  color: lang === 'mr' ? '#ffffff' : '#1b3b22',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                🇮🇳 मराठी (Marathi)
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                style={{
                  padding: '6px 18px',
                  borderRadius: '20px',
                  border: 'none',
                  background: lang === 'en' ? '#1b3b22' : 'transparent',
                  color: lang === 'en' ? '#ffffff' : '#1b3b22',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                English
              </button>
            </div>
          </div>

          <div className="sub-overline">{currentLangData.heroOverline}</div>
          <h1>{currentLangData.heroTitle}<br/><em>{currentLangData.heroTitleEm}</em></h1>
          <p>{currentLangData.heroDesc}</p>

          <div className="quiz-hero-badges">
            <div className="quiz-hero-badge-item">
              <Compass size={16}/> <span>{currentLangData.badge1}</span>
            </div>
            <div className="quiz-hero-badge-item">
              <Activity size={16}/> <span>{currentLangData.badge2}</span>
            </div>
            <div className="quiz-hero-badge-item">
              <BookOpen size={16}/> <span>{currentLangData.badge3}</span>
            </div>
            <div className="quiz-hero-badge-item">
              <ShieldCheck size={16}/> <span>{currentLangData.badge4}</span>
            </div>
          </div>
        </section>

        {/* Main Quiz & Assessment Section */}
        <section className="quiz-interactive-section">
          {!result ? (
            /* Active Quiz Interface */
            <div className="quiz-board-card">
              {/* Progress & Category Top Bar */}
              <div className="quiz-board-header">
                <div className="quiz-category-tag">
                  {currentQ.icon}
                  <span>{currentQ.category}</span>
                </div>
                <div className="quiz-step-indicator">
                  {currentLangData.questionOf} <b>{step + 1}</b> {currentLangData.of} <b>{questions.length}</b>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="quiz-progress-track">
                <div 
                  className="quiz-progress-fill" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="quiz-question-body">
                <h2>{currentQ.q}</h2>
                <p className="quiz-question-subtext">{currentQ.subtext}</p>

                {/* Option Cards */}
                <div className="quiz-options-list">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = answers[currentQ.id] === opt.dosha;
                    const doshaLabel = opt.dosha === 'Vata' ? (lang === 'mr' ? 'वात दोष' : 'Vata Type') : (opt.dosha === 'Pitta' ? (lang === 'mr' ? 'पित्त दोष' : 'Pitta Type') : (lang === 'mr' ? 'कफ दोष' : 'Kapha Type'));
                    return (
                      <div
                        key={idx}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSelectOption(currentQ.id, opt.dosha)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectOption(currentQ.id, opt.dosha); }}
                        className={`quiz-option-card ${isSelected ? 'active' : ''}`}
                      >
                        <div className="quiz-option-radio">
                          {isSelected ? <Check size={14}/> : <span className="radio-dot"/>}
                        </div>
                        <div className="quiz-option-content">
                          <div className="quiz-option-label">{opt.label}</div>
                          <div className="quiz-option-trait">
                            <span className={`dosha-pill dosha-${opt.dosha.toLowerCase()}`}>{doshaLabel}</span>
                            <small>{opt.trait}</small>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="quiz-board-footer">
                <button
                  type="button"
                  className="quiz-btn-prev"
                  onClick={handlePrevious}
                  disabled={step === 0}
                >
                  <ArrowLeft size={16}/> {currentLangData.prevBtn}
                </button>

                {/* Question Jump Pills */}
                <div className="quiz-jump-pills">
                  {questions.map((q, i) => (
                    <button
                      key={q.id}
                      type="button"
                      className={`quiz-jump-pill ${i === step ? 'active-step' : ''} ${answers[q.id] ? 'answered' : ''}`}
                      onClick={() => setStep(i)}
                      title={`Go to Question ${i + 1}`}
                      aria-label={`Go to Question ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="quiz-btn-next"
                  onClick={handleNext}
                  disabled={!answers[currentQ.id]}
                >
                  {step === questions.length - 1 ? (
                    <>{currentLangData.analyzeBtn} <Sparkles size={16}/></>
                  ) : (
                    <>{currentLangData.nextBtn} <ArrowRight size={16}/></>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Comprehensive Assessment Results Interface */
            <div className="quiz-result-card" id="quiz-results">
              <div className="result-header-banner">
                <div className="result-badge">
                  <Award size={18}/> {currentLangData.evalComplete}
                </div>
                <h2>{currentLangData.yourPrakritiIs}</h2>
                <h1 className="result-dosha-title">{activeDominant.title}</h1>
                <p className="result-tagline">{activeDominant.tagline}</p>
              </div>

              {/* Dosha Breakdown Gauge Meters */}
              <div className="dosha-meter-grid">
                <div className="dosha-meter-box vata">
                  <div className="meter-head">
                    <span className="meter-name">{lang === 'mr' ? 'वात दोष (वायू / आकाश)' : 'Vata Dosha (Air/Ether)'}</span>
                    <b className="meter-val">{result.percentages.Vata}%</b>
                  </div>
                  <div className="meter-bar-track">
                    <div className="meter-bar-fill vata" style={{ width: `${result.percentages.Vata}%` }}/>
                  </div>
                  <small>{currentLangData.vataDesc}</small>
                </div>

                <div className="dosha-meter-box pitta">
                  <div className="meter-head">
                    <span className="meter-name">{lang === 'mr' ? 'पित्त दोष (अग्नी / जल)' : 'Pitta Dosha (Fire/Water)'}</span>
                    <b className="meter-val">{result.percentages.Pitta}%</b>
                  </div>
                  <div className="meter-bar-track">
                    <div className="meter-bar-fill pitta" style={{ width: `${result.percentages.Pitta}%` }}/>
                  </div>
                  <small>{currentLangData.pittaDesc}</small>
                </div>

                <div className="dosha-meter-box kapha">
                  <div className="meter-head">
                    <span className="meter-name">{lang === 'mr' ? 'कफ दोष (पृथ्वी / जल)' : 'Kapha Dosha (Earth/Water)'}</span>
                    <b className="meter-val">{result.percentages.Kapha}%</b>
                  </div>
                  <div className="meter-bar-track">
                    <div className="meter-bar-fill kapha" style={{ width: `${result.percentages.Kapha}%` }}/>
                  </div>
                  <small>{currentLangData.kaphaDesc}</small>
                </div>
              </div>

              {/* Constitutional Description */}
              <div className="result-section-box">
                <div className="result-subheading">
                  <User size={18}/> {currentLangData.physiologyHeading}
                </div>
                <p className="result-narrative">{activeDominant.overview}</p>
                <div className="element-chip-row">
                  <span><b>{currentLangData.elementsLabel}</b> {activeDominant.element}</span>
                  <span><b>{currentLangData.gunasLabel}</b> {activeDominant.qualities}</span>
                </div>
              </div>

              {/* Classical Nadi Parikshan Section with Classical Quotes */}
              <div className="result-section-box nadi-highlight-box">
                <div className="result-subheading nadi-heading">
                  <Activity size={18}/> {currentLangData.nadiHeading}
                </div>
                <div className="nadi-badge-row">
                  <span className="nadi-type-name">{activeDominant.nadiName}</span>
                  <span className="nadi-classical-tag">{currentLangData.nadiTag}</span>
                </div>

                <div className="nadi-sanskrit-quote-card">
                  <p className="sanskrit-verse">{activeDominant.nadiSanskrit}</p>
                  <span className="sanskrit-source">{activeDominant.nadiSource}</span>
                  <p className="sanskrit-english">{activeDominant.nadiTranslation}</p>
                </div>

                <div className="nadi-clinical-interpretation">
                  <b>{currentLangData.nadiClinicalLabel}</b>
                  <p>{activeDominant.nadiClinical}</p>
                </div>
              </div>

              {/* Research & Ayurgenomics Quote Section */}
              <div className="result-section-box research-highlight-box">
                <div className="result-subheading research-heading">
                  <BookOpen size={18}/> {currentLangData.researchHeading}
                </div>
                <div className="research-quote-card">
                  <b>{activeDominant.researchTitle}</b>
                  <p>“{activeDominant.researchStudy}”</p>
                  <small className="research-citation">
                    {currentLangData.researchCitation}
                  </small>
                </div>
              </div>

              {/* Recommended Diet & Lifestyle */}
              <div className="result-grid-two">
                <div className="result-info-card">
                  <h4><Leaf size={16}/> {currentLangData.nourishingFoods}</h4>
                  <p><b>{currentLangData.favoredLabel}</b> {activeDominant.dietaryFavored}</p>
                  <p className="diet-avoid"><b>{currentLangData.avoidLabel}</b> {activeDominant.dietaryAvoided}</p>
                </div>

                <div className="result-info-card">
                  <h4><Sparkles size={16}/> {currentLangData.hospitalTherapies}</h4>
                  <ul className="therapy-bullets">
                    {activeDominant.panchakarmaTherapies.map((t, idx) => (
                      <li key={idx}><CheckCircle2 size={15}/> <span>{t}</span></li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Consultation & Booking Action Strip */}
              <div className="result-actions-strip">
                <div className="action-strip-content">
                  <h3>{currentLangData.verifyPulseTitle}</h3>
                  <p>{currentLangData.verifyPulseDesc}</p>
                </div>
                <div className="action-strip-buttons">
                  <a 
                    href="/vaidya-ai.html"
                    className="btn-primary-action"
                    style={{ background: '#1b3b22', borderColor: '#1b3b22' }}
                  >
                    <Sparkles size={16}/> {currentLangData.aiBtn}
                  </a>
                  <a 
                    href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-whatsapp-action"
                  >
                    <MessageCircle size={18}/> {currentLangData.whatsappBtn}
                  </a>
                  <a href="/#booking" className="btn-primary-action">
                    {currentLangData.inPersonBtn} <ArrowUpRight size={16}/>
                  </a>
                  <button type="button" onClick={resetQuiz} className="btn-retake">
                    <RefreshCw size={15}/> {currentLangData.retakeBtn}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Shastra & Modern Science Grounding Section */}
        <section className="quiz-science-section">
          <div className="section-kicker"><span>CLASSICAL SCRIPTURES & MODERN RESEARCH</span><i/></div>
          <h2 className="science-section-title">The Foundation of Pulse & Constitutional Science</h2>
          <p className="science-section-subtitle">
            Authentic Ayurveda bridges ancient Shastric wisdom with 21st-century bio-physiological research.
          </p>

          <div className="science-cards-grid">
            {/* Shastra Quote 1: Kanada Nadi Vijnana */}
            <div className="science-card">
              <span className="science-card-tag">KANADA NADI VIJNANA</span>
              <h3>The Melody of the Pulse</h3>
              <p className="sanskrit-card-verse">
                “यथा वीणागतास्तन्त्री सर्वान् रागान् प्रभाषते।<br/>
                तथा हस्तगता नाडी सर्वान् रोगान् प्रकाशते॥”
              </p>
              <p className="science-card-text">
                <em>“Just as the tuned strings of a Veena express every musical raga, the radial pulse at the wrist manifests every subtle harmony and disease within the human physiology.”</em>
              </p>
            </div>

            {/* Shastra Quote 2: Ashtanga Hridaya on Agni */}
            <div className="science-card">
              <span className="science-card-tag">ASHTANGA HRIDAYA · NIDANA 12.1</span>
              <h3>The Metabolic Root of Healing</h3>
              <p className="sanskrit-card-verse">
                “रोगाः सर्वेऽपि मन्देऽग्नौ सुतरामुदराणि च...”
              </p>
              <p className="science-card-text">
                <em>“All physical diseases, metabolic sluggishness, and deep tissue degeneration have their singular root in compromised Agni (metabolic fire). Restoring doshic balance reignites pure cellular vitality.”</em>
              </p>
            </div>

            {/* Shastra Quote 3: Charaka Samhita */}
            <div className="science-card">
              <span className="science-card-tag">CHARAKA SAMHITA · VIMANA 8.94</span>
              <h3>Individuality of the Patient</h3>
              <p className="sanskrit-card-verse">
                “पुरुषं पुरुषं वीक्ष्य स सर्वो जायते पृथक्...”
              </p>
              <p className="science-card-text">
                <em>“Every individual patient is distinct and unique. Therefore, the wise physician must examine the specific constitution, vitality, digestive capacity, and pulse before designing therapy.”</em>
              </p>
            </div>
          </div>

          {/* Peer-Reviewed Scientific Studies Grid */}
          <div className="research-studies-grid">
            <div className="research-study-card">
              <span className="study-journal">JOURNAL OF TRANSLATIONAL MEDICINE</span>
              <h4>Ayurgenomics: Genomic Profiling Correlates with Prakriti Phenotypes</h4>
              <p>
                Multi-centric investigations spearheaded by CSIR-IGIB establish that healthy individuals of Vata, Pitta, and Kapha types demonstrate statistically significant differences in baseline expression of immune, metabolic, and cell-cycle gene pathways.
              </p>
            </div>

            <div className="research-study-card">
              <span className="study-journal">IEEE SENSORS JOURNAL & BIOENGINEERING</span>
              <h4>Radial Arterial Pulse Waveform Signatures Match Classical Gatis</h4>
              <p>
                Advanced non-invasive piezoelectric pulse sensors demonstrate that the frequency harmonics and wave velocity variations recorded at radial positions correspond quantitatively with ancient descriptions of Sarpa (Vata), Manduka (Pitta), and Hamsa (Kapha) pulses.
              </p>
            </div>

            <div className="research-study-card">
              <span className="study-journal">WHO GLOBAL BENCHMARKS IN HEALTHCARE</span>
              <h4>World Health Organization Standards for Ayurvedic Practice</h4>
              <p>
                WHO formal benchmarks recognize individual constitutional typing (Prakriti Pariksha) and radial pulse assessment (Nadi Parikshan) as standardized diagnostic competencies essential for personalized non-communicable disease management.
              </p>
            </div>
          </div>
        </section>

        {/* 8-Fold Diagnostic Methodology (Ashtavidha Pariksha) */}
        <section className="quiz-ashtavidha-section">
          <div className="section-kicker"><span>CLASSICAL CLINICAL METHODOLOGY</span><i/></div>
          <h2>The 8-Fold Diagnostic Framework (Ashtavidha Pariksha)</h2>
          <p className="ashtavidha-sub">
            At AayuTatva Ayurvedic Hospital, Dr. Manish Santosh Yerpude and Dr. Sakshi Sonkusare employ the complete classical examination framework:
          </p>

          <div className="ashtavidha-grid">
            <div className="ashtavidha-item">
              <div className="ashtavidha-icon"><Activity size={20}/></div>
              <b>1. Nadi (Pulse)</b>
              <span>Radial artery palpation revealing elemental gatis, deep organ vitality, and stress patterns.</span>
            </div>
            <div className="ashtavidha-item">
              <div className="ashtavidha-icon"><Droplets size={20}/></div>
              <b>2. Mutra (Urine)</b>
              <span>Assessment of clarity, color, and foam reflecting renal efficiency and Pitta metabolism.</span>
            </div>
            <div className="ashtavidha-item">
              <div className="ashtavidha-icon"><Waves size={20}/></div>
              <b>3. Mala (Stool)</b>
              <span>Digestive Agni evaluation determining whether Ama (unprocessed metabolic toxins) is present.</span>
            </div>
            <div className="ashtavidha-item">
              <div className="ashtavidha-icon"><Sparkles size={20}/></div>
              <b>4. Jihva (Tongue)</b>
              <span>Tongue inspection: white coating (Ama), red edges (Pitta heat), or cracked tremors (Vata).</span>
            </div>
            <div className="ashtavidha-item">
              <div className="ashtavidha-icon"><Heart size={20}/></div>
              <b>5. Shabda (Speech/Voice)</b>
              <span>Vocal tone, breath stamina, and speech speed reflecting respiratory and Prana strength.</span>
            </div>
            <div className="ashtavidha-item">
              <div className="ashtavidha-icon"><Leaf size={20}/></div>
              <b>6. Sparsha (Touch/Skin)</b>
              <span>Thermal inspection of skin temperature, texture, moisture, and dermal firmness.</span>
            </div>
            <div className="ashtavidha-item">
              <div className="ashtavidha-icon"><Compass size={20}/></div>
              <b>7. Druk (Eyes/Vision)</b>
              <span>Sclera examination checking for dryness (Vata), yellowish redness (Pitta), or clear moistness (Kapha).</span>
            </div>
            <div className="ashtavidha-item">
              <div className="ashtavidha-icon"><ShieldCheck size={20}/></div>
              <b>8. Akruti (Posture/Form)</b>
              <span>Evaluation of spinal symmetry, joint alignment, gait, and overall constitutional stature.</span>
            </div>
          </div>
        </section>
      </main>

      {/* Subpage Footer */}
      <footer className="sub-footer">
        <a href="/" className="sub-brand" aria-label="AayuTatva home">
          <img src="/media/aayutatva-logo.png" alt="AayuTatva Ayurvedic Hospital logo"/>
        </a>
        <span>Dr. Manish Santosh Yerpude · AayuTatva Ayurvedic Hospital, Bhandara</span>
        <a href="/">Back to home <ArrowRight size={14}/></a>
      </footer>
    </div>
  );
}
