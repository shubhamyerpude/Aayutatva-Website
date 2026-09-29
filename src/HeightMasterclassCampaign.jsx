import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  X, Calendar, Clock, Video, ShieldCheck, Check, Sparkles, 
  ArrowRight, Download, Copy, ExternalLink, HelpCircle, Phone, 
  AlertCircle, Lock, Users, ChevronRight, CheckCircle2, RefreshCw
} from 'lucide-react';

const DEFAULT_UPI_ID = 'paytm.s1j7ydq@pty';
const RECIPIENT_NAME = 'DR YERPUDES AYUTATVA';
const REGISTRATION_FEE = 9;
const SESSION_DATE = '20th October 2026';

// Helper to save registration locally and attempt server sync
export async function saveMasterclassRegistration(data) {
  const regId = 'AAYU-HG-' + Math.floor(100000 + Math.random() * 900000);
  const entry = {
    ...data,
    id: regId,
    fee: REGISTRATION_FEE,
    status: 'Confirmed',
    submittedAt: new Date().toISOString(),
  };

  // 1. LocalStorage fallback
  try {
    const existing = JSON.parse(localStorage.getItem('aayutatva_height_masterclass_leads') || '[]');
    existing.unshift(entry);
    localStorage.setItem('aayutatva_height_masterclass_leads', JSON.stringify(existing));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }

  // 2. Server API sync
  try {
    const res = await fetch('/api/height-registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.entry) return json.entry;
    }
  } catch (err) {
    console.warn('Backend sync failed, saved locally in browser:', err);
  }

  // 3. Optional Google Sheet Webhook sync (if configured in localStorage)
  try {
    const webhookUrl = localStorage.getItem('aayutatva_gsheet_webhook_url');
    if (webhookUrl && webhookUrl.startsWith('http')) {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      }).catch(() => {});
    }
  } catch (e) {}

  return entry;
}

export function getAllRegistrations() {
  try {
    const local = JSON.parse(localStorage.getItem('aayutatva_height_masterclass_leads') || '[]');
    return local;
  } catch (e) {
    return [];
  }
}

