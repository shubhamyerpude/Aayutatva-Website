import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Phone, ArrowUpRight, Menu, X, ChevronRight, Home, 
  Sparkles, Flower2, Activity, Calendar, Ruler, Building2, MessageCircle,
  MoreVertical, Video 
} from 'lucide-react';
import { 
  HeightCampaignPopup, 
  HeightAdminModal 
} from './HeightMasterclassCampaign.jsx';

export const phonePrimary = '+917758816074';
export const whatsappPhone = '917758816074';

/**
 * Mobile Bottom Navigation Bar (Pattern 1 from Mobile Touch Design Guidelines)
 * Ergonomic thumb zone for 1-tap mobile navigation. Hidden on desktop (md:hidden).
 */
export function MobileBottomNav() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  const p = currentPath.replace(/\/$/, '') || '/';
  const isHome = p === '/' || p === '/index.html';
  const isSpecialities = p.includes('treatment');
  const isAI = p.includes('vaidya') || p.includes('ai-assistant') || p.includes('ask-vaidya');
  const isQuiz = p.includes('quiz') || p.includes('prakriti') || p.includes('dosha');

  return (
    <nav 
      className="mobile-bottom-nav md:hidden" 
      aria-label="Mobile primary navigation"
    >
      <div className="mobile-bottom-nav-inner">
        <a 
          href="/" 
          className={`mobile-tab-item ${isHome ? 'active' : ''}`}
          aria-label="Home"
        >
          <Home size={20} className="tab-icon" />
          <span className="tab-label">Home</span>
        </a>

        <a 
          href="/treatments.html" 
          className={`mobile-tab-item ${isSpecialities ? 'active' : ''}`}
          aria-label="Specialities"
        >
          <Flower2 size={20} className="tab-icon" />
          <span className="tab-label">Specialities</span>
        </a>

        <button 
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('open-vaidya-widget'))}
          className={`mobile-tab-item tab-featured ${isAI ? 'active' : ''}`}
          aria-label="AayuVaidya AI Assistant"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <div className="featured-icon-badge">
            <Sparkles size={18} className="tab-icon" />
          </div>
          <span className="tab-label">आयुवैद्य AI</span>
        </button>

        <a 
          href="/dosha-quiz.html" 
          className={`mobile-tab-item ${isQuiz ? 'active' : ''}`}
          aria-label="Prakriti Dosha Quiz"
        >
          <Activity size={20} className="tab-icon" />
          <span className="tab-label">देह प्रकृती</span>
        </a>

        <a 
          href="/#booking" 
          className="mobile-tab-item tab-cta"
          aria-label="Book Appointment"
        >
          <Calendar size={20} className="tab-icon" />
          <span className="tab-label">Book OPD</span>
        </a>
      </div>
    </nav>
  );
}

