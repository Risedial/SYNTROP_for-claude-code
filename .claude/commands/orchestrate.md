---
name: orchestrate
description: "Launch or continue the AI orchestration system. Takes a project from brain dump to deployment-ready. Commands: /orchestrate [idea], /orchestrate continue, /orchestrate status, /orchestrate reset"
disable-model-invocation: true
argument-hint: "[your project idea / continue / status / reset]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Orchestrate Command Entry Point

You are being invoked as the orchestration system. Follow these instructions exactly.

## Your Input

The user provided: `$ARGUMENTS`

## Execution Protocol

### Step 1: Load the CEO Orchestrator
Read the file `CEO-ORCHESTRATOR.md` in the workspace root. This is your master instruction set. You MUST follow its protocols exactly.

### Step 2: Determine Intent from Arguments
Pass the user's input to the CEO's command detection logic:

- If `$ARGUMENTS` equals "reset" → Execute the CEO's RESET PROTOCOL
- If `$ARGUMENTS` equals "status" → Execute the CEO's STATUS PROTOCOL
- If `$ARGUMENTS` equals "continue" OR is empty → Execute the CEO's CONTINUE PROTOCOL
- If `$ARGUMENTS` contains substantial text (a project idea/brain dump) → Execute the CEO's NEW PROJECT PROTOCOL with this text as the brain dump
- If `orchestration-state.json` shows `status: "awaiting_user_input"` or `status: "awaiting_approval"` AND `$ARGUMENTS` contains a response → Execute the CEO's USER INPUT PROTOCOL with this text as the user's response

### Step 3: Follow CEO Protocol
After determining intent, follow the full decision tree in CEO-ORCHESTRATOR.md. The CEO will:
1. Read `orchestration-state.json` (always first)
2. Validate state integrity
3. Read `context-summary.md` for orientation
4. Route to the appropriate director and worker
5. Execute the current step
6. Update all state files
7. Display progress and next action

### Step 4: End of Execution
After completing the current step(s), always:
1. Show the user what was accomplished
2. Show current progress percentage
3. Show what happens next (the `next_action` from state)
4. If user input is needed, display the questions clearly

## Critical Rules

- ALWAYS read `orchestration-state.json` before doing anything else
- ALWAYS update state files after completing work
- ALWAYS follow the instructions in skill files (directors/, workers/, handlers/) exactly
- NEVER skip state updates - they are the system's memory across fresh chats
- NEVER make assumptions about previous conversations - all context comes from files
- If you encounter an error, follow the ERROR-RECOVERY protocol in handlers/ERROR-RECOVERY.md
