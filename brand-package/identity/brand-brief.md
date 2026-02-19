# Brand Brief

> **Source of Truth:** `metadata/system-facts.json`
> **Purpose:** This document defines the strategic brand foundation for {{PRODUCT_NAME}}. It should be the first document read by anyone creating brand assets — copywriters, designers, community managers, or contributors writing documentation.

---

## Brand Essence

**In one word:** Structure

**What that means for {{PRODUCT_NAME}}:**
Every problem {{PRODUCT_NAME}} solves comes down to structure. AI coding tools are powerful but unstructured — they work well in the moment but leave no lasting framework. {{PRODUCT_NAME}} provides the structure that turns ad-hoc AI sessions into a repeatable, trackable, recoverable project process.

Structure is not glamorous. It is, however, what separates prototypes from shipped products.

---

## Brand Mission

**To solve the structural problems in multi-session AI development so that developers can build complete software projects — not just code fragments — using the AI tools they already have.**

Not: "Democratize AI development" (too broad)
Not: "Replace developers" (wrong frame)
Not: "The future of software engineering" (unverifiable claim)

Just: Solve the specific problem of context loss and workflow structure in multi-session AI project building.

---

## Brand Personality

{{PRODUCT_NAME}} communicates like a senior engineer who has solved this exact problem and wants to explain how. Not flashy. Not marketing-speak. Direct, precise, and confident without arrogance.

**Five personality attributes:**

1. **Precise** — Uses exact numbers and specific terms. "33 skill files" not "dozens." "5 phases" not "a multi-phase process."

2. **Honest** — Leads with limitations when relevant. Doesn't claim to solve problems it doesn't solve. Doesn't use hyperbole that developers will immediately distrust.

3. **Architectural** — Thinks in systems. Explains the _how_ behind the _what_. Developers who like systems thinking will feel at home.

4. **Understated** — The work speaks louder than the marketing copy. Avoids breathless claims. Would rather show a concrete architecture diagram than write "revolutionary."

5. **Practical** — Cares about whether it ships. Not about whether it's theoretically elegant. The measure of success is deployment-ready code, not interesting architecture patterns.

---

## Brand Voice Summary

| DO | DON'T |
|---|---|
| "33 skill files implement a hierarchical CEO→Director→Worker chain" | "Powerful AI-driven orchestration platform" |
| "The state machine reads where you stopped and picks up exactly there" | "Seamless multi-session continuity" |
| "Requires Claude Code — not model-agnostic" | [Omit limitations] |
| "It doesn't add capabilities Claude doesn't have. It adds structure." | "Supercharges your AI workflow" |
| "Complex projects may need 15-20 sessions" | "Build any project in record time" |

Full voice and tone guide: `identity/voice-and-tone.md`

---

## Brand Story

**The problem that created {{PRODUCT_NAME}}:**

Claude Code is a genuinely useful agentic coding tool. But building a complete project with it runs into a predictable wall: the context window ends, the session resets, and you spend the first 20 minutes of every new session re-explaining what you built and where you are.

Workarounds exist — CLAUDE.md files, detailed commit messages, project READMEs — but they require manual effort and still don't give the AI the structured understanding of _why_ decisions were made, what phase of work is next, and what the acceptance criteria are.

{{PRODUCT_NAME}} is a structural solution to a structural problem. Instead of trying to pack everything into a single conversation, it designs for the session boundary: a state machine captures every decision, every phase transition, every sprint completion. Fresh sessions start from the state file, not from the conversation history.

The result is a project-building process that can span unlimited sessions while maintaining full context about where it is and where it's going.

**What makes this worth releasing:**

It's not a SaaS with a VC runway. It's a 33-file skill architecture that other Claude Code users can adopt, extend, and improve. If it solves the multi-session context problem for even a fraction of developers building non-trivial projects with Claude Code, that's meaningful.

---

## Brand Architecture

**Product layer (what you interact with):**
`/orchestrate` — The single command that surfaces everything. No complex CLI syntax to learn.

**System layer (what makes it work):**
The 33 skill files — CEO, 5 Directors, 23 Workers, 4 Handlers — plus the state machine.

**Output layer (what you get):**
A deployment-ready software project: source code, tests, documentation, configuration, deployment scripts.

---

## Brand Constraints

What the brand must NEVER claim or imply:

- That it replaces developers
- That it produces perfect code without review
- That it works for non-technical users (v1.0 is terminal-native)
- That it is model-agnostic (it is not)
- That it works on any scale (v1.0 is not battle-tested at enterprise scale)
- That it is a SaaS or hosted product
- That it competes with Devin, Replit, or other well-funded products on their terms

---

## Brand Opportunity

The AI coding tool market is flooded with products that promise to build your app while you sleep. Every developer has been disappointed by at least one of them. {{PRODUCT_NAME}}'s opportunity is to win by being the brand that tells the truth — about what it does, what it doesn't do, and why the architecture is the way it is.

Developers who choose {{PRODUCT_NAME}} should choose it because they understand exactly what they're getting and believe it's the right tool for their specific situation. That kind of adoption is more durable than hype-driven signups that churn when expectations aren't met.

**The brand promise:**
{{PRODUCT_NAME}} delivers what it says it delivers: a structured multi-session pipeline that turns your brain dump into a deployment-ready project, using Claude Code, with you in control at every phase gate.
