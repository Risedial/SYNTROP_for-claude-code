# Technical Blueprint
## First Aid Study PWA
**Project ID:** fap-2026-0417-001
**Date:** 2026-04-17
**Approach:** TypeScript + Zustand + vite-plugin-pwa (Approach B)
**Status:** Architecture Phase

---

## 1. System Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                   USER DEVICE (PWA)                      │
│                                                          │
│  ┌──────────────┐    ┌──────────────────────────────┐    │
│  │ React + Vite │    │   Zustand Store (persisted)  │    │
│  │   Frontend   │◄──►│   localStorage: fap_store    │    │
│  │  TypeScript  │    │   version: 1                 │    │
│  └──────┬───────┘    └──────────────────────────────┘    │
│         │                                                │
│  ┌──────▼───────────────────────────────────────┐        │
│  │         Service Worker (vite-plugin-pwa)     │        │
│  │   Precaches all assets on install            │        │
│  │   Full offline after first load              │        │
│  └──────────────────────────────────────────────┘        │
└────────────────────┬─────────────────────────────────────┘
                     │ HTTPS (online only)
                     │
          ┌──────────▼────────────┐
          │   Vercel Serverless   │
          │   /api/sync           │
          │   Node.js runtime     │
          └──────────┬────────────┘
                     │
          ┌──────────▼────────────┐
          │   Upstash Redis       │
          │   Free tier           │
          │   key: fap:{deviceId} │
          └───────────────────────┘
```

### Component Responsibilities

| Component         | Responsibility                                                      |
|-------------------|---------------------------------------------------------------------|
| React frontend    | Render UI, handle user interactions, display questions              |
| Zustand store     | Single source of truth for all app state; persisted to localStorage |
| 5-state algorithm | Determine question eligibility, advance/demote state on answer      |
| mulberry32 PRNG   | Deterministic session ordering from UUID seed                       |
| vite-plugin-pwa   | Generate service worker, precache manifest, manifest.json           |
| /api/sync         | Serverless bridge between device localStorage and Upstash Redis     |
| Upstash Redis     | Remote backup store; single JSON blob per device UUID               |

### Data Flow

```
App loads
  → Read fap_store from localStorage (Zustand rehydration)
  → If no deviceId: generate via crypto.randomUUID(), store in localStorage + cookie
  → If no localStorage but cookie exists: re-seed localStorage deviceId from cookie
  → Build session queue using 5-state algorithm + mulberry32(sessionId seed)
  → Render first question

User answers question
  → Record answer timestamp vs display timestamp → fast-tap detection
  → Apply state machine transition to QuestionRecord
  → Write to Zustand store → auto-persisted to localStorage
  → Set isDirty = true

Auto-sync (every 60s when isDirty)
  → POST /api/sync { deviceId, data: JSON.stringify(questions) }
  → On success: update lastSyncAt, set isDirty = false

Manual restore (Settings tab)
  → GET /api/sync?deviceId={uuid}
  → Deserialize and merge into Zustand store
```

---

## 2. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | React | 18.x | UI rendering |
| Build tool | Vite | 5.x | Dev server, production bundler |
| Language | TypeScript | 5.x | Type safety, strict mode |
| State management | Zustand | 4.x | App state + localStorage persistence |
| PWA | vite-plugin-pwa | 0.20.x | Service worker, manifest generation |
| Redis client | @upstash/redis | 1.x | Serverless REST-based Redis client |
| PWA icons | Custom SVG/PNG | — | 192px, 512px, apple-touch-icon |
| Fonts | Google Fonts | — | Syne (headings), DM Sans (body) |

**Node devDependencies:** typescript, @types/react, @types/react-dom, vite, @vitejs/plugin-react, vite-plugin-pwa

**No router library.** Tab index stored in Zustand. No React Router, TanStack Router, or similar.

---

## 3. TypeScript Type Definitions

### File: `src/types/algorithm.ts`

```typescript
export type QuestionState =
  | 'new'
  | 'active'
  | 'near_mastery'
  | 'mastered'
  | 'maintenance';

