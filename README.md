# 🌌 CyberNest: Your Futuristic AI Marketplace

Welcome to **CyberNest**, a cinematic, AI-powered digital universe where you can explore, buy, and sell next-generation digital tools. This guide will help you set up, use, and manage your new platform in simple steps.

---

## 🚀 1. How to Setup & Deploy

### Step A: Local Setup (On your computer)
1. **Download the code:** Get the project files onto your computer.
2. **Install Node.js:** Make sure you have Node.js installed (Version 18 or higher is best).
3. **Open Terminal:** Navigate to the project folder.
4. **Install Dependencies:** Type this and press enter:
   ```bash
   npm install
   ```
5. **Run the site:** Type this to start the site locally:
   ```bash
   npm run dev
   ```
6. **View the site:** Open your browser and go to `http://localhost:3000`.

### Step B: Deployment (Putting it online)
1. **Use Vercel:** The easiest way to go live is using [Vercel](https://vercel.com).
2. **Connect GitHub:** Upload your code to GitHub and connect it to Vercel.
3. **Environment Variables:** In the Vercel settings, add your Supabase keys (found in `src/lib/supabase.ts` template).
4. **Deploy:** Click "Deploy" and your site will be live!

---

## 🎭 2. The User Experience

### Browsing the Marketplace
*   **Marketplace Archive:** Go to `/marketplace` to see all products.
*   **Filters:** Use the sidebar to sort by **Category** (Automation, SaaS, etc.) or **Rarity** (Common to Legendary).
*   **Rarity System:** Look for the glowing borders! Legendary items are the most powerful.

### The AI Assistant
*   **Meet CyberNest:** Click the **Floating Cyan Orb** in the bottom right corner.
*   **Chat:** Ask it to "Find me AI tools" or "Show me the vault." It will guide you through the site.

### Hidden Easter Eggs
*   **Discovery:** Try typing secret phrases like `god_mode` or `nexus_override` while on any page.
*   **Rewards:** Finding these unlocks secret UI effects and grants you **Neural XP**.

---

## 🛠️ 3. Managing the Site (Admin & Sellers)

### Neural Command Center (Admin Dashboard)
*   **URL:** `/admin/dashboard`
*   **Purpose:** This is where the owner manages the whole ecosystem.
*   **Features:** View total revenue, approve pending payments, and check system health.
*   **Approvals:** When a user buys a product, their transaction appears here for your final green light.

### Operator Portal (Seller Dashboard)
*   **URL:** `/seller/dashboard`
*   **Purpose:** For people who want to sell their own digital products.
*   **Features:** Upload new assets, track your sales, and see your seller rank.
*   **Manual Review:** Remember, all seller products must be approved by the Admin before they go live.

---

## 💳 4. The Payment System

CyberNest uses a secure **Escrow System** to build trust:
1. **User Buys:** A user chooses a product and pays via Bank Transfer, Easypaisa, or Binance.
2. **Upload Proof:** The user uploads a screenshot of their receipt and enters the Transaction ID.
3. **Admin Verification:** The Admin checks the dashboard (`/admin/dashboard`).
4. **Delivery:** Once the Admin clicks "Approve," the product is automatically sent to the user's email/dashboard.

---

## 📜 5. Lore & Immersion

Don't forget to visit the **Encrypted Archives** (`/lore`). Here, users can read the backstory of CyberNest, which builds emotional engagement and makes the products feel like part of a larger story.

---

## 🛡️ 6. Important Security Note
As this is a premium prototype:
*   **Authentication:** The current version allows direct access to dashboards for testing. Before going live with real money, ensure you enable the **Supabase Auth** layer.
*   **Permissions:** Detailed security findings can be found in the `SECURITY.md` file.

---

**Welcome to the future of digital commerce. Welcome to CyberNest.**
