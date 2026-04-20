# First Aid Study PWA

A mobile-first Progressive Web App for mastery-based study toward the Alberta Standard First Aid Level C CPR & AED certification (St. John Ambulance Alberta). Permanently replaces an AI-token-consuming Claude Code slash command with a self-contained, offline-capable study system.

**Live app:** https://cpr-first-aid.vercel.app

---

## Features

- **Adaptive Drill Mode** — Algorithm-controlled question presentation using a 5-state mastery machine (New → Active → Near-Mastery → Mastered → Maintenance). No topic selection; the algorithm decides what you study.
- **Fast-Tap Detection** — Answers submitted in under 2 seconds are flagged as low-confidence and do not count toward mastery streaks.
- **Practical Skills Guide** — Step-by-step walkthroughs of all 12 practical assessment skills with self-assessment checklists.
- **Progress Analytics** — Weighted estimated exam score, per-topic color grid (red/yellow/green), top-3 weakest topics, and "Ready to test" readiness banner.
- **Offline First** — Full offline use after first load via service worker cache-on-install.
- **Cloud Backup** — Auto-sync to Upstash Redis every 60 seconds; one-tap restore in Settings.
- **PWA Installable** — Installs to home screen on iOS Safari and Android Chrome.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5.4.x |
| Language | TypeScript (strict mode) |
| State | Zustand 4.x + persist middleware (localStorage) |
| PWA | vite-plugin-pwa (Workbox) |
| Backend | Vercel serverless (`/api/sync`) |
| Database | Upstash Redis (REST API via @upstash/redis) |
| Deployment | Vercel Hobby (free tier) |

## Quick Start

### Prerequisites

- Node.js 18+
- Vercel CLI (`npm i -g vercel`)
- An Upstash Redis database ([console.upstash.com](https://console.upstash.com) — free tier)

### Installation

```bash
git clone <repo-url>
cd cpr-first-aid
npm install
```

### Configuration

Create a `.env.local` file for local development:

```env
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

For production, inject via Vercel CLI:

```bash
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production
```

### Running Locally

```bash
npm run dev
```

Open http://localhost:5173

### Building

```bash
npm run build
```

Output in `dist/`. Bundle size: ~372K.

### Type Check

```bash
npm run typecheck
```

## Project Structure

```
src/
├── types/          # TypeScript interfaces (algorithm, session, store, content)
├── data/           # questions.ts (146 Qs), skills.ts (12 skills)
├── store/          # useStore.ts — Zustand store + persist middleware
├── lib/            # algorithm.ts, sessionBuilder.ts, analytics.ts, deviceId.ts, prng.ts
├── hooks/          # useSession.ts, useSync.ts
├── components/
│   ├── study/      # StudyTab, QuestionCard, AnswerOption, ExplanationPanel, SessionSummary
│   ├── skills/     # SkillsTab, SkillCard
│   ├── progress/   # ProgressTab, ScoreDisplay, TopicGrid, WeakTopics
│   ├── settings/   # SettingsTab, SyncControls
│   ├── shared/     # IOSInstallBanner
│   └── layout/     # AppShell, BottomNav
├── styles/         # globals.css (design tokens)
├── App.tsx
└── main.tsx
api/
└── sync.ts         # Vercel serverless — GET/POST Redis sync
```

## Deployment

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md).

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
