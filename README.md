# 💠 CyberNest: Digital Civilization
### *The Next-Generation AI-Powered Neural Marketplace*

CyberNest is not a platform; it is a cinematic digital ecosystem built for the exchange of elite AI tools, automation frameworks, and neural assets.

---

## ⚡ Live Deployment Protocol (Fast Track)

To initialize the CyberNest ecosystem on **Vercel** and **Supabase**, follow these three steps.

### 1. Establish Environmental Links
Create a `.env` file in the root directory.

**CRITICAL:** Supabase requires two connection strings to prevent the terminal from hanging during setup.

```env
# 1. TRANSACTION POOLER (Mode: Transaction, Port: 6543)
# Used for the running application
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# 2. DIRECT CONNECTION (Mode: Session, Port: 5432)
# Used for 'prisma db push' to initialize the database
DIRECT_URL="postgresql://postgres.xxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# 3. NEURAL API (Supabase > Settings > API)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
```

### 2. Initialize Neural Synchronization
Execute the automated sequence to install dependencies, synchronize the database schema, and seed the marketplace:

```bash
npm run nexus-init
```

*Note: If the terminal hangs at "Datasource db", ensure your `DIRECT_URL` is using port 5432 and Session mode.*

### 3. Deploy to Global Nexus (Vercel)
Connect your repository to Vercel:
- **Environment Variables:** Mirror all 4 variables from Step 1.
- **Build Configuration:**
  - Build: `npm run build`
  - Install: `npm install`

---

## 🛰️ Ecosystem Modules
- **🏛️ Neural Command Center:** Manage citizens and authorize exchanges.
- **🏪 Marketplace Archive:** Cinematic discovery of digital assets.
- **🛠️ Operator Portal:** Real-time asset initialization for sellers.
- **🤖 AI Assistant:** Contextual guidance and lore discovery.

---
*Architecting the Digital Civilization.*
