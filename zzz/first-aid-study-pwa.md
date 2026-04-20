# First Aid Study PWA

---

## Section 0: Re-Articulated Original Input

The goal is to build a Progressive Web App (PWA) for mobile that functions as a standalone, self-contained first aid study system — designed to replace a current Claude Code command (`/first-aid-study`) that performs the same function but consumes tokens and requires active AI involvement. The premise is that all study content will be embedded directly in the application, eliminating any need for AI integrations or external API dependencies during use.

The certification target is Alberta Standard First Aid Level C CPR & AED, administered through St. John Ambulance Alberta. The specific course format is the Intermediate First Aid recertification class, which consists of a 60-minute written knowledge assessment (minimum 70% to pass) followed by a minimum 7-hour practical skills demonstration session where students must demonstrate all essential skills and scenarios. This is an evaluation class — no instruction is given, only assessment. The app must be designed to take a user from zero knowledge to the point where they can successfully pass both components.

The study engine should be built on psychological principles of learning and memory, inspired by what Anki does — but not as a timed spaced repetition system. Instead, it should be a mastery-based dynamic cycling system: questions remain in active rotation until the user has demonstrably proven reliable recall, with the algorithm tracking patterns across sessions rather than timers. The algorithm should prioritize weak areas, prevent pattern memorization, and only graduate questions out of rotation when true mastery thresholds are met.

Progress storage should use a hybrid model: localStorage as the primary data layer for instant, zero-latency reads during study sessions, with a cloud backup to Upstash Redis that syncs on manual save or periodic intervals — minimizing unnecessary API calls. No authentication is required; the app is personal-use only on a single device.

The application will be deployed on Vercel. All infrastructure setup — including Upstash Redis provisioning, environment variable configuration, and Vercel project setup — must be executable by Claude Code via MCP servers and CLI tools, requiring no manual interaction from the user.

The planning and build process must follow a zero-ambiguity, expansive prompting methodology: each planning phase starts from one known certainty and derives the next with equal certainty. Planning happens in sequential fresh chat sessions. Each build phase must be modular and granular — broken into steps so small that a less capable model can execute them correctly without inference or guesswork, while still producing high-quality output. The UI is built from specified design system reference files.

The two confirmed study modes are Adaptive Drill (the primary mode, using the mastery algorithm) and Practical Skills Guide (step-by-step walkthroughs of the physical skills required for the practical assessment). Analytics must be human-readable and provide an estimated exam score, topic-by-topic mastery breakdown, and plain-language readiness indicators.

---

## Section 1: Summary

The First Aid Study PWA is a standalone mobile Progressive Web App built to take a user from zero first aid knowledge to full certification readiness for the Alberta Standard First Aid Level C CPR & AED credential administered by St. John Ambulance Alberta. The certification requires passing both a 60-minute written knowledge assessment (minimum 70%) and a 7-hour practical skills demonstration session where every required skill must be performed. The app's purpose is to make passing both components achievable through self-directed, efficient study — without any instructor, AI assistance, or internet connection during use.

The application is entirely self-contained: all first aid content — questions, explanations, practical skill steps, and assessment criteria — is compiled into the app at build time. There are no AI API calls, no content fetching from external services, and no third-party knowledge dependencies. This is a deliberate architectural choice. The app must work offline, load instantly, and never fail because an integration is unavailable.

At the core of the app is a mastery-based adaptive learning engine. Unlike spaced repetition systems that schedule reviews by time intervals, this engine keeps questions in active rotation until the user demonstrates consistent, reliable recall across multiple exposures and sessions. The algorithm is grounded in cognitive psychology: the testing effect (retrieval practice builds memory more than re-reading), desirable difficulty (productive struggle strengthens retention), and confidence-weighted pattern detection (single correct answers are not mastery). Questions are tracked individually — the system observes streaks, near-misses, and reversals to distinguish genuine knowledge from lucky guesses. Weak areas surface more frequently; mastered questions drop to maintenance frequency and return to active rotation if missed.

