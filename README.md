# The Anatomy of Software Systems
### *From First Principles to Resilient Architecture: A Domain-Driven Masterclass*

[![Deploy Book to GitHub Pages](https://github.com/actions/workflows/deploy.yml/badge.svg)](https://github.com)
[![VitePress](https://img.shields.io/badge/built%20with-VitePress-4a88f7.svg)](https://vitepress.dev/)
[![Mermaid](https://img.shields.io/badge/diagrams-Mermaid-ff3670.svg)](https://mermaid.js.org/)
[![Status](https://img.shields.io/badge/chapters-42%2F42%20Complete-10b981.svg)](PROGRESS.md)

An interactive, domain-driven software architecture book and system design handbook covering 18 modern engineering domains, 10 standalone production blueprints, and over 80 dynamic sequence and flowchart diagrams.

---

## ⚡ Quick Start: Run Locally in Browser

Ensure you have **Node.js** (v18+) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the local live-reload development server
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)**. You will see:
- 📖 The interactive book reader with markdown rendering and typography
- 📊 Fully interactive Mermaid flowcharts, sequence diagrams, and network topologies
- 🔍 Instant fuzzy search across every chapter (`Cmd + K` or `Ctrl + K`)
- 🌓 Dark / Light mode toggle with smooth visual transitions
- 📱 Responsive sidebar navigation across all 7 parts and 42 chapters

---

## 🚀 Publishing to GitHub Pages

This repository is pre-configured with automated GitHub Actions CI/CD (`.github/workflows/deploy.yml`) to deploy to GitHub Pages on every push.

### Step 1: Enable GitHub Actions for GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (gear icon) > **Pages** (under Code and automation in the left sidebar).
3. Under **Build and deployment** > **Source**, select:
   👉 **`GitHub Actions`** (do *not* select "Deploy from a branch").

### Step 2: Push your code
Push your code to your GitHub repository:
```bash
git add .
git commit -m "feat: setup VitePress book reader and GitHub Pages workflow"
git push origin master  # or git push origin main
```

### Step 3: View your live book
GitHub Actions will automatically run the `Deploy Book to GitHub Pages` workflow. Once complete, your book will be live at:
```
https://<your-github-username>.github.io/<your-repo-name>/
```
> **Note**: The VitePress base path is detected dynamically (`/<repo-name>/` in GitHub Actions and `/` locally), so links, styles, search, and diagrams work seamlessly both locally and on GitHub Pages!

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server at `http://localhost:5173` with instant Hot Module Replacement (HMR). |
| `npm run build` | Compiles all markdown files, diagrams, and assets into an optimized static site in `./dist`. |
| `npm run preview` | Locally serves the production `./dist` build to test before pushing. |

---

## 📚 Book Structure & Table of Contents

The book is organized into **7 Core Parts** consisting of **42 Chapters**, **18 Computing Domains**, and **10 Standalone Production Systems**:

### Master Roadmaps
- **[Master Architectural Roadmap](ROADMAP.md)**: Visual flowchart and learning dependencies.
- **[Cross-Domain Reference Matrix](roadmap/08-cross-domain-matrix.md)**: Side-by-side comparison of 11 fundamental architectural patterns across all 18 domains.
- **[Manuscript Progress Ledger](PROGRESS.md)**: Complete chapter inventory and invariants.

### Part 1: Anatomy of a Request & Web Fundamentals
- **Ch 01**: The Anatomy of a Single Keystroke (DNS, TLS, Sockets)
- **Ch 02**: Browser Lifecycle & Rendering Cost (DOM, Hydration, Event Loop)
- **Ch 03**: When Request Meets Backend (Ingress & Concurrency)
- **Ch 04**: Database Indexing & The Illusion of Speed
- **Ch 05**: Caching Tiers & The Cache Stampede
- **Ch 06**: Case Study: Planetary URL Shortener *(Blueprint 1)*
- **Ch 07**: Standalone System: Distributed Rate Limiter *(Blueprint 2)*

### Part 2: Concurrency, Correctness & State
- **Ch 08**: Race Conditions & Critical Sections
- **Ch 09**: Ticket Booking Architecture (Holds, Locks, Expiry)
- **Ch 10**: Banking Ledgers & Correctness
- **Ch 11**: Idempotency & Partial Failures (Keys, Sagas, Outbox)
- **Ch 12**: Flash Sales & Inventory Depletion
- **Ch 13**: Standalone System: Tamper-Evident Audit Logging *(Blueprint 3)*
- **Ch 14**: Standalone System: Distributed Job Queue & Worker Pool *(Blueprint 4)*

### Part 3: Time, Space & Asynchrony
- **Ch 15**: The Illusion of Global Clock Time
- **Ch 16**: Chat & Collaboration: Ordering & Sync
- **Ch 17**: Geospatial Indexing & Ride-Hailing
- **Ch 18**: Logistics, Supply Chains & Event Sourcing
- **Ch 19**: Travel & Hospitality Systems (Multi-Leg Sagas)
- **Ch 20**: Standalone System: Planetary Notification Engine *(Blueprint 5)*
- **Ch 21**: Standalone System: Distributed Search & Real-Time Autocomplete *(Blueprint 6)*

### Part 4: Data at Rest and in Motion
- **Ch 22**: The Anatomy of Large Data: Chunks, Checksums & CAS
- **Ch 23**: Video & Audio Streaming Architecture
- **Ch 24**: Social Media & Dynamic Feeds: The Celebrity Problem
- **Ch 25**: Gaming & Multiplayer: 60-Tick Loops & Lag Compensation
- **Ch 26**: Standalone System: Resilient File Upload Platform *(Blueprint 7)*

### Part 5: Trust, Isolation & Compliance
- **Ch 27**: The Zero-Trust Perimeter & mTLS
- **Ch 28**: Healthcare & Medical Architecture: HIPAA & FHIR
- **Ch 29**: Enterprise Multi-Tenant SaaS: The Noisy Neighbor
- **Ch 30**: Government & Identity Platforms: 50M Citizens
- **Ch 31**: High-Stakes Examination Systems: Anti-Cheat & Offline Proofs
- **Ch 32**: Standalone System: Enterprise API Gateway & Edge Router *(Blueprint 8)*
- **Ch 33**: Standalone System: Dynamic Feature Flags & Rollout Engine *(Blueprint 9)*

### Part 6: High Velocity & Extreme Constraints
- **Ch 34**: The Physics of Microseconds: Trading & Matching Engines
- **Ch 35**: The Disconnected Sensor: IoT & Constrained Devices
- **Ch 36**: The Non-Deterministic Machine: AI Applications & Autonomous Agents
- **Ch 37**: The Control Plane That Never Sleeps: Cloud Platforms
- **Ch 38**: Standalone System: Real-Time Stream Analytics Engine *(Blueprint 10)*

### Part 7: The Master Architect
- **Ch 39**: The Architecture Decision Matrix: Trade-Offs Under Pressure
- **Ch 40**: Chaos Engineering & The Failure Taxonomy
- **Ch 41**: Full-Spectrum Observability & Production Readiness
- **Ch 42**: Grand Capstone: Planetary Omnichannel Architecture Blueprint

---

## 🎨 Technology Stack
- **Framework**: [VitePress](https://vitepress.dev/) (Vue 3 + Vite)
- **Diagrams**: [Mermaid.js](https://mermaid.js.org/)
- **Search**: Built-in Offline Local Fuzzy Search
- **Deployment**: GitHub Pages via GitHub Actions CI/CD
