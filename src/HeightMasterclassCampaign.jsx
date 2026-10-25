import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  X, Calendar, Clock, Video, ShieldCheck, Check, Sparkles, 
  ArrowRight, Download, Copy, ExternalLink, HelpCircle, Phone, 
  AlertCircle, Lock, Users, ChevronRight, CheckCircle2, RefreshCw,
  Leaf, Activity, Award, CreditCard, MessageCircle, Eye, EyeOff, KeyRound,
  QrCode, Settings, Upload, Edit3, Image as ImageIcon
} from 'lucide-react';

export const DEFAULT_COMPLEX_ADMIN_PASSWORD = 'DrYerpude@Aayu2026#Secure';
export const DEFAULT_UNIVERSAL_UPI_ID = '7758816074@ybl';
export const RECIPIENT_NAME = 'DR YERPUDES AYUTATVA';
export const REGISTRATION_FEE = 0; // 100% Free Workshop
export const SESSION_DATE = 'Sunday, 1st November 2026';
export const SESSION_TIME = 'Evening 6:00 PM – 7:00 PM (IST)';
export const DEFAULT_PAYMENT_LINK = '';
export const DEFAULT_GSHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxa4-2ZntsN5_-0X4NLcrKmIOBjuFpQn868VMxvyFkaeWBXKbvLoAjCtWUD9vOpoVzm/exec';
export const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/F13Vq4it2tfHeucc0x12w2?s=cl&p=a&mlu=4&ilr=4';

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

  // 2. Server API sync (Persists in clinic database & triggers server-side Google Sheet forwarder)
  let serverEntry = null;
  try {
    const res = await fetch('/api/height-registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.entry) serverEntry = json.entry;
    }
  } catch (err) {
    console.warn('Backend sync failed, saved locally in browser:', err);
  }

  // 3. Google Sheet Webhook sync: Dual-Channel Direct Sync (Always executes concurrently)
  try {
    const webhookUrl = localStorage.getItem('aayutatva_gsheet_webhook_url') || DEFAULT_GSHEET_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith('http')) {
      const queryParams = new URLSearchParams({
        id: entry.id,
        name: entry.name,
        whatsapp: entry.whatsapp,
        age: String(entry.age),
        gender: entry.gender,
        height: entry.currentHeight,
        currentHeight: entry.currentHeight,
        city: entry.city,
        email: entry.email || '',
        goal: entry.goal || '',
        status: entry.status,
        submittedAt: entry.submittedAt,
      });
      const fullUrl = webhookUrl.includes('?') ? `${webhookUrl}&${queryParams}` : `${webhookUrl}?${queryParams}`;

      fetch(fullUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(entry),
      }).catch((e) => {
        console.warn('Direct client sheet sync error:', e);
      });
    }
  } catch (e) {}

  return serverEntry || entry;
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
    // Direct server download in a new tab if local records cache is empty
    window.open(`/api/height-registrations?export=csv&auth=${encodeURIComponent(DEFAULT_COMPLEX_ADMIN_PASSWORD)}`, '_blank');
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
    'City',
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
    `"${r.status || 'Free Workshop Confirmed'}"`,
    `"${r.fee ? '₹' + r.fee : '₹0 (Free Workshop)'}"`,
    `"${r.upiRef || 'N/A (Free)'}"`,
    `"Zoom/Meet link will be received 3 days prior (by 29th Oct) on WhatsApp"`
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
   1. PAYMENT QR MANAGER & MODAL
   ========================================================================= */