Two study modes are provided. The Adaptive Drill is the primary mode: a continuous quiz session where the algorithm controls question ordering and cycling. The user never manually chooses what to study — the engine surfaces exactly what needs work. The Practical Skills Guide is a companion mode that covers the physical assessment requirements: structured step-by-step walkthroughs of every required skill formatted as self-checkable rubrics, aligned to the St. John Ambulance evaluation criteria for each skill area.

Analytics are built for the non-expert user. Rather than raw statistics, the analytics dashboard translates performance data into plain-language insights: an estimated written exam score derived from current mastery levels, a topic-by-topic color-coded breakdown, and a "Ready to test" readiness indicator that lists specific gap areas. The goal is that a user opens the analytics view and immediately knows whether they are ready or exactly what to study next.

Progress is stored locally first — all reads during study sessions come from localStorage with zero latency and zero API calls. Progress syncs to Upstash Redis on manual save or a 60-second periodic interval, providing a cloud backup without unnecessary API load. If localStorage is ever cleared, the app offers to restore from the most recent Redis backup. No authentication is required; the app is personal-device only, identified by an anonymous device UUID generated on first launch.

The application is deployed on Vercel with a single API route handling the Redis sync. All infrastructure — Upstash Redis instance, environment variable injection, and Vercel project configuration — is provisioned by Claude Code via MCP server commands and CLI, requiring zero manual dashboard interaction from the user.

The build and planning process follows a zero-ambiguity, modular execution model. Planning proceeds through sequential fresh chat sessions, each deriving certainty from the last. Build tasks are granular enough that each one touches a single file or function, has a clear expected output, and can be executed correctly by a less capable model without inference. Quality is enforced through the design system references and algorithm specifications, not model capability.

---

## Section 2: Key Points

## Application Purpose
- Prepares users for Alberta Standard First Aid Level C CPR & AED via St. John Ambulance Alberta
- Targets the Intermediate First Aid recertification format: 60-min written exam + 7-hour practical assessment
- Written exam: 70% minimum pass; practical: all essential skills must be demonstrated
- App takes user from zero knowledge to certification-ready through entirely self-contained content
- No instructor, no AI dependency, no internet connectivity required during study sessions

## Core Study Engine
- Mastery-based algorithm: questions stay in rotation until consistent correct recall is proven across sessions
- Not timed spaced repetition — mastery is measured by performance patterns, not calendar intervals
- Tracks: consecutive correct answers, reversal events, near-miss patterns, exposures per question
- Questions graduate out of rotation only after meeting a defined mastery threshold (e.g., 3 correct across 2+ sessions, no recent reversals)
- Graduated questions enter maintenance mode (low-frequency review) and return to active if missed again
- Fast-tap detection: responses under 2 seconds flagged as low-confidence and excluded from mastery streaks

## Study Modes
- Primary: Adaptive Drill — continuous quiz with algorithm-controlled question ordering and cycling
- Secondary: Practical Skills Guide — step-by-step walkthroughs of physical skills with self-assessment checklists
- Practical Skills Guide rubrics are aligned to St. John Ambulance evaluation criteria
- No timed mock exam in v1 (can be added in a future phase)
- No manual topic selector in Adaptive Drill — the algorithm decides what surfaces

## Content Architecture
- All content compiled into the build at deployment time — no CMS, no external fetch, no dynamic content API
- Written exam content: multiple-choice and true/false questions with explanations, organized by topic
- Topics: CPR Level C, AED, airway management, bleeding, burns, fractures, shock, medical emergencies, environmental emergencies, poisoning, scene assessment
- Practical content: per-skill structured objects with steps, common errors, and evaluation checkpoints
- Content format: ES module exports (`export const questions = [...]`, `export const skills = [...]`) — no database reads required
- Content is generated via `generate-content-files.md` — a standalone prompt used in a fresh chat before any code is written
- Minimum 131 questions across 11 topics (target 150+); 12 skill objects covering all practical assessment requirements
- Topic ID slugs: cpr, aed, airway, wound, burns, injury, shock, medical, environ, poison, scene

## Analytics
- Estimated written exam score expressed as a percentage with plain-language context
- Topic-by-topic mastery grid: color-coded (red < 50%, yellow 50–80%, green > 80%)
- "Ready to test" banner displayed when all topics exceed 75% mastery
- Top 3 weakest topics surfaced by name in "Focus areas" section
- No raw statistics without plain-language interpretation — analytics explain themselves

