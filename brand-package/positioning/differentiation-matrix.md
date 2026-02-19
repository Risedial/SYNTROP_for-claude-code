# Differentiation Matrix

> **Source of Truth:** `metadata/system-facts.json` → `competitive_research`
> **Last Verified:** 2026-02-18
> **Usage:** Use this table in conversations with technically sophisticated users who want to understand specific differences. Do not use it as a marketing asset — the framing is analytical, not promotional.

---

## Core Comparison Table

| Feature | {{PRODUCT_NAME}} | Devin | Cursor Agent | Replit Agent | Bolt.new | CrewAI |
|---|---|---|---|---|---|---|
| **Multi-session continuity** | ✅ State machine design | ❌ Session-bound | ❌ Session-bound | Partial (hosted env) | ❌ Session-bound | ⚠️ External state required |
| **Infrastructure required** | None (local) | Cognition cloud | Cursor IDE install | Replit cloud | Browser | Python + infra |
| **User approval gates** | ✅ 4 built-in | ❌ Assign-and-wait | ❌ User-directed | ❌ Auto-proceed | ❌ Auto-proceed | ⚠️ Configurable |
| **Output type** | Full project (code + tests + docs + deploy) | Code + PRs | Code changes | MVP app | MVP app | Task-dependent |
| **Hierarchical delegation** | ✅ CEO→Director→Worker | Internal (opaque) | N/A | N/A | N/A | ✅ Role-based |
| **Open source** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Model-agnostic** | ❌ Claude Code only | ❌ Devin model | ✅ Multi-model | ✅ Multi-model | Claude 3.5 only | ✅ Multi-model |
| **Local / no cloud** | ✅ | ❌ | ✅ (IDE local) | ❌ | ❌ | ✅ (self-hosted) |
| **Cost beyond subscription** | $0 | $20-500+/mo | Cursor subscription | Replit subscription | Token-based (~$1K+ complex) | $0 (self-hosted) |
| **Terminal-native** | ✅ | ❌ | ❌ (IDE) | ❌ | ❌ | ✅ |
| **Phase-structured pipeline** | ✅ 5 phases | ❌ | ❌ | ❌ | ❌ | ⚠️ Configurable |
| **Context recovery** | ✅ JSON state machine | ❌ | ❌ | ⚠️ Env persists | ❌ | ❌ |
| **No-code/CLI setup** | ✅ One command | ✅ (but cloud) | ❌ (IDE setup) | ✅ (but cloud) | ✅ (browser) | ❌ (Python coding) |
| **Battle-tested at scale** | ❌ v1.0 | ✅ (2+ years) | ✅ | ✅ | ✅ | ✅ |

**Legend:** ✅ = Yes / Strong | ❌ = No / Not present | ⚠️ = Partial / Conditional

---

## Key Differentiators — Narrative Form

### 1. Multi-Session Continuity Is a First-Class Feature, Not an Afterthought

Every tool in the table above (except CrewAI with external state added manually) operates within a single session. When the chat ends, context is gone.

{{PRODUCT_NAME}} is architecturally designed for session termination. The `orchestration-state.json` state machine records the exact phase, step, decisions made, files created, and next action. The next session begins by reading this file — not by re-explaining the project.

This is the single most important differentiator. Everything else is secondary.

### 2. Zero Additional Infrastructure

Devin requires the Cognition Labs platform. Replit Agent requires Replit's cloud. Bolt.new requires StackBlitz in your browser. CrewAI requires a Python environment and custom orchestration code.

{{PRODUCT_NAME}} requires: Claude Code. If you already use Claude Code, you have everything you need.

### 3. Human Stays in Control at Phase Gates

{{PRODUCT_NAME}} pauses for user approval at 4 critical transitions:
1. After Intake: Approve the Single Source of Truth document
2. After Research: Select the technical approach
3. After Architecture: Approve the blueprint and sprint plan
4. After Quality: Final review before deployment packaging

Devin, Replit Agent, and Bolt.new are primarily "fire and hope" — you describe what you want and the system runs. If it goes in the wrong direction, you may not find out until significant work has been done.

### 4. Hierarchical Delegation Chain

{{PRODUCT_NAME}}'s 33 skill files implement a structured chain of command:
- CEO Orchestrator reads state and routes to the correct Director
- Directors manage phases and delegate to specialized Workers
- Workers execute specific tasks (vision-clarifier, blueprint-architect, step-executor, integration-tester, etc.)
- Handlers manage cross-cutting concerns (error recovery, state validation, context monitoring)

This hierarchy means each component has a narrow, well-defined job. Debugging is tractable: if the architecture phase produced a bad blueprint, you can inspect the `blueprint-architect` worker directly.

In contrast, Devin's internals are opaque. CrewAI has a similar role-based model but requires Python code to configure.

### 5. Complete Project Output vs. Code Snippets or MVPs

{{PRODUCT_NAME}} produces: source code + tests + documentation + configuration + deployment scripts.

Bolt.new and Replit Agent produce: functioning MVPs, often without tests, documentation, or deployment configuration.

Cursor agent mode produces: multi-file code changes within the scope of what you directed.

If you want to ship, not just prototype, the output quality bar matters.

---

## Where Competitors Win

**Be honest about where other tools have clear advantages:**

| Situation | Better Tool | Why |
|---|---|---|
| Quick UI prototype | v0 or Bolt.new | Much faster for simple frontends |
| Bug fix in existing codebase | Cursor or Copilot | Better IDE integration for targeted changes |
| Non-technical user building an MVP | Replit Agent | Lower barrier, no CLI |
| Enterprise-scale autonomous tasks | Devin | More battle-tested, dedicated support |
| Multi-model flexibility | CrewAI or LangGraph | Not locked to Claude Code |
| One-session projects | Cursor Agent Mode | No overhead of state management |

{{PRODUCT_NAME}} is the right choice when: you're building a complete software project, across multiple sessions, where you want control over architectural decisions, and you're already working inside Claude Code.

---

## Notes for Maintaining This Matrix

- Re-verify competitor capabilities every quarter — this landscape moves fast
- Add new competitors as they emerge (e.g., new Claude Code native agents)
- GitHub Copilot Workspace status changed significantly in mid-2025 — watch for future changes
- Devin pricing has changed twice in two years — verify before citing
