# User Guide - Orchestration System

## What Is This?

This is a complete AI orchestration system that takes you from an initial idea to a fully built, tested, documented, deployment-ready project. You provide a brain dump of your idea, answer a few questions, make a few decisions, and the system handles everything else.

**Key principle:** Every step executes in a **fresh Claude Code chat session** with zero conversation history. State files maintain continuity between sessions.

---

## Commands

| Command | Description |
|---------|-------------|
| `/orchestrate [your idea]` | Start a new project from your brain dump |
| `/orchestrate continue` | Continue from where the last session stopped |
| `/orchestrate` | Same as continue (auto-resumes if project exists) |
| `/orchestrate status` | Show current progress without executing |
| `/orchestrate reset` | Clear all data and start fresh |

---

## Quick Start

### 1. Start a New Project
Open a fresh Claude Code chat and send:
```
/orchestrate I want to build a SaaS platform that helps restaurants manage online orders from multiple delivery platforms in one dashboard. Budget is $5k, need it in 4 weeks, targeting 50-100 restaurants initially.
```

Include everything you can think of - the messier the better. Contradictions are fine. The system will sort everything out.

### 2. Answer Clarifying Questions
The system will ask 5-10 multiple choice questions to refine your vision. Reply with your selections:
```
A, B, C, A, B
```

### 3. Approve the Vision Document
The system generates a comprehensive "Single Source of Truth" document. Review it and reply:
```
A
```
(A = approved, B = minor corrections, C = major changes)

### 4. Select Your Approach
The system researches implementation approaches and presents a decision matrix. Select the approach you prefer:
```
A
```

### 5. Approve the Implementation Plan
The system creates a detailed plan with sprints and tasks. Review and approve:
```
A
```

### 6. Let It Build
The system executes the implementation plan sprint by sprint. For each chat:
```
/orchestrate continue
```
Repeat until execution is complete.

### 7. Review Final Deliverables
The system verifies the output against your vision, runs quality checks, generates documentation, and prepares deployment. Approve when satisfied:
```
A
```

### 8. Deploy
Your project is in the `deployment/` directory. Follow the deployment guide.

---

## What to Expect: Chat by Chat

### Chat 1: Project Initialization
- **You send:** `/orchestrate [your idea]`
- **System does:** Analyzes your idea, generates clarifying questions
- **You see:** 5-10 questions about your project
- **Chat ends:** Waiting for your answers

### Chat 2: Vision Refinement
- **You send:** Your answers (e.g., "A, B, C, A, B")
- **System does:** Extracts requirements, generates vision document
- **You see:** Complete project specification for your approval
- **Chat ends:** Waiting for your approval

### Chat 3: Approach Selection
- **You send:** "A" (approved) or corrections
- **System does:** Researches approaches, builds decision matrix
- **You see:** Scored comparison of 3-5 approaches with recommendation
- **Chat ends:** Waiting for your selection

### Chat 4: Architecture & Planning
- **You send:** Your approach selection (e.g., "A")
- **System does:** Creates blueprint, maps dependencies, plans implementation
- **You see:** Implementation plan summary (X tasks across Y sprints)
- **Chat ends:** Waiting for your approval

### Chat 5+: Building
- **You send:** "/orchestrate continue"
- **System does:** Executes implementation tasks, validates each sprint
- **You see:** Progress updates (Sprint N complete, X% done)
- **Chat ends:** After each sprint or when context budget is reached
- **Repeat** until execution is complete

### Final Chat: Quality & Delivery
- **You send:** "/orchestrate continue"
- **System does:** Verifies vision, runs quality checks, generates docs, prepares deployment
- **You see:** Final project summary with deliverables
- **Chat ends:** Project complete!

---

## Total Estimated User Involvement

- **Active inputs:** 5-10 (answers, approvals, selections)
- **Continue commands:** 5-15 (depending on project complexity)
- **Total active time:** A few minutes
- **System work:** Handles everything else

---

## How State Management Works

The system uses `orchestration-state.json` as its memory:
- Every fresh chat reads this file to know where to continue
- Every step updates this file with progress
- You never need to provide context from previous chats
- If a chat is interrupted, the next chat picks up seamlessly

### Important Files
| File | Purpose |
|------|---------|
| `orchestration-state.json` | System memory - tracks everything |
| `context-summary.md` | Human-readable current status |
| `progress-log.md` | History of all completed steps |
| `file-index.json` | Maps files to their purposes |

---

## Project Structure

After initialization, your workspace looks like:
```
your-project/
├── CEO-ORCHESTRATOR.md          # Master controller (entry point)
├── orchestration-state.json     # System memory
├── context-summary.md           # Current status
├── progress-log.md              # Progress history
├── file-index.json              # File navigation
├── init-workspace.sh            # Initialization script
├── directors/                   # Phase managers (5 files)
├── workers/                     # Task executors (23 files)
├── handlers/                    # Support systems (4 files)
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

## Tips for Best Results

1. **Brain dump everything.** Don't hold back. Include contradictions, half-formed ideas, and vague feelings about what you want. The system is designed to handle messy input.

2. **Be honest in your answers.** If none of the options fit, choose "Other" and explain. The system adapts.

3. **Review the SSOT carefully.** This document drives everything that follows. Make sure it captures your vision before approving.

4. **Trust the recommendations.** The system analyzes trade-offs objectively. If you disagree, choose differently - but understand why the recommendation was made.

5. **Let it complete sprints.** Don't interrupt mid-sprint. Wait for natural checkpoints.

6. **Check `/orchestrate status` if confused.** This shows exactly where things stand without changing anything.

---

## FAQ

**Q: What if I close the chat accidentally?**
A: No problem. Send `/orchestrate continue` in a new chat. The system picks up exactly where it stopped.

**Q: Can I change my mind about a decision?**
A: Yes, but it may require rolling back. Contact the system and explain what you want to change.

**Q: What if the system encounters an error?**
A: It will present recovery options (retry, skip, roll back, provide guidance). Choose the option that makes sense.

**Q: How long does the whole process take?**
A: It varies by project complexity. Simple projects may need 5-8 chats. Complex projects may need 15-20+.

**Q: Can I run this for any type of project?**
A: Yes. The system adapts to web apps, mobile apps, APIs, CLIs, automation systems, and more.

**Q: What if I want to add features after completion?**
A: Start a new `/orchestrate` session describing the additions, referencing the existing project.
