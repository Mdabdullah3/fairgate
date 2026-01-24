# 🏗️ FairGate System Architecture

FairGate implements a secure, client-server model to interact with the FairScale Reputation Layer on Solana.

### 1. Frontend Layer (Client)

- **Framework:** Built with **Next.js 16 (App Router)** and **Framer Motion** for hardware-accelerated animations.
- **Wallet Provider:** Manages Solana connection state via `@solana/wallet-adapter` (Phantom/Solflare).
- **State Machine:** The `HeroVault` component acts as a visual state machine (`IDLE` -> `SCANNING` -> `GRANTED` or `DENIED`) driven by API responses.
- **Security:** Critical UI components (The Citadel Dashboard) are conditionally rendered only after a successful FairScale verification (`fairscore > 500`).

### 2. Middleware Layer (Next.js API)

- **Proxy Route (`/api/score`):**
  - Next.js API Route (/api/score): Acts as a proxy server.
  - Implements error handling and data formatting before passing responses to the frontend.
  - **Failsafe Logic:** Includes a fallback mode to serve mock data if the external API experiences latency, ensuring the demo always functions.

### 3. Data Layer (FairScale Integration)

- **External Endpoint:** `https://api.fairscale.xyz/score`
- **FairScore:** Used for the primary Gating Logic (Threshold check).
- **Tier:** Determines the visual theme of the Vault Reward (Gold vs Emerald).
- **Features:** Wallet history (Age, Tx Count) is displayed in the "Reputation Analysis" section to guide users on how to improve.
