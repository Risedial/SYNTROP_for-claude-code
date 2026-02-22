# Honest Limitations

> **Source of Truth:** `metadata/system-facts.json` → `honest_limitations`
> **Purpose:** This document exists to build trust with technical audiences who have been burned by AI hype. Every limitation listed here is real. Including these in marketing materials is a deliberate choice — developers trust products that don't oversell.

---

## Why We're Leading With This

Every "AI that builds your app" tool has launched with bold claims and disappointed on delivery. Developers are tired of it. The fastest path to credibility with this audience is radical honesty about what the system is and what it isn't.

SYNTROP is a v1.0 open-source framework. It does specific things well and has real constraints. Here they are.

---

## Limitation 1: Claude Code Dependency

**What this means:** SYNTROP is not model-agnostic. It runs exclusively inside Claude Code (Anthropic's CLI tool). If you use GPT-4, Gemini, or any other model as your primary AI coding environment, this system does not work for you.

**Why this won't change easily:** The skill files are designed around Claude Code's slash command architecture, file-reading behaviors, and tool use patterns. Porting to another CLI would require re-architecting the skill files, not just swapping an API key.

**Alternatives if you need model flexibility:** CrewAI and LangGraph are model-agnostic frameworks where you can plug in your preferred model.

**What this means for users:** You need an active Claude Pro or Max subscription (required by Claude Code). That's currently $20-100/month depending on your plan tier.

---

## Limitation 2: Output Quality Is Bounded by Claude

**What this means:** SYNTROP orchestrates Claude's work. It provides structure, persistence, and coordination. It does not give Claude capabilities it doesn't already have.

If Claude can't write good Python tests, the framework's quality phase won't fix that. If Claude hallucinates a library that doesn't exist, the framework won't catch it (unless it runs and fails, at which point the error handler kicks in).

**Practical implication:** For complex, domain-specific software (embedded systems, novel algorithms, highly specialized libraries), Claude's knowledge gaps become SYNTROP's gaps.

**What helps:** The Research phase builds a decision matrix and the Architecture phase creates a detailed blueprint — both of which give Claude structured context to reduce hallucination rates. But they don't eliminate the underlying model limitations.

---

## Limitation 3: Complex Projects Require Many Sessions

**What this means:** A project that would take a senior developer 2 weeks to build may require 15-20+ chat sessions with SYNTROP. Each session is a bounded unit of work — typically one sprint or one major task block.

**Why the session count matters:** Each session requires a `/orchestrate continue` command to resume. For a 20-session project, that's 20 moments where you need to be present to kick off the next session. You're not going to sleep and wake up with a finished product.

**Who this is fine for:** Anyone who can check in once or twice per day and kick off the next session. The actual work happens autonomously within each session.

**Who this is a problem for:** Anyone who wants to describe a project and come back in 72 hours with finished code. That's not what this is.

---

## Limitation 4: No GUI, No Web Dashboard

**What this means:** SYNTROP is a terminal-native system. All interaction happens through `claude` CLI commands. There is no web interface, no visual progress tracker, no drag-and-drop workflow editor.

**Minimum technical requirement:** You need to be comfortable opening a terminal, running CLI commands, and reading JSON files. If that's not you, Replit Agent or Bolt.new have lower technical barriers.

**This won't change in v1.0:** Adding a GUI would require building a separate application. That's not in scope for the initial release.

---

## Limitation 5: Not Battle-Tested at Enterprise Scale

**What this means:** SYNTROP is a v1.0 framework. It has been designed and tested, but it has not been run by thousands of users on production systems, it does not have enterprise-grade error recovery for every edge case, and there is no SLA, dedicated support tier, or professional services offering.

**Specific unknowns:**
- Behavior on very large codebases (100K+ LOC)
- Performance on highly interdependent, complex architectures (microservices with 20+ services)
- Recovery from partial state corruption if a session crashes mid-write
- Consistency of output across different Claude model versions

**What exists for recovery:** Error handlers and state validation are implemented. But they haven't been stress-tested at scale.

**Who should know this:** Anyone considering using SYNTROP for a business-critical project. Use it alongside human review processes, not as a replacement for them.

---

## Limitation 6: Requires Messy-to-Structured Translation

**What this means:** The Intake phase accepts a raw brain dump and converts it into structured requirements. This works well — but the SSOT document still needs your review and approval. If you approve a flawed SSOT, the entire downstream pipeline builds toward that flawed specification.

**Garbage in, garbage out still applies.** SYNTROP improves the quality of requirements extraction, but it cannot read your mind. If your brain dump doesn't contain information you haven't articulated yet, the system won't invent it.

**The fix:** Take the SSOT review seriously. It's 10 minutes of focused reading that determines the quality of everything downstream.

---

## Limitation 7: State File Is a Single Point of Failure

**What this means:** The `orchestration-state.json` file is the system's entire memory. If it gets corrupted, deleted, or falls out of sync, the system loses context.

**Current safeguards:** State validation handler checks for corruption before each session. Context-summary.md provides a human-readable backup.

**What isn't implemented:** Automatic state backups or version history for the state file.

**Mitigation:** Back up `orchestration-state.json` before major session runs. A corrupted state file is recoverable from the context summary, but it requires manual reconstruction — not automatic recovery.

---

## Summary Table

| Limitation | Severity | Workaround |
|---|---|---|
| Claude Code dependency (not model-agnostic) | High — blocking for non-Claude users | Use CrewAI/LangGraph for model flexibility |
| Output quality bounded by Claude | Medium — affects complex domains | Review Research and Architecture phases carefully |
| 15-20+ sessions for complex projects | Medium — time commitment | Plan for daily check-ins, not fire-and-forget |
| Terminal-only, no GUI | Medium — UX barrier | Requires basic CLI comfort |
| Not battle-tested at enterprise scale | High — for enterprise use | Use alongside human review processes |
| Requires careful SSOT review | Low — manageable | Invest 10 min in reviewing the Intake output |
| State file is single point of failure | Low — but real | Back up state file before major runs |

---

## How to Use This in Conversations

If someone asks "what can't it do?", this document is your answer. Lead with it. Developers who find that you've already thought through the limitations will trust your claims about what the system _does_ do far more than developers who only hear the success cases.

The goal is not to talk users out of using SYNTROP. The goal is to put them in the right mental model so they use it in the right situations and don't get surprised by the edges.
