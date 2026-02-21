# SYNTROP System Redesign — Master Vision Document

> **This document is a complete, standalone specification.**
> Claude Code must read only this file to produce a full implementation plan.
> No prior context, no prior plans, and no other files are needed to interpret this document.
> Where a current file path is referenced, assume it is relative to the workspace root.

---

## 1. System Identity

**Name**: SYNTROP
**Tagline**: The structure your vision is missing.
**Meta description**: Multi-session AI project orchestration for Claude Code. Persistent state. Hierarchical execution. Deployment-ready output.
**What it is**: A structured multi-session orchestration framework built for Claude Code. It routes any software project through a 5-phase pipeline — Intake, Research, Architecture, Execution, Quality — using a hierarchical skill architecture: 1 CEO orchestrator, 5 phase directors, 23 specialized workers, and 4 support handlers. Every session starts from a persistent JSON state machine (`orchestration-state.json`). Nothing is stored in conversation history. The output is deployment-ready: source code, tests, documentation, configuration, and deployment scripts.
**Who it's for**: Developers, technical founders, agency dev leads, and OSS builders who use Claude Code for projects that span multiple chat sessions. Built for people who want complete, deployment-ready deliverables — not one-session prototypes. If your project will take more than 2-3 Claude Code sessions, SYNTROP is built for you.
**Who it's NOT for**: Completely non-technical users (v1.0 is terminal-native — no GUI), enterprise engineering teams (not battle-tested at scale, no SSO/enterprise support), developers who need model flexibility (Claude Code only — not model-agnostic), one-session quick tasks (the overhead isn't worth it).
**What makes it different**: The only open-source framework that treats multi-session AI development as a first-class problem. A persistent state machine records every phase, decision, and progress marker — fresh sessions start from state, not from conversation. Human approval gates at every phase boundary. 33 skill files with observable, forkable, plain-markdown architecture. Complete output: code + tests + docs + configuration + deployment. Local-first, zero infrastructure, no cloud required.
**Brand essence**: Structure
**Brand personality**: Precise, Honest, Architectural, Understated, Practical
**Brand promise**: A structured multi-session pipeline that turns your brain dump into a deployment-ready project, using Claude Code, with you in control at every phase gate.
**Voice rules**: Use exact counts (33 skill files, 5 phases, 1 CEO, 23 workers, 4 handlers). Lead with limitations when relevant. Never use: "revolutionary," "seamlessly," "magic," "AI-powered," "game-changing," "supercharge," "unlock," "leverage," "intuitive," "powerful," "next-generation," "seamless."

---

## 2. Core Design Principles (Non-Negotiable)

1. **Zero typing in chat**: All clarifying questions use Claude Code's AskUserQuestion popup interface. The user never types orchestration responses into the chat window. The brain dump is the only exception.
2. **Zero memory loss**: Every decision, every answer, every piece of progress is saved to files. A fresh chat session never loses work.
3. **Zero ambiguity in transitions**: The system always tells the user exactly when it is safe to clear the chat (SAFE TO CLEAR banner) and when they must not (DO NOT CLEAR banner).
4. **Zero required arguments**: Bare `/orchestrate` (no "continue" argument) always works. The system infers intent from state files.
5. **Zero onboarding confusion**: A user who has never heard of SYNTROP can clone the repo, open PLEASE_OPEN_ME.md, and be building their project within minutes.
6. **Minimal root**: The workspace root contains exactly 4 items after setup. Nothing else.

---

## 3. Final Root File Architecture

```
workspace/                           ← the user's cloned repository
├── .claude/                         ← Claude Code system folder (NEVER moved, NEVER modified except its contents)
│   └── commands/
│       ├── orchestrate.md           ← MODIFIED (path references + auto-detect logic)
│       └── start.md                 ← NEW: the onboarding + brain dump wizard
│
├── SYNTROP/                         ← NEW folder: contains the entire orchestration engine
│   ├── CEO-ORCHESTRATOR.md          ← moved from root, MODIFIED (paths + banners + project_type)
│   ├── init-workspace.sh            ← moved from root, self-anchored (no content changes needed)
│   ├── orchestration-state.json     ← moved from root, MODIFIED (new project_type field)
│   ├── context-summary.md           ← moved from root
│   ├── file-index.json              ← moved from root
│   ├── progress-log.md              ← moved from root
│   ├── conversation.md              ← moved from root
│   ├── vision-prompt.md             ← MOVED from USER-START-HERE/vision-to-braindump.md + MODIFIED
│   ├── system-design-prompt.md      ← MOVED from USER-START-HERE/vision-to-orchestration-braindump.md + MODIFIED
│   ├── USER-GUIDE.md                ← moved from root
│   ├── TROUBLESHOOTING.md           ← moved from root
│   ├── directors/
│   │   ├── INTAKE-DIRECTOR.md       ← MODIFIED (command_hint + SAFE banner + prepared-braindump detection)
│   │   ├── RESEARCH-DIRECTOR.md     ← MODIFIED (command_hint + SAFE banner)
│   │   ├── ARCHITECTURE-DIRECTOR.md ← MODIFIED (command_hint + SAFE banner)
│   │   ├── EXECUTION-DIRECTOR.md    ← MODIFIED (command_hint x2 + SAFE banner x2)
│   │   └── QUALITY-DIRECTOR.md      ← MODIFIED (command_hint + SAFE banner)
│   ├── workers/
│   │   └── [all 23 worker files]    ← moved, no content changes
│   └── handlers/
│       ├── USER-INPUT-HANDLER.md    ← MODIFIED (banners + AskUserQuestion enforcement)
│       ├── CONTEXT-MONITOR.md       ← moved, no content changes
│       ├── ERROR-RECOVERY.md        ← moved, no content changes
│       └── STATE-VALIDATOR.md       ← moved, no content changes
│
├── USER-START-HERE/                 ← simplified, stays at root
│   └── PLEASE_OPEN_ME.md            ← NEW: replaces README.md, simple user guide
│
└── README.md                        ← FULL REWRITE: GitHub-facing marketing + instruction box
```

**Items deleted/replaced:**
- `USER-START-HERE/README.md` → replaced by `USER-START-HERE/PLEASE_OPEN_ME.md`
- `USER-START-HERE/vision-to-braindump.md` → moved to `SYNTROP/vision-prompt.md`
- `USER-START-HERE/vision-to-orchestration-braindump.md` → moved to `SYNTROP/system-design-prompt.md`

---

## 4. Complete File Specifications

---

### 4.1 USER-START-HERE/PLEASE_OPEN_ME.md [NEW FILE — replaces README.md]

