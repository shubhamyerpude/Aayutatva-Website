import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, X, Send, Activity, HelpCircle, MessageCircle, 
  RotateCcw, ArrowRight, ShieldCheck, Phone, Globe
} from 'lucide-react';
import { 
  generateInternalAyurvedicResponse,
  IN_CHAT_PRAKRITI_QUESTIONS,
  computeInChatPrakritiAnalysis,
  isPrakritiQuizRequest,
  parseAyurvedicMarkdown
} from './ayurvedicInternalEngine.ts';
import './vaidya-ai.css';

const whatsappPhone = '917758816074';
const phonePrimary = '+917758816074';

const WELCOME_MESSAGES = {
  mr: 'नमस्कार! 🙏 आयुवैद्य एआय मध्ये आपले स्वागत आहे. कंबरदुखी, सायटिका, गुडघेदुखी, नाडी परीक्षा, प्रकृती क्विझ किंवा पंचकर्माबद्दल कोणताही प्रश्न विचारा:',
  hi: 'नमस्ते! 🙏 आयुवैद्य एआई में आपका स्वागत है। स्लिप डिस्क, साइटिका, घुटनों का दर्द, नाड़ी परीक्षा, प्रकृति क्विज या पंचकर्म पर कोई भी सवाल पूछें:',
  en: 'Namaste! 🙏 Welcome to AayuVaidya AI. Ask any question on slip disc, sciatica, knee pain, pulse diagnosis, Prakriti quiz, or Panchakarma:'
};

