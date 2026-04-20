# Project Brain Dump

## Core Vision

A Progressive Web App (PWA) for mobile that functions as a standalone, self-contained first aid study system — designed to replace a current Claude Code command (`/first-aid-study`) that performs the same function but consumes tokens and requires active AI involvement. All study content is embedded directly in the application at build time. The app takes a user from zero first aid knowledge to full certification readiness for the Alberta Standard First Aid Level C CPR & AED credential administered by St. John Ambulance Alberta, covering both the written exam and the practical skills assessment. No AI integrations, no external API dependencies, and no internet connection required during use.

## The Problem Being Solved

The existing study tool is a Claude Code slash command (`/first-aid-study`) that burns tokens and requires an active AI session to function — it can't be used offline, has latency, and costs compute every session. The replacement must be a deployed app that works instantly, offline, at zero marginal cost after initial deployment. Passive study resources (manuals, videos) don't build the active recall needed to pass a timed written exam. A mastery-based algorithm that surfaces weak areas and tracks performance across sessions is significantly more effective than passive review.

## Who It's For

Personal use only. Single device, single user. No accounts, no login, no sharing. This is a personal study tool for one specific certification exam.

## What Done Looks Like

- Open the URL on mobile and be immediately looking at a quiz question — zero onboarding, zero setup
- Study across multiple sessions; the app remembers exactly where every question stands in the mastery cycle
- After enough sessions, open the Analytics tab and see "Ready to test" with all topics showing green and an estimated exam score at 80%+
- Walk into the written exam and pass at 70%+ minimum; walk into the practical assessment able to demonstrate every required skill with confidence
- If the phone's localStorage is ever cleared, restore full progress from Redis backup with one tap
- Install the app to the home screen and use it fully offline anywhere — waiting room, on a break, etc.

## What I Know I Want (Non-Negotiables)

- **Mastery-based algorithm, not timed spaced repetition**: questions stay in rotation until consistent correct recall is proven across sessions; mastery is measured by performance patterns (streaks, reversals, near-misses), not calendar intervals
- **Question state machine**: New → Active → Near-Mastery → Mastered → Maintenance; graduated questions enter maintenance (low-frequency review) and return to Active on any miss
- **Fast-tap detection**: responses under 2 seconds flagged low-confidence, excluded from mastery streaks, question repeated in same session
- **Session ordering**: Active questions first (lowest mastery), interleave Near-Mastery mid-session, brief Mastered maintenance at end; randomized within tier each session using session ID as seed
- **Two study modes only**: Adaptive Drill (primary — algorithm controls everything) and Practical Skills Guide (step-by-step walkthroughs with self-assessment checklists)
- **No manual topic selector in Adaptive Drill** — algorithm decides what surfaces; user never chooses
- **Analytics must be human-readable**: estimated exam score as %, topic-by-topic color-coded grid (red <50%, yellow 50–80%, green >80%), "Ready to test" banner when all topics exceed 75%, top 3 weakest topics named
- **Bottom navigation**: Study | Skills | Progress | Settings — four tabs, mobile-first
- **localStorage primary, Redis backup**: all reads during sessions from localStorage/in-memory; Redis syncs on manual save or 60-second interval; dirty flag prevents unnecessary writes
- **Zero manual infrastructure setup**: Upstash Redis provisioned and Vercel configured entirely via MCP/CLI by Claude Code, no dashboard interaction from user
- **Deployed on Vercel** with one serverless API route (`/api/sync`) for Redis sync
- **PWA**: manifest.json + service worker with full cache-on-install; offline after first load
- **No auth, no accounts, no personal data collected** — anonymous device UUID only
- **Content already exists**: `zzz/questions.js` (131+ questions, 11 topics) and `zzz/skills.js` (12 skill objects) are written and ready; they just need to be moved/referenced
- **Design system already exists**: `zzz/design-system/style-template.md` defines the full design language — dark base `#0D0D0D`, purple accent `#7C6AE8`, Syne + DM Sans fonts; must be applied using the `frontend-design` skill before any frontend code is written
- **Build-time content only**: no CMS, no content API, no dynamic content fetching — questions and skills are ES module exports compiled into the build
- **Content version field** in questions.js and Settings screen display — documents when content was last verified against current St. John Ambulance syllabus

## What I'm Uncertain About

- **Framework finalized as React + Vite** — explicitly stated in the spec as an assumption marked HIGH impact. This needs to be confirmed before any component build tasks are written. Wrong assumption invalidates all component work.
- **Exact mastery threshold numbers**: "3 consecutive correct across 2+ sessions, no reversals in last 5 exposures" is an assumed threshold marked MEDIUM — exact numbers (2, 3, or 4) should be validated during algorithm specification
- **DeviceId durability strategy**: spec notes that localStorage UUID is lost if localStorage is cleared; assumes storing UUID in both localStorage AND a cookie (7-year expiry) as mitigation — must be resolved in data model spec phase
- **Score estimation formula**: "weighted average of per-topic mastery percentages, where topics with more questions carry more weight" is an assumption marked MEDIUM — exact weighting formula must be specified or the estimate will be misleading
- **Service worker caching strategy**: assumed combined content files are under 1MB — actual file sizes must be measured after content is placed; strategy adjusts if >5MB
- **Infrastructure provisioning sequence**: exact CLI command sequence for Upstash MCP + Vercel CLI needs to be determined; zero-manual-interaction requirement is firm but exact tooling path is open

