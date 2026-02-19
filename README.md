# AI Orchestration System for Claude Code

Build complete software projects with a single command. Type `/orchestrate [your idea]`, answer a few questions, and the system handles everything — requirements, research, architecture, implementation, testing, and deployment prep — across multiple chat sessions, fully autonomously.

## How It Works

The system breaks project development into 5 phases, each managed by a dedicated director that coordinates specialized workers:

```
Intake → Research → Architecture → Execution → Quality
```

1. **Intake** — You describe your idea (messy brain dumps welcome). The system asks clarifying questions, extracts requirements, and produces a Single Source of Truth document for your approval.

2. **Research** — The system investigates 3-5 implementation approaches, analyzes trade-offs, and presents a scored decision matrix. You pick the approach.

3. **Architecture** — A detailed blueprint is created: system design, dependency mapping, complexity analysis, and a sprint-by-sprint implementation plan. You approve the plan.

4. **Execution** — The system builds your project sprint by sprint, validating each sprint and checking for vision drift along the way.

5. **Quality** — Output is verified against your original vision. Quality checks run, documentation is generated, and a deployment package is prepared.

Each phase runs across fresh chat sessions. State files maintain full continuity between sessions — you never need to re-explain context.

## Quick Start

### Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI installed and configured

### Usage

Clone this repository and open it in Claude Code. Then:

```
/orchestrate I want to build a SaaS platform that helps restaurants manage
online orders from multiple delivery platforms in one dashboard
```

That's it. The system initializes, analyzes your idea, and starts the intake phase.

### Continuing Across Sessions

Each chat session ends at a natural checkpoint. Start a new chat and run:

```
/orchestrate continue
```

The system reads its state files and picks up exactly where it left off.

### All Commands

| Command | Description |
|---------|-------------|
| `/orchestrate [your idea]` | Start a new project from a brain dump |
| `/orchestrate continue` | Resume from where the last session stopped |
| `/orchestrate status` | Show current progress without executing |
| `/orchestrate reset` | Clear all data and start fresh |

## System Architecture

```
CEO-ORCHESTRATOR.md             ← Master controller, entry point for every session
├── directors/                  ← 5 phase managers
│   ├── INTAKE-DIRECTOR.md
│   ├── RESEARCH-DIRECTOR.md
│   ├── ARCHITECTURE-DIRECTOR.md
│   ├── EXECUTION-DIRECTOR.md
│   └── QUALITY-DIRECTOR.md
├── workers/                    ← 23 specialized task executors
│   ├── vision-clarifier.md
│   ├── requirements-extractor.md
│   ├── approach-researcher.md
│   ├── blueprint-architect.md
│   ├── step-executor.md
│   ├── quality-checker.md
│   └── ... (17 more)
├── handlers/                   ← 4 support systems
│   ├── STATE-VALIDATOR.md
│   ├── USER-INPUT-HANDLER.md
│   ├── CONTEXT-MONITOR.md
│   └── ERROR-RECOVERY.md
└── artifacts/                  ← Generated outputs, organized by phase
    ├── intake/
    ├── research/
    ├── architecture/
    ├── execution/
    └── quality/
```

### State Files

| File | Purpose |
|------|---------|
| `orchestration-state.json` | System memory — tracks phase, step, decisions, and progress |
| `context-summary.md` | Human-readable orientation for each session |
| `file-index.json` | Maps all generated artifacts to file paths |
| `progress-log.md` | History of completed steps |

## Design Principles

**Stateless execution, stateful workspace.** Every chat session starts with zero conversation history. All context is loaded from workspace files. The orchestration state file is the entire system memory — read first, update last, every session.

**Hierarchical delegation.** The CEO orchestrator routes to directors, directors delegate to workers, workers execute and report back. Each skill file contains precise instructions for its role.

**Vision alignment.** The system periodically checks that implementation hasn't drifted from your original vision, catching divergence early.

**Error recovery.** If something goes wrong, the system presents recovery options — retry, skip, roll back, or get guidance — rather than failing silently.

## What You'll Do

Your total active involvement across an entire project:

- **5-10 inputs** — answering questions, approving documents, selecting approaches
- **5-15 `/orchestrate continue` commands** — depending on project complexity
- The system handles everything else

## Documentation

- [User Guide](USER-GUIDE.md) — detailed usage walkthrough with examples
- [Troubleshooting](TROUBLESHOOTING.md) — common issues and recovery procedures

## License

See [LICENSE](LICENSE) for details.
