# SINGLE SOURCE OF TRUTH
## First Aid Study PWA

**Version:** 1.0 — Intake Phase
**Date:** 2026-04-17
**Project ID:** fap-2026-0417-001
**Status:** Awaiting user approval

---

### 1. Vision Statement

The First Aid Study PWA is a mobile-first Progressive Web App that permanently replaces an AI-token-consuming Claude Code slash command (`/first-aid-study`) with a self-contained, offline-capable study system. All study content is embedded directly in the application at build time — there are no external API calls, no AI integrations, and no internet connection required during use. The app is deployed once on Vercel and usable indefinitely at zero marginal cost per session.

The app's purpose is to take a single user from zero knowledge to full certification readiness for the Alberta Standard First Aid Level C CPR & AED credential administered by St. John Ambulance Alberta. It covers both the written exam (60 minutes, 70% minimum pass) and the practical skills assessment (7+ hours, all skills must be demonstrated). The app is a personal tool — one device, one user, no accounts, no sharing. It opens immediately to a quiz question, requiring zero onboarding or setup.

The core innovation is a mastery-based adaptive algorithm that tracks question mastery through performance patterns (streaks, reversals, near-miss detection) rather than calendar intervals. Questions move through a five-state machine and are never permanently removed — they cycle into low-frequency maintenance review once mastered, returning to active rotation on any deliberate miss. The algorithm has complete control over what appears in each session; the user never chooses topics manually in the primary study mode.

---

### 2. Target Audience

- **Primary User:** Single individual preparing for Alberta Standard First Aid Level C CPR & AED certification via St. John Ambulance Alberta. Technically capable (uses Claude Code daily). Studies on mobile, primarily iOS Safari and Android Chrome.
- **Secondary Users:** None. This is a personal tool with no multi-user capability.
- **User Persona:** Certification candidate who wants active recall practice, offline access, and a data-driven readiness signal — not passive reading or video content.

---

### 3. Core Features (MVP)

1. **Adaptive Drill Mode** (FR-001, FR-003–FR-008)
   - Algorithm-controlled question presentation; no topic selector
   - Five-state question machine: New → Active → Near-Mastery → Mastered → Maintenance
   - Mastery thresholds: 2 consecutive correct → Near-Mastery; 3 consecutive correct across 2+ sessions, no reversals in last 5 → Mastered
   - Fast-tap detection: responses <2s are flagged low-confidence, excluded from mastery streaks, and repeated in the same session
   - Session ordering: Active first (lowest mastery), Near-Mastery interleaved, Mastered/Maintenance briefly at end; randomized within tier by session ID seed
   - Maintenance scheduling: Mastered questions reviewed every 10 sessions
   - Maintenance demotion: any deliberate miss (≥2s) demotes to Active; fast-tap miss repeats in session only

2. **Practical Skills Guide** (FR-002)
   - Step-by-step walkthroughs for all 12 practical assessment skills
   - Ordered steps, common errors, self-assessment checklists per skill
   - Text-based only; no video

3. **Progress & Analytics** (FR-014–FR-017)
   - Estimated exam score: `sum(topic_mastery% × topic_question_count) / total_questions`
   - Topic color grid: red <50%, yellow 50–80%, green >80% (11 topics)
   - "Ready to test" banner when all topics exceed 75% mastery
   - Top 3 weakest topics displayed by name

4. **Offline-First PWA** (FR-019–FR-020)
   - manifest.json enabling home screen installation on iOS Safari and Android Chrome
   - Service worker caches all app assets on install; full offline after first load
   - No network requests required to study after first visit

5. **Progress Sync** (FR-009–FR-013, FR-021–FR-023)
   - localStorage as primary store; all session reads from localStorage/in-memory
   - Anonymous device UUID stored in localStorage + 7-year SameSite=Strict cookie (cookie re-seeds localStorage if cleared)
   - Dirty flag prevents unnecessary Redis writes
   - Auto-sync to Redis every 60 seconds when dirty; manual sync via Settings
   - One-tap restore from Redis backup in Settings
   - Single serverless route `/api/sync` (GET to fetch, POST to write)
   - Upstash Redis provisioned via Upstash MCP; Vercel deployment via Vercel CLI

