# Feature-Benefit Map

> **Source of Truth:** `metadata/system-facts.json`
> **Purpose:** Translate technical features into user-language benefits. Use this when writing copy, documentation, or responding to "what does it actually do for me?" questions.

---

## How to Use This Document

The left column is technical (what the system has). The right column is benefit (what the user gets). When writing copy, start from the right column. When explaining how it works, move left.

Never lead with the feature when the benefit is clearer. Never overpromise on the benefit when the feature is limited.

---

## Core Architecture Features

### Feature: 33-file skill architecture (CEO + 5 Directors + 23 Workers + 4 Handlers)

**Technical reality:** The orchestration system is implemented as 33 separate markdown skill files. Each file has a narrow, defined responsibility. The CEO reads state and routes. Directors manage phases. Workers execute specific tasks. Handlers manage cross-cutting concerns.

**User benefit — what you actually get:**
- Each component has one job, so failures are isolated and debuggable
- You can read any file to understand what that component does — there's no black box
- Workers can be added, modified, or extended without touching the rest of the system
- When something goes wrong, the error handler has enough specificity to recover or ask for help

**Copy-ready version:**
> "A 33-file skill architecture where each component has exactly one job. CEO routes, Directors manage phases, Workers execute tasks, Handlers recover from errors. Read any file to see exactly what it does."

---

### Feature: JSON state machine (`orchestration-state.json`)

**Technical reality:** A structured JSON file that records the current phase, current step, all decisions made (with rationale), all files created (with paths), and the next planned action. Written at the end of every session. Read at the beginning of every session before any other action.

**User benefit — what you actually get:**
- Sessions end cleanly — you don't have to finish before you stop
- The next session starts from exactly where the last one ended, without re-explaining anything
- All architectural decisions are recorded with their rationale — auditable project history
- If something breaks or diverges, the state file shows the last known good state

**Copy-ready version:**
> "When a session ends, everything is written to `orchestration-state.json` — phase, progress, every decision made and why, every file created. The next `/orchestrate continue` starts by reading that file. Nothing is lost between sessions."

---

### Feature: 5-phase pipeline (Intake → Research → Architecture → Execution → Quality)

**Technical reality:** 5 sequenced phases, each managed by a dedicated Director skill file. Phases run in order. Each phase produces a specific artifact. Phase transitions require explicit user approval before proceeding.

**User benefit — what you actually get:**
- You know exactly where in the project lifecycle you are at any point
- Each phase has a clear input and output — no ambiguity about what's happening
- You can't accidentally skip requirements clarification and jump to coding
- The phases map to how good software projects actually work, so the output is structured correctly from the start

**Copy-ready version:**
> "Five phases: Intake converts your idea into a requirements doc. Research presents 3-5 technology options for your approval. Architecture produces a sprint-based blueprint. Execution builds sprint by sprint. Quality verifies, documents, and packages for deployment."

---

### Feature: Human approval gates (4 checkpoints)

**Technical reality:** The system pauses and requires explicit user review and approval at: end of Intake (SSOT document), end of Research (technical approach selection), end of Architecture (blueprint + sprint plan), and end of Quality (final review before deployment packaging). No phase proceeds without approval.

**User benefit — what you actually get:**
- Architectural decisions are made by you, not by the AI guessing
- You can course-correct before significant work has been built in the wrong direction
- The document you approve at Intake becomes the specification the rest of the system builds against
- No surprises at the end — you've seen and approved every major decision point

**Copy-ready version:**
> "The system stops 4 times and asks you to review before proceeding. Intake produces a requirements document — you approve it. Research presents technology options — you choose. Architecture shows the blueprint — you approve it. Quality shows the final output — you sign off. Everything built in between is autonomous."

---

### Feature: Complete project output (code + tests + docs + config + deployment)

**Technical reality:** The Quality phase explicitly includes: source code review, test execution and verification, documentation generation, configuration finalization, and deployment script creation. All are in-scope deliverables, not optional extras.

**User benefit — what you actually get:**
- A project that can actually be deployed, not just demonstrated
- Test coverage you didn't have to write separately
- Documentation that reflects what was actually built (not what you planned to build)
- Deployment scripts that work in a specific environment, not generic instructions

**Copy-ready version:**
> "Output isn't code. It's a project: source code, test suite, documentation, configuration, and deployment scripts. Everything needed to ship."

---

### Feature: Error recovery handlers (4 support systems)

**Technical reality:** Four handler skill files manage: User Input (clarifying ambiguous inputs), Error Recovery (handling execution failures), State Validation (checking state file integrity before each session), and Context Monitoring (alerting when context approaches limits).

**User benefit — what you actually get:**
- Execution failures don't require starting over — the error handler attempts recovery and updates state
- If your initial instructions were ambiguous, the User Input handler generates clarifying questions before proceeding
- The state file is validated before each session, catching corruption before it causes problems
- You're notified when context limits approach so you can plan session boundaries

**Copy-ready version:**
> "Four handler systems work behind the scenes: one asks for clarification when instructions are ambiguous, one recovers from execution errors, one validates state integrity before each session, one monitors context limits. When something goes wrong, the system tries to fix it before asking you to intervene."

---

## Summary Table: Feature → Benefit → Claim

| Feature | Primary Benefit | Honest Limitation |
|---|---|---|
| 33-file skill architecture | Debuggable, extensible, transparent | Requires understanding the skill file structure to extend |
| JSON state machine | Full context recovery across sessions | State file is a single point of failure — back it up |
| 5-phase pipeline | Structured, sequential project building | Complex projects: 15-20+ sessions, not one-shot |
| 4 approval gates | User stays in control of direction | Adds decision points — not for people who want full autonomy |
| Complete output (code + tests + docs) | Deployable result, not just a demo | Quality is still bounded by Claude's capabilities |
| Error recovery handlers | Resilient execution, fewer interruptions | Not tested against all failure scenarios at scale |
| Terminal-native, zero infrastructure | No setup beyond Claude Code | No GUI — requires CLI comfort |
| Open source | Transparent, extensible, free | No dedicated support tier or SLA |