## Data and Storage
- Primary store: localStorage — instant reads, zero API calls during any study session
- Cloud backup: Upstash Redis — key-value store, one key per device UUID
- Sync triggered by: manual Save button click or 60-second periodic auto-save interval
- Dirty flag prevents unnecessary Redis writes when data hasn't changed
- Device identified by anonymous UUID generated on first launch and stored in localStorage
- Manual Export/Import JSON button for backup and device migration

## Technical Stack
- React SPA (or Vite + vanilla JS — confirmed in technical planning phase)
- Deployed on Vercel (static frontend + one API route: /api/sync)
- Upstash Redis for cloud backup (free tier, REST API — no SDK required)
- localStorage as primary data layer; in-memory object as session working state
- PWA: manifest.json + service worker with full cache-on-install for offline operation
- UI built from design system references: style-template.md, README.md, CLAUDE.md, SKILL.md

## Infrastructure Setup
- Upstash Redis: provisioned via Upstash MCP or Upstash CLI by Claude Code
- Vercel: project created and env vars injected via Vercel CLI or Vercel MCP by Claude Code
- Env vars required: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
- Zero manual dashboard interaction required from the user
- No paid tiers required for personal single-device use

---

## Section 3: Structured Summary

## 1. Product Vision

### 1.1 Core Problem
Most first aid study resources are passive (manuals, videos) or require active AI involvement. Neither is available offline or optimized for rapid certification readiness. This app provides active retrieval practice with a smart algorithm, available anywhere, anytime, with no external dependencies.

### 1.2 Unique Value
- Mastery-based algorithm outperforms passive reading and simple flashcards for retention
- Covers both written and practical components in a single app
- Instant load, offline-capable, no subscription, no ads, no AI token cost after deployment
- Zero-setup for the user: open the URL, start studying

### 1.3 Success State
A user who studies with this app until all topics show green in analytics should be able to pass the written exam at 80%+ and demonstrate all practical skills with confidence. "Ready to test" is only displayed when the algorithm's mastery data justifies it.

## 2. Certification Target

### 2.1 Written Examination
- Duration: 60 minutes, administered at the start of class
- Passing grade: 70% minimum
- Format: Multiple-choice and true/false questions
- Content source: Full Intermediate First Aid syllabus per St. John Ambulance Alberta

### 2.2 Practical Assessment
- Duration: Minimum 7 hours of student demonstrations
- Requirement: All essential scenarios and individual skills must be demonstrated by each student
- Prerequisite: Written exam must be passed before practical participation begins
- Format: Scenario-based situations and individual skill isolation demonstrations

### 2.3 Certification Issued
Alberta Standard First Aid with Level C CPR & AED

## 3. Adaptive Learning Engine

### 3.1 Algorithm Design Principles
- Testing effect: retrieval practice (answering questions) builds stronger memory than re-reading
- Desirable difficulty: questions that require genuine effort to answer correctly strengthen retention more than easy recall
- Confidence weighting: speed and consistency of correct answers are signals — fast answers after recent misses are not mastery

### 3.2 Question State Machine
- States: New → Active → Near-Mastery → Mastered → Maintenance
- New: never seen by this user
- Active: in regular rotation, weak performance
- Near-Mastery: 2 consecutive correct answers, no recent reversals — one more correct graduates it
- Mastered: 3 consecutive correct across 2+ sessions, no reversals in last 5 exposures
- Maintenance: mastered but reviewed at low frequency; returns to Active on any miss

### 3.3 Session Ordering Logic
- Session start: surface Active questions (lowest mastery score first)
- Mid-session: interleave Near-Mastery questions to test stability
- End of session: brief exposure to a sample of Mastered questions (maintenance)
- Randomized within each tier to prevent answer pattern memorization
- Fast-tap flag: responses < 2 seconds marked low-confidence, not counted toward streak, question repeated in same session

## 4. Content Structure