6. **Four-Tab Navigation** (FR-018)
   - Bottom nav: Study | Skills | Progress | Settings
   - Mobile-first; min viewport 375px

7. **Settings Tab** (FR-026–FR-027)
   - Manual save button (triggers immediate Redis sync)
   - Restore from backup button (one-tap Redis restore with confirmation)
   - Content version display (from questions.js version field)

---

### 4. Additional Features (Post-MVP)

- Timed mock written exam (explicitly excluded from v1; future addition only)
- Gamification elements (points, badges, streaks display) — explicitly excluded

---

### 5. Technical Requirements

#### Stack
- **Framework:** React + Vite (locked — confirmed Q1:A)
- **Language:** TypeScript or JavaScript (to be decided in architecture phase)
- **Deployment:** Vercel (Hobby free tier)
- **Database:** Upstash Redis (free tier, 10,000 commands/day)
- **Build:** Vite; content files as ES module imports compiled into bundle

#### Performance
- First visit load: <2s to first quiz question (NFR-001)
- Repeat visit (service worker cache): <0.5s (NFR-002)
- Tab switch after initial load: <300ms (NFR-003)
- Redis sync on manual save: <1s, non-blocking UI (NFR-004)

#### Scalability
- Single user, single device. No multi-user scaling required.
- Daily Redis usage well within free tier (10,000 commands/day) for one user's study patterns (NFR-010)

#### Security
- No personal data collected (NFR-008)
- Anonymous device UUID only (random, no PII)
- Cookie: SameSite=Strict, no HttpOnly needed (UUID is not a secret credential)
- Redis key is the device UUID; no authentication beyond UUID matching

#### Compatibility
- Minimum viewport: 375px (NFR-005)
- Primary browsers: iOS Safari (latest) and Android Chrome (latest) (NFR-006)
- PWA installable on both platforms (FR-019)

#### Reliability
- Full offline functionality after first load (NFR-009)
- Service worker caches all assets on install
- App opens immediately to quiz question with zero setup (NFR-007)

---

### 6. Constraints

| ID | Type | Constraint |
|----|------|------------|
| CON-001 | Technology | React + Vite is the locked framework — all component and build decisions use this stack |
| CON-002 | Budget | Zero paid infrastructure — Upstash free tier + Vercel Hobby only |
| CON-003 | Platform | Zero manual dashboard interaction — all provisioning via Upstash MCP server + Vercel CLI |
| CON-004 | Technology | Build-time content only — no CMS, no content API; content changes require redeployment |
| CON-005 | Regulatory | User must verify clinical accuracy of questions.js and skills.js before build proceeds — this is a hard gate |
| CON-006 | Team | Every build task must be atomic enough for a less-capable model: one file or one function, all decisions pre-resolved |
| CON-007 | Technology | frontend-design skill must run before any React component is written; design system from zzz/design-system/style-template.md must be fully implemented |
| CON-008 | Scope | Content generation is complete — orchestration begins at data model specification (planning phase 2) |

---

### 7. Success Criteria

| ID | Criterion | How to Measure |
|----|-----------|---------------|
| SC-001 | App opens to a quiz question immediately, zero interactions required | First visible element after load is a question card |
| SC-002 | Full offline use after first visit | All four tabs functional in airplane mode after one prior online load |
| SC-003 | Progress persists across browser close/reopen | Question state counts match before and after closing the browser |
| SC-004 | One-tap Redis restore recovers all data after localStorage clear | After clearing localStorage and tapping Restore, all states are recovered |
| SC-005 | Analytics shows readiness signal at 80%+ after sufficient study | "Ready to test" banner visible, estimated score ≥80%, all topics green |
| SC-006 | PWA installable on iOS Safari and Android Chrome | Install prompt on Android; Add to Home Screen works on iOS; standalone mode confirmed |
| SC-007 | Infrastructure provisioned with zero manual dashboard interaction | User does not open vercel.com or upstash.com at any point during setup |