export interface ExposureRecord {
  sessionId: string;
  correct: boolean;
  isFastTap: boolean;
}

export interface QuestionRecord {
  id: string;
  state: QuestionState;

  // Streak tracking (deliberate answers only; fast-tap answers do not count)
  consecutiveCorrect: number;

  // Session IDs in which the question was answered correctly at least once
  // Used for "2+ distinct sessions" requirement for Mastered threshold
  correctSessionIds: string[];

  // Last 5 deliberate exposures (not fast-tap); oldest first
  // Used for reversal check (correct followed by incorrect in last 5)
  recentExposures: ExposureRecord[];

  // Timestamps and scheduling
  masteredAt: string | null;           // ISO-8601 timestamp when state reached 'mastered'
  lastMaintenanceSession: number | null; // session number of most recent maintenance appearance

  // Stats (informational only, not used in algorithm)
  totalAttempts: number;
  totalCorrect: number;
  firstSeenSession: number | null;
}
```

### File: `src/types/session.ts`

```typescript
export interface SessionRecord {
  sessionId: string;         // crypto.randomUUID()
  sessionNumber: number;     // 1-indexed, increments per session
  startedAt: string;         // ISO-8601
  seed: number;              // numeric seed for mulberry32 (derived from sessionId hash)

  // Ordered queue of question IDs for this session
  queue: string[];
  currentIndex: number;

  // Timing for fast-tap detection
  questionDisplayTime: number | null;  // Date.now() when current question was shown

  // Questions fast-tapped in this session awaiting repeat
  fastTapPending: string[];

  // Whether session is complete
  isComplete: boolean;
}
```

### File: `src/types/store.ts`

```typescript
import type { QuestionRecord } from './algorithm';
import type { SessionRecord } from './session';

export interface AppStore {
  // ─── Device Identity ───
  deviceId: string;

  // ─── Navigation ───
  activeTab: 0 | 1 | 2 | 3;   // 0=Study, 1=Skills, 2=Progress, 3=Settings

  // ─── Algorithm State (persisted) ───
  questions: Record<string, QuestionRecord>;
  sessionCount: number;              // total completed sessions, increments on session end

  // ─── Active Session (persisted mid-session, cleared on complete) ───
  currentSession: SessionRecord | null;

  // ─── Sync State (persisted) ───
  lastSyncAt: string | null;
  isDirty: boolean;

  // ─── UI Preferences (persisted) ───
  iosInstallDismissed: boolean;
  skillsExpandedId: string | null;   // currently expanded skill in Skills tab
}

// Zustand persist config (not part of store shape)
// name: 'fap_store'
// version: 1
// migrate: (persistedState, version) => { ...migrations }
```

### File: `src/types/content.ts`

```typescript
export type QuestionType = 'multiple-choice' | 'true-false';

