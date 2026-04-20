# Implementation Plan
## First Aid Study PWA

### Overview
- **Total Sprints:** 8
- **Total Tasks:** 35
- **Estimated Chat Sessions:** 10–12 (some sprints complete in 1 session, Sprint 5-7 may need 2)
- **Validation Checkpoints:** 8 (one per sprint)
- **Content Gate:** Sprint 2, Task 3 — hard pause for user clinical review before UI build

---

### Sprint 1: Foundation
**Focus:** Project scaffolding, TypeScript types, design system, PWA configuration
**Tasks:** 4

#### S1-T1: Vite + React + TypeScript project scaffolding
- **Type:** setup
- **Description:** Run `npm create vite@latest . -- --template react-ts` in the workspace root. Update `tsconfig.json` to set `"strict": true` (verify it is not just `"noImplicitAny": true` — it must be the `strict` umbrella flag). Install all runtime dependencies: `react`, `react-dom`, `zustand`, `@upstash/redis`, `vite-plugin-pwa`. Install devDependencies: `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`. Verify `npm run build` completes with zero errors and zero TypeScript warnings. Remove all Vite template boilerplate from `src/` (delete App.css, assets/, template content from App.tsx and main.tsx — keep files but clear contents).
- **Blueprint Reference:** Section 2 (Technology Stack), Section 12 (tsconfig requirements)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 2 and 12
- **Output:** `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts` (initial), `index.html` (initial), `src/main.tsx` (cleared), `src/App.tsx` (cleared)
- **Dependencies:** None
- **Validation:** `npm run build` exits 0. `npm run typecheck` (or `tsc --noEmit`) exits 0. `node_modules/` exists. `tsconfig.json` contains `"strict": true`.

#### S1-T2: TypeScript type definitions (src/types/)
- **Type:** config
- **Description:** Create 4 TypeScript files in `src/types/`. Each file must contain exactly the interfaces and types defined in Blueprint Section 3. No implementation code — only type/interface declarations.
  - `src/types/algorithm.ts`: Export `QuestionState` (discriminated union), `ExposureRecord`, `QuestionRecord` (with all fields from blueprint).
  - `src/types/session.ts`: Export `SessionRecord` (with all fields from blueprint).
  - `src/types/store.ts`: Export `AppStore` (with all fields from blueprint).
  - `src/types/content.ts`: Export `QuestionType`, `Question`, `Skill`.
  Verify TypeScript compiles with `tsc --noEmit` after each file.
- **Blueprint Reference:** Section 3 (TypeScript Type Definitions) — copy interfaces verbatim
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 3
- **Output:** `src/types/algorithm.ts`, `src/types/session.ts`, `src/types/store.ts`, `src/types/content.ts`
- **Dependencies:** S1-T1
- **Validation:** `tsc --noEmit` exits 0. All 4 files exist. `QuestionState` has exactly 5 values. `QuestionRecord` has all 10 fields.

#### S1-T3: Design system CSS (src/styles/globals.css)
- **Type:** frontend
- **Description:** IMPORTANT: Run the `frontend-design` skill before writing any code. Then create `src/styles/globals.css` implementing all design tokens from `zzz/design-system/style-template.md` as CSS custom properties. Include: all color tokens (backgrounds, accents, gradients, state colors, text, borders), typography system (Syne + DM Sans Google Fonts @import, type scale as CSS variables), spacing scale, border-radius tokens, shadow definitions. Also add global resets: `* { box-sizing: border-box; margin: 0; padding: 0; }`, body background color, base font-family. Import this file in `src/main.tsx`.
- **Blueprint Reference:** Section 9 (File/Directory Structure), zzz/design-system/style-template.md
- **Input:** `zzz/design-system/style-template.md`, `zzz/design-system/CLAUDE.md`
- **Output:** `src/styles/globals.css`
- **Dependencies:** S1-T1
- **Validation:** CSS file exists. All `--color-*` variables from style-template.md are present. Google Fonts imports for Syne and DM Sans are present. `vite dev` serves the app without CSS errors.

#### S1-T4: PWA assets + vite.config.ts + index.html iOS meta tags
- **Type:** config
- **Description:** 
  1. Create `public/icons/` directory. Add placeholder PNG icons: `icon-192.png` (192×192, dark background with first-aid cross), `icon-512.png` (512×512, same). Add `public/apple-touch-icon.png` (180×180). These can be programmatically generated with canvas or any simple approach — they are required for PWA validation.
  2. Update `vite.config.ts` with the full VitePWA configuration from Blueprint Section 9: import VitePWA, configure manifest (name, short_name, display:'standalone', start_url:'/', theme_color:'#0D0D0D', background_color:'#0D0D0D', icons array with 192, 512, and maskable variants), includeAssets list, registerType:'autoUpdate'.
  3. Update `index.html`: Add 4 iOS-specific meta tags exactly as specified in Blueprint Section 9 (apple-mobile-web-app-capable, status-bar-style, title, apple-touch-icon link). Set `<meta name="theme-color" content="#0D0D0D">`.
- **Blueprint Reference:** Section 9 (vite.config.ts), Section 9 (index.html iOS meta tags), Section 13 (file structure)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Sections 9 and 13
- **Output:** `vite.config.ts` (updated), `index.html` (updated), `public/icons/icon-192.png`, `public/icons/icon-512.png`, `public/apple-touch-icon.png`
- **Dependencies:** S1-T1, S1-T2
- **Validation:** `npm run build` succeeds. `dist/manifest.webmanifest` exists and contains name, icons array. `dist/sw.js` or similar service worker file exists. iOS meta tags present in `index.html`.

#### Sprint 1 Validation Checkpoint
- [ ] `npm run build` completes with zero errors
- [ ] `tsc --noEmit` exits 0 (zero TypeScript errors)
- [ ] `src/types/` contains all 4 type files
- [ ] `src/styles/globals.css` contains all CSS custom properties from design system
- [ ] `vite.config.ts` has VitePWA configured with full manifest
- [ ] `index.html` has 4 iOS meta tags
- [ ] `public/icons/` contains icon-192.png, icon-512.png, apple-touch-icon.png
- [ ] `dist/manifest.webmanifest` and `dist/sw.js` exist after build

---

### Sprint 2: Infrastructure & Data
**Focus:** Upstash Redis provisioning, typed content files, content gate, /api/sync, Zustand store
**Tasks:** 5
**Note:** S2-T3 is a hard gate — execution PAUSES until user confirms clinical accuracy.