**Purpose**: The first thing a user reads after cloning. Non-technical language. Zero jargon. Must convey: what SYNTROP does, and exactly what to send into Claude Code to start.

**Formatting rules**:
- All command references use fenced code blocks (no surrounding backticks in prose)
- Language is everyday English — avoid "orchestration," "phases," "intake," "directors," "workers"
- No markdown tables, no complex nesting — clean, scannable structure
- The description under the SYNTROP title should feel welcoming, not technical

**Full content to write**:

```markdown
# SYNTROP
### The structure your vision is missing.

---

SYNTROP is an AI orchestration system built for Claude Code.

It takes your idea — even if it's just a rough thought — and guides Claude to plan,
structure, and build your project from start to finish. Whether you want to build a
web app, a tool, a script, or even your own AI system, SYNTROP gives your vision the
structure it needs to become something real.

You have the idea. SYNTROP has the structure. Claude does the building.
If you can use Claude Code, you have everything you need.

*A system that builds systems.*

---

## Before you begin

Open Claude Code in the same folder as this file.
You'll use two commands. Here's what they do and when to use each one.

---

## Command 1

```
/start
```

**ONLY send** `/start` **into a fresh Claude Code chat.**

Use this command if:
- This is your first time using SYNTROP
- You are starting a brand new project and haven't set one up yet
- You want SYNTROP to help you choose what to build and prepare your idea

---

## Command 2

```
/orchestrate
```

**ONLY send** `/orchestrate` **into a fresh Claude Code chat.**

Use this command if:
- You have already run `/start` and were told to open a fresh chat
- You are continuing a project that is already in progress
- You want to check your progress (`/orchestrate status`) or start over (`/orchestrate reset`)
```

---

### 4.2 README.md [FULL REWRITE — GitHub-facing]

**Purpose**: The GitHub repository's public README. Marketing-first. Confidence at the level of Anthropic's own documentation voice. Makes the system's value immediately obvious. After the intro, gives the same simple instructions as PLEASE_OPEN_ME.md.

**Voice guidelines** (from brand package `identity/voice-and-tone.md`):
- Precise over vague: "33 skill files, 5 phases, 1 CEO" not "dozens of agents"
- Honest over optimistic: lead with what it is AND what it isn't
- Understated over breathless: let the architecture speak, don't decorate it
- No hype: never use "revolutionary," "seamlessly," "magic," "AI-powered," "game-changing," "supercharge," "unlock," "next-generation"
- Reads fast — a skimmer should understand the value in 10 seconds

**Bordered instruction box**: Use an HTML `<table>` element to create a visual border. This renders reliably on GitHub and creates clear visual separation. The table should contain a single cell with the step-by-step instructions inside it. Commands inside the table must still be in fenced code blocks.

**Full content to write**:

```markdown
# SYNTROP
### The structure your vision is missing.

SYNTROP is an AI orchestration system for Claude Code. It takes your raw idea and builds it —
planning, structuring, and executing your project across as many sessions as it takes.
You have the vision. SYNTROP gives it structure. Claude does the rest.

---

## What it does

- Transforms your rough idea into a clear, agreed-upon project plan
- Researches the best approach and explains the trade-offs
- Designs the full architecture and builds it step by step
- Verifies everything meets your original vision before you ship

---

## Who it's for

If you use Claude Code and your project will span more than a couple of sessions — SYNTROP is built for you.
Developers, technical founders, agency leads, and OSS builders. People who want deployment-ready deliverables, not just code that runs.

---

## How it works

SYNTROP runs across multiple Claude Code chat sessions. Each session picks up exactly where
the last one left off — nothing is lost between chats.

1. You send your idea
2. SYNTROP asks the questions that matter
3. Claude builds your project, step by step
4. You get a deployment-ready result

---

<table>
<tr>
<td>

## This is all you need to know

Four steps. That's it. You can start building in the next five minutes.

**Step 1.** Clone this repository into your workspace.

**Step 2.** Open Claude Code.

**Step 3.** Send this into a fresh chat — then follow every instruction it gives you:

```
/start
```

**Step 4.** Each time you're told to open a fresh chat, send this and follow the steps:

```
/orchestrate
```

Keep repeating Step 4 until your project is complete.

> Not sure what to do? `/start` will guide you through everything from the beginning.

</td>
</tr>
</table>

---

## Start building

Clone the repo, open Claude Code, and send `/start`. That's it.

For a detailed walkthrough, see [USER-START-HERE/PLEASE_OPEN_ME.md](USER-START-HERE/PLEASE_OPEN_ME.md).

---

## What SYNTROP is not

- Not model-agnostic: requires Claude Code (Anthropic's CLI). GPT-4, Gemini, and other models are not supported.
- Not a one-session tool: designed for projects that span multiple chat sessions. For quick tasks, use Claude Code directly.
- Not autonomous: human approval gates are intentional. You review and approve the plan before anything is built.
- Not a GUI application: terminal-native only. You need to be comfortable running CLI commands.
- Not battle-tested at enterprise scale: v1.0 framework. Use alongside human review processes for business-critical projects.
```

---

### 4.3 .claude/commands/start.md [NEW COMMAND]

**Purpose**: Onboarding wizard + brain dump processor. The only command a brand new user needs. Routes users to the correct intake path, collects their brain dump, processes it, writes to state files, then tells them to run `/orchestrate`.

**Research required before writing this file**: Verify in Claude Code official documentation that `AskUserQuestion` is a valid tool name in the `allowed-tools` frontmatter field of slash command files. Verify that multiple sequential `AskUserQuestion` calls within a single command work correctly. Check the exact format for the frontmatter fields.

**Frontmatter**:
```yaml
---
name: start
description: "SYNTROP onboarding wizard. Guides you to choose what you want to build, helps you organize your idea, and prepares everything for /orchestrate. Run this first for any new project."
argument-hint: ""
allowed-tools: Read, Write, AskUserQuestion
---
```

**Full behavior specification** (written as Claude Code will execute it, step by step):

