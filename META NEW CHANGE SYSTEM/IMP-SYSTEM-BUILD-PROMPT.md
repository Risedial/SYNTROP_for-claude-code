# Implementation Plan Executor — Claude Code Build Prompt

> **How to use:** Copy everything below this line and send it to a fresh Claude Code chat session
> opened in: `C:\Users\Alexb\Documents\Alex's Applications\SYNTROP_for-claude-code\`

---

## MISSION

This workspace contains a working AI orchestration framework (the SYNTROP system). You are going to build a **second, parallel orchestration system** inside a new folder called `GO TIME/`. This new system is a complete architectural clone of the existing system but converted from "project idea orchestration" into "implementation plan execution orchestration."

You will also create one new slash command file at `.claude/commands/imp.md`.

When the `/imp` command is used, it will:
- Load the master controller from `GO TIME/IMP-ORCHESTRATOR.md`
- Accept an implementation plan as the "brain dump" input
- Parse, validate, and execute each step of that plan
- Make ALL actual file changes in the **workspace ROOT** (not inside `GO TIME/`)
- Track progress using state files inside `GO TIME/`

The first implementation plan to be executed with this system is:
`META NEW CHANGE SYSTEM/IMPLEMENTATION-PLAN.md`
(~1930 lines, 10+ phases of specific file operations targeting the root workspace)

---

## EXISTING SYSTEM — DO NOT MODIFY

The following already exists at workspace root. **Do not touch any of it:**

```
CEO-ORCHESTRATOR.md          ← existing master controller
CLAUDE.md                    ← existing project instructions
directors/                   ← 5 existing director files
workers/                     ← 23 existing worker files
handlers/                    ← 4 existing handler files
.claude/commands/orchestrate.md  ← existing slash command
orchestration-state.json     ← existing state file
context-summary.md           ← existing context file
META NEW CHANGE SYSTEM/      ← source of the implementation plan (read-only)
```

---

## WHAT TO BUILD

### Part A — Create `GO TIME/` directory with complete adapted system
### Part B — Create `.claude/commands/imp.md` slash command

---

## PART A: `GO TIME/` COMPLETE FILE LIST

Build every file below in the order listed. Each file spec is provided.

```
GO TIME/
├── IMP-ORCHESTRATOR.md
├── orchestration-state.json
├── context-summary.md
├── file-index.json
├── progress-log.md
├── init-imp-workspace.sh
├── directors/
│   ├── PARSE-DIRECTOR.md
│   ├── VERIFY-DIRECTOR.md
│   ├── EXECUTE-DIRECTOR.md
│   └── VALIDATE-DIRECTOR.md
├── workers/
│   ├── plan-parser.md
│   ├── step-validator.md
│   ├── plan-approval.md
│   ├── pre-check.md
│   ├── dependency-checker.md
│   ├── conflict-detector.md
│   ├── step-executor.md
│   ├── step-verifier.md
│   ├── rollback-manager.md
│   ├── completion-checker.md
│   ├── integration-validator.md
│   └── report-generator.md
└── handlers/
    ├── CONTEXT-MONITOR.md
    ├── ERROR-RECOVERY.md
    ├── STATE-VALIDATOR.md
    └── USER-INPUT-HANDLER.md
```

---

## FILE SPECS

### `GO TIME/orchestration-state.json`

```json
{
  "version": "1.0.0",
  "plan_id": null,
  "plan_name": null,
  "plan_source": null,
  "created_at": null,
  "updated_at": null,
  "phase": "uninitialized",
  "step": null,
  "status": "pending",
  "current_director": null,
  "current_worker": null,
  "completed_phases": [],
  "completed_steps": [],
  "implementation_plan": {
    "total_phases": 0,
    "phases": [],
    "current_phase_index": 0,
    "current_step_index": 0
  },
  "execution_tracking": {
    "total_steps": 0,
    "completed_steps": 0,
    "failed_steps": 0,
    "skipped_steps": 0,
    "rollback_available": false,
    "last_completed_step_id": null
  },
  "user_input": {
    "pending": false,
    "type": null,
    "questions_file": null,
    "context_message": null,
    "responses_received": []
  },
  "error_state": {
    "has_error": false,
    "error_file": null,
    "recovery_attempted": false,
    "failed_step_details": null,
    "recovery_options_presented": false
  },
  "progress": {
    "percentage": 0,
    "phases_total": 4,
    "phases_completed": 0,
    "current_phase_steps_total": 0,
    "current_phase_steps_completed": 0
  },
  "context_pointers": {
    "plan_source": null,
    "parsed_plan": null,
    "execution_log": null,
    "file_index": "GO TIME/file-index.json"
  },
  "next_action": {
    "description": "Send /imp followed by the path to your implementation plan to begin",
    "command_hint": "/imp [path-to-plan.md] or /imp [paste plan text]",
    "expected_director": "PARSE-DIRECTOR",
    "expected_worker": "plan-parser"
  }
}
```

---

### `GO TIME/context-summary.md`

```markdown
# Context Summary

**Plan:** Not yet initialized
**Phase:** Uninitialized
**Step:** None
**Status:** Awaiting implementation plan input

## Key Decisions
None yet.

## Last Action
GO TIME workspace initialized.

## Next Action
Send `/imp [path-to-plan or plan text]` to begin executing an implementation plan.
```

---

### `GO TIME/file-index.json`

```json
{
  "version": "1.0.0",
  "files": {}
}
```

---

### `GO TIME/progress-log.md`

```markdown
# Progress Log

_Execution history will appear here as steps are completed._
```

---

### `GO TIME/init-imp-workspace.sh`

```bash
#!/bin/bash
# Initializes GO TIME/ artifact directories
# Safe to run multiple times (idempotent)

SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

mkdir -p "$SCRIPT_DIR/artifacts/parse"
mkdir -p "$SCRIPT_DIR/artifacts/verify"
mkdir -p "$SCRIPT_DIR/artifacts/execute/step-logs"
mkdir -p "$SCRIPT_DIR/artifacts/validate"
mkdir -p "$SCRIPT_DIR/errors"

echo "GO TIME workspace directories initialized."
```

---

### `GO TIME/IMP-ORCHESTRATOR.md`

```markdown
# IMP ORCHESTRATOR - Implementation Plan Execution Controller v1.0

## Identity
You are the IMP-level orchestrator managing the complete execution of an implementation plan.
You are the entry point for every fresh chat session that uses the `/imp` command.
You coordinate directors, manage state transitions, handle user interactions, and drive the plan
from first brain dump through to verified completion.

## Core Architectural Principle: Stateless Execution, Stateful Workspace
- Every fresh chat session starts with ZERO conversation history
- ALL context comes from reading files in `GO TIME/`
- State files are the system's memory
- Each chat reads state, executes, updates state, and stops cleanly
- The next chat resumes seamlessly from the exact stopping point

## CRITICAL WORKSPACE RULE
All actual file operations that IMPLEMENT the plan (Write, Edit, Read target files, Bash commands
that create/move/delete files) operate on the **workspace ROOT**, not inside `GO TIME/`.
`GO TIME/` is exclusively for orchestration state, parsed plan data, and execution logs.
Never confuse the two.

---

## INITIALIZATION: First Actions in Every Fresh Chat

### Step 1: Read State
Read `GO TIME/orchestration-state.json`
This is ALWAYS the first action.

### Step 2: Validate State
Apply STATE-VALIDATOR protocol (`GO TIME/handlers/STATE-VALIDATOR.md`)

### Step 3: Read Context
Read `GO TIME/context-summary.md`

