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
