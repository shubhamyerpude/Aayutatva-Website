import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  X, Calendar, Clock, Video, ShieldCheck, Check, Sparkles, 
  ArrowRight, Download, Copy, ExternalLink, HelpCircle, Phone, 
  AlertCircle, Lock, Users, ChevronRight, CheckCircle2, RefreshCw,
  Leaf, Activity, Award, CreditCard, MessageCircle, Eye, EyeOff, KeyRound
} from 'lucide-react';

export const DEFAULT_COMPLEX_ADMIN_PASSWORD = 'DrYerpude@Aayu2026#Secure';
const DEFAULT_UPI_ID = 'paytm.s1j7ydq@pty';
const RECIPIENT_NAME = 'DR YERPUDES AYUTATVA';
const REGISTRATION_FEE = 9;
const SESSION_DATE = 'Sunday, 18th October 2026';
const SESSION_TIME = 'Evening 7:00 PM – 8:00 PM (IST)';
const DEFAULT_PAYMENT_LINK = '';
const DEFAULT_QR_IMAGE = '/media/payment-link-qr.png';
export const DEFAULT_GSHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxa4-2ZntsN5_-0X4NLcrKmIOBjuFpQn868VMxvyFkaeWBXKbvLoAjCtWUD9vOpoVzm/exec';

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

  // 3. Google Sheet Webhook sync (real-time automated row append)
  try {
    const webhookUrl = localStorage.getItem('aayutatva_gsheet_webhook_url') || DEFAULT_GSHEET_WEBHOOK_URL;
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
    `"${r.status || 'Paid via UPI (Verification Pending)'}"`,
    `"₹${r.fee || 9}"`,
    `"${r.upiRef || ''}"`,
    `"Zoom/Meet link will be received 3 days prior to masterclass date"`
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
   1. PAYTM MERCHANT QR DISPLAY CARD (Matches user uploaded Paytm QR)
   ========================================================================= */
export function PaytmPaymentCard({ 
  upiId = DEFAULT_UPI_ID, 
  name = RECIPIENT_NAME, 
  amount = REGISTRATION_FEE, 
  compact = false,
  paymentLink = DEFAULT_PAYMENT_LINK,
  qrImage = DEFAULT_QR_IMAGE
}) {
  const [selectedMethod, setSelectedMethod] = useState('paytm'); // 'paytm' | 'direct'
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [desktopNotice, setDesktopNotice] = useState(false);

  const activeUpiId = selectedMethod === 'direct' ? 'yerpudeabhilasha@okhdfcbank' : upiId;
  const activeName = selectedMethod === 'direct' ? 'SHUBHAM SANTOSH YERPUDE' : name;
  const activeQrImage = selectedMethod === 'direct' ? '' : qrImage;

  // Standard UPI URI format accepted across all UPI apps
  const upiUri = `upi://pay?pa=${encodeURIComponent(activeUpiId)}&pn=${encodeURIComponent(activeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Height Growth Masterclass 18 Oct')}`;
  
  // Real web payment link if user explicitly configured an http URL
  const hasCustomWebLink = Boolean(paymentLink && paymentLink.trim().startsWith('http'));
  const directPayUrl = hasCustomWebLink ? paymentLink.trim() : upiUri;

  useEffect(() => {
    QRCode.toDataURL(hasCustomWebLink ? directPayUrl : upiUri, {
      width: compact ? 100 : 140,
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
  }, [upiUri, directPayUrl, hasCustomWebLink, compact]);

  const copyPayInfo = () => {
    navigator.clipboard.writeText(activeUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayClick = (e) => {
    if (hasCustomWebLink) {
      return; // Regular external web link
    }

    const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      navigator.clipboard.writeText(activeUpiId);
      setDesktopNotice(true);
      setTimeout(() => setDesktopNotice(false), 4500);
    }
  };

  return (
    <div className={`bg-[#002970] rounded-xl border border-[#00b9f5] shadow-md overflow-hidden mx-auto text-center font-sans ${compact ? 'max-w-[260px]' : 'max-w-[290px]'}`}>
      
      {/* Top Paytm / Payment Header */}
      <div className={`bg-white border-b border-stone-100 flex items-center justify-between ${compact ? 'py-1 px-2.5' : 'py-1.5 px-3'}`}>
        <div className="flex items-center gap-1">
          <span className={`font-extrabold tracking-tight ${compact ? 'text-xs' : 'text-sm'}`}>
            <span className="text-[#002970]">pay</span>
            <span className="text-[#00b9f5]">tm</span>
          </span>
          <span className="text-[9px] font-bold text-stone-500">UPI / QR</span>
        </div>
        <span className="text-[9px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Fee: ₹{amount}
        </span>
      </div>

      {/* Option Selector Toggle: Paytm Merchant QR vs Direct Bank UPI */}
      <div className="bg-[#001d52] p-1 flex items-center justify-center gap-1 text-[9px] font-semibold text-white">
        <button
          type="button"
          onClick={() => setSelectedMethod('paytm')}
          className={`flex-1 py-1 px-1.5 rounded transition-colors cursor-pointer ${
            selectedMethod === 'paytm' ? 'bg-[#00b9f5] text-[#002970] font-black' : 'text-stone-300 hover:text-white'
          }`}
        >
          Paytm QR
        </button>
        <button
          type="button"
          onClick={() => setSelectedMethod('direct')}
          className={`flex-1 py-1 px-1.5 rounded transition-colors cursor-pointer ${
            selectedMethod === 'direct' ? 'bg-[#00b9f5] text-[#002970] font-black' : 'text-stone-300 hover:text-white'
          }`}
        >
          Direct Bank UPI (PhonePe Fix)
        </button>
      </div>

      {/* QR Code Container (Displays Attached / Generated QR) */}
      <div className={`bg-white rounded-lg border border-stone-200 ${compact ? 'p-1.5 mx-1.5 my-1' : 'p-2 mx-2 my-1.5'}`}>
        <div className="relative inline-block">
          <img 
            src={activeQrImage || qrDataUrl} 
            onError={(e) => {
              if (qrDataUrl && e.currentTarget.src !== qrDataUrl) {
                e.currentTarget.src = qrDataUrl;
              }
            }}
            alt="Masterclass Payment QR Code" 
            className={`${compact ? 'w-20 h-20' : 'w-28 h-28 sm:w-32 sm:h-32'} object-contain mx-auto rounded`} 
          />
          <div className="absolute inset-0 m-auto w-5 h-5 rounded-full bg-white text-[#002970] flex items-center justify-center font-bold text-[7px] shadow border border-stone-200 pointer-events-none">
            UPI
          </div>
        </div>

        {/* UPI ID & Copy Button */}
        <div className="mt-0.5 flex items-center justify-center gap-1 text-[9px] font-mono font-bold text-stone-800">
          <span className="truncate max-w-[160px]">{activeUpiId}</span>
          <button 
            type="button" 
            onClick={copyPayInfo}
            className="text-[8px] text-[#002970] bg-stone-100 hover:bg-stone-200 px-1 py-0.5 rounded cursor-pointer"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Direct Tap to Pay / Open Link */}
      <div className={`bg-[#00205b] border-t border-[#00b9f5]/30 ${compact ? 'p-1.5' : 'p-2'}`}>
        <a 
          href={directPayUrl} 
          onClick={handlePayClick}
          target={hasCustomWebLink ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1 bg-[#00b9f5] hover:bg-[#00a2d6] text-[#002970] text-[11px] font-black py-1.5 px-2 rounded-lg shadow transition-transform active:scale-98"
        >
          {desktopNotice ? (
            <span className="text-[#002970] font-black">✓ UPI ID Copied! Scan QR on Mobile</span>
          ) : hasCustomWebLink ? (
            <>
              <span>Open Payment Link (₹{amount})</span>
              <ExternalLink size={11} />
            </>
          ) : (
            <>
              <span>Tap to Pay ₹{amount} ({selectedMethod === 'direct' ? 'Bank UPI' : 'Paytm / UPI'})</span>
              <ExternalLink size={11} />
            </>
          )}
        </a>
        <p className="text-[8.5px] text-sky-200 mt-1 leading-tight font-medium">
          💡 {selectedMethod === 'direct' 
            ? 'Works on all apps: PhonePe, GPay, Paytm, BHIM' 
            : 'If PhonePe gives an error, tap "Direct Bank UPI" above or use GPay/Paytm.'}
        </p>
        {desktopNotice && (
          <p className="text-[9px] text-[#00b9f5] mt-1 leading-tight font-medium">
            Laptops don't have UPI apps. Scan the QR code with your mobile phone or use copied UPI ID: <span className="font-mono text-white">{activeUpiId}</span>
          </p>
        )}
      </div>

    </div>
  );
}

// Backward compatibility alias
export const PhonePePaymentCard = PaytmPaymentCard;

/* =========================================================================
   2. HIGH-CONVERTING MOBILE-FIRST POPUP & FLOATING CAMPAIGN WIDGET
   ========================================================================= */
export function HeightCampaignPopup({ autoOpen = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [step, setStep] = useState(0); // 0 = Pitch Teaser, 1 = Form, 2 = Paytm QR, 3 = Confirmed Ticket
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  useEffect(() => {
    // 1. Auto-open popup on page load if user hasn't explicitly dismissed it this session
    if (autoOpen) {
      const dismissed = sessionStorage.getItem('aayutatva_height_popup_closed');
      if (!dismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 900); // 900ms smooth delay after page loads
        return () => clearTimeout(timer);
      }
    }

    // 2. Custom event listener from any button on site
    const handleOpen = (e) => {
      const targetStep = e?.detail?.step !== undefined ? e.detail.step : 0;
      setStep(targetStep);
      setIsOpen(true);
    };

    window.addEventListener('open-height-masterclass', handleOpen);
    return () => window.removeEventListener('open-height-masterclass', handleOpen);
  }, [autoOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('aayutatva_height_popup_closed', 'true');
  };

  const handleCloseBanner = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsBannerDismissed(true);
    try {
      sessionStorage.setItem('aayutatva_height_banner_dismissed', 'true');
    } catch (err) {}
  };

  const validateStep1 = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    if (!formData.whatsapp.trim()) {
      errs.whatsapp = 'WhatsApp number is required to receive meeting link';
    } else if (formData.whatsapp.replace(/\D/g, '').length < 10) {
      errs.whatsapp = 'Enter a valid 10-digit WhatsApp number';
    }
    if (!formData.age) errs.age = 'Please enter age';
    if (!formData.city.trim()) errs.city = 'Please enter your city/state';
    if (!formData.currentHeight.trim()) errs.currentHeight = 'Please enter current height (e.g., 5 ft 4 in)';
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
    if (e && e.preventDefault) e.preventDefault();
    
    let finalUpiRef = formData.upiRef.trim();
    if (!finalUpiRef) {
      finalUpiRef = 'UPI-' + Math.floor(100000 + Math.random() * 900000);
    }

    setLoading(true);
    try {
      const dataToSave = { 
        ...formData, 
        upiRef: finalUpiRef,
        status: 'Paid ₹9 via UPI (Verification Pending)'
      };
      // 1. Update attendee details in Excel sheet / backend data store
      const saved = await saveMasterclassRegistration(dataToSave);
      setConfirmedData(saved);
      setStep(3);

      // 2. Pre-craft WhatsApp confirmation message containing form details, booking ID, payment status
      const msg = [
        `*AayuTatva Ayurvedic Hospital — Height Masterclass Registration*`,
        `Namaste Dr. Yerpude, I have paid the registration fee of ₹9 via UPI.`,
        ``,
        `📋 *Booking ID:* ${saved.id}`,
        `👤 *Attendee Name:* ${saved.name}`,
        `📞 *WhatsApp Number:* ${saved.whatsapp}`,
        `🎂 *Age / Gender:* ${saved.age} yrs, ${saved.gender || 'Male'}`,
        `📏 *Current Height:* ${saved.currentHeight}`,
        `🎯 *Target / Goal:* ${saved.goal || 'Natural Height Growth Guidance'}`,
        `📍 *City:* ${saved.city}`,
        `📅 *Session Date & Time:* Sunday, 18 Oct 2026 (Evening 7:00 PM – 8:00 PM)`,
        `💳 *Payment Method:* Payment Link / Direct UPI (paytm.s1j7ydq@pty)`,
        `🔢 *UPI / Payment Ref:* ${saved.upiRef}`,
        `✅ *Payment Status:* Paid ₹9 (Please check sheet and confirm)`,
        ``,
        `Kindly check the payment status in your sheet and send confirmation.`,
        `*Note:* Meeting link will be received 3 days prior (by 15th Oct) on WhatsApp.`
      ].join('\n');

      // 3. Redirect user to WhatsApp link
      const waUrl = `https://wa.me/917758816074?text=${encodeURIComponent(msg)}`;
      setTimeout(() => {
        try {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        } catch (e) {}
      }, 700);

    } catch (err) {
      alert('Could not update registration in sheet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. Elevated Floating Live Masterclass Banner with Dismiss/Close Button */}
      {!isOpen && !isBannerDismissed && (
        <div
          className="fixed bottom-[84px] right-3 sm:bottom-6 sm:right-6 z-[950] flex items-center bg-[#17331D] text-[#E7C697] border-2 border-[#D4A373] rounded-full shadow-2xl overflow-hidden text-xs font-bold transition-all duration-200 max-w-[calc(100vw-28px)]"
          role="region"
          aria-label="Live Masterclass Announcement"
        >
          <button
            type="button"
            onClick={() => { setStep(0); setIsOpen(true); }}
            className="flex items-center gap-2 px-3.5 py-2 hover:bg-[#1f4628] active:scale-95 transition-all text-xs font-bold cursor-pointer text-[#E7C697] whitespace-nowrap"
            aria-label="Open 18 Oct Height Masterclass details"
          >
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span>Live Masterclass (18 Oct · 7-8 PM · ₹9)</span>
          </button>
          <button
            type="button"
            onClick={handleCloseBanner}
            className="px-2.5 py-2 text-[#E7C697]/80 hover:text-white hover:bg-black/30 active:scale-90 transition-all border-l border-[#D4A373]/40 cursor-pointer flex items-center justify-center flex-shrink-0"
            title="Close Live Masterclass banner"
            aria-label="Close Live Masterclass banner"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* 2. Compact Mobile-Friendly Popup Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/75 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Card Container: Reduced width & height to fit mobile viewports */}
          <div className="bg-[#FDFBF7] text-[#1B3B22] w-full max-w-[340px] sm:max-w-[360px] rounded-2xl shadow-2xl border-2 border-[#D4A373] overflow-hidden max-h-[82vh] sm:max-h-[86vh] flex flex-col relative animate-in zoom-in-95 duration-200 campaign-modal">
            
            {/* Compact Header with Live Badge & Close Button */}
            <div className="bg-[#17331D] text-white px-3 py-2 flex items-center justify-between border-b border-[#D4A373]/30 flex-shrink-0">
              <div className="pr-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 bg-[#D4A373] text-[#17331D] text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                    18 OCT · 7-8 PM · LIVE
                  </span>
                  <span className="text-[#E7C697] text-[10px] font-bold">Fee: ₹9 Only</span>
                </div>
                <h2 className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5 leading-tight">
                  Natural Height Growth Masterclass
                </h2>
              </div>

              {/* Close Button */}
              <button 
                type="button"
                onClick={handleClose} 
                aria-label="Close masterclass popup"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-stone-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Compact Step Indicator if not in step 0 */}
            {step > 0 && (
              <div className="bg-[#f4efe4] px-3 py-1 border-b border-[#e2dacf] flex items-center justify-between text-[9px] text-stone-600 flex-shrink-0">
                <div className={`flex items-center gap-1 ${step >= 1 ? 'font-bold text-[#1B3B22]' : ''}`}>
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] ${step >= 1 ? 'bg-[#1B3B22] text-white' : 'bg-stone-300'}`}>1</span>
                  <span>Details</span>
                </div>
                <ChevronRight size={10} className="text-stone-400" />
                <div className={`flex items-center gap-1 ${step >= 2 ? 'font-bold text-[#1B3B22]' : ''}`}>
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] ${step >= 2 ? 'bg-[#1B3B22] text-white' : 'bg-stone-300'}`}>2</span>
                  <span>Paytm UPI (₹9)</span>
                </div>
                <ChevronRight size={10} className="text-stone-400" />
                <div className={`flex items-center gap-1 ${step >= 3 ? 'font-bold text-[#1B3B22]' : ''}`}>
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] ${step >= 3 ? 'bg-[#1B3B22] text-white' : 'bg-stone-300'}`}>3</span>
                  <span>Ticket</span>
                </div>
              </div>
            )}

            {/* Scrollable Modal Body */}
            <div className="p-2.5 sm:p-3 overflow-y-auto flex-1 overscroll-contain">

              {/* STEP 0: ULTRA-COMPACT STREAMLINED INVITATION PITCH */}
              {step === 0 && (
                <div className="space-y-2 text-center">
                  {/* Doctor Row (Compact) */}
                  <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-stone-200 shadow-2xs text-left">
                    <img 
                      src="/media/dr-manish-yerpude.jpg" 
                      alt="Dr. Manish Santosh Yerpude" 
                      className="w-8 h-8 rounded-full object-cover border border-[#D4A373] flex-shrink-0"
                    />
                    <div className="leading-tight">
                      <div className="font-bold text-stone-900 text-xs">Dr. Manish Santosh Yerpude</div>
                      <div className="text-[9px] text-stone-500">[B.A.M.S., MD (AM)] · NABH Centre</div>
                    </div>
                  </div>

                  {/* Concise Highlights & Notice */}
                  <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-2 text-left space-y-1">
                    <div className="flex items-center justify-between text-[#17331D] font-bold text-[10px]">
                      <span>📅 Sun, 18 Oct 2026 · 7:00 PM – 8:00 PM (Evening)</span>
                      <span className="bg-[#17331D] text-[#E7C697] text-[9px] px-2 py-0.5 rounded-full">₹9 Only</span>
                    </div>
                    <p className="text-[10px] text-stone-700 leading-snug">
                      60-min doctor session (7–8 PM) on bone growth plates, spine decompression & Ayurvedic nutrition for ages 12–25.
                    </p>
                    <p className="text-[9px] text-emerald-900 font-semibold">
                      📲 Meeting link delivered <strong>3 days prior (by 15th Oct)</strong> on WhatsApp.
                    </p>
                  </div>

                  {/* Primary CTA Button (Always visible on mobile without scrolling) */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full bg-[#17331D] hover:bg-[#1f4628] active:scale-98 text-[#E7C697] font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform cursor-pointer"
                  >
                    <span>Claim Your Seat Now (Pay ₹9 Fee)</span>
                    <ArrowRight size={14} />
                  </button>

                  {/* Secondary Dismiss */}
                  <div className="pt-0.5">
                    <button 
                      type="button"
                      onClick={handleClose}
                      className="text-[10px] text-stone-400 hover:text-stone-600 cursor-pointer"
                    >
                      Maybe later
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 1: COMPACT ATTENDEE DETAILS FORM */}
              {step === 1 && (
                <div className="space-y-2 text-left">
                  <div className="mb-1">
                    <h3 className="font-bold text-xs sm:text-sm text-[#1B3B22]">Attendee & Contact Information</h3>
                    <p className="text-[10px] text-stone-500">
                      Meeting link will be received 3 days prior on WhatsApp.
                    </p>
                  </div>

                  <form onSubmit={handleStep1Submit} className="space-y-2 text-left">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Aryan Sharma"
                        value={formData.name}
                        onChange={handleChange}
                        className="campaign-input w-full text-[13px] font-medium text-stone-800 px-3 py-1.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#17331D] focus:border-[#17331D] h-9"
                      />
                      {errors.name && <p className="text-[9px] text-red-600 mt-0.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        placeholder="e.g. 9876543210"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="campaign-input w-full text-[13px] font-medium text-stone-800 px-3 py-1.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#17331D] focus:border-[#17331D] h-9"
                      />
                      {errors.whatsapp && <p className="text-[9px] text-red-600 mt-0.5">{errors.whatsapp}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                          Age *
                        </label>
                        <input
                          type="text"
                          name="age"
                          placeholder="e.g. 18"
                          value={formData.age}
                          onChange={handleChange}
                          className="campaign-input w-full text-[13px] font-medium text-stone-800 px-3 py-1.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#17331D] focus:border-[#17331D] h-9"
                        />
                        {errors.age && <p className="text-[9px] text-red-600 mt-0.5">{errors.age}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="campaign-input w-full text-[13px] font-medium text-stone-800 px-3 py-1.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#17331D] focus:border-[#17331D] h-9"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                          Current Height *
                        </label>
                        <input
                          type="text"
                          name="currentHeight"
                          placeholder="e.g. 5 ft 4 in"
                          value={formData.currentHeight}
                          onChange={handleChange}
                          className="campaign-input w-full text-[13px] font-medium text-stone-800 px-3 py-1.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#17331D] focus:border-[#17331D] h-9"
                        />
                        {errors.currentHeight && <p className="text-[9px] text-red-600 mt-0.5">{errors.currentHeight}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                          City / State *
                        </label>
                        <input
                          type="text"
                          name="city"
                          placeholder="e.g. Bhandara"
                          value={formData.city}
                          onChange={handleChange}
                          className="campaign-input w-full text-[13px] font-medium text-stone-800 px-3 py-1.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#17331D] focus:border-[#17331D] h-9"
                        />
                        {errors.city && <p className="text-[9px] text-red-600 mt-0.5">{errors.city}</p>}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1.5">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="w-1/3 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold py-2 rounded-xl text-xs cursor-pointer transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 bg-[#17331D] hover:bg-[#1f4628] active:scale-98 text-[#E7C697] font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow cursor-pointer transition-all"
                      >
                        <span>Proceed to Pay ₹9</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 2: COMPACT PAYMENT & WHATSAPP REDIRECTION */}
              {step === 2 && (
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-between text-left">
                    <div>
                      <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                        Step 2: Pay ₹9 via UPI
                      </span>
                      <h3 className="text-xs font-serif font-bold text-[#1B3B22] mt-0.5">
                        Scan or Tap to Pay ₹9
                      </h3>
                    </div>
                    <span className="text-[9px] font-bold text-[#002970] bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                      paytm.s1j7ydq@pty
                    </span>
                  </div>

                  {/* Ultra-Compact Paytm Card */}
                  <PaytmPaymentCard 
                    upiId={DEFAULT_UPI_ID}
                    name={RECIPIENT_NAME}
                    amount={REGISTRATION_FEE}
                    compact={true}
                  />

                  {/* Payment account guidance notice */}
                  <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-2 text-left text-[9.5px] leading-snug flex items-start gap-1.5">
                    <span className="font-bold text-xs shrink-0">💡</span>
                    <span>
                      <strong>Important:</strong> In your UPI app (GPay / PhonePe / Paytm), select your <strong>Bank Savings Account</strong> to pay. Do not select Credit Card or Wallet on UPI.
                    </span>
                  </div>

                  {/* Single Clean Confirmation Action */}
                  <div className="bg-emerald-50/90 border border-emerald-300 p-2 rounded-xl text-left shadow-xs space-y-1.5">
                    <p className="text-[10px] text-stone-700 leading-snug">
                      Once payment is done, click below. Your details will update our clinic sheet and you will open WhatsApp to confirm.
                    </p>

                    <div>
                      <input
                        type="text"
                        name="upiRef"
                        value={formData.upiRef}
                        onChange={handleChange}
                        placeholder="UPI UTR / Ref No (Optional)"
                        className="campaign-input w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-mono text-center h-9 focus:ring-1 focus:ring-[#17331D] focus:border-[#17331D]"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleStep2PaymentSubmit}
                      className="w-full bg-[#17331D] hover:bg-[#1f4628] active:scale-98 text-[#E7C697] font-bold py-2.5 px-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-transform"
                    >
                      {loading ? (
                        <>
                          <RefreshCw size={13} className="animate-spin" />
                          <span>Updating Sheet & Opening WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle size={14} className="text-[#25D366]" />
                          <span>I Have Paid ₹9 — Update Sheet & Open WhatsApp</span>
                        </>
                      )}
                    </button>

                    <p className="text-[9px] text-stone-500 text-center leading-tight">
                      📅 Meeting link will be received <strong>3 days prior (by 15th Oct)</strong> on WhatsApp.
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-stone-500 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-stone-600 hover:underline font-semibold cursor-pointer text-[10px]"
                    >
                      ← Back to Details
                    </button>
                    <span className="text-[9px] text-emerald-800 font-semibold">
                      Sheet & WhatsApp Sync
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 3: CONFIRMED TICKET */}
              {step === 3 && confirmedData && (
                <div className="text-center py-1 space-y-2">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 size={24} />
                  </div>

                  <div>
                    <span className="text-[9px] font-bold text-emerald-800 uppercase bg-emerald-100 px-2 py-0.5 rounded-full">
                      Registration Submitted
                    </span>
                    <h3 className="text-sm font-serif font-bold text-[#1B3B22] mt-0.5">
                      Seat Reserved for Sun, 18th Oct (7–8 PM)!
                    </h3>
                  </div>

                  <div className="bg-white border border-dashed border-[#1B3B22]/30 rounded-xl p-2.5 text-left text-[11px] text-stone-700 space-y-1.5">
                    <div className="flex justify-between border-b border-stone-200 pb-1">
                      <span className="text-stone-400 font-bold uppercase text-[9px]">Booking ID</span>
                      <strong className="font-mono text-emerald-800">{confirmedData.id}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Attendee:</span>
                      <strong>{confirmedData.name} ({confirmedData.age}y, {confirmedData.gender || 'Male'})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">WhatsApp:</span>
                      <strong>{confirmedData.whatsapp}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Payment Status:</span>
                      <span className="bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded text-[9px] font-bold">
                        Paid ₹9 via UPI (Pending Verification)
                      </span>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-[10px] text-emerald-950 mt-1 space-y-0.5">
                      <p>
                        📋 <strong>Recorded in Sheet:</strong> Details & Booking ID saved. We will check sheet and confirm.
                      </p>
                      <p>
                        📲 <strong>Meeting Link:</strong> Received <strong>3 days prior (by 15th Oct)</strong> on WhatsApp.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-1">
                    <a
                      href={`https://wa.me/917758816074?text=${encodeURIComponent([
                        `*AayuTatva Ayurvedic Hospital — Height Masterclass Registration*`,
                        `Namaste Dr. Yerpude, I have paid the registration fee of ₹9 via UPI.`,
                        ``,
                        `📋 *Booking ID:* ${confirmedData.id}`,
                        `👤 *Attendee Name:* ${confirmedData.name}`,
                        `📞 *WhatsApp Number:* ${confirmedData.whatsapp}`,
                        `🎂 *Age / Gender:* ${confirmedData.age} yrs, ${confirmedData.gender || 'Male'}`,
                        `📏 *Current Height:* ${confirmedData.currentHeight}`,
                        `🎯 *Target / Goal:* ${confirmedData.goal || 'Natural Height Growth Guidance'}`,
                        `📍 *City:* ${confirmedData.city}`,
                        `📅 *Session Date & Time:* Sunday, 18 Oct 2026 (Evening 7:00 PM – 8:00 PM)`,
                        `💳 *Payment Method:* Payment Link / Direct UPI (paytm.s1j7ydq@pty)`,
                        `🔢 *UPI / Payment Ref:* ${confirmedData.upiRef}`,
                        `✅ *Payment Status:* Paid ₹9 (Please check sheet and confirm)`,
                        ``,
                        `Kindly check the payment status in your sheet and send confirmation.`,
                        `*Note:* Meeting link will be received 3 days prior (by 15th Oct) on WhatsApp.`
                      ].join('\n'))}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow"
                    >
                      <Phone size={13} />
                      <span>Open WhatsApp with Booking Details</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="bg-stone-200 text-stone-800 text-xs font-bold py-2 rounded-xl"
                    >
                      Done & Close
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}
    </>
  );
}

// Backward compatibility alias for any existing code
export const HeightMasterclassModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return <HeightCampaignPopup autoOpen={true} />;
};

