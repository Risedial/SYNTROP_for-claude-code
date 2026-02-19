# Twitter / X Threads

> **Source of Truth:** `metadata/system-facts.json`
> **Format:** 3 threads with different angles. Each tweet is ~280 characters max. Thread length optimized for engagement (10-15 tweets per thread).
> **Note:** Do not pad. If a tweet doesn't add information, cut it. Developer Twitter audiences disengage from threads that take 3 tweets to make one point.

---

## Thread 1: Technical Angle

*Target: Developers who'll appreciate the architecture. Best timing: weekday, 9-11am.*

---

**Tweet 1 (hook)**
```
The problem with AI coding tools isn't the code quality.

It's that every session starts from zero.

Context window ends. Project context gone.
Re-explain everything. Every. Time.

We built a structural solution.

🧵
```

---

**Tweet 2**
```
{{PRODUCT_NAME}} is 33 markdown skill files that implement a
CEO → Director → Worker orchestration chain inside Claude Code.

The CEO reads a JSON state machine.
Routes to a phase Director.
Directors delegate to 23 specialized Workers.

One /orchestrate command to start all of it.
```

---

**Tweet 3**
```
The key mechanism: orchestration-state.json

Every session:
1. Read state (phase, step, decisions, files, next action)
2. Execute next unit of work
3. Write updated state
4. Stop cleanly.

Next /orchestrate continue starts at 1.
No re-explaining. No lost context.
```

---

**Tweet 4**
```
The 5 phases:

1. Intake — brain dump → approved requirements doc
2. Research — 3-5 options → you choose
3. Architecture — blueprint → you approve
4. Execution — sprint by sprint, session by session
5. Quality — verify + test + document + deploy

Output: full project. Not a prototype.
```

---

**Tweet 5**
```
What "full project" means:

- Source code (obviously)
- Test suite
- Documentation
- Configuration
- Deployment scripts

Not "here's some code that might work."
The Quality phase makes all of these explicit deliverables.
```

---

**Tweet 6**
```
Human approval gates: 4 of them.

End of Intake: approve the requirements doc
End of Research: select the approach
End of Architecture: approve the blueprint
End of Quality: final sign-off

The system builds autonomously within phases.
You control the direction between them.
```

---

**Tweet 7**
```
What it's not:

❌ SaaS or hosted service
❌ Model-agnostic (Claude Code only)
❌ A GUI (terminal-native)
❌ Enterprise-tested (v1.0)
❌ A one-shot generator (complex = 15-20+ sessions)

All of this matters. Technical audiences deserve honest positioning.
```

---

**Tweet 8**
```
Why markdown files instead of compiled code?

- Readable: you can see exactly what each skill does
- Modifiable: change a file, behavior changes immediately
- Extensible: add a worker, register it with its Director
- Debuggable: when something fails, you know which file to read

No black boxes.
```

---

**Tweet 9**
```
The state file is human-readable:

{
  "current_phase": "execution",
  "current_step": "sprint_3",
  "decisions": [
    {"decision": "PostgreSQL", "rationale": "..."}
  ],
  "next_action": "Implement auth middleware"
}

Any developer can open it and understand the full project state.
```

---

**Tweet 10 (CTA)**
```
{{PRODUCT_NAME}} v1.0 is open source.

If you use Claude Code and build projects that span multiple sessions:
→ This solves the context problem architecturally.

If you want one-shot generators: Bolt.new, Replit Agent.
If you need model flexibility: CrewAI, LangGraph.

[GitHub link]
```

---

---

## Thread 2: Outcome Angle

*Target: Developers who respond to "here's what I shipped." Best timing: weekend, 10am-2pm.*

---

**Tweet 1 (hook)**
```
I've been building a side project for 3 weeks using an orchestration framework.

Here's what's different about it compared to normal Claude Code sessions.

🧵
```

---

**Tweet 2**
```
Normal Claude Code: Session ends → context gone.
Next session: 20 min re-explaining architecture, decisions, state.

With {{PRODUCT_NAME}}: Session ends → state written.
Next session: /orchestrate continue → picks up from sprint 4.

20 minutes saved. Every. Session.
```

---

**Tweet 3**
```
Week 1 — Intake and Research phases:

I brain-dumped the idea. The framework asked 8 clarifying questions.
Produced a requirements doc. I reviewed it. Approved it.

Then presented 3 technology approaches with a scored comparison.
I picked one. That decision is now in the state file permanently.
```

---

**Tweet 4**
```
Week 2 — Architecture:

Full technical blueprint. Database schema. API structure.
Dependencies mapped. Sprint plan with acceptance criteria per sprint.

I reviewed and approved before a single line of code was written.

This is the part AI tools usually skip.
```

