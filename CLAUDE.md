# AI Orchestration System

This workspace contains a complete AI orchestration framework that manages projects from initial brain dump through deployment-ready deliverables using a hierarchical skill architecture.

## Primary Commands

| Command | When to use |
|---------|-------------|
| `/start` | Starting a new project. Run this first, before /orchestrate, for any new project. |
| `/orchestrate [your idea]` | Start a new project directly with your idea as text (skips /start wizard) |
| `/orchestrate` | Resume current project (auto-detects where you left off) |
| `/orchestrate status` | Show current progress without executing any steps |
| `/orchestrate reset` | Clear all project data and start fresh |

## System Architecture

```
SYNTROP/CEO-ORCHESTRATOR.md     ← Master controller (reads this every /orchestrate invocation)
├── SYNTROP/directors/          ← 5 phase managers (Intake, Research, Architecture, Execution, Quality)
├── SYNTROP/workers/            ← 23 specialized task executors
└── SYNTROP/handlers/           ← 4 support systems (Input, Errors, State, Context)
```

## Key Files

| File | Purpose |
|------|---------|
| `SYNTROP/orchestration-state.json` | System memory — tracks phase, step, decisions, progress |
| `SYNTROP/context-summary.md` | Quick orientation — project name, current state, key decisions |
| `SYNTROP/file-index.json` | Maps all generated artifacts to their file paths |
| `SYNTROP/CEO-ORCHESTRATOR.md` | Full protocol for the master controller |
| `SYNTROP/init-workspace.sh` | Creates directory structure (run automatically on first /orchestrate) |

## Core Principle: Stateless Execution, Stateful Workspace

Every chat session starts with ZERO conversation history. All context comes from reading workspace files. The `orchestration-state.json` file is the entire system memory. Always read it first. Always update it after completing work.

## Behavioral Rules

1. When `/orchestrate` is invoked, read `SYNTROP/CEO-ORCHESTRATOR.md` and follow its protocol exactly
2. Always read `SYNTROP/orchestration-state.json` as the first action in any orchestration task
3. Follow skill file instructions (directors/, workers/, handlers/) precisely as written
4. Never skip state file updates - they are the memory bridge between fresh chat sessions
5. When reading worker/director skills, follow their Context Load, Execution, and State Update sections in order

## Documentation

- `SYNTROP/USER-GUIDE.md` — Detailed usage guide with examples
- `SYNTROP/TROUBLESHOOTING.md` — Common issues and recovery procedures
