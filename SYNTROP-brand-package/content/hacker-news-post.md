# Hacker News Post

> **Source of Truth:** `metadata/system-facts.json`
> **Audience:** Hacker News developer community. Readers are technically sophisticated, skeptical of AI hype, and will test any claim they find suspicious. Understated, honest, technical-first.
> **Format:** Show HN post + comment responses for likely questions.

---

## Show HN Title Options

*Rank these by how likely they are to generate substantive discussion without over-promising.*

**Option A (Recommended):**
```
Show HN: SYNTROP – 33 markdown skill files that turn Claude Code into a multi-session project builder
```

**Option B:**
```
Show HN: SYNTROP – a state machine approach to the context problem in multi-session AI development
```

**Option C:**
```
Show HN: SYNTROP – hierarchical prompt orchestration for building complete projects with Claude Code
```

*Recommendation: A or B. Both are technically precise and avoid hype. Option C might attract questions about how hierarchical prompt orchestration differs from existing frameworks — which is a good discussion to have.*

---

## Show HN Post Body

```
Hi HN,

I want to show you SYNTROP, a 33-file skill architecture that
extends Claude Code with a structured multi-session project pipeline.

**The problem it solves:**
Claude Code is genuinely useful for agentic coding tasks — but any project
that spans multiple sessions hits the same wall. When a session ends, all
accumulated context about the project (why PostgreSQL not MongoDB, why this
auth approach, what phase of work we're in) is gone. You re-explain at the
start of every session.

Most workarounds (CLAUDE.md, commit messages, project READMEs) help but
don't solve the structural problem. There's no persistent record of: current
phase, step, decisions made with rationale, files created, next action.

**The mechanism:**
orchestration-state.json. Every session:
1. Reads state (phase, step, decisions, file index, next action)
2. Executes the next unit of work
3. Writes updated state
4. Stops cleanly

Next `/orchestrate continue` starts at 1. No conversation history needed.
The project context survives in a file, not a session.

**The architecture:**
33 markdown skill files: 1 CEO orchestrator, 5 phase directors, 23
specialized workers, 4 handler systems. The CEO reads state and routes.
Directors manage phases. Workers execute specific tasks. Handlers manage
error recovery, state validation, context limits.

**The 5-phase pipeline:**
- Intake: brain dump → clarifying questions → Single Source of Truth doc (user approves)
- Research: 3-5 implementation options → scored decision matrix → user selects
- Architecture: technical blueprint + sprint plan → user approves before any code
- Execution: sprint by sprint across sessions
- Quality: verify against SSOT → tests → docs → deployment package

Output: source code + test suite + documentation + configuration + deployment scripts.

**Honest limitations (please read before trying it):**
- Claude Code only — not model-agnostic
- Terminal-native — no GUI
- Complex projects need 15-20+ sessions (each requiring /orchestrate continue)
- v1.0 — not battle-tested at enterprise scale
- Output quality is bounded by Claude's capabilities
- Requires Claude Pro or Max subscription ($20-100/month via Anthropic)

**What makes this different from CrewAI/LangGraph/AutoGen:**
Those are frameworks for *building* agent systems in Python. This is an agent
system *already built* — you don't write orchestration code. The skill files
are the configuration.

**What makes this different from Devin/Replit/Bolt:**
Those are session-bound or cloud-hosted. This runs locally, is architecturally
designed for multi-session use, and has explicit human approval gates at each
phase transition.

Code is on GitHub: [link]
Documentation: [link]

Interested in feedback on:
1. The state machine approach — is there prior art we missed?
2. The CEO→Director→Worker delegation pattern — how does it compare to other hierarchical agent architectures?
3. Edge cases in the state validation handler we haven't thought about
```

---

## Anticipated Comments and Honest Responses

*Write these to prepare for the discussion. Respond within the first 2 hours of posting for HN engagement.*

---

### Comment: "How is this different from just writing good CLAUDE.md files?"

