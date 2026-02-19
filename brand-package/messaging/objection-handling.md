# Objection Handling

> **Source of Truth:** `metadata/system-facts.json`
> **Cross-reference:** `positioning/honest-limitations.md`, `positioning/competitive-landscape.md`
> **Tone note:** Respond to objections honestly. If an objection is valid, acknowledge it and explain the tradeoff. Don't spin.

---

## Objection 1: "I can just use Claude Code directly."

**Who says this:** Experienced Claude Code users who have developed their own workflow and see frameworks as overhead.

**The honest answer:**
You're right. If your projects fit in one session, skip {{PRODUCT_NAME}}. The framework adds overhead that isn't worth it for small tasks or single-session work.

The value becomes real when a project requires multiple sessions — say, 3+ days of focused work building a non-trivial system. At that point, the cost of re-establishing context every session exceeds the one-time cost of setting up the framework.

**What to actually say:**
> "If your project fits in one Claude Code session, you don't need this. {{PRODUCT_NAME}} is the right choice when you're building something that spans multiple sessions and you're tired of re-explaining the architecture every time you open a new chat."

---

## Objection 2: "This is just a fancy set of prompts. Why would that work reliably?"

**Who says this:** Skeptics who've seen meta-prompting overhyped before. Also: developers who understand that prompts don't execute deterministically.

**The honest answer:**
This is a reasonable skepticism. Structured prompts reduce variance but don't eliminate it. The CEO-Director-Worker chain creates more predictable behavior than a single flat prompt because each skill file has a narrower scope. But Claude still decides what to do within that scope.

The reliability comes from the state machine, not the prompts. Even if a single execution produces mediocre output, the state machine records what was done and where. The next session can review and course-correct from the exact stopping point rather than starting over.

**What to actually say:**
> "The framework doesn't make Claude more reliable — it makes failures recoverable. The state machine records every decision and stopping point. If a session produces bad output, you review it, update state, and re-run. Nothing is lost. That's different from a single prompt that either works or leaves you starting from scratch."

---

## Objection 3: "Devin does the same thing but it's a real product."

**Who says this:** Developers comparing {{PRODUCT_NAME}} to well-funded AI coding tools.

**The honest answer:**
Devin and {{PRODUCT_NAME}} solve different problems. Devin is a cloud-hosted service that accepts task assignments and works on defined, scoped work. {{PRODUCT_NAME}} is an open-source framework that runs locally inside Claude Code and manages a 5-phase project lifecycle.

The comparison breaks down quickly:
- Devin is closed-source and costs money beyond your Claude subscription
- Devin operates within a session; {{PRODUCT_NAME}} is designed for cross-session projects
- Devin's interactive planning is one conversation at the start; {{PRODUCT_NAME}} has 4 approval gates across the full lifecycle

Where Devin wins: it's more battle-tested, has dedicated support, and works for developers not already using Claude Code.

**What to actually say:**
> "Devin is a great tool for defined tasks in a cloud environment. {{PRODUCT_NAME}} is for developers already in Claude Code who want structure across a full project lifecycle. They're solving different problems. If you need Devin's use case, use Devin."

---

## Objection 4: "15-20 sessions? That sounds like a lot of work."

**Who says this:** Anyone expecting a one-shot project generator.

**The honest answer:**
This is a fair expectation-calibration issue. 15-20 sessions sounds like 15-20 hours. In practice, each session is 5-15 minutes of your active time — reading output, approving a decision, running `/orchestrate continue`. The autonomous work happens within the session.

A 20-session project might represent 2-4 hours of total user time spread over a week. That's substantially less work than building the same project manually.

**What to actually say:**
> "Each session needs a `/orchestrate continue` command from you — that's typically 5-15 minutes of reading and approving. The autonomous work runs inside the session. A 20-session project is usually 2-4 hours of your total active time spread over a week. The sessions aren't your work time; they're the system's work time."

---

## Objection 5: "What if Claude makes the wrong architecture decision?"

**Who says this:** Developers who've been burned by AI-generated architecture that became technical debt.

**The honest answer:**
That's exactly what the Research and Architecture phase approval gates are for. In the Research phase, {{PRODUCT_NAME}} presents 3-5 technology options with a scored decision matrix, and you select the approach. In the Architecture phase, you review the full technical blueprint before any code is written.

