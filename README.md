# Murder Mystery Generator 🎭🔍

Ein interaktives Web-Tool, mit dem du in wenigen Minuten dein eigenes **Krimi-Dinner** erstellen kannst: Rollen, Hinweise, Menü, Ablauf und mehr, alles generiert mit KI.  
Ideal für Freunde, Familien oder Themenabende.

---

## 🚀 Hauptfunktionen

- Wizard-Flow: Teilnehmer hinzufügen, Setting & Stimmung wählen, Menü & Dauer festlegen, Schwierigkeit bestimmen.  
- KI-Generierung über OpenAI (z. B. GPT-4o-mini / GPT-5) → strukturiertes Dinner-Szenario mit Rollen, Hinweisen, Menü, Phasen.  
- Zwei Nutzungsmodi: **Free** (Grundfunktionen) und **Premium** (PDF-Download, E-Mail Versand an Spieler, bessere KI-Qualität).  
- Stateloses Modell: kein Login, keine persistente Datenbank – Premium-Freischaltung erfolgt per Einmalzahlung via Stripe.  
- Modernes UI mit Framer Motion, Zustand + Persist und Next.js (App Router).  
- Share-Link: Ergebnis kann geteilt werden (Signatur/URL) ohne Login.

---

## 🧱 Architektur & Technologien

- **Frontend**: Next.js (App Router), TypeScript, TailwindCSS, Shadcn UI Components.  
- **State Management**: Zustand + `persist` Middleware für Wizard-Daten.  
- **KI**: OpenAI Chat Completions mit Function Calling zur Ausgabe eines strukturierten JSON-Objekts.  
- **Payment**: Stripe Checkout, einmaliger Kauf 
- **Deployment-Ready**: Edge Runtime ggf. möglich, stateless Setup ideal für einfache Skalierung.

---

## 🧭 Installation & lokales Setup

1. Repository klonen  
   ```bash
   git clone https://github.com/Rajpreet0/Murder_Mystery_Generator.git
   cd Murder_Mystery_Generator
2. Abängigkeiten installieren
   ```bash
   npm install
   # oder
   yarn
3. .env.local im Projektroot erstellen und mit folgenden Variablen füllen
    ```bash
    OPENAI_API_KEY=your_openai_api_key
    STRIPE_SECRET_KEY=sk_…
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_…
    NEXT_PUBLIC_DOMAIN_URL=https://yourdomain.com
    NEXT_PUBLIC_SHARE_SECRET=a_secret_key
    SMTP_HOST=ma..
    SMTP_PORT=465
    SMTP_USER=user.example
    SMTP_PASS=123456
4. Entwicklungsserver starten
   ```bash
   npm run dev
   # oder
   yarn dev

