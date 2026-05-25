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

### Gamification & Interaction
- **Easter Eggs:** Type secret phrases (e.g., `god_mode`, `nexus_override`) anywhere on the site to trigger UI destabilization and earn bonus XP.
- **XP Progression:** Every interaction increases your Neural XP, which determines your Rank (Initiate to Nexus Master).

---

## 🛠️ 4. Operator & Admin Management

### Operator Portal (Seller Dashboard)
- **URL:** `/seller/dashboard`
- **Asset Initialization:** Use the "Initialize New Asset" modal to upload ZIP/PDF packages, set pricing, and define rarity.
- **Analytics:** Monitor storage link health, total sales, and unread intel.

### Neural Command Center (Admin Dashboard)
- **URL:** `/admin/dashboard` (Protected via password)
- **Default Auth:** Identity: `1` | Key: `1`
- **Functions:**
    - **Transaction Vault:** Approve or reject manual payment verifications (Bank, Easypaisa, Binance).
    - **Neural Shield:** Ban malicious users or trigger system-wide lockdowns.
    - **Live Logs:** Monitor security incidents and global node activity in real-time.

---

## 💳 5. Acquisition Protocol (Payment Flow)

1.  **Selection:** Add neural assets to your cart.
2.  **Verification:** Proceed to checkout and select your subspace payment method.
3.  **Transmission Proof:** Upload a receipt screenshot and enter the unique Transaction ID.
4.  **Escrow:** The Nexus Council (Admin) verifies the units.
5.  **Transmission:** Once approved, the asset appears in your **Neural Acquisitions** dashboard for immediate download.

---

## 🏗️ 6. Customizing the Neural Core (SaaS Config)

### Monetization Models
- **Commission Mode:** Edit the `Protocol Fee` in `src/app/cart/page.tsx` and the admin dashboard to set your percentage (default: 15%).
- **Subscription Mode (Rent):** The platform architecture supports a "Monthly Rent" model for sellers. To activate, modify the `seller_applications` table in `schema.sql` to include a `subscription_tier`.

### Branding & Aesthetic
- **Color Palettes:** All neon glow variables are stored in `src/app/globals.css`. Modify `--cyber-blue`, `--cyber-purple`, and `--cyber-pink` to instantly rebrand the nexus.
- **AI Personality:** Adjust the floating orb's behavioral logic in `src/components/ai/CyberNestAI.tsx` to change greeting protocols and recommendation weightedness.

---

## 📜 7. The Digital Civilization (Public Hubs)
- **About:** Understand the mission of the Nexus Council.
- **Support Hub:** Access the Knowledge Base and initialize support chats.
- **Encrypted Archives:** Read the history of the "Great Disconnect" and the origins of the marketplace.
- **Legal Nodes:** Review the Nexus Protocol Terms and Neural Data Privacy policies.

---

**CyberNest is now operational. Welcome to the future of digital commerce.**
