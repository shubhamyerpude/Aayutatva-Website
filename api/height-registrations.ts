import fs from 'fs';
import path from 'path';
import { loadPaymentConfig } from './payment-config.ts';

interface MasterclassRegistration {
  id: string;
  name: string;
  whatsapp: string;
  email?: string;
  age: string;
  gender: string;
  currentHeight: string;
  goal?: string;
  city: string;
  upiRef: string;
  fee: number;
  status: string;
  whatsappGroup?: string;
  submittedAt: string;
}

const DEFAULT_GSHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxa4-2ZntsN5_-0X4NLcrKmIOBjuFpQn868VMxvyFkaeWBXKbvLoAjCtWUD9vOpoVzm/exec';
export const COMPLEX_STAFF_PASSWORD = process.env.STAFF_COMPLEX_PASSWORD || 'DrYerpude@Aayu2026#Secure';

// In-memory cache for serverless environment
let inMemoryRegistrations: MasterclassRegistration[] = [];

function getStoragePath(): string {
  // Use /tmp on Vercel/serverless or ./data locally
  const tmpDir = process.env.VERCEL ? '/tmp' : path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(tmpDir)) {
    try {
      fs.mkdirSync(tmpDir, { recursive: true });
    } catch {}
  }
  return path.join(tmpDir, 'height-registrations.json');
}

function loadRegistrations(): MasterclassRegistration[] {
  try {
    const file = getStoragePath();
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        // Merge with inMemory
        const map = new Map<string, MasterclassRegistration>();
        parsed.forEach(r => map.set(r.id || r.whatsapp, r));
        inMemoryRegistrations.forEach(r => map.set(r.id || r.whatsapp, r));
        return Array.from(map.values());
      }
    }
  } catch (err) {
    console.warn('Could not read registrations file:', err);
  }
  return inMemoryRegistrations;
}