### 4.1 Written Exam Topics
- CPR Level C: adult, child, and infant, 1-rescuer and 2-rescuer protocols
- AED: operation sequence, safety clearance, pad placement, shock delivery
- Airway management: head-tilt chin-lift, jaw thrust, airway obstructions
- Wound care and bleeding control: direct pressure, wound packing, tourniquet use
- Burns: thermal, chemical, electrical — classification and treatment
- Bone, joint, and muscle injuries: fractures, dislocations, sprains — splinting principles
- Shock: recognition, types, positioning, and treatment priorities
- Medical emergencies: cardiac arrest, stroke (FAST), seizure, diabetic emergencies
- Environmental emergencies: hypothermia, heat stroke, heat exhaustion
- Poisoning and overdose: ingested, inhaled, contact — response priorities
- Scene safety and patient assessment: primary and secondary survey sequence

### 4.2 Practical Skills Coverage
- CPR demonstrations: adult, child, infant; 1-rescuer and 2-rescuer
- AED operation: full sequence from power-on to shock delivery and post-shock CPR
- Recovery position: adult and infant
- Choking response: adult, child, infant — conscious and unconscious
- Bleeding control: direct pressure, elevation, tourniquet application
- Shock positioning and treatment protocol
- Splinting and immobilization: upper limb, lower limb, improvised splints
- Primary and secondary patient survey: verbal and physical assessment sequence
- Scenario flows: multi-step emergency management from scene assessment to handoff

### 4.3 Content File Format

Both files live at `src/data/` and are generated by running `generate-content-files.md` in a fresh chat session before any code is written.

```js
// src/data/questions.js
export const questions = [
  {
    id: "cpr-001",                     // topic-slug + zero-padded number; globally unique
    topic: "CPR Level C",              // exact topic name from Section 4.1
    type: "multiple-choice",           // "multiple-choice" | "true-false"
    question: "...",
    options: ["...", "...", "...", "..."],  // 4 strings for MC; ["True", "False"] for T/F
    correctIndex: 0,                   // 0-based index into options[]; must be valid
    explanation: "..."                 // why correct is correct; what the top wrong answer misses
  }
]

// Topic slug mapping for IDs:
// CPR Level C → "cpr" | AED → "aed" | Airway → "airway" | Wound/Bleeding → "wound"
// Burns → "burns" | Injuries → "injury" | Shock → "shock" | Medical → "medical"
// Environmental → "environ" | Poisoning → "poison" | Scene/Assessment → "scene"

// src/data/skills.js
export const skills = [
  {
    id: "skill-cpr-adult-1rescuer",    // "skill-" + kebab-case; globally unique
    skillName: "Adult CPR — 1 Rescuer",
    category: "CPR",                   // CPR | AED | Airway | Bleeding | Shock | Injuries | Assessment | Environmental
    objective: "...",                  // one sentence: what the evaluator is assessing overall
    steps: [                           // numbered strings in exact clinical sequence
      "1. Ensure scene safety...",
      "2. ..."
    ],
    commonErrors: [                    // realistic errors students make; 3–5 items
      "Insufficient compression depth..."
    ],
    evaluationCriteria: [              // specific, measurable pass/fail checkpoints; 4–7 items
      "Compression rate 100–120 per minute"
    ]
  }
]
```

## 5. User Interface

### 5.1 Navigation Structure
- Bottom navigation bar (mobile-first): Study | Skills | Progress | Settings
- Study tab: opens directly into Adaptive Drill — no landing page, no mode selection screen
- Skills tab: opens Practical Skills Guide with skill category list
- Progress tab: opens Analytics Dashboard
- Settings tab: Export JSON, Import JSON, Manual Save to Redis, Reset Progress

### 5.2 Adaptive Drill Flow
1. Question card displayed with answer options
2. User selects answer → immediate feedback (correct/incorrect + explanation)
3. Brief pause (1.5 seconds) then next question auto-advances
4. Session progress shown as mastery bar at top (questions mastered this session)
5. Session ends when user taps "End session" or reaches configurable session length (default: 20 questions)
6. Post-session summary: questions answered, correct rate, questions graduated this session

