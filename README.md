# CyberNest | Futuristic AI Marketplace

CyberNest is a cinematic, next-generation AI-powered digital marketplace built for the modern internet. It combines cyberpunk aesthetics with premium SaaS functionality.

## 🚀 Vision
To create a digital civilization where elite AI tools and neural assets are exchanged through a high-immersion, gamified ecosystem.

---

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion (Glassmorphism & Neon UI)
- **3D/Visuals:** Three.js + GSAP
- **State Management:** Zustand
- **Backend/Auth:** Supabase + PostgreSQL

---

## 🔑 Setup & Deployment (Admin Guide)

This platform is architecturally ready for **Supabase**. To take it live, follow these steps:

### 1. Supabase Initialization
1. Create a new project at [supabase.com](https://supabase.com).
2. Go to **Project Settings > API** and copy your `Project URL` and `Anon Key`.
3. Create a `.env.local` file in the root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### 2. Database Schema
Run the following SQL in the Supabase SQL Editor to initialize the core marketplace infrastructure:
```sql
-- Tables for Products, Categories, Profiles, etc.
-- (Detailed SQL available in internal/schema.sql)
```

### 3. Authentication Configuration
1. Enable **Email/Password** and **Google** providers in Supabase Auth.
2. For Google: Configure your Client ID and Secret in the Supabase dashboard under **Authentication > Providers**.
3. Set the Redirect URL to your production domain (e.g., `https://cybernest.io/auth/callback`).

### 4. Storage Buckets
Create two public buckets in Supabase Storage:
- `product-images`: For cinematic product previews.
- `digital-assets`: For the actual ZIP/PDF deliveries (secure access).

### 5. Deployment
Push to **Vercel** or any Next.js host. Ensure environmental variables are added to the production environment.

---

## 🎮 Gamification & Easter Eggs
- **Ranks:** Explorer → Operator → Cyber Agent → Neural Elite → Nexus Master.
- **Easter Eggs:** Reset daily. Discoverable via terminal commands or hidden UI glitches.
- **Admin Access:** Default credentials for dev mode: Identity: `1` | Key: `1`.

## 📞 Support
- **WhatsApp Support:** +923001412943
- **Nexus Council:** support@cybernest.io

---
*Architecting the Digital Civilization.*
