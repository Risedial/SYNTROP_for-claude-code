# Elevator Pitches

> **Source of Truth:** `metadata/system-facts.json`
> **Usage:** Use the version that matches your time budget and audience. All versions are factually consistent. Choose the one that fits the conversation — don't combine them.

---

## How to Use This Document

Each pitch covers the same core story at different levels of detail. The 5-second version is a conversation hook. The 60-second version is a full explanation. Never combine them into something longer — that's a talk track, not a pitch.

All pitches assume the listener has at least some developer background. Separate versions for non-technical audiences are noted where relevant.

---

## 5-Second Pitch (written form: 12-15 words)

**For developers:**
> "A structured multi-session pipeline that turns Claude Code into a full project builder."

**For Product Hunt / GitHub description:**
> "33 skill files. 5 phases. One `/orchestrate` command. Deployment-ready projects."

**For anyone:**
> "It adds memory and structure to AI development across multiple sessions."

---

## 15-Second Pitch (~50 words)

**For developers who've used Claude Code:**
> "SYNTROP solves the context problem in multi-session AI development. You run `/orchestrate` with your idea. It runs through 5 phases — Intake, Research, Architecture, Execution, Quality — across as many sessions as needed, picking up exactly where it left off each time. Output is complete: code, tests, docs, deployment."

**For technical non-developers:**
> "SYNTROP is a structured workflow that sits on top of Claude Code. You describe what you want to build. It manages the entire process across multiple working sessions, asking you to make decisions at key points. You end up with a finished, deployable software project."

---

## 30-Second Pitch (~80-100 words)

**For developer audiences:**
> "The problem with AI coding tools is that they're all session-bound. When the conversation ends, context is gone. For anything larger than a small feature, you're re-explaining your entire project every time.
>
> SYNTROP is a 33-file skill architecture that runs inside Claude Code. It uses a JSON state machine as persistent memory — each session reads state, executes, and writes updated state. You pick up exactly where you left off.
>
> The framework runs through 5 phases: Intake, Research, Architecture, Execution, and Quality. You approve the plan at each transition. Output is a deployment-ready project — not a prototype."

**For agency / business context:**
> "SYNTROP is an open-source framework that turns Claude Code into a structured project-building process. Instead of getting code fragments from an AI, you get a complete deliverable: source code, tests, documentation, and deployment configuration.
>
> The process runs across multiple working sessions with you approving the direction at 4-5 key checkpoints. Complex projects may need 15-20 sessions, but your active time in each session is minutes, not hours.
>
> It runs locally, requires no cloud infrastructure beyond what you're already using, and costs nothing beyond your existing Claude subscription."

---

## 60-Second Pitch (~180-200 words)

**Full version (developer audience):**

> "Let me tell you about a specific problem and how we solved it.
>
> Claude Code is a genuinely useful agentic coding tool. But any project that spans more than one conversation hits a wall: the session ends, context disappears, and you spend the first 20 minutes of the next session re-explaining what was built and why.
>
> SYNTROP is a structural solution. It's 33 markdown skill files that turn Claude Code into a hierarchical multi-session project builder. At the top is a CEO-level orchestrator. It delegates to 5 phase directors — Intake, Research, Architecture, Execution, Quality. Directors delegate to 23 specialized workers. Four handler systems manage error recovery, state validation, and context monitoring.
>
> The key mechanism is `orchestration-state.json` — a state machine that records everything: current phase, completed steps, decisions made, files created, next action. Every session starts by reading this file. When the session ends, the file is updated. The next `/orchestrate continue` picks up from the exact stopping point.
>
> Output isn't a prototype. It's a deployment-ready project: source code, tests, documentation, configuration, deployment scripts.
>
> It's open source. It runs locally. If you have Claude Code, you have everything you need.
>
> Honest caveats: it requires Claude Code, not model-agnostic. Complex projects need 15-20 sessions. v1.0, not enterprise-scale. Terminal-only.
>
> But for the problem it solves — multi-session AI project development with persistent context and human control — there's nothing else structured like it."

---

## Audience-Specific Variations

### For a Hacker News audience

Lead with the technical problem, then the technical solution. Skip any marketing framing.

> "Claude Code is great for session-local tasks. The problem: real projects span sessions, and context evaporates at every boundary. Most workarounds (CLAUDE.md, commit messages, session summaries) are helpful but manual and unsystematic.
>
> SYNTROP treats session boundaries as a first-class design constraint. A JSON state machine captures everything: phase, step, decisions, file index, next action. Fresh sessions read state first, execute, update state, stop cleanly.
>
> The skill architecture is 33 markdown files: 1 CEO orchestrator, 5 directors, 23 workers, 4 handlers. The entire project pipeline is observable and modifiable — they're just files.
>
> What it's not: not a SaaS, not cloud, not model-agnostic, not v2.0. It's a structured OSS framework for multi-session Claude Code workflows."

### For a non-technical founder

Skip the technical implementation. Focus on what they get and what they control.

> "SYNTROP is like having a very structured AI development process where you stay in charge of the important decisions.
>
> You describe what you want to build — even if it's messy and incomplete. The system asks clarifying questions, presents 3-5 options for how to build it, gets your approval, creates a detailed plan, gets your approval again, then builds it step by step.
>
> You end up with a complete software project: working code, tests, documentation, and instructions for deploying it. Not a demo. Not a mockup. Something you could actually ship.
>
> The tradeoffs: it works in a terminal (command line), it requires Claude Code (Anthropic's tool), and complex projects take multiple working sessions over days or weeks. It's for people who are comfortable directing a technical process, not for complete non-coders."