export interface Question {
  id: string;
  topic: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Skill {
  id: string;
  skillName: string;
  category: string;
  objective: string;
  steps: string[];
  commonErrors: string[];
  evaluationCriteria: string[];
}
```

---

## 4. Data Model

### Questions Store (Zustand persisted)

All question tracking lives in `AppStore.questions: Record<string, QuestionRecord>`.

**Initial state:** Every question starts as `{ state: 'new', consecutiveCorrect: 0, ... }` — populated lazily on first app load by mapping over the imported questions array.

**Key fields and their algorithm roles:**

| Field | Type | Purpose |
|-------|------|---------|
| `state` | `QuestionState` | Current position in 5-state machine |
| `consecutiveCorrect` | `number` | Streak counter; reset on any deliberate miss |
| `correctSessionIds` | `string[]` | Tracks distinct sessions with correct answers |
| `recentExposures` | `ExposureRecord[]` (max 5) | Reversal detection for mastery gate |
| `lastMaintenanceSession` | `number \| null` | For "every 10 sessions" scheduling |

### State Machine Rules

```
new → active
  trigger: first answer attempt (any result)
  action: set state='active', update stats

active → near_mastery
  trigger: consecutiveCorrect >= 2 (deliberate answers only)
  action: set state='near_mastery'

near_mastery → mastered
  trigger: consecutiveCorrect >= 3
         AND correctSessionIds.length >= 2
         AND no reversal in recentExposures (last 5)
  note: "reversal" = a correct exposure followed immediately by incorrect
  action: set state='mastered', masteredAt=now(), consecutiveCorrect=0

mastered → maintenance
  trigger: correct answer during a maintenance session
  action: set state='maintenance', update lastMaintenanceSession

mastered/maintenance → active (demotion)
  trigger: deliberate miss (response time >= 2000ms)
  action: set state='active', consecutiveCorrect=0, clear correctSessionIds,
          append to recentExposures

fast-tap handling (response time < 2000ms)
  trigger: any answer under 2000ms
  action: add question to fastTapPending queue; do NOT update consecutiveCorrect
         or advance state; repeat question at end of session
```

### Session Queue Construction

```
1. Identify eligible questions per tier:
   ACTIVE: all questions where state = 'active' OR state = 'new'
   NEAR_MASTERY: all questions where state = 'near_mastery'
   MAINTENANCE_DUE: questions where state in ['mastered', 'maintenance']
                    AND (sessionCount - lastMaintenanceSession) >= 10

2. Randomize within each tier using mulberry32(seed=numericSeed):
   Seed derived from: parseInt(sessionId.replace(/-/g, '').slice(0, 8), 16)

3. Assemble queue:
   [...shuffled ACTIVE, ...interleaved NEAR_MASTERY, ...shuffled MAINTENANCE_DUE]
   Interleave strategy: insert one NEAR_MASTERY question every 5 ACTIVE questions

4. Append fastTapPending at end (accumulated during session)
```

### Analytics Computation

```typescript
// Computed on-demand (not stored), derived from questions Record

topicStats(questions, allQuestions):
  for each topic:
    topicQuestions = allQuestions.filter(q => q.topic === topic)
    count = topicQuestions.length
    masteredCount = topicQuestions.filter(q =>
      questions[q.id]?.state in ['mastered', 'maintenance']
    ).length
    nearMasteryCount = topicQuestions.filter(q =>
      questions[q.id]?.state === 'near_mastery'
    ).length
    // Full mastery = mastered/maintenance; partial = near_mastery
    masteryPercent = (masteredCount + nearMasteryCount * 0.5) / count * 100

estimatedScore:
  sum(topic.masteryPercent * topic.count) / totalQuestions

readyToTest:
  all topics with masteryPercent >= 75
```

---

## 5. API Specification

### Serverless Route: `/api/sync`

**File:** `api/sync.ts` (Vercel serverless function, Node.js runtime)

#### GET `/api/sync`

Fetch backup data from Redis.

**Request:**
```
GET /api/sync?deviceId={uuid}
```

**Response (success):**
```json
{ "data": "{...serialized questions JSON string...}", "syncedAt": "2026-04-17T..." }
```

**Response (not found):**
```json
{ "data": null, "syncedAt": null }
```

**Response (error):**
```json
{ "error": "fetch_failed" }
```
HTTP status: 500

#### POST `/api/sync`

Write backup data to Redis.

**Request body:**
```json
{
  "deviceId": "550e8400-e29b-41d4-a716-446655440000",
  "data": "{...serialized questions JSON string...}"
}
```

**Response (success):**
```json
{ "ok": true, "syncedAt": "2026-04-17T..." }
```

**Response (error):**
```json
{ "error": "write_failed" }
```
HTTP status: 500

**Redis key format:** `fap:{deviceId}`

**Data stored:** `JSON.stringify(AppStore.questions)` — only the questions record, not the full store. DeviceId and session are reconstructed client-side.

**Auth requirements:** None. Device UUID acts as the lookup key. No server-side authentication. This is appropriate for anonymous personal data with no PII.

**Rate limiting:** None required (single user, personal tool).

---

## 6. Component Architecture

### Tab Structure

```
<AppShell>
  ├── <TabContent activeTab={0}> → <StudyTab>
  ├── <TabContent activeTab={1}> → <SkillsTab>
  ├── <TabContent activeTab={2}> → <ProgressTab>
  ├── <TabContent activeTab={3}> → <SettingsTab>
  └── <BottomNav>

Conditional:
  <IOSInstallBanner> (renders when iOS detected and not dismissed)
```

### Component Tree

```
src/
└── components/
    ├── layout/
    │   ├── AppShell.tsx
    │   │   Renders the 4-tab layout. Reads activeTab from Zustand.
    │   │   Mounts all 4 tab components with CSS display:none for inactive tabs
    │   │   (preserves component state across tab switches).
    │   │
    │   └── BottomNav.tsx
    │       Fixed bottom navigation. 4 items: Study | Skills | Progress | Settings.
    │       Active indicator: gradient underline on active item.
    │       Touch target: 44px minimum.
    │
    ├── study/
    │   ├── StudyTab.tsx
    │   │   Orchestrates study session. Reads currentSession from store.
    │   │   If no session: calls buildSession(), updates store.
    │   │   Renders QuestionCard or SessionSummary.
    │   │
    │   ├── QuestionCard.tsx
    │   │   Receives: question (Question), sessionId, onAnswer callback.
    │   │   On mount: records Date.now() as questionDisplayTime in store.
    │   │   Renders question text + AnswerOption list.
    │   │   After answer: shows ExplanationPanel.
    │   │
    │   ├── AnswerOption.tsx
    │   │   Receives: text, index, selectedIndex, correctIndex, onSelect.
    │   │   States: idle / selected-correct / selected-incorrect / revealed-correct.
    │   │   Uses CSS custom properties for state colors from design system.
    │   │
    │   ├── ExplanationPanel.tsx
    │   │   Renders explanation text and answer result feedback.
    │   │   Shows fast-tap warning if response was < 2000ms.
    │   │   "Next" button advances to next question.
    │   │
    │   └── SessionSummary.tsx
    │       Shown when session queue is empty.
    │       Displays: questions answered, correct%, fast-taps flagged.
    │       "Start New Session" button builds next session.
    │
    ├── skills/
    │   ├── SkillsTab.tsx
    │   │   Lists all 12 skills. Uses skillsExpandedId from store.
    │   │
    │   └── SkillCard.tsx
    │       Expandable card. Shows skillName + category collapsed.
    │       Expanded: objective, numbered steps, commonErrors, evaluationCriteria.
    │       Single expanded at a time (accordion pattern).
    │
    ├── progress/
    │   ├── ProgressTab.tsx
    │   │   Computes analytics from Zustand questions state.
    │   │   Renders ScoreDisplay, TopicGrid, WeakTopics, ReadinessIndicator.
    │   │
    │   ├── ScoreDisplay.tsx
    │   │   Shows estimated exam score (large display number, DM Sans 300 weight).
    │   │   "Ready to test" banner when score >= 80% AND all topics >= 75%.
    │   │
    │   ├── TopicGrid.tsx
    │   │   11-cell grid, one per topic.
    │   │   Color: red (#E54343) < 50%, yellow (#F5A623) 50–80%, green (#2DB55D) > 80%.
    │   │   Shows topic short name + mastery%.
    │   │
    │   └── WeakTopics.tsx
    │       Shows top 3 topics with lowest masteryPercent, by name.
    │
    ├── settings/
    │   ├── SettingsTab.tsx
    │   │   Container for sync controls and app info.
    │   │
    │   └── SyncControls.tsx
    │       Manual Save button: triggers POST /api/sync, shows loading + result.
    │       Restore button: shows confirmation modal → GET /api/sync → merge.
    │       Last sync timestamp display.
    │       Content version display (from questions.js version field if present).
    │
    └── shared/
        └── IOSInstallBanner.tsx
            Detects iOS Safari: navigator.standalone === false
              AND /iPad|iPhone|iPod/.test(navigator.userAgent)
              AND !store.iosInstallDismissed
            Shows dismissible banner: "Install this app: tap Share → Add to Home Screen"
            On dismiss: set iosInstallDismissed = true in store (persisted).
```

### State Management Pattern

All state reads use Zustand selectors to prevent unnecessary re-renders:

```typescript
// ✅ Correct: subscribe only to what you need
const activeTab = useStore(s => s.activeTab);
const setActiveTab = useStore(s => s.setActiveTab);

// ❌ Wrong: subscribes to entire store
const store = useStore();
```

---

## 7. Utility Specifications

### File: `src/lib/prng.ts` — mulberry32 PRNG

```typescript
// mulberry32 — seeded PRNG for deterministic session ordering
// Returns a function that produces floats in [0, 1) for the given seed

export function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Derive numeric seed from UUID string
export function seedFromSessionId(sessionId: string): number {
  return parseInt(sessionId.replace(/-/g, '').slice(0, 8), 16);
}

// Fisher-Yates shuffle using seeded PRNG
export function seededShuffle<T>(array: T[], prng: () => number): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

### File: `src/lib/deviceId.ts` — Device Identity

```typescript
// Device ID resolution order:
// 1. localStorage.getItem('fap_device_id')
// 2. Cookie 'fap_did'
// 3. Generate new via crypto.randomUUID()

export function resolveDeviceId(): string {
  const lsKey = 'fap_device_id';
  const cookieName = 'fap_did';

  // Try localStorage first
  const fromLS = localStorage.getItem(lsKey);
  if (fromLS) return fromLS;

  // Try cookie
  const fromCookie = getCookie(cookieName);
  if (fromCookie) {
    localStorage.setItem(lsKey, fromCookie);
    return fromCookie;
  }

  // Generate new
  const newId = crypto.randomUUID();
  localStorage.setItem(lsKey, newId);
  setCookie(cookieName, newId, 7 * 365); // 7-year expiry
  return newId;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number): void {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};max-age=${maxAge};SameSite=Strict`;
}
```

### File: `src/lib/algorithm.ts` — State Machine

```typescript
import type { QuestionRecord, ExposureRecord } from '../types/algorithm';

const FAST_TAP_MS = 2000;
const NEAR_MASTERY_THRESHOLD = 2;       // consecutive correct for near_mastery
const MASTERY_STREAK_THRESHOLD = 3;     // consecutive correct for mastered
const MASTERY_SESSION_THRESHOLD = 2;    // distinct correct sessions for mastered
const REVERSAL_WINDOW = 5;              // exposures to check for reversals
const MAINTENANCE_INTERVAL = 10;        // sessions between maintenance reviews

export function isFastTap(displayTime: number, answerTime: number): boolean {
  return (answerTime - displayTime) < FAST_TAP_MS;
}

export function hasReversalInWindow(exposures: ExposureRecord[]): boolean {
  // A reversal is a correct answer followed by an incorrect answer
  const window = exposures.slice(-REVERSAL_WINDOW);
  for (let i = 0; i < window.length - 1; i++) {
    if (window[i].correct && !window[i + 1].correct) return true;
  }
  return false;
}

export function applyAnswer(
  record: QuestionRecord,
  correct: boolean,
  sessionId: string,
  isFastTap: boolean
): QuestionRecord {
  const next = { ...record };

  if (isFastTap) {
    // Fast-tap: no state change, no streak update
    return next;
  }

  // Build exposure record
  const exposure: ExposureRecord = { sessionId, correct, isFastTap: false };
  const recentExposures = [...record.recentExposures, exposure].slice(-REVERSAL_WINDOW);

  next.totalAttempts += 1;
  if (correct) next.totalCorrect += 1;
  next.recentExposures = recentExposures;

  if (!correct) {
    // Deliberate miss: demotion
    if (record.state === 'new') {
      next.state = 'active';
    } else {
      // active, near_mastery, mastered, maintenance → active
      next.state = 'active';
    }
    next.consecutiveCorrect = 0;
    return next;
  }

  // Correct deliberate answer
  next.consecutiveCorrect = record.consecutiveCorrect + 1;

  // Track correct sessions
  if (!next.correctSessionIds.includes(sessionId)) {
    next.correctSessionIds = [...record.correctSessionIds, sessionId];
  }

  // State transitions
  switch (record.state) {
    case 'new':
      // new → active on first attempt (handled separately in first-exposure logic)
      next.state = 'active';
      break;

    case 'active':
      if (next.consecutiveCorrect >= NEAR_MASTERY_THRESHOLD) {
        next.state = 'near_mastery';
      }
      break;

    case 'near_mastery':
      if (
        next.consecutiveCorrect >= MASTERY_STREAK_THRESHOLD &&
        next.correctSessionIds.length >= MASTERY_SESSION_THRESHOLD &&
        !hasReversalInWindow(recentExposures)
      ) {
        next.state = 'mastered';
        next.masteredAt = new Date().toISOString();
        next.consecutiveCorrect = 0;
      }
      break;

    case 'mastered':
    case 'maintenance':
      // Correct maintenance answer → enter/stay in maintenance state
      next.state = 'maintenance';
      next.lastMaintenanceSession = record.lastMaintenanceSession; // updated by session tracker
      break;
  }

  return next;
}

export function isMaintenanceDue(
  record: QuestionRecord,
  currentSessionNumber: number
): boolean {
  if (record.state !== 'mastered' && record.state !== 'maintenance') return false;
  if (record.lastMaintenanceSession === null) return true;
  return (currentSessionNumber - record.lastMaintenanceSession) >= MAINTENANCE_INTERVAL;
}
```

---

## 8. Zustand Store Definition

### File: `src/store/useStore.ts`

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AppStore } from '../types/store';

// Store shape + actions
interface StoreWithActions extends AppStore {
  // Navigation
  setActiveTab: (tab: 0 | 1 | 2 | 3) => void;

  // Session
  setCurrentSession: (session: AppStore['currentSession']) => void;
  incrementSessionCount: () => void;

  // Questions
  updateQuestion: (id: string, record: QuestionRecord) => void;
  initializeQuestions: (questionIds: string[]) => void;

  // Sync
  markDirty: () => void;
  markClean: (syncedAt: string) => void;

  // UI
  dismissIOSBanner: () => void;
  setSkillsExpanded: (id: string | null) => void;
}

export const useStore = create<StoreWithActions>()(
  persist(
    (set) => ({
      // Initial state
      deviceId: '',           // set on app init by resolveDeviceId()
      activeTab: 0,
      questions: {},
      sessionCount: 0,
      currentSession: null,
      lastSyncAt: null,
      isDirty: false,
      iosInstallDismissed: false,
      skillsExpandedId: null,

      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),
      setCurrentSession: (session) => set({ currentSession: session }),
      incrementSessionCount: () => set((s) => ({ sessionCount: s.sessionCount + 1 })),
      updateQuestion: (id, record) =>
        set((s) => ({ questions: { ...s.questions, [id]: record }, isDirty: true })),
      initializeQuestions: (questionIds) =>
        set((s) => {
          const questions = { ...s.questions };
          for (const id of questionIds) {
            if (!questions[id]) {
              questions[id] = {
                id, state: 'new', consecutiveCorrect: 0,
                correctSessionIds: [], recentExposures: [],
                masteredAt: null, lastMaintenanceSession: null,
                totalAttempts: 0, totalCorrect: 0, firstSeenSession: null,
              };
            }
          }
          return { questions };
        }),
      markDirty: () => set({ isDirty: true }),
      markClean: (syncedAt) => set({ isDirty: false, lastSyncAt: syncedAt }),
      dismissIOSBanner: () => set({ iosInstallDismissed: true }),
      setSkillsExpanded: (id) => set({ skillsExpandedId: id }),
    }),
    {
      name: 'fap_store',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: unknown, version: number) => {
        // Template: increment version and add migration on any schema change
        // v0 → v1: initial schema (no migration needed)
        return persistedState as AppStore;
      },
    }
  )
);
```

---

## 9. vite.config.ts Specification

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'First Aid Study',
        short_name: 'First Aid',
        description: 'Alberta Standard First Aid Level C CPR & AED — study tool',
        display: 'standalone',
        start_url: '/',
        background_color: '#0D0D0D',
        theme_color: '#0D0D0D',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      // iOS-specific meta tags injected into index.html via plugin
      devOptions: { enabled: true },
    }),
  ],
});
```

**iOS meta tags in `index.html` (required, not auto-generated):**
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="First Aid Study">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

---

## 10. Integration Specifications

### Upstash Redis via /api/sync

| Attribute | Value |
|-----------|-------|
| Client library | @upstash/redis |
| Authentication | UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Vercel env vars) |
| Key format | `fap:{deviceId}` (e.g., `fap:550e8400-e29b-41d4-a716-446655440000`) |
| Value format | JSON string of `Record<string, QuestionRecord>` |
| TTL | None (permanent until manually deleted) |
| Commands used | SET (POST sync), GET (restore) |

**Provisioning sequence (execution phase — first infrastructure task):**
1. Test Upstash MCP connectivity
2. If accessible: `create_database("fap-backup", region="us-east-1")`
3. Extract UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from response
4. `vercel env add UPSTASH_REDIS_REST_URL {value} production`
5. `vercel env add UPSTASH_REDIS_REST_TOKEN {value} production`
6. If MCP fails: fall back to Vercel KV (same env var pattern, different names)

### Vercel Deployment

| Attribute | Value |
|-----------|-------|
| Project type | Vite (React) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Functions directory | `api/` |
| Node.js runtime | 18.x |
| Deployment command | `vercel deploy --prod` |

---

## 11. Security Architecture

| Concern | Approach |
|---------|----------|
| PII collection | None. Only anonymous UUID stored. |
| Device UUID | crypto.randomUUID() — not guessable, not linked to identity |
| Cookie | SameSite=Strict — prevents cross-site access; no HttpOnly needed (UUID not a secret) |
| Redis key | Device UUID — no auth beyond knowing the UUID; acceptable for personal tool |
| API route | No authentication required; no sensitive data |
| Input validation | /api/sync validates: deviceId is UUID format, data is valid JSON string |
| XSS | React escapes all rendered content; no dangerouslySetInnerHTML |
| Dependencies | No third-party analytics, tracking, or CDN scripts in production build |

---

## 12. Configuration & Environment

### Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `UPSTASH_REDIS_REST_URL` | Vercel (production) | Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Vercel (production) | Redis authentication token |

**No `.env` file committed to repo.** Variables injected via Vercel CLI only.

### tsconfig.json Requirements

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "isolatedModules": true,
    "noEmit": true
  }
}
```

