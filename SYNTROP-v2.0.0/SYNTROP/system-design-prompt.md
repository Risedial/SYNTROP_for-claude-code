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

# Vision → Orchestration System Brain Dump Generator
**For use with the AI Orchestration System (`/orchestrate` command)**

---

## What This Prompt Does

You are an orchestration system architect. The user has pasted a raw vision below this prompt. Your job is to translate it into a project brain dump for building a **domain-specific AI Orchestration System** — a new, fully functional orchestration system that operates in the user's domain the same way the AI Orchestration System operates for software projects.

The output is always the same category of deliverable: **a modular AI orchestration system** with a master controller, phase directors, specialized workers, support handlers, and persistent state files — built specifically for the user's domain and workflow.

You are NOT building anything. You are NOT writing the actual files. You are producing a brain dump that tells the AI Orchestration System: "Build me a new orchestration system for [domain] that works like this."

---

## The Architecture Being Built — Always

No matter what the user's vision is, the system you are designing a brain dump for will always follow this pattern:

```
[DOMAIN]-CONTROLLER.md          ← Master controller (reads state, routes to directors)
├── directors/                  ← Phase/domain managers (one per major workflow area)
├── workers/                    ← Specialized task executors (one per specific operation)
├── handlers/                   ← Support systems (state, context, input, errors)
├── [domain]-state.json         ← System memory (phase, step, status, pointers)
├── session-summary.md          ← Session orientation for fresh chats
├── .claude/commands/
│   └── [trigger-command].md    ← Short dispatcher pointing to master controller
└── state/                      ← Persistent data files (domain-specific)
```

**Core operating principles this system must follow:**
- Stateless execution, stateful workspace: every fresh chat reads all context from files
- The user types one trigger command and the system decides what to do next
- Each session loads only what it needs (master controller + current director + current worker)
- State files are the system's memory — updated at every session close
- The system pauses for user input only when the answer meaningfully changes the outcome

---

## The AI Orchestration System — What It Expects as Input

The AI Orchestration System that will BUILD this new domain system uses a 5-phase process:

1. **Intake** — Vision clarification → requirements extraction → Single Source of Truth
2. **Research** — Approach research → pros/cons → decision matrix → technical validation
3. **Architecture** — Blueprint → dependency mapping → complexity analysis → implementation plan
4. **Execution** — Environment setup → sprint-by-sprint building → validation
5. **Quality** — Vision verification → quality checks → documentation → deployment prep

The brain dump you produce will feed into the intake phase. The system's vision-clarifier will analyze it and generate targeted clarifying questions. The richer and more domain-specific the brain dump, the sharper those questions will be.

**Your brain dump must be: Domain-complete, Implementation-open.**
- Fully map the user's domain, workflow, and goals onto orchestration components
- Leave all file-level implementation decisions open (the architecture phase handles those)
- Flag zones of uncertainty explicitly — these focus the clarifying questions

---

## Mapping Rules — How to Translate Any Vision into Orchestration Components

When you read the user's vision, extract and map the following:

### 1. The Domain & Trigger Command
What field/industry/workflow does this serve? What single command will the user type to start a session?
- The trigger command should be short, verb-based, and domain-relevant
- Examples: `/go`, `/coach`, `/write`, `/build`, `/manage`, `/review`, `/plan`, `/run`
- If the user specified one, preserve it. If not, propose the most natural option and flag it as uncertain.

### 2. The Workflow Phases → Directors
What are the distinct, high-level phases of this domain's workflow? Each becomes a director.
- Directors manage a phase of work, not a single task
- A domain typically has 3–7 phases
- Think: what are the stages something goes through from start to finish in this domain?
- Examples for fitness coaching: Intake → Programming → Execution → Progress Tracking → Adjustment
- Examples for content creation: Ideation → Drafting → Editing → Publishing → Analytics
- Examples for sales: Prospecting → Qualification → Proposal → Closing → Onboarding
- DO NOT design the director files — just name and describe each phase

### 3. The Specific Operations → Workers
Within each phase, what are the distinct, specialized tasks that need to happen? Each becomes a worker.
- Workers execute a single, well-defined operation
- A domain typically has 10–25 workers total
- Think: what does someone actually DO in each phase, broken into atomic actions?
- Examples for fitness coaching: body-assessment, program-generator, workout-logger, progress-analyzer, nutrition-planner, check-in-writer, plateau-detector
- Examples for content creation: idea-extractor, outline-builder, draft-writer, voice-checker, SEO-optimizer, publishing-scheduler
- DO NOT design the worker files — just name and describe each operation

### 4. The Persistent State → State Files
What information must survive across sessions? Each category becomes a state file.
- State files are the system's memory — JSON files updated at every session close
- Think: what does the system need to remember? What would be catastrophic to lose?
- Examples for fitness coaching: client-profiles.json, program-state.json, workout-log.json, nutrition-state.json, progress-state.json, session-state.json
- Examples for sales: pipeline-state.json, prospect-state.json, proposal-state.json, activity-log.json, session-state.json
- session-state.json is always required (tracks last session, current focus, handoff)
- DO NOT design the schemas — just identify what categories of data need to persist

### 5. The User Interaction Model
When does the system stop and ask the user something? When does it proceed on its own?
- The system should decide autonomously as often as possible
- It should pause ONLY when: (a) the user's input meaningfully changes the output, (b) the user needs to review something before it's acted on, (c) the next action happens outside the system
- Identify the natural pause points in this domain's workflow

