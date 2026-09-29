import React, { useState, useEffect } from 'react';
import { ShieldCheck, Phone, ArrowUpRight, Menu, X, ChevronRight, Home, Sparkles } from 'lucide-react';
import { 
  HeightCampaignPopup, 
  HeightAdminModal 
} from './HeightMasterclassCampaign.jsx';

export const phonePrimary = '+917758816074';
export const whatsappPhone = '917758816074';

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

  return (
    <>
      {/* 1. Mobile-First Campaign Popup & Floating Trigger (Crucial for Campaign) */}
      <HeightCampaignPopup autoOpen={true} />

      {/* 2. Top Portal Status Bar */}
      <div className="top-portal-bar">
        <div className="top-portal-bar-left">
          <span className="top-portal-chip">NABH ACCREDITED</span>
          <span>AayuTatva Ayurvedic Hospital · Bhandara, Maharashtra</span>
        </div>
        <div className="top-portal-bar-right">
          <a href="/insurance.html"><ShieldCheck size={13}/> 100% Cashless Mediclaim</a>
          <a href={`tel:${phonePrimary}`}><Phone size={13}/> +91 77588 16074</a>
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

        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/treatments.html" onClick={() => setMenuOpen(false)}>Our Specialities</a>
          <a href="/facilities.html" onClick={() => setMenuOpen(false)}>Hospital & IPD</a>
          <a href="/insurance.html" onClick={() => setMenuOpen(false)}>Cashless Insurance</a>
          <a href="/#booking" className="nav-book" onClick={() => setMenuOpen(false)}>
            Book Appointment <ArrowUpRight size={15}/>
          </a>
        </nav>

        <div className="header-right">
          <a href={`tel:${phonePrimary}`} className="phone-head" aria-label="Call clinic at +91 77588 16074">
            <Phone size={16}/><span>Call Clinic</span>
          </a>
        </div>

        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </header>

      {/* Breadcrumbs for easy navigation */}
      {breadcrumb && (
        <nav className="site-breadcrumbs" aria-label="Breadcrumb navigation">
          <div className="breadcrumbs-inner">
            <a href="/" className="crumb-link">
              <Home size={13} style={{ marginRight: '4px' }}/> Home
            </a>
            <ChevronRight size={13} className="crumb-arrow"/>
            <span className="crumb-active">{breadcrumb}</span>
          </div>
        </nav>
      )}

      {/* Admin Leads & Excel Export Dialog */}
      <HeightAdminModal 
        isOpen={adminOpen} 
        onClose={() => setAdminOpen(false)} 
      />
    </>
  );
}
