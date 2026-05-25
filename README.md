# 🌌 CyberNest: The Futuristic AI Marketplace Ecosystem

Welcome to **CyberNest**, a cinematic, full-stack digital civilization and marketplace. This platform is designed as an investor-level SaaS product, featuring a high-polish cyberpunk aesthetic, intelligent AI assistance, and a complete economic ecosystem.

---

## 🚀 1. High-Level Overview

CyberNest is a multi-role platform where users can:
- **Explore:** Discover elite neural assets, AI tools, and autonomous scripts.
- **Acquire:** Purchase digital products through a secure escrow-style payment flow.
- **Sell:** Apply for Operator status and manage a professional digital storefront.
- **Progress:** Earn XP, unlock badges, and climb the global Leaderboard.
- **Immersion:** Engage with the Encrypted Archives (Lore) and discover hidden Easter Eggs.

---

## 🛠️ 2. Rapid Setup & Deployment

### Local Environment
1.  **Clone the Repository**
2.  **Initialize Subspace (Install Dependencies):**
    ```bash
    npm install
    ```
3.  **Boot the Nexus (Run Development Server):**
    ```bash
    npm run dev
    ```
4.  **Access Terminal:** Navigate to `http://localhost:3000`.

### Production Transmission (Vercel + Supabase)
1.  **Database Setup:** Execute the provided `schema.sql` in your Supabase SQL Editor to initialize the 15+ required tables.
2.  **Environment Variables:** Add your Supabase URL and Anon Key to your environment variables (`.env.local` or Vercel Settings).
3.  **Deploy:** Connect your repository to Vercel and initiate the build.

---

## 🧭 3. Exploring the Nexus (Controls)

### Navigation Interface
- **Top Navbar:** Your primary gateway to the Market, Vault, Lore, and Elite Leaderboard.
- **Neural Cart:** Tracks pending acquisitions.
- **User Node (Dashboard):** Accessible via the profile icon, managing your internal node state.

### Discovery Protocols
- **Live Search:** Use the search icon in the navbar to scan the nexus for specific neural signatures.
- **Advanced Filters:** In the Marketplace, recalibrate results by Category (Automation, SaaS, etc.) or Neural Rarity (Common to Legendary).
- **Quick Preview:** Click the "Eye" icon on any product card for an instant neural scan without leaving the feed.

### Support
- **Direct WhatsApp Support:** Reach the Nexus Council at `+923001412943` via the floating button above the AI assistant.

---

## 🔐 4. Manual Backend & Authentication Configuration

To make the platform fully production-ready, the following manual steps are required in your **Supabase Dashboard**:

### 1. Supabase Auth (Google Login)
1.  Go to **Authentication > Providers** in Supabase.
2.  Enable **Google**.
3.  Enter your **Google Client ID** and **Client Secret** (obtain these from the Google Cloud Console).
4.  Add your production URL to the "Redirect URIs" list.
5.  In the code (`src/app/auth/login/page.tsx`), the "Google Login" button is ready to be hooked into `supabase.auth.signInWithOAuth({ provider: 'google' })`.

### 2. Manual Payouts & Screenshot Storage
1.  Go to **Storage** in Supabase.
2.  Create two buckets: `screenshots` (public: true) and `assets` (public: false).
3.  Sellers upload assets to the `assets` bucket.
4.  Buyers upload payment proof to the `screenshots` bucket.
5.  Admins verify the `screenshots` bucket links via the **Transaction Vault** in the Admin Dashboard.

### 3. Real-time Status Sync
1.  Enable **Realtime** on the `transactions` and `notifications` tables in the Supabase Database settings.
2.  This allows the Admin Dashboard to "actively" show new payments without refreshing.

---

## 🛠️ 5. Operator & Admin Management

### Operator Portal (Seller Dashboard)
- **URL:** `/seller/dashboard`
- **Asset Initialization:** Use the "Initialize New Asset" modal to upload packages and set rarity.

### Neural Command Center (Admin Dashboard)
- **URL:** `/admin/dashboard`
- **Default Auth:** Identity: `1` | Key: `1`
- **Global Config:**
    - Change **Platform Name** and **Logo** dynamically.
    - Update the global **WhatsApp Support Number**.
    - Adjust the **Nexus Protocol Fee** (Commission %) via a slider.
    - Manage **Citizen Nodes** (Ban/Restore users).

---

## 🏗️ 6. Customizing the Neural Core

- **Branding:** All neon variables are in `src/app/globals.css`. Modify `--cyber-blue`, `--cyber-purple`, and `--cyber-pink`.
- **Lore:** Edit `src/app/lore/page.tsx` to add more encrypted narrative logs.

---

**CyberNest is now operational. Welcome to the future of digital commerce.**