export function AayuVaidyaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('mr');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: WELCOME_MESSAGES.mr,
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [inChatQuizStep, setInChatQuizStep] = useState(null);
  const [inChatQuizAnswers, setInChatQuizAnswers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (messages.length <= 1) {
      setMessages([
        {
          role: 'assistant',
          text: WELCOME_MESSAGES[newLang],
          time: 'Just now'
        }
      ]);
    }
  };

  const startInChatQuiz = () => {
    setInChatQuizStep(0);
    setInChatQuizAnswers([]);
    const qList = IN_CHAT_PRAKRITI_QUESTIONS[language] || IN_CHAT_PRAKRITI_QUESTIONS.mr;
    const q1 = qList[0];

    const introText = language === 'mr'
      ? `### 🧘 शास्त्रीय देह प्रकृती परीक्षण (Prakriti Quiz)\nखालील ५ सोप्या प्रश्नांची उत्तरे देऊन आपली वात, पित्त, कफ देह रचना व नाडी गती त्वरित जाणून घ्या:\n\n**${q1.title}**`
      : language === 'hi'
      ? `### 🧘 शास्त्रीय देह प्रकृति परीक्षण (Prakriti Quiz)\nकृपया नीचे दिए गए 5 प्रश्नों के उत्तर देकर अपनी त्रिदोष प्रकृति व नाड़ी गति जानें:\n\n**${q1.title}**`
      : `### 🧘 Classical Prakriti Quiz (Know Your Dosha)\nAnswer 5 diagnostic questions to discover your Tridosha constitution and radial pulse:\n\n**${q1.title}**`;

    setMessages(prev => [
      ...prev,
      {
        role: 'assistant',
        text: introText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quizQuestion: q1,
        quizStep: 0
      }
    ]);
  };

  const handleQuizOptionSelect = (option, currentStep) => {
    const qList = IN_CHAT_PRAKRITI_QUESTIONS[language] || IN_CHAT_PRAKRITI_QUESTIONS.mr;
    const newAnswers = [...inChatQuizAnswers, option.dosha];
    setInChatQuizAnswers(newAnswers);

    const userSelectedMsg = {
      role: 'user',
      text: `${language === 'mr' ? 'माझी निवड' : language === 'hi' ? 'मेरी पसंद' : 'Selected'}: ${option.label}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextStep = currentStep + 1;
    if (nextStep < qList.length) {
      setInChatQuizStep(nextStep);
      const nextQ = qList[nextStep];
      const assistantQMsg = {
        role: 'assistant',
        text: `**${nextQ.title}**`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quizQuestion: nextQ,
        quizStep: nextStep
      };
      setMessages(prev => [...prev, userSelectedMsg, assistantQMsg]);
    } else {
      setInChatQuizStep(null);
      const analysis = computeInChatPrakritiAnalysis(newAnswers, language);
      const resultMsg = {
        role: 'assistant',
        text: analysis.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isQuizComplete: true
      };
      setMessages(prev => [...prev, userSelectedMsg, resultMsg]);
    }
  };

  const handleSend = async (text = inputVal) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Check if user is asking for Prakriti Quiz
    if (isPrakritiQuizRequest(trimmed)) {
      const userMsg = {
        role: 'user',
        text: trimmed,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsg]);
      setInputVal('');
      setTimeout(() => {
        startInChatQuiz();
      }, 150);
      return;
    }

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
          language: language,
          history: nextMessages.slice(-6).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            content: m.text
          }))
        })
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: data.reply || (language === 'mr' ? 'नमस्कार. मी आपल्या सेवेसाठी तत्पर आहे.' : 'Namaste. I am here to help you with your Ayurvedic questions.'),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.warn('Widget using internal engine:', err);
      const internalRes = generateInternalAyurvedicResponse(trimmed, nextMessages, null, language);
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

  const getPlaceholder = () => {
    if (language === 'mr') return 'येथे प्रश्न विचारा (उदा. कंबरदुखी, ऍसिडिटी, नाडी परीक्षा)…';
    if (language === 'hi') return 'यहाँ प्रश्न पूछें (उदा. कमर दर्द, एसिडिटी, नाड़ी परीक्षा)…';
    return 'Ask AayuVaidya AI (e.g. Sciatica, Acidity, Nadi Parikshan)…';
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button 
          type="button" 
          className="vaidya-floating-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open AayuVaidya AI Assistant"
        >
          <Sparkles size={18} className="spark-icon" />
          <span>आयुवैद्य AI (मराठी) 🌿</span>
        </button>
      )}

      {/* Floating Assistant Modal */}
      {isOpen && (
        <div className="vaidya-floating-modal" role="dialog" aria-modal="true" aria-label="AayuVaidya AI Assistant">
          <div className="vaidya-modal-head">
            <h3>
              <Sparkles size={16} color="#e5c38d"/>
              <span>AayuVaidya AI · आयुवैद्य</span>
            </h3>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
            >
              <X size={18}/>
            </button>
          </div>

          {/* Language Selector Bar */}
          <div style={{
            background: '#ffffff',
            padding: '7px 14px',
            borderBottom: '1px solid #e7e0d3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#1b3b22', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={13} color="#2e7d32" /> भाषा / Language:
            </span>
            <div style={{ display: 'inline-flex', background: '#f0ece1', padding: '2px', borderRadius: '8px', gap: '2px' }}>
              <button
                type="button"
                onClick={() => handleLanguageChange('mr')}
                style={{
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: language === 'mr' ? '700' : '500',
                  borderRadius: '6px',
                  border: 'none',
                  background: language === 'mr' ? '#1b3b22' : 'transparent',
                  color: language === 'mr' ? '#ffffff' : '#495648',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('hi')}
                style={{
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: language === 'hi' ? '700' : '500',
                  borderRadius: '6px',
                  border: 'none',
                  background: language === 'hi' ? '#1b3b22' : 'transparent',
                  color: language === 'hi' ? '#ffffff' : '#495648',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                style={{
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: language === 'en' ? '700' : '500',
                  borderRadius: '6px',
                  border: 'none',
                  background: language === 'en' ? '#1b3b22' : 'transparent',
                  color: language === 'en' ? '#ffffff' : '#495648',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                English
              </button>
            </div>
          </div>

          <div style={{ background: '#f8f6f0', padding: '6px 14px', fontSize: '11px', color: '#5b695a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e7e0d3' }}>
            <span>{language === 'mr' ? 'चरक संहिता व शास्त्रीय चिकित्सेवर आधारित' : language === 'hi' ? 'चरक संहिता एवं शास्त्रीय चिकित्सा पर आधारित' : 'Trained on Charaka Samhita & Clinical Protocol'}</span>
            <a href="/vaidya-ai.html" style={{ color: '#1b3b22', fontWeight: '700', textDecoration: 'underline' }}>
              {language === 'mr' ? 'पूर्ण पान ↗' : language === 'hi' ? 'पूरा पेज ↗' : 'Full Page ↗'}
            </a>
          </div>

          {/* Messages */}
          <div className="vaidya-messages-area" style={{ maxHeight: 'none', flex: 1, padding: '14px' }}>
            {messages.map((m, i) => (
              <div key={i} className={`vaidya-msg-row ${m.role}`} style={{ maxWidth: '96%' }}>
                <div className="vaidya-msg-bubble" style={{ padding: '12px 14px', fontSize: '12px', lineHeight: '1.6' }}>
                  <div dangerouslySetInnerHTML={{ 
                    __html: parseAyurvedicMarkdown(m.text)
                  }} />

                  {/* In-Chat Interactive Quiz Option Buttons */}
                  {m.quizQuestion && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                      {m.quizQuestion.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleQuizOptionSelect(opt, m.quizStep)}
                          style={{
                            background: '#ffffff',
                            border: '1.5px solid #2e5939',
                            borderRadius: '10px',
                            padding: '10px 14px',
                            textAlign: 'left',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#1b3b22',
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(27,59,34,0.06)',
                            transition: 'all 0.2s ease',
                            lineHeight: '1.4'
                          }}
                        >
                          <span style={{ display: 'inline-block', marginRight: '6px', color: '#2e7d32', fontWeight: 'bold' }}>
                            •
                          </span>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.isQuizComplete && (
                    <div style={{ marginTop: '12px' }}>
                      <button
                        type="button"
                        onClick={startInChatQuiz}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#f4f9f4',
                          border: '1.5px solid #2e5939',
                          color: '#1b3b22',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        <RotateCcw size={12} /> {language === 'mr' ? 'पुन्हा क्विझ द्या' : language === 'hi' ? 'दोबारा क्विज दें' : 'Retake Quiz'}
                      </button>
                    </div>
                  )}

                  {m.role === 'assistant' && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                      <a 
                        href="tel:+917758816074" 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#1b3b22',
                          color: '#ffffff',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          textDecoration: 'none',
                          boxShadow: '0 2px 6px rgba(27,59,34,0.18)'
                        }}
                      >
                        <Phone size={13} /> {language === 'mr' ? 'कॉल: +91 77588 16074' : language === 'hi' ? 'कॉल: +91 77588 16074' : 'Call: +91 77588 16074'}
                      </a>
                      <a 
                        href={`https://wa.me/917758816074?text=${encodeURIComponent('Hello Dr. Manish Yerpude, I am inquiring from the website for a consultation / appointment at AayuTatva Ayurvedic Hospital in Bhandara.')}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#25d366',
                          color: '#ffffff',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          textDecoration: 'none',
                          boxShadow: '0 2px 6px rgba(37,211,102,0.22)'
                        }}
                      >
                        <MessageCircle size={13} /> WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="vaidya-msg-row assistant">
                <div className="vaidya-typing-indicator" style={{ padding: '8px 12px', fontSize: '11px' }}>
                  <span>{language === 'mr' ? 'शास्त्रीय संहितेचा संदर्भ शोधत आहे…' : language === 'hi' ? 'शास्त्रीय संहिताओं से संदर्भ लिया जा रहा है…' : 'Consulting classical texts…'}</span>
                  <div className="vaidya-typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt chips */}
          <div className="vaidya-chips-tray" style={{ padding: '6px 12px', gap: '6px' }}>
            {language === 'mr' ? (
              <>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10.5px', padding: '4px 10px', background: '#1b3b22', color: '#ffffff', fontWeight: '700', borderColor: '#1b3b22' }}
                  onClick={startInChatQuiz}
                >
                  🧘 प्रकृती क्विझ (Prakriti Quiz)
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10.5px', padding: '4px 10px' }}
                  onClick={() => handleSend('नाडी परीक्षा कशी केली जाते?')}
                >
                  🩺 नाडी परीक्षा?
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10.5px', padding: '4px 10px' }}
                  onClick={() => handleSend('कंबरदुखी व सायटिका वर काय उपचार आहेत?')}
                >
                  🦴 कंबरदुखी व सायटिका?
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10.5px', padding: '4px 10px' }}
                  onClick={() => handleSend('माझ्या प्रकृतीनुसार काय खावे आणि काय टाळावे?')}
                >
                  🍲 आहार व पथ्य?
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10.5px', padding: '4px 10px' }}
                  onClick={() => handleSend('आयुतत्व हॉस्पिटलमध्ये कॅशलेस विमा कसा मिळतो?')}
                >
                  🏥 कॅशलेस विमा?
                </button>
              </>
            ) : language === 'hi' ? (
              <>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10.5px', padding: '4px 10px', background: '#1b3b22', color: '#ffffff', fontWeight: '700', borderColor: '#1b3b22' }}
                  onClick={startInChatQuiz}
                >
                  🧘 प्रकृति क्विज (Prakriti Quiz)
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10.5px', padding: '4px 10px' }}
                  onClick={() => handleSend('नाड़ी परीक्षा कैसे की जाती है?')}
                >
                  🩺 नाड़ी परीक्षा?
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10.5px', padding: '4px 10px' }}
                  onClick={() => handleSend('कमर दर्द और साइटिका का बिना ऑपरेशन इलाज क्या है?')}
                >
                  🦴 कमर दर्द व साइटिका?
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10.5px', padding: '4px 10px' }}
                  onClick={() => handleSend('आयुर्वेदिक आहार नियम क्या हैं?')}
                >
                  🍲 आहार नियम?
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10.5px', padding: '4px 10px' }}
                  onClick={() => handleSend('कैशलेस मेडिक्लेम बीमा सुविधा कैसे मिलती है?')}
                >
                  🏥 कैशलेस बीमा?
                </button>
              </>
            ) : (
              <>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10px', padding: '4px 10px', background: '#1b3b22', color: '#ffffff', fontWeight: '700', borderColor: '#1b3b22' }}
                  onClick={startInChatQuiz}
                >
                  🧘 Prakriti Quiz (Know Dosha)
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10px', padding: '4px 10px' }}
                  onClick={() => handleSend('How does Nadi Parikshan work?')}
                >
                  🩺 Nadi Pulse?
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10px', padding: '4px 10px' }}
                  onClick={() => handleSend('Tell me about non-surgical spine and sciatica treatment')}
                >
                  🦴 Spine / Sciatica?
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10px', padding: '4px 10px' }}
                  onClick={() => handleSend('What foods balance my Dosha and digestive Agni?')}
                >
                  🍲 Diet (Ahara)?
                </button>
                <button 
                  type="button" 
                  className="vaidya-chip" 
                  style={{ fontSize: '10px', padding: '4px 10px' }}
                  onClick={() => handleSend('How does 100% cashless mediclaim health insurance work?')}
                >
                  🏥 Cashless Desk?
                </button>
              </>
            )}
          </div>

          {/* Input Form */}
          <form 
            className="vaidya-chat-input-bar" 
            style={{ padding: '8px 12px' }}
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <input 
              type="text" 
              value={inputVal} 
              onChange={(e) => setInputVal(e.target.value)} 
              placeholder={getPlaceholder()}
              disabled={loading}
              style={{ height: '38px', fontSize: '12px' }}
            />
            <button 
              type="submit" 
              className="vaidya-send-btn" 
              disabled={loading || !inputVal.trim()}
              style={{ height: '38px', padding: '0 14px', fontSize: '12px' }}
            >
              <Send size={13}/>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
