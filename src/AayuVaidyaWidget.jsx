import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, X, Send, Activity, HelpCircle, MessageCircle, 
  RotateCcw, ArrowRight, ShieldCheck, Phone, Globe
} from 'lucide-react';
import { generateInternalAyurvedicResponse } from './ayurvedicInternalEngine.ts';
import './vaidya-ai.css';

const whatsappPhone = '917758816074';
const phonePrimary = '+917758816074';

const WELCOME_MESSAGES = {
  mr: 'नमस्कार! 🙏 आयुतत्व आयुर्वेदिक हॉस्पिटल व पंचकर्म केंद्र, भंडारा मध्ये आपले स्वागत आहे. डॉ. मनिष संतोष येरपुडे यांच्याशी सल्लामसलत, नाडी परीक्षा किंवा उपचारांसाठी खालील पर्यायांवरून थेट कॉल करा किंवा व्हॉट्सॲपवर संपर्क साधा:',
  hi: 'नमस्ते! 🙏 आयुतत्व आयुर्वेदिक हॉस्पिटल एवं पंचकर्म केंद्र, भंडारा में आपका स्वागत है। डॉ. मनीष संतोष येरपुडे से परामर्श, नाड़ी परीक्षा या उपचार के लिए नीचे दिए गए बटन से कॉल करें या व्हाट्सएप पर संपर्क करें:',
  en: 'Namaste! 🙏 Welcome to AayuTatva Ayurvedic Hospital & Panchakarma Centre, Bhandara. Consult Dr. Manish Santosh Yerpude for classical treatments, pulse examination, and Panchakarma:'
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
    // If user has not chatted yet or only initial welcome exists, refresh the welcome message in new language
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

  const handleSend = async (text = inputVal) => {
    const trimmed = text.trim();
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
                    __html: m.text
                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#1b3b22;font-weight:700;text-decoration:underline;">$1</a>')
                      .replace(/### (.*?)\n/g, '<b style="display:block;margin-bottom:6px;color:#1b3b22;font-size:13px">$1</b>')
                      .replace(/#### (.*?)\n/g, '<b style="display:block;margin-top:8px;margin-bottom:4px;color:#274b2a;font-size:12px">$1</b>')
                      .replace(/> (.*?)\n/g, '<blockquote style="border-left:3px solid #2e7d32;padding-left:8px;margin:6px 0;font-style:italic;color:#3e4a3c;background:rgba(46,125,50,0.06);padding-top:3px;padding-bottom:3px">$1</blockquote>')
                      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/\n\n/g, '<br/><br/>')
                      .replace(/\n/g, '<br/>')
                  }} />

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