---

### 8. Vision Anchors

These are non-negotiable. Every subsequent phase decision must be checked against them.

1. **Permanent replacement** — The PWA replaces the `/first-aid-study` Claude Code command permanently. Every architectural decision should optimize for zero ongoing cost and maximum durability.
2. **Performance-based mastery** — The algorithm measures mastery through streaks and reversals, never by calendar. Timed spaced repetition is explicitly excluded.
3. **Single user, no accounts** — There is exactly one user. No authentication system, no account creation, no personal data of any kind.
4. **Offline first** — The app must be fully usable offline after the first visit. Network connectivity is never required to study.
5. **Zero manual setup** — The user will not touch any cloud dashboard. All infrastructure is provisioned by Claude Code.
6. **User-verified content** — Clinical accuracy of study content cannot be code-reviewed. User sign-off on content is a hard gate before build.
7. **React + Vite is locked** — This decision is final. Revisiting it invalidates all component planning.
8. **Atomic build tasks** — Every implementation task must be completable by a less-capable model without ambiguity. No hand-wavy tasks.

---

### 9. Assumptions

The following are assumed to be true and must be validated during architecture/execution phases:

- **A1:** Combined content files (questions.js + skills.js + app bundle) are under 5MB — if above 5MB, the service worker cache-on-install strategy must be reconsidered.
- **A2:** Upstash MCP server is accessible and can provision a Redis database via Claude Code without requiring user authentication. If not, the infrastructure provisioning plan must fall back to Vercel KV via CLI.
- **A3:** Vercel CLI can set environment variables non-interactively (via `--env` flags or `.env` file injection) without dashboard access.
- **A4:** The 11 topics in questions.js (cpr, aed, airway, wound, burns, injury, shock, medical, environ, poison, scene) have unequal question counts — the weighted score formula meaningfully differs from equal weighting. If all topics are equal size, equal weighting is acceptable as a fallback.
- **A5:** iOS Safari does not clear SameSite=Strict cookies under the same conditions it clears localStorage — the cookie provides genuine additional durability. If this assumption is false, IndexedDB should be evaluated as the backup store.
- **A6:** TypeScript vs. plain JavaScript decision is deferred to the architecture phase. Both are valid with React + Vite.

---

### 10. Out of Scope

The following are explicitly excluded from this project:

- Timed mock written exam (future v2 addition)
- Gamification (points, badges, leaderboards, visible streaks)
- Video content (text-based only)
- Multiple users or shared accounts
- Authentication or login system
- Dynamically updated content (CMS)
- Any communication with St. John Ambulance systems
- Personal data collection (name, email, location, etc.)
- AI API calls during app use after deployment
- Account creation or registration
- Blind finger sweeps (content rule in skills.js, not a software feature)

---

### Pre-Existing Work (Do Not Rebuild)

| File | Status | Notes |
|------|--------|-------|
| `zzz/questions.js` | Complete | 131+ questions, 11 topics — move to `src/data/questions.js` |
| `zzz/skills.js` | Complete | 12 skill objects — move to `src/data/skills.js` |
| `zzz/design-system/style-template.md` | Complete | Full design token system; read before any frontend code |
| `zzz/design-system/CLAUDE.md` | Complete | Frontend implementation rules; invoke `frontend-design` skill first |
| `zzz/first-aid-study-pwa.md` | Complete | Full project spec; reference for planning details |

**Planning sequence for research/architecture phases:**
1. ~~Content generation~~ — DONE
2. Data model specification ← **START HERE**
3. Algorithm specification
4. UI specification
5. Infrastructure specification
6. Build task breakdown