export function SiteHeader({ breadcrumb = null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const handleOpenAdmin = () => setAdminOpen(true);
    window.addEventListener('open-height-admin', handleOpenAdmin);

    // If URL has #register-height or ?campaign=height, open popup automatically
    if (window.location.hash === '#register-height' || window.location.search.includes('campaign=height')) {
      window.dispatchEvent(new CustomEvent('open-height-masterclass', { detail: { step: 1 } }));
    }

    return () => {
      window.removeEventListener('open-height-admin', handleOpenAdmin);
    };
  }, []);

  // Prevent background body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* 1. Campaign Popup Trigger (Opens on click or direct URL parameter) */}
      <HeightCampaignPopup autoOpen={false} />

      {/* 2. Top Portal Status Bar */}
      <div className="top-portal-bar">
        <div className="top-portal-bar-left">
          <span className="top-portal-chip">NABH ACCREDITED</span>
          <span className="top-portal-city">AayuTatva Ayurvedic Hospital · Bhandara, Maharashtra</span>
        </div>
        <div className="top-portal-bar-right">
          <a href="/insurance.html" className="top-portal-mediclaim">
            <Building2 size={14}/> IPD Hospital Admission
          </a>
          <a href={`tel:${phonePrimary}`} className="top-portal-phone">
            <Phone size={14}/> +91 77588 16074
          </a>
        </div>
      </div>

      {/* 3. Main Header Title Bar */}
      <header className="header">
        <a href="/" className="brand" aria-label="AayuTatva Ayurvedic Hospital Home">
          <img 
            className="brand-logo" 
            src="/media/aayutatva-logo.png" 
            alt="Dr. Yerpude’s AayuTatva Ayurved Hospital & Panchakarma Centre"
          />
        </a>

        {/* Backdrop overlay for mobile menu */}
        {menuOpen && (
          <div 
            className="mobile-drawer-backdrop" 
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Navigation Menu */}
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Site navigation">
          {/* Mobile drawer header */}
          <div className="mobile-drawer-header md:hidden">
            <span className="mobile-drawer-title">AayuTatva Menu</span>
            <button 
              type="button" 
              className="mobile-drawer-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <a href="/" onClick={() => setMenuOpen(false)}>
            <Home size={18} className="nav-item-icon md:hidden" />
            <span>Home</span>
          </a>
          <a href="/treatments.html" onClick={() => setMenuOpen(false)}>
            <Flower2 size={18} className="nav-item-icon md:hidden" />
            <span>Our Specialities</span>
          </a>
          <a href="/facilities.html" onClick={() => setMenuOpen(false)}>
            <Building2 size={18} className="nav-item-icon md:hidden" />
            <span>Hospital & IPD</span>
          </a>
          <a href="/insurance.html" onClick={() => setMenuOpen(false)}>
            <Building2 size={18} className="nav-item-icon md:hidden" />
            <span>Hospital Admission & IPD</span>
          </a>
          <a href="/dosha-quiz.html" onClick={() => setMenuOpen(false)}>
            <Activity size={18} className="nav-item-icon md:hidden" />
            <span>प्रकृती व नाडी परीक्षा</span>
            <span className="nav-chip-badge md:hidden">Self-Test</span>
          </a>
          <button 
            type="button"
            onClick={() => {
              setMenuOpen(false);
              window.dispatchEvent(new CustomEvent('open-vaidya-widget'));
            }}
            className="nav-item-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid #eeece5',
              padding: '14px 4px',
              font: 'inherit',
              fontSize: '14px',
              color: 'inherit',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Sparkles size={18} className="nav-item-icon md:hidden" />
            <span>आयुवैद्य AI Assistant</span>
            <span className="nav-chip-badge md:hidden">24/7 Live</span>
          </button>
          <a href="/height-session.html" onClick={() => setMenuOpen(false)}>
            <Ruler size={18} className="nav-item-icon md:hidden" />
            <span>Height Growth Care</span>
          </a>

          <button 
            type="button"
            onClick={() => {
              setMenuOpen(false);
              window.dispatchEvent(new CustomEvent('open-height-masterclass', { detail: { step: 0 } }));
            }}
            className="nav-item-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid #eeece5',
              padding: '14px 4px',
              font: 'inherit',
              fontSize: '14px',
              color: '#17331D',
              fontWeight: '700',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Video size={18} className="nav-item-icon text-amber-700 md:hidden" />
            <span>Live Masterclass (18 Oct · 7-8 PM · ₹9)</span>
            <span className="nav-chip-badge md:hidden" style={{ background: '#d4a373', color: '#17331D' }}>Live</span>
          </button>

          <a href="/#booking" className="nav-book" onClick={() => setMenuOpen(false)}>
            <Calendar size={18} className="nav-item-icon md:hidden" />
            <span>Book Appointment</span> 
            <ArrowUpRight size={16}/>
          </a>

          {/* Quick contact buttons in mobile drawer */}
          <div className="mobile-drawer-actions md:hidden">
            <a href={`tel:${phonePrimary}`} className="mobile-drawer-btn phone">
              <Phone size={16} /> Call Hospital
            </a>
            <a 
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent('Hello Dr. Manish Yerpude, I am inquiring from the website for an appointment at AayuTatva Hospital in Bhandara.')}`}
              target="_blank" 
              rel="noreferrer"
              className="mobile-drawer-btn whatsapp"
            >
              <MessageCircle size={16} /> WhatsApp Desk
            </a>
          </div>
        </nav>

        <div className="header-right">
          <a href={`tel:${phonePrimary}`} className="phone-head" aria-label="Call clinic at +91 77588 16074">
            <Phone size={16}/><span>Call Clinic</span>
          </a>
        </div>

        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </header>

      {/* Breadcrumbs for easy navigation */}
      {breadcrumb && (
        <nav className="site-breadcrumbs" aria-label="Breadcrumb navigation">
          <div className="breadcrumbs-inner">
            <a href="/" className="crumb-link">
              <Home size={14} style={{ marginRight: '5px' }}/> Home
            </a>
            <ChevronRight size={14} className="crumb-arrow"/>
            <span className="crumb-active">{breadcrumb}</span>
          </div>
        </nav>
      )}

      {/* Mobile Bottom Navigation Bar (Pattern 1) */}
      <MobileBottomNav />

      {/* Admin Leads & Excel Export Dialog */}
      <HeightAdminModal 
        isOpen={adminOpen} 
        onClose={() => setAdminOpen(false)} 
      />
    </>
  );
}
