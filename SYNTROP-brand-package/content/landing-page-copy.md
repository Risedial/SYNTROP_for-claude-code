# Landing Page Copy

> **Source of Truth:** `metadata/system-facts.json`
> **Format:** Wireframe-ready sections with clear hierarchy. Each section labeled with its position on the page and recommended visual treatment.

---

## Section 1: Hero

**[ABOVE THE FOLD]**

---

### Logo / Wordmark Area
`{{LOGO_URL}}` (to be inserted)

---

### Primary Headline (H1)

```
The context window ends.
Your project doesn't.
```

*Typographic note: Consider splitting across two lines for visual weight. "Your project doesn't." is the resolution — could be styled differently.*

---

### Subheadline (H2)

```
SYNTROP is a structured multi-session pipeline for Claude Code.
From brain dump to deployment-ready project — across unlimited sessions,
with full context recovery between them.
```

---

### Three Proof Points (icon + short label, horizontal row)

| | | |
|---|---|---|
| 🗂 33 skill files | 🔄 5-phase pipeline | ✅ 4 approval gates |
| CEO → Director → Worker | Intake through Quality | You control direction |

*Note: Remove emojis if brand direction goes clean/minimal. Replace with custom icons.*

---

### Primary CTA

```
[Get Started on GitHub →]
```

Secondary CTA (smaller, below):

```
[Read the Technical Docs]
```

---

### Honest One-Liner (below CTAs, smaller text)

```
Requires Claude Code (Claude Pro or Max). Terminal-native. v1.0 open source.
```

*Include this. Developer audiences will distrust a page that doesn't tell them what it requires.*

---

---

## Section 2: The Problem

**[IMMEDIATELY BELOW FOLD]**

---

### Section Header

```
AI coding tools have a context problem.
```

---

### Body Copy

```
Claude Code is a genuinely useful agentic coding tool. For projects that fit
in one session.

For anything larger — a side project, an MVP, a client tool — you hit the
same wall. The session ends. Context is gone. You spend the first 20 minutes
of every new session re-explaining what you built, why you built it that way,
and where you left off.

Most workarounds (detailed CLAUDE.md files, commit messages, project READMEs)
help but don't solve the structural problem: there's no persistent state
machine tracking phase, decisions, file index, and next action.

SYNTROP is that state machine.
```

---

### Visual Suggestion

Split-screen: Left side shows "without SYNTROP" (session starts from scratch, re-explaining context, lost decisions). Right side shows "with SYNTROP" (session reads state, picks up from sprint_3, no context re-establishment needed).

---

---

## Section 3: How It Works

**[STEP-BY-STEP FLOW]**

---

### Section Header

```
One command. Five phases. Complete projects.
```

---

### Subheader

```
/orchestrate handles everything.
```

---

### Phase Cards (5 cards, horizontal scroll on mobile, horizontal row on desktop)

**Card 1 — Intake**
```
Phase 1: Intake

You give it your idea — messy, incomplete,
contradictory. Fine.

It asks clarifying questions. Extracts
requirements. Produces a Single Source of
Truth document.

You approve it before anything else happens.
```

**Card 2 — Research**
```
Phase 2: Research

It investigates 3-5 implementation approaches.
Builds a scored decision matrix.
Recommends one.

You choose.
```

**Card 3 — Architecture**
```
Phase 3: Architecture

Full technical blueprint: components,
interfaces, data models, dependencies.

Sprint-based implementation plan with
scope and acceptance criteria per sprint.

You approve before any code is written.
```

**Card 4 — Execution**
```
Phase 4: Execution

Sprint by sprint. Session by session.

/orchestrate continue → next sprint.
State machine tracks everything in between.

You check in. It builds.
```

**Card 5 — Quality**
```
Phase 5: Quality

Verifies output against your original vision.
Runs quality checks.
Generates documentation.
Packages for deployment.

You sign off.
```

---

### Under Phase Cards

```
Output: Source code + tests + documentation +
        configuration + deployment scripts.
```

---

---

## Section 4: The Technical Approach

**[FOR THE DEVELOPERS WHO WANT TO UNDERSTAND THE MECHANISM]**

---

### Section Header

```
How the state machine works.
```

---

### Body Copy