#### S2-T1: Infrastructure provisioning (Upstash Redis + Vercel project + env vars)
- **Type:** integration
- **Description:** THIS IS THE FIRST INFRASTRUCTURE TASK. Execute in order:
  1. Test Upstash MCP server connectivity. If accessible, create Redis database named "fap-backup" in region "us-east-1". Extract `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from the response.
  2. If Upstash MCP fails: fall back to Vercel KV. Run `vercel kv create fap-backup`. Extract KV_REST_API_URL and KV_REST_API_TOKEN. Note: if this fallback is used, update /api/sync to use KV_* env var names instead of UPSTASH_* names.
  3. Create Vercel project: `vercel link` or `vercel --yes` in project root. Set project name to "fap-study".
  4. Set environment variables: `vercel env add UPSTASH_REDIS_REST_URL {value} production` and `vercel env add UPSTASH_REDIS_REST_TOKEN {value} production`.
  5. Verify with a test command: `curl -X GET "{UPSTASH_REDIS_REST_URL}/get/test" -H "Authorization: Bearer {UPSTASH_REDIS_REST_TOKEN}"` — expect `{result: null}` (key not found, but connection works).
- **Blueprint Reference:** Section 10 (Integration Specifications — Upstash Redis), Section 10 (Vercel Deployment)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 10, `SYNTROP/artifacts/research/technical-validation.json` (risk RISK-002 mitigation)
- **Output:** Vercel project created (`.vercel/` directory), env vars set on Vercel. Record outcome in a note file: `SYNTROP/artifacts/architecture/infra-notes.md`
- **Dependencies:** None (parallel with Sprint 1, but Sprint 1 must complete for deployment)
- **Validation:** `curl` command returns valid JSON (not a connection error). `.vercel/` directory exists. Vercel dashboard (if accessible) or CLI confirms project exists.

#### S2-T2: Content data files (src/data/questions.ts + skills.ts)
- **Type:** backend
- **Description:** Create typed TypeScript wrappers for the pre-existing content files.
  1. Create `src/data/questions.ts`: Import Question type from `../types/content`. Copy the questions array from `zzz/questions.js` and re-export as `export const questions: Question[]`. Add a `QUESTION_COUNT = 146` constant and a `TOPICS` const array listing all 11 topic strings. Add a `QUESTION_IDS: string[]` export (all 146 IDs).
  2. Create `src/data/skills.ts`: Import Skill type from `../types/content`. Copy the skills array from `zzz/skills.js` and re-export as `export const skills: Skill[]`.
  DO NOT MODIFY ANY CONTENT — only add TypeScript typing wrappers. If TypeScript complains about content structure, adjust the type definitions (not the content).
- **Blueprint Reference:** Section 3 (content.ts types), Section 13 (file structure), Section 15 (content reference — 146 questions, 11 topics, 12 skills)
- **Input:** `zzz/questions.js`, `zzz/skills.js`, `src/types/content.ts`
- **Output:** `src/data/questions.ts`, `src/data/skills.ts`
- **Dependencies:** S1-T2
- **Validation:** `tsc --noEmit` exits 0. `questions.length === 146`. `skills.length === 12`. TOPICS array has 11 entries matching the topic strings in questions.js.

#### S2-T3: CONTENT GATE — Clinical accuracy review
- **Type:** docs
- **Description:** HARD GATE — PAUSE EXECUTION. Display the following message to the user and wait for approval before proceeding:

  "**CONTENT VERIFICATION REQUIRED (CON-005)**
  
  Before any UI is built that displays study content, you must verify the clinical accuracy of:
  - `src/data/questions.ts` (146 questions — Alberta Standard First Aid Level C CPR & AED)
  - `src/data/skills.ts` (12 practical assessment skills)
  
  Please review both files against current St. John Ambulance Alberta guidelines and confirm all content is clinically accurate.
  
  Reply: **CONTENT APPROVED** to continue, or describe any corrections needed."

  DO NOT PROCEED to S2-T4 or S2-T5 until user sends "CONTENT APPROVED".
- **Blueprint Reference:** SSOT Section 6 (CON-005)
- **Input:** `src/data/questions.ts`, `src/data/skills.ts`
- **Output:** No files. Gate only.
- **Dependencies:** S2-T2
- **Validation:** User has explicitly confirmed content accuracy in this chat session.

#### S2-T4: /api/sync serverless function (api/sync.ts)
- **Type:** backend
- **Description:** Create `api/sync.ts` as a Vercel serverless function. The file must export a default handler function. Implement:
  - GET: Extract `deviceId` from query params. Validate UUID format (regex: `/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i`). Initialize `@upstash/redis` client with `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` env vars. Call `redis.get('fap:' + deviceId)`. Return `{ data: value, syncedAt: stored_timestamp_or_null }`.
  - POST: Parse JSON body for `{ deviceId, data }`. Validate deviceId UUID format and that data is a string. Call `redis.set('fap:' + deviceId, JSON.stringify({ data, syncedAt: new Date().toISOString() }))`. Return `{ ok: true, syncedAt }`.
  - Error handling: wrap all Redis calls in try/catch. On error: return `{ error: 'fetch_failed' }` or `{ error: 'write_failed' }` with status 500.
- **Blueprint Reference:** Section 5 (API Specification — /api/sync)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 5
- **Output:** `api/sync.ts`
- **Dependencies:** S1-T1, S2-T1
- **Validation:** `vercel dev` starts without errors. `curl localhost:3000/api/sync?deviceId=550e8400-e29b-41d4-a716-446655440000` returns JSON (not 500). POST with valid body returns `{ ok: true }`.

#### S2-T5: Zustand store (src/store/useStore.ts)
- **Type:** backend
- **Description:** Create `src/store/useStore.ts` implementing the full Zustand store. Import `create` from zustand, `persist` and `createJSONStorage` from zustand/middleware. Import all types from `../types/store`, `../types/algorithm`, `../types/session`. Define the store with persist config: `name: 'fap_store'`, `version: 1`, `storage: createJSONStorage(() => localStorage)`, `migrate` function template (version 0→1 passthrough). Implement all initial state values and all actions exactly as specified in Blueprint Section 8. Verify the store exports a `useStore` hook that can be used in any component.
- **Blueprint Reference:** Section 8 (Zustand Store Definition) — implement verbatim
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 8, `src/types/store.ts`, `src/types/algorithm.ts`, `src/types/session.ts`
- **Output:** `src/store/useStore.ts`
- **Dependencies:** S1-T2
- **Validation:** `tsc --noEmit` exits 0. In a test component, `const q = useStore(s => s.questions)` compiles without error. Add store import to `src/main.tsx` temporarily and verify app renders (no runtime error about store initialization).

#### Sprint 2 Validation Checkpoint
- [ ] Upstash Redis is provisioned and responds to test command
- [ ] `.vercel/` directory exists, project linked
- [ ] `src/data/questions.ts` — 146 questions, typed correctly
- [ ] `src/data/skills.ts` — 12 skills, typed correctly
- [ ] Content gate passed: user has confirmed clinical accuracy
- [ ] `api/sync.ts` handles GET and POST without errors on `vercel dev`
- [ ] `src/store/useStore.ts` compiles, persist config has `name: 'fap_store'`, `version: 1`
- [ ] LocalStorage entry `fap_store` appears after app loads in browser

---

### Sprint 3: Core Algorithm
**Focus:** PRNG, device identity, 5-state machine, session builder — the highest-risk technical components
**Tasks:** 4

#### S3-T1: mulberry32 PRNG + Device ID utility
- **Type:** backend
- **Description:** Create 2 utility files:
  1. `src/lib/prng.ts`: Implement `mulberry32(seed: number): () => number`, `seedFromSessionId(sessionId: string): number`, and `seededShuffle<T>(array: T[], prng: () => number): T[]`. Copy the exact implementation from Blueprint Section 7.
  2. `src/lib/deviceId.ts`: Implement `resolveDeviceId(): string` with the 3-step fallback chain (localStorage → cookie → generate new). Implement private `getCookie(name: string): string | null` and `setCookie(name: string, value: string, days: number): void`. Cookie settings: `max-age={days*24*60*60};SameSite=Strict`. Copy implementation from Blueprint Section 7.
- **Blueprint Reference:** Section 7 (Utility Specifications — mulberry32 and deviceId)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 7
- **Output:** `src/lib/prng.ts`, `src/lib/deviceId.ts`
- **Dependencies:** S1-T2
- **Validation:** In a test file or browser console: `const rng = mulberry32(12345); console.log(rng(), rng(), rng())` — should produce same 3 values every time with seed 12345. `seededShuffle([1,2,3,4,5], mulberry32(42))` — same output on repeat calls. `resolveDeviceId()` returns a UUID string and stores it in localStorage.

#### S3-T2: 5-state algorithm (src/lib/algorithm.ts)
- **Type:** backend
- **Description:** Create `src/lib/algorithm.ts` implementing the complete state machine. Import `QuestionRecord`, `ExposureRecord`, `QuestionState` from `../types/algorithm`. Implement:
  - `FAST_TAP_MS = 2000` constant
  - `isFastTap(displayTime: number, answerTime: number): boolean`
  - `hasReversalInWindow(exposures: ExposureRecord[]): boolean` — checks last 5 deliberate exposures for pattern: correct followed immediately by incorrect
  - `applyAnswer(record: QuestionRecord, correct: boolean, sessionId: string, isFastTap: boolean): QuestionRecord` — pure function, returns new record. State transitions per Blueprint Section 4 state machine rules. Fast-tap: return unchanged record. Deliberate miss: state → 'active', consecutiveCorrect → 0. Correct: advance streak, check thresholds, transition if met.
  - `isMaintenanceDue(record: QuestionRecord, currentSessionNumber: number): boolean` — true if state in ['mastered','maintenance'] AND (sessionNumber - lastMaintenanceSession) >= 10 OR lastMaintenanceSession is null.
  All functions must be pure (no side effects, no store access).
- **Blueprint Reference:** Section 4 (Data Model — State Machine Rules), Section 7 (algorithm.ts specification)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Sections 4 and 7, `src/types/algorithm.ts`
- **Output:** `src/lib/algorithm.ts`
- **Dependencies:** S1-T2
- **Validation:** `tsc --noEmit` exits 0. Write inline test assertions (or use a temp test script) verifying:
  - new + correct → active (streak=1)
  - active + 2 correct → near_mastery (streak=2)
  - near_mastery + 3 correct (2+ sessions) → mastered
  - mastered + miss → active (streak=0)
  - fast-tap + correct → state unchanged

#### S3-T3: Algorithm validation (manual walkthrough)
- **Type:** test
- **Description:** Create a temporary test script `scripts/test-algorithm.ts` (will be deleted after validation). The script creates a `QuestionRecord` in `new` state and runs it through the complete mastery path: new→active→near_mastery→mastered→maintenance. Specifically:
  1. Start with new record, apply first answer (correct, sessionId='s1') → verify state='active', streak=1
  2. Apply second correct (sessionId='s1') → verify state='near_mastery', streak=2
  3. Apply third correct (sessionId='s1') → verify streak=3 but NOT mastered (only 1 session)
  4. Apply correct (sessionId='s2') → verify state='mastered' (streak>=3, 2+ sessions, no reversals)
  5. Test demotion: start from mastered, apply deliberate miss → verify state='active', streak=0
  6. Test fast-tap: apply answer with isFastTap=true → verify record unchanged
  7. Test reversal blocking: near_mastery, add a wrong then right in exposures → verify does NOT advance to mastered (reversal present)
  Run the script with `npx ts-node scripts/test-algorithm.ts` or `npx tsx scripts/test-algorithm.ts`. All assertions must pass. Delete the script after validation.
- **Blueprint Reference:** Section 4 (State Machine Rules), Section 4 (reversal definition)
- **Input:** `src/lib/algorithm.ts`, `src/types/algorithm.ts`
- **Output:** Validation result only (script deleted after)
- **Dependencies:** S3-T2
- **Validation:** All 7 test assertions pass with `console.log('ALL TESTS PASSED')` output.

#### S3-T4: Session builder (src/lib/sessionBuilder.ts)
- **Type:** backend
- **Description:** Create `src/lib/sessionBuilder.ts`. Import `QuestionRecord` from types, `isMaintenanceDue` from algorithm, `mulberry32`, `seedFromSessionId`, `seededShuffle` from prng, `Question` type and `questions` array from data. Implement `buildSessionQueue(questionRecords: Record<string, QuestionRecord>, sessionNumber: number, sessionId: string): string[]`:
  1. Classify questions into 3 tiers: ACTIVE_NEW (state='new' or 'active'), NEAR_MASTERY (state='near_mastery'), MAINTENANCE_DUE (isMaintenanceDue(record, sessionNumber) === true).
  2. Create seeded PRNG from seedFromSessionId(sessionId).
  3. Shuffle each tier using seededShuffle with the seeded PRNG.
  4. Assemble queue: interleave NEAR_MASTERY into ACTIVE_NEW at 1:5 ratio (insert one near_mastery question every 5 active questions). Append MAINTENANCE_DUE at end.
  5. Return array of question IDs (strings), not Question objects.
- **Blueprint Reference:** Section 4 (Session Queue Construction), Section 7 (prng.ts)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 4 (Queue Construction), `src/lib/algorithm.ts`, `src/lib/prng.ts`
- **Output:** `src/lib/sessionBuilder.ts`
- **Dependencies:** S3-T1, S3-T2, S2-T2
- **Validation:** `tsc --noEmit` exits 0. Test: call `buildSessionQueue({...10 records in various states}, 1, crypto.randomUUID())` — verify ACTIVE questions appear before NEAR_MASTERY, MAINTENANCE questions appear last, order is deterministic for same sessionId.

#### Sprint 3 Validation Checkpoint
- [ ] `src/lib/prng.ts` — mulberry32 produces deterministic output for given seed
- [ ] `src/lib/deviceId.ts` — resolves and stores UUID in localStorage + cookie
- [ ] `src/lib/algorithm.ts` — all 5 state transitions verified correct
- [ ] Algorithm validation script passed all 7 assertions
- [ ] `src/lib/sessionBuilder.ts` — tier ordering correct, deterministic for same session seed
- [ ] `tsc --noEmit` exits 0 for all files in src/lib/

---

### Sprint 4: Hooks & Analytics
**Focus:** Session lifecycle, sync, and analytics computation hooks
**Tasks:** 3

#### S4-T1: Analytics computations (src/lib/analytics.ts)
- **Type:** backend
- **Description:** Create `src/lib/analytics.ts`. Import `QuestionRecord`, `QuestionState` from types, `Question` from content types, `questions` array from data. Implement:
  - `interface TopicStat { topic: string; count: number; masteryPercent: number; color: 'red' | 'yellow' | 'green' }`
  - `computeTopicStats(questionRecords: Record<string, QuestionRecord>): TopicStat[]` — for each of the 11 topics: filter questions by topic, count total, count mastered (state='mastered'|'maintenance') + near_mastery*0.5, compute masteryPercent = (mastered + nearMastery*0.5)/total*100, assign color (<50: 'red', 50-80: 'yellow', >80: 'green').
  - `computeEstimatedScore(topicStats: TopicStat[]): number` — sum(topic.masteryPercent * topic.count) / totalQuestions. Returns 0-100.
  - `isReadyToTest(topicStats: TopicStat[], estimatedScore: number): boolean` — true if estimatedScore >= 80 AND every topic has masteryPercent >= 75.
- **Blueprint Reference:** Section 4 (Analytics Computation), Section 15 (topic list with counts)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Sections 4 and 15, `src/data/questions.ts`, `src/types/algorithm.ts`
- **Output:** `src/lib/analytics.ts`
- **Dependencies:** S1-T2, S2-T2
- **Validation:** `tsc --noEmit` exits 0. Test: create a record set with all 25 CPR questions mastered, verify CPR topic shows masteryPercent=100, color='green'. With all questions at 'new': estimatedScore=0. isReadyToTest returns false.

#### S4-T2: useSession hook (src/hooks/useSession.ts)
- **Type:** frontend
- **Description:** Create `src/hooks/useSession.ts`. This hook manages the complete session lifecycle. Import `useStore`, `buildSessionQueue`, `applyAnswer`, `isFastTap` from respective modules. Implement:
  - `startSession()`: Generate sessionId (crypto.randomUUID()), increment sessionCount via store, build queue via buildSessionQueue(), create SessionRecord with sessionId, sessionNumber, queue, currentIndex:0, questionDisplayTime:null, fastTapPending:[], isComplete:false. Write to store via setCurrentSession().
  - `markQuestionDisplayed()`: Set questionDisplayTime = Date.now() in current session.
  - `recordAnswer(correct: boolean, answerTime: number)`: Compute isFastTap from session.questionDisplayTime and answerTime. If fast-tap: add question ID to fastTapPending, do NOT call applyAnswer. If deliberate: call applyAnswer() with current QuestionRecord, update store via updateQuestion(). Either way: advance currentIndex.
  - `nextQuestion()`: If currentIndex >= queue.length AND fastTapPending.length > 0: append fastTapPending to queue end, clear fastTapPending. If currentIndex >= queue.length (including flushed pending): set isComplete=true. Else: advance index, clear questionDisplayTime.
  - `getCurrentQuestion()`: Return Question object from questions array for queue[currentIndex].
  - `endSession()`: incrementSessionCount (if not already done in startSession), setCurrentSession(null), markDirty().
- **Blueprint Reference:** Section 6 (StudyTab description for session flow), Section 4 (fast-tap handling), Section 8 (store actions)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Sections 4, 6, 8, `src/lib/sessionBuilder.ts`, `src/lib/algorithm.ts`, `src/store/useStore.ts`
- **Output:** `src/hooks/useSession.ts`
- **Dependencies:** S3-T4, S3-T2, S2-T5
- **Validation:** `tsc --noEmit` exits 0. Manual integration check: create a component that calls startSession() on mount, calls markQuestionDisplayed(), then recordAnswer(true, Date.now()) — verify store.questions record updates and currentIndex advances.

#### S4-T3: useSync hook (src/hooks/useSync.ts)
- **Type:** frontend
- **Description:** Create `src/hooks/useSync.ts`. Import `useStore`, `useEffect` from react. Implement:
  - Auto-sync effect: `useEffect` that runs a `setInterval` every 60,000ms. On each tick: read `isDirty` and `deviceId` and `questions` from store. If isDirty: call POST `/api/sync` with `{ deviceId, data: JSON.stringify(questions) }`. On success: call `store.markClean(syncedAt)`. On error: log error, leave isDirty=true (retry next tick). Clear interval on unmount.
  - `manualSave(): Promise<{ ok: boolean; error?: string }>`: POST to /api/sync. Update store on success.
  - `restoreBackup(): Promise<{ ok: boolean; data?: unknown; error?: string }>`: GET `/api/sync?deviceId={deviceId}`. On success: parse the data, update `store.questions` with the restored Record. On null data: return `{ ok: false, error: 'no_backup_found' }`.
  The hook returns `{ manualSave, restoreBackup }`. Auto-sync runs as a side effect when the hook is mounted.
- **Blueprint Reference:** Section 5 (API Specification), Section 6 (SyncControls description), Section 14 (error categories)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Sections 5 and 14, `src/store/useStore.ts`, `api/sync.ts`
- **Output:** `src/hooks/useSync.ts`
- **Dependencies:** S2-T4, S2-T5
- **Validation:** `tsc --noEmit` exits 0. With `vercel dev` running: mount a test component that calls useSync, answer a question (isDirty=true), wait 60s or call manualSave() — verify localStorage is updated and lastSyncAt shows a timestamp.

#### Sprint 4 Validation Checkpoint
- [ ] `src/lib/analytics.ts` — computeTopicStats returns correct colors for threshold boundaries
- [ ] `src/hooks/useSession.ts` — startSession creates valid SessionRecord, recordAnswer updates QuestionRecord
- [ ] `src/hooks/useSync.ts` — manualSave sends POST and updates lastSyncAt on success
- [ ] `tsc --noEmit` exits 0 for all files

---

### Sprint 5: Study Tab UI
**Focus:** The primary user-facing feature — answer selection, feedback, session orchestration
**Tasks:** 5

#### S5-T1: AnswerOption component
- **Type:** frontend
- **Description:** Create `src/components/study/AnswerOption.tsx`. Props: `text: string`, `index: number`, `selectedIndex: number | null`, `correctIndex: number`, `onSelect: (index: number) => void`. The component renders a single answer button. Visual state logic: if selectedIndex === null: 'idle' state (no result shown). If selectedIndex !== null: show result state for ALL options simultaneously — selectedIndex gets 'selected-correct' or 'selected-incorrect' bg; correctIndex (if != selectedIndex) gets 'revealed-correct' bg; others get dimmed. Use CSS custom properties from globals.css for state colors: `--color-state-correct-bg`, `--color-state-incorrect-bg`, `--color-bg-elevated`. Disabled after selection (no double-select). Min height 44px touch target.
- **Blueprint Reference:** Section 6 (AnswerOption component description), Section 11 (security — no dangerouslySetInnerHTML)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 6, `src/styles/globals.css`
- **Output:** `src/components/study/AnswerOption.tsx`
- **Dependencies:** S1-T2, S1-T3
- **Validation:** Renders correctly in 3 states: idle (no selection), correct selection, incorrect selection. correctIndex option gets revealed-correct styling when incorrect answer was chosen.

#### S5-T2: ExplanationPanel component
- **Type:** frontend
- **Description:** Create `src/components/study/ExplanationPanel.tsx`. Props: `explanation: string`, `isCorrect: boolean`, `isFastTap: boolean`, `onNext: () => void`. Renders: result badge (green checkmark if correct, red X if incorrect), explanation text, fast-tap warning if `isFastTap` is true ("Response was under 2 seconds — this answer won't count toward mastery"). "Next" button calls `onNext`. Use design system typography (body text for explanation, `--color-state-correct` / `--color-state-incorrect` for badge).
- **Blueprint Reference:** Section 6 (ExplanationPanel description)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 6, `src/styles/globals.css`
- **Output:** `src/components/study/ExplanationPanel.tsx`
- **Dependencies:** S1-T2, S1-T3
- **Validation:** Renders correct badge + explanation text. Fast-tap warning appears only when isFastTap=true. onNext fires on button click.

#### S5-T3: QuestionCard component
- **Type:** frontend
- **Description:** Create `src/components/study/QuestionCard.tsx`. This component displays one question and manages the answer flow. Props: `question: Question` (from content types). On mount: call `useSession().markQuestionDisplayed()`. Render: topic label (small caps, `--color-text-muted`), question text (screen heading size), list of AnswerOption components. State: `selectedIndex: number | null`. On answer selected: record `answerTime = Date.now()`, call `useSession().recordAnswer(correct, answerTime)`, set selectedIndex. After selection: show ExplanationPanel with `onNext={() => useSession().nextQuestion()}`. Do NOT call nextQuestion on mount or on component unmount — only on explicit Next button press.
- **Blueprint Reference:** Section 6 (QuestionCard description)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 6, `src/hooks/useSession.ts`, `src/components/study/AnswerOption.tsx`, `src/components/study/ExplanationPanel.tsx`, `src/types/content.ts`
- **Output:** `src/components/study/QuestionCard.tsx`
- **Dependencies:** S4-T2, S5-T1, S5-T2
- **Validation:** Renders question + 4 options. Selecting an option shows ExplanationPanel. Next button advances session. markQuestionDisplayed is called on mount.

#### S5-T4: SessionSummary component
- **Type:** frontend
- **Description:** Create `src/components/study/SessionSummary.tsx`. Props: none (reads from Zustand store). Reads: sessionCount from store, questions record. Displays: "Session Complete" heading, total questions answered in session (from current session's currentIndex), correct count, fast-tap count, current state distribution (how many questions in each of 5 states). "Start New Session" button calls `useSession().startSession()`. Uses design system typography for stats display (large DM Sans 300 for numbers, section labels for descriptions).
- **Blueprint Reference:** Section 6 (SessionSummary description)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 6, `src/hooks/useSession.ts`, `src/store/useStore.ts`
- **Output:** `src/components/study/SessionSummary.tsx`
- **Dependencies:** S4-T2, S1-T3, S2-T5
- **Validation:** Renders session stats after a session ends. "Start New Session" triggers new session correctly.

#### S5-T5: StudyTab component
- **Type:** frontend
- **Description:** Create `src/components/study/StudyTab.tsx`. This is the session orchestrator. On mount: read currentSession from store. If currentSession is null or isComplete: call startSession() from useSession(). Render logic: if session.isComplete is true → render SessionSummary. Else: get current question via useSession().getCurrentQuestion(). If question exists → render QuestionCard with that question. Uses `useStore(s => s.currentSession)` selector for reactivity. The component must handle the transition from "no session" → "session started" → "question displayed" without flashing or extra re-renders.
- **Blueprint Reference:** Section 6 (StudyTab description)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 6, `src/hooks/useSession.ts`, `src/store/useStore.ts`
- **Output:** `src/components/study/StudyTab.tsx`
- **Dependencies:** S4-T2, S5-T3, S5-T4
- **Validation:** App opens to a question immediately (no blank state, no loading spinner). Answering all questions in queue shows SessionSummary. Starting new session shows next question.

#### Sprint 5 Validation Checkpoint
- [ ] App opens to a question with zero user interaction (SC-001)
- [ ] Selecting answer shows correct/incorrect state on ALL options simultaneously
- [ ] ExplanationPanel appears after selection with correct explanation text
- [ ] Fast-tap (click immediately) shows fast-tap warning in ExplanationPanel
- [ ] Session completes (queue exhausted) → SessionSummary with stats
- [ ] New session starts → first question appears
- [ ] `tsc --noEmit` exits 0

---

### Sprint 6: Skills & Progress Tabs
**Focus:** Practical skills guide and analytics dashboard
**Tasks:** 5

#### S6-T1: SkillCard component
- **Type:** frontend
- **Description:** Create `src/components/skills/SkillCard.tsx`. Props: `skill: Skill`, `isExpanded: boolean`, `onToggle: () => void`. Collapsed state: skill name (subheading size) + category badge (section-label size, gradient pill). Expanded state: + objective (body text, muted color), numbered steps list (body text), "Common Errors" section (section-label heading + list), "Evaluation Criteria" section (section-label heading + checklist). On header click: call onToggle(). Smooth height transition using CSS max-height animation. Background: `--color-bg-surface`.
- **Blueprint Reference:** Section 6 (SkillCard description)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 6, `src/types/content.ts`, `src/styles/globals.css`
- **Output:** `src/components/skills/SkillCard.tsx`
- **Dependencies:** S1-T2, S1-T3
- **Validation:** Collapsed shows only name + category. Clicking expands with smooth animation. Expanded shows steps numbered correctly. Steps text is not truncated.

#### S6-T2: SkillsTab component
- **Type:** frontend
- **Description:** Create `src/components/skills/SkillsTab.tsx`. Imports `skills` from `src/data/skills.ts`. Reads `skillsExpandedId` from Zustand store. Renders a scrollable list of all 12 SkillCard components. On SkillCard toggle: if the clicked skill's ID equals `skillsExpandedId`, call `store.setSkillsExpanded(null)` (collapse). Otherwise call `store.setSkillsExpanded(skill.id)` (expand clicked, collapse previously expanded). Tab title: "Skills Guide" (screen heading size).
- **Blueprint Reference:** Section 6 (SkillsTab description)
- **Input:** `src/data/skills.ts`, `src/store/useStore.ts`, `src/components/skills/SkillCard.tsx`
- **Output:** `src/components/skills/SkillsTab.tsx`
- **Dependencies:** S6-T1, S2-T2, S2-T5
- **Validation:** All 12 skill cards render. Only one can be expanded at a time. Expanded skill persists across tab switches (stored in Zustand).

#### S6-T3: ScoreDisplay component
- **Type:** frontend
- **Description:** Create `src/components/progress/ScoreDisplay.tsx`. Props: `estimatedScore: number`, `isReadyToTest: boolean`. Renders: "Estimated Score" section label, large score number (e.g., "73%") in DM Sans weight 300 at 3rem+. If isReadyToTest: show "Ready to Test" banner (green background, `--gradient-mode-1` or solid green, white text, bold). Banner should be visually prominent — this is the primary success signal of the app.
- **Blueprint Reference:** Section 6 (ScoreDisplay description), Section 3 (FR-014, FR-017)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 6, `src/styles/globals.css`
- **Output:** `src/components/progress/ScoreDisplay.tsx`
- **Dependencies:** S1-T3
- **Validation:** Score number renders large. Ready to Test banner appears when isReadyToTest=true, hidden otherwise.

#### S6-T4: TopicGrid + WeakTopics components
- **Type:** frontend
- **Description:** Create 2 components:
  1. `src/components/progress/TopicGrid.tsx`: Props: `topicStats: TopicStat[]`. Renders an 11-cell CSS grid. Each cell: topic short name (clamp to 2 lines, small text) + masteryPercent% value. Cell background color based on TopicStat.color: red=#E54343 (10% opacity bg), yellow=#F5A623 (10% opacity bg), green=#2DB55D (10% opacity bg). Cell border matches the color at 30% opacity. Use short topic names (e.g., "CPR", "AED", "Scene Safety", not the full strings).
  2. `src/components/progress/WeakTopics.tsx`: Props: `topicStats: TopicStat[]`. Renders the 3 topics with lowest masteryPercent (ascending sort). Shows: topic name (subheading), masteryPercent% (muted body text), color indicator bar.
- **Blueprint Reference:** Section 6 (TopicGrid and WeakTopics descriptions), Section 3 (FR-015, FR-016)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 6, `src/lib/analytics.ts`, `src/styles/globals.css`
- **Output:** `src/components/progress/TopicGrid.tsx`, `src/components/progress/WeakTopics.tsx`
- **Dependencies:** S4-T1, S1-T3
- **Validation:** 11 cells in grid. All 3 color states visible when seeding mock data. WeakTopics shows exactly 3 topics in ascending mastery order.

#### S6-T5: ProgressTab component
- **Type:** frontend
- **Description:** Create `src/components/progress/ProgressTab.tsx`. Reads `questions` from Zustand store. Computes `topicStats = computeTopicStats(questions)` and `score = computeEstimatedScore(topicStats)` and `ready = isReadyToTest(topicStats, score)` on each render (these are fast computations, no memoization needed for 146 questions). Renders in order: ScoreDisplay (score, ready), TopicGrid (topicStats), WeakTopics (topicStats). Tab title: "Progress" (screen heading). The analytics update automatically whenever `questions` state changes (because Zustand selector re-renders on change).
- **Blueprint Reference:** Section 6 (ProgressTab description)
- **Input:** `src/lib/analytics.ts`, `src/store/useStore.ts`, all 3 progress sub-components
- **Output:** `src/components/progress/ProgressTab.tsx`
- **Dependencies:** S6-T3, S6-T4, S4-T1
- **Validation:** Progress tab renders with 0% initially (all questions new). After answering questions in Study tab, Progress tab reflects updated mastery correctly.

#### Sprint 6 Validation Checkpoint
- [ ] Skills tab: all 12 skills render, accordion works (single expand), expanded state survives tab switch
- [ ] Progress tab: all 11 topics in grid, correct color coding
- [ ] Score updates after answering questions in Study tab
- [ ] WeakTopics shows 3 lowest topics
- [ ] Ready to Test banner hidden when score < 80%
- [ ] `tsc --noEmit` exits 0

---

### Sprint 7: Settings, Navigation & App Assembly
**Focus:** Complete the app by assembling all tabs with navigation, settings, and entry point
**Tasks:** 6

#### S7-T1: SyncControls component
- **Type:** frontend
- **Description:** Create `src/components/settings/SyncControls.tsx`. Imports `useSync` hook. Renders:
  - "Save Progress" section with button labeled "Save to Cloud". On click: call `useSync().manualSave()`. During save: disable button, show "Saving..." text. On success: show "Saved" with timestamp. On error: show "Save failed — check connection".
  - "Restore Backup" section with button labeled "Restore from Backup". On click: show inline confirmation ("This will replace all current progress. Continue?" with Cancel/Confirm buttons). On confirm: call `useSync().restoreBackup()`. On success: show "Restored". On no_backup_found error: show "No backup found".
  - "Last synced" line showing `store.lastSyncAt` formatted as relative time (e.g., "2 minutes ago") or "Never".
  All status messages auto-clear after 4 seconds.
- **Blueprint Reference:** Section 6 (SyncControls description)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 6, `src/hooks/useSync.ts`
- **Output:** `src/components/settings/SyncControls.tsx`
- **Dependencies:** S4-T3, S1-T3
- **Validation:** Save button triggers POST, shows success/error state. Restore button shows confirmation before acting. Last synced time displays correctly.

#### S7-T2: SettingsTab component
- **Type:** frontend
- **Description:** Create `src/components/settings/SettingsTab.tsx`. Mounts the `useSync` auto-sync interval (via the useSync hook's useEffect). Renders: "Settings" heading, SyncControls component, "About" section showing app name + version info. The auto-sync interval starts when this component mounts. NOTE: the interval must persist even when Settings tab is hidden (because AppShell uses display:none not unmounting — the component stays mounted). No special handling needed because CSS display:none doesn't unmount React components.
- **Blueprint Reference:** Section 6 (SettingsTab description)
- **Input:** `src/components/settings/SyncControls.tsx`, `src/hooks/useSync.ts`
- **Output:** `src/components/settings/SettingsTab.tsx`
- **Dependencies:** S7-T1, S4-T3
- **Validation:** SettingsTab renders SyncControls. With `vercel dev` running: auto-sync triggers after 60s when isDirty=true.

#### S7-T3: BottomNav component
- **Type:** frontend
- **Description:** Create `src/components/layout/BottomNav.tsx`. Reads `activeTab` from Zustand store. Renders 4 nav items: Study (index 0), Skills (index 1), Progress (index 2), Settings (index 3). Each item: icon/label + active indicator. Active indicator: gradient underline using `--gradient-mode-1`. Touch targets: minimum 44px height. Fixed positioning at bottom of screen. Background: `--color-bg-base` with top border (`--color-border`). Safe-area inset padding for iOS notch: `padding-bottom: env(safe-area-inset-bottom)`. On tap: call `store.setActiveTab(index)`. Uses SVG icons or Unicode symbols for tab icons (cross/book/chart/gear).
- **Blueprint Reference:** Section 6 (BottomNav description)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Section 6, `src/styles/globals.css`, `src/store/useStore.ts`
- **Output:** `src/components/layout/BottomNav.tsx`
- **Dependencies:** S2-T5, S1-T3
- **Validation:** All 4 tabs visible. Active tab shows gradient indicator. Tapping switches active tab. 44px minimum touch target verified by CSS inspection.

#### S7-T4: IOSInstallBanner component
- **Type:** frontend
- **Description:** Create `src/components/shared/IOSInstallBanner.tsx`. Detection logic: show banner ONLY when ALL of: `navigator.standalone === false`, `/iPad|iPhone|iPod/.test(navigator.userAgent)`, `store.iosInstallDismissed === false`. Renders a dismissible bottom banner (positioned above BottomNav): "Install this app: tap the Share button then 'Add to Home Screen'". Include Share icon (↑ or similar). Dismiss button (×): calls `store.dismissIOSBanner()` (persisted in Zustand, never shows again). Banner does NOT appear on Android or desktop.
- **Blueprint Reference:** Section 6 (IOSInstallBanner description), Section 7 (iOS install detection logic)
- **Input:** `SYNTROP/artifacts/architecture/blueprint.md` Sections 6 and 7, `src/store/useStore.ts`
- **Output:** `src/components/shared/IOSInstallBanner.tsx`
- **Dependencies:** S2-T5, S1-T3
- **Validation:** On iOS user agent (test by spoofing navigator.userAgent): banner appears. On dismiss: banner hides and iosInstallDismissed=true persists in store across page reload. On Android/desktop: banner never shows.

#### S7-T5: AppShell component
- **Type:** frontend
- **Description:** Create `src/components/layout/AppShell.tsx`. Reads `activeTab` from Zustand store. Renders 4 tab content areas + BottomNav. Key architectural detail: ALL 4 tab components are ALWAYS mounted (not conditionally rendered). Use CSS `display: activeTab === i ? 'block' : 'none'` on the wrapper div for each tab. This preserves component state (scroll position, expanded skills, session state) across tab switches. Tab order: 0=StudyTab, 1=SkillsTab, 2=ProgressTab, 3=SettingsTab. Content area has `padding-bottom` to clear the fixed BottomNav (approx 64px + safe area). BottomNav is rendered outside the content area, fixed at bottom.
- **Blueprint Reference:** Section 6 (AppShell description — "CSS display:none toggle, not unmounting")
- **Input:** All 4 tab components, `src/components/layout/BottomNav.tsx`, `src/store/useStore.ts`
- **Output:** `src/components/layout/AppShell.tsx`
- **Dependencies:** S5-T5, S6-T5, S6-T2, S7-T2, S7-T3
- **Validation:** All 4 tabs switch correctly. React DevTools confirms all 4 tab components remain mounted during tab switches. No scroll position reset on tab switch. BottomNav does not overlap content.

#### S7-T6: App entry point (src/main.tsx + src/App.tsx)
- **Type:** frontend
- **Description:** Finalize the app entry point.
  1. `src/main.tsx`: Import ReactDOM, App, styles, useStore, questions, resolveDeviceId. Before rendering: call `resolveDeviceId()` and store the result via `useStore.getState().setDeviceId(id)` (note: use `getState()` for one-time initialization outside React). Call `useStore.getState().initializeQuestions(QUESTION_IDS)` to seed all 146 QuestionRecords with default 'new' state. Then render `<React.StrictMode><App /></React.StrictMode>` to the root div.
  2. `src/App.tsx`: Renders `<AppShell />` and `<IOSInstallBanner />`. No other logic.
- **Blueprint Reference:** Section 6 (app entry description), Section 13 (file structure)
- **Input:** `src/lib/deviceId.ts`, `src/store/useStore.ts`, `src/data/questions.ts`, `src/components/layout/AppShell.tsx`, `src/components/shared/IOSInstallBanner.tsx`
- **Output:** `src/main.tsx` (updated), `src/App.tsx` (updated)
- **Dependencies:** S7-T5, S7-T4, S3-T1
- **Validation:** App opens to first question with ZERO console errors. All 146 questions initialized in store on first load (verify in localStorage). DeviceId is set in store. IOSInstallBanner renders on iOS. `tsc --noEmit` exits 0 for all files.

#### Sprint 7 Validation Checkpoint
- [ ] App opens to a question with zero console errors (SC-001)
- [ ] All 4 tab switches work, no content bleed between tabs
- [ ] BottomNav active indicator updates correctly
- [ ] IOSInstallBanner appears on iOS user agent, dismisses permanently
- [ ] 146 questions initialized in localStorage on first load
- [ ] DeviceId stored in localStorage + cookie
- [ ] Auto-sync interval runs (verifiable in Network tab after 60s with isDirty=true)
- [ ] `tsc --noEmit` exits 0

---

### Sprint 8: Deployment & Validation
**Focus:** Production build, Vercel deploy, and full acceptance testing
**Tasks:** 3

#### S8-T1: Production build + bundle size verification
- **Type:** test
- **Description:** Run `npm run build`. Verify exit code 0. Check bundle size: `du -sh dist/` — total must be under 5MB (Assumption A1). Inspect `dist/` for: `manifest.webmanifest`, a service worker file (e.g., `sw.js` or `workbox-*.js`), icon files, the JS bundle(s). If total bundle is above 5MB (extremely unlikely): report to user and pause — do not proceed with deployment until resolved. Also verify: `dist/index.html` contains the iOS meta tags. `dist/manifest.webmanifest` contains `display: "standalone"` and at least 2 icon entries.
- **Blueprint Reference:** Section 2 (performance notes), Section 10 (Vercel deployment), SSOT Assumption A1
- **Input:** All source files (full build)
- **Output:** `dist/` directory (build artifact)
- **Dependencies:** All S7 tasks complete
- **Validation:** `npm run build` exits 0. `du -sh dist/` < 5MB. `dist/manifest.webmanifest` and `dist/sw.js` exist.

#### S8-T2: Vercel production deployment
- **Type:** integration
- **Description:** Run `vercel deploy --prod`. Wait for deployment to complete. Note the production URL. Verify: (1) App loads at production URL. (2) GET `{production_url}/api/sync?deviceId=550e8400-e29b-41d4-a716-446655440000` returns JSON (connection to Upstash works). (3) POST to /api/sync with a test payload returns `{ ok: true }`. (4) Service worker is registered: in Chrome DevTools → Application → Service Workers, the sw.js is listed as activated. Record the production URL in `SYNTROP/artifacts/architecture/infra-notes.md`.
- **Blueprint Reference:** Section 10 (Vercel Deployment), SSOT SC-007 (zero dashboard interaction)
- **Input:** `dist/` from S8-T1, Vercel project (from S2-T1)
- **Output:** Deployed production app, updated `SYNTROP/artifacts/architecture/infra-notes.md`
- **Dependencies:** S8-T1, S2-T1
- **Validation:** Production URL loads app. /api/sync responds correctly. Service worker registered. No build errors in Vercel deployment log.

#### S8-T3: Acceptance validation
- **Type:** test
- **Description:** Verify all 7 success criteria from SSOT Section 7:
  - SC-001: App opens to a quiz question immediately with zero interactions ✓ (verify on production URL)
  - SC-002: Full offline use after first visit — load production URL, then enable airplane mode, verify all 4 tabs work in airplane mode
  - SC-003: Progress persists across reload — answer 3 questions, note the state distribution, reload page, verify same state distribution
  - SC-004: One-tap Redis restore — answer 5 questions (isDirty=true), wait for auto-sync or manual save, clear localStorage in DevTools, reload page, tap Restore in Settings — verify question states are recovered
  - SC-005: Ready to Test signal — not testable in one session (requires mastering questions), verify the analytics computation formula is correct by seeding known state and checking output
  - SC-006: PWA installable — on Android Chrome: verify install banner appears. On iOS Safari (or simulated): verify Share menu shows Add to Home Screen option (app icon visible after install)
  - SC-007: Zero manual dashboard interaction — confirm the entire deployment was completed without opening vercel.com or upstash.com
  Document results in `SYNTROP/artifacts/architecture/acceptance-results.md`.
- **Blueprint Reference:** SSOT Section 7 (Success Criteria SC-001 through SC-007)
- **Input:** Production URL, `SYNTROP/artifacts/intake/SINGLE-SOURCE-OF-TRUTH.md` Section 7
- **Output:** `SYNTROP/artifacts/architecture/acceptance-results.md`
- **Dependencies:** S8-T2
- **Validation:** SC-001, SC-002, SC-003, SC-004, SC-007 verified. SC-005 and SC-006 verified to the extent possible. All results documented.

#### Sprint 8 Validation Checkpoint
- [ ] `npm run build` exits 0, dist/ < 5MB
- [ ] Service worker generated in dist/
- [ ] App live at production Vercel URL
- [ ] /api/sync GET and POST functional in production
- [ ] Service worker activates on first production visit
- [ ] SC-001: First question visible immediately
- [ ] SC-002: Offline mode functional after first load
- [ ] SC-003: Progress survives page reload
- [ ] SC-004: Redis restore recovers data after localStorage clear
- [ ] SC-007: No dashboard URLs opened during deployment

---

### Final Validation

- [ ] All 8 sprints complete
- [ ] All 35 tasks marked done
- [ ] All 7 success criteria verified (SC-001 through SC-007)
- [ ] All 8 vision anchors maintained (verify against blueprint Section 16)
- [ ] TypeScript: zero errors, zero any casts, strict mode enforced
- [ ] Bundle: < 5MB total, service worker precaches all assets
- [ ] Data: 146 questions from zzz/questions.js, 12 skills from zzz/skills.js, content unchanged
- [ ] Infrastructure: provisioned via CLI only (zero manual dashboard interaction)
- [ ] Content gate: user confirmed clinical accuracy before UI build