```
CLAUDE.md files are project-level context that Claude reads at the start of
each session — they're really useful. SYNTROP is more structured:

- Explicit phase tracking (you're in Execution, sprint 3 of 7)
- Decision log with rationale (not just "we use PostgreSQL" but why)
- File index (which artifact lives where)
- Next-action specification (not just context but a queue)

CLAUDE.md is context. orchestration-state.json is state. Both are valuable;
the state machine adds the structured execution tracking that CLAUDE.md wasn't
designed for.

If your project fits in 2-3 sessions, you probably don't need SYNTROP.
CLAUDE.md will do it.
```

---

### Comment: "Sounds like you're just wrapping prompts around Claude Code. Why does this work reliably?"

```
Fair question. The reliability claim is nuanced:

The framework doesn't make Claude more reliable at the code-generation level.
It makes failures *recoverable* at the project level.

When a session produces bad output, the state file records what was attempted
and what the state was before. The error recovery handler captures the failure.
Next session can review, redirect, and continue from the last valid state.

That's different from a single flat prompt that either works or leaves you
reconstructing state manually. The framework adds structure around failures,
not just around successes.
```

---

### Comment: "CrewAI/LangGraph already do hierarchical multi-agent orchestration. What's new here?"

```
Good point, and worth addressing directly.

CrewAI and LangGraph are frameworks for *building* agent systems — they give
you primitives (roles, graphs, tools) and you write code to configure them.

SYNTROP is a specific agent system already built for a specific use
case (software project lifecycle) using Claude Code's skill file architecture.
The target user doesn't write orchestration code; they write project descriptions.

The analogy: Django is a web framework. Your web app built with Django is not
a new web framework. SYNTROP is to CrewAI what a specific web app
is to Django — it uses a similar *pattern* (hierarchical delegation) but it's
a concrete implementation for a concrete use case.

If you want to build your own orchestration system, CrewAI/LangGraph are better
choices. If you want to *use* a system to build software projects in Claude Code,
SYNTROP is different.
```

---

### Comment: "15-20 sessions sounds like a lot of friction. Is there a way to batch them?"

```
Yes and no. Within a session, the system runs multiple sprints if context allows —
it's not strictly one-sprint-per-session. Shorter sprints in simpler projects can
be done 2-3 per session.

The per-session checkpoint is there because: (1) Claude Code sessions have context
limits and (2) the state machine cleans up at clean stopping points. You could
potentially configure shorter sprints to batch more per session.

15-20 sessions is the estimate for projects that would take a senior developer
2-3 weeks. Your active time per session is 5-15 minutes (reading output,
approving, running the next continue). Total active user time is 2-5 hours for
that level of project.

Whether that's "a lot of friction" depends on what you're comparing to. Versus
doing it manually: less. Versus a one-shot generator: more, but with better output.
```

---

### Comment: "What happens when the state file gets corrupted?"

```
State validation handler runs before every session and checks:
- Valid JSON syntax
- All referenced files in file_index exist
- Current phase/step are valid states

If validation fails, it reports the specific corruption and provides recovery options.

The honest answer: there's no automatic rollback. The recovery is manual —
you edit the state file based on context-summary.md (a human-readable
snapshot) to restore a valid state.

This is a real limitation of v1.0. Auto-backup of state before each session
is on the improvement list. In the meantime: back up orchestration-state.json
before major session runs.
```

---

### Comment: "Isn't this just prompt engineering with extra steps?"

```
In one sense, yes. All of this is prompts that Claude interprets.

The "extra steps" are: a state machine, a hierarchical delegation chain,
explicit phase management, and structured error handling. Whether you call
that "just prompt engineering" or "a framework built on prompt engineering"
is a framing question.

The practical difference from ad-hoc prompting: consistency, recoverability,
and structure. The same way Rails is "just Ruby with structure" — the structure
is the contribution.

If ad-hoc Claude Code sessions work well for you, they're probably better
than adding this overhead. If multi-session projects are losing context and
momentum, the structure is worth it.
```
