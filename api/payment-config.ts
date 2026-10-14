import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

export interface PaymentConfig {
  upiId: string;
  payeeName: string;
  phonePeUpiId: string;
  paytmUpiId: string;
  gpayUpiId: string;
  customQrImage?: string;
  activeMode: 'universal' | 'paytm' | 'custom';
  paymentLink?: string;
  updatedAt: string;
}

const DEFAULT_CONFIG: PaymentConfig = {
  upiId: '7758816074@ybl',
  payeeName: 'DR YERPUDES AYUTATVA',
  phonePeUpiId: '7758816074@ybl',
  paytmUpiId: 'paytm.s1j7ydq@pty',
  gpayUpiId: 'yerpudeabhilasha@okhdfcbank',
  customQrImage: '',
  activeMode: 'universal',
  paymentLink: '',
  updatedAt: new Date().toISOString()
};

let inMemoryConfig: PaymentConfig = { ...DEFAULT_CONFIG };

function getStoragePath(): string {
  const targetDir = process.env.VERCEL ? '/tmp' : path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(targetDir)) {
    try {
      fs.mkdirSync(targetDir, { recursive: true });
    } catch {}
  }
  return path.join(targetDir, 'payment-config.json');
}

export function loadPaymentConfig(): PaymentConfig {
  try {
    const file = getStoragePath();
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf8');
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === 'object') {
        inMemoryConfig = { ...DEFAULT_CONFIG, ...parsed };
      }
    }
  } catch (err) {
    console.warn('Error reading payment config file:', err);
  }
  return inMemoryConfig;
}

export function savePaymentConfig(updates: Partial<PaymentConfig>): PaymentConfig {
  inMemoryConfig = {
    ...loadPaymentConfig(),
    ...updates,
    updatedAt: new Date().toISOString()
  };

  try {
    const file = getStoragePath();
    fs.writeFileSync(file, JSON.stringify(inMemoryConfig, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving payment config file:', err);
  }
  return inMemoryConfig;
}

export default function paymentConfigHandler(req: Request, res: Response) {
  if (req.method === 'GET') {
    const config = loadPaymentConfig();
    return res.status(200).json(config);
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const updated = savePaymentConfig(body);
      return res.status(200).json({ success: true, config: updated });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to save payment configuration', details: err?.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