```
STEP 1: CHECK FOR ACTIVE PROJECT
Read SYNTROP/orchestration-state.json.

IF phase is NOT "uninitialized":
  Display this message in the chat:
    ---
    You already have a project in progress.
    /start is only for new projects.

    To continue your current project: send /orchestrate
    To start a completely new project: send /orchestrate reset, then run /start again
    ---
  STOP. Do not proceed further.

OTHERWISE: Continue to STEP 2.


STEP 2: HAVE THEY USED SYNTROP BEFORE?
Use AskUserQuestion with this question:
  Question: "Have you used SYNTROP before?"
  Header: "Getting started"
  Options:
    A) "Yes — I know how it works"      [Description: "Skip the intro and go straight to setting up your project"]
    B) "No — this is my first time"     [Description: "I'll explain how SYNTROP works before we begin"]

IF user chose A: Jump to STEP 4 (skip the explanation).
IF user chose B: Continue to STEP 3.


STEP 3: EXPLAIN SYNTROP TO NEW USERS
Display in the chat (use markdown formatting):

  ---
  ## Welcome to SYNTROP

  SYNTROP is an AI orchestration system for Claude Code. It takes your idea — even a rough
  one — and turns it into a fully built project, handling the planning, research, design,
  and building for you.

  **Here's how it works:**
  You tell SYNTROP what you want to build. It asks you a few focused questions, then works
  with Claude to plan and build your project across multiple chat sessions. Each session picks
  up exactly where the last one ended — nothing is ever lost.

  **You can use SYNTROP to build one of two things:**

  **Option A — A software project**
  An app, website, tool, API, script, automation, or any other software idea you have.
  This is the most common option.

  **Option B — An AI orchestration system for Claude Code**
  A custom version of SYNTROP built for a specific domain — for example: a legal workflow
  system, a content pipeline, a research automation system, etc.
  This is a more advanced option. What you'll be building is a brand new AI orchestration
  framework that runs on Claude Code the same way SYNTROP does — with its own commands,
  phases, and memory. You are NOT building a regular software app with this option.
  If you're unsure, choose Option A.
  ---

Then immediately use AskUserQuestion:
  Question: "What would you like to build?"
  Header: "Choose your path"
  Options:
    A) "A software project (app, tool, API, website, script, automation, etc.)"
       [Description: "The most common path. Build any software idea you have."]
    B) "An AI orchestration system for Claude Code"
       [Description: "Build a custom SYNTROP-style system for a specific domain or workflow."]
    C) "I'm still not sure — I need more help deciding"
       [Description: "Get more help before making a choice."]

IF user chose A: Set project_type = "vision". Jump to STEP 5.
IF user chose B: Set project_type = "system_design". Jump to STEP 5.
IF user chose C: Continue to STEP 3a.


STEP 3a: CONFUSION RESOLUTION
Use AskUserQuestion:
  Question: "What part is still unclear?"
  Header: "Let's clear this up"
  Options:
    A) "I don't understand what an AI orchestration system is"
       [Description: "I'll explain what that means in plain terms."]
    B) "I'm not sure which option fits my idea"
       [Description: "Tell me more about your idea and I'll help you decide."]
    C) "I don't know what I want to build yet"
       [Description: "That's fine — I can help you figure it out."]
    D) "Something else is confusing me"
       [Description: "I'll try to answer whatever is unclear."]

Based on the user's answer, display a short targeted clarification in the chat (2-4 sentences).
Examples:
  - If A: Explain that an orchestration system is like SYNTROP itself — a structured AI system
    that can manage complex workflows autonomously using Claude Code.
  - If B: Ask them to describe their idea briefly in the chat, then make a recommendation.
  - If C: Reassure them that a rough idea is enough — SYNTROP helps shape the idea.
  - If D: Ask them to describe what's confusing them in the chat.

Then use AskUserQuestion:
  Question: "Does that help clarify things?"
  Header: "Ready to continue?"
  Options:
    A) "Yes, I'm ready to choose"     [Description: "Let's continue."]
    B) "No, I still need help"        [Description: "I'll try to help further."]

IF user chose A:
  Use AskUserQuestion again with the same 3-option "What would you like to build?" question
  from the end of STEP 3. Set project_type accordingly and jump to STEP 5.

IF user chose B:
  Repeat STEP 3a ONE more time (maximum two rounds of confusion resolution).
  After the second round, regardless of whether the user says they're ready or not,
  show the 3-option "What would you like to build?" question again, and add this note
  above it in the chat:
    "Pick whichever feels closest to what you're thinking. You can always adjust your idea
    later — SYNTROP will ask clarifying questions as it works."
  Set project_type accordingly and jump to STEP 5.


STEP 4: TYPE SELECTION (returning users who skipped the explanation)
Use AskUserQuestion:
  Question: "What do you want to build?"
  Header: "Choose your path"
  Options:
    A) "A software project (app, tool, API, website, script, automation, etc.)"
       [Description: "Build any software idea you have."]
    B) "An AI orchestration system for Claude Code"
       [Description: "Build a custom SYNTROP-style system for a specific domain."]

IF user chose A: Set project_type = "vision".
IF user chose B: Set project_type = "system_design".
Continue to STEP 5.


STEP 5: BIG-PICTURE SCOPING QUESTIONS
Read the appropriate prompt file to get the scoping questions for this path:
  IF project_type = "vision": Read SYNTROP/vision-prompt.md — use the scoping questions defined in its "Big-Picture Scoping Questions" section.
  IF project_type = "system_design": Read SYNTROP/system-design-prompt.md — use the scoping questions defined in its "Big-Picture Scoping Questions" section.

Ask the scoping questions one at a time using AskUserQuestion.
These questions are multiple choice and high-level — they must never constrain the user's vision.
Their purpose is to give Claude context on scale and clarity before processing the brain dump.

FOR vision path — scoping questions to ask:
  Question 1:
    Question: "How defined is your idea right now?"
    Header: "Idea clarity"
    Options:
      A) "Clear vision — I know exactly what I want"
      B) "Rough idea — I have the concept but not the details"
      C) "Multiple ideas — I want help choosing or combining them"

  Question 2:
    Question: "Who will use what you're building?"
    Header: "Audience"
    Options:
      A) "Just me — personal tool or script"
      B) "A small team or group"
      C) "External users or customers"

FOR system_design path — scoping questions to ask:
  Question 1:
    Question: "What domain is this orchestration system for?"
    Header: "Domain"
    Options:
      A) "Software or technical workflows"
      B) "Business or operational workflows"
      C) "Creative, content, or research workflows"
      D) "Something else entirely"

  Question 2:
    Question: "How much of the system design do you already have in mind?"
    Header: "Design clarity"
    Options:
      A) "Just a concept — I need help designing the structure"
      B) "I have some phases and steps mapped out"
      C) "Full design ready — I just need it structured and built"

Save the scoping answers to a temporary variable (they are used as context metadata during
brain dump processing, not as permanent decisions).


STEP 6: BRAIN DUMP COLLECTION
Display this message in the chat:

  ---
  ## Send your idea now

  Write or paste everything you have below — rough notes, goals, what you don't want,
  existing context, file paths, links, or anything else relevant to your project.

  You can also use @filename to attach any files in your workspace.

  **A few examples of what to send:**

  *"I want to build a tool that monitors my GitHub repos and sends a Slack message whenever
  a PR is open for more than 2 days. Should run on a schedule automatically."*

  *"Here's a big messy doc of ideas [paste content] and a wireframe @wireframe.png — I want
  to turn all of this into one clear project plan."*

  *"Not sure what to build exactly but I know I want to automate my content calendar.
  Here are some rough notes: [paste notes]"*

  These are examples only — not a template to follow. Send everything however it comes
  naturally. There is no right format.
  ---

Wait for the user to send their brain dump as a message in the chat.
If the user included @-tagged filenames, read those files using the Read tool.
If the user included file paths, read those files using the Read tool.


STEP 7: PROCESS BRAIN DUMP
Apply the transformation rules from the appropriate prompt file:
  IF project_type = "vision": Apply rules from SYNTROP/vision-prompt.md
  IF project_type = "system_design": Apply rules from SYNTROP/system-design-prompt.md

Use the scoping answers from STEP 5 as additional context when processing.
Produce a structured output following the output format defined in the prompt file.
Do NOT display the processed output to the user in the chat.
The output goes directly to the file in STEP 8.


STEP 8: WRITE TO STATE FILES

Write the processed brain dump to:
  SYNTROP/artifacts/intake/prepared-braindump.md
  (Create the SYNTROP/artifacts/intake/ directory if it does not already exist)

Update SYNTROP/orchestration-state.json with these changes:
  - "project_type": set to "vision" or "system_design" (whichever was chosen)
  - "context_pointers.brain_dump": "SYNTROP/artifacts/intake/prepared-braindump.md"
  - "next_action.description": "Send /orchestrate in a fresh chat to begin building"
  - "next_action.command_hint": "/orchestrate"
  - "next_action.expected_director": "INTAKE-DIRECTOR"
  - "status": "in_progress"
  - "phase" stays as "uninitialized" — /orchestrate will move it to "intake"

Update SYNTROP/context-summary.md with:
  - Project type (vision or system_design, written as plain English label)
  - Scoping answers (1-2 sentences summarizing them)
  - Current status: "Brain dump prepared. Awaiting /orchestrate to begin."


STEP 9: DISPLAY SAFE TO CLEAR BANNER AND NEXT INSTRUCTIONS
Display this in the chat as the final output — nothing else after this:

  +===========================================================+
  |                                                           |
  |                  SAFE TO CLEAR CHAT                       |
  |                                                           |
  |  Your idea has been saved and organized.                  |
  |  Open a fresh chat when you're ready.                     |
  |  Then send: /orchestrate                                  |
  |                                                           |
  +===========================================================+

  **Next step:**
  Open a new Claude Code chat (or use the "clear conversation" option in Claude Code),
  then send /orchestrate. It will pick up exactly where this left off.

STOP. Do not output anything else.
```

