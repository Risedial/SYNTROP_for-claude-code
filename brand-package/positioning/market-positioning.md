# Market Positioning

> **Source of Truth:** `metadata/system-facts.json`
> **Informed by:** `positioning/competitive-landscape.md`

---

## Positioning Statement

**For developers who use Claude Code and want to build complete software projects — not just code snippets — {{PRODUCT_NAME}} is the only structured multi-session orchestration framework that solves context window death by design, turning a single `/orchestrate` command into a complete 5-phase pipeline that produces deployment-ready deliverables.**

Unlike Devin, Cursor agent mode, Replit Agent, and Bolt.new — which all operate within a single session and lose context when they end — {{PRODUCT_NAME}} uses a persistent state machine to pick up exactly where the last session left off, across unlimited sessions, with no cloud infrastructure required.

---

## The Category This Belongs To

**Category name:** Multi-session AI project orchestration

This is not yet a recognized market category. The adjacent categories are:

| Adjacent Category | Why {{PRODUCT_NAME}} Is Different |
|---|---|
| AI coding assistants (Copilot, Cursor) | Those help within a session. This manages across sessions. |
| Autonomous AI agents (Devin) | Those are cloud-hosted products. This is a local framework. |
| Agent frameworks (CrewAI, LangGraph) | Those are infrastructure to build agents. This is the agent, already built. |
| AI app generators (Bolt.new, v0) | Those produce MVPs. This produces production-ready projects. |
| Prompt engineering toolkits | Those organize prompts. This orchestrates an entire project lifecycle. |

**Strategic choice:** Own the category "multi-session AI project orchestration" rather than compete inside an existing one.

---

## Market Context

### Why Now

The AI coding tool market reached an inflection point in 2024-2025. Tools matured enough to produce useful code. But a second-order problem emerged: **session boundaries**.

Every major AI coding tool operates within a single conversation. When context runs out or a chat ends, all accumulated understanding of the project disappears. Developers either:
1. Try to pack everything into one session (fails on large projects)
2. Start fresh and re-explain everything each time (frustrating, inconsistent)
3. Use tools like Cursor CLAUDE.md to preserve some context (helpful but not structured)

{{PRODUCT_NAME}} treats session boundaries as a first-class problem, not an afterthought. The state machine design means **session ending is a feature, not a bug** — it's a clean stopping point with guaranteed context recovery.

### Who Is Actually Using AI Coding Tools

Based on observable adoption patterns (source: community discussions, product usage data where public):

- **Solo developers** building side projects or internal tools — fastest adopters
- **Non-technical founders** who want to prototype ideas — drawn to no-code-adjacent tools like Bolt, Replit
- **Agency developers** accelerating client delivery — pragmatic adopters, care about output quality
- **OSS contributors and tinkerers** — interested in architecture, want to extend and customize
- **Teams evaluating AI-assisted workflows** — often blocked by governance, security, or toolchain compatibility

{{PRODUCT_NAME}} is most immediately relevant to solo developers and agency developers in the first two groups. The non-technical founder segment needs UX work that hasn't happened yet (v1.0 is terminal-native only).

---

## Positioning Along Key Axes

### Control vs. Automation

```
Full Automation <-----------------------------------------> Full Control
    Devin          Replit Agent     {{PRODUCT_NAME}}     Cursor     Manual
```

{{PRODUCT_NAME}} is positioned in the **structured automation with human oversight** zone. It automates the execution while keeping humans in control of strategic decisions (what to build, which approach to take, whether the architecture is right).

### Infrastructure vs. Zero-Config

```
Heavy Infra <-----------------------------------------> Zero Config
  LangGraph     CrewAI    Devin/Replit    Cursor    {{PRODUCT_NAME}}
```

{{PRODUCT_NAME}} requires nothing beyond Claude Code — which developers already have. This is its strongest infrastructure advantage.

### Scope: Task vs. Project

```
Task-Level <-----------------------------------------> Project-Level
  Copilot    Cursor Agent    Devin    Bolt.new    {{PRODUCT_NAME}}
```

{{PRODUCT_NAME}} is the only tool in this landscape explicitly designed for **entire project lifecycle management**, not individual tasks or PRs.

---

## What {{PRODUCT_NAME}} Is Not Positioning Against

- **"AI that writes code"** — Every tool does this. This framing is saturated and meaningless.
- **"AI that thinks like a senior developer"** — Unverifiable hype. Avoid entirely.
- **"Replace your engineering team"** — Wrong category, wrong audience, not what this does.
- **"10x developer"** — Tired framing. Developers distrust it because it's been wrong so many times.

---

## The One-Sentence Category Claim

**{{PRODUCT_NAME}} is the first open-source framework that treats multi-session AI development as a first-class problem — and solves it with a 33-file skill architecture that turns `/orchestrate` into a complete project-building pipeline.**

Note: "first open-source framework" should be verified against GitHub search results before publishing. Hedge to "one of the first" if any prior art exists.

---

## Go-to-Market Priority

**Phase 1 (Launch):** Developer-led, open-source distribution. GitHub, Hacker News, developer communities. No paid marketing.

**Primary audience at launch:** Developers actively using Claude Code who have experienced the multi-session context problem firsthand.

**Primary message:** "The context window problem has a structural solution."

**Secondary message:** "33 skill files. 5 phases. One command. Complete projects."
