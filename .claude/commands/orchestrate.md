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
Read the file `SYNTROP/CEO-ORCHESTRATOR.md` in the workspace root. This is your master instruction set. You MUST follow its protocols exactly.

### Step 2: Determine Intent from Arguments
Pass the user's input to the CEO's command detection logic:

- If `$ARGUMENTS` equals "reset" → Execute the CEO's RESET PROTOCOL
- If `$ARGUMENTS` equals "status" → Execute the CEO's STATUS PROTOCOL
- If `$ARGUMENTS` equals "continue" OR is empty:
    → Read `SYNTROP/orchestration-state.json`
    → IF `phase` = "uninitialized" AND `context_pointers.brain_dump` is set to a file path:
        → Execute the CEO's NEW PROJECT PROTOCOL using the file at that path as the brain dump
    → ELSE IF `phase` = "uninitialized" AND `context_pointers.brain_dump` is null:
        → Display in chat:
          "No active project found. Run /start first to set up your project idea,
           then send /orchestrate in a fresh chat."
        → STOP
    → ELSE:
        → Execute the CEO's CONTINUE PROTOCOL
- If `$ARGUMENTS` contains substantial text (a project idea/brain dump) → Execute the CEO's NEW PROJECT PROTOCOL with this text as the brain dump
- If `SYNTROP/orchestration-state.json` shows `status: "awaiting_user_input"` or `status: "awaiting_approval"` AND `$ARGUMENTS` contains a response → Execute the CEO's USER INPUT PROTOCOL with this text as the user's response

### Step 3: Follow CEO Protocol
After determining intent, follow the full decision tree in SYNTROP/CEO-ORCHESTRATOR.md. The CEO will:
1. Read `SYNTROP/orchestration-state.json` (always first)
2. Validate state integrity
3. Read `SYNTROP/context-summary.md` for orientation
4. Route to the appropriate director and worker
5. Execute the current step
6. Update all state files
7. Display progress and next action

### Step 3.5: Display Session Context

Before executing any protocol, display this in the chat:

If this is a NEW PROJECT session (brain dump was just prepared by /start):
  ---
  ## Your project is ready

  You are building: [read project_type from state — display as "a software project" or
  "an AI orchestration system", not as the raw field value]

  Your idea has been organized and saved. Let's begin.

  **Quick reminders for this chat:**
  - Answer questions in the popup window — not in the chat
  - Stay in this chat until you see the "SAFE TO CLEAR CHAT" message
  - If something looks wrong, type a correction directly in the chat
  - Do not send /orchestrate again in this same chat — wait for the SAFE TO CLEAR message
  ---

If this is a CONTINUE session (resuming in-progress work):
  ---
  ## Continuing your project

  Phase: [current phase name]  |  Progress: [percentage]%

  **Quick reminders for this chat:**
  - Answer questions in the popup window — not in the chat
  - Stay in this chat until you see the "SAFE TO CLEAR CHAT" message
  - If something looks wrong, type a correction directly in the chat
  - Do not send /orchestrate again in this same chat — wait for the SAFE TO CLEAR message
  ---

Then proceed with the determined protocol.

### Step 4: End of Execution
After completing the current step(s), always:
1. Show the user what was accomplished
2. Show current progress percentage
3. Show what happens next (the `next_action` from state)
4. If user input is needed, display the questions clearly

## Critical Rules

- ALWAYS read `SYNTROP/orchestration-state.json` before doing anything else
- ALWAYS update state files after completing work
- ALWAYS follow the instructions in skill files (directors/, workers/, handlers/) exactly
- NEVER skip state updates - they are the system's memory across fresh chats
- NEVER make assumptions about previous conversations - all context comes from files
- If you encounter an error, follow the ERROR-RECOVERY protocol in handlers/ERROR-RECOVERY.md
