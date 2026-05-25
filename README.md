# 🌌 CyberNest: Full Launch & Deployment Guide (Step 0 to Live)

Welcome to the definitive guide for launching **CyberNest**. This document will take you from a blank screen to a fully hosted, AI-powered digital civilization.

---

## 🛠️ PHASE 1: Supabase Backend Setup (The Brain)

### Step 1: Create a Supabase Account
1.  Go to [supabase.com](https://supabase.com/).
2.  Click **"Start your project"** and sign in with GitHub or Email.
3.  Click **"New Project"**.
4.  **Name:** `CyberNest`
5.  **Database Password:** Generate one and **SAVE IT** (you won't see it again).
6.  **Region:** Select the one closest to your target audience (e.g., Singapore or US East).
7.  Click **"Create new project"** and wait ~2 mins for the database to provision.

### Step 2: Initialize the Database (Tables & Schema)
1.  In your Supabase sidebar, click the **"SQL Editor"** icon (looks like `>_`).
2.  Click **"+ New query"**.
3.  Open the `schema.sql` file provided in this repository.
4.  **Copy the entire content** of `schema.sql` and paste it into the Supabase SQL Editor.
5.  Click **"Run"**. You should see "Success. No rows returned."
6.  *Verification:* Click the "Table Editor" icon in the sidebar. You should now see tables like `users`, `products`, `transactions`, etc.

### Step 3: Configure Storage (Assets & Receipts)
1.  Sidebar > **Storage**.
2.  Click **"New Bucket"**.
3.  **Name:** `screenshots` | **Public:** TOGGLE ON (needed for admin verification).
4.  Click **"New Bucket"** again.
5.  **Name:** `assets` | **Public:** TOGGLE OFF (this keeps your paid products secure).

---

## 🔐 PHASE 2: Google Authentication Setup (The Gateway)

### Step 4: Google Cloud Console
1.  Go to [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a **New Project** named `CyberNest-Auth`.
3.  Sidebar > **APIs & Services > OAuth consent screen**.
4.  User Type: **External** > Create.
5.  App Name: `CyberNest` | Support Email: Your email.
6.  Sidebar > **Credentials > Create Credentials > OAuth client ID**.
7.  Application type: **Web application**.
8.  **Authorized redirect URIs:** You will get this from Supabase in the next step.

### Step 5: Link Google to Supabase
1.  Back in **Supabase** > Sidebar > **Authentication > Providers**.
2.  Find **Google** and toggle it ON.
3.  Copy the **"Callback URL"** shown in Supabase.
4.  Paste this into Google Cloud Console's **"Authorized redirect URIs"** and save.
5.  Google will give you a **Client ID** and **Client Secret**.
6.  Paste these back into the Supabase Google Provider settings and click **Save**.

---

## 🚀 PHASE 3: Vercel Deployment (The Hosting)

### Step 6: Host the Frontend
1.  Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2.  Click **"Add New" > "Project"**.
3.  Import your **CyberNest** repository.
4.  **Environment Variables:** This is the most important part. Expand this section and add:
    - `NEXT_PUBLIC_SUPABASE_URL`: (Find this in Supabase sidebar > Project Settings > API)
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Find this in Supabase sidebar > Project Settings > API)
5.  Click **"Deploy"**.
6.  Once finished, Vercel will give you a domain (e.g., `cybernest.vercel.app`).

---

## 📡 PHASE 4: Final Connection (Live Status)

### Step 7: Update Redirects
1.  In **Supabase > Authentication > URL Configuration**.
2.  Set **Site URL** to your Vercel URL (e.g., `https://cybernest.vercel.app`).
3.  Add your domain to **Redirect URIs**.

---

## 🧭 PHASE 5: Admin Management (The Controls)

### Accessing your Command Center
- **URL:** `your-domain.com/admin/dashboard`
- **Identity:** `1`
- **Key:** `1`

### Daily Operations
1.  **Approving Payments:** When a user buys, their transaction appears in **Payments**. Click "Receipt" to see their screenshot, then click **Approve**. The product is then instantly released to their dashboard.
2.  **Adding Products:** Go to **Assets** to add global products or let sellers use their own dashboard at `/seller/dashboard`.
3.  **Global Config:** Change the site name, logo, or your **WhatsApp number (+923001412943)** directly from the **Platform Config** tab.

---

**CONGRATULATIONS.** Your futuristic digital civilization is now live on the global subspace network.
