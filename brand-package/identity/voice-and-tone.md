# Voice and Tone

> **Source of Truth:** `metadata/system-facts.json`
> **Purpose:** Writing style guide for all {{PRODUCT_NAME}} communications — documentation, marketing copy, README, social posts. Read before writing anything public.

---

## The Core Voice: Technical and Honest

{{PRODUCT_NAME}} communicates like a senior engineer who solved this exact problem and wants to explain how — not pitch it.

**Three words that define the voice:**
1. **Precise** — Exact facts, not approximate marketing language
2. **Direct** — Say what it does. Say what it doesn't. Move on.
3. **Understated** — Let the architecture speak. Don't dress it up.

---

## What "Precise" Means in Practice

Precision is the first test of every sentence we write.

**Before:** "Dozens of specialized AI agents work together to build your software."
**After:** "33 skill files implement a CEO→Director→Worker delegation chain across 5 project phases."

**Before:** "Powerful multi-session support that never loses your work."
**After:** "A JSON state machine (`orchestration-state.json`) records phase, progress, and decisions. Every new session reads this file first."

**Before:** "Seamless context recovery between sessions."
**After:** "When a session ends, state is written. When the next session starts, it reads state and resumes from the exact stopping point."

**The test:** Could a skeptical developer disprove this claim by reading the code? If yes, rewrite it. If no, the claim is specific enough.

---

## What "Direct" Means in Practice

Cut qualifiers. Cut hedges where they don't add information. Cut compliments ("{{PRODUCT_NAME}} is proud to..."). Start with the action.

**Before:** "We believe that multi-session AI development is a problem worth solving, and we're excited to share our approach with the community."
**After:** "Multi-session AI development has a context problem. {{PRODUCT_NAME}} solves it with a state machine."

**Before:** "You might find that the Intake phase is helpful for clarifying your initial requirements."
**After:** "The Intake phase extracts structured requirements from a raw brain dump and produces a Single Source of Truth document for your approval."

**The test:** Remove the first sentence. Does the paragraph still work? If yes, the first sentence was throat-clearing.

---

## What "Understated" Means in Practice

The architecture is genuinely interesting. Let it be interesting without decoration.

**Before:** "Revolutionary AI orchestration that transforms the way you build software."
**After:** "A 33-file skill architecture that turns `/orchestrate` into a complete 5-phase project pipeline."

**Before:** "{{PRODUCT_NAME}} supercharges your development workflow."
**After:** "{{PRODUCT_NAME}} adds the structure layer that Claude Code doesn't have by default."

**The test:** Would a developer who reads this and then looks at the code feel that the copy oversold? If yes, tone it down.

---

## Words and Phrases: Use and Avoid

### Always Use (or their equivalents)

| Use | Why |
|---|---|
| "state machine" | Accurate technical term for the core innovation |
| "skill files" | What the 33 files actually are |
| "phase gate" | Accurate term for user approval checkpoints |
| "deployment-ready" | Specific quality bar for output |
| "terminal-native" | Honest about the UX requirement |
| "v1.0" | Signals honest development status |
| "Claude Code" | Accurate attribution, not hidden dependency |
| Exact counts (33, 5, 23, 4) | Precision builds credibility |

### Never Use

| Avoid | Why |
|---|---|
| "revolutionary" | Unverifiable, developer community will distrust it |
| "supercharge" | Marketing cliché with no specific meaning |
| "seamlessly" | No such thing; always has friction somewhere |
| "powerful" | Says nothing. What does it do with that power? |
| "intuitive" | Who decides what's intuitive? Be specific about UX instead. |
| "leverage" | Corporate speak. Use "use." |
| "unlock" | Cliché. Say what it enables instead. |
| "next-generation" | Meaningless without a defined prior generation |
| "game-changing" | Overused, underdelivered in this industry |
| "AI-powered" | Everything is AI-powered in 2025. Differentiates nothing. |
| "magic" | The opposite of what we are. This is architecture, not magic. |

---

## Tone Modulation by Context

The voice stays consistent. The tone adjusts based on format and audience.

