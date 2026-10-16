import React from 'react';
import { 
  ShieldCheck, FileText, ArrowLeft, Building2, Phone, Mail, 
  HelpCircle, CheckCircle, AlertCircle, Ban, Clock3, HeartPulse 
} from 'lucide-react';
import { SiteHeader, phonePrimary } from './SiteHeader.jsx';
import './subpages.css';

export function LegalCompliancePage() {
  return (
    <div className="subpage">
      <SiteHeader breadcrumb="Legal, Terms & Hospital Policy" />
      <main>
        <section className="sub-hero" style={{ paddingBottom: '32px' }}>
          <a className="back-link" href="/"><ArrowLeft size={14}/> BACK TO MAIN PORTAL</a>
          <div className="sub-overline">MERCHANT & HOSPITAL COMPLIANCE · NABH-ALIGNED CLINICAL FACILITY</div>
          <h1>Hospital Terms, Privacy &<br/><em>Payment Policies.</em></h1>
          <p>
            Vaidya Ayurved Hospital & Panchakarma Centre operates in Bhandara, Maharashtra as a certified Ayurvedic healthcare institution providing OPD clinical consultations, Panchakarma day-care, and in-patient treatment.
          </p>
        </section>

        <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px 60px' }}>
          
          {/* 1. Hospital Identity & Business Line */}
          <div style={{ background: '#fff', border: '1px solid #e7ded3', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B3B22', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={20} className="text-emerald-800" /> 1. Merchant Identity & Primary Line of Business
            </h2>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#444', marginBottom: '12px' }}>
              <strong>Business Entity:</strong> Dr. Yerpude’s AayuTatva Ayurved Hospital & Panchakarma Centre<br/>
              <strong>Medical Director:</strong> Dr. Manish Santosh Yerpude (B.A.M.S., MD AM, Reg No. I-117221-A)<br/>
              <strong>Hospital Facility:</strong> 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904<br/>
              <strong>Official Helpline:</strong> +91 77588 16074 · yerpudeabhilasha@gmail.com
            </p>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#444' }}>
              <strong>Primary Category:</strong> Healthcare & Medical Services (MCC 8099 / 8062). We exclusively provide doctor consultation appointments, clinical assessment, classical Panchakarma therapies, and health educational sessions.
            </p>
          </div>

          {/* 2. Critical Clarification on Insurance & Cashless Care (Moved here from Insurance Page) */}
          <div style={{ background: '#fcf8f2', border: '1.5px solid #d4a373', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#7a4b18', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} className="text-amber-800" /> 2. Complete Disclosure on Insurance, Cashless TPA & Mediclaim
            </h2>
            <div style={{ fontSize: '13px', lineHeight: '1.7', color: '#523412' }}>
              <p style={{ marginBottom: '10px' }}>
                <strong>Mandatory Regulatory Notice for Hospital Partners & Patients:</strong>
              </p>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '8px', marginBottom: '12px', spaceY: '6px' }}>
                <li><strong>Strictly No Sale of Insurance:</strong> This hospital is NOT an insurance company, insurance broker, corporate agent, or financial intermediary. We do NOT sell insurance policies, products, riders, or collect insurance premiums of any kind.</li>
                <li><strong>Purpose of Cashless TPA Guidance:</strong> As a clinical Ayurvedic hospital treating chronic spine, joint, and orthopedic ailments, our in-patient (IPD) admissions are eligible for cashless claims or reimbursement under government AYUSH insurance guidelines (Ministry of AYUSH & IRDAI regulations).</li>
                <li><strong>Informational Desk for Admitted Patients:</strong> Any reference to health insurance or third-party administrators (such as Star Health, HDFC ERGO, ICICI Lombard, Niva Bupa, Care Health, New India Assurance) on our premises or documentation is strictly informational to assist patients with paperwork for their existing health insurance policies.</li>
                <li>All insurance claim approvals, deductions, pre-authorizations, and settlements are executed directly between the patient’s insurance company/TPA and the hospital administration. Direct UPI payments are strictly for doctor OPD appointments and health education, never for insurance claims.</li>
              </ul>
              <div style={{ background: '#fff', border: '1px solid #e0cbb2', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                <AlertCircle size={18} className="text-amber-800 flex-shrink-0" />
                <span>
                  <strong>IRDAI Compliance Statement:</strong> No payment accepted on this website relates to insurance premiums, underwriting fees, or policy purchases.
                </span>
              </div>
            </div>
          </div>

          {/* 3. Payment Methods & Consultation Pricing */}
          <div style={{ background: '#fff', border: '1px solid #e7ded3', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B3B22', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} className="text-emerald-800" /> 3. Payment Methods & Consultation Pricing
            </h2>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#444', marginBottom: '12px' }}>
              Payments on this website are accepted directly via verified UPI (Paytm, Google Pay, PhonePe, BHIM) or at the clinic counter exclusively for the following clinical and educational services:
            </p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', fontSize: '13px', lineHeight: '1.7', color: '#444' }}>
              <li><strong>Doctor OPD Consultation Fee:</strong> ₹200 (In-Clinic OPD Appointment with Dr. Manish Santosh Yerpude or Dr. Sakshi G. Sonkusare).</li>
              <li><strong>Follow-up Consultation Fee:</strong> ₹200 (Follow-up Doctor Evaluation & Review).</li>
              <li><strong>Educational Webinars & Workshops:</strong> Specialized live health education masterclasses (such as the 25 Oct Sunday Natural Growth Masterclass) are complimentary (₹0 Free Workshop) requiring no advance payment.</li>
            </ul>
          </div>

          {/* 4. Cancellation, Rescheduling & Strict Webinar No-Refund Policy */}
          <div style={{ background: '#fff', border: '1px solid #e7ded3', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B3B22', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} className="text-emerald-800" /> 4. Appointment Cancellation, Rescheduling & Refund Policy
            </h2>
            
            {/* Consultation policy */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1B3B22', marginBottom: '6px' }}>
                A. In-Clinic Doctor OPD Consultations
              </h3>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc', fontSize: '13px', lineHeight: '1.7', color: '#444' }}>
                <li><strong>Free Rescheduling:</strong> Patients may reschedule their confirmed OPD consultation up to 2 hours before the scheduled time slot at no extra charge by contacting the hospital reception at +91 77588 16074.</li>
                <li><strong>Consultation Cancellation & Refund:</strong> If a patient cancels an advance OPD consultation booking at least 4 hours before the appointment, a full refund of ₹200 is issued to the patient's UPI account within 3–5 working days upon verification.</li>
              </ul>
            </div>

            {/* Strict Webinar No-Refund Policy */}
            <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '10px', padding: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#c53030', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Ban size={16} /> B. Masterclasses & Live Educational Webinars (Strict No-Refund Policy)
              </h3>
              <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#742a2a', margin: 0 }}>
                <strong>For all masterclasses, workshops, and live webinars, NO REFUND is issued under any circumstances</strong> once the registration payment has been completed. Live webinar seats are limited, and digital preparation materials and session access credentials are reserved immediately upon payment confirmation. In the event an attendee cannot participate due to personal scheduling conflicts, session recordings or access to a future live batch may be extended at the sole discretion of the hospital administration, but financial refunds will not be processed. Meeting joining links are dispatched to registered WhatsApp numbers 3 days prior to the masterclass date.
              </p>
            </div>
          </div>

          {/* 5. Patient Privacy & Data Protection (DPDP Act 2023 & DISHA) */}
          <div style={{ background: '#fff', border: '1px solid #e7ded3', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B3B22', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} className="text-emerald-800" /> 5. Patient Data Privacy & Confidentiality (DPDP Act 2023)
            </h2>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#444', marginBottom: '12px' }}>
              In full compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the <strong>Digital Information Security in Healthcare (DISHA) principles</strong>, AayuTatva Ayurvedic Hospital enforces stringent clinical confidentiality:
            </p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', fontSize: '13px', lineHeight: '1.7', color: '#444', spaceY: '6px' }}>
              <li><strong>Data Minimization:</strong> We only collect information strictly necessary for clinical triage, appointment scheduling, and educational masterclass delivery (Name, Phone / WhatsApp, Age, Gender, City, and clinical inquiry).</li>
              <li><strong>Strict Prohibition on Data Sale:</strong> Patient contact numbers, clinical notes, and health records are never sold, rented, monetized, or shared with third-party telemarketers, insurance brokers, or data aggregators.</li>
              <li><strong>Patient Rights:</strong> Patients have the statutory right to request a summary of their recorded health data, request correction of inaccurate details, or withdraw communication consent by emailing our compliance desk.</li>
              <li><strong>Secure Communication:</strong> Official appointment confirmations, session preparation guides, and Google Meet video joining links are transmitted exclusively via verified clinic WhatsApp channels and secure SMS.</li>
            </ul>
          </div>

          {/* 6. Payment Security & NPCI UPI Standards */}
          <div style={{ background: '#fff', border: '1px solid #e7ded3', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B3B22', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} className="text-emerald-800" /> 6. Payment Security & NPCI UPI Standards
            </h2>
            <div style={{ fontSize: '13px', lineHeight: '1.7', color: '#444' }}>
              <p style={{ marginBottom: '10px' }}>
                All digital transactions on this website are executed via the National Payments Corporation of India (NPCI) Unified Payments Interface (UPI) protocols:
              </p>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginBottom: '12px' }}>
                <li><strong>No Cardholder Data Storage:</strong> We do NOT collect, store, or process debit/credit card numbers, CVVs, or bank net-banking passwords. Transactions occur inside the patient's authenticated banking or UPI application.</li>
                <li><strong>Official Verified Hospital UPI ID:</strong> The official clinic recipient UPI ID is strictly <code>7758816074@ybl</code> (Payee: <strong>DR YERPUDES AYUTATVA</strong>). Patients should verify this name before approving payments.</li>
                <li><strong>Free Masterclass Workshop:</strong> The live natural height growth masterclass is a 100% free educational workshop (₹0). No hidden charges or automated recurring debits are applied.</li>
                <li><strong>Bank-Grade 256-Bit Encryption:</strong> UPI transaction authorizations and handshakes occur under end-to-end multi-factor authentication (UPI PIN) managed directly by the issuing bank and NPCI.</li>
              </ul>
            </div>
          </div>

          {/* 7. Website Technical Security & Infrastructure Compliance */}
          <div style={{ background: '#fff', border: '1px solid #e7ded3', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B3B22', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartPulse size={20} className="text-emerald-800" /> 7. Technical Security Architecture & Website Safety
            </h2>
            <div style={{ fontSize: '13px', lineHeight: '1.7', color: '#444' }}>
              <p style={{ marginBottom: '10px' }}>
                Our digital infrastructure is protected with healthcare-grade cybersecurity standards:
              </p>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginBottom: '12px' }}>
                <li><strong>SSL / TLS 1.3 Transport Security:</strong> All web traffic and form submissions are encrypted in transit using industry-standard TLS encryption, preventing eavesdropping and man-in-the-middle attacks.</li>
                <li><strong>Content Security & Header Hardening:</strong> Secure HTTP headers including <code>X-Content-Type-Options: nosniff</code>, <code>Referrer-Policy: strict-origin-when-cross-origin</code>, and restricted permissions policies are actively enforced.</li>
                <li><strong>Input Sanitization & Protection:</strong> All form submissions are validated and sanitized on both client and server layers to prevent cross-site scripting (XSS) and injection attacks.</li>
                <li><strong>Zero Telemetry Slop:</strong> We run no invasive behavioral trackers or unauthorized canvas fingerprinting scripts.</li>
              </ul>
            </div>
          </div>

          {/* 8. Grievance Redressal Officer & Contact SLA */}
          <div style={{ background: '#fdfbf7', border: '1.5px solid #d4a373', borderRadius: '14px', padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B3B22', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={20} className="text-amber-800" /> 8. Grievance Redressal & Compliance Contact
            </h2>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#444', marginBottom: '10px' }}>
              For any privacy inquiries, appointment confirmation escalations, or compliance questions, please contact our designated Hospital Grievance Officer:
            </p>
            <div style={{ background: '#fff', border: '1px solid #e5ded2', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#333' }}>
              <p style={{ margin: '0 0 6px 0' }}><strong>Grievance Officer:</strong> Dr. Manish Santosh Yerpude [Medical Director]</p>
              <p style={{ margin: '0 0 6px 0' }}><strong>Hospital Facility:</strong> AayuTatva Ayurved Hospital, 1st Floor, Bawankar Bhavan, Khat Road, Bhandara, MH 441904</p>
              <p style={{ margin: '0 0 6px 0' }}><strong>Direct Telephone / WhatsApp:</strong> +91 77588 16074</p>
              <p style={{ margin: '0 0 6px 0' }}><strong>Official Email:</strong> yerpudeabhilasha@gmail.com</p>
              <p style={{ margin: 0, color: '#1B3B22', fontWeight: '600' }}><strong>Response Commitment:</strong> All formal patient grievances and compliance requests receive acknowledgement and resolution within 48 business hours.</p>
            </div>
          </div>

        </section>
      </main>

      <footer className="sub-footer">
        <a href="/" className="sub-brand">
          <img src="/media/aayutatva-logo.png" alt="AayuTatva Ayurvedic Hospital logo"/>
        </a>
        <span>Dr. Manish Santosh Yerpude · Bhandara</span>
        <a href="/">Back to home →</a>
      </footer>
    </div>
  );
}
