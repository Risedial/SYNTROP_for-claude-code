# Brain Dump Analysis — First Aid Study PWA

**Analyzed:** 2026-04-17
**Mode:** Review (prepared brain dump — structured input)

---

## What the User Wants to Build

A mobile-first Progressive Web App that replaces an existing Claude Code slash command (`/first-aid-study`) with a permanently deployed, offline-capable study tool. The app targets a single specific certification: Alberta Standard First Aid Level C CPR & AED administered by St. John Ambulance Alberta. It is a personal tool — single user, single device, no accounts, no sharing.

The core innovation is a mastery-based adaptive algorithm (not spaced repetition) that measures question mastery through performance patterns: streaks, reversals, and near-miss detection. Questions cycle through a five-state machine (New → Active → Near-Mastery → Mastered → Maintenance) and graduate only when the user demonstrates consistent correct recall across multiple sessions. There are exactly two study modes: Adaptive Drill (algorithm-controlled) and Practical Skills Guide (step-by-step walkthroughs for the physical skills assessment).

---

## What's Clear and Well-Defined

The brain dump is exceptionally thorough. The following areas are fully resolved and require no clarification:

- **Purpose**: Replace a token-consuming AI command with a zero-marginal-cost deployed app
- **Audience**: Single user, personal device, no authentication required
- **Content**: Already written — `zzz/questions.js` (131+ questions, 11 topics) and `zzz/skills.js` (12 skills)
- **Design system**: Already defined — `zzz/design-system/style-template.md` (dark base #0D0D0D, purple accent #7C6AE8)
- **Algorithm structure**: Five-state question machine, fast-tap detection, session ordering by tier
- **Storage strategy**: localStorage primary, Upstash Redis backup via `/api/sync` serverless route
- **Navigation**: Four tabs — Study | Skills | Progress | Settings
- **Analytics requirements**: Exam score %, topic color grid, "Ready to test" banner, top 3 weak topics
- **Infrastructure**: Vercel + Upstash Redis (free tier), zero manual dashboard interaction
- **PWA requirements**: manifest.json + service worker, cache-on-install, full offline after first load
- **Non-negotiables**: No gamification, no video, no accounts, no AI calls post-deployment, no timed mock exam in v1
- **Build methodology**: Atomic tasks, one file/function per task, all decisions resolved before execution

---

## What Needs Clarification

Six uncertainties were explicitly flagged in the brain dump. All are resolvable with a single decision each:

1. **Framework** (HIGH impact) — React + Vite is assumed but not confirmed. Invalidates all component planning if wrong.
2. **Mastery threshold numbers** (MEDIUM) — "3 consecutive correct, 2+ sessions, no reversals in last 5" is an assumption. Exact numbers affect algorithm specification.
3. **DeviceId durability** (HIGH) — localStorage UUID is lost on clear. The spec assumes localStorage + cookie (7-year expiry) but this is unresolved.
4. **Score estimation formula** (MEDIUM) — Weighted by question count per topic is assumed but not decided. Formula choice affects how misleading the estimate can be.
5. **Service worker strategy if content > 5MB** (LOW for now) — Files assumed to be <1MB. If they're larger, caching strategy changes. Can be deferred to build phase after measuring.
6. **Infrastructure provisioning sequence** (MEDIUM) — Upstash MCP + Vercel CLI is the target path but the exact command sequence is unresolved.

---

## Feasibility & Scope Assessment

**Feasibility:** High. This is well within a single-developer build using Claude Code assistance. All content and design assets are pre-built. The technical stack (React + Vite + Vercel + Upstash) is mature and well-documented.

**Scope:** Medium. The mastery algorithm is the most complex piece; everything else is standard PWA development. The Redis sync architecture requires care (dirty flag, conflict resolution, offline-first logic) but is scoped appropriately for a single-user app.

**Risk areas:**
- Algorithm correctness: mastery thresholds need to be deliberately chosen — too easy and the user under-prepares; too hard and motivation suffers
- DeviceId durability: if not handled correctly, the user loses Redis association on localStorage clear, defeating the backup purpose
- Offline reliability: service worker cache invalidation on content updates requires a versioning strategy

**Pre-existing work reduces scope significantly:** Content, design, and project spec are all complete. The orchestration system starts at data model specification, not content generation.