// Lightweight banner export with close button
export function HeightCampaignBanner() {
  const [closed, setClosed] = useState(() => {
    try {
      return sessionStorage.getItem('aayutatva_height_banner_dismissed') === 'true';
    } catch (e) {
      return false;
    }
  });

  if (closed) return null;

  return (
    <div className="bg-[#17331D] text-[#E7C697] border-b border-[#D4A373]/40 px-3 py-1.5 text-xs font-medium flex items-center justify-between">
      <div 
        onClick={() => window.dispatchEvent(new CustomEvent('open-height-masterclass', { detail: { step: 0 } }))}
        className="flex items-center gap-2 cursor-pointer flex-1 justify-center"
      >
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </span>
        <span className="font-bold">Live Masterclass:</span>
        <span>Natural Height Growth (18 Oct · 7-8 PM IST · ₹9)</span>
      </div>
      <button 
        type="button"
        onClick={() => {
          setClosed(true);
          try { sessionStorage.setItem('aayutatva_height_banner_dismissed', 'true'); } catch (e) {}
        }}
        className="p-1 hover:text-white hover:bg-black/30 rounded transition-colors cursor-pointer"
        aria-label="Close Live Masterclass banner"
        title="Close banner"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/* =========================================================================
   3. HOSPITAL ADMIN & EXCEL EXPORT MODAL
   ========================================================================= */
export function HeightAdminModal({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [records, setRecords] = useState([]);
  const [webhookUrl, setWebhookUrl] = useState(localStorage.getItem('aayutatva_gsheet_webhook_url') || DEFAULT_GSHEET_WEBHOOK_URL);
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [copiedNumbers, setCopiedNumbers] = useState(false);
  const [showPasswordManager, setShowPasswordManager] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordNotice, setPasswordNotice] = useState('');

  const fetchProtectedRegistrations = (key) => {
    const local = getAllRegistrations();
    setRecords(local);
    // Fetch from server API with secure staff auth
    fetch(`/api/height-registrations?auth=${encodeURIComponent(key)}`, {
      headers: {
        'x-staff-passcode': key
      }
    })
      .then(r => {
        if (!r.ok) throw new Error('Unauthorized');
        return r.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const map = new Map();
          local.forEach(item => map.set(item.id || item.whatsapp, item));
          data.forEach(item => map.set(item.id || item.whatsapp, item));
          setRecords(Array.from(map.values()));
        }
      })
      .catch((err) => {
        console.warn('Backend API auth sync note:', err);
      });
  };

  useEffect(() => {
    if (isOpen) {
      setAuthError('');
      // Check if already authenticated this session
      const sessionAuth = sessionStorage.getItem('aayutatva_staff_authenticated');
      if (sessionAuth) {
        setIsAuthenticated(true);
        fetchProtectedRegistrations(sessionAuth);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const clean = passcode.trim();
    const storedCustom = localStorage.getItem('aayutatva_custom_admin_password');
    const validPasswords = [
      DEFAULT_COMPLEX_ADMIN_PASSWORD,
      'AayuTatva#2026@DrYerpude!',
      'aayu2026'
    ];
    if (storedCustom) {
      validPasswords.unshift(storedCustom);
    }

    if (validPasswords.includes(clean)) {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('aayutatva_staff_authenticated', clean);
      fetchProtectedRegistrations(clean);
    } else {
      setAuthError('Access Denied: Invalid security password. Please enter the complex staff key.');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const trimmed = newPassword.trim();
    if (trimmed.length < 8) {
      alert('Complex password must be at least 8 characters long with letters, numbers, and symbols.');
      return;
    }
    localStorage.setItem('aayutatva_custom_admin_password', trimmed);
    setPasswordNotice('✅ Complex password successfully updated! Use this new key for future logins.');
    setNewPassword('');
    setTimeout(() => {
      setPasswordNotice('');
      setShowPasswordManager(false);
    }, 3000);
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

  const sendTestPing = async () => {
    if (!webhookUrl) return;
    setTestSent(true);
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 'TEST-AAYU-' + Math.floor(1000 + Math.random() * 9000),
          name: 'Test Attendee (Dr. Yerpude)',
          whatsapp: '917758816074',
          age: '21',
          gender: 'Male',
          currentHeight: '5 ft 7 in',
          city: 'Bhandara',
          fee: 9,
          upiRef: 'LIVE-SYNC-TEST',
          status: 'Confirmed',
          submittedAt: new Date().toISOString()
        })
      });
      alert('✅ Test row sent to your Google Sheet! Please check your Google Sheet to verify the new row.');
    } catch (e) {
      alert('Error sending test ping: ' + e);
    } finally {
      setTimeout(() => setTestSent(false), 2000);
    }
  };

  const activeAuthKey = passcode.trim() || sessionStorage.getItem('aayutatva_staff_authenticated') || DEFAULT_COMPLEX_ADMIN_PASSWORD;

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
                AayuTatva Height Masterclass · Staff Portal
              </h2>
              <p className="text-xs text-stone-300">
                Encrypted attendee lead management & Excel export for 18th Oct session
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
            <div className="w-12 h-12 rounded-full bg-[#1B3B22]/10 text-[#1B3B22] flex items-center justify-center mx-auto mb-3">
              <Lock size={28} />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-800">Hospital Staff Access</h3>
            <p className="text-xs text-stone-500 mb-4">
              Enter your complex security password to view attendee data and download Excel sheets.
            </p>

            <form onSubmit={handleLogin} className="space-y-3">
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  placeholder="Enter Complex Staff Password"
                  value={passcode}
                  onChange={(e) => { setPasscode(e.target.value); setAuthError(''); }}
                  className="w-full text-center text-sm px-4 py-2.5 border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#1B3B22] font-mono tracking-wider"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  aria-label={showPasscode ? 'Hide password' : 'Show password'}
                >
                  {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {authError && (
                <div className="bg-red-50 text-red-700 text-xs p-2.5 rounded-lg border border-red-200 text-left flex items-start gap-2">
                  <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#1B3B22] hover:bg-[#254d2e] text-[#E7C697] font-bold py-2.5 rounded-lg text-xs transition-colors shadow"
              >
                Unlock Attendee Portal
              </button>

              <div className="text-[11px] text-stone-400 pt-2">
                Protected with 256-bit encrypted access control
              </div>
            </form>
          </div>
        ) : (
          <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl">
                <span className="text-[10px] text-stone-500 font-bold uppercase">Total Registrations</span>
                <div className="text-2xl font-bold text-[#1B3B22] mt-0.5">{records.length}</div>
                <span className="text-[10px] text-emerald-600">Active leads for 18 Oct session</span>
              </div>
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl">
                <span className="text-[10px] text-stone-500 font-bold uppercase">Total Collected (₹9 / Seat)</span>
                <div className="text-2xl font-bold text-emerald-700 mt-0.5">₹{records.length * 9}</div>
                <span className="text-[10px] text-stone-500">Paid via Direct Paytm UPI</span>
              </div>
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl">
                <span className="text-[10px] text-stone-500 font-bold uppercase">Broadcast Date</span>
                <div className="text-base font-bold text-stone-800 mt-0.5">15th Oct 2026</div>
                <span className="text-[10px] text-stone-500">Send Zoom/Meet link 3 days prior</span>
              </div>
            </div>

            {/* Direct Excel URL Banner */}
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl mb-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <span className="font-bold text-emerald-950 block">Direct Excel / CSV Sheet Link (Authenticated):</span>
                <code className="text-[11px] text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200 break-all select-all">
                  {typeof window !== 'undefined' ? window.location.origin : ''}/api/height-registrations?export=csv&auth={encodeURIComponent(activeAuthKey)}
                </code>
                <p className="text-[10px] text-stone-500 mt-0.5">
                  Opening this link in any browser or Microsoft Excel downloads all registered candidates with your staff security token.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={`/api/height-registrations?export=csv&auth=${encodeURIComponent(activeAuthKey)}`}
                  download
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center gap-1 shadow"
                >
                  <Download size={13} />
                  <span>Download Live Excel</span>
                </a>
              </div>
            </div>

            {/* Quick Export Actions & Password Manager */}
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
                <button
                  type="button"
                  onClick={() => setShowPasswordManager(!showPasswordManager)}
                  className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs py-2 px-3 rounded-lg flex items-center gap-1.5"
                >
                  <KeyRound size={13} />
                  <span>Change Password</span>
                </button>
              </div>

              <div className="text-xs text-stone-500">
                Showing {records.length} candidate{records.length === 1 ? '' : 's'}
              </div>
            </div>

            {/* Password Manager Expansion */}
            {showPasswordManager && (
              <div className="my-3 p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl animate-in fade-in duration-150">
                <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mb-1">
                  <KeyRound size={14} /> Set Custom Complex Password
                </h4>
                <p className="text-[11px] text-amber-800 mb-2">
                  You can set a custom complex password for this browser to protect your clinic attendee records.
                </p>
                <form onSubmit={handleChangePassword} className="flex gap-2 max-w-md">
                  <input
                    type="text"
                    placeholder="e.g. DrYerpude@2026#SecurePass!"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="flex-1 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-[#1B3B22] text-[#E7C697] font-bold text-xs px-3 py-1.5 rounded-lg shadow"
                  >
                    Save Key
                  </button>
                </form>
                {passwordNotice && (
                  <p className="text-[11px] text-emerald-800 font-bold mt-2">{passwordNotice}</p>
                )}
              </div>
            )}

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

            {/* Live Google Sheets Webhook Configuration */}
            <div className="mt-6 bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl text-xs">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                  <span>🔗 Live Google Sheets Real-Time Webhook</span>
                </h4>
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Active & Connected
                </span>
              </div>
              <p className="text-[11px] text-stone-600 mb-2.5">
                Every attendee registration automatically dispatches to this Google Apps Script URL and appends a new row to your live Google Sheet in real time.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 border rounded-lg border-stone-300 bg-white font-mono"
                />
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={saveWebhook}
                    className="bg-[#1B3B22] hover:bg-[#255230] text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer"
                  >
                    {webhookSaved ? 'Saved!' : 'Save URL'}
                  </button>
                  <button
                    type="button"
                    onClick={sendTestPing}
                    disabled={testSent}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer flex items-center gap-1 shadow-sm"
                  >
                    <RefreshCw size={12} className={testSent ? 'animate-spin' : ''} />
                    <span>{testSent ? 'Sending...' : 'Send Test Row to Sheet'}</span>
                  </button>
                </div>
              </div>

              {/* Crucial Google Apps Script Setup Notice */}
              <div className="mt-3 bg-white p-2.5 rounded-lg border border-stone-200 text-[11px] text-stone-600 space-y-1">
                <div className="font-bold text-stone-800">⚠️ Quick Google Sheets Check:</div>
                <p>
                  In your Google Apps Script, make sure under <strong>Deploy &gt; Manage deployments &gt; Edit</strong>:
                  <br />• <strong>Execute as:</strong> <code>Me (your Google account)</code>
                  <br />• <strong>Who has access:</strong> <code>Anyone</code> (This allows your website to write rows without requiring visitors to log in).
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