**`strict: true` must be set before any TypeScript file is written.** This enables: strictNullChecks, noImplicitAny, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization.

---

## 13. File/Directory Structure

```
cpr-first-aid/
├── api/
│   └── sync.ts                    # Vercel serverless function
├── public/
│   ├── icons/
│   │   ├── icon-192.png           # PWA icon 192px
│   │   └── icon-512.png           # PWA icon 512px
│   └── apple-touch-icon.png       # iOS home screen icon (180px)
├── src/
│   ├── main.tsx                   # React root, store initialization
│   ├── App.tsx                    # AppShell render, IOSInstallBanner
│   ├── types/
│   │   ├── algorithm.ts           # QuestionState, QuestionRecord, ExposureRecord
│   │   ├── session.ts             # SessionRecord
│   │   ├── store.ts               # AppStore
│   │   └── content.ts             # Question, Skill
│   ├── lib/
│   │   ├── prng.ts                # mulberry32 + seededShuffle + seedFromSessionId
│   │   ├── deviceId.ts            # resolveDeviceId()
│   │   ├── algorithm.ts           # applyAnswer(), isMaintenanceDue(), hasReversalInWindow()
│   │   ├── sessionBuilder.ts      # buildSessionQueue()
│   │   └── analytics.ts           # computeTopicStats(), computeEstimatedScore()
│   ├── store/
│   │   └── useStore.ts            # Zustand store definition
│   ├── data/
│   │   ├── questions.ts           # Re-export from zzz/questions.js (typed)
│   │   └── skills.ts              # Re-export from zzz/skills.js (typed)
│   ├── hooks/
│   │   ├── useSession.ts          # Session lifecycle (start, next question, end)
│   │   └── useSync.ts             # Auto-sync timer, manual save, restore
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   └── BottomNav.tsx
│   │   ├── study/
│   │   │   ├── StudyTab.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── AnswerOption.tsx
│   │   │   ├── ExplanationPanel.tsx
│   │   │   └── SessionSummary.tsx
│   │   ├── skills/
│   │   │   ├── SkillsTab.tsx
│   │   │   └── SkillCard.tsx
│   │   ├── progress/
│   │   │   ├── ProgressTab.tsx
│   │   │   ├── ScoreDisplay.tsx
│   │   │   ├── TopicGrid.tsx
│   │   │   └── WeakTopics.tsx
│   │   ├── settings/
│   │   │   ├── SettingsTab.tsx
│   │   │   └── SyncControls.tsx
│   │   └── shared/
│   │       └── IOSInstallBanner.tsx
│   └── styles/
│       └── globals.css            # CSS custom properties (design system tokens)
├── zzz/
│   ├── questions.js               # Source content (DO NOT MODIFY — user verified)
│   ├── skills.js                  # Source content (DO NOT MODIFY — user verified)
│   └── design-system/             # Design token system (read-only reference)
├── index.html                     # Entry HTML with iOS meta tags
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── package.json
```

