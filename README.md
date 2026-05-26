# CyberNest | Live Digital Civilization

CyberNest is a cinematic, full-stack AI-powered marketplace. Follow this **3-Step Fast Track** to go from zero to a live, populated digital ecosystem.

---

## ⚡ 3-Step Fast Track (Vercel + Supabase)

### 1. Configure Environmental Nodes
Create a `.env` file in your root and insert your database credentials:
```env
# Get this from Supabase > Project Settings > Database > Connection String
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Get these from Supabase > Project Settings > API
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
```

### 2. Initialize the Nexus
Run the automated command to install dependencies, sync your database schema, and seed the marketplace with cinematic assets:
```bash
npm run nexus-init
```

### 3. Deploy to Vercel
Push your code to GitHub and connect it to Vercel.
- **Important:** Add the same `.env` variables to Vercel's *Environment Variables* section.
- **Build Command:** `npm run build`
- **Install Command:** `npm install`

**Your marketplace is now LIVE and populated.**

---

## 📡 Ecosystem Overview

- **Marketplace Archive:** Explore and acquire neural assets.
- **Admin Console:** Manage citizens, approve transactions, and generate rewards.
- **Seller Portal:** Initialize and distribute your own cinematic tools.
- **AI Assistant:** Contextual guidance and lore discovery.

### 📡 Automated API
- `GET /api/users`: Neural node registry.
- `GET /api/products`: Asset distribution feed.
- `PATCH /api/transactions`: Exchange authorization.

---
*Architecting the Digital Civilization.*