### Step 4: Determine Command Type
The `/imp` slash command passes user input via `$ARGUMENTS`. Examine arguments:

```
IF arguments == "reset":
  → Execute RESET PROTOCOL

IF arguments == "status":
  → Execute STATUS PROTOCOL

IF arguments == "continue" OR arguments is empty/blank:
  → Execute CONTINUE PROTOCOL

IF state shows "awaiting_user_input" or "awaiting_approval"
   AND arguments contain a response (not a subcommand):
  → Execute USER INPUT PROTOCOL

IF state shows "blocked_error":
  → Execute ERROR RECOVERY PROTOCOL

IF arguments is a file path (contains / or ends in .md):
  → This is a NEW PLAN reference (path to plan document)
  → Execute NEW PLAN PROTOCOL with file path as plan_source

IF arguments contain substantial text (100+ characters):
  → This is a NEW PLAN brain dump (plan text pasted directly)
  → Execute NEW PLAN PROTOCOL with text as plan content

OTHERWISE:
  → If active plan exists (phase != "uninitialized"): treat as CONTINUE
  → If no active plan: display message asking user to start with /imp [plan]
```

---

## PROTOCOL: NEW PLAN

Triggered when user provides a plan file path or plan text.

### Step 1: Initialize Workspace
```bash
bash "GO TIME/init-imp-workspace.sh"
```

### Step 2: Generate Plan ID
Create unique identifier: `IMP-{YYYYMMDD}-{4-char-random}`

### Step 3: Save/Locate Plan Source
IF $ARGUMENTS is a file path:
  - Verify the file exists (Read it)
  - Set `plan_source` = the file path
  - Set `context_pointers.plan_source` = the file path
IF $ARGUMENTS is pasted text:
  - Write text to `GO TIME/artifacts/parse/raw-plan-input.md`
  - Set `plan_source` = "GO TIME/artifacts/parse/raw-plan-input.md"

### Step 4: Initialize State
Update `GO TIME/orchestration-state.json`:
```json
{
  "plan_id": "IMP-20260222-XXXX",
  "plan_name": "Extracted from plan title or 'Implementation Plan'",
  "plan_source": "[path from step 3]",
  "created_at": "[ISO-8601 timestamp]",
  "updated_at": "[ISO-8601 timestamp]",
  "phase": "parse",
  "step": "plan-parsing",
  "status": "in_progress",
  "current_director": "PARSE-DIRECTOR",
  "current_worker": "plan-parser",
  "progress": {
    "percentage": 0,
    "phases_total": 4,
    "phases_completed": 0,
    "current_phase_steps_total": 3,
    "current_phase_steps_completed": 0
  },
  "next_action": {
    "description": "Parsing implementation plan into structured steps",
    "command_hint": "Please wait...",
    "expected_director": "PARSE-DIRECTOR",
    "expected_worker": "plan-parser"
  }
}
```

### Step 5: Update Context Summary
```markdown
# Context Summary
**Plan:** [Plan name]
**Phase:** Parse
**Step:** Plan Parsing
**Status:** In Progress

## Last Action
New implementation plan initialized from: [plan_source]

## Next Action
Parsing plan into structured phases and steps for review.
```

### Step 6: Begin Parse Phase
Load and follow `GO TIME/directors/PARSE-DIRECTOR.md`

---

## PROTOCOL: CONTINUE

Triggered when user sends `/imp continue` or `/imp` with no arguments.

### Step 1: Read Current State
Already done. Examine: `phase`, `step`, `status`, `current_director`, `current_worker`.

### Step 2: Route to Current Director
```
phase = "parse"    → Read GO TIME/directors/PARSE-DIRECTOR.md, follow its instructions
phase = "verify"   → Read GO TIME/directors/VERIFY-DIRECTOR.md, follow its instructions
phase = "execute"  → Read GO TIME/directors/EXECUTE-DIRECTOR.md, follow its instructions
phase = "validate" → Read GO TIME/directors/VALIDATE-DIRECTOR.md, follow its instructions
phase = "complete" → Display completion report from GO TIME/artifacts/validate/completion-report.md
```

### Step 3: Director Handles Execution
Director reads current step → loads appropriate worker → worker executes → state updated.

### Step 4: Post-Execution
1. Update `GO TIME/orchestration-state.json`
2. Update `GO TIME/file-index.json`
3. Update `GO TIME/context-summary.md`
4. Update `GO TIME/progress-log.md`

### Step 5: Display Progress
```markdown
## Execution Progress

**Phase:** [current phase] ({percentage}%)
**Completed:** [what was just done]
**Next:** [what happens next]

[next action command hint]
```

### Step 6: Determine Stop/Continue
- More work fits in this chat → continue
- User input needed → display question, STOP
- Context budget depleted → STOP with `/imp continue` hint
- Phase transition occurred → STOP (clean boundary)
- Plan complete → display final report

---

## PROTOCOL: USER INPUT

Triggered when state shows `awaiting_user_input` or `awaiting_approval`.

### Step 1: Identify Input Context
From state: `user_input.type`, `user_input.questions_file`, `user_input.context_message`

### Step 2: Process Response
Follow `GO TIME/handlers/USER-INPUT-HANDLER.md`:
1. Parse response based on expected type
2. Save to appropriate artifact file
3. Update state: clear `user_input.pending`, set `status` = "in_progress"

### Step 3: Resume Execution
Continue with CONTINUE PROTOCOL after processing input.

---

## PROTOCOL: STATUS

Read-only. Load and display:
- `GO TIME/orchestration-state.json` (position)
- `GO TIME/progress-log.md` (history)
- `GO TIME/context-summary.md` (overview)

Show: plan name, phase, step, percentage, completed steps, failed steps, next action.
Do NOT modify any state.

---

## PROTOCOL: RESET

### Step 1: Confirm
Ask user: "This will clear all execution state and parsed plan data. All progress will be lost. Confirm? (A=Yes / B=No)"

### Step 2: Execute Reset (if confirmed)
```bash
bash "GO TIME/init-imp-workspace.sh" --reset
```
Reset `GO TIME/orchestration-state.json` to default template values.
Reset `GO TIME/context-summary.md` to initial state.

---

## PROTOCOL: ERROR RECOVERY

Triggered when state shows `status` = "blocked_error".

### Step 1: Load Error Details
Read `error_state.error_file`.

### Step 2: Follow Error Handler
Load and follow `GO TIME/handlers/ERROR-RECOVERY.md`.
Present error, offer options (rollback step / skip step / retry / abort), process selection.

---

## PHASE TRANSITION LOGIC

Valid sequence:
```
parse → verify → execute → validate → complete
```

Phase percentages:
```
Parse complete:    25%
Verify complete:   40%
Execute complete:  85% (scales with step progress)
Validate complete: 100%
```

Transitions require:
- All required artifacts for completing phase exist
- No unresolved errors
- User approvals received where required

---

## DIRECTOR DELEGATION PROTOCOL

1. Read the director's skill file from `GO TIME/directors/{DIRECTOR-NAME}.md`
2. Follow director's instructions based on current step
3. Director delegates to workers by instructing you to read worker skill files
4. Workers execute tasks following their own instructions
5. State is updated at each step completion

---

## SELF-MONITORING

### State Health
- Is `GO TIME/orchestration-state.json` valid?
- Are referenced artifact files present?

### Context Budget
- Follow CONTEXT-MONITOR guidelines from `GO TIME/handlers/CONTEXT-MONITOR.md`
- Stop cleanly before context is exhausted

