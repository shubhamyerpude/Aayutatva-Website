import fs from 'fs';
import path from 'path';

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
  submittedAt: string;
}

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const list = loadRegistrations();

  // Export CSV
  if (req.method === 'GET' && (req.query?.export === 'csv' || req.url?.includes('export=csv'))) {
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
      `"${r.status || 'Confirmed'}"`,
      `"₹${r.fee || 9}"`,
      `"${r.upiRef || ''}"`,
      `"Zoom/Meet link will be sent 7 days before Oct 20"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=AayuTatva_Height_Masterclass_${Date.now()}.csv`);
    return res.status(200).send(csvContent);
  }

  // GET all registrations
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
      upiRef: body.upiRef || '',
      fee: body.fee || 9,
      status: 'Confirmed',
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
    return res.status(201).json({ success: true, entry: newEntry, count: list.length });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