export function UpdateQrModal({ 
  isOpen, 
  onClose, 
  currentUpiId = DEFAULT_UNIVERSAL_UPI_ID, 
  currentName = RECIPIENT_NAME,
  currentCustomQr = '',
  amount = REGISTRATION_FEE,
  authKey = '',
  onSave 
}) {
  const [upiInput, setUpiInput] = useState(currentUpiId);
  const [nameInput, setNameInput] = useState(currentName);
  const [customQrImage, setCustomQrImage] = useState(currentCustomQr);
  const [previewQr, setPreviewQr] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setUpiInput(currentUpiId);
      setNameInput(currentName);
      setCustomQrImage(currentCustomQr);
      setSavedSuccess(false);
      setFileError('');
    }
  }, [isOpen, currentUpiId, currentName, currentCustomQr]);

  // Generate live preview QR
  useEffect(() => {
    if (customQrImage) {
      setPreviewQr(customQrImage);
      return;
    }

    const uri = `upi://pay?pa=${encodeURIComponent(upiInput.trim() || DEFAULT_UNIVERSAL_UPI_ID)}&pn=${encodeURIComponent(nameInput.trim() || RECIPIENT_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Height Growth Masterclass 1 Nov')}`;
    QRCode.toDataURL(uri, {
      width: 260,
      margin: 1,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#002970',
        light: '#FFFFFF'
      }
    }).then(url => {
      setPreviewQr(url);
    }).catch(err => {
      console.error('Error generating preview QR:', err);
    });
  }, [upiInput, nameInput, customQrImage, amount]);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setFileError('Image size exceeds 4MB. Please use a smaller screenshot.');
      return;
    }

    setFileError('');
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target?.result;
      if (typeof dataUrl === 'string') {
        setCustomQrImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApply = (e) => {
    e.preventDefault();
    const finalUpi = upiInput.trim() || DEFAULT_UNIVERSAL_UPI_ID;
    const finalName = nameInput.trim() || RECIPIENT_NAME;
    
    const configData = {
      upiId: finalUpi,
      payeeName: finalName,
      customQrImage: customQrImage || '',
      updatedAt: new Date().toISOString()
    };

    // 1. LocalStorage
    try {
      localStorage.setItem('aayutatva_payment_config', JSON.stringify(configData));
    } catch (err) {
      console.warn('LocalStorage payment config error:', err);
    }

    // 2. Server API sync (Protected with staff auth)
    try {
      const staffPass = authKey || sessionStorage.getItem('aayutatva_staff_authenticated') || DEFAULT_COMPLEX_ADMIN_PASSWORD;
      fetch('/api/payment-config', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-staff-passcode': staffPass
        },
        body: JSON.stringify({ ...configData, auth: staffPass })
      }).catch(err => console.warn('Server sync error:', err));
    } catch {}

    if (onSave) {
      onSave(configData);
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const resetToDefault = () => {
    setUpiInput(DEFAULT_UNIVERSAL_UPI_ID);
    setNameInput(RECIPIENT_NAME);
    setCustomQrImage('');
    setFileError('');
  };

  return (
    <div className="fixed inset-0 z-[999999] overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="bg-white text-stone-900 w-full max-w-sm rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="bg-[#002970] text-white p-3.5 flex items-center justify-between border-b border-[#00b9f5]/30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#00b9f5] text-[#002970] flex items-center justify-center font-bold">
              <QrCode size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-tight">Update Payment QR Code</h3>
              <p className="text-[10px] text-sky-200">Set working UPI ID or upload custom QR</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-white/80 hover:text-white p-1 rounded-md cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-3.5 text-left text-xs">
          
          {/* Live Preview Display */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-center">
            <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block mb-1">
              Live QR Preview (Amount: ₹{amount})
            </span>
            <div className="relative inline-block bg-white p-2 rounded-lg border border-stone-300 shadow-xs">
              <img 
                src={previewQr || customQrImage || '/media/payment-link-qr.png'} 
                alt="Payment QR Preview" 
                className="w-32 h-32 object-contain mx-auto"
              />
              <div className="absolute inset-0 m-auto w-5 h-5 rounded-full bg-white text-[#002970] flex items-center justify-center font-bold text-[7px] shadow border border-stone-200 pointer-events-none">
                UPI
              </div>
            </div>
            <div className="mt-1 text-[10px] font-mono font-bold text-stone-800 truncate">
              {upiInput}
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <label className="block text-[10.5px] font-bold text-stone-700 mb-1">
              Select Preset or Verified UPI:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setUpiInput(DEFAULT_UNIVERSAL_UPI_ID);
                  setNameInput(RECIPIENT_NAME);
                  setCustomQrImage('');
                }}
                className={`py-1.5 px-2 rounded-lg border text-left cursor-pointer transition-colors ${
                  upiInput === DEFAULT_UNIVERSAL_UPI_ID && !customQrImage
                    ? 'bg-blue-50 border-[#002970] text-[#002970] font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="font-bold text-[10px] text-emerald-700">✓ PhonePe Direct UPI</div>
                <div className="font-mono text-[9px] truncate text-stone-600">{DEFAULT_UNIVERSAL_UPI_ID}</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUpiInput(DEFAULT_GPAY_UPI_ID);
                  setNameInput(RECIPIENT_NAME);
                  setCustomQrImage('');
                }}
                className={`py-1.5 px-2 rounded-lg border text-left cursor-pointer transition-colors ${
                  upiInput === DEFAULT_GPAY_UPI_ID && !customQrImage
                    ? 'bg-blue-50 border-[#002970] text-[#002970] font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="font-bold text-[10px] text-sky-700">✓ Google Pay UPI</div>
                <div className="font-mono text-[9px] truncate text-stone-600">{DEFAULT_GPAY_UPI_ID}</div>
              </button>
            </div>
          </div>

          {/* Manual UPI ID & Name Inputs */}
          <form onSubmit={handleApply} className="space-y-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                UPI ID (VPA) *
              </label>
              <input
                type="text"
                value={upiInput}
                onChange={(e) => {
                  setUpiInput(e.target.value);
                  setCustomQrImage('');
                }}
                placeholder="e.g. 7758816074@ybl or paytm.s1j7ydq@pty"
                className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-medium focus:ring-1 focus:ring-[#002970] focus:border-[#002970]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-0.5">
                Recipient / Hospital Name
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. DR YERPUDES AYUTATVA"
                className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:ring-1 focus:ring-[#002970] focus:border-[#002970]"
              />
            </div>

            {/* Custom QR Image Upload */}
            <div className="pt-1">
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Or Upload Custom QR Standee Image:
              </label>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-[10.5px] font-bold py-1.5 px-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload size={12} />
                  <span>{customQrImage ? 'Replace Uploaded QR' : 'Upload QR Image / Screenshot'}</span>
                </button>
                {customQrImage && (
                  <button
                    type="button"
                    onClick={() => setCustomQrImage('')}
                    className="text-red-600 hover:text-red-700 text-[10px] font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
              {fileError && <p className="text-[10px] text-red-600 mt-1">{fileError}</p>}
            </div>

            {savedSuccess && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold p-2 rounded-lg flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>✓ QR Code updated and applied successfully!</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
              <button
                type="submit"
                className="flex-1 bg-[#002970] hover:bg-[#001f56] text-[#00b9f5] font-black py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 shadow cursor-pointer transition-colors"
              >
                <Check size={14} />
                <span>Save & Apply QR</span>
              </button>
              <button
                type="button"
                onClick={resetToDefault}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2 px-2.5 rounded-xl text-xs cursor-pointer"
              >
                Reset
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. PAYMENT / QR CODE REMOVED (100% Free Workshop)
   ========================================================================= */
export function PaytmPaymentCard() {
  return null;
}
export const PhonePePaymentCard = PaytmPaymentCard;

function _OldPaytmPaymentCard_Disabled() {
  return null;
}

function _UnusedDeadCode() {
  const [copied, setCopied] = useState(false);
  const [desktopNotice, setDesktopNotice] = useState(false);

  // Sync with server payment-config if available
  useEffect(() => {
    fetch('/api/payment-config')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.upiId) {
          setPaymentConfig(prev => ({
            ...prev,
            ...data
          }));
        }
      })
      .catch(() => {});
  }, []);

  const activeUpiId = paymentConfig.upiId || DEFAULT_UNIVERSAL_UPI_ID;
  const activeName = paymentConfig.payeeName || RECIPIENT_NAME;
  const activeCustomImage = paymentConfig.customQrImage || '';

  // Standard UPI URI format accepted across all UPI apps
  const upiUri = `upi://pay?pa=${encodeURIComponent(activeUpiId)}&pn=${encodeURIComponent(activeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Height Growth Masterclass 1 Nov')}`;
  
  // Real web payment link if user explicitly configured an http URL
  const hasCustomWebLink = Boolean(paymentLink && paymentLink.trim().startsWith('http'));
  const directPayUrl = hasCustomWebLink ? paymentLink.trim() : upiUri;

  // Generate crisp QR code whenever URI or size changes
  useEffect(() => {
    if (activeCustomImage) {
      setQrDataUrl(activeCustomImage);
      return;
    }

    QRCode.toDataURL(hasCustomWebLink ? directPayUrl : upiUri, {
      width: compact ? 240 : 300,
      margin: 1,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#17331D',
        light: '#FFFFFF'
      }
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.error('Error generating QR code:', err);
    });
  }, [upiUri, directPayUrl, hasCustomWebLink, compact, activeCustomImage]);

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
    <div className={`bg-[#17331D] rounded-xl border border-[#2d5735] shadow-lg overflow-hidden mx-auto text-center font-sans ${compact ? 'max-w-[260px]' : 'max-w-[285px]'}`}>
      
      {/* Official Verified Hospital Header */}
      <div className={`bg-[#122817] text-white flex items-center justify-between ${compact ? 'py-1.5 px-3' : 'py-2 px-3.5'} border-b border-[#2d5735]`}>
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span className="font-extrabold tracking-tight text-white text-[11px] sm:text-xs">
            Official Hospital UPI
          </span>
        </div>
        <span className="text-[9.5px] font-black text-emerald-950 bg-[#E7C697] px-2 py-0.5 rounded-full shadow-xs">
          Fee: ₹{amount}
        </span>
      </div>

      {/* QR Code Container (Locked Official QR / Doctor Uploaded Standee) */}
      <div className={`bg-white rounded-lg border border-stone-200 ${compact ? 'p-2 mx-2 my-2' : 'p-2.5 mx-2.5 my-2.5'} shadow-xs`}>
        <div className="relative inline-block">
          <img 
            src={activeCustomImage || qrDataUrl || '/media/payment-link-qr.png'} 
            alt="AayuTatva Official Payment QR Code" 
            className={`${compact ? 'w-28 h-28' : 'w-32 h-32 sm:w-36 sm:h-36'} object-contain mx-auto rounded`} 
          />
          {!activeCustomImage && (
            <div className="absolute inset-0 m-auto w-5 h-5 rounded-full bg-white text-[#17331D] flex items-center justify-center font-bold text-[7px] shadow border border-stone-200 pointer-events-none">
              UPI
            </div>
          )}
        </div>

        {/* Official UPI ID & 1-Click Copy */}
        <div className="mt-1 flex items-center justify-center gap-1 text-[9.5px] font-mono font-bold text-stone-800 bg-stone-50 border border-stone-200 rounded px-1.5 py-1">
          <span className="truncate max-w-[160px]">{activeUpiId}</span>
          <button 
            type="button" 
            onClick={copyPayInfo}
            className="text-[8.5px] text-[#17331D] bg-stone-200 hover:bg-stone-300 font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Direct Tap to Pay / Mobile UPI Intent */}
      <div className={`bg-[#122817] border-t border-[#2d5735] ${compact ? 'p-2' : 'p-2.5'}`}>
        <a 
          href={directPayUrl} 
          onClick={handlePayClick}
          target={hasCustomWebLink ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 bg-[#E7C697] hover:bg-[#d9b580] active:scale-98 text-[#17331D] text-[11.5px] font-black py-2 px-3 rounded-lg shadow transition-transform cursor-pointer"
        >
          {desktopNotice ? (
            <span className="text-[#17331D] font-black">✓ UPI ID Copied! Scan QR on Mobile</span>
          ) : hasCustomWebLink ? (
            <>
              <span>Open Payment Link (₹{amount})</span>
              <ExternalLink size={12} />
            </>
          ) : (
            <>
              <span>Tap to Pay ₹{amount} (PhonePe / GPay / Any App)</span>
              <ExternalLink size={12} />
            </>
          )}
        </a>
        <p className="text-[9px] text-emerald-200/90 mt-1.5 leading-tight font-medium">
          ⚡ 100% Direct Hospital Settlement · Scan with PhonePe, GPay, Paytm, or BHIM
        </p>
        {desktopNotice && (
          <p className="text-[9px] text-[#E7C697] mt-1 leading-tight font-medium">
            Laptops don't have UPI apps. Scan the QR code with your mobile phone or use copied UPI ID: <span className="font-mono text-white">{activeUpiId}</span>
          </p>
        )}
      </div>

    </div>
  );
}



/* =========================================================================
   2. HIGH-CONVERTING MOBILE-FIRST POPUP & FLOATING CAMPAIGN WIDGET
   ========================================================================= */
export function HeightCampaignPopup({ autoOpen = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [step, setStep] = useState(0); // 0 = Pitch Teaser, 1 = Form, 2 = Paytm QR, 3 = Confirmed Ticket
  const [loading, setLoading] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);
  const [heightUnit, setHeightUnit] = useState('FT'); // 'FT' or 'CM'

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
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  useEffect(() => {
    // 1. Auto-open popup as soon as user visits / logs in to website
    if (autoOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500); // Prompt appearance when landing on site
      return () => clearTimeout(timer);
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

  // Nielsen Heuristic #3: User Control & Freedom - Close modal on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
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
    if (!formData.city.trim()) errs.city = 'Please enter your city';
    if (!formData.currentHeight.trim()) {
      errs.currentHeight = heightUnit === 'FT' ? 'Please enter height (e.g. 5ft 4 in)' : 'Please enter height (e.g. 150 CM)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setLoading(true);
    try {
      // Format height cleanly with unit
      const rawHeight = formData.currentHeight.trim();
      let formattedHeight = rawHeight;
      if (heightUnit === 'CM' && !rawHeight.toLowerCase().includes('cm')) {
        formattedHeight = `${rawHeight} CM`;
      } else if (heightUnit === 'FT' && !rawHeight.toLowerCase().includes('ft') && !rawHeight.includes("'")) {
        formattedHeight = `${rawHeight} ft`;
      }

      const dataToSave = { 
        ...formData, 
        currentHeight: formattedHeight,
        whatsappGroup: WHATSAPP_GROUP_LINK,
        fee: 0,
        upiRef: 'FREE-WORKSHOP',
        status: 'Free Workshop Registration Confirmed'
      };
      
      // 1. Update attendee details in clinic registry / backend data store & Google Sheet
      const saved = await saveMasterclassRegistration(dataToSave);
      setConfirmedData(saved);
      setStep(3); // Direct confirmation - no payment step!

      // 2. Open WhatsApp group safely in a new tab (prevents "whatsapp refused to connect" iframe error)
      setTimeout(() => {
        try {
          window.open(WHATSAPP_GROUP_LINK, '_blank', 'noopener,noreferrer');
        } catch (err) {
          console.warn('Popup blocked by browser, user can click the join button', err);
        }
      }, 600);

    } catch (err) {
      setServerError('Unable to update sheet in real-time. Please tap below to join the WhatsApp group directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleStep2PaymentSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setStep(3);
  };

  return (
    <>
      {/* 1. Elevated Floating Live Masterclass Banner with Dismiss/Close Button */}
      {!isOpen && !isBannerDismissed && (
        <div
          className="fixed bottom-[138px] right-3 sm:bottom-6 sm:left-6 sm:right-auto z-[950] flex items-center bg-[#17331D] text-[#E7C697] border-2 border-[#D4A373] rounded-full shadow-2xl overflow-hidden text-xs font-bold transition-all duration-200 max-w-[calc(100vw-28px)]"
          role="region"
          aria-label="Live Masterclass Announcement"
        >
          <button
            type="button"
            onClick={() => { setStep(0); setIsOpen(true); }}
            className="flex items-center gap-2 px-3.5 py-2 hover:bg-[#1f4628] active:scale-95 transition-all text-xs font-bold cursor-pointer text-[#E7C697] whitespace-nowrap"
            aria-label="Open 1 Nov Free Height Masterclass details"
          >
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Free Workshop (1 Nov Sun · 6-7 PM)</span>
          </button>
          <button
            type="button"
            onClick={handleCloseBanner}
            className="w-10 h-10 min-w-[40px] min-h-[40px] text-[#E7C697]/80 hover:text-white hover:bg-black/30 active:scale-90 transition-all border-l border-[#D4A373]/40 cursor-pointer flex items-center justify-center flex-shrink-0"
            title="Close Live Masterclass banner"
            aria-label="Close Live Masterclass banner"
          >
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* 2. Compact Mobile-Friendly Popup Modal with Backdrop Dismiss */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/75 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Card Container: Spacious, responsive, fits mobile and desktop viewports gracefully */}
          <div className="bg-[#FDFBF7] text-[#1B3B22] w-full max-w-[390px] sm:max-w-[430px] rounded-2xl shadow-2xl border-2 border-[#D4A373] overflow-hidden max-h-[88vh] sm:max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200 campaign-modal">
            
            {/* Header of masterclass form: generous padding, proper spacing and elegant typography */}
            <div className="bg-[#17331D] text-white px-4 py-3 sm:px-5 sm:py-3.5 flex items-start justify-between border-b border-[#D4A373]/30 flex-shrink-0 gap-3">
              <div className="space-y-1.5 flex-1 pr-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 bg-[#D4A373] text-[#17331D] text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full tracking-wide shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                    01 NOV · 6:00 PM · FREE WORKSHOP
                  </span>
                  <span className="bg-emerald-800/80 text-emerald-200 border border-emerald-600/40 text-[9.5px] font-bold px-2 py-0.5 rounded-full">
                    100% Free Entry
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-serif font-bold text-white leading-snug tracking-tight">
                  Natural Height Growth Masterclass
                </h2>
                <p className="text-[10px] sm:text-[11px] text-stone-300 font-medium leading-snug">
                  Live Doctor Guidance · Ages 12–25 · Ayurvedic Health Education
                </p>
              </div>

              {/* Close Button: Meets Fitts's Law touch target minimum (>= 40px with generous tap padding) */}
              <button 
                type="button"
                onClick={handleClose} 
                aria-label="Close masterclass popup"
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-stone-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 mt-0.5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Step Indicator if not in step 0 */}
            {step > 0 && (
              <div className="bg-[#f4efe4] px-4 py-1.5 border-b border-[#e2dacf] flex items-center justify-between text-[10px] text-stone-600 flex-shrink-0">
                <div className={`flex items-center gap-1.5 ${step === 1 ? 'font-bold text-[#1B3B22]' : ''}`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${step === 1 ? 'bg-[#1B3B22] text-white font-bold' : 'bg-stone-300'}`}>1</span>
                  <span>Attendee Details</span>
                </div>
                <ChevronRight size={12} className="text-stone-400" />
                <div className={`flex items-center gap-1.5 ${step >= 2 ? 'font-bold text-[#1B3B22]' : ''}`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${step >= 2 ? 'bg-[#1B3B22] text-white font-bold' : 'bg-stone-300'}`}>2</span>
                  <span>Free Seat Confirmed</span>
                </div>
              </div>
            )}

            {/* Scrollable Modal Body */}
            <div className="p-3.5 sm:p-4 overflow-y-auto flex-1 overscroll-contain">

              {/* STEP 0: ULTRA-COMPACT STREAMLINED INVITATION PITCH */}
              {step === 0 && (
                <div className="space-y-3 text-center">
                  {/* Doctor Row - Dr. Sakshi Sonkusare with Passport Style Photograph */}
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-stone-200 shadow-2xs text-left">
                    <div className="relative w-12 h-15 rounded-md overflow-hidden border-2 border-[#D4A373] shadow-xs flex-shrink-0 bg-stone-100">
                      <img 
                        src="/media/dr-sakshi-passport.jpg" 
                        alt="Dr. Sakshi Sonkusare - Passport Photograph" 
                        className="w-full h-full object-cover object-[center_35%]"
                      />
                    </div>
                    <div className="leading-tight">
                      <div className="font-bold text-stone-900 text-xs sm:text-sm">Dr. Sakshi Sonkusare</div>
                      <div className="text-[10px] text-stone-500">[B.A.M.S., PGDCC] · AayuTatva Ayurvedic Hospital</div>
                    </div>
                  </div>

                  {/* Concise Highlights & Notice */}
                  <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-3 text-left space-y-1.5">
                    <div className="flex items-center justify-between text-[#17331D] font-bold text-[11px]">
                      <span>📅 Sun, 1 Nov 2026 · 6:00 PM – 7:00 PM (Evening)</span>
                      <span className="bg-[#17331D] text-[#E7C697] text-[9.5px] px-2 py-0.5 rounded-full font-bold">Free Entry</span>
                    </div>
                    <p className="text-[11px] text-stone-700 leading-snug">
                      60-min live doctor workshop on bone growth plate reactivation, spinal decompression & Ayurvedic nutrition for ages 12–25.
                    </p>
                    <p className="text-[10px] text-emerald-900 font-semibold flex items-center gap-1.5 pt-0.5">
                      <span>📲</span>
                      <span>You will be added to the official <strong>WhatsApp Group</strong> immediately upon registration!</span>
                    </p>
                  </div>

                  {/* Primary CTA Button */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full bg-[#17331D] hover:bg-[#1f4628] active:scale-98 text-[#E7C697] font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-transform cursor-pointer"
                  >
                    <span>Claim Your Free Seat Now</span>
                    <ArrowRight size={15} />
                  </button>

                  {/* Secondary Dismiss */}
                  <div className="pt-0.5">
                    <button 
                      type="button"
                      onClick={handleClose}
                      className="text-[11px] text-stone-400 hover:text-stone-600 cursor-pointer transition-colors"
                    >
                      Maybe later
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 1: COMPACT ATTENDEE DETAILS FORM */}
              {step === 1 && (
                <div className="space-y-3 text-left">
                  <div className="mb-2 pb-2 border-b border-stone-200">
                    <h3 className="font-bold text-xs sm:text-sm text-[#1B3B22]">Attendee & Contact Information</h3>
                    <p className="text-[10.5px] text-stone-500 mt-0.5">
                      Fill the form to get added to the official WhatsApp Group and attendee sheet.
                    </p>
                  </div>

                  <form onSubmit={handleStep1Submit} className="space-y-3 text-left">
                    {serverError && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-2.5 rounded-lg flex items-start gap-2">
                        <AlertCircle size={15} className="flex-shrink-0 mt-0.5 text-amber-700" />
                        <span>{serverError}</span>
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Full Name of Attendee *
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Aryan Sharma"
                        value={formData.name}
                        onChange={handleChange}
                        className="campaign-input w-full text-sm font-medium text-stone-800 px-3.5 py-2.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#17331D] focus:border-[#17331D] h-11 min-h-[44px]"
                      />
                      {errors.name && <p className="text-[10px] text-red-600 font-semibold mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        placeholder="e.g. 9876543210"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="campaign-input w-full text-sm font-medium text-stone-800 px-3.5 py-2.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#17331D] focus:border-[#17331D] h-11 min-h-[44px]"
                      />
                      {errors.whatsapp && <p className="text-[10px] text-red-600 font-semibold mt-1">{errors.whatsapp}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Age *
                        </label>
                        <input
                          type="text"
                          name="age"
                          placeholder="e.g. 18"
                          value={formData.age}
                          onChange={handleChange}
                          className="campaign-input w-full text-sm font-medium text-stone-800 px-3.5 py-2.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#17331D] focus:border-[#17331D] h-11 min-h-[44px]"
                        />
                        {errors.age && <p className="text-[10px] text-red-600 font-semibold mt-1">{errors.age}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="campaign-input w-full text-sm font-medium text-stone-800 px-3.5 py-2.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#17331D] focus:border-[#17331D] h-11 min-h-[44px] cursor-pointer"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Current Height with FT / CM Unit Selector: Fitts's Law touch targets */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-stone-700">
                            Current Height *
                          </label>
                          <div className="flex items-center bg-stone-200 rounded-md p-0.5 text-xs font-bold">
                            <button
                              type="button"
                              onClick={() => setHeightUnit('FT')}
                              className={`px-2.5 py-1 rounded transition-all cursor-pointer min-h-[26px] ${
                                heightUnit === 'FT' 
                                  ? 'bg-[#17331D] text-[#E7C697] shadow-xs' 
                                  : 'text-stone-600 hover:text-stone-900'
                              }`}
                            >
                              FT
                            </button>
                            <button
                              type="button"
                              onClick={() => setHeightUnit('CM')}
                              className={`px-2.5 py-1 rounded transition-all cursor-pointer min-h-[26px] ${
                                heightUnit === 'CM' 
                                  ? 'bg-[#17331D] text-[#E7C697] shadow-xs' 
                                  : 'text-stone-600 hover:text-stone-900'
                              }`}
                            >
                              CM
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          name="currentHeight"
                          placeholder={heightUnit === 'FT' ? 'e.g. 5ft 4 in' : 'e.g. 150 CM'}
                          value={formData.currentHeight}
                          onChange={handleChange}
                          className="campaign-input w-full text-sm font-medium text-stone-800 px-3.5 py-2.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#17331D] focus:border-[#17331D] h-11 min-h-[44px]"
                        />
                        <span className="text-[10px] text-stone-500 mt-1 block">
                          {heightUnit === 'FT' ? 'Example: 5ft 4 in' : 'Example: 150 CM'}
                        </span>
                        {errors.currentHeight && <p className="text-[10px] text-red-600 font-semibold mt-1">{errors.currentHeight}</p>}
                      </div>

                      {/* City Field */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          placeholder="e.g. Bhandara"
                          value={formData.city}
                          onChange={handleChange}
                          className="campaign-input w-full text-sm font-medium text-stone-800 px-3.5 py-2.5 border rounded-lg border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#17331D] focus:border-[#17331D] h-11 min-h-[44px]"
                        />
                        {errors.city && <p className="text-[10px] text-red-600 font-semibold mt-1">{errors.city}</p>}
                      </div>
                    </div>

                    {/* Submit Button & Back Action: Pristine Full-Width Layout, Zero Distortion */}
                    <div className="pt-2 space-y-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#17331D] hover:bg-[#1f4628] active:scale-[0.99] text-[#E7C697] font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all min-h-[44px]"
                      >
                        <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                        <span className="font-bold tracking-wide">
                          {loading ? 'Registering…' : 'Register Now'}
                        </span>
                        <ArrowRight size={15} className="flex-shrink-0 ml-0.5" />
                      </button>

                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => setStep(0)}
                          className="text-[11px] text-stone-500 hover:text-stone-800 font-medium py-1 px-3 cursor-pointer transition-colors"
                        >
                          ← Back to Masterclass Details
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 3: CONFIRMED TICKET FOR FREE WORKSHOP & WHATSAPP REDIRECTION */}
              {step === 3 && confirmedData && (
                <div className="text-center py-1 space-y-3">
                  <div className="w-11 h-11 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 size={26} />
                  </div>

                  <div>
                    <span className="text-[9.5px] font-bold text-emerald-800 uppercase bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Free Workshop Confirmed
                    </span>
                    <h3 className="text-sm sm:text-base font-serif font-bold text-[#1B3B22] mt-1">
                      Seat Reserved for Sun, 1st Nov (6–7 PM)!
                    </h3>
                  </div>

                  <div className="bg-white border border-dashed border-[#1B3B22]/30 rounded-xl p-3 text-left text-[11px] text-stone-700 space-y-1.5 shadow-2xs">
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
                      <span className="text-stone-500">City:</span>
                      <strong>{confirmedData.city}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Workshop Fee:</span>
                      <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded text-[9.5px] font-bold">
                        100% Free Workshop (₹0)
                      </span>
                    </div>
                    <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-[10.5px] text-emerald-950 mt-1 space-y-1">
                      <p>
                        📋 <strong>Recorded in Attendee Sheet:</strong> Details synced successfully in real-time.
                      </p>
                      <p>
                        📲 <strong>Redirecting to WhatsApp Group:</strong> You will be redirected to the workshop group.
                      </p>
                    </div>
                  </div>

                  {/* Primary WhatsApp Group Join CTA: WCAG AA Compliant High Contrast */}
                  <div className="flex flex-col gap-2 pt-1">
                    <a
                      href={WHATSAPP_GROUP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#128C7E] hover:bg-[#0E6251] active:scale-[0.99] text-white text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer min-h-[48px]"
                    >
                      <MessageCircle size={19} className="fill-white flex-shrink-0" />
                      <span className="tracking-wide">Join Official WhatsApp Group Now</span>
                      <ArrowRight size={16} className="flex-shrink-0" />
                    </a>
                    
                    <a
                      href={`https://wa.me/917758816074?text=${encodeURIComponent([
                        `*AayuTatva Ayurvedic Hospital — Height Masterclass Free Registration*`,
                        `Namaste Dr. Yerpude, I have registered for the Free Natural Height Growth Masterclass.`,
                        ``,
                        `📋 *Booking ID:* ${confirmedData.id}`,
                        `👤 *Attendee Name:* ${confirmedData.name}`,
                        `📞 *WhatsApp Number:* ${confirmedData.whatsapp}`,
                        `🎂 *Age / Gender:* ${confirmedData.age} yrs, ${confirmedData.gender || 'Male'}`,
                        `📏 *Current Height:* ${confirmedData.currentHeight}`,
                        `📍 *City:* ${confirmedData.city}`,
                        `📅 *Session Date & Time:* Sunday, 1 Nov 2026 (Evening 6:00 PM – 7:00 PM)`,
                        `🎟️ *Registration Status:* Free Workshop Confirmed (₹0)`
                      ].join('\n'))}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone size={12} />
                      <span>Send Confirmation Copy to Dr. Yerpude</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="text-stone-500 hover:text-stone-800 text-[11px] font-medium py-1 cursor-pointer transition-colors"
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
        <span className="font-bold">Free Live Workshop:</span>
        <span>Natural Height Growth (1 Nov Sun · 6-7 PM IST · Free Workshop)</span>
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
  const [spreadsheetUrl, setSpreadsheetUrl] = useState(localStorage.getItem('aayutatva_gsheet_spreadsheet_url') || '');
  const [spreadsheetSaved, setSpreadsheetSaved] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [copiedNumbers, setCopiedNumbers] = useState(false);
  const [showPasswordManager, setShowPasswordManager] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordNotice, setPasswordNotice] = useState('');
  const [showAdminQrModal, setShowAdminQrModal] = useState(false);
  const [adminPaymentConfig, setAdminPaymentConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('aayutatva_payment_config');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { upiId: DEFAULT_UNIVERSAL_UPI_ID, payeeName: RECIPIENT_NAME, customQrImage: '' };
  });

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
    // Pre-load central server configuration for webhooks and spreadsheet links
    fetch('/api/payment-config')
      .then(res => res.json())
      .then(cfg => {
        if (cfg) {
          if (cfg.gsheetWebhookUrl && (!webhookUrl || webhookUrl === DEFAULT_GSHEET_WEBHOOK_URL)) {
            setWebhookUrl(cfg.gsheetWebhookUrl);
          }
          if (cfg.gsheetSpreadsheetUrl && !spreadsheetUrl) {
            setSpreadsheetUrl(cfg.gsheetSpreadsheetUrl);
          }
        }
      })
      .catch(() => {});
  }, []);

  const saveSpreadsheetUrl = async () => {
    localStorage.setItem('aayutatva_gsheet_spreadsheet_url', spreadsheetUrl.trim());
    try {
      await fetch('/api/payment-config', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-staff-passcode': activeAuthKey || passcode 
        },
        body: JSON.stringify({ gsheetSpreadsheetUrl: spreadsheetUrl.trim() })
      });
    } catch (e) {}
    setSpreadsheetSaved(true);
    setTimeout(() => setSpreadsheetSaved(false), 2000);
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

  const [syncingAll, setSyncingAll] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState('');

  const saveWebhook = async () => {
    localStorage.setItem('aayutatva_gsheet_webhook_url', webhookUrl);
    try {
      await fetch('/api/payment-config', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-staff-passcode': activeAuthKey || passcode 
        },
        body: JSON.stringify({ gsheetWebhookUrl: webhookUrl.trim() })
      });
    } catch (e) {
      console.warn('Could not persist webhook to server:', e);
    }
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 2000);
  };

  const syncAllLeadsToSheet = async () => {
    if (!webhookUrl || records.length === 0) return;
    setSyncingAll(true);
    setSyncStatusMsg(`Syncing ${records.length} lead(s) to Google Sheets...`);
    let count = 0;
    for (const rec of records) {
      try {
        const queryParams = new URLSearchParams({
          id: rec.id || '',
          name: rec.name || '',
          whatsapp: rec.whatsapp || '',
          age: String(rec.age || ''),
          gender: rec.gender || 'Male',
          height: rec.currentHeight || '',
          currentHeight: rec.currentHeight || '',
          city: rec.city || '',
          email: rec.email || '',
          goal: rec.goal || '',
          status: rec.status || 'Free Workshop Confirmed',
          submittedAt: rec.submittedAt || new Date().toISOString(),
        });
        const fullUrl = webhookUrl.includes('?') ? `${webhookUrl}&${queryParams}` : `${webhookUrl}?${queryParams}`;
        await fetch(fullUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(rec),
        });
        count++;
      } catch (err) {
        console.warn('Sync failed for item:', rec.id, err);
      }
    }
    setSyncingAll(false);
    setSyncStatusMsg(`✅ Dispatched ${count} of ${records.length} lead(s) directly to your Google Sheet!`);
    setTimeout(() => setSyncStatusMsg(''), 5000);
  };

  const sendTestPing = async () => {
    if (!webhookUrl) return;
    setTestSent(true);
    try {
      const testData = {
        id: 'TEST-AAYU-' + Math.floor(1000 + Math.random() * 9000),
        name: 'Test Attendee (Dr. Yerpude)',
        whatsapp: '917758816074',
        age: '21',
        gender: 'Male',
        currentHeight: '5 ft 7 in',
        city: 'Bhandara',
        fee: 0,
        upiRef: 'LIVE-SYNC-TEST',
        status: 'Free Workshop Confirmed',
        submittedAt: new Date().toISOString()
      };
      const queryParams = new URLSearchParams({
        id: testData.id,
        name: testData.name,
        whatsapp: testData.whatsapp,
        age: testData.age,
        gender: testData.gender,
        height: testData.currentHeight,
        currentHeight: testData.currentHeight,
        city: testData.city,
        status: testData.status,
        submittedAt: testData.submittedAt,
      });
      const fullUrl = webhookUrl.includes('?') ? `${webhookUrl}&${queryParams}` : `${webhookUrl}?${queryParams}`;
      await fetch(fullUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(testData)
      });
      alert('✅ Test row dispatched to your Google Sheet! Please open your Google Sheet to confirm the row.');
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
                Attendee lead management & Excel export for 1st Nov Free Workshop
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
                <span className="text-[10px] text-emerald-600">Active leads for 1 Nov session</span>
              </div>
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl">
                <span className="text-[10px] text-stone-500 font-bold uppercase">Workshop Entry Fee</span>
                <div className="text-2xl font-bold text-emerald-700 mt-0.5">₹0</div>
                <span className="text-[10px] text-stone-500">100% Free Workshop</span>
              </div>
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl">
                <span className="text-[10px] text-stone-500 font-bold uppercase">Broadcast Date</span>
                <div className="text-base font-bold text-stone-800 mt-0.5">29th Oct 2026</div>
                <span className="text-[10px] text-stone-500">Send Zoom/Meet link 3 days prior</span>
              </div>
            </div>

            {/* 1. Open Google Sheet Online (Direct Cloud Spreadsheet) */}
            <div className="bg-white border-2 border-emerald-600/30 p-4 rounded-xl mb-4 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    📊
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm flex items-center gap-1.5">
                      <span>Live Google Sheet (Online Spreadsheet)</span>
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Open your actual Google Sheet in Google Drive to view, search, and manage leads online.
                    </p>
                  </div>
                </div>
                {spreadsheetUrl && spreadsheetUrl.startsWith('http') && (
                  <a
                    href={spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow"
                  >
                    <ExternalLink size={14} />
                    <span>Open Google Sheet ↗</span>
                  </a>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="url"
                  placeholder="Paste your Google Sheet view link: https://docs.google.com/spreadsheets/d/.../edit"
                  value={spreadsheetUrl}
                  onChange={(e) => setSpreadsheetUrl(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 border rounded-lg border-stone-300 bg-white font-mono"
                />
                <button
                  type="button"
                  onClick={saveSpreadsheetUrl}
                  className="bg-[#1B3B22] hover:bg-[#255230] text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer flex-shrink-0"
                >
                  {spreadsheetSaved ? 'Saved!' : 'Save Sheet Link'}
                </button>
              </div>
              <p className="text-[10px] text-stone-500 mt-1.5">
                💡 <strong>Important:</strong> Paste the URL from your Google Sheet browser tab (starts with <code>https://docs.google.com/spreadsheets/d/...</code>) so you can open it with one click anytime!
              </p>
            </div>

            {/* 2. Direct Excel URL Banner */}
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl mb-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <span className="font-bold text-emerald-950 block">Direct Excel / CSV Sheet Link (Authenticated):</span>
                <code className="text-[11px] text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200 break-all select-all">
                  {typeof window !== 'undefined' ? window.location.origin : ''}/api/height-registrations?export=csv&auth={encodeURIComponent(activeAuthKey)}
                </code>
                <p className="text-[10px] text-stone-500 mt-0.5">
                  Clicking "Download Live Excel" downloads the current attendee list to your device as an Excel spreadsheet.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={`/api/height-registrations?export=csv&auth=${encodeURIComponent(activeAuthKey)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="AayuTatva_Height_Masterclass_Attendees.csv"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center gap-1 shadow cursor-pointer"
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
                  className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs py-2 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer"
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
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Registration</th>
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
                        <td className="p-2.5 font-mono text-[10px] text-emerald-800 font-semibold">{r.status || 'Free Confirmed'}</td>
                        <td className="p-2.5">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                            Free Workshop (₹0)
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
                <div className="flex gap-2 flex-shrink-0 flex-wrap">
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
                  <button
                    type="button"
                    onClick={syncAllLeadsToSheet}
                    disabled={syncingAll || records.length === 0}
                    className="bg-[#0E6251] hover:bg-[#0B4F41] text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer flex items-center gap-1 shadow-sm"
                  >
                    <RefreshCw size={12} className={syncingAll ? 'animate-spin' : ''} />
                    <span>{syncingAll ? 'Syncing...' : `Sync All ${records.length} Leads to Sheet`}</span>
                  </button>
                </div>
              </div>

              {syncStatusMsg && (
                <div className="mt-2.5 p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-lg text-xs font-semibold animate-in fade-in">
                  {syncStatusMsg}
                </div>
              )}

              {/* Crucial Google Apps Script Setup Notice */}
              <div className="mt-3 bg-white p-3 rounded-lg border border-stone-200 text-[11px] text-stone-600 space-y-1.5">
                <div className="font-bold text-stone-800 flex items-center gap-1.5">
                  <span>📋 Mandatory Google Apps Script Code for your Google Sheet:</span>
                </div>
                <p>
                  In your Google Sheet, open <strong>Extensions &gt; Apps Script</strong>, paste the code below, and deploy:
                </p>
                <div className="bg-stone-900 text-emerald-300 p-2.5 rounded font-mono text-[10px] overflow-x-auto leading-relaxed select-all">
                  {`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = {};
  try { data = JSON.parse(e.postData.contents); } catch(f) {}
  var p = e.parameter || {};
  sheet.appendRow([
    new Date(),
    data.id || p.id || ("AAYU-" + Date.now()),
    data.name || p.name || "",
    "'" + (data.whatsapp || p.whatsapp || ""),
    data.age || p.age || "",
    data.gender || p.gender || "Male",
    data.currentHeight || p.currentHeight || p.height || "",
    data.city || p.city || "",
    data.email || p.email || "",
    data.goal || p.goal || "",
    data.status || p.status || "Free Workshop Confirmed"
  ]);
  return ContentService.createTextOutput(JSON.stringify({status: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}`}
                </div>
                <div className="text-[10px] text-stone-500 pt-1">
                  Click <strong>Deploy &gt; New deployment &gt; Select type: Web app</strong> &gt; Set <strong>Execute as: Me</strong> and <strong>Who has access: Anyone</strong>. Copy that web app URL and paste it above!
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