---

**Tweet 5**
```
Week 3 — Execution:

/orchestrate continue → sprint 1 built + validated
/orchestrate continue → sprint 2 built + validated
[...]
/orchestrate continue → sprint 6 built + integration tests passed

Each session: 10-15 min of my time. The rest runs autonomously.
```

---

**Tweet 6**
```
End of week 3:

Source code ✅
Test suite ✅
README ✅
API documentation ✅
Deployment configuration ✅
GitHub Actions pipeline ✅

Everything generated. I reviewed and approved each.
This is what "Quality phase" means as a deliverable, not an afterthought.
```

---

**Tweet 7**
```
Total active user time: ~3 hours across 3 weeks.
Sessions: 18 (10-minute average active time each).

The project would have taken 40+ hours of manual development.
With dumber AI tools: probably 20 hours and 3 abandoned restarts.

Not magic. Structure.
```

---

**Tweet 8**
```
Honest caveats:

- Claude Code only. Not model-agnostic.
- 18 sessions means 18 /orchestrate continues. Present every time.
- v1.0 framework. There were a few rough edges I debugged manually.
- The output quality ceiling is Claude's. Some code needed cleanup.

This isn't a rosy ad. It's what actually happened.
```

---

**Tweet 9 (CTA)**
```
{{PRODUCT_NAME}} is open source.

If you use Claude Code and build projects that span more than one session,
this is the structural solution to the context problem.

[GitHub link]

(Yes, it's 33 markdown files that you can read, modify, and extend.)
```

---

---

## Thread 3: Story Angle

*Target: Broader developer audience who appreciates the "why we built this" narrative.*

---

**Tweet 1 (hook)**
```
There's a specific problem with AI coding tools that nobody talks about clearly.

It's not the code quality.
It's not the hallucinations.
It's the session boundary.

Here's what that means and how we addressed it.

🧵
```

---

**Tweet 2**
```
When an AI coding session ends, the AI forgets everything.

Not your code — that's in the files.
But the reasoning: why PostgreSQL, not SQLite. Why JWT, not sessions.
Why the auth middleware comes before the rate limiter.

Decisions. Context. Rationale.

All gone.
```

---

**Tweet 3**
```
For small tasks, this doesn't matter.
Fix a bug → session over → done.

For projects that span days or weeks:
You re-explain the entire architecture at the start of every session.

That's not a UX problem. That's a structural problem.
```

---

**Tweet 4**
```
We thought: what would a structural solution look like?

Not "better prompts" or "a longer context window."

A state machine. An explicit, persistent record of:
- Current phase
- Decisions made (with rationale)
- Files created
- Next action

Written at the end of every session.
Read at the start of every session.
```

---

**Tweet 5**
```
That became orchestration-state.json.

Every session of {{PRODUCT_NAME}} reads this file first.
Every session writes an updated version when it ends.

Sessions can end at any time — the next one picks up cleanly.
The project context survives, permanently, in a file.
```

---

**Tweet 6**
```
Around the state machine, we built a hierarchical skill architecture.

33 markdown files:
- 1 CEO orchestrator (routes based on state)
- 5 Directors (one per project phase)
- 23 Workers (specialized task executors)
- 4 Handlers (error recovery, validation, etc.)

Each file has one job. Observable. Modifiable.
```

---

**Tweet 7**
```
The result: a 5-phase pipeline.

Intake → Research → Architecture → Execution → Quality

Each phase pauses for user approval before proceeding.

You're not "fire and hope." You're reviewing requirements, selecting
approaches, approving blueprints. You stay in control of direction.
```

---

**Tweet 8**
```
Output is what distinguishes it from prototyping tools:

Not "here's some code"
Not "here's a working demo"

Source code + test suite + documentation + config + deployment scripts.

Complete. Reviewable. Deployable.
```

---

**Tweet 9**
```
We're being explicit about what it isn't:

- Not a SaaS (it's 33 markdown files you clone)
- Not model-agnostic (Claude Code only)
- Not a GUI (terminal only)
- Not a one-shot generator (complex projects = 15-20 sessions)
- Not v2.0 (it's v1.0 with real edges)

Honest positioning builds more trust than breathless launches.
```

---

**Tweet 10 (CTA)**
```
{{PRODUCT_NAME}} is live on GitHub. Open source.

If you've hit the context wall building multi-session projects
in Claude Code, this is the structural fix.

[GitHub link]

If you use a different model: CrewAI, LangGraph.
If you want browser-based: Replit Agent, Bolt.new.
Right tool for the right situation.
```
