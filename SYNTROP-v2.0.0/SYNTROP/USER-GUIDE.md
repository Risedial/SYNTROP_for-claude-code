# SYNTROP User Guide

## What Is This?

SYNTROP is a complete AI orchestration system that takes you from an initial idea to a fully built, tested, documented, deployment-ready project. You provide a brain dump of your idea, answer a few questions, make a few decisions, and the system handles everything else.

**Key principle:** Every step executes in a **fresh Claude Code chat session** with zero conversation history. State files maintain continuity between sessions.

---

## Commands

| Command | When to use |
|---------|-------------|
| `/start` | Starting a new project — run this first |
| `/orchestrate [your idea]` | Start a project directly (skips the `/start` wizard) |
| `/orchestrate` | Resume current project (auto-detects where you left off) |
| `/orchestrate status` | Show current progress without executing |
| `/orchestrate reset` | Clear all data and start fresh |

---

## Project Types

SYNTROP supports two types of projects:

- **Software project** — a web app, mobile app, API, CLI tool, automation script, or anything you want to build and ship
- **AI orchestration system** — a custom orchestration workflow built on SYNTROP's architecture (building a system that builds other things)

When you run `/start`, it will ask you which type you're building. This determines how your brain dump is processed and how the system structures your requirements. Both types go through the same five phases.

---

## Quick Start

### Recommended Path: Use `/start`

Open a fresh Claude Code chat and send:
```
/start
```

The wizard will:
1. Check if you have an active project already
2. Ask what you want to build and which project type it is
3. Ask two scoping questions to frame your idea
4. Collect your brain dump
5. Process and structure it, then tell you to open a fresh chat and run `/orchestrate`

### Direct Path: Skip the Wizard

If you already know your idea well, open a fresh Claude Code chat and send your idea directly:
```
/orchestrate I want to build a SaaS platform that helps restaurants manage online orders from multiple delivery platforms in one dashboard. Budget is $5k, need it in 4 weeks, targeting 50-100 restaurants initially.
```

Include everything you can think of — the messier the better. Contradictions are fine. The system sorts everything out.

---

## What to Expect: Chat by Chat

### Chat 1: Setup with `/start`
- **You send:** `/start`
- **System does:** Guides you through project type, scoping questions, and brain dump collection
- **You see:** Structured summary of your idea, then a SAFE TO CLEAR banner
- **Chat ends:** Clean stop — safe to close

### Chat 2: Intake Phase
- **You send:** `/orchestrate` in a fresh chat
- **System does:** Analyzes your brain dump, generates clarifying questions
- **You see:** 5–10 questions about your project
- **Chat ends:** Waiting for your answers

### Chat 3: Vision Refinement
- **You send:** Your answers (e.g., "A, B, C, A, B")
- **System does:** Extracts requirements, generates vision document
- **You see:** Complete project specification (SSOT) for your approval
- **Chat ends:** Waiting for your approval

### Chat 4: Approach Selection
- **You send:** "A" (approved) or corrections
- **System does:** Researches approaches, builds scored decision matrix
- **You see:** Comparison of 3–5 approaches with recommendation
- **Chat ends:** Waiting for your selection

### Chat 5: Architecture & Planning
- **You send:** Your approach selection (e.g., "A")
- **System does:** Creates blueprint, maps dependencies, plans implementation sprints
- **You see:** Implementation plan summary (X tasks across Y sprints)
- **Chat ends:** Waiting for your approval

### Chats 6+: Building
- **You send:** `/orchestrate`
- **System does:** Executes implementation tasks, validates each sprint
- **You see:** Progress updates (Sprint N complete, X% done)
- **Chat ends:** After each sprint — sprints are mandatory checkpoints
- **Repeat** until execution is complete

### Final Chat: Quality & Delivery
- **You send:** `/orchestrate`
- **System does:** Verifies vision, runs quality checks, generates all documentation, prepares deployment package
- **You see:** Final project summary with deliverables location
- **Chat ends:** Project complete!

---

## Vision Anchors

During the Intake phase, the system extracts 5–10 **vision anchors** — the non-negotiable requirements at the core of your idea. These are stored in state and used throughout the project:

- Checked every 2 sprints during Execution to detect scope drift
- Verified again during the Quality phase
- If the system detects significant drift from your anchors, it will flag it before continuing and give you options to correct course

