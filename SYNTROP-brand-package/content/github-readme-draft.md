# GitHub README Draft

> **Source of Truth:** `metadata/system-facts.json`
> **Usage:** This is a ready-to-use draft for the repository's `README.md`. Replace `SYNTROP`, `The structure your vision is missing.`, `{{LOGO_URL}}`, and `{{WEBSITE_URL}}` with finalized values. Follow conventions noted inline.

---

<!-- README DRAFT BEGINS BELOW THIS LINE -->

# SYNTROP

<!-- Badge row — update with real shields.io badges once repo is live -->
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/requires-Claude%20Code-orange.svg)](https://claude.ai/product/claude-code)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](CHANGELOG.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**The structure your vision is missing.**

<!-- Insert demo GIF here. Recommended: record a terminal session showing /orchestrate [idea] → SSOT approval → /orchestrate continue → sprint completion -->
<!-- ![SYNTROP demo]({{LOGO_URL}}) -->

SYNTROP is a 33-file skill architecture that turns Claude Code into a structured multi-session project builder. One `/orchestrate` command runs a complete 5-phase pipeline — from raw idea through deployment-ready output — across as many sessions as your project needs, with full context recovery between them.

**Not a SaaS. Not a hosted service. Not model-agnostic.** It runs locally inside Claude Code with no additional infrastructure.

---

## Quick Start

```bash
# You need Claude Code installed and authenticated
# https://claude.ai/product/claude-code

# Clone the repository
git clone https://github.com/[your-org]/SYNTROP
cd SYNTROP

# Start a new project
claude
> /orchestrate Build a REST API for managing personal book collections with auth and PostgreSQL

# Resume an existing project (next session)
> /orchestrate continue

# Check status without executing
> /orchestrate status
```

That's it. The framework handles the rest.

---

## What It Does

You give it an idea — messy, incomplete, or fully formed. It runs through 5 phases:

| Phase | What Happens | What You Do |
|-------|-------------|-------------|
| **1. Intake** | Extracts requirements from your brain dump, generates clarifying questions, produces a Single Source of Truth document | Review and approve the SSOT |
| **2. Research** | Investigates 3-5 implementation approaches, scores each against your requirements, recommends one | Select the approach |
| **3. Architecture** | Creates a technical blueprint, maps dependencies, generates a sprint-based implementation plan | Review and approve the blueprint |
| **4. Execution** | Sets up environment, implements sprint by sprint, runs validation and integration tests per sprint | `/orchestrate continue` to start each session |
| **5. Quality** | Verifies output against original vision, runs quality checks, generates documentation, packages for deployment | Final review and sign-off |

**Output:** Source code + test suite + documentation + configuration + deployment scripts.

---

## Why This Exists

Claude Code is an excellent agentic coding tool — for tasks that fit in one session. Real projects don't.

When a session ends, context is gone. Developers building multi-session projects face the same problem: spend the first 20 minutes of every session re-explaining the architecture, the decisions already made, and where development stopped.

SYNTROP solves this with a state machine (`orchestration-state.json`). Every session reads state first, executes, writes updated state, and stops cleanly. The next session picks up from the exact stopping point. Sessions end when work is complete, not when context runs out.

---

## Architecture

```
/orchestrate
    │
    ▼
CEO-ORCHESTRATOR.md (1 file)
Reads orchestration-state.json → routes to current phase Director
    │
    ├── intake-director.md         → vision-clarifier, requirements-extractor, ssot-generator
    ├── research-director.md       → approach-researcher, decision-matrix-builder, recommender
    ├── architecture-director.md   → blueprint-architect, dependency-mapper, sprint-planner
    ├── execution-director.md      → environment-setup, step-executor, sprint-validator, integration-tester
    └── quality-director.md        → vision-verifier, quality-checker, doc-generator, deployment-packager

Handlers (cross-cutting):
    ├── user-input-handler.md      (clarifies ambiguous inputs)
    ├── error-recovery-handler.md  (handles execution failures)
    ├── state-validation-handler.md (checks state integrity before each session)
    └── context-monitor-handler.md  (manages context window boundaries)

Total: 1 CEO + 5 Directors + 23 Workers + 4 Handlers = 33 skill files
State: orchestration-state.json (persistent memory across all sessions)
```

### The State Machine

```json
{
  "current_phase": "execution",
  "current_step": "sprint_3",
  "phases_completed": ["intake", "research", "architecture"],
  "decisions": [
    {
      "phase": "research",
      "decision": "Use PostgreSQL + Prisma",
      "rationale": "Matches team's existing stack; better type safety than raw SQL"
    }
  ],
  "file_index": {
    "ssot": "project/ssot.md",
    "blueprint": "project/blueprint.md"
  },
  "next_action": "Implement authentication middleware per sprint_3 scope"
}
```

---

## Requirements

| Requirement | Details |
|-------------|---------|
| Claude Code | Required — [install here](https://claude.ai/product/claude-code) |
| Claude subscription | Pro or Max (required by Claude Code) |
| Operating system | Any OS supported by Claude Code |
| Additional tools | None |
| Additional API keys | None |

---

## Commands

| Command | Action |
|---------|--------|
| `/orchestrate [idea]` | Start a new project from a brain dump |
| `/orchestrate continue` | Resume from where the last session left off |
| `/orchestrate status` | Show current phase, step, and progress without executing |
| `/orchestrate reset` | Clear project state and start fresh |

---

## What SYNTROP Is Not

**Be clear-eyed about the tradeoffs before you start:**

- **Not model-agnostic** — Requires Claude Code. GPT-4, Gemini, and other models are not supported.
- **Not a one-shot generator** — Complex projects require 15-20+ sessions, each started with `/orchestrate continue`.
- **Not a GUI tool** — Terminal-native only. No web dashboard.
- **Not enterprise-tested** — This is v1.0. Not battle-tested at scale.
- **Not a replacement for review** — Output quality is bounded by Claude's capabilities. Review everything before shipping.

If you want a browser-based tool, see Bolt.new or Replit Agent. If you need model flexibility, see CrewAI or LangGraph.

---

## Comparison

| Feature | SYNTROP | Devin | Cursor Agent | Replit Agent |
|---------|-----------------|-------|--------------|--------------|
| Multi-session continuity | ✅ State machine | ❌ | ❌ | Partial |
| Local / no cloud | ✅ | ❌ | ✅ | ❌ |
| Human approval gates | ✅ 4 built-in | ❌ | ❌ | ❌ |
| Full project output | ✅ | ✅ | Partial | Partial |
| Open source | ✅ | ❌ | ❌ | ❌ |
| Cost beyond your plan | $0 | $20-500/mo | Cursor sub | Replit sub |

---

## File Structure

```
your-project/
├── CEO-ORCHESTRATOR.md           # Master controller
├── directors/
│   ├── intake-director.md
│   ├── research-director.md
│   ├── architecture-director.md
│   ├── execution-director.md
│   └── quality-director.md
├── workers/                      # 23 specialized task executors
├── handlers/                     # 4 support systems
├── orchestration-state.json      # Persistent memory (do not delete)
├── context-summary.md            # Human-readable state snapshot
├── file-index.json               # Maps artifacts to file paths
└── init-workspace.sh             # Auto-runs on first /orchestrate
```

---

## Contributing

SYNTROP is built to be extended. The most useful contributions:

- **New workers** — Additional specialized task executors for phases that need more granularity
- **Bug reports** — Especially state machine edge cases and recovery failures
- **Real-world project reports** — What worked, what didn't, what broke
- **Phase refinements** — Better prompting strategies discovered through use

See [CONTRIBUTING.md](CONTRIBUTING.md) for the worker file format and contribution guidelines.

---

## File Format: Adding a Worker

Workers are markdown files following this structure:

```markdown
# [Worker Name]

## Context Load
[What this worker reads before executing]

## Execution
[Step-by-step instructions for this worker's task]

## State Update
[What this worker writes to orchestration-state.json]
```

Register the new worker in the appropriate Director's skill file.

---

## Documentation

- [User Guide](USER-GUIDE.md) — Full usage guide with examples
- [Troubleshooting](TROUBLESHOOTING.md) — Common issues and recovery
- [Architecture Reference](docs/architecture.md) — Detailed skill file documentation
- [State Schema](docs/state-schema.md) — Full orchestration-state.json schema

---

## License

[LICENSE](LICENSE) — specify license type

---

## Acknowledgments

Built on Claude Code (Anthropic). The orchestration pattern is inspired by hierarchical management structures and structured multi-agent frameworks. The state machine design is original to this project.

---

*SYNTROP v1.0.0 · Not affiliated with Anthropic · Requires Claude Pro or Max subscription*

<!-- README DRAFT ENDS ABOVE THIS LINE -->
