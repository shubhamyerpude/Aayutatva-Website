import React, { useState } from 'react';
import { ShieldCheck, Phone, ArrowUpRight, Menu, X, ChevronRight, Home } from 'lucide-react';

export const phonePrimary = '+917758816074';
export const whatsappPhone = '917758816074';

export function SiteHeader({ breadcrumb = null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Portal Status Bar */}
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

      {/* Main Header Title Bar (Uniform across all pages) */}
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
          <a href="/height-session.html" onClick={() => setMenuOpen(false)}>Height & Growth</a>
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

      {/* Breadcrumbs for easy redirection */}
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
    </>
  );
}