---

### 4.4 .claude/commands/orchestrate.md [MODIFIED]

**Current file location**: `.claude/commands/orchestrate.md`
**Do not rewrite the entire file.** Make only the following surgical changes.

**Change 1 — Update file path in Step 1:**
Find: `Read the file CEO-ORCHESTRATOR.md in the workspace root`
Replace with: `Read the file SYNTROP/CEO-ORCHESTRATOR.md in the workspace root`

**Change 2 — Update all state file references in the file:**
Every reference to a root-level file that was moved must be updated:
- `CEO-ORCHESTRATOR.md` → `SYNTROP/CEO-ORCHESTRATOR.md`
- `orchestration-state.json` → `SYNTROP/orchestration-state.json`
- `context-summary.md` → `SYNTROP/context-summary.md`
- `file-index.json` → `SYNTROP/file-index.json`

**Change 3 — Update Step 2 argument detection logic:**
Find the block:
```
- If `$ARGUMENTS` equals "continue" OR is empty → Execute the CEO's CONTINUE PROTOCOL
```
Replace with:
```
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
```

**Change 4 — Add fresh-chat context display (new Step 3.5, between Steps 3 and 4):**
After the routing step and before executing any protocol, add this display step:

```
### Step 3.5: Display Session Context

Before executing any protocol, display this in the chat:

If this is a NEW PROJECT session (brain dump was just prepared by /start):
  ---
  ## Your project is ready

  You are building: [read project_type from state — display as "a software project" or
  "an AI orchestration system", not as the raw field value]

  Your idea has been organized and saved. Let's begin.

  **Quick reminders for this chat:**
  - Questions will appear as popups — answer them there, not in the chat
  - Stay in this chat until you see the "SAFE TO CLEAR CHAT" message
  - If something looks wrong, type a correction directly in the chat
  - Do not send /orchestrate again in this chat — wait for the SAFE TO CLEAR message
  ---

If this is a CONTINUE session (resuming in-progress work):
  ---
  ## Continuing your project

  Phase: [current phase name]  |  Progress: [percentage]%

  **Quick reminders for this chat:**
  - Questions will appear as popups — answer them there, not in the chat
  - Stay in this chat until you see the "SAFE TO CLEAR CHAT" message
  - If something looks wrong, type a correction directly in the chat
  - Do not send /orchestrate again in this chat — wait for the SAFE TO CLEAR message
  ---

Then proceed with the determined protocol.
```

---

### 4.5 SYNTROP/CEO-ORCHESTRATOR.md [MODIFIED]

**Current file**: `CEO-ORCHESTRATOR.md` (will be moved to `SYNTROP/CEO-ORCHESTRATOR.md`)
**After moving, apply these changes**:

**Change 1 — Update all root-level file path references:**
Any reference to files that were moved must use their new paths:
- `orchestration-state.json` → `orchestration-state.json` (relative from inside SYNTROP/ — stays valid)
- References to `directors/`, `workers/`, `handlers/` — all remain valid (siblings inside SYNTROP/)
- References to `init-workspace.sh` — remains valid (sibling inside SYNTROP/)
- References to `context-summary.md`, `file-index.json`, `progress-log.md` — remain valid (siblings)

**Change 2 — Command detection block: add project_type awareness:**
Find the section that handles "continue OR empty" argument detection.
Add this condition at the START of that block (before the current CONTINUE PROTOCOL trigger):

```
When $ARGUMENTS equals "continue" OR is empty:
  Read orchestration-state.json
  IF phase = "uninitialized":
    IF context_pointers.brain_dump is set to a file path:
      → Execute NEW PROJECT PROTOCOL using the file at that path as the brain dump
    ELSE:
      → Display: "No project found. Run /start first, then send /orchestrate."
      → STOP
  ELSE:
    → Execute CONTINUE PROTOCOL (existing behavior)
```

