# Architecture Overview
## First Aid Study PWA

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
│                                                         │
│  React + Vite PWA                                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │ AppShell (4-tab layout)                          │   │
│  │  ├── StudyTab → QuestionCard, AnswerOption       │   │
│  │  ├── SkillsTab → SkillCard (12 skills)           │   │
│  │  ├── ProgressTab → ScoreDisplay, TopicGrid       │   │
│  │  └── SettingsTab → SyncControls                 │   │
│  │                                                  │   │
│  │ Zustand Store (localStorage persist)             │   │
│  │  ├── questions: Record<id, QuestionRecord>       │   │
│  │  ├── activeTab: 0-3                              │   │
│  │  ├── deviceId: UUID                              │   │
│  │  └── isDirty: boolean                            │   │
│  │                                                  │   │
│  │ Core Library                                     │   │
│  │  ├── algorithm.ts  — 5-state mastery machine     │   │
│  │  ├── sessionBuilder.ts — queue construction      │   │
│  │  ├── analytics.ts  — score + readiness           │   │
│  │  ├── deviceId.ts   — UUID resolution             │   │
│  │  └── prng.ts       — mulberry32 seeded RNG       │   │
│  └──────────────────────────────────────────────────┘   │
│                          │                              │
│               Service Worker (Workbox)                  │
│               Precaches: HTML, CSS, JS, icons           │
└──────────────────────────┬──────────────────────────────┘
                           │ /api/sync (60s auto + manual)
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Vercel Serverless (api/sync.ts)             │
│  GET  ?deviceId=UUID → Redis GET fap:{uuid}              │
│  POST {deviceId, data} → Redis SET fap:{uuid}            │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
              Upstash Redis (REST API, free tier)
              Keys: fap:{uuid}, fap:{uuid}:syncedAt
```

---

## Components

### Data Layer

| Module | Responsibility |
|--------|---------------|
| `src/data/questions.ts` | 146 questions across 11 topics — compiled at build time |
| `src/data/skills.ts` | 12 practical skill objects — compiled at build time |
| `src/store/useStore.ts` | Zustand store with persist middleware (key: `fap_store`) |

### Algorithm Layer

| Module | Responsibility |
|--------|---------------|
| `src/lib/algorithm.ts` | 5-state machine transitions (applyAnswer, isMaintenanceDue, isFastTap, hasReversalInWindow) |
| `src/lib/sessionBuilder.ts` | Builds session question queue (tier ordering, seeded randomization) |
| `src/lib/analytics.ts` | computeTopicStats, computeEstimatedScore, isReadyToTest |
| `src/lib/prng.ts` | mulberry32 LCG — deterministic randomization seeded by session ID |
| `src/lib/deviceId.ts` | UUID resolution: localStorage → cookie → generate new |

### Hooks

| Hook | Responsibility |
|------|---------------|
| `src/hooks/useSession.ts` | Session lifecycle: start, answer, fast-tap detection, re-queue |
| `src/hooks/useSync.ts` | 60s auto-sync interval + manualSave + restoreBackup |

### UI Components

| Component | Tab | Responsibility |
|-----------|-----|---------------|
| AppShell | — | Layout shell; CSS display:none tab switching |
| BottomNav | — | 4-tab bottom navigation bar |
| StudyTab | Study | Session controller; renders QuestionCard |
| QuestionCard | Study | Question text + answer options |
| AnswerOption | Study | Single answer button; records answer time |
| ExplanationPanel | Study | Post-answer explanation display |
| SessionSummary | Study | End-of-session stats |
| SkillsTab | Skills | Skill list with SkillCard accordion |
| SkillCard | Skills | Individual skill: steps, errors, checklist |
| ProgressTab | Progress | Analytics dashboard |
| ScoreDisplay | Progress | Estimated score + ReadyBanner |
| TopicGrid | Progress | 11-topic color grid |
| WeakTopics | Progress | Top 3 weakest topics |
| SettingsTab | Settings | Cloud backup + About |
| SyncControls | Settings | Save/Restore buttons with status |
| IOSInstallBanner | Shared | iOS "Add to Home Screen" prompt |

### API

| Route | Method | Responsibility |
|-------|--------|---------------|
| `/api/sync` | GET | Fetch progress backup from Redis by device UUID |
| `/api/sync` | POST | Write progress backup to Redis under device UUID |

---

## Data Flow

### Study Session Flow
```
App mount
  → main.tsx: initialize QuestionRecord for all 146 questions (state: 'new')
  → StudyTab useEffect: startSession()
  → sessionBuilder: build queue (Active first, Near-Mastery interleaved, Mastered/Maintenance at end)
  → mulberry32(sessionId): deterministic shuffle within each tier
  → User answers question
  → useSession: record displayTime + answerTime
  → isFastTap(<2s)? → no state change, re-queue question
  → applyAnswer(): compute next QuestionRecord state
  → useStore.updateQuestion(): persist to localStorage
  → isDirty = true
```

### Sync Flow
```
useSync 60s interval fires (isDirty = true)
  → POST /api/sync { deviceId, data: JSON.stringify(questions) }
  → api/sync.ts: validate UUID regex, validate JSON
  → Redis SET fap:{deviceId} = data
  → Redis SET fap:{deviceId}:syncedAt = ISO timestamp
  → markClean(syncedAt)
```

### Restore Flow
```
User taps "Restore from Backup" in Settings
  → GET /api/sync?deviceId={uuid}
  → Redis GET fap:{deviceId} → data string
  → JSON.parse(data) → restoredQuestions
  → merge: { ...localQuestions, ...restoredQuestions }
  → updateQuestion() for each restored record
  → markClean()
```

---

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | React + Vite | Locked by user requirement |
| Language | TypeScript strict | Type safety for algorithm state machine |
| State management | Zustand + persist | Minimal boilerplate; persist middleware handles localStorage sync |
| PWA tooling | vite-plugin-pwa (Workbox) | Best-in-class cache-on-install; Vite-native |
| Tab routing | Zustand store field | Eliminates router library; CSS display:none preserves scroll state |
| PRNG | mulberry32 LCG | Deterministic (reproducible sessions given same seed); zero dependencies |
| Redis client | @upstash/redis | REST-based (no TCP); works in Vercel Edge/Node environments |
| UUID generation | crypto.randomUUID() | Built-in; cryptographically strong; no dependency |
| Deployment | Vercel Hobby | Zero cost; automatic HTTPS; serverless functions built-in |
| Database | Upstash Redis | Zero cost (free tier); REST-based; no connection pool management |