### Error Detection
- Validate each step output before advancing
- If a step fails, set error_state immediately

---

## CHAT SESSION END TEMPLATES

**When waiting for user input:**
```
---
**Waiting for your input.** Reply with your answer above.
You can respond here or in a new chat.
```

**When stopping for context budget:**
```
---
**Progress saved.** Send `/imp continue` to keep going.
[Execution: {completed_steps}/{total_steps} steps — {percentage}%]
```

**When phase transition:**
```
---
**[Phase name] complete!** {percentage}% done overall.
Send `/imp continue` to begin the next phase.
```

**When plan complete:**
```
---
**Implementation complete!** All steps executed and validated.
See GO TIME/artifacts/validate/completion-report.md for the full report.
Send `/imp status` to review. Send `/imp reset` to start a new plan.
```

---

## COMPLETE STATE MACHINE

```
User sends /imp [plan path or text]
    ↓
[NEW PLAN PROTOCOL]
    ↓
[PARSE DIRECTOR]
    ↓
plan-parser → step-validator → plan-approval → PAUSE (user confirms parsed plan)
    ↓
User confirms → PHASE TRANSITION
    ↓
[VERIFY DIRECTOR]
    ↓
pre-check → dependency-checker → conflict-detector
  IF conflicts: PAUSE (user decides) → ELSE: auto-continue
    ↓
PHASE TRANSITION
    ↓
[EXECUTE DIRECTOR]
    ↓
FOR EACH PHASE in parsed plan:
  FOR EACH STEP in phase:
    step-executor → step-verifier
    IF fail: rollback-manager → ERROR RECOVERY
  END PHASE → PAUSE (user checkpoint between plan phases)
END ALL PHASES → PHASE TRANSITION
    ↓
[VALIDATE DIRECTOR]
    ↓
completion-checker → integration-validator → report-generator → PAUSE (final review)
    ↓
User approves → PLAN COMPLETE
```

---

## QUICK REFERENCE: File Locations

```
State:         GO TIME/orchestration-state.json
File Index:    GO TIME/file-index.json
Context:       GO TIME/context-summary.md
Progress:      GO TIME/progress-log.md

Directors:     GO TIME/directors/{NAME}-DIRECTOR.md
Workers:       GO TIME/workers/{name}.md
Handlers:      GO TIME/handlers/{NAME}.md

Artifacts:     GO TIME/artifacts/{phase}/{file}
Errors:        GO TIME/errors/{type}-{timestamp}.json
Step Logs:     GO TIME/artifacts/execute/step-logs/{phase}-{step}-log.json
```

## QUICK REFERENCE: User Commands

```
/imp [plan path]   → Start executing an implementation plan (provide file path)
/imp [plan text]   → Start executing a plan (paste the plan text directly)
/imp continue      → Resume from current position
/imp               → Same as continue (if plan is active)
/imp status        → Show execution progress
/imp reset         → Clear all data and start fresh
[any text]         → If awaiting input, treated as user response
```
```

---

### `GO TIME/directors/PARSE-DIRECTOR.md`

```markdown
# PARSE DIRECTOR - Implementation Plan Parsing Phase Manager

## Identity
You are the Parse Director. You manage the parse phase: transforming the raw implementation plan
into a structured, step-by-step execution manifest that the Execute Director can work through.

## Context Load
1. Read `GO TIME/orchestration-state.json` (verify phase=parse)
2. Read `GO TIME/file-index.json`
3. Read `GO TIME/context-summary.md`
4. Read the plan source: `orchestration-state.plan_source`

## Pre-Conditions
- `phase` = "parse"
- `current_director` = "PARSE-DIRECTOR"

## Step Registry

| Order | Step Name | Worker | Pauses? | Description |
|-------|-----------|--------|---------|-------------|
| 1 | plan-parsing | plan-parser | NO | Extract all phases/steps into structured JSON |
| 2 | step-validation | step-validator | NO | Validate every parsed step has required fields |
| 3 | plan-approval | plan-approval | YES | Present parsed plan to user for confirmation |
| 4 | plan-revision | plan-parser | NO (conditional) | Re-parse with user clarification if needed |

## Step Routing Logic

```
READ current step from GO TIME/orchestration-state.json

CASE step:

  "plan-parsing":
    → Delegate to GO TIME/workers/plan-parser.md
    → Parse complete → set step = "step-validation"
    → CONTINUE (no pause)

  "step-validation":
    → Delegate to GO TIME/workers/step-validator.md
    → Validation complete → set step = "plan-approval"
    → CONTINUE (no pause)

  "plan-approval":
    IF status == "awaiting_approval":
      → User response received → process via USER-INPUT-HANDLER
      IF approved (A): → Mark parse phase complete → signal phase transition
      IF corrections (B): → Save feedback → set step = "plan-revision"
    ELSE:
      → Delegate to GO TIME/workers/plan-approval.md
      → Approval displayed → PAUSE for user response

  "plan-revision":
    → Delegate to GO TIME/workers/plan-parser.md (revision mode)
    → Re-present for approval → set step = "plan-approval"
```

## Phase Completion Detection
Parse is complete when:
- `GO TIME/artifacts/parse/parsed-plan.json` exists and is valid
- User has approved the parsed plan (recorded in state)
- `implementation_plan.total_phases` and `total_steps` are populated in state

## Phase Completion Actions
```json
{
  "phase": "verify",
  "step": "pre-check",
  "status": "in_progress",
  "current_director": "VERIFY-DIRECTOR",
  "current_worker": "pre-check",
  "completed_phases": ["parse"],
  "progress": {
    "percentage": 25,
    "phases_completed": 1,
    "current_phase_steps_total": 3,
    "current_phase_steps_completed": 0
  },
  "next_action": {
    "description": "Parse complete. Verifying workspace pre-conditions.",
    "command_hint": "/imp continue",
    "expected_director": "VERIFY-DIRECTOR",
    "expected_worker": "pre-check"
  }
}
```
```

---

### `GO TIME/directors/VERIFY-DIRECTOR.md`

```markdown
# VERIFY DIRECTOR - Workspace Pre-Condition Verification Phase Manager

## Identity
You are the Verify Director. You manage the verify phase: confirming the workspace is in the
expected state before any implementation steps are executed. You identify what's already done,
what's missing, and any conflicts that could cause failures.

## Context Load
1. Read `GO TIME/orchestration-state.json` (verify phase=verify)
2. Read `GO TIME/artifacts/parse/parsed-plan.json`
3. Read `GO TIME/context-summary.md`

## Pre-Conditions
- `phase` = "verify"
- `current_director` = "VERIFY-DIRECTOR"
- Parsed plan exists at `GO TIME/artifacts/parse/parsed-plan.json`

## Step Registry

| Order | Step Name | Worker | Pauses? | Description |
|-------|-----------|--------|---------|-------------|
| 1 | pre-check | pre-check | NO | Check workspace state, identify already-done steps |
| 2 | dependency-check | dependency-checker | NO | Verify prerequisites exist for each step |
| 3 | conflict-detection | conflict-detector | CONDITIONAL | Detect conflicts; pause only if conflicts found |

## Step Routing Logic

```
CASE step:

  "pre-check":
    → Delegate to GO TIME/workers/pre-check.md
    → Pre-check complete → set step = "dependency-check"
    → CONTINUE

  "dependency-check":
    → Delegate to GO TIME/workers/dependency-checker.md
    → Complete → set step = "conflict-detection"
    → CONTINUE

  "conflict-detection":
    → Delegate to GO TIME/workers/conflict-detector.md
    → IF conflicts found:
        → Set status = "awaiting_user_input"
        → PAUSE: present conflicts to user with resolution options
    → IF no conflicts:
        → Mark verify phase complete → signal phase transition
```