**Change 3 — NEW PROJECT PROTOCOL: add archive step (Step 3a) immediately after reading the brain dump file:**
```
Step 3a: Archive prepared-braindump.md (prevents double-pickup)
IF the brain dump was loaded from SYNTROP/artifacts/intake/prepared-braindump.md:
  Rename that file to SYNTROP/artifacts/intake/prepared-braindump-used.md
  Update file-index.json to reflect the new filename
  Rationale: If the user accidentally sends /orchestrate again in the same or a new chat
  before progressing, the system will not start a duplicate new project.
```

**Change 4 — NEW PROJECT PROTOCOL: pass project_type to INTAKE-DIRECTOR:**
When beginning the intake phase, set this in orchestration-state.json:
```json
"intake_mode": "[the project_type value from state — either 'vision' or 'system_design']"
```
INTAKE-DIRECTOR reads this field to determine which processing strategy to apply.

**Change 5 — Replace ALL chat-end message templates with these exact bordered banners:**

When the system is waiting for user input (questions pending):
```
+===========================================================+
|                                                           |
|                  DO NOT CLEAR CHAT                        |
|                                                           |
|  Questions are pending above. Reply in this chat.         |
|  State is NOT saved until you answer.                     |
|                                                           |
+===========================================================+
```

When stopping at a phase boundary or context limit (state is saved):
```
+===========================================================+
|                                                           |
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Progress saved. Open a fresh chat when ready.            |
|  Send: /orchestrate                                       |
|  Progress: {X}%                                           |
|                                                           |
+===========================================================+
```

When the project is fully complete:
```
+===========================================================+
|                  PROJECT COMPLETE                         |
|                                                           |
|  All deliverables are in the deployment/ directory.       |
|  /orchestrate status   — review summary                   |
|  /orchestrate reset    — start a new project              |
+===========================================================+
```

**Change 6 — Quick Reference / User Commands section:**
Find every instance of `/orchestrate continue` in this section.
Replace all of them with `/orchestrate`.

---

### 4.6 SYNTROP/directors/ — All 5 Director Files [MODIFIED]

Apply these changes to all 5 files:
`INTAKE-DIRECTOR.md`, `RESEARCH-DIRECTOR.md`, `ARCHITECTURE-DIRECTOR.md`, `EXECUTION-DIRECTOR.md`, `QUALITY-DIRECTOR.md`

**Change 1 — command_hint (all 5 files):**
Find in each file:
```json
"command_hint": "/orchestrate continue"
```
Replace with:
```json
"command_hint": "/orchestrate"
```
This appears in the phase completion action JSON blocks. Update every occurrence.

**Change 2 — SAFE TO CLEAR banner at every stop point (all 5 files):**
At every location in each director file where the system stops and waits for the next /orchestrate invocation, add this banner as the final output before stopping:

```
+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  [Phase name] complete. Progress saved.                   |
|  Open a fresh chat and send: /orchestrate                 |
|  Overall progress: {X}%                                   |
+===========================================================+
```

Replace `[Phase name]` with the actual phase name (Intake, Research, Architecture, Execution, Quality).
Replace `{X}%` with the actual progress percentage from orchestration-state.json.

**EXECUTION-DIRECTOR.md only — additional sprint stop points:**
Find the inline sprint progress display block (the one that currently says something like
"Send /orchestrate continue to keep building").
Replace that entire block with:

```
Sprint {N} of {total} complete. Progress saved.

+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Sprint {N} of {total} complete.                          |
|  Open a fresh chat and send: /orchestrate                 |
|  Overall progress: {X}%                                   |
+===========================================================+
```

**INTAKE-DIRECTOR.md only — add prepared-braindump detection:**
At the beginning of the vision-clarification step routing logic, add this check BEFORE delegating to the vision-clarifier worker:

```
BEFORE running vision-clarifier worker:
  Check if SYNTROP/artifacts/intake/prepared-braindump-used.md exists
  OR check if orchestration-state.json context_pointers.brain_dump is set:

  IF a prepared brain dump was used (file exists OR pointer was set):
    Pass the prepared brain dump content to vision-clarifier as its input
    Set vision-clarifier to operate in "review mode":
      - The brain dump is already structured — validate and refine rather than
        generate from scratch
      - Expect fewer clarifying questions since the user already organized their idea
      - Focus questions on ambiguities and gaps, not on basic structure

  ELSE (no prepared brain dump — user sent /orchestrate [idea] directly):
    Run vision-clarifier in standard mode with the raw brain dump from state
```

---

### 4.7 SYNTROP/handlers/USER-INPUT-HANDLER.md [MODIFIED]

**Apply these changes to the file after it is moved to SYNTROP/handlers/USER-INPUT-HANDLER.md:**

**Change 1 — Add banner definitions section:**
Immediately after the "When This Handler Is Invoked" section header, insert this new section:

```markdown
## Chat State Banners

These two banners MUST be displayed at the appropriate moments.
Never skip them. They are the user's primary signal for when it is safe to clear the chat.

### DO NOT CLEAR CHAT Banner
Display this banner WHENEVER questions or approvals are shown to the user.
Always place it BELOW the questions, as the very last element of the chat message.

+===========================================================+
|                                                           |
|                  DO NOT CLEAR CHAT                        |
|                                                           |
|  Questions are pending. Reply in this chat.               |
|  Clearing now will NOT lose state (it is saved),          |
|  but you will lose the question context shown above.      |
|  Wait until you have replied before clearing.             |
|                                                           |
+===========================================================+

### SAFE TO CLEAR CHAT Banner
Display this banner ONLY after state is fully saved and next_action is set in orchestration-state.json.
This is the ONLY signal the user receives that it is safe to clear the chat.
Never display this banner before state is confirmed saved.

+===========================================================+
|                                                           |
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Progress saved. Open a fresh chat when ready.            |
|  Send: /orchestrate                                       |
|                                                           |
+===========================================================+
```

**Change 2 — AskUserQuestion enforcement rule:**
Add this as a new mandatory rule section in the handler, placed before the question type definitions:

```markdown
## AskUserQuestion Requirement (Mandatory)

ALL user-facing questions MUST be presented using the AskUserQuestion tool.
The user must NEVER be asked to type a structured answer into the chat window.

The ONLY exceptions to this rule:
1. The brain dump collection step in /start (free-form input by design)
2. When the user selects "Other" from an AskUserQuestion option (then they may type)

When a question would naturally be "free text":
  Convert it to a multiple choice question with 3-4 common options plus an "Other" option.
  Claude Code's AskUserQuestion tool automatically provides an "Other" text input option.

This rule applies to every question type used by any director, worker, or handler:
  - Vision clarification questions
  - Contradiction resolution questions
  - SSOT approval questions
  - Research decision questions
  - Architecture approval questions
  - Any other question that pauses for user input
```

