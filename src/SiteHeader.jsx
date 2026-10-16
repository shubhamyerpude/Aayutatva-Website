import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, ArrowUpRight, Menu, X, ChevronRight, ChevronDown, Home, 
  Sparkles, Flower2, Activity, Calendar, Ruler, Building2, MessageCircle,
  Video, Lock, Phone, Users
} from 'lucide-react';
import { 
  HeightCampaignPopup, 
  HeightAdminModal 
} from './HeightMasterclassCampaign.jsx';

export const phonePrimary = '+917758816074';
export const whatsappPhone = '917758816074';

/**
 * Mobile Bottom Navigation Bar:
 * - Removed Home, Specialities, and Book OPD buttons as requested.
 * - Added discreet Staff Portal / Hospital Leads & Excel Export access for internal hospital staff.
 * - Quick access to AayuVaidya AI and WhatsApp Desk.
 * - Can be minimized by user, and does not hide the footer.
 * - Strictly hidden on desktop/laptop web mode.
 */
export function MobileBottomNav() {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <aside 
        className="fixed bottom-3 left-3 z-[990] md:hidden"
        aria-label="Staff and AI shortcut"
      >
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="bg-[#17331D] text-[#E7C697] border border-[#D4A373] px-3 py-1.5 rounded-full shadow-lg text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer"
          title="Restore quick staff bar"
        >
          <Lock size={12} />
          <span>Staff / Menu</span>
        </button>
      </aside>
    );
  }

  return (
    <nav 
      className="mobile-bottom-nav md:hidden" 
      aria-label="Staff and quick assistance bottom bar"
    >
      <div className="mobile-bottom-nav-inner">
        {/* 1. Internal Hospital Leads & Excel Export (Staff Access) */}
        <button 
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('open-height-admin'))}
          className="mobile-tab-item tab-staff"
          aria-label="Hospital Leads & Excel Export (Internal Staff)"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <div className="staff-icon-badge">
            <Lock size={16} />
          </div>
          <span className="tab-label">Hospital Leads</span>
        </button>

        {/* 2. Quick AayuVaidya AI Assistant */}
        <button 
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('open-vaidya-widget'))}
          className="mobile-tab-item tab-featured"
          aria-label="AayuVaidya AI Assistant"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <div className="featured-icon-badge">
            <Sparkles size={16} />
          </div>
          <span className="tab-label">आयुवैद्य AI</span>
        </button>

        {/* 3. WhatsApp Clinical Desk */}
        <a 
          href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent('Hello Dr. Manish Yerpude, I am inquiring from the website for an appointment at AayuTatva Hospital in Bhandara.')}`}
          target="_blank" 
          rel="noreferrer"
          className="mobile-tab-item"
          aria-label="WhatsApp Desk"
        >
          <MessageCircle size={18} className="tab-icon text-emerald-600" />
          <span className="tab-label">WhatsApp</span>
        </a>

        {/* Minimize bottom bar to view full footer uninterrupted */}
        <button
          type="button"
          onClick={() => setMinimized(true)}
          className="mobile-tab-minimize"
          title="Minimize bottom bar"
          aria-label="Minimize bottom bar"
        >
          <X size={14} />
        </button>
      </div>
    </nav>
  );
}

export function SiteHeader({ breadcrumb = null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  const p = currentPath.replace(/\/$/, '') || '/';
  const isHome = p === '/' || p === '/index.html';
  const isSpecialities = p.includes('treatment');
  const isFacilities = p.includes('facilities');
  const isHeight = p.includes('height');
  const isAbout = p.includes('about');
  const isBooking = p.includes('book') || p.includes('appointment');

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

      {/* 2. Top Portal Status Bar (Call hospital removed from title bar) */}
      <div className="top-portal-bar">
        <div className="top-portal-bar-left">
          <span className="top-portal-chip">NABH ACCREDITED</span>
          <span className="top-portal-city">AayuTatva Ayurvedic Hospital · Bhandara, Maharashtra</span>
        </div>
        <div className="top-portal-bar-right">
          <a href="/insurance.html" className="top-portal-mediclaim">
            <ShieldCheck size={14}/> 100% Cashless Mediclaim Accepted
          </a>
          <a href="/facilities.html" className="top-portal-mediclaim">
            <Building2 size={14}/> Hospital & IPD Admissions
          </a>
        </div>
      </div>

      {/* 3. Main Header Title Bar (Organized, clean button navigation without clutter) */}
      <header className={`header ${menuOpen ? 'menu-open' : ''}`}>
        {/* AayuTatva Logo with Home Link */}
        <a 
          href="/" 
          className="brand" 
          aria-label="AayuTatva Ayurvedic Hospital Home" 
          title="AayuTatva Ayurvedic Hospital - Return to Home"
        >
          <img 
            className="brand-logo" 
            src="/media/aayutatva-logo.png" 
            alt="Dr. Yerpude’s AayuTatva Ayurved Hospital & Panchakarma Centre"
            style={{ maxHeight: '46px', width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* Desktop Web Navigation: Clean, button-styled options with dropdown for secondary tools */}
        <nav className="desktop-titlebar-nav" aria-label="Primary website navigation">
          <a 
            href="/about.html" 
            className={`nav-btn ${isAbout ? 'active' : ''}`}
            aria-label="About Us"
          >
            About Us
          </a>

          <a 
            href="/treatments.html" 
            className={`nav-btn ${isSpecialities ? 'active' : ''}`}
            aria-label="Treatments"
          >
            Specialities
          </a>

          <a 
            href="/facilities.html" 
            className={`nav-btn ${isFacilities ? 'active' : ''}`}
          >
            Hospital & IPD
          </a>

          <a 
            href="/height-session.html" 
            className={`nav-btn ${isHeight ? 'active' : ''}`}
          >
            Height Growth
          </a>

          {/* More Dropdown Menu */}
          <div className="nav-dropdown-container" ref={dropdownRef}>
            <button 
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`nav-btn nav-btn-dropdown ${dropdownOpen ? 'active' : ''}`}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <span>More</span>
              <ChevronDown 
                size={14} 
                style={{ 
                  transform: dropdownOpen ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.2s ease' 
                }} 
              />
            </button>

            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <a 
                  href="/about.html" 
                  onClick={() => setDropdownOpen(false)}
                  className="nav-dropdown-item"
                >
                  <div className="nav-dropdown-icon bg-stone-100 text-stone-800">
                    <Users size={16} />
                  </div>
                  <div>
                    <b>About Us & Hospital Staff</b>
                    <small>Founders, clinical doctors & care team</small>
                  </div>
                </a>
                <button 
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    window.dispatchEvent(new CustomEvent('open-vaidya-widget'));
                  }}
                  className="nav-dropdown-item"
                >
                  <div className="nav-dropdown-icon bg-emerald-50 text-emerald-800">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <b>आयुवैद्य AI Assistant</b>
                    <small>24/7 Ayurvedic clinical consultation & triage</small>
                  </div>
                </button>

                <a 
                  href="/dosha-quiz.html" 
                  onClick={() => setDropdownOpen(false)}
                  className="nav-dropdown-item"
                >
                  <div className="nav-dropdown-icon bg-amber-50 text-amber-800">
                    <Activity size={16} />
                  </div>
                  <div>
                    <b>देह प्रकृती व नाडी परीक्षा</b>
                    <small>Ayurvedic constitution self-assessment quiz</small>
                  </div>
                </a>

                <a 
                  href="/insurance.html" 
                  onClick={() => setDropdownOpen(false)}
                  className="nav-dropdown-item"
                >
                  <div className="nav-dropdown-icon bg-emerald-50 text-emerald-800">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <b>Cashless Insurance & Mediclaim</b>
                    <small>NABH pre-authorization & 0-deduction support</small>
                  </div>
                </a>

                <a 
                  href="/facilities.html" 
                  onClick={() => setDropdownOpen(false)}
                  className="nav-dropdown-item"
                >
                  <div className="nav-dropdown-icon bg-stone-100 text-stone-800">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <b>Hospital Facilities & Doctors</b>
                    <small>Panchakarma theatre & patient rooms</small>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Live Masterclass Button with pulsing indicator */}
          <button 
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-height-masterclass', { detail: { step: 0 } }))}
            className="nav-btn-masterclass"
            title="25 Oct Sunday Free Height Masterclass registration"
          >
            <span className="live-pulse-dot" />
            <span>Free Masterclass (25 Oct)</span>
          </button>

          {/* Primary CTA: Book Appointment */}
          <a href="/book-appointment.html" className={`nav-btn-primary ${isBooking ? 'active' : ''}`}>
            <span>Book Appointment</span>
            <ArrowUpRight size={14}/>
          </a>
        </nav>

        {/* Mobile Hamburger Toggle Button (Hidden on desktop / laptop) */}
        <button 
          type="button"
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>

        {/* Backdrop overlay for mobile drawer */}
        {menuOpen && (
          <div 
            className="mobile-drawer-backdrop" 
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Drawer (Only used on mobile screens) */}
        <div className={menuOpen ? 'mobile-drawer open' : 'mobile-drawer'}>
          {/* Mobile drawer header: AayuTatva logo replaces text, keeping close button for mobile */}
          <div className="mobile-drawer-header">
            <a 
              href="/" 
              onClick={() => setMenuOpen(false)} 
              aria-label="AayuTatva Ayurvedic Hospital Home"
              className="mobile-drawer-brand-link"
              title="AayuTatva Ayurvedic Hospital - Return to Home"
            >
              <img 
                src="/media/aayutatva-logo.png" 
                alt="AayuTatva Ayurvedic Hospital" 
                className="mobile-drawer-logo"
              />
            </a>
            <button 
              type="button" 
              className="mobile-drawer-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-drawer-body">
            <a href="/about.html" onClick={() => setMenuOpen(false)} className="mobile-drawer-link">
              <Users size={18} className="nav-item-icon" />
              <span>About Us & Doctors</span>
            </a>
            <a href="/treatments.html" onClick={() => setMenuOpen(false)} className="mobile-drawer-link">
              <Flower2 size={18} className="nav-item-icon" />
              <span>Our Specialities</span>
            </a>
            <a href="/facilities.html" onClick={() => setMenuOpen(false)} className="mobile-drawer-link">
              <Building2 size={18} className="nav-item-icon" />
              <span>Hospital & IPD Facilities</span>
            </a>
            <a href="/height-session.html" onClick={() => setMenuOpen(false)} className="mobile-drawer-link">
              <Ruler size={18} className="nav-item-icon" />
              <span>Height Growth Care</span>
            </a>

            <button 
              type="button"
              onClick={() => {
                setMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-height-masterclass', { detail: { step: 0 } }));
              }}
              className="mobile-drawer-link mobile-drawer-link-highlight"
            >
              <Video size={18} className="text-amber-700" />
              <span>Free Masterclass (25 Oct Sun · 7-8 PM)</span>
              <span className="nav-chip-badge" style={{ background: '#d4a373', color: '#17331D' }}>Free</span>
            </button>

            <button 
              type="button"
              onClick={() => {
                setMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-vaidya-widget'));
              }}
              className="mobile-drawer-link"
            >
              <Sparkles size={18} className="nav-item-icon" />
              <span>आयुवैद्य AI Assistant</span>
              <span className="nav-chip-badge">24/7 Live</span>
            </button>

            <a href="/dosha-quiz.html" onClick={() => setMenuOpen(false)} className="mobile-drawer-link">
              <Activity size={18} className="nav-item-icon" />
              <span>देह प्रकृती व नाडी परीक्षा</span>
              <span className="nav-chip-badge">Self-Test</span>
            </a>

            <a href="/insurance.html" onClick={() => setMenuOpen(false)} className="mobile-drawer-link">
              <ShieldCheck size={18} className="nav-item-icon" />
              <span>Cashless Insurance & Mediclaim</span>
            </a>

            <a href="/book-appointment.html" className="mobile-drawer-book-btn" onClick={() => setMenuOpen(false)}>
              <Calendar size={18} />
              <span>Book Appointment</span> 
              <ArrowUpRight size={16}/>
            </a>

            {/* Quick contact buttons in mobile drawer */}
            <div className="mobile-drawer-actions">
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
          </div>
        </div>
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

      {/* Mobile Bottom Navigation Bar: leads & AI access */}
      <MobileBottomNav />

      {/* Admin Leads & Excel Export Dialog */}
      <HeightAdminModal 
        isOpen={adminOpen} 
        onClose={() => setAdminOpen(false)} 
      />
    </>
  );
}