### 5.3 Practical Skills Guide Flow
1. Category list (CPR, AED, Bleeding, etc.)
2. Select category → list of skills in that category
3. Select skill → full step-by-step breakdown with numbered steps
4. Checkboxes per step for self-assessment during practice
5. Common errors section with what evaluators specifically look for
6. "Mark as practiced" button (tracks engagement — does not affect mastery algorithm)
7. Evaluation criteria section mirrors the St. John Ambulance rubric

### 5.4 Analytics Dashboard
- Header: "Estimated exam score: X%" — plain-language interpretation below (e.g., "You'd likely pass. Keep drilling Shock and Burns.")
- Topic grid: all topics shown as colored blocks, tap for detail
- Detail view: questions mastered / total, last studied date, top missed questions
- "Focus areas": top 3 topics with lowest mastery scores, named explicitly
- "Ready to test" banner: displayed only when all topics exceed 75% mastery threshold
- Session history: last 7 sessions with date, duration, questions attempted, graduation count

## 6. Data Model

### 6.1 Question Progress Object
```
{
  questionId: string,
  state: "new" | "active" | "near-mastery" | "mastered" | "maintenance",
  exposures: number,
  correctStreak: number,
  sessionHistory: [{ sessionId: string, correct: boolean, responseTime: number }],
  lastResult: "correct" | "incorrect" | null,
  masteredAt: number | null    // Unix timestamp
}
```

### 6.2 Topic Summary Object (derived, not stored — computed on read)
```
{
  topicId: string,
  totalQuestions: number,
  masteredCount: number,
  activeCount: number,
  estimatedScore: number,    // 0–100
  lastStudied: number        // Unix timestamp
}
```

### 6.3 Root Progress Object (localStorage + Redis)
```
{
  deviceId: string,          // anonymous UUID, generated once on first launch
  appVersion: string,        // content version tag for migration handling
  questions: { [questionId]: QuestionProgress },
  sessions: [{
    sessionId: string,
    date: number,
    questionsAttempted: number,
    correctCount: number,
    graduated: string[]      // question IDs that graduated this session
  }],
  lastSynced: number         // Unix timestamp of last successful Redis sync
}
```

## 7. Storage and Sync Architecture

### 7.1 Read Path (Zero Network)
- On app load: deserialize full progress JSON from localStorage into memory
- All reads during study session: in-memory object only — no localStorage reads mid-session
- On session end: write updated in-memory object back to localStorage (one write per session end)

### 7.2 Write Path (Minimal Network)
- Dirty flag: boolean in memory, set true when any progress data changes
- On save button click: if dirty → serialize to JSON → POST to /api/sync → on success, update lastSynced + clear dirty flag
- Periodic auto-save: 60-second setInterval, same logic as save button — only fires if dirty flag is true
- /api/sync handler: validates deviceId format → writes JSON to Upstash key `progress:{deviceId}` → returns 200

### 7.3 Restore Path
- On app load: if localStorage progress is empty or missing → fetch from /api/sync (GET with deviceId)
- If Redis has data: prompt user "Backup found from [date]. Restore?" → on confirm, load into localStorage
- If Redis has no data: start fresh (new user state)

### 7.4 Conflict Avoidance
- Single device, no auth: localStorage is always the source of truth
- Redis is write-on-save, read-only-on-restore — no bidirectional sync complexity

## 8. Infrastructure and Deployment

### 8.1 Vercel Project Structure
```
/
├── public/
│   ├── manifest.json
│   ├── sw.js              (service worker)
│   └── icons/
├── src/
│   ├── data/
│   │   ├── questions.js
│   │   └── skills.js
│   ├── engine/
│   │   └── algorithm.js
│   ├── store/
│   │   └── progressStore.js
│   ├── components/
│   │   ├── AdaptiveDrill.jsx
│   │   ├── PracticalSkillsGuide.jsx
│   │   ├── AnalyticsDashboard.jsx
│   │   └── SettingsPanel.jsx
│   └── App.jsx
└── api/
    └── sync.js            (Vercel serverless function)
```

### 8.2 Upstash Redis Configuration
- Instance: free tier (10,000 commands/day — sufficient for personal use)
- Key pattern: `progress:{deviceId}` → JSON string value
- TTL: none (data persists indefinitely)
- API calls: REST only — no Upstash SDK required in the API route