**Change 3 — Append DO NOT CLEAR banner to all 3 question type display formats:**
For each of the three question format sections (Multiple Choice, Free Text, Approval),
add the DO NOT CLEAR CHAT banner as the very last line of the display format example.

---

### 4.8 CLAUDE.md [MODIFIED]

**Change 1 — Primary Command section and commands table:**
Find the existing commands table (currently has 4 rows).
Replace the entire table with:

```markdown
## Primary Commands

| Command | When to use |
|---------|-------------|
| `/start` | Starting a new project. Run this first, before /orchestrate, for any new project. |
| `/orchestrate [your idea]` | Start a new project directly with your idea as text (skips /start wizard) |
| `/orchestrate` | Resume current project (auto-detects where you left off) |
| `/orchestrate status` | Show current progress without executing any steps |
| `/orchestrate reset` | Clear all project data and start fresh |
```

**Change 2 — System Architecture diagram:**
Update the diagram to show the SYNTROP/ prefix:

```
SYNTROP/CEO-ORCHESTRATOR.md     ← Master controller (reads this every /orchestrate invocation)
├── SYNTROP/directors/          ← 5 phase managers (Intake, Research, Architecture, Execution, Quality)
├── SYNTROP/workers/            ← 23 specialized task executors
└── SYNTROP/handlers/           ← 4 support systems (Input, Errors, State, Context)
```

**Change 3 — Key Files table:**
Update all file paths in the table:

```markdown
| File | Purpose |
|------|---------|
| `SYNTROP/orchestration-state.json` | System memory — tracks phase, step, decisions, progress |
| `SYNTROP/context-summary.md` | Quick orientation — project name, current state, key decisions |
| `SYNTROP/file-index.json` | Maps all generated artifacts to their file paths |
| `SYNTROP/CEO-ORCHESTRATOR.md` | Full protocol for the master controller |
| `SYNTROP/init-workspace.sh` | Creates directory structure (run automatically on first /orchestrate) |
```

**Change 4 — Behavioral Rules:**
Update Rule 2:
```
Always read SYNTROP/orchestration-state.json as the first action in any orchestration task
```

Update Rule 1 (if it mentions the CEO path):
```
When /orchestrate is invoked, read SYNTROP/CEO-ORCHESTRATOR.md and follow its protocol exactly
```

**Change 5 — Documentation section:**
Update any file paths in documentation links:
```
- `SYNTROP/USER-GUIDE.md` — Detailed usage guide with examples
- `SYNTROP/TROUBLESHOOTING.md` — Common issues and recovery procedures
```

---

### 4.9 SYNTROP/vision-prompt.md [MOVED + MODIFIED]

**Old path**: `USER-START-HERE/vision-to-braindump.md`
**New path**: `SYNTROP/vision-prompt.md`

**Purpose**: Transformation rules for processing a software project brain dump. This is an internal system file. It is read by the `/start` command during brain dump processing. Users never open or interact with this file directly.

**Modification**: Add the following section to the TOP of the file, before all existing content. Do not change any existing content below it.

```markdown
## Context: How This File Is Used

This file is an internal system file. It is read by the /start command.
Do NOT display the contents of this file to the user.
Use its rules to transform the user's raw brain dump into a structured intake document.

---

## Big-Picture Scoping Questions

These questions are asked by /start via AskUserQuestion BEFORE the brain dump is collected.
They are defined here so they can be versioned alongside the transformation rules.

/start must ask these questions using AskUserQuestion (multiple choice popup).
They must be broad enough to never conflict with any possible project idea.

Question 1:
  Question text: "How defined is your idea right now?"
  Header: "Idea clarity"
  Options:
    A) "Clear vision — I know exactly what I want"
       [Description: "You have a detailed picture of the end result."]
    B) "Rough idea — I have the concept but not the details"
       [Description: "You know what you want but not how it should work."]
    C) "Multiple ideas — I want help choosing or combining them"
       [Description: "You have more than one direction you're considering."]

Question 2:
  Question text: "Who will use what you're building?"
  Header: "Audience"
  Options:
    A) "Just me — personal tool or script"
       [Description: "Something for your own use only."]
    B) "A small team or group"
       [Description: "A few people who work with you."]
    C) "External users or customers"
       [Description: "People you don't know personally."]

How to use these answers during brain dump processing:
  - "Clear vision" + "Just me" → minimal expansion needed; focus on capturing specifics
  - "Rough idea" or "Multiple ideas" → expand more aggressively; flag more uncertainties
  - "External users" → ensure audience and problem statement sections are thorough
  These are guidelines, not rules. Always preserve the user's intent above all else.

---

[existing file content continues below this line, unchanged]
```

---

### 4.10 SYNTROP/system-design-prompt.md [MOVED + MODIFIED]

**Old path**: `USER-START-HERE/vision-to-orchestration-braindump.md`
**New path**: `SYNTROP/system-design-prompt.md`

**Purpose**: Transformation rules for processing an AI orchestration system brain dump. Internal system file read by `/start`. Users never interact with this file directly.

**Modification**: Add the following section to the TOP of the file, before all existing content. Do not change any existing content below it.

```markdown
## Context: How This File Is Used

This file is an internal system file. It is read by the /start command.
Do NOT display the contents of this file to the user.
Use its rules to transform the user's raw brain dump into a structured orchestration system design specification.

---

## Big-Picture Scoping Questions

These questions are asked by /start via AskUserQuestion BEFORE the brain dump is collected.
Defined here so they can be versioned alongside the transformation rules.

Question 1:
  Question text: "What domain is this orchestration system for?"
  Header: "Domain"
  Options:
    A) "Software or technical workflows"
       [Description: "Development pipelines, code review systems, deployment automation, etc."]
    B) "Business or operational workflows"
       [Description: "Approvals, reporting, client management, operations, etc."]
    C) "Creative, content, or research workflows"
       [Description: "Writing pipelines, research automation, content production, etc."]
    D) "Something else entirely"
       [Description: "A domain not listed above."]

Question 2:
  Question text: "How much of the system design do you already have in mind?"
  Header: "Design clarity"
  Options:
    A) "Just a concept — I need help designing the structure"
       [Description: "You know the domain and purpose but not the phases or components."]
    B) "I have some phases and steps mapped out"
       [Description: "You have a partial design that needs to be filled in."]
    C) "Full design ready — I just need it structured and built"
       [Description: "You have a detailed vision of every component."]

How to use these answers during brain dump processing:
  - Option A for Q2 → expand aggressively; generate phase and worker candidates from context
  - Option B or C for Q2 → preserve the user's structure; map their design to the framework
  - Domain from Q1 → shapes the naming and framing of all components in the output

---

[existing file content continues below this line, unchanged]
```

