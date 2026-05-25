# CyberNest | Production-Ready AI Marketplace

CyberNest is a cinematic, full-stack AI-powered digital marketplace. This version has been upgraded to a production-ready SaaS architecture using Next.js 15, Prisma ORM, and PostgreSQL.

## 🚀 Key Features
- **Cinematic UI:** Immersive cyberpunk aesthetic with Framer Motion and Glassmorphism.
- **Full-Stack API:** Real-time synchronization via Next.js App Router API.
- **Database:** Prisma ORM for type-safe database operations.
- **Role-Based Access:** Integrated logic for Users, Sellers, and Admin Command Center.
- **Automated Workflows:** Real transaction approval, asset initialization, and egg generation.

---

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL (Vercel Postgres / Supabase)
- **ORM:** Prisma
- **State Management:** Zustand
- **Styling:** Tailwind CSS + Framer Motion
- **Icons:** Lucide React

---

## 🔑 Installation & Deployment

To deploy this platform on **Vercel**, follow these steps:

### 1. Environmental Configuration
Create a `.env` file in the root:
```env
DATABASE_URL="your-postgresql-connection-string"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 2. Initialization
Run the following commands:
```bash
npm install
npx prisma generate
npx prisma db push
```

### 3. Build & Launch
```bash
npm run build
npm start
```

---

## 📡 API Endpoints
- `GET /api/users`: Fetch all citizen nodes.
- `POST /api/users`: Create new citizen.
- `DELETE /api/users?id=...`: Decommission node.
- `GET /api/products`: Fetch neural assets.
- `POST /api/products`: Initialize new asset.
- `PATCH /api/transactions`: Update exchange status (Approve/Reject).
- `POST /api/eggs`: Generate new reward egg.

---

## 🎮 Gamification & Easter Eggs
- **Ranks:** Explorer → Operator → Cyber Agent → Neural Elite → Nexus Master.
- **Admin Access:** Direct management of users and assets via the Admin Console.

---
*Architecting the Digital Civilization.*