### 8.3 Vercel Environment Variables
- UPSTASH_REDIS_REST_URL: REST endpoint URL from Upstash dashboard (set via CLI)
- UPSTASH_REDIS_REST_TOKEN: read-write token (set via CLI, never exposed to frontend)
- Both injected by Claude Code via `vercel env add` commands during infrastructure setup phase

### 8.4 PWA Configuration
- manifest.json: name, short_name, icons (192px + 512px), theme_color, display: standalone, start_url: /
- Service worker: cache-on-install strategy — all static assets and content JS cached at install time
- Offline fallback: full app functional offline after first load
- HTTPS: required for service worker — Vercel provides HTTPS automatically

## 9. Build Process

### 9.1 Planning Methodology
- Expansive prompting: start from one certainty, derive the next with equal certainty
- Each planning phase is a fresh chat session — no context carryover between phases
- Phases proceed until the document for each phase contains zero ambiguity
- Build does not start until all planning phases are complete and reviewed

### 9.2 Planning Phase Sequence
1. **Content generation** ← START HERE: run `generate-content-files.md` in a fresh chat to produce `src/data/questions.js` and `src/data/skills.js` — nothing else begins until these files are complete and reviewed
2. Data model specification: finalize all TypeScript-style interfaces and storage schemas
3. Algorithm specification: define exact mastery thresholds, state transitions, and session ordering rules
4. UI specification: wireframes for all 4 tabs using design system references
5. Infrastructure specification: exact CLI commands for Upstash + Vercel setup
6. Build task breakdown: convert spec into numbered, atomic build tasks

### 9.3 Build Task Granularity Rules
- Each task: one file, one function, or one configuration change
- Each task includes: file path, exact change description, expected output, verification step
- No task requires the executor to make a design decision — all decisions are resolved in planning
- Tasks are ordered by dependency: data → engine → store → components → PWA → deploy

## 10. UI Design System

### 10.1 Reference Files
- `UI references/design-system/style-template.md` — component patterns and design tokens
- `UI references/design-system/README.md` — design system usage guide
- `UI references/design-system/CLAUDE.md` — Claude-specific implementation instructions
- `.claude/commands/skills/SKILL.md` — frontend-design skill (invoked before any frontend code)

### 10.2 Design Constraints for This App
- Mobile-first: primary device is a phone, minimum supported width 375px
- No generic Tailwind defaults: custom brand color palette derived from a medical/emergency theme
- Typography: distinct display font for headings, clean sans for body — never the same font for both
- Tap targets: minimum 44x44px for all interactive elements (WCAG mobile standard)
- Performance: no layout-triggering animations; only transform and opacity transitions
- Readability: designed for use in variable lighting, including outdoor or low-light scenarios

---

## Section 4: Complete Vision Expansion

### Explicit Non-Goals
1. The app does not teach first aid through video — all content is text-based with structured step lists and diagrams described in text.
2. The app does not verify practical skill execution — it guides and prompts self-assessment; it cannot observe the user's physical performance.
3. The app does not provide a timed mock written exam in v1 — this is a future phase addition if needed.
4. The app does not support multiple users or shared accounts — it is single-device, single-user with no login or profile system.
5. The app does not dynamically update its content — questions and skills are compiled into the build; content changes require a new deployment.
6. The app does not connect to or communicate with St. John Ambulance systems — it is not affiliated with or endorsed by the certifying body.
7. The app does not gamify with points, badges, leaderboards, or streaks visible to others.
8. The app does not collect any personal data — no name, email, location, or identifiable information is stored anywhere.
9. The app does not provide medical advice — it is an exam preparation tool, not a clinical reference.
10. The app does not require account creation, registration, or any user-provided information to function.

### Edge Case Handling
**localStorage cleared**: Device UUID and all progress are lost. On next load, the app detects empty storage. If the device UUID was backed up to Redis (it should be stored separately in IndexedDB or a cookie for durability), it fetches the backup and offers restore. If no backup is retrievable, the app starts fresh with a new UUID. A prominent "Export progress" reminder in Settings mitigates this risk.