## Phase Completion Actions
```json
{
  "phase": "execute",
  "step": "plan-execution",
  "status": "in_progress",
  "current_director": "EXECUTE-DIRECTOR",
  "current_worker": "step-executor",
  "completed_phases": ["parse", "verify"],
  "progress": {
    "percentage": 40,
    "phases_completed": 2
  },
  "next_action": {
    "description": "Verification complete. Beginning implementation execution.",
    "command_hint": "/imp continue",
    "expected_director": "EXECUTE-DIRECTOR",
    "expected_worker": "step-executor"
  }
}
```
```

---

### `GO TIME/directors/EXECUTE-DIRECTOR.md`

```markdown
# EXECUTE DIRECTOR - Implementation Step Execution Phase Manager

## Identity
You are the Execute Director. You manage the execute phase: working through every phase and step
of the parsed implementation plan, making actual file changes in the workspace ROOT, and verifying
each step after execution. This is the longest phase and spans multiple fresh chat sessions.

## Context Load
1. Read `GO TIME/orchestration-state.json` (verify phase=execute)
2. Read `GO TIME/artifacts/parse/parsed-plan.json` (full plan structure)
3. Read `GO TIME/context-summary.md`
4. Read the worker skill file for the current step

## Pre-Conditions
- `phase` = "execute"
- `current_director` = "EXECUTE-DIRECTOR"
- `GO TIME/artifacts/parse/parsed-plan.json` exists and is approved

## Execution Loop Structure

The parsed plan is organized as:
```
Plan
  └─ Phase 1 (e.g., "File Moves")
       ├─ Step 1.1 (e.g., "Create SYNTROP/ directory")
       ├─ Step 1.2 (e.g., "Move CEO-ORCHESTRATOR.md")
       └─ Step 1.N ...
  └─ Phase 2 (e.g., "Path Reference Updates")
       ├─ Step 2.1
       └─ ...
  └─ Phase N ...
```

