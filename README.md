# Dr. Yerpude's AayuTatva Ayurvedic Hospital

Responsive website for Dr. Yerpude's AayuTatva Ayurvedic Hospital & Panchakarma Centre in Bhandara, Maharashtra.

## Website sections

- Hospital introduction, credentials, doctors, treatments and contact details
- Dedicated treatment directory
- Height and growth information and Zoom session interest form
- Cashless insurance information
- Patient review cards and Instagram content
- Responsive layouts for desktop, tablet and mobile

## Technology

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production output is generated in `dist/`.

## Deploy on Vercel

This project is fully ready for one-click deployment on **Vercel**:

1. **Import Repository**: Connect your GitHub repository to Vercel.
2. **Build Settings**: Vercel automatically detects the Vite framework:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environment Variables**:
   - In Vercel Project Settings > **Environment Variables**, add:
     - `GEMINI_API_KEY`: Your Google Gemini API key (for live AI completions).
   *(Note: Even if the API key is not configured, the built-in dynamic Ayurvedic knowledge engine responds instantly to patient questions).*
4. **Serverless AI Function**:
   - The included `api/ayurveda-chat.ts` is automatically deployed as a Vercel Serverless Function handling all `/api/ayurveda-chat` requests.
   - The configured `vercel.json` routes API traffic to the serverless function while routing client-side navigation to the React SPA (`index.html`).

## Clinic contact

- Phone: +91 88560 31282 / +91 77588 16074
- Address: 1st Floor, Bawankar Bhavan, Khat Road, near Ganesh Marble, Shiv Nagari, Bhandara, Maharashtra 441904
- Instagram: [@aayu_tatva](https://www.instagram.com/aayu_tatva/)

## Content notes

Treatment information is educational and does not guarantee outcomes. Insurance acceptance and empanelment should be verified with the hospital before admission. The Zoom interest form currently stores submissions in the visitor's browser until a registration service is connected.