**Redis sync failure on auto-save**: The failure is logged silently in memory. The dirty flag remains true. No error is shown to the user during a study session — the sync retries on the next interval or the next manual save. A small indicator in Settings shows "Last synced: X minutes ago" so the user can notice if sync has been failing.

**App loaded fully offline (no service worker yet)**: On first-ever load, the app requires network to cache assets. Subsequent loads are fully offline. A first-load offline attempt shows a standard browser offline error — this is acceptable and documented as expected behavior.

**User taps through questions rapidly**: Responses under 2 seconds are flagged as low-confidence. These do not count toward mastery streaks. If 3 consecutive low-confidence responses are detected in a session, a brief prompt appears: "Take your time — fast answers won't count toward mastery." The question is repeated later in the same session.

**All questions mastered**: The app enters a congratulations state. Estimated exam score displays at 90%+. Maintenance mode activates automatically — mastered questions are reviewed at low frequency (1–2 per session). The Adaptive Drill mode remains available and continues maintenance cycling. "Ready to test" banner is displayed prominently.

**Content file is incomplete at build time**: If questions.js has fewer than 5 questions for a topic, that topic is flagged as "Limited coverage" in analytics and excluded from the estimated exam score calculation until it has sufficient data. This prevents the algorithm from over-drilling the few available questions and creating false mastery signals.

**Device change**: No seamless migration (no auth). The Settings panel provides an "Export Progress" button that downloads a JSON file. The user can transfer this file to a new device and import it via "Import Progress." The import validates the JSON schema before applying to prevent corruption.

**Question answer options in wrong order**: The algorithm seeds answer randomization per question per session using the session ID — options are shuffled differently each session to prevent position-based pattern memorization, but consistently within a single session viewing.

### Key Design Principles
1. **Algorithm over willpower**: The user should never have to decide what to study. The adaptive engine surfaces exactly what needs the most work. No manual topic selector exists in the Adaptive Drill — removing this choice reduces decision fatigue and prevents users from avoiding their weak areas.

2. **Content is the foundation**: The entire app depends on having a complete, accurate, and well-structured question bank and skills library before any code is written. The content-writing phase is Phase 1 of the build plan — nothing else starts until it is done and reviewed.

3. **Offline-first, sync-second**: Every interaction must work with zero connectivity after first load. localStorage and the in-memory object are always the authoritative source of truth. The Redis sync is a safety net, not a dependency.

4. **Zero friction to start**: The user opens the URL and is immediately in a study session. No onboarding flow, no tutorial, no required setup. The first screen is a question.

5. **Transparency without complexity**: Analytics explain themselves. Every number comes with a plain-language interpretation. A user who has never seen an analytics dashboard must be able to understand their readiness in under 10 seconds.

6. **Build for Haiku, quality-check for Sonnet**: Each build task is specified so precisely that it could be executed correctly by a less capable model. Ambiguity is resolved in the planning phase, not during execution. This makes builds faster, cheaper, and more reliable.

### Component and Document Relationships

```
App Shell (PWA)
├── Bottom Nav
│   ├── /study  ──────────── AdaptiveDrill
│   │                         ├── algorithm.js     ← questions.js (content)
│   │                         ├── progressStore.js ← localStorage
│   │                         └── QuestionCard, FeedbackOverlay, SessionSummary
│   │
│   ├── /skills ──────────── PracticalSkillsGuide
│   │                         ├── skills.js (content)
│   │                         └── SkillDetail, StepChecklist, EvalCriteria
│   │
│   ├── /progress ────────── AnalyticsDashboard
│   │                         ├── progressStore.js (read)
│   │                         ├── scoreEstimator.js (derived calc)
│   │                         └── TopicGrid, FocusAreas, SessionHistory
│   │
│   └── /settings ────────── SettingsPanel
│                              ├── progressStore.js (export/import/reset)
│                              └── syncService.js (manual save trigger)
│
├── /api/sync (Vercel serverless)
│    └── Upstash Redis ─────── key: progress:{deviceId}
│
Content Layer:
  questions.js ──→ algorithm.js ──→ progressStore ──→ AnalyticsDashboard
  skills.js    ──→ PracticalSkillsGuide

Storage Layer:
  progressStore ──→ localStorage (primary, instant)
  progressStore ──→ syncService ──→ /api/sync ──→ Upstash Redis (backup)

Planning Artifacts:
  generate-content-files.md ──→ src/data/questions.js + src/data/skills.js  ← Phase 1 prompt (exists)
  data-model-spec.md ──→ progressStore.js schema
  algorithm-spec.md ──→ algorithm.js implementation
  ui-spec.md ──→ all component implementations
  infra-spec.md ──→ Vercel + Upstash setup commands
  build-tasks.md ──→ numbered atomic execution steps
```

