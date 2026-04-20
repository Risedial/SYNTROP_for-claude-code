# Research Notes — First Aid Study PWA
**Phase:** Research | **Step:** Approach Research
**Date:** 2026-04-17

---

## Research Scope

The major stack decisions (React + Vite, Upstash Redis, Vercel) are locked by constraints CON-001 and CON-003. This research focused on the **open sub-stack decisions** that remain within those constraints:

1. **Language:** TypeScript vs plain JavaScript
2. **State management library:** Zustand vs React Context/useReducer vs others
3. **PWA service worker tooling:** vite-plugin-pwa (Workbox-based) vs custom service worker
4. **Tab routing pattern:** state-based (no router lib) vs hash routing vs React Router

No research was done on framework selection (locked), hosting (locked), or database (locked). The content files (questions.js, skills.js) and design system are pre-built and are not a research concern.

---

## Key Findings by Area

### 1. Language: TypeScript vs JavaScript

**Finding:** TypeScript is the stronger choice for this project because of the mastery algorithm's complexity.

The 5-state machine tracks, per question:
- Current state (New | Active | NearMastery | Mastered | Maintenance)
- Consecutive correct streak count
- Distinct session IDs in which the question was answered correctly
- Reversal history (last 5 exposures)
- Fast-tap flags per response
- Mastery date (for 10-session maintenance scheduling)

This is non-trivial state with multiple interdependencies. TypeScript discriminated unions and interfaces make every transition rule compiler-checked rather than runtime-discovered. Given the "atomic build tasks for less-capable model" constraint (CON-006), TypeScript also makes task specifications more precise — a task that says "add `consecutiveCorrect: number` to `QuestionState` interface" is unambiguous in a way that a plain-JS task cannot be.

**Assumption A6 resolution:** TypeScript is recommended for the architecture phase.

### 2. State Management: Zustand vs Context/useReducer

**Finding:** Zustand with persist middleware is a better fit than Context/useReducer for this specific project.

**Why Zustand wins:**
- `persist` middleware handles localStorage serialization/deserialization automatically — eliminates ~150-200 lines of custom storage code that would otherwise need atomic tasks, error handling, and tests
- Selector-based subscriptions prevent unnecessary re-renders — a `QuestionCard` component that subscribes to `useStore(s => s.questions[id])` only re-renders when that question changes, not when unrelated settings change
- Devtools middleware makes the algorithm state inspectable without console.log
- Zustand's API surface is small and well-documented — a less-capable model can implement a Zustand slice from a clear interface definition

**Why Context/useReducer is viable but inferior:**
- The `dispatch(action)` pattern maps well to state machine transitions
- But Context propagates updates to all consumers on every dispatch — with 131 questions in the store, this needs careful memoization
- All localStorage persistence code must be hand-written and tested
- More boilerplate per atomic task

**Zustand bundle size:** ~15KB uncompressed, ~3.5KB gzipped — negligible for a cached PWA.

**Competitors evaluated and rejected:**
- **Jotai:** Atomic state model doesn't map well to a single persisted blob of question state; more complex for atomic task specification
- **Redux Toolkit:** Significant boilerplate overhead for a single-user app with no middleware needs
- **TanStack Query:** Purpose-built for async server state — inappropriate for localStorage-primary offline app

### 3. PWA Tooling: vite-plugin-pwa vs Custom Service Worker

**Finding:** vite-plugin-pwa is strongly preferred for this project.

**vite-plugin-pwa (Workbox-based):**
- Generates service worker with cache-first strategy and asset manifest from Vite build output automatically
- Handles iOS Safari "Add to Home Screen" flow correctly — this is a known minefield of edge cases
- Handles service worker update lifecycle (skipWaiting, clientsClaim) correctly
- Generates manifest.json from config — icons, display mode, start_url set once in vite.config.ts
- Zero post-build scripts required — the plugin runs as part of the Vite build pipeline
- 10 lines of config vs ~300 lines of hand-written service worker

**Custom service worker:**
- More control over cache naming and strategy, but vite-plugin-pwa exposes all relevant configuration
- Requires a script to enumerate Vite's hashed output filenames for cache manifest — this script must run after every build
- iOS Safari quirks must be handled manually (update detection, scope, navigation fallback)
- Higher risk, higher maintenance burden, no offsetting benefit for this use case

**iOS Safari specific findings:**
- iOS Safari requires `display: standalone` in manifest for installable PWA
- iOS Safari does not show native install prompt — must use meta tags and custom "Add to Home Screen" banner
- Service worker cache is subject to iOS storage eviction under storage pressure — vite-plugin-pwa's recommended `precacheAndRoute` strategy handles this correctly
- vite-plugin-pwa generates all required iOS-specific manifest fields

### 4. Tab Routing

**Finding:** Simple tab index state (no router library) is correct for this app.

The app has 4 fixed tabs with no nested routes, no URL-based navigation requirements, and no browser history integration needed. A router library (React Router, TanStack Router) would add dependency weight and complexity with zero benefit. Tab state is stored in the Zustand store (or Context), and the active tab index persists across page reloads as part of the store's persisted state.

**No router library is the right call.**

---

## Approaches Identified

Three coherent approaches were produced:

| Approach | Language | State Mgmt | PWA Tooling | Complexity |
|----------|----------|------------|-------------|------------|
| A | JavaScript | Context/useReducer | vite-plugin-pwa | Low |
| B | TypeScript | Zustand | vite-plugin-pwa | Low-Medium |
| C | TypeScript | Zustand | Custom SW | Medium-High |

**Preliminary recommendation: Approach B.**

---

## Vision Anchor Alignment Check

| Vision Anchor | Approach A | Approach B | Approach C |
|---------------|-----------|-----------|-----------|
| Zero ongoing cost | ✓ | ✓ | ✓ |
| Performance-based mastery (algorithm correctness) | ⚠ No types | ✓ Types enforce transitions | ✓ Types enforce transitions |
| Single user, no accounts | ✓ | ✓ | ✓ |
| Offline first | ✓ vite-plugin-pwa | ✓ vite-plugin-pwa | ⚠ Custom SW risk |
| Zero manual setup | ✓ | ✓ | ✓ |
| React + Vite locked | ✓ | ✓ | ✓ |
| Atomic build tasks | ⚠ JS ambiguity | ✓ Types unambiguous | ✓ Types + ⚠ SW complexity |

Approach B aligns with all vision anchors. Approach A has minor algorithm risk. Approach C has offline implementation risk.