```
Every session follows the same cycle:

1. Read orchestration-state.json
   (current phase, step, decisions made, files created, next action)

2. Execute next action(s)

3. Write updated state

4. Stop cleanly.

The next /orchestrate continue starts at step 1. No conversation history
required. No re-explaining. The project lives in a file, not in a session.
```

---

### Code Block (visual treatment)

```json
{
  "current_phase": "execution",
  "current_step": "sprint_3",
  "phases_completed": ["intake", "research", "architecture"],
  "decisions": [
    {
      "phase": "research",
      "decision": "PostgreSQL + Prisma ORM",
      "rationale": "Matches team stack; type-safe queries for this schema"
    }
  ],
  "next_action": "Implement JWT authentication middleware"
}
```

Caption under code block:
```
The state file after two weeks of work. Every decision documented.
Every file tracked. Next action ready.
```

---

### Architecture Diagram (ASCII, for technical audiences who distrust graphics)

```
/orchestrate
    │
    ▼
CEO-ORCHESTRATOR (reads state → routes to phase)
    │
    ├── Intake Director    → 3 workers
    ├── Research Director  → 3 workers
    ├── Architecture Director → 3 workers
    ├── Execution Director → 4 workers
    └── Quality Director   → 4 workers

        + 4 handlers (error recovery, state validation,
          context monitoring, user input)

33 markdown skill files. No compiled code.
State machine in JSON. Observable at every step.
```

---

---

## Section 5: Comparison

**[HONEST POSITIONING TABLE]**

---

### Section Header

```
How SYNTROP fits in the landscape.
```

---

### Table

| | SYNTROP | Devin | Cursor Agent | Replit Agent | Bolt.new |
|---|---|---|---|---|---|
| Multi-session state | ✅ State machine | ❌ | ❌ | Partial | ❌ |
| Local / no cloud | ✅ | ❌ | ✅ | ❌ | ❌ |
| Human approval gates | ✅ 4 | ❌ | ❌ | ❌ | ❌ |
| Full project output | ✅ | ✅ | Partial | MVP only | MVP only |
| Open source | ✅ | ❌ | ❌ | ❌ | ❌ |
| Cost beyond plan | $0 | $20-500/mo | Cursor sub | Replit sub | Token-based |

---

### Under Table (honest framing)

```
The right tool depends on your situation.

Use Replit Agent or Bolt.new for quick prototypes with a lower technical barrier.
Use Devin for defined tasks in a cloud environment with dedicated support.
Use Cursor for multi-file IDE changes within a session.

Use SYNTROP when you're building a complete project with Claude Code
across multiple sessions, and you want structure, control, and persistent context.
```

---

---

## Section 6: Who It's For

**[PERSONA OVERVIEW]**

---

### Section Header

```
Built for developers working in Claude Code.
```

---

### Three Persona Callouts (horizontal cards)

**Card 1**
```
Side-project developers

Your project spans more than one conversation.
The context wall is killing your momentum.
You want to pick up where you left off without
re-explaining your architecture.
```

**Card 2**
```
Agency dev leads

You need complete deliverables, not just code.
SSOT documents double as client specs.
Phase gates give you the review structure
you'd build manually anyway.
```

**Card 3**
```
Technical founders

You have the idea and enough technical depth
to review decisions. You need a structured
process that keeps you in control without
requiring constant coding.
```

---

---

## Section 7: Honest Limitations

**[DON'T SKIP THIS — IT'S A TRUST SIGNAL]**

---

### Section Header

```
What SYNTROP is not.
```

---

### Limitation List

```
Not model-agnostic. Claude Code only.

Not a one-shot generator. Complex projects need 15-20+ sessions.

Not a GUI. Terminal-native. Requires CLI comfort.

Not enterprise-tested. v1.0. Use alongside human review.

Not magic. Output quality is bounded by Claude's capabilities.
```

---

---

## Section 8: Get Started

**[FINAL CTA]**

---

### Section Header

```
Start with your next project.
```

---

### Body

```
If you have Claude Code, you have everything you need.

git clone {{REPOSITORY_URL}}

Then, in Claude Code:
/orchestrate [your project idea]
```

---

### CTA Buttons

```
[View on GitHub →]        [Read the Docs]
```

---

### Footer Note

```
SYNTROP v1.0.0 · Open source ·
Requires Claude Pro or Max subscription ·
Not affiliated with Anthropic
```