## What I Don't Want

- No timed mock written exam in v1 (future phase addition only)
- No gamification (points, badges, leaderboards, visible streaks)
- No video content — text-based only with structured step lists
- No multiple users, shared accounts, or any authentication system
- No dynamically-updated content — content changes require new deployment
- No affiliation or communication with St. John Ambulance systems
- No personal data collection of any kind (no name, email, location, or identifiable information)
- No AI API calls during app use after deployment
- No account creation or registration requirement
- No blind finger sweeps (this is a content rule in skills.js, not a software rule — noted for completeness)

## Existing Context

- **Replacement target**: existing Claude Code slash command `/first-aid-study` — this app makes that command obsolete
- **Content files already written and in `zzz/` folder**:
  - `zzz/questions.js` — 131+ multiple-choice and true/false questions across 11 topics (cpr, aed, airway, wound, burns, injury, shock, medical, environ, poison, scene) as ES module export; file is large (~26k tokens)
  - `zzz/skills.js` — 12 practical skill objects with steps, common errors, and evaluation criteria for all St. John Ambulance assessment skills, as ES module export
- **Design system files already written and in `zzz/design-system/`**:
  - `zzz/design-system/style-template.md` — complete design token system (colors, typography, spacing, components, motion) derived from 5 UI reference screenshots of a dark-mode quiz/learning app
  - `zzz/design-system/README.md` — usage guide for the design system
  - `zzz/design-system/CLAUDE.md` — Claude-specific implementation instructions (frontend-design skill required before any frontend code)
- **Planning methodology already defined in `zzz/first-aid-study-pwa.md`**: zero-ambiguity, expansive prompting; sequential fresh chat sessions for each planning phase; modular atomic build tasks; each task must be specified precisely enough for a less-capable model to execute correctly
- **Certification target is specific**: Alberta Standard First Aid Level C CPR & AED, Intermediate First Aid recertification format, administered by St. John Ambulance Alberta; written exam 60 min, 70% minimum pass; practical 7+ hours, all skills must be demonstrated

## Scale & Constraints

- **Scale**: single user, personal device, free-tier infrastructure (Upstash free: 10,000 commands/day; well within limits for one user)
- **Platform**: mobile-first PWA; minimum supported viewport 375px; primary browsers iOS Safari and Android Chrome
- **Performance targets**: <2s load on first visit, <0.5s on repeat (service worker cache hit), all 4 nav tabs load in <300ms after initial app load
- **Technical constraint**: Redis sync must complete in <1 second on save button click without UI blocking
- **Infrastructure constraint**: zero paid tiers required; zero manual dashboard interaction from user
- **Build constraint**: each build task must be granular enough for a less-capable model to execute — one file or one function per task, all decisions resolved in planning before execution begins
- **Content constraint**: content correctness cannot be validated by code review; clinical accuracy of questions.js and skills.js must be verified by the user before build proceeds

## Project Type Signal

- Software / Application (PWA — mobile-first web app, offline-capable, deployed on Vercel)

This project will produce a deployed Progressive Web App intended to replace an AI-token-consuming study command with a permanent, offline-capable, mastery-based first aid certification study tool.

---

## Existing Artifacts Summary (for intake phase reference)

The following files already exist in the workspace and represent completed work that does NOT need to be redone:

| File | Status | Notes |
|------|--------|-------|
| `zzz/questions.js` | Complete | 131+ questions, 11 topics, ES module export — move to `src/data/questions.js` |
| `zzz/skills.js` | Complete | 12 skill objects, all practical assessment skills — move to `src/data/skills.js` |
| `zzz/design-system/style-template.md` | Complete | Full design token system — must be read before any frontend code |
| `zzz/design-system/CLAUDE.md` | Complete | Frontend implementation rules — invoke `frontend-design` skill first |
| `zzz/first-aid-study-pwa.md` | Complete | Full project spec with data model, algorithm, UI flows, infrastructure, and build methodology |

The planning doc (`zzz/first-aid-study-pwa.md`) specifies a planning phase sequence:
1. Content generation ← **ALREADY DONE** (questions.js + skills.js exist)
2. Data model specification
3. Algorithm specification
4. UI specification
5. Infrastructure specification
6. Build task breakdown

The orchestration system should begin at **Phase 2: Data model specification**, not Phase 1.

---
## ARCHIVED

This file was the prepared brain dump created by `/start`. It has been consumed by `/orchestrate` and archived to prevent duplicate pickup. The active copy is at `SYNTROP/artifacts/intake/raw-brain-dump.md`.