---

## 14. Error Handling Strategy

### Error Categories

| Category | Examples | Handling |
|----------|---------|---------|
| Sync failure (network) | Redis unavailable, timeout | Show non-blocking toast; isDirty remains true; retry on next interval |
| Sync failure (auth) | Invalid token | Show error in Settings tab; prompt user to check Upstash credentials |
| Restore failure | Redis key not found | Show "No backup found" in Settings; no store mutation |
| localStorage quota | Storage full (extremely unlikely) | Catch StorageError in Zustand persist; log to console |
| Invalid UUID | Cookie corrupted | Fall back to crypto.randomUUID() generation |

### Error Display Pattern

- **Non-blocking errors** (sync failures): Toast or status indicator in Settings tab
- **Blocking errors** (app cannot initialize): Full-screen error state with "Retry" button
- **No error boundaries needed** for most components — state is isolated in Zustand

### Logging Strategy

- Development: `console.error` for all caught errors
- Production: no external logging service (no third-party dependencies per vision anchor 1)

---

## 15. Content Reference

### Topics (11) with Question Counts

| Topic String (in questions.js) | Count |
|-------------------------------|-------|
| CPR Level C | 25 |
| Medical Emergencies | 16 |
| AED | 14 |
| Shock | 13 |
| Scene Safety and Assessment | 13 |
| Wound Care and Bleeding | 12 |
| Environmental Emergencies | 11 |
| Burns | 11 |
| Bone, Joint, and Muscle Injuries | 11 |
| Airway Management | 11 |
| Poisoning and Overdose | 9 |
| **Total** | **146** |

### Skills (12 in skills.js)

All 12 practical assessment skills are stored in `zzz/skills.js` and will be copied to `src/data/skills.ts`. Content is user-verified and must not be modified during build.

---

## 16. Vision Alignment Verification

| Vision Anchor | Architecture Support |
|---------------|---------------------|
| Permanent replacement, zero ongoing cost | Vercel Hobby + Upstash free tier; no per-request AI costs |
| Performance-based mastery | 5-state machine with streak/reversal logic; no calendar fields in QuestionRecord |
| Single user, no accounts | No auth layer, no user table, no email/name fields |
| Offline first | vite-plugin-pwa precaches all assets on install; /api/sync is offline-graceful |
| Zero manual setup | Upstash MCP + Vercel CLI; no dashboard URLs in any instructions |
| User-verified content | zzz/ files marked DO NOT MODIFY; CON-005 enforcement via code review gate |
| React + Vite locked | All components are React functional components; build system is Vite |
| Atomic build tasks | Every file/function is a discrete, pre-specified task with exact TypeScript signatures |

---

*Blueprint generated by: blueprint-architect worker*
*Architecture phase: Step 1 of 5*
*Next step: dependency-mapping*