If the approach looks wrong, you reject it and provide direction. The system doesn't proceed until you approve.

This doesn't guarantee good architecture — your approval is only as good as your review. But you have an explicit opportunity to catch the mistake before 15 sprints of implementation have been built on a bad foundation.

**What to actually say:**
> "The Research phase builds a scored decision matrix of 3-5 options and asks you to choose. The Architecture phase produces a blueprint for your review before any code is written. If either looks wrong, reject it and redirect. The phases exist specifically to give you these decision points."

---

## Objection 6: "I tried an AI coding tool before and it made a mess. Why is this different?"

**Who says this:** Developers who've had bad experiences with AI code generators that produced technically functional but unmaintainable code.

**The honest answer:**
Most AI coding tools produce code in one shot without structured requirements or architecture review. The mess usually comes from: insufficient requirements clarity at the start, no mechanism to course-correct mid-build, and no Quality phase that checks output against original intent.

{{PRODUCT_NAME}} addresses all three: Intake forces requirements clarity before coding starts, 4 approval gates let you course-correct at each phase, and Quality phase explicitly verifies output against the original SSOT.

Honest caveat: this doesn't guarantee clean code. Claude's code quality is still the ceiling. But the process is structured to minimize the most common causes of mess.

**What to actually say:**
> "The mess usually comes from AI starting to build before requirements are clear, or from no one reviewing direction mid-project. The Intake phase runs before any code, and you approve the requirements doc. The Research and Architecture phases gate the start of execution. The Quality phase verifies the end against the original spec. That's structurally different from most AI coding tools."

---

## Objection 7: "This only works with Claude. What if Anthropic changes their pricing/API?"

**Who says this:** Developers concerned about vendor lock-in.

**The honest answer:**
This is a real dependency. {{PRODUCT_NAME}} runs inside Claude Code and is designed specifically for Claude's tool-use patterns. If Anthropic deprecates Claude Code, changes the slash command architecture, or makes significant API changes, the framework would need updating.

This is the same risk you accept with any Claude Code workflow. If vendor independence is a hard requirement, CrewAI or LangGraph — both model-agnostic Python frameworks — are better fits.

**What to actually say:**
> "Real dependency. {{PRODUCT_NAME}} is Claude Code-specific — the skill files are designed around Claude's architecture. If vendor independence matters, you should use CrewAI or LangGraph instead. If you're already committed to Claude Code, this is no additional risk beyond what you've already accepted."

---

## Objection 8: "I'm not technical enough for this."

**Who says this:** Non-technical founders or product managers who want to build things but don't live in a terminal.

**The honest answer:**
{{PRODUCT_NAME}} v1.0 is terminal-native. You need to open a terminal, run CLI commands, and read JSON files. If that's uncomfortable, this is genuinely the wrong tool.

Better options for now: Replit Agent (browser-based) or Bolt.new (browser-based) have lower technical barriers. If {{PRODUCT_NAME}} eventually adds a thin wrapper UI, this answer changes.

**What to actually say:**
> "v1.0 is terminal-only. You need to be comfortable running CLI commands. If you're not there yet, Replit Agent or Bolt.new have lower barriers. Come back to {{PRODUCT_NAME}} when you're more comfortable with terminal workflows — or wait for a future release that might have a wrapper interface."

---

## Objection 9: "It's a v1.0 open-source project. How do I know it won't be abandoned?"

**Who says this:** Developers evaluating reliability of OSS tools for non-trivial projects.

**The honest answer:**
You don't, and that's fair. The architecture is 33 markdown files that you can read, fork, and maintain yourself. If the project goes unmaintained, you can update the skill files yourself — there's no compiled binary to reverse-engineer.

This is an intentional design property: the system's logic lives in plain text files that anyone can read and modify. If the maintainer disappears, the cost of taking over is low.

**What to actually say:**
> "Fair concern. But the architecture is 33 markdown files. If the project isn't maintained, you can fork it and update it yourself — it's not compiled code. The logic is all human-readable. The 'abandonment risk' is lower than it would be for a compiled binary or hosted service."