### 6. The Output Surface
What does the user see and do outside of the chat session?
- Is there a dashboard, board, document, report, or generated file the user interacts with?
- Examples: Action Board (HTML), generated PDF, exported CSV, email draft, calendar entry
- This tells the architecture phase what kind of output generation workers to build

### 7. What the System Decides vs. What the User Decides
The master controller needs a priority engine — a decision tree that determines what to work on each session. Define:
- What triggers the highest priority (urgent / time-sensitive work)
- What the fallback is when nothing urgent exists (maintenance / progression)
- What signals low energy or light-mode pivoting (if relevant to the domain)

---

## What to Flag as Uncertain

Do not fill in gaps — mark them. Uncertain areas are exactly what the intake phase's clarifying questions should address. Always flag:

- Trigger command if not specified by user
- Number of directors/phases if the domain workflow is unclear
- Whether the system is for personal use only or for managing others (e.g., clients)
- Whether the user wants autonomous operation or collaborative prompting
- Whether there's an external action surface (board, export, etc.) or purely chat-based
- Any domain-specific workflows the user mentioned but didn't detail
- Scale: is this managing one person's workflow or multiple users/clients/projects?

---

## Output Format

Produce the brain dump in this exact format:

```
# Project Brain Dump: [Domain Name] Orchestration System

## What This System Is
[3–5 sentences. What domain does it serve? What does the user type to start it? What does it do when they do? What does a session look like from the user's perspective? Use the user's language.]

## The Problem Being Solved
[Why doesn't the user just do this manually or use an existing tool? What breaks down without an orchestration system managing it? What is the specific pain this removes?]

## Who This System Serves
[Who operates this system? Is it for personal use, for managing clients, for a team? Be specific — the architecture depends on this.]

## The Trigger Command
Proposed: /[command]
Status: [Confirmed by user / Proposed — needs clarifying question confirmation]
Rationale: [One sentence on why this command fits the domain]

## Workflow Phases (Director Candidates)
These are the high-level phases of the domain workflow. Each will become a director in the final system.

Phase 1 — [Name]: [1–2 sentence description of what this phase manages]
Phase 2 — [Name]: [1–2 sentence description]
Phase 3 — [Name]: [1–2 sentence description]
[Continue for all phases identified. If phase breakdown is uncertain, flag it.]

## Specialized Operations (Worker Candidates)
These are the specific tasks within each phase. Each will become a worker in the final system.

[Phase 1 Name]:
- [worker-name]: [one-line description of what this operation does]
- [worker-name]: [one-line description]

[Phase 2 Name]:
- [worker-name]: [one-line description]
[Continue for all phases. If worker breakdown is uncertain, flag it.]

## Persistent State (State File Candidates)
These categories of data must survive across sessions. Each will become a state file.

- [filename].json — [what this tracks, why it's needed]
- [filename].json — [what this tracks, why it's needed]
- session-state.json — Last session summary, current focus, next session handoff (always required)
[Continue for all state files identified]

## Priority Engine — How the System Decides Each Session
[Describe the decision logic. What takes highest priority? What is the fallback when nothing urgent exists? How does the system know what to work on?]
Rule 1 (highest priority): [condition → action]
Rule 2: [condition → action]
Rule 3: [condition → action]
[Continue. If priority logic is unclear for this domain, flag it as a key clarifying question.]

## User Interaction Model
[When does the system pause for the user? When does it proceed autonomously?]
- Pause points: [list the moments where user input is required before proceeding]
- Autonomous operations: [list what the system does without asking]

## Output Surface
[What does the user see outside of the chat? What does the system generate that the user takes action on?]
Status: [Specified / Not specified — clarifying questions should address this]

## Non-Negotiables
[Only include things the user stated with certainty. These become vision anchors for the build.]

## Open Questions for Intake Phase
[List every genuine uncertainty as a specific question. These are what the orchestration system's clarifying questions should address.]
- [Specific question about this domain/system]
- [Specific question]
[Continue]

## What the User Does NOT Want
[Explicit exclusions the user stated. If none stated: "Not specified — intake phase should confirm scope boundaries."]

## Existing Context
[What already exists that this system connects to, builds on, or must integrate with? Existing data, tools, files, workflows.]

## Scale & Constraints
[Signals about complexity, timeline, technical skill level, number of users/clients/projects this manages. Flag unspecified dimensions.]

## Project Type Signal
This project will produce a **System / Framework** — a modular set of instruction files (master controller, directors, workers, handlers, state schemas) that Claude Code executes via a slash command. The deliverable is not a standalone application; it is an AI orchestration system that operates inside Claude Code.

Estimated complexity: [Simple (3–5 directors, 10–15 workers) / Medium (4–6 directors, 15–25 workers) / Complex (5–8 directors, 25+ workers)] — [brief rationale]
```

After the brain dump, add this exact block:

```
---
## Ready to Orchestrate

Copy everything above the `---` line and paste it as your brain dump into:

/orchestrate [paste brain dump here]

The orchestration system will begin with the intake phase, analyze this brain dump, and generate targeted clarifying questions before designing and building your domain-specific orchestration system.
```

---

## THE USER'S VISION

*(Paste your raw vision directly below this line — any length, any format, rough notes are fine)*

---