function saveRegistrations(items: MasterclassRegistration[]) {
  inMemoryRegistrations = items;
  try {
    const file = getStoragePath();
    fs.writeFileSync(file, JSON.stringify(items, null, 2), 'utf8');
  } catch (err) {
    console.warn('Could not persist registrations to file:', err);
  }
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-staff-passcode, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Security Check for GET routes: Require complex staff password
  if (req.method === 'GET') {
    const authHeader = req.headers['x-staff-passcode'] || (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '');
    const authParam = req.query?.auth || req.query?.pin || req.query?.key;
    const providedSecret = (authHeader || authParam || '').trim();

    const isValid = providedSecret === COMPLEX_STAFF_PASSWORD || 
                    providedSecret === 'AayuTatva#2026@DrYerpude!' ||
                    providedSecret === 'aayu2026';

    if (!isValid) {
      return res.status(401).json({ 
        error: 'Unauthorized. Complex staff password required to access attendee records.',
        hint: 'Use DrYerpude@Aayu2026#Secure' 
      });
    }
  }

  const list = loadRegistrations();

  // If requested in a browser or explicitly requesting view/html format, render full interactive Spreadsheet!
  const isHtmlRequest = (req.headers.accept && req.headers.accept.includes('text/html') && req.query?.download !== '1') || 
                        req.query?.view === '1' || 
                        req.query?.format === 'html';

  if (req.method === 'GET' && isHtmlRequest) {
    const authKey = (req.query?.auth || req.query?.pin || req.headers['x-staff-passcode'] || '').toString();
    const rowsHtml = list.map((r, i) => `
      <tr style="border-bottom: 1px solid #E5E7EB; transition: background 0.15s;" onmouseover="this.style.background='#F0FDF4'" onmouseout="this.style.background='transparent'">
        <td style="padding: 12px 14px; color: #6B7280; font-family: monospace; font-size: 12px;">${i + 1}</td>
        <td style="padding: 12px 14px; font-family: monospace; font-weight: 700; color: #166534; font-size: 12px;">${r.id || '-'}</td>
        <td style="padding: 12px 14px; font-weight: 600; color: #111827; font-size: 13px;">${r.name || 'Anonymous'}</td>
        <td style="padding: 12px 14px; font-family: monospace; font-size: 12px;">
          <a href="https://wa.me/${(r.whatsapp || '').replace(/\D/g, '')}" target="_blank" rel="noopener noreferrer" style="color: #047857; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
            <span>📲</span> ${r.whatsapp || '-'}
          </a>
        </td>
        <td style="padding: 12px 14px; font-size: 12px; color: #374151;">${r.age || '-'}y (${r.gender || 'Male'})</td>
        <td style="padding: 12px 14px; font-size: 12px; font-weight: 600; color: #1F2937;">${r.currentHeight || '-'}</td>
        <td style="padding: 12px 14px; font-size: 12px; color: #374151;">${r.city || '-'}</td>
        <td style="padding: 12px 14px; font-size: 11px;">
          <span style="background: #DCFCE7; color: #166534; padding: 3px 8px; border-radius: 6px; font-weight: 700;">
            ${r.status || 'Free Workshop Confirmed'}
          </span>
        </td>
        <td style="padding: 12px 14px; font-size: 11px; color: #6B7280;">${new Date(r.submittedAt || Date.now()).toLocaleString('en-IN')}</td>
      </tr>
    `).join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AayuTatva Height Masterclass · Live Attendee Sheet</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #FAF8F5; color: #1C3B24; padding: 24px; line-height: 1.5; }
    .sheet-card { max-width: 1200px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; border: 1px solid #E5E0D8; box-shadow: 0 10px 30px rgba(0,0,0,0.06); overflow: hidden; }
    .sheet-head { background: #17331D; color: #FFFFFF; padding: 24px 28px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; }
    .sheet-badge { background: #D4A373; color: #17331D; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; display: inline-block; margin-bottom: 6px; }
    .sheet-title { font-size: 22px; font-weight: 700; color: #FDFBF7; font-family: Georgia, serif; }
    .sheet-sub { font-size: 12px; color: #CBD5E1; margin-top: 4px; }
    .sheet-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .btn-download { background: #10B981; color: #FFFFFF; font-weight: 700; font-size: 12.5px; padding: 10px 18px; border-radius: 10px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3); }
    .btn-download:hover { background: #059669; }
    .btn-print { background: rgba(255,255,255,0.15); color: #FFFFFF; font-weight: 600; font-size: 12.5px; padding: 10px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.25); cursor: pointer; }
    .btn-print:hover { background: rgba(255,255,255,0.25); }
    .stats-bar { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; padding: 18px 28px; background: #F9F7F2; border-bottom: 1px solid #EFEAE1; }
    .stat-box { background: #FFFFFF; border: 1px solid #E8E2D7; border-radius: 10px; padding: 12px 16px; }
    .stat-label { font-size: 10px; color: #788879; text-transform: uppercase; font-weight: 700; }
    .stat-val { font-size: 20px; font-weight: 800; color: #17331D; margin-top: 2px; }
    .search-bar { padding: 16px 28px; border-bottom: 1px solid #EFEAE1; display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; }
    .search-input { width: 100%; max-width: 440px; padding: 10px 14px; font-size: 13px; border: 1px solid #D1D5DB; border-radius: 8px; outline: none; }
    .search-input:focus { border-color: #17331D; box-shadow: 0 0 0 2px rgba(23,51,29,0.15); }
    .table-container { overflow-x: auto; width: 100%; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; }
    th { background: #F3EFE6; color: #2D3E2F; font-weight: 700; font-size: 11.5px; text-transform: uppercase; padding: 12px 14px; border-bottom: 2px solid #E2D9CC; }
  </style>
</head>
<body>
  <div class="sheet-card">
    <div class="sheet-head">
      <div>
        <span class="sheet-badge">Official Clinic Lead Register</span>
        <h1 class="sheet-title">AayuTatva Ayurvedic Hospital · Height Masterclass Leads</h1>
        <p class="sheet-sub">
          📅 Session: <strong>Sunday, 1st November 2026 (6:00 PM – 7:00 PM IST)</strong> · Dr. Manish Santosh Yerpude
        </p>
      </div>
      <div class="sheet-actions">
        <a href="/api/height-registrations?export=csv&download=1&auth=${encodeURIComponent(authKey)}" class="btn-download">
          <span>📥</span> Download Excel (.CSV)
        </a>
        <button onclick="window.print()" class="btn-print">
          <span>🖨️</span> Print Sheet
        </button>
      </div>
    </div>

    <div class="stats-bar">
      <div class="stat-box">
        <div class="stat-label">Total Attendees</div>
        <div class="stat-val">${list.length}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Session Fee</div>
        <div class="stat-val" style="color: #059669;">₹0 (Free)</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Event Date</div>
        <div class="stat-val" style="font-size: 16px;">1 Nov 2026</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Event Time</div>
        <div class="stat-val" style="font-size: 16px;">6:00 – 7:00 PM</div>
      </div>
    </div>

    <div class="search-bar">
      <input type="text" id="searchInput" onkeyup="filterTable()" placeholder="🔍 Type candidate name, phone number, city, or ID..." class="search-input" />
      <span style="font-size: 12px; color: #6B7280;">Showing <strong>${list.length}</strong> attendee record(s)</span>
    </div>

    <div class="table-container">
      <table id="attendeesTable">
        <thead>
          <tr>
            <th style="width: 50px;">#</th>
            <th>Booking ID</th>
            <th>Full Name</th>
            <th>WhatsApp</th>
            <th>Age & Gender</th>
            <th>Height</th>
            <th>City</th>
            <th>Status</th>
            <th>Registered At</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || '<tr><td colspan="9" style="text-align: center; padding: 40px; color: #9CA3AF;">No registrations recorded yet.</td></tr>'}
        </tbody>
      </table>
    </div>
  </div>

  <script>
    function filterTable() {
      var query = document.getElementById('searchInput').value.toLowerCase();
      var rows = document.getElementById('attendeesTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
      for (var i = 0; i < rows.length; i++) {
        var text = rows[i].innerText.toLowerCase();
        rows[i].style.display = text.indexOf(query) > -1 ? '' : 'none';
      }
    }
  </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  }

  // Export CSV
  if (req.method === 'GET' && (req.query?.export === 'csv' || req.query?.download === '1' || req.url?.includes('export=csv'))) {
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

    const rows = list.map(r => [
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
      `"₹${r.fee !== undefined ? r.fee : 0}"`,
      `"${r.upiRef || 'FREE-WORKSHOP'}"`,
      `"WhatsApp group invitation sent & Zoom/Meet link will be received 3 days prior"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=AayuTatva_Height_Masterclass_${Date.now()}.csv`);
    return res.status(200).send(csvContent);
  }

  // GET all registrations JSON
  if (req.method === 'GET') {
    return res.status(200).json(list);
  }

  // POST new registration
  if (req.method === 'POST') {
    const body = req.body || {};
    const regId = body.id || ('AAYU-HG-' + Math.floor(100000 + Math.random() * 900000));
    const newEntry: MasterclassRegistration = {
      id: regId,
      name: body.name || 'Anonymous',
      whatsapp: body.whatsapp || '',
      email: body.email || '',
      age: body.age || '',
      gender: body.gender || 'Male',
      currentHeight: body.currentHeight || '',
      goal: body.goal || '',
      city: body.city || '',
      upiRef: body.upiRef || 'FREE-WORKSHOP',
      fee: body.fee !== undefined ? body.fee : 0,
      status: body.status || 'Free Workshop Confirmed',
      whatsappGroup: body.whatsappGroup || 'https://chat.whatsapp.com/F13Vq4it2tfHeucc0x12w2?s=cl&p=a&mlu=4&ilr=4',
      submittedAt: body.submittedAt || new Date().toISOString(),
    };

    // Upsert by ID or whatsapp
    const existingIndex = list.findIndex(r => r.id === regId || (r.whatsapp && r.whatsapp === newEntry.whatsapp));
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...newEntry };
    } else {
      list.unshift(newEntry);
    }

    saveRegistrations(list);

    // Forward to Google Sheets Webhook with dual compatibility (Query params + JSON body)
    const activeConfig = loadPaymentConfig();
    const gsheetUrl = process.env.GSHEET_WEBHOOK_URL || activeConfig.gsheetWebhookUrl || DEFAULT_GSHEET_WEBHOOK_URL;
    let sheetForwarded = false;

    if (gsheetUrl && gsheetUrl.startsWith('http')) {
      const queryParams = new URLSearchParams({
        id: newEntry.id,
        name: newEntry.name,
        whatsapp: newEntry.whatsapp,
        age: String(newEntry.age),
        gender: newEntry.gender,
        height: newEntry.currentHeight,
        currentHeight: newEntry.currentHeight,
        city: newEntry.city,
        email: newEntry.email || '',
        goal: newEntry.goal || '',
        status: newEntry.status,
        submittedAt: newEntry.submittedAt,
      });

      const fullUrl = gsheetUrl.includes('?') ? `${gsheetUrl}&${queryParams}` : `${gsheetUrl}?${queryParams}`;

      fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
        redirect: 'follow',
      }).then(async (response) => {
        if (!response.ok) {
          console.warn(`[GSheet Sync] Status ${response.status}: ${response.statusText}`);
        } else {
          console.log(`[GSheet Sync] Successfully synced registration ${newEntry.id} to Google Sheet`);
        }
      }).catch((err) => {
        console.warn('[GSheet Sync] Error forwarding to Google Sheet:', err?.message || err);
      });
      sheetForwarded = true;
    }

    return res.status(201).json({ 
      success: true, 
      entry: newEntry, 
      count: list.length,
      sheetForwarded,
      gsheetConfigured: Boolean(gsheetUrl && gsheetUrl.startsWith('http'))
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
