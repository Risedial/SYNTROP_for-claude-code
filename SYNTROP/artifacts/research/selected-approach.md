# Selected Approach — First Aid Study PWA
**Selected:** Approach B — TypeScript + Zustand + vite-plugin-pwa
**Decision Date:** 2026-04-17
**Validation Result:** Passed with Warnings (no blockers)
**Decision Matrix Score:** 92.25/100

---

## What Was Selected

**Language:** TypeScript 5.x with strict mode
**State Management:** Zustand 4.x with persist middleware (localStorage key: `fap_store`)
**PWA Tooling:** vite-plugin-pwa (Workbox-based service worker, auto-generated precache manifest)
**Tab Routing:** Tab index as Zustand store field — no router library
**Framework:** React 18 + Vite (locked by CON-001)
**Infrastructure:** Upstash Redis + Vercel (locked by CON-003)

---

## Why This Approach Was Chosen

**Algorithm correctness is the #1 risk for this project.** The 5-state mastery machine (New→Active→Near-Mastery→Mastered→Maintenance) tracks streak counts, reversal history, session IDs, and mastery timestamps per question. A bug in this logic — an off-by-one in a streak counter, a missed reversal detection — directly impacts exam readiness. TypeScript discriminated unions and typed interfaces catch these bugs at compile time.

**Atomic build tasks are the #1 execution constraint (CON-006).** TypeScript interfaces make task specifications unambiguous: `add field sessionIds: string[] to QuestionRecord in src/types/algorithm.ts` requires no interpretation. Plain JavaScript tasks must describe data shapes in prose, which introduces ambiguity for a less-capable model.

**Zustand persist eliminates the largest block of custom code** that would otherwise require its own atomic tasks, tests, and error handling (~150-200 lines of localStorage serialization removed).

**vite-plugin-pwa is the proven solution** for the highest-platform-risk requirement (iOS Safari installable PWA). Custom service workers (Approach C) require manual handling of iOS Safari edge cases that vite-plugin-pwa already solves.

---

## Key Technology Decisions

| Component | Decision | Rationale |
|-----------|----------|-----------|
| Language | TypeScript (strict mode) | Algorithm type safety, unambiguous atomic task specs |
| State mgmt | Zustand + persist middleware | Eliminates custom localStorage layer, selective re-renders |
| PWA | vite-plugin-pwa | iOS Safari compatibility, auto precache manifest |
| Routing | Tab index in Zustand store | 4 fixed tabs, no URL routing needed, no router dep |
| PRNG | mulberry32 LCG (inline utility) | Seeded deterministic randomization for session ordering (FR-006) |
| Redis client | @upstash/redis | REST-based, works in Vercel serverless, official package |
| UUID | crypto.randomUUID() | Native browser API, no npm dep, available in iOS Safari 15.4+ |

---

## Known Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Math.random() not seedable | High | Medium | Implement mulberry32 PRNG in src/lib/prng.ts (10-line pure function) |
| Upstash MCP auth not configured | Medium | High | Test MCP as first execution task; fallback: Vercel KV via CLI |
| Zustand persist schema migration missed | Medium | Medium | Use version: 1 + migrate function from start; Redis restore as recovery |
| iOS Safari no native install prompt | High | Low | iOS install banner component; app fully functional without install |
| Bundle exceeds SW cache limit | Low | Medium | Size check early in execution; estimated well under 5MB |

---

## Warnings for Architecture Phase

1. **Seeded PRNG:** Specify mulberry32 implementation as first utility task — required for FR-006
2. **TypeScript strictness:** tsconfig.json must be configured with `strict: true` before any typing tasks
3. **Zustand persist migration:** Define migration pattern template before any schema tasks
4. **vite-plugin-pwa iOS meta tags:** `apple-mobile-web-app-capable` and `apple-touch-icon` must be explicit in plugin config
5. **Upstash MCP verification:** Test connectivity before execution phase — do not assume it works

---

## Architecture Phase Recommendations

1. Define TypeScript interfaces first — `QuestionState`, `QuestionRecord`, `AppStore`, `SessionRecord` — these are the contract every subsequent task references
2. Specify mulberry32 PRNG as a standalone atomic task
3. Define Zustand store shape with persist configuration as a single atomic task
4. Configure vite-plugin-pwa with full manifest and Apple meta tags in a single vite.config.ts task
5. Build the `/api/sync` serverless route specification before any frontend sync tasks
6. Plan iOS install prompt component as an atomic task early in the UI phase