Vision anchors are why the system can stay true to your original intent across many chat sessions.

---

## How State Management Works

SYNTROP uses `SYNTROP/orchestration-state.json` as its memory:
- Every fresh chat reads this file to know where to continue
- Every step updates this file with progress
- You never need to provide context from previous chats
- If a chat is interrupted, the next chat picks up seamlessly

### Important Files
| File | Purpose |
|------|---------|
| `SYNTROP/orchestration-state.json` | System memory — tracks everything |
| `SYNTROP/context-summary.md` | Human-readable current status |
| `SYNTROP/progress-log.md` | History of all completed steps |
| `SYNTROP/file-index.json` | Maps files to their purposes |

---

## Project Structure

After initialization, your workspace looks like:
```
your-project/
├── SYNTROP/
│   ├── CEO-ORCHESTRATOR.md      # Master controller
│   ├── orchestration-state.json # System memory
│   ├── context-summary.md       # Current status
│   ├── progress-log.md          # Progress history
│   ├── file-index.json          # File navigation
│   ├── init-workspace.sh        # Initialization script
│   ├── directors/               # Phase managers (5 files)
│   ├── workers/                 # Task executors (23 files)
│   └── handlers/                # Support systems (4 files)
├── .claude/commands/
│   ├── start.md                 # /start command
│   └── orchestrate.md           # /orchestrate command
├── USER-START-HERE/
│   └── PLEASE_OPEN_ME.md        # Quick-start guide
├── artifacts/                   # Generated artifacts by phase
│   ├── intake/                  # Vision, requirements, SSOT
│   ├── research/                # Approaches, analysis, decisions
│   ├── architecture/            # Blueprint, plan, dependencies
│   ├── execution/               # Build logs, validation results
│   └── quality/                 # Verification, quality reports
├── errors/                      # Error logs (if any)
└── deployment/                  # Final deliverables
    ├── source/                  # Application code
    ├── documentation/           # All project docs
    ├── tests/                   # Test suites
    ├── scripts/                 # Deployment scripts
    └── config/                  # Configuration templates
```

---

## Total Estimated User Involvement

- **Active inputs:** 5–10 (answers, approvals, selections)
- **`/orchestrate` commands:** 5–15 depending on project complexity
- **Total active time:** A few minutes
- **System work:** Handles everything else

---

## Tips for Best Results

1. **Brain dump everything.** Don't hold back. Include contradictions, half-formed ideas, and vague feelings about what you want. The system is designed to handle messy input.

2. **Be honest in your answers.** If none of the options fit, choose "Other" and explain. The system adapts.

3. **Review the SSOT carefully.** This document drives everything that follows. Make sure it captures your vision before approving.

4. **Trust the recommendations.** The system analyzes trade-offs objectively. If you disagree, choose differently — but understand why the recommendation was made.

5. **Let sprints complete.** Don't interrupt mid-sprint. Wait for the natural checkpoint at the end of each sprint.

6. **Check `/orchestrate status` if confused.** This shows exactly where things stand without changing anything.

---

## FAQ

**Q: What if I close the chat accidentally?**
A: No problem. Send `/orchestrate` in a new chat. The system picks up exactly where it stopped.

**Q: Do I have to use `/start`?**
A: No. You can send `/orchestrate [your idea]` directly and skip the wizard. `/start` is recommended because it helps you structure your brain dump and picks the right processing path for your project type.

**Q: What are vision anchors?**
A: The 5–10 non-negotiable requirements extracted from your idea during Intake. The system checks these throughout execution to make sure nothing drifts away from what you actually wanted.

**Q: Can I change my mind about a decision?**
A: Yes, but it may require rolling back to the phase where the decision was made. Send `/orchestrate` and explain what you want to change.

**Q: What if the system encounters an error?**
A: It will present recovery options (Retry, Skip, Roll Back, Provide Guidance). Choose the option that makes sense for the situation.

**Q: How long does the whole process take?**
A: It varies by project complexity. Simple projects may need 5–8 chats. Complex projects may need 15–20+.

**Q: Can I run this for any type of project?**
A: Yes. The system adapts to web apps, mobile apps, APIs, CLIs, automation systems, and custom orchestration workflows.

**Q: What if I want to add features after completion?**
A: Start a new `/start` or `/orchestrate` session describing the additions and referencing the existing project.