---

### 4.11 SYNTROP/orchestration-state.json [MODIFIED]

**After moving to SYNTROP/orchestration-state.json, add one new field to the root JSON object:**

Add `"project_type": null` immediately after the `"version"` field at the top of the JSON.

The full updated beginning of the file should look like:
```json
{
  "version": "1.0.0",
  "project_type": null,
  "project_id": null,
  ...
```

**Valid values for `project_type`**:
- `null` — not yet set (user hasn't run /start)
- `"vision"` — user chose to build a software project
- `"system_design"` — user chose to build an AI orchestration system

This field is written by `/start` in STEP 8.
It is read by `/orchestrate` (Step 2, Change 3) and by `CEO-ORCHESTRATOR.md` (Change 2).
It is also read by `INTAKE-DIRECTOR.md` to determine which processing mode to use.

---

## 5. Complete User Flow Specification

### 5.1 New User Flow (first time using SYNTROP)

```
1. Clone repo → open workspace in Claude Code
2. Open USER-START-HERE/PLEASE_OPEN_ME.md → read it
3. Send /start in a fresh chat
   → Check state: uninitialized → proceed
   → AskUserQuestion: "Have you used SYNTROP before?" → No
   → Display: explanation of SYNTROP + two build type options
   → AskUserQuestion: "What would you like to build?" → user chooses
   → AskUserQuestion: Scoping Q1 (from appropriate prompt file)
   → AskUserQuestion: Scoping Q2 (from appropriate prompt file)
   → Display: brain dump instructions in chat
   → User sends brain dump (text, file paths, @-tagged files)
   → /start reads any attached files
   → /start processes brain dump using appropriate prompt file rules
   → Writes SYNTROP/artifacts/intake/prepared-braindump.md
   → Updates SYNTROP/orchestration-state.json (project_type, brain_dump pointer, status)
   → Updates SYNTROP/context-summary.md
   → Displays SAFE TO CLEAR banner + instruction to run /orchestrate
4. User opens a fresh chat
5. User sends /orchestrate (no arguments)
   → Reads state: phase=uninitialized, brain_dump pointer set
   → Executes NEW PROJECT PROTOCOL using the prepared brain dump
   → Archives prepared-braindump.md → prepared-braindump-used.md
   → Displays session context ("Your project is ready / You are building: ...")
   → Displays guidance rules (4 bullet points)
   → Delegates to INTAKE-DIRECTOR in review mode
   → INTAKE-DIRECTOR displays questions via AskUserQuestion (not in chat)
   → User answers questions via popup
   → INTAKE-DIRECTOR processes: contradiction check → requirements → SSOT
   → Presents SSOT for approval via AskUserQuestion
   → User approves
   → State saved: phase transitions to research
   → Displays SAFE TO CLEAR banner
6. User opens fresh chat → sends /orchestrate → research phase begins
   [this pattern repeats: /orchestrate → work → SAFE TO CLEAR → fresh chat → /orchestrate]
7. Final /orchestrate → quality phase completes → PROJECT COMPLETE banner displayed
```

### 5.2 Returning User Flow (continuing an active project)

```
1. User opens a fresh chat
2. User sends /orchestrate (no arguments)
   → Reads state: phase != "uninitialized" → CONTINUE PROTOCOL
   → Displays session context (phase name, progress %)
   → Displays guidance rules
   → Continues from the exact step where the last session ended
   → [proceeds through current phase]
   → Stops at next safe point → SAFE TO CLEAR banner
```

### 5.3 Direct Brain Dump Flow (skipping /start)

```
1. User sends: /orchestrate [their idea as text]
   → NEW PROJECT PROTOCOL with the text as raw brain dump
   → Skips /start wizard entirely
   → project_type is NOT set (defaults to "vision" behavior in intake)
   → Proceeds directly to INTAKE-DIRECTOR in standard mode (not review mode)
```

### 5.4 Confused New User Flow (within /start)

```
[/start → "No" to "Have you used SYNTROP?" → explanation displayed]
→ AskUserQuestion: "What would you like to build?" → user chooses "I'm still not sure"
→ AskUserQuestion: "What part is still unclear?" → user chooses an option
→ Display: targeted clarification in chat (2-4 sentences)
→ AskUserQuestion: "Does that help clarify things?" → Yes or No
  IF Yes:
    → AskUserQuestion: "What would you like to build?" (same 3 options) → user chooses
    → [proceeds with chosen type]
  IF No:
    → AskUserQuestion: "What part is still unclear?" (repeat once more)
    → Display: targeted clarification
    → AskUserQuestion: "What would you like to build?" (add note: "pick whichever feels closest")
    → [proceeds with chosen type regardless]
```

---

## 6. UX Behavior Rules (System-Wide)

### 6.1 Question Interface Rules
- ALL structured questions use the AskUserQuestion tool (multiple choice popup interface)
- The user NEVER types a structured answer into the chat window
- The brain dump (Step 6 of /start) is the ONLY free-text chat input by design
- AskUserQuestion options: 2-4 choices maximum per question
- Options use plain English labels — no technical jargon
- The "Other" text input option is automatically available in AskUserQuestion — do not add it manually as an option unless you want it labeled differently

### 6.2 Banner Rules
- **DO NOT CLEAR**: displayed every time questions are pending, always as the LAST element of the chat message — never before questions, always after
- **SAFE TO CLEAR**: displayed ONLY after orchestration-state.json has been fully updated and next_action is set — this is the sole signal to the user that clearing is safe
- **PROJECT COMPLETE**: displayed only at the end of the quality phase when all deliverables are verified
- All three banners use the exact ASCII format specified in this document — no variations, no condensed versions
- No banner is ever skipped

### 6.3 /orchestrate Session Guidance Rules
Display these as bullet points at the START of every /orchestrate session (new project and continue alike):
- Answer questions in the popup window — not in the chat
- Stay in this chat until you see the SAFE TO CLEAR CHAT message
- If something looks wrong, type a correction directly in the chat
- Do not send /orchestrate again in this same chat — wait for the SAFE TO CLEAR message

---

## 7. What NOT to Change

- `.claude/` folder location — Claude Code requires this at the workspace root. Never move it.
- The core workflow logic in director and worker files — phases, steps, routing logic, and worker delegation are unchanged beyond the specified banner and command_hint edits
- The 23 worker files — move them to SYNTROP/workers/ but do not modify any content
- CONTEXT-MONITOR.md, ERROR-RECOVERY.md, STATE-VALIDATOR.md — move to SYNTROP/handlers/ but do not modify content
- The state machine design in CEO-ORCHESTRATOR.md — only the 6 specified changes apply
- The question design principles in USER-INPUT-HANDLER.md — the AskUserQuestion enforcement is an additive rule, not a replacement of existing design logic

---

## 8. Success Criteria

The implementation is complete when ALL of the following are verified:

### File Structure
- [ ] Root contains exactly 4 items: `.claude/`, `SYNTROP/`, `USER-START-HERE/`, `README.md`
- [ ] `USER-START-HERE/` contains exactly 1 file: `PLEASE_OPEN_ME.md`
- [ ] `SYNTROP/` contains all moved orchestration files, `vision-prompt.md`, and `system-design-prompt.md`
- [ ] No orchestration files remain at the workspace root

### /start Command
- [ ] Running `/start` in a fresh chat triggers the onboarding flow immediately with no additional input needed
- [ ] Every question in the flow appears as an AskUserQuestion popup (not chat text)
- [ ] After the brain dump is submitted, the SAFE TO CLEAR banner appears as the final output
- [ ] `SYNTROP/orchestration-state.json` has `project_type` set after /start completes
- [ ] `SYNTROP/artifacts/intake/prepared-braindump.md` exists and contains structured content after /start completes
- [ ] `/start` with an active project (phase != uninitialized) stops immediately with a clear message

### /orchestrate Command
- [ ] Bare `/orchestrate` with an active project continues exactly where it left off
- [ ] Bare `/orchestrate` after `/start` completes runs NEW PROJECT PROTOCOL using the prepared brain dump
- [ ] Bare `/orchestrate` with no prepared brain dump and uninitialized state shows a helpful message pointing to `/start`
- [ ] Session context and guidance rules display at the start of every /orchestrate invocation
- [ ] DO NOT CLEAR banner appears before every question set
- [ ] SAFE TO CLEAR banner appears after every phase/sprint save point
- [ ] No instance of `/orchestrate continue` remains in any file in the workspace

### Documentation
- [ ] `README.md` opens on GitHub with clear marketing copy and a visually distinct bordered instruction box
- [ ] `PLEASE_OPEN_ME.md` uses zero technical jargon and clearly describes the two commands

---

## 9. Areas Requiring Research Before Implementation

Claude Code should research these before writing the implementation plan. Findings should inform final decisions on format and implementation approach.

1. **AskUserQuestion tool availability in slash commands**
   - Confirm `AskUserQuestion` is a valid tool in `allowed-tools` frontmatter for `.claude/commands/` files
   - Confirm multiple sequential `AskUserQuestion` calls within a single command work as expected
   - Confirm how the "Other" option text input appears to the user
   - Source: Claude Code official documentation

2. **Slash command frontmatter format**
   - Confirm exact field names (`name`, `description`, `argument-hint`, `allowed-tools`)
   - Confirm whether `allowed-tools` accepts `AskUserQuestion` as a value
   - Confirm whether leaving `argument-hint` empty is valid
   - Source: Claude Code official documentation / existing `orchestrate.md` as reference

3. **GitHub-flavored markdown HTML table rendering**
   - Confirm that an HTML `<table>` element renders visually as a bordered box on github.com
   - Test fallback option: `---` horizontal rules above and below a blockquote section
   - Source: GitHub Markdown documentation or live test

4. **`init-workspace.sh` path self-anchoring**
   - Before moving the file, read `init-workspace.sh` and confirm it uses `$(dirname "${BASH_SOURCE[0]}")` or equivalent
   - If it uses hardcoded root-relative paths, those must be updated after the move
   - Source: read the actual file content

5. **State file path audit**
   - After all moves and edits are complete, grep every file in the workspace for `orchestration-state.json`, `context-summary.md`, `file-index.json`, and `CEO-ORCHESTRATOR.md`
   - Confirm every reference has been updated to include the `SYNTROP/` prefix where required
   - A missed reference will silently break state management with no obvious error

---

## 10. Implementation Sequence

When building the implementation plan from this document, use this sequence to minimize risk of breakage at each step:

1. Create the `SYNTROP/` folder
2. Move all files into `SYNTROP/` using git mv (preserves git history)
   - Move: `CEO-ORCHESTRATOR.md`, `init-workspace.sh`, `orchestration-state.json`, `context-summary.md`, `file-index.json`, `progress-log.md`, `conversation.md`, `USER-GUIDE.md`, `TROUBLESHOOTING.md`
   - Move: `directors/`, `workers/`, `handlers/` directories and all their contents
   - Move and rename: `USER-START-HERE/vision-to-braindump.md` → `SYNTROP/vision-prompt.md`
   - Move and rename: `USER-START-HERE/vision-to-orchestration-braindump.md` → `SYNTROP/system-design-prompt.md`
3. Research items from Section 9 (before writing any new files)
4. Update `.claude/commands/orchestrate.md` (4 changes — path references, routing logic, context display)
5. Update `CLAUDE.md` (5 changes — commands table, architecture diagram, key files, rules, docs links)
6. Update `SYNTROP/CEO-ORCHESTRATOR.md` (6 changes — paths, command detection, archive step, project_type, banners, quick ref)
7. Update all 5 director files in `SYNTROP/directors/` (command_hint + SAFE banner + INTAKE-DIRECTOR prepared-braindump detection)
8. Update `SYNTROP/handlers/USER-INPUT-HANDLER.md` (3 changes — banner definitions, AskUserQuestion rule, append banner to question formats)
9. Update `SYNTROP/orchestration-state.json` (add `project_type` field)
10. Modify `SYNTROP/vision-prompt.md` (add scoping questions section at top)
11. Modify `SYNTROP/system-design-prompt.md` (add scoping questions section at top)
12. Create `.claude/commands/start.md` (full new command)
13. Create `USER-START-HERE/PLEASE_OPEN_ME.md` (full new file)
14. Delete `USER-START-HERE/README.md` (replaced by PLEASE_OPEN_ME.md)
15. Rewrite `README.md` (full GitHub-facing content with bordered box)
16. Run full audit: grep workspace for any remaining root-level path references that should have SYNTROP/ prefix
17. Verify: run `/start` in a fresh chat, complete the full flow, run `/orchestrate`

---

*End of SYNTROP-VISION.md*