### README / Technical Documentation
**Tone:** Neutral, instructional, precise
**Example:**
> The `/orchestrate` command reads `CEO-ORCHESTRATOR.md`, which reads `orchestration-state.json`, determines the current phase, and delegates to the appropriate Director skill file. Directors delegate to Workers. Workers execute tasks and update state. See `CEO-ORCHESTRATOR.md` for the complete routing logic.

**What to avoid:** Enthusiasm, personality, selling. Documentation is for users who have already decided. Give them what they need.

---

### GitHub README (public-facing intro section)
**Tone:** Direct, confident, slightly more accessible
**Example:**
> {{PRODUCT_NAME}} solves the context problem in multi-session AI development. When your project is too large for one conversation — and it will be — the system writes state after every session and reads it back at the start of the next. You `/orchestrate continue` and it picks up exactly where it left off.

**What to avoid:** Feature lists without context, wall-of-text, underselling the actual innovation.

---

### Product Hunt / Launch Announcement
**Tone:** Slightly warmer, still honest, results-focused
**Example:**
> We built {{PRODUCT_NAME}} because we kept hitting the same wall: Claude Code is excellent at writing code, but building a full project across a week of sessions meant re-explaining the architecture every time. The solution was a state machine. Now `/orchestrate continue` means exactly that — continue, from the exact state we left.

**What to avoid:** Excessive enthusiasm, claims that aren't in `system-facts.json`, competitive trash-talk.

---

### Twitter / X
**Tone:** Crisp, punchy, conversational without being casual
**Example:**
> The problem with AI coding tools isn't the code.
> It's that every session starts from zero.
> {{PRODUCT_NAME}} uses a state machine to solve this. 33 skill files. 5 phases. One command.
> Open source, local, no extra infrastructure.

**What to avoid:** Thread padding (saying nothing for 3 tweets before the point), emojis unless they add meaning, engagement bait.

---

### Hacker News
**Tone:** Technical, self-aware, anticipating skepticism, showing your work
**Example:**
> Show HN: {{PRODUCT_NAME}} — a 33-file skill architecture that turns Claude Code into a multi-session project builder
>
> Context: Claude Code is great for tasks that fit in one session. For anything larger, you lose context when the session ends. This is the structural problem we built {{PRODUCT_NAME}} to solve.
>
> The mechanism: a JSON state machine (`orchestration-state.json`) records phase, step, decisions, and file index. Each new session reads this first, then executes, then updates state.
>
> What it's not: not a SaaS, not cloud-hosted, not model-agnostic (requires Claude Code), not battle-tested at enterprise scale.

**What to avoid:** Marketing language, claims without evidence, underselling the technical approach.

---

## Writing Process Checklist

Before publishing any piece of copy:

1. **Fact-check against `metadata/system-facts.json`** — Is every claim verifiable?
2. **Remove superlatives** — Replace each adjective with a specific fact or delete it.
3. **Check for implied claims** — Does anything suggest capabilities not in the system?
4. **Read aloud** — If it sounds like a product commercial, rewrite it.
5. **The skeptic test** — Imagine a senior developer reading this who has been burned by AI hype before. Would they trust it? Or roll their eyes?

---

## Examples: Full Rewrites

### Example 1: Feature Description

**Original (avoid):**
"{{PRODUCT_NAME}}'s revolutionary AI-powered Intake phase intelligently transforms your messy thoughts into a perfectly structured project specification that will supercharge your development process."

**Rewritten:**
"The Intake phase accepts a raw brain dump — contradictions, gaps, and half-formed ideas included — and produces a Single Source of Truth document that you review and approve before any code is written."

---

### Example 2: Value Proposition

**Original (avoid):**
"Experience seamless multi-session development powered by next-generation state persistence technology."

**Rewritten:**
"When a session ends, `orchestration-state.json` is updated with the current phase, completed steps, and next action. The next session reads this file before doing anything else. No re-explaining. No lost context."

---

### Example 3: Limitation Disclosure

**Original (avoid):**
"Some users may find the process requires patience for larger projects."

**Rewritten:**
"Complex projects may require 15-20 chat sessions. Each session requires a `/orchestrate continue` command to start. This is a multi-day workflow, not a one-shot generator."
