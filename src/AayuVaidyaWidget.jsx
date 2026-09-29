import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, X, Send, Activity, HelpCircle, MessageCircle, 
  RotateCcw, ArrowRight, ShieldCheck, Phone
} from 'lucide-react';
import { generateInternalAyurvedicResponse } from './ayurvedicInternalEngine.ts';
import './vaidya-ai.css';

const whatsappPhone = '917758816074';
const phonePrimary = '+917758816074';

export function AayuVaidyaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Namaste! 🙏 Welcome to AayuTatva Ayurvedic Hospital. For consultations, treatment inquiries, or appointments with Dr. Manish Santosh Yerpude, tap below to call our clinic or chat on WhatsApp:',
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
          text: data.reply || 'Namaste. I am here to help you with your Ayurvedic questions.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.warn('Widget using internal engine:', err);
      const internalRes = generateInternalAyurvedicResponse(trimmed, nextMessages);
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
          <span>Ask AayuVaidya AI 🌿</span>
        </button>
      )}

      {/* Floating Assistant Modal */}
      {isOpen && (
        <div className="vaidya-floating-modal" role="dialog" aria-modal="true" aria-label="AayuVaidya AI Assistant">
          <div className="vaidya-modal-head">
            <h3>
              <Sparkles size={16} color="#e5c38d"/>
              <span>AayuVaidya AI</span>
            </h3>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
            >
              <X size={18}/>
            </button>
          </div>

          <div style={{ background: '#f5f2ea', padding: '8px 14px', fontSize: '11px', color: '#5b695a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e7e0d3' }}>
            <span>Trained on Charaka Samhita & Clinical Protocol</span>
            <a href="/vaidya-ai.html" style={{ color: '#1b3b22', fontWeight: '600', textDecoration: 'underline' }}>
              Full Page ↗
            </a>
          </div>

          {/* Messages */}
          <div className="vaidya-messages-area" style={{ maxHeight: 'none', flex: 1, padding: '16px' }}>
            {messages.map((m, i) => (
              <div key={i} className={`vaidya-msg-row ${m.role}`} style={{ maxWidth: '94%' }}>
                <div className="vaidya-msg-bubble" style={{ padding: '12px 14px', fontSize: '12px' }}>
                  <div dangerouslySetInnerHTML={{ 
                    __html: m.text
                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#1b3b22;font-weight:700;text-decoration:underline;">$1</a>')
                      .replace(/### (.*?)\n/g, '<b style="display:block;margin-bottom:4px;color:#1b3b22;font-size:13px">$1</b>')
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
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          textDecoration: 'none',
                          boxShadow: '0 2px 6px rgba(27,59,34,0.18)'
                        }}
                      >
                        <Phone size={13} /> Call: +91 77588 16074
                      </a>
                      <a 
                        href={`https://wa.me/917758816074?text=${encodeURIComponent('Hello Dr. Manish Yerpude, I am inquiring from the website for an appointment / consultation at AayuTatva Ayurvedic Hospital in Bhandara.')}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#25d366',
                          color: '#ffffff',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          textDecoration: 'none',
                          boxShadow: '0 2px 6px rgba(37,211,102,0.22)'
                        }}
                      >
                        <MessageCircle size={13} /> WhatsApp Us
                      </a>
                    </div>
                  )}

                  <span className="vaidya-msg-time">{m.time}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="vaidya-msg-row assistant">
                <div className="vaidya-typing-indicator" style={{ padding: '8px 12px', fontSize: '11px' }}>
                  <span>Vaidya AI thinking…</span>
                  <div className="vaidya-typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt chips */}
          <div className="vaidya-chips-tray" style={{ padding: '8px 12px' }}>
            <button 
              type="button" 
              className="vaidya-chip" 
              style={{ fontSize: '10px', padding: '4px 10px' }}
              onClick={() => handleSend('How does Nadi Parikshan work?')}
            >
              Nadi Pulse?
            </button>
            <button 
              type="button" 
              className="vaidya-chip" 
              style={{ fontSize: '10px', padding: '4px 10px' }}
              onClick={() => handleSend('What foods balance my Dosha?')}
            >
              Diet (Ahara)?
            </button>
            <button 
              type="button" 
              className="vaidya-chip" 
              style={{ fontSize: '10px', padding: '4px 10px' }}
              onClick={() => handleSend('Tell me about non-surgical spine treatment')}
            >
              Spine / Sciatica?
            </button>
            <a 
              href="/prakriti-quiz.html" 
              className="vaidya-chip" 
              style={{ fontSize: '10px', padding: '4px 10px', background: '#1b3b22', color: '#fff' }}
            >
              Dosha Quiz ↗
            </a>
          </div>

          {/* Input Form */}
          <form 
            className="vaidya-chat-input-bar" 
            style={{ padding: '10px 14px' }}
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <input 
              type="text" 
              value={inputVal} 
              onChange={(e) => setInputVal(e.target.value)} 
              placeholder="Ask AayuVaidya AI…"
              disabled={loading}
              style={{ height: '40px', fontSize: '12px' }}
            />
            <button 
              type="submit" 
              className="vaidya-send-btn" 
              disabled={loading || !inputVal.trim()}
              style={{ height: '40px', padding: '0 14px', fontSize: '12px' }}
            >
              <Send size={13}/>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