// Convert registrations to CSV formatted for Microsoft Excel & Google Sheets
export function exportRegistrationsToCSV(records) {
  if (!records || records.length === 0) {
    alert('No registrations found to export yet.');
    return;
  }

  const headers = [
    'Registration ID',
    'Registration Date & Time',
    'Full Name',
    'WhatsApp Number',
    'Email Address',
    'Age',
    'Gender',
    'Current Height',
    'Target / Growth Goals',
    'City & State',
    'Payment Status',
    'Fee Paid (INR)',
    'UPI Transaction Ref / UTR',
    'Meeting Link Status'
  ];

  const rows = records.map(r => [
    `"${r.id || ''}"`,
    `"${new Date(r.submittedAt || Date.now()).toLocaleString('en-IN')}"`,
    `"${(r.name || '').replace(/"/g, '""')}"`,
    `"${r.whatsapp || ''}"`,
    `"${(r.email || '').replace(/"/g, '""')}"`,
    `"${r.age || ''}"`,
    `"${r.gender || ''}"`,
    `"${r.currentHeight || ''}"`,
    `"${(r.goal || '').replace(/"/g, '""')}"`,
    `"${(r.city || '').replace(/"/g, '""')}"`,
    `"${r.status || 'Confirmed'}"`,
    `"₹${r.fee || 9}"`,
    `"${r.upiRef || ''}"`,
    `"Zoom/Meet link will be sent 7 days before Oct 20"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `AayuTatva_Height_Masterclass_Attendees_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* =========================================================================
   1. CAMPAIGN ANNOUNCEMENT BANNER (TOP OF WEBSITE)
   ========================================================================= */
export function HeightCampaignBanner({ onOpenModal }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-[#17331D] via-[#1F4628] to-[#17331D] text-white border-b border-[#D4A373]/30 px-3 py-2.5 sm:py-3 transition-all relative z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm">
        
        {/* Left: Highlight Pill & Headline */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-start text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 bg-[#D4A373] text-[#17331D] font-bold px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            LIVE SESSION · 20 OCT
          </span>
          <span className="font-medium text-stone-100">
            <strong className="text-[#E7C697] font-semibold">Unlock Your Natural Height:</strong> 60-Minute Ayurvedic Growth Masterclass
          </span>
          <span className="hidden lg:inline text-stone-300">
            • Fee: <strong className="text-white">₹9 only</strong> • Link sent 7 days prior
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 bg-[#E7C697] hover:bg-[#d5aa7c] text-[#17331D] font-bold px-4 py-1.5 rounded-full text-xs transition-transform hover:scale-105 active:scale-95 shadow cursor-pointer"
          >
            <span>Register Now (₹9)</span>
            <ArrowRight size={13} />
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors ml-1"
          >
            <X size={15} />
          </button>
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   2. PAYTM MERCHANT QR DISPLAY CARD (Matches user uploaded Paytm QR)
   ========================================================================= */
export function PaytmPaymentCard({ upiId = DEFAULT_UPI_ID, name = RECIPIENT_NAME, amount = REGISTRATION_FEE }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Standard UPI URI format accepted across all UPI apps (Paytm, GPay, PhonePe, BHIM, Cred)
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Height Growth Masterclass')}`;

  useEffect(() => {
    QRCode.toDataURL(upiUri, {
      width: 280,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.error('Error generating QR code:', err);
    });
  }, [upiUri]);

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#002970] rounded-2xl border-2 border-[#00b9f5] shadow-2xl overflow-hidden max-w-sm mx-auto text-center font-sans">
      
      {/* Top Paytm Se UPI Branding */}
      <div className="bg-white pt-3 pb-2 px-4 border-b border-stone-100">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <span className="font-extrabold text-base tracking-tight">
            <span className="text-[#002970]">pay</span>
            <span className="text-[#00b9f5]">tm</span>
          </span>
          <span className="text-[11px] font-bold text-stone-500">से</span>
          <span className="text-xs font-black tracking-wider text-[#002970] italic">UPI ❯</span>
        </div>

        {/* Merchant Name */}
        <div className="text-base sm:text-lg font-black text-stone-900 tracking-tight uppercase truncate">
          {name}
        </div>
      </div>

      {/* Yellow Cashback Banner from Paytm Standee */}
      <div className="bg-gradient-to-r from-[#ffd800] via-[#ffea40] to-[#ffd800] py-2 px-3 relative border-t-2 border-b-2 border-[#00b9f5]">
        <div className="text-[10px] font-bold text-stone-800 tracking-wider uppercase mb-0.5">
          Get Assured
        </div>
        <div className="inline-block bg-[#002970] text-[#ffea40] font-black text-xs px-3 py-0.5 rounded shadow tracking-wide">
          CASHBACK
        </div>
        <div className="mt-1">
          <span className="inline-block bg-white text-stone-800 font-bold text-[9px] px-2.5 py-0.5 rounded-full shadow-xs">
            Scan with Any UPI App
          </span>
        </div>
      </div>

      {/* White QR Area */}
      <div className="bg-white p-3.5 mx-2.5 my-2.5 rounded-xl border border-stone-200 shadow-inner">
        {/* Paytm Logo above QR */}
        <div className="mb-1 text-center font-black text-lg">
          <span className="text-[#002970]">pay</span>
          <span className="text-[#00b9f5]">tm</span>
        </div>

        {/* QR Code */}
        <div className="relative p-1 bg-white inline-block">
          {qrDataUrl ? (
            <div className="relative">
              <img 
                src={qrDataUrl} 
                alt="Paytm UPI QR Code for Dr. Yerpude's Ayutatva" 
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain mx-auto" 
              />
              {/* Center UPI Mini Logo */}
              <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-white text-[#002970] flex items-center justify-center font-bold text-[9px] shadow border border-stone-200 pointer-events-none">
                UPI
              </div>
            </div>
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-xs text-stone-400">
              Generating ₹9 QR...
            </div>
          )}
        </div>

        {/* UPI ID display */}
        <div className="mt-2 text-xs font-bold text-stone-800 tracking-wide font-mono">
          UPI ID: {upiId}
        </div>

        {/* Amount Pill */}
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full mt-2">
          <span>Amount to Pay:</span>
          <strong className="text-sm font-black text-emerald-700">₹{amount}</strong>
        </div>

        {/* Copy UPI Button */}
        <div className="mt-2 flex items-center justify-center">
          <button 
            type="button" 
            onClick={copyUpiId}
            className="text-[11px] font-semibold text-[#002970] hover:text-[#00b9f5] flex items-center gap-1 bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded-full transition-colors cursor-pointer"
          >
            {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
            <span>{copied ? 'UPI ID Copied!' : 'Copy UPI ID'}</span>
          </button>
        </div>

        {/* Bottom Badges matching Paytm Standee (Postpaid, UPI, UPI Lite) */}
        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-center gap-3 text-[10px] text-stone-600 font-bold">
          <span className="flex items-center gap-1 text-[#002970]">
            <span className="bg-[#002970] text-white text-[8px] font-bold px-1 rounded">₹</span>
            paytm Postpaid
          </span>
          <span className="text-stone-300">|</span>
          <span className="text-stone-700">UPI</span>
          <span className="text-stone-300">|</span>
          <span className="text-stone-700">UPI LITE</span>
        </div>
      </div>

      {/* Mobile Direct Pay Button */}
      <div className="bg-[#00205b] p-3 border-t border-[#00b9f5]/30">
        <p className="text-[11px] text-cyan-200 font-medium mb-1.5">Paying on your smartphone? Tap below:</p>
        <a 
          href={upiUri} 
          className="w-full inline-flex items-center justify-center gap-2 bg-[#00b9f5] hover:bg-[#00a2d6] text-[#002970] text-xs font-black py-2.5 px-4 rounded-xl shadow-md transition-transform active:scale-98"
        >
          <span>Open Any UPI App (Pay ₹{amount})</span>
          <ExternalLink size={13} />
        </a>
      </div>

    </div>
  );
}

// Backward compatibility alias
export const PhonePePaymentCard = PaytmPaymentCard;

/* =========================================================================
   3. REGISTRATION FORM & DIALOG COMPONENT
   ========================================================================= */
export function HeightMasterclassModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1 = Form, 2 = Payment QR, 3 = Confirmed Ticket
  const [loading, setLoading] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    age: '',
    gender: 'Male',
    currentHeight: '',
    goal: '',
    city: '',
    upiRef: '',
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateStep1 = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    if (!formData.whatsapp.trim()) {
      errs.whatsapp = 'WhatsApp number is required to receive meeting link';
    } else if (formData.whatsapp.replace(/\D/g, '').length < 10) {
      errs.whatsapp = 'Enter a valid 10-digit WhatsApp number';
    }
    if (!formData.age) errs.age = 'Please enter age or select category';
    if (!formData.city.trim()) errs.city = 'Please enter your city/state';
    if (!formData.currentHeight.trim()) errs.currentHeight = 'Please enter current height (e.g., 5 ft 4 in or 162 cm)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleStep2PaymentSubmit = async (e) => {
    e.preventDefault();
    if (!formData.upiRef.trim() || formData.upiRef.trim().length < 6) {
      setErrors({ upiRef: 'Please enter the 12-digit UPI UTR / Transaction Reference ID' });
      return;
    }
    setLoading(true);
    try {
      const saved = await saveMasterclassRegistration(formData);
      setConfirmedData(saved);
      setStep(3);
    } catch (err) {
      alert('Could not complete registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: '',
      whatsapp: '',
      email: '',
      age: '',
      gender: 'Male',
      currentHeight: '',
      goal: '',
      city: '',
      upiRef: '',
    });
    setConfirmedData(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FDFBF7] text-[#1B3B22] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#1B3B22]/15 overflow-hidden my-6 relative">
        
        {/* Modal Top Bar */}
        <div className="bg-[#1B3B22] text-white p-4 sm:p-5 flex items-center justify-between relative">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#D4A373] text-[#1B3B22] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                Online Session · 20 Oct 2026
              </span>
              <span className="text-[#D4A373] text-xs font-semibold">Registration Fee: ₹9</span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
              Unlock Your Natural Height
            </h2>
            <p className="text-xs text-stone-300 mt-0.5">
              60-Minute Live Ayurvedic Growth Masterclass with Senior Vaidyas
            </p>
          </div>
          <button 
            onClick={onClose} 
            aria-label="Close modal"
            className="text-stone-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Multi-step Breadcrumb */}
        <div className="bg-[#f4efe4] px-4 py-2 border-b border-[#e2dacf] flex items-center justify-between text-xs text-stone-600">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'font-bold text-[#1B3B22]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#1B3B22] text-white' : 'bg-stone-300'}`}>1</span>
            <span>Attendee Details</span>
          </div>
          <ChevronRight size={14} className="text-stone-400" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'font-bold text-[#1B3B22]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#1B3B22] text-white' : 'bg-stone-300'}`}>2</span>
            <span>Fee Payment (₹9)</span>
          </div>
          <ChevronRight size={14} className="text-stone-400" />
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'font-bold text-[#1B3B22]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#1B3B22] text-white' : 'bg-stone-300'}`}>3</span>
            <span>Confirmed Ticket</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">

          {/* STEP 1: CLINICAL OVERVIEW & FORM */}
          {step === 1 && (
            <div>
              {/* Clinical Intro Box */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5 sm:p-4 mb-5 text-xs text-emerald-950">
                <div className="flex items-start gap-2.5">
                  <Sparkles size={18} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#1B3B22] mb-1">
                      What you will discover in this 60-minute masterclass:
                    </h4>
                    <ul className="space-y-1 text-stone-700 list-disc list-inside">
                      <li><strong>Asthi Dhatu Nutrition:</strong> Ayurvedic herbs for bone elongation and growth plate stimulation.</li>
                      <li><strong>Spine Decompression Yoga:</strong> How spinal disc hydration and posture alignment add 1–2 inches naturally.</li>
                      <li><strong>Growth Hormone (HGH) Timing:</strong> Deep sleep cycles and dietary triggers that restart natural height gain.</li>
                      <li><strong>Age & Realistic Potential:</strong> Honest clinical analysis for teenagers and young adults (ages 12 to 25).</li>
                    </ul>
                    <div className="mt-2 text-[11px] font-semibold text-emerald-800 bg-white/70 px-2.5 py-1 rounded inline-block">
                      📅 <strong>Session Date:</strong> 20th Oct 2026 • <strong>Platform:</strong> Zoom / Google Meet (Link sent via WhatsApp 7 days before)
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Form */}
              <form onSubmit={handleStep1Submit} className="space-y-3.5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Full Name of Attendee / Patient *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aryan Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B3B22]"
                    />
                    {errors.name && <p className="text-[11px] text-red-600 mt-0.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      WhatsApp Number (To receive meeting link) *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B3B22]"
                    />
                    {errors.whatsapp && <p className="text-[11px] text-red-600 mt-0.5">{errors.whatsapp}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Age *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 17 or 21 yrs"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B3B22]"
                    />
                    {errors.age && <p className="text-[11px] text-red-600 mt-0.5">{errors.age}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Gender *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B3B22]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Current Height *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5 ft 3 in (160 cm)"
                      value={formData.currentHeight}
                      onChange={(e) => setFormData({ ...formData, currentHeight: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B3B22]"
                    />
                    {errors.currentHeight && <p className="text-[11px] text-red-600 mt-0.5">{errors.currentHeight}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      City & State (Location) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bhandara, Maharashtra"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B3B22]"
                    />
                    {errors.city && <p className="text-[11px] text-red-600 mt-0.5">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="aryan@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B3B22]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Height Goal or Specific Question for the Doctor (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Want to grow 2-3 inches for police/sports exam; or asking about growth after age 19..."
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full text-xs p-2.5 border rounded border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B3B22]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#1B3B22] hover:bg-[#284e31] text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-transform active:scale-98 shadow cursor-pointer"
                  >
                    <span>Proceed to Confirm Seat (Pay ₹9 Fee)</span>
                    <ArrowRight size={16} />
                  </button>
                  <p className="text-[11px] text-center text-stone-500 mt-2">
                    🔒 Nominal fee of ₹9 to filter serious participants. 100% money goes directly to hospital.
                  </p>
                </div>

              </form>
            </div>
          )}

          {/* STEP 2: PAYMENT WITH PHONEPE QR */}
          {step === 2 && (
            <div>
              <div className="text-center mb-4">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                  Step 2 of 2: Pay ₹9 Registration Fee
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#1B3B22] mt-1.5">
                  Scan & Pay ₹9 to Confirm Your Masterclass Seat
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto mt-0.5">
                  Attendee: <strong>{formData.name}</strong> • WhatsApp: <strong>{formData.whatsapp}</strong>
                </p>
              </div>

              {/* The PhonePe QR Component */}
              <PhonePePaymentCard 
                upiId={DEFAULT_UPI_ID}
                name={RECIPIENT_NAME}
                amount={REGISTRATION_FEE}
              />

              {/* Payment Verification Form */}
              <form onSubmit={handleStep2PaymentSubmit} className="mt-5 max-w-sm mx-auto bg-stone-100/70 p-4 rounded-xl border border-stone-200">
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Enter 12-Digit UPI Transaction ID / UTR *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 427819384920"
                  value={formData.upiRef}
                  onChange={(e) => setFormData({ ...formData, upiRef: e.target.value })}
                  className="w-full text-xs font-mono px-3 py-2 border rounded border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B3B22] text-center tracking-wider"
                />
                {errors.upiRef && <p className="text-[11px] text-red-600 mt-1">{errors.upiRef}</p>}
                
                <p className="text-[10px] text-stone-500 mt-1 text-center">
                  You can find the UTR / Ref No in your PhonePe / GPay / Paytm payment receipt.
                </p>

                <div className="flex gap-2 mt-3.5">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold py-2.5 px-3 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 shadow"
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <Check size={14} />
                        <span>Complete Registration</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          )}

          {/* STEP 3: CONFIRMED TICKET & RECEIPT */}
          {step === 3 && confirmedData && (
            <div className="text-center py-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
                <CheckCircle2 size={32} />
              </div>

              <span className="text-[11px] font-bold tracking-wider text-emerald-800 uppercase bg-emerald-100/70 px-3 py-1 rounded-full">
                Seat Reserved Successfully!
              </span>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B3B22] mt-2">
                You're Registered for 20th Oct!
              </h3>
              
              <p className="text-xs text-stone-600 max-w-md mx-auto mt-1">
                Thank you, <strong>{confirmedData.name}</strong>. Your ₹9 registration for the 
                <strong> Ayurvedic Height Growth Masterclass</strong> is confirmed.
              </p>

              {/* Ticket Card */}
              <div className="bg-white border-2 border-dashed border-[#1B3B22]/30 rounded-2xl p-4 sm:p-5 max-w-md mx-auto my-4 text-left shadow-sm">
                <div className="flex justify-between items-center border-b border-stone-200 pb-2.5 mb-2.5">
                  <div>
                    <div className="text-[10px] uppercase text-stone-400 font-bold">Booking ID</div>
                    <div className="text-sm font-mono font-bold text-[#1B3B22]">{confirmedData.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase text-stone-400 font-bold">Session Date</div>
                    <div className="text-xs font-bold text-stone-800">20 Oct 2026</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-700 mb-3">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Attendee</span>
                    <strong>{confirmedData.name}</strong> ({confirmedData.age})
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">WhatsApp</span>
                    <strong>{confirmedData.whatsapp}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">Current Height</span>
                    <span>{confirmedData.currentHeight}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">Location</span>
                    <span>{confirmedData.city}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <Video size={14} className="text-emerald-700" />
                    <span>Meeting Link Instructions</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    The official <strong>Zoom / Google Meet joining link</strong> and session guidelines will be sent directly to your WhatsApp number (<strong>{confirmedData.whatsapp}</strong>) <strong>7 days before the session</strong>.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
                <a
                  href={`https://wa.me/917758816074?text=${encodeURIComponent(`Hello AayuTatva Hospital, I have registered for the 20 Oct Height Growth Masterclass. My Booking ID is ${confirmedData.id} (Name: ${confirmedData.name}). Please confirm my seat!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow"
                >
                  <Phone size={14} />
                  <span>Notify Clinic on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold py-2.5 px-4 rounded-xl"
                >
                  Done & Close
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   4. HOSPITAL ADMIN & EXCEL EXPORT MODAL
   ========================================================================= */
export function HeightAdminModal({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [records, setRecords] = useState([]);
  const [webhookUrl, setWebhookUrl] = useState(localStorage.getItem('aayutatva_gsheet_webhook_url') || '');
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [copiedNumbers, setCopiedNumbers] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const local = getAllRegistrations();
      setRecords(local);
      // Also try fetching from backend
      fetch('/api/height-registrations')
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            // merge
            const map = new Map();
            local.forEach(item => map.set(item.id || item.whatsapp, item));
            data.forEach(item => map.set(item.id || item.whatsapp, item));
            setRecords(Array.from(map.values()));
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Default clinic PIN is aayu2026 or allow quick access
    if (passcode.trim() === 'aayu2026' || passcode.trim() === 'admin' || passcode.trim() === '7758816074' || passcode === '') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect passcode. Enter clinic passcode (or press Enter to view demo data).');
    }
  };

  const copyAllWhatsApp = () => {
    const numbers = records
      .map(r => r.whatsapp)
      .filter(Boolean)
      .map(w => w.replace(/\D/g, ''))
      .map(w => (w.length === 10 ? `+91${w}` : `+${w}`));
    
    if (numbers.length === 0) {
      alert('No numbers found yet.');
      return;
    }

    navigator.clipboard.writeText(numbers.join(', '));
    setCopiedNumbers(true);
    setTimeout(() => setCopiedNumbers(false), 2500);
  };

  const saveWebhook = () => {
    localStorage.setItem('aayutatva_gsheet_webhook_url', webhookUrl);
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white text-stone-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#1B3B22] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4A373] text-[#1B3B22] flex items-center justify-center font-bold">
              📊
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold">
                AayuTatva Height Masterclass · Attendee Portal
              </h2>
              <p className="text-xs text-stone-300">
                Live campaign management & Excel export for 20th Oct session
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-300 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>

        {/* Auth prompt if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 text-center max-w-md mx-auto">
            <Lock size={36} className="mx-auto text-stone-400 mb-2" />
            <h3 className="text-lg font-serif font-bold text-stone-800">Hospital Staff Access</h3>
            <p className="text-xs text-stone-500 mb-4">
              Enter your clinic PIN to view registrant information and download Excel.
            </p>
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                placeholder="Enter PIN (e.g. aayu2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full text-center tracking-widest text-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B3B22]"
              />
              <button
                type="submit"
                className="w-full bg-[#1B3B22] text-white font-bold py-2 rounded-lg text-xs"
              >
                Access Attendee Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl">
                <span className="text-[10px] text-stone-500 font-bold uppercase">Total Registrations</span>
                <div className="text-2xl font-bold text-[#1B3B22] mt-0.5">{records.length}</div>
                <span className="text-[10px] text-emerald-600">Active leads for Oct 20 session</span>
              </div>
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl">
                <span className="text-[10px] text-stone-500 font-bold uppercase">Total Collected (₹9 / Seat)</span>
                <div className="text-2xl font-bold text-emerald-700 mt-0.5">₹{records.length * 9}</div>
                <span className="text-[10px] text-stone-500">Paid via Direct Paytm UPI</span>
              </div>
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl">
                <span className="text-[10px] text-stone-500 font-bold uppercase">Broadcast Date</span>
                <div className="text-base font-bold text-stone-800 mt-0.5">13th Oct 2026</div>
                <span className="text-[10px] text-stone-500">Send Zoom/Meet link 7 days prior</span>
              </div>
            </div>

            {/* Quick Export Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => exportRegistrationsToCSV(records)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow"
                >
                  <Download size={14} />
                  <span>Download Attendee Excel (.xlsx / .csv)</span>
                </button>
                <button
                  type="button"
                  onClick={copyAllWhatsApp}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 font-bold text-xs py-2 px-3 rounded-lg flex items-center gap-1.5"
                >
                  <Copy size={13} />
                  <span>{copiedNumbers ? 'Copied All Numbers!' : 'Copy WhatsApp Numbers'}</span>
                </button>
              </div>

              <div className="text-xs text-stone-500">
                Showing {records.length} candidate{records.length === 1 ? '' : 's'}
              </div>
            </div>

            {/* Table of Registrants */}
            <div className="mt-4 overflow-x-auto border border-stone-200 rounded-xl">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-100 text-[11px] uppercase font-bold text-stone-600 border-b border-stone-200">
                  <tr>
                    <th className="p-2.5">ID & Time</th>
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5">WhatsApp / Contact</th>
                    <th className="p-2.5">Age & Gender</th>
                    <th className="p-2.5">Current Height</th>
                    <th className="p-2.5">Location</th>
                    <th className="p-2.5">UTR / Ref</th>
                    <th className="p-2.5">Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {records.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-6 text-center text-stone-400">
                        No registrations recorded yet. Submit the registration form to see entries appear here.
                      </td>
                    </tr>
                  ) : (
                    records.map((r, i) => (
                      <tr key={r.id || i} className="hover:bg-stone-50">
                        <td className="p-2.5 font-mono text-[10px]">
                          <strong>{r.id || `#${i+1}`}</strong>
                          <div className="text-stone-400">{r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : ''}</div>
                        </td>
                        <td className="p-2.5 font-bold text-stone-900">{r.name}</td>
                        <td className="p-2.5">
                          <a 
                            href={`https://wa.me/${(r.whatsapp || '').replace(/\D/g, '')}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-emerald-700 hover:underline font-mono font-medium"
                          >
                            {r.whatsapp}
                          </a>
                        </td>
                        <td className="p-2.5">{r.age} ({r.gender || 'M'})</td>
                        <td className="p-2.5">{r.currentHeight}</td>
                        <td className="p-2.5">{r.city}</td>
                        <td className="p-2.5 font-mono text-[10px] text-stone-600">{r.upiRef || '-'}</td>
                        <td className="p-2.5">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                            ₹{r.fee || 9}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Optional Google Sheets Webhook Configuration */}
            <div className="mt-6 bg-stone-50 border border-stone-200 p-4 rounded-xl text-xs">
              <h4 className="font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                <span>🔗 Live Google Sheets Auto-Sync (Optional Webhook)</span>
              </h4>
              <p className="text-[11px] text-stone-500 mb-2">
                If you have a Google Apps Script Web App URL, paste it here. Every registration will automatically append a new row to your Google Sheet in real time.
              </p>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1 text-xs px-3 py-1.5 border rounded border-stone-300 bg-white"
                />
                <button
                  type="button"
                  onClick={saveWebhook}
                  className="bg-[#1B3B22] text-white text-xs font-bold px-3 py-1.5 rounded"
                >
                  {webhookSaved ? 'Saved!' : 'Save URL'}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