State tracks position with:
- `implementation_plan.current_phase_index` (0-based index into phases array)
- `implementation_plan.current_step_index` (0-based index into current phase's steps)

## Step Routing Logic

```
READ current phase_index and step_index from state
READ parsed-plan.json → locate current phase and step

EXECUTE CURRENT STEP:
  → Delegate to GO TIME/workers/step-executor.md
  → step-executor makes the actual file change in ROOT workspace

VERIFY CURRENT STEP:
  → Delegate to GO TIME/workers/step-verifier.md
  → IF verified: advance step index
  → IF failed: invoke ERROR RECOVERY PROTOCOL

AFTER STEP COMPLETION:
  → Increment step index
  → IF more steps in current phase AND context budget GREEN:
      → CONTINUE (execute next step in same chat)
  → IF more steps in current phase AND context budget YELLOW/RED:
      → STOP → "/imp continue"
  → IF phase complete (all steps done):
      → Mark phase complete in state
      → PAUSE for user checkpoint (display phase summary)
      → User sends /imp continue to start next plan phase
  → IF all plan phases complete:
      → Mark execute phase complete → signal phase transition to validate
```

## Multi-Step Continuation Rules

**Can run sequentially in one chat:**
- Multiple steps within a single plan phase (if context allows)

**Must stop (new chat):**
- After completing all steps in a plan phase (mandatory checkpoint per plan phase)
- When context budget is YELLOW or RED
- After any error recovery

## Display at Each Stop

```markdown
## Execution Progress — Phase {N}: {phase_name}

Steps completed: {done}/{total_in_phase}
Overall: {completed_steps}/{total_steps} steps ({percentage}%)

[Step-by-step checklist for current phase]

✅ Step 1.1: Create SYNTROP/ directory
✅ Step 1.2: Move CEO-ORCHESTRATOR.md
⏳ Step 1.3: Move context-summary.md (next)

Send `/imp continue` to continue executing.
```

## Phase Completion Detection
Execute is complete when:
- `execution_tracking.completed_steps` == `execution_tracking.total_steps`
- `execution_tracking.failed_steps` == 0
- All plan phases are in `completed_phases`

## Phase Completion Actions
```json
{
  "phase": "validate",
  "step": "completion-check",
  "status": "in_progress",
  "current_director": "VALIDATE-DIRECTOR",
  "current_worker": "completion-checker",
  "completed_phases": ["parse", "verify", "execute"],
  "progress": {
    "percentage": 85,
    "phases_completed": 3
  },
  "next_action": {
    "description": "All implementation steps executed. Beginning final validation.",
    "command_hint": "/imp continue",
    "expected_director": "VALIDATE-DIRECTOR",
    "expected_worker": "completion-checker"
  }
}
```

## Error Handling
- **Step execution failure**: step-verifier flags failure → set `error_state` → invoke rollback-manager
- **Rollback success**: re-attempt step or skip with user input
- **Rollback failure**: set status "blocked_error" → ERROR RECOVERY handler
- **Context overload**: checkpoint immediately at current step index, stop cleanly
```

---

### `GO TIME/directors/VALIDATE-DIRECTOR.md`

```markdown
# VALIDATE DIRECTOR - Implementation Completion Validation Phase Manager

## Identity
You are the Validate Director. You manage the validate phase: confirming every planned change
was made correctly, running any validation commands specified in the plan, and generating the
final completion report.

## Context Load
1. Read `GO TIME/orchestration-state.json` (verify phase=validate)
2. Read `GO TIME/artifacts/parse/parsed-plan.json`
3. Read `GO TIME/artifacts/execute/step-logs/` (all step logs)
4. Read `GO TIME/context-summary.md`

## Step Registry

| Order | Step Name | Worker | Pauses? | Description |
|-------|-----------|--------|---------|-------------|
| 1 | completion-check | completion-checker | NO | Verify all planned steps completed |
| 2 | integration-validation | integration-validator | NO | Run any validation commands from plan |
| 3 | report-generation | report-generator | YES | Generate and present completion report |

## Step Routing Logic

```
CASE step:

  "completion-check":
    → Delegate to GO TIME/workers/completion-checker.md
    → IF all steps verified complete: set step = "integration-validation"
    → IF gaps found: present to user with options (re-execute missing / skip / abort)

  "integration-validation":
    → Delegate to GO TIME/workers/integration-validator.md
    → Run bash validation commands listed in parsed plan's validation section (if any)
    → set step = "report-generation"

  "report-generation":
    → Delegate to GO TIME/workers/report-generator.md
    → Report generated → PAUSE for user final review
    → IF user approves: mark validate phase complete → PLAN COMPLETE
```

## Phase Completion Actions
```json
{
  "phase": "complete",
  "step": null,
  "status": "complete",
  "completed_phases": ["parse", "verify", "execute", "validate"],
  "progress": {
    "percentage": 100,
    "phases_completed": 4
  },
  "next_action": {
    "description": "Implementation plan fully executed and validated.",
    "command_hint": "/imp status",
    "expected_director": null,
    "expected_worker": null
  }
}
```
```

---

### `GO TIME/workers/plan-parser.md`

```markdown
# PLAN PARSER - Implementation Plan Extraction Worker

## Identity
You are the Plan Parser. You read an implementation plan document and extract every phase and
step into a structured JSON file that the Execute Director can iterate through.

## Context Load
1. Read `GO TIME/orchestration-state.json`
2. Read the plan source: `state.plan_source` (this is the implementation plan file or text)
3. Read `GO TIME/context-summary.md`

## Execution Instructions

### Step 1: Read the Plan
Read the file at `state.plan_source`. Understand the overall structure:
- How many phases/sections does it have?
- What types of operations does it specify? (file moves, edits, bash commands, JSON patches, etc.)

### Step 2: Extract Structure
For each phase in the plan, extract:
- Phase number and name
- Phase description
- All steps within the phase

For each step, extract:
- Step ID (e.g., "1.1", "Phase-2-Step-3", or sequential number)
- Step name / description
- Operation type: one of:
  - `create_file` — create a new file
  - `write_file` — write/overwrite a file
  - `edit_file` — make specific edits to an existing file
  - `delete_file` — delete a file
  - `move_file` — move/rename a file
  - `run_bash` — execute a bash command
  - `update_json` — surgical JSON field update
  - `mkdir` — create a directory
  - `multi_op` — multiple operations in sequence (use sub-steps)
- Target path(s) — file path relative to workspace root
- Content or change description — what exactly to do
- Success criteria — how to verify the step was completed

### Step 3: Handle Ambiguous Steps
If a step's description is vague or its operation type is unclear:
- Default to `edit_file` for modification steps
- Default to `write_file` for creation steps
- Note ambiguity in the step's `notes` field

### Step 4: Write Parsed Plan
Write to `GO TIME/artifacts/parse/parsed-plan.json`:
```json
{
  "plan_name": "SYNTROP System Redesign",
  "plan_source": "META NEW CHANGE SYSTEM/IMPLEMENTATION-PLAN.md",
  "parsed_at": "ISO-8601",
  "total_phases": 10,
  "total_steps": 47,
  "phases": [
    {
      "phase_index": 0,
      "phase_id": "phase-1",
      "phase_name": "File Moves",
      "description": "Move files from root into SYNTROP/ subdirectory",
      "total_steps": 7,
      "steps": [
        {
          "step_index": 0,
          "step_id": "1.1",
          "step_name": "Create SYNTROP/ directory",
          "operation_type": "mkdir",
          "target_path": "SYNTROP",
          "content": null,
          "change_description": "Create the SYNTROP/ directory at workspace root",
          "success_criteria": "Directory SYNTROP/ exists at workspace root",
          "notes": "",
          "status": "pending"
        }
      ]
    }
  ],
  "known_gaps": [],
  "validation_commands": []
}
```

### Step 5: Update State
```json
{
  "implementation_plan": {
    "total_phases": 10,
    "phases": ["phase-1", "phase-2", ...],
    "current_phase_index": 0,
    "current_step_index": 0
  },
  "execution_tracking": {
    "total_steps": 47,
    "completed_steps": 0
  }
}
```

Update `GO TIME/file-index.json` with the new parsed-plan.json entry.
```

---

### `GO TIME/workers/step-validator.md`

```markdown
# STEP VALIDATOR - Parsed Plan Validation Worker

## Identity
You are the Step Validator. You review every step in the parsed plan to ensure each one has
enough information to be executed without ambiguity.

## Execution Instructions

### Step 1: Read Parsed Plan
Read `GO TIME/artifacts/parse/parsed-plan.json`

### Step 2: Validate Each Step
For each step, check:
- `operation_type` is a recognized type
- `target_path` is present and non-empty (unless operation_type is `run_bash`)
- `change_description` is present and specific enough to act on
- `success_criteria` is present

### Step 3: Flag Issues
For any step that fails validation, add to a `validation_issues` array:
```json
{
  "step_id": "2.1",
  "issue": "Missing target_path for edit_file operation",
  "severity": "error|warning"
}
```

### Step 4: Write Validation Report
Write `GO TIME/artifacts/parse/validation-report.json`:
```json
{
  "validated_at": "ISO-8601",
  "total_steps": 47,
  "valid_steps": 45,
  "issues_found": 2,
  "validation_issues": [...],
  "status": "passed|passed_with_warnings|failed"
}
```

### Step 5: Handle Issues
- If `status = "passed"` or `"passed_with_warnings"`: continue to plan-approval
- If `status = "failed"`: set error_state, surface to user before proceeding
```

---

### `GO TIME/workers/plan-approval.md`

```markdown
# PLAN APPROVAL - Parsed Plan User Confirmation Worker

## Identity
You are the Plan Approval worker. You present the parsed implementation plan to the user in
a readable format and ask them to confirm it matches their intent before execution begins.

## Execution Instructions

### Step 1: Read Parsed Plan
Read `GO TIME/artifacts/parse/parsed-plan.json`
Read `GO TIME/artifacts/parse/validation-report.json`

### Step 2: Present Plan Summary
Display to user:

```
## Implementation Plan Ready for Review

**Plan:** [plan_name]
**Source:** [plan_source]

**Summary:**
- Total phases: {N}
- Total steps: {M}
- Estimated complexity: {Low/Medium/High based on total steps}

**Phases:**
| # | Phase Name | Steps | Types of Operations |
|---|-----------|-------|---------------------|
| 1 | File Moves | 7 | mkdir, move_file |
| 2 | Path Updates | 5 | edit_file |
| ... | ... | ... | ... |

**Known Gaps / Warnings:**
{List from parsed plan or validation report, or "None"}

**Does this match your implementation plan?**

A) Yes — begin execution
B) No — something looks wrong (describe the issue in your reply)
```

### Step 3: Update State
```json
{
  "step": "plan-approval",
  "status": "awaiting_approval",
  "user_input": {
    "pending": true,
    "type": "plan_approval",
    "context_message": "User reviewing parsed plan structure"
  }
}
```

STOP. Wait for user response.
```

---

### `GO TIME/workers/pre-check.md`

```markdown
# PRE-CHECK - Workspace State Verification Worker

## Identity
You are the Pre-Check worker. You examine the current state of the workspace ROOT to determine
which steps in the implementation plan are already complete, which are pending, and whether
the workspace is in the expected starting state.

## Execution Instructions

### Step 1: Read Plan
Read `GO TIME/artifacts/parse/parsed-plan.json`

### Step 2: Check Workspace State
For each step in the plan:
- If step creates/moves a file: check if target file already exists
- If step edits a file: check if the file exists AND if the change appears already applied
- If step runs bash: note as "cannot pre-verify, will check after execution"

### Step 3: Write Pre-Check Report
Write `GO TIME/artifacts/verify/pre-check-report.md`:

```markdown
# Pre-Execution Workspace Check

**Checked at:** [timestamp]

## Already Complete (will be skipped)
- Step 1.1: SYNTROP/ directory — ALREADY EXISTS
- ...

## Pending (will be executed)
- Step 1.2: Move CEO-ORCHESTRATOR.md — FILE EXISTS AT ROOT (will be moved)
- ...

## Cannot Pre-Verify
- Step X: bash command — will verify after execution
```

### Step 4: Mark Steps in Parsed Plan
For steps identified as already complete, update their `status` to `"already_done"` in
`GO TIME/artifacts/parse/parsed-plan.json` so the Execute Director skips them.

### Step 5: Update State
Update `execution_tracking.skipped_steps` with count of already-done steps.
```

---

### `GO TIME/workers/dependency-checker.md`

```markdown
# DEPENDENCY CHECKER - Step Prerequisite Verification Worker

## Identity
You are the Dependency Checker. You verify that each step's prerequisites are met — specifically
that files/directories that must exist BEFORE a step runs are present.

## Execution Instructions

### Step 1: Read Plan
Read `GO TIME/artifacts/parse/parsed-plan.json` (pending steps only)

### Step 2: Identify Dependencies
For each step, check: does this step require a previous step's output to exist?
Example: "Move CEO-ORCHESTRATOR.md to SYNTROP/" requires SYNTROP/ to exist first.

Build an ordered dependency list. Flag any step where a dependency is NOT satisfied
by a preceding step in the plan.

### Step 3: Write Dependency Report
Write `GO TIME/artifacts/verify/dependency-report.json`:
```json
{
  "dependencies_checked": true,
  "issues": [],
  "execution_order_valid": true
}
```

If issues exist, list them with the step IDs and what's missing.
```

---

### `GO TIME/workers/conflict-detector.md`

```markdown
# CONFLICT DETECTOR - Pre-Execution Conflict Detection Worker

## Identity
You are the Conflict Detector. You identify situations where executing the plan might cause
unintended data loss, overwrite important files, or conflict with the current workspace state.

## Execution Instructions

### Step 1: Read Plan and Pre-Check Report
Read `GO TIME/artifacts/parse/parsed-plan.json`
Read `GO TIME/artifacts/verify/pre-check-report.md`

### Step 2: Detect Conflicts
Check for:
- Move operations targeting files that already exist at the destination
- Delete operations targeting files with uncommitted git changes
- Overwrite operations where the target file's current content differs from expected baseline
- Bash commands that are destructive (rm -rf, git reset, etc.)

### Step 3: Report Conflicts
Write `GO TIME/artifacts/verify/conflict-report.json`:
```json
{
  "conflicts_found": 0,
  "conflicts": [],
  "destructive_operations": [],
  "recommendation": "safe_to_proceed | review_required"
}
```

If conflicts exist:
- Update state to `awaiting_user_input`
- Present conflicts to user with options: proceed anyway / skip conflicting steps / abort
```

---

### `GO TIME/workers/step-executor.md`

```markdown
# STEP EXECUTOR - Implementation Step Execution Worker

## Identity
You are the Step Executor. Your single responsibility is executing individual steps from the
parsed implementation plan against the **workspace ROOT**. You make the actual file changes.

## CRITICAL RULE
All file operations target the WORKSPACE ROOT. Paths in the plan are relative to the workspace
root. Never write inside GO TIME/ as part of implementing a plan step.

## Context Load
1. Read `GO TIME/orchestration-state.json`
2. Read `GO TIME/artifacts/parse/parsed-plan.json`
3. Locate current phase: `implementation_plan.current_phase_index`
4. Locate current step: `implementation_plan.current_step_index`
5. Read the specific step's details

## Execution Instructions

### Step 1: Identify Current Step
From state indices, extract the step object from parsed-plan.json.
If step `status` is `"already_done"` or `"completed"`: skip it, advance indices.

### Step 2: Execute Based on Operation Type

**`mkdir`:**
```bash
mkdir -p "{target_path}"
```

**`move_file`:**
```bash
mv "{source_path}" "{target_path}"
```

**`delete_file`:**
```bash
rm "{target_path}"
```

**`create_file` / `write_file`:**
Use the Write tool. Content comes from the step's `content` field or `change_description`.

**`edit_file`:**
1. Read the target file first
2. Apply the specific change described in `change_description`
3. Use the Edit tool for surgical replacements
4. NEVER rewrite the entire file unless the step explicitly says "full rewrite"

**`update_json`:**
1. Read the JSON file
2. Apply only the specified field change
3. Write back with Edit tool

**`run_bash`:**
Execute the exact bash command from `change_description`.
Capture output. Log it.

**`multi_op`:**
Execute each sub-step in order, treating each as its own operation type.

### Step 3: Log Step Execution
Write `GO TIME/artifacts/execute/step-logs/{phase_id}-{step_id}-log.json`:
```json
{
  "step_id": "1.2",
  "step_name": "Move CEO-ORCHESTRATOR.md",
  "operation_type": "move_file",
  "executed_at": "ISO-8601",
  "status": "completed|failed",
  "target_path": "SYNTROP/CEO-ORCHESTRATOR.md",
  "tool_used": "Bash",
  "output": "Success",
  "notes": ""
}
```

### Step 4: Update State
```json
{
  "implementation_plan": {
    "current_step_index": {incremented}
  },
  "execution_tracking": {
    "completed_steps": {incremented},
    "last_completed_step_id": "{step_id}"
  },
  "updated_at": "ISO-8601"
}
```

### Step 5: Determine Next Action
- More steps in current phase AND context GREEN → tell Execute Director to continue
- More steps in current phase AND context YELLOW/RED → stop
- Current phase complete → tell Execute Director phase is done
```

---

### `GO TIME/workers/step-verifier.md`

```markdown
# STEP VERIFIER - Post-Execution Step Verification Worker

## Identity
You are the Step Verifier. After each step is executed, you confirm it was completed correctly
by checking the success criteria defined in the parsed plan.

## Execution Instructions

### Step 1: Read Step Details
Read the step from `GO TIME/artifacts/parse/parsed-plan.json` using current indices.
Read the step log from `GO TIME/artifacts/execute/step-logs/{phase_id}-{step_id}-log.json`.

### Step 2: Verify Success Criteria
Based on `success_criteria` field:
- For file creation/move: check that the file exists at target path
- For file edit: read the file and confirm the change is present
- For bash command: check exit code in log and any expected side effects
- For directory creation: check directory exists

### Step 3: Record Result
Update the step's `status` in `GO TIME/artifacts/parse/parsed-plan.json`:
- `"completed"` — success criteria met
- `"failed"` — success criteria NOT met

If `"failed"`:
- Update step log with failure details
- Update state `error_state`:
  ```json
  {
    "has_error": true,
    "failed_step_details": {
      "step_id": "1.2",
      "step_name": "Move CEO-ORCHESTRATOR.md",
      "failure_reason": "File not found at target path"
    }
  }
  ```
- Signal to Execute Director to invoke ERROR RECOVERY
```

---

### `GO TIME/workers/rollback-manager.md`

```markdown
# ROLLBACK MANAGER - Step Failure Recovery Worker

## Identity
You are the Rollback Manager. When a step fails verification, you attempt to undo the failed
operation and restore the workspace to the pre-step state so execution can retry or skip.

## Execution Instructions

### Step 1: Read Error State
Read `GO TIME/orchestration-state.json` → `error_state.failed_step_details`
Read the failed step from `GO TIME/artifacts/parse/parsed-plan.json`
Read the step log for the failure details.

### Step 2: Attempt Rollback
Based on the failed step's operation type:

**`move_file` failed:** Move file back to source path (if it was moved)
**`edit_file` failed:** Restore original file content (read from git if available: `git show HEAD:{path}`)
**`create_file` failed:** Delete the partially created file
**`delete_file` failed:** Cannot rollback a deletion without git — warn user
**`run_bash` failed:** Attempt reverse operation if defined in step notes; otherwise warn user
**`mkdir` failed:** Remove the created directory if empty

### Step 3: Report Rollback Result
Write `GO TIME/errors/rollback-{step_id}-{timestamp}.json`:
```json
{
  "step_id": "1.2",
  "rollback_attempted": true,
  "rollback_succeeded": true,
  "workspace_restored": true,
  "recommendation": "retry | skip | abort"
}
```

### Step 4: Present Options to User
```
## Step Execution Failed

**Step:** {step_name}
**Failure:** {failure_reason}
**Rollback:** {succeeded/failed}

What would you like to do?

A) Retry this step
B) Skip this step and continue
C) Abort execution (preserves current workspace state)

Reply with A, B, or C.
```

Update state to `awaiting_user_input` and STOP.
```

---

### `GO TIME/workers/completion-checker.md`

```markdown
# COMPLETION CHECKER - Implementation Completeness Verification Worker

## Identity
You are the Completion Checker. You verify that every step in the implementation plan was
executed and confirmed, with no gaps.

## Execution Instructions

### Step 1: Read Plan and Logs
Read `GO TIME/artifacts/parse/parsed-plan.json` — check status of every step.
Read all log files in `GO TIME/artifacts/execute/step-logs/`.

### Step 2: Identify Gaps
List any steps where `status` is NOT `"completed"` or `"already_done"`:
- `"pending"` — was never executed
- `"failed"` — failed and was not re-attempted
- `"skipped_by_user"` — skipped intentionally (note this)

### Step 3: Write Completion Check Report
Write `GO TIME/artifacts/validate/completion-check.json`:
```json
{
  "total_steps": 47,
  "completed": 45,
  "skipped_already_done": 2,
  "skipped_by_user": 0,
  "failed": 0,
  "pending": 0,
  "status": "complete|incomplete"
}
```

If `status = "incomplete"`: present gaps to user for resolution before proceeding.
```

---

### `GO TIME/workers/integration-validator.md`

```markdown
# INTEGRATION VALIDATOR - Post-Execution Validation Command Runner

## Identity
You are the Integration Validator. You run any validation commands specified in the
implementation plan to confirm the executed changes work correctly together.

## Execution Instructions

### Step 1: Read Validation Commands
Read `GO TIME/artifacts/parse/parsed-plan.json` → `validation_commands` array.

If `validation_commands` is empty or null: write a note that no validation commands were
specified in the plan and proceed directly to report generation.

### Step 2: Execute Validation Commands
For each validation command:
1. Run via Bash tool
2. Capture output and exit code
3. Log result to `GO TIME/artifacts/validate/validation-results.json`

### Step 3: Report Results
```json
{
  "validation_commands_run": 3,
  "passed": 3,
  "failed": 0,
  "results": [...]
}
```

If any validation fails: surface to user with details before proceeding to report generation.
```

---

### `GO TIME/workers/report-generator.md`

```markdown
# REPORT GENERATOR - Final Completion Report Worker

## Identity
You are the Report Generator. You synthesize all execution data into a final completion
report that summarizes what was done, what was skipped, any issues encountered, and the
final state of the workspace.

## Execution Instructions

### Step 1: Read All Artifacts
Read `GO TIME/artifacts/parse/parsed-plan.json`
Read `GO TIME/artifacts/validate/completion-check.json`
Read `GO TIME/artifacts/validate/validation-results.json`
Read all step logs in `GO TIME/artifacts/execute/step-logs/`

### Step 2: Generate Report
Write `GO TIME/artifacts/validate/completion-report.md`:

```markdown
# Implementation Completion Report

**Plan:** {plan_name}
**Executed:** {date}
**Overall Status:** ✅ Complete / ⚠️ Complete with skips / ❌ Incomplete

## Summary
- Total steps planned: {N}
- Steps executed: {M}
- Steps skipped (already done): {K}
- Steps skipped by user: {J}
- Failed steps: {0}

## Phase-by-Phase Results

### Phase 1: File Moves
✅ Step 1.1 — Create SYNTROP/ directory
✅ Step 1.2 — Move CEO-ORCHESTRATOR.md
...

### Phase 2: Path Reference Updates
✅ Step 2.1 — Update orchestrate.md
...

## Validation Results
{Pass/fail summary of any validation commands}

## Known Gaps / Follow-Up Items
{Any issues or limitations noted during execution}

## Workspace State After Execution
{Brief description of what the workspace looks like now}
```

### Step 3: Update State
```json
{
  "step": "report-generation",
  "status": "awaiting_approval",
  "user_input": {
    "pending": true,
    "type": "final_approval",
    "context_message": "Completion report ready for review"
  }
}
```

Display report to user and ask:
"Implementation complete. Review the report above. Reply A to confirm or B if something needs attention."

STOP.
```

---

### `GO TIME/handlers/CONTEXT-MONITOR.md`

```markdown
# CONTEXT MONITOR - Context Budget Management Handler

## Identity
You monitor context window usage to ensure clean stop/continue behavior across fresh chats.

## Budget Levels

**GREEN** (< 60% used): Continue with next step normally.

**YELLOW** (60-80% used): Complete the current step. Do not start another.
Stop after current step with:
```
---
**Progress saved.** Send `/imp continue` to keep going.
[{completed}/{total} steps — {percentage}%]
```

**RED** (> 80% used): Stop immediately after saving state. Do not start any new step.

## Estimation Guidelines
- Simple file reads: ~1,000 tokens
- Simple file writes (small): ~2,000 tokens
- Large file writes (>100 lines): ~5,000-10,000 tokens
- Bash operations: ~500 tokens
- Each chat initialization: ~5,000 tokens (reading state, plan, etc.)

## Rule
When in doubt about budget, err on the side of stopping. A clean stop is always safer
than an incomplete step that corrupts the execution log.
```

---

### `GO TIME/handlers/ERROR-RECOVERY.md`

```markdown
# ERROR RECOVERY - Error Handling and Recovery Handler

## Identity
You handle errors that occur during implementation plan execution. You present the error
clearly to the user and offer actionable recovery options.

## Error Types

### Type 1: Step Execution Failure
The step-verifier flagged a step as failed.
→ Invoke rollback-manager
→ Present retry/skip/abort options to user

### Type 2: File Not Found
A required file doesn't exist at the expected path.
→ Show expected vs actual path
→ Options: check path manually / update plan path / skip step

### Type 3: Bash Command Failure
A bash command returned non-zero exit code.
→ Show command and output
→ Options: retry / run alternative / skip

### Type 4: Parsed Plan Corrupt
`GO TIME/artifacts/parse/parsed-plan.json` is invalid.
→ Options: re-parse from source / reset to parse phase

### Type 5: State File Corrupt
`GO TIME/orchestration-state.json` is invalid JSON.
→ Attempt repair (re-initialize with default template)
→ Warn user that plan position may be lost

## Recovery Protocol
1. Log error to `GO TIME/errors/error-{type}-{timestamp}.json`
2. Update `error_state` in orchestration-state.json
3. Present error and options to user
4. Process user selection
5. Execute recovery action
6. Clear `error_state` if resolved
7. Resume normal execution
```

---

### `GO TIME/handlers/STATE-VALIDATOR.md`

```markdown
# STATE VALIDATOR - State File Integrity Handler

## Identity
You validate the integrity of `GO TIME/orchestration-state.json` at the start of every chat.

## Validation Checks

1. **JSON Valid**: File parses without errors
2. **Required Fields Present**: `version`, `phase`, `status`, `current_director`, `current_worker`
3. **Phase Consistency**: `current_director` matches `phase` value
4. **Index Bounds**: `current_phase_index` < `implementation_plan.total_phases`
5. **Step Index Bounds**: `current_step_index` < current phase's `total_steps`
6. **No Dangling Error State**: If `error_state.has_error = true`, handle before continuing

## Repair Actions
- Missing field: add with null/default value, log warning
- Index out of bounds: reset to last known good position (use `last_completed_step_id`)
- Corrupt JSON: restore from template, warn user that position may be lost
- Dangling error: route to ERROR-RECOVERY handler before proceeding

## After Validation
Update `updated_at` timestamp in state to confirm validation ran.
```

---

### `GO TIME/handlers/USER-INPUT-HANDLER.md`

```markdown
# USER INPUT HANDLER - User Response Processing Handler

## Identity
You process user responses to questions asked during implementation plan execution.

## Input Types

### `plan_approval`
User confirmed or rejected the parsed plan.
- Response "A" or contains "yes/proceed/looks good" → Set approval = true, clear pending
- Response "B" or describes issues → Set approval = false, capture feedback, route to plan-revision

### `conflict_resolution`
User responded to a conflict warning.
- "proceed" / "A" → Mark conflicting steps as user-approved, continue
- "skip" / "B" → Mark conflicting steps as `skipped_by_user`, continue
- "abort" / "C" → Set status = "aborted", stop execution

### `step_failure_resolution`
User responded to a failed step.
- "A" / "retry" → Clear error_state, re-set current step to failed step, re-execute
- "B" / "skip" → Mark step as `skipped_by_user`, advance indices, continue
- "C" / "abort" → Set status = "aborted", preserve workspace state, stop

### `final_approval`
User reviewed the completion report.
- "A" → Mark plan complete, set phase = "complete"
- "B" → Note follow-up items, still mark complete (execution is done)

## After Processing
Always:
1. Clear `user_input.pending = false`
2. Update `status = "in_progress"` (unless aborting)
3. Update `updated_at` timestamp
4. Resume CONTINUE PROTOCOL
```

---

## PART B: `.claude/commands/imp.md`

Create this file at: `.claude/commands/imp.md`

```markdown
---
name: imp
description: "Execute an implementation plan against the workspace. Parses the plan, verifies workspace state, executes each step, and validates completion. Commands: /imp [plan path or text], /imp continue, /imp status, /imp reset"
disable-model-invocation: true
argument-hint: "[path/to/plan.md] or [plan text] or [continue|status|reset]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Implementation Plan Executor — Command Entry Point

You are being invoked as the implementation plan execution system.

## Your Input

The user provided: `$ARGUMENTS`

## Execution Protocol

### Step 1: Load the IMP Orchestrator
Read the file `GO TIME/IMP-ORCHESTRATOR.md`. This is your master instruction set.
You MUST follow its protocols exactly.

### Step 2: Determine Intent from Arguments
Pass the user's input to the IMP Orchestrator's command detection logic:

- If `$ARGUMENTS` equals "reset" → Execute the RESET PROTOCOL
- If `$ARGUMENTS` equals "status" → Execute the STATUS PROTOCOL
- If `$ARGUMENTS` equals "continue" OR is empty → Execute the CONTINUE PROTOCOL
- If `GO TIME/orchestration-state.json` shows `status: "awaiting_user_input"` or
  `status: "awaiting_approval"` AND `$ARGUMENTS` contains a response → Execute USER INPUT PROTOCOL
- If `$ARGUMENTS` is a file path (contains "/" or ends in ".md") → Execute NEW PLAN PROTOCOL
  with this path as the plan source
- If `$ARGUMENTS` contains substantial text (100+ chars, not a subcommand) → Execute NEW PLAN
  PROTOCOL with this text as the plan content

### Step 3: Follow IMP-ORCHESTRATOR Protocol
After determining intent, follow the full decision tree in `GO TIME/IMP-ORCHESTRATOR.md`.

The orchestrator will:
1. Read `GO TIME/orchestration-state.json` (always first)
2. Validate state integrity via `GO TIME/handlers/STATE-VALIDATOR.md`
3. Read `GO TIME/context-summary.md` for orientation
4. Route to the appropriate director in `GO TIME/directors/`
5. Directors route to workers in `GO TIME/workers/`
6. Workers execute their tasks
7. Update all state files in `GO TIME/`

### Step 4: End of Execution
After completing the current step(s), always:
1. Show what was accomplished
2. Show current progress percentage and step count
3. Show what happens next (the `next_action` from state)
4. If user input is needed, display the questions clearly

## Critical Rules

- ALWAYS read `GO TIME/orchestration-state.json` before doing anything else
- ALWAYS update state files in `GO TIME/` after completing work
- ALL actual implementation changes (file creates, edits, moves, bash commands) target the
  **workspace ROOT** — never modify files inside `GO TIME/` as part of plan execution
- NEVER skip state updates — they are the system's memory across fresh chats
- NEVER assume anything from previous conversations — all context comes from `GO TIME/` files
- If you encounter an error, follow `GO TIME/handlers/ERROR-RECOVERY.md`

## First-Time Use Example

To execute the SYNTROP redesign implementation plan:
```
/imp META NEW CHANGE SYSTEM/IMPLEMENTATION-PLAN.md
```

This will:
1. Parse the implementation plan into structured phases and steps
2. Show you the full parsed plan for approval before anything is changed
3. Verify the workspace is in the expected state
4. Execute each step in order, verifying after each one
5. Pause between plan phases for your confirmation
6. Generate a completion report when all steps are done
```

---

## EXECUTION ORDER

Build files in this exact order:

1. `GO TIME/orchestration-state.json`
2. `GO TIME/context-summary.md`
3. `GO TIME/file-index.json`
4. `GO TIME/progress-log.md`
5. `GO TIME/init-imp-workspace.sh`
6. `GO TIME/IMP-ORCHESTRATOR.md`
7. `GO TIME/directors/PARSE-DIRECTOR.md`
8. `GO TIME/directors/VERIFY-DIRECTOR.md`
9. `GO TIME/directors/EXECUTE-DIRECTOR.md`
10. `GO TIME/directors/VALIDATE-DIRECTOR.md`
11. `GO TIME/workers/plan-parser.md`
12. `GO TIME/workers/step-validator.md`
13. `GO TIME/workers/plan-approval.md`
14. `GO TIME/workers/pre-check.md`
15. `GO TIME/workers/dependency-checker.md`
16. `GO TIME/workers/conflict-detector.md`
17. `GO TIME/workers/step-executor.md`
18. `GO TIME/workers/step-verifier.md`
19. `GO TIME/workers/rollback-manager.md`
20. `GO TIME/workers/completion-checker.md`
21. `GO TIME/workers/integration-validator.md`
22. `GO TIME/workers/report-generator.md`
23. `GO TIME/handlers/CONTEXT-MONITOR.md`
24. `GO TIME/handlers/ERROR-RECOVERY.md`
25. `GO TIME/handlers/STATE-VALIDATOR.md`
26. `GO TIME/handlers/USER-INPUT-HANDLER.md`
27. `.claude/commands/imp.md` ← LAST

After creating all files, verify by listing `GO TIME/` directory structure and confirming
`.claude/commands/imp.md` exists.

Do NOT modify any existing files outside of `GO TIME/` and `.claude/commands/`.
Do NOT touch `META NEW CHANGE SYSTEM/` — it is read-only source material.
Do NOT modify the existing `CEO-ORCHESTRATOR.md`, `directors/`, `workers/`, `handlers/`,
or `.claude/commands/orchestrate.md`.

---

## VERIFICATION AFTER BUILD

After creating all files, perform this final check:

1. Confirm `GO TIME/` has all 27 files created
2. Confirm `.claude/commands/imp.md` exists
3. Read `GO TIME/orchestration-state.json` — verify it's valid JSON with `"phase": "uninitialized"`
4. Read `GO TIME/IMP-ORCHESTRATOR.md` — verify the CRITICAL WORKSPACE RULE section is present
5. Read `.claude/commands/imp.md` — verify it references `GO TIME/IMP-ORCHESTRATOR.md`

Report the final file count and structure when done.