### Success Criteria
- App loads in under 2 seconds on mobile on first visit; under 0.5 seconds on repeat visits (service worker cache hit)
- All questions and skills are fully accessible offline after first load — verified by disabling network in DevTools
- Algorithm correctly surfaces low-mastery questions more frequently — verifiable by reviewing session log data in Settings
- Progress persists correctly across browser close/reopen without any user action
- Redis sync completes within 1 second on save button click; no UI blocking occurs during sync
- Estimated exam score correlates within 10% of actual mastery percentage across all topics
- Practical Skills Guide covers 100% of skills listed in the St. John Ambulance Intermediate First Aid evaluation rubric
- UI renders correctly on iOS Safari and Android Chrome at 375px minimum viewport width
- App passes full PWA installability checklist: valid manifest, registered service worker, HTTPS, correct icons
- All 4 navigation tabs load without error in under 300ms after initial app load

### Open Questions and Assumptions
1. **Content source (RESOLVED)**: `generate-content-files.md` exists in the project root and is the designated Phase 1 prompt. Paste it into a fresh chat to produce `src/data/questions.js` (131+ questions across 11 topics) and `src/data/skills.js` (12 skill objects). Both files use ES module export syntax and conform to the schemas defined in Section 4.3. Review both files for clinical accuracy before proceeding to Phase 2 — content correctness cannot be validated by code review alone.

2. **Framework choice (HIGH)**: This document assumes a React-based SPA (likely Vite + React). The actual framework is not confirmed. **Assumption: React with Vite** is used based on ecosystem fit with Vercel and the design system references. **Wrong assumption impact: high** — all component build tasks are framework-specific; changing frameworks invalidates them.

3. **Algorithm mastery threshold (MEDIUM)**: "3 consecutive correct answers across 2+ sessions" is an assumed threshold. The exact number (2, 3, or 4) should be validated during algorithm specification. **Wrong assumption impact: medium** — affects how long users spend in the drill before reaching mastery, but does not break functionality.

4. **DeviceId durability (MEDIUM)**: The plan assumes localStorage is sufficient for the device UUID. If localStorage is cleared (same event that clears progress), the UUID is lost and Redis backup is unretrievable without it. **Mitigation assumption: store UUID in both localStorage and a separate cookie (7-year expiry)** to increase durability. This must be resolved in the data model spec phase.

5. **Upstash free tier ceiling (LOW for personal use)**: The free tier supports 10,000 Redis commands/day. At 1 command per 60-second auto-save, a 3-hour study session generates 180 commands. This is well within limits for a single user. **Assumption invalidated if**: the app is shared publicly and used by more than ~50 simultaneous users — at that scale, a paid Upstash plan is needed.

6. **St. John Ambulance syllabus currency (MEDIUM)**: Content must match the current published syllabus. St. John Ambulance Alberta updates course content periodically. **Assumption: content is accurate as of build date.** A `contentVersion` field and `lastUpdated` date in questions.js documents this. A note in the app's Settings screen should display the content version date so the user knows when it was last verified.

7. **Service worker caching size (LOW)**: Full cache-on-install is assumed. If questions.js + skills.js combined exceed 5MB, the initial cache may be slow on mobile. **Assumption: combined content is under 1MB** (typical for text-based Q&A content). Measure actual file sizes after content is written and adjust strategy if needed.

8. **Score estimation formula (MEDIUM)**: The algorithm for translating mastery data into an "estimated exam score" is not defined. **Assumption: weighted average of per-topic mastery percentages**, where topics with more questions carry more weight. The exact weighting formula must be specified in the algorithm spec phase, or the estimate will be misleading.
