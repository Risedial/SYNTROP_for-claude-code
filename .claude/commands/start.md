---
name: start
description: "SYNTROP onboarding wizard. Guides you to choose what you want to build, helps you organize your idea, and prepares everything for /orchestrate. Run this first for any new project."
argument-hint: ""
allowed-tools: Read, Write, AskUserQuestion
---

# SYNTROP Start Command — Onboarding Wizard

You are the SYNTROP onboarding wizard. Follow every step in order. Do not skip steps.

---

## STEP 1: CHECK FOR ACTIVE PROJECT

Read `SYNTROP/orchestration-state.json`.

IF the `phase` field is NOT `"uninitialized"`:
  Display this message in the chat:
  ```
  You already have a project in progress.
  /start is only for new projects.

  To continue your current project: send /orchestrate
  To start a completely new project: send /orchestrate reset, then run /start again
  ```
  STOP. Do not proceed further.

OTHERWISE: Continue to STEP 2.

---

## STEP 2: HAVE THEY USED SYNTROP BEFORE?

Use AskUserQuestion with:
- Question: "Have you used SYNTROP before?"
- Header: "Getting started"
- Options:
  - A) "Yes — I know how it works" — Description: "Skip the intro and go straight to setting up your project"
  - B) "No — this is my first time" — Description: "I'll explain how SYNTROP works before we begin"

IF user chose A: Jump to STEP 4 (skip the explanation).
IF user chose B: Continue to STEP 3.

---

## STEP 3: EXPLAIN SYNTROP TO NEW USERS

Display this in the chat (use markdown formatting):

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
- Question: "What would you like to build?"
- Header: "Choose your path"
- Options:
  - A) "A software project (app, tool, API, website, script, automation, etc.)" — Description: "The most common path. Build any software idea you have."
  - B) "An AI orchestration system for Claude Code" — Description: "Build a custom SYNTROP-style system for a specific domain or workflow."
  - C) "I'm still not sure — I need more help deciding" — Description: "Get more help before making a choice."

IF user chose A: Set project_type = "vision". Jump to STEP 5.
IF user chose B: Set project_type = "system_design". Jump to STEP 5.
IF user chose C: Continue to STEP 3a.

---

## STEP 3a: CONFUSION RESOLUTION

Use AskUserQuestion:
- Question: "What part is still unclear?"
- Header: "Let's clear this up"
- Options:
  - A) "I don't understand what an AI orchestration system is" — Description: "I'll explain what that means in plain terms."
  - B) "I'm not sure which option fits my idea" — Description: "Tell me more about your idea and I'll help you decide."
  - C) "I don't know what I want to build yet" — Description: "That's fine — I can help you figure it out."
  - D) "Something else is confusing me" — Description: "I'll try to answer whatever is unclear."

Based on the user's answer, display a short targeted clarification in the chat (2-4 sentences):
- If A: Explain that an orchestration system is like SYNTROP itself — a structured AI system that can manage complex workflows autonomously using Claude Code.
- If B: Ask them to describe their idea briefly in the chat, then make a recommendation.
- If C: Reassure them that a rough idea is enough — SYNTROP helps shape the idea.
- If D: Ask them to describe what's confusing them in the chat.

Then use AskUserQuestion:
- Question: "Does that help clarify things?"
- Header: "Ready to continue?"
- Options:
  - A) "Yes, I'm ready to choose" — Description: "Let's continue."
  - B) "No, I still need help" — Description: "I'll try to help further."

IF user chose A:
  Use AskUserQuestion again with the same 3-option "What would you like to build?" question from the end of STEP 3.
  Set project_type accordingly and jump to STEP 5.

IF user chose B:
  Repeat STEP 3a ONE more time (maximum two rounds of confusion resolution).
  After the second round, regardless of whether the user says they're ready or not,
  show the 3-option "What would you like to build?" question again, and add this note
  above it in the chat:
    "Pick whichever feels closest to what you're thinking. You can always adjust your idea
    later — SYNTROP will ask clarifying questions as it works."
  Set project_type accordingly and jump to STEP 5.

---

## STEP 4: TYPE SELECTION (returning users who skipped the explanation)

Use AskUserQuestion:
- Question: "What do you want to build?"
- Header: "Choose your path"
- Options:
  - A) "A software project (app, tool, API, website, script, automation, etc.)" — Description: "Build any software idea you have."
  - B) "An AI orchestration system for Claude Code" — Description: "Build a custom SYNTROP-style system for a specific domain."

IF user chose A: Set project_type = "vision".
IF user chose B: Set project_type = "system_design".
Continue to STEP 5.

---

## STEP 5: BIG-PICTURE SCOPING QUESTIONS

IF project_type = "vision":
  Ask these two questions via AskUserQuestion (one at a time):

  Question 1:
    - Question: "How defined is your idea right now?"
    - Header: "Idea clarity"
    - Options:
      - A) "Clear vision — I know exactly what I want" — Description: "You have a detailed picture of the end result."
      - B) "Rough idea — I have the concept but not the details" — Description: "You know what you want but not how it should work."
      - C) "Multiple ideas — I want help choosing or combining them" — Description: "You have more than one direction you're considering."

  Question 2:
    - Question: "Who will use what you're building?"
    - Header: "Audience"
    - Options:
      - A) "Just me — personal tool or script" — Description: "Something for your own use only."
      - B) "A small team or group" — Description: "A few people who work with you."
      - C) "External users or customers" — Description: "People you don't know personally."

IF project_type = "system_design":
  Ask these two questions via AskUserQuestion (one at a time):

  Question 1:
    - Question: "What domain is this orchestration system for?"
    - Header: "Domain"
    - Options:
      - A) "Software or technical workflows" — Description: "Development pipelines, code review systems, deployment automation, etc."
      - B) "Business or operational workflows" — Description: "Approvals, reporting, client management, operations, etc."
      - C) "Creative, content, or research workflows" — Description: "Writing pipelines, research automation, content production, etc."
      - D) "Something else entirely" — Description: "A domain not listed above."

  Question 2:
    - Question: "How much of the system design do you already have in mind?"
    - Header: "Design clarity"
    - Options:
      - A) "Just a concept — I need help designing the structure" — Description: "You know the domain and purpose but not the phases or components."
      - B) "I have some phases and steps mapped out" — Description: "You have a partial design that needs to be filled in."
      - C) "Full design ready — I just need it structured and built" — Description: "You have a detailed vision of every component."

Save scoping answers to a temporary variable (used as context metadata during brain dump processing).

---

## STEP 6: BRAIN DUMP COLLECTION

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

---

## STEP 7: PROCESS BRAIN DUMP

IF project_type = "vision":
  Read `SYNTROP/vision-prompt.md`.
  Apply the transformation rules from that file to the user's brain dump.
  Use the scoping answers from STEP 5 as additional context:
    - "Clear vision" + "Just me" → minimal expansion; focus on capturing specifics
    - "Rough idea" or "Multiple ideas" → expand more aggressively; flag uncertainties
    - "External users" → ensure audience and problem statement sections are thorough

IF project_type = "system_design":
  Read `SYNTROP/system-design-prompt.md`.
  Apply the transformation rules from that file to the user's brain dump.
  Use the scoping answers from STEP 5 as additional context:
    - Design clarity "Just a concept" → expand aggressively; generate phase and worker candidates
    - Design clarity "I have some phases" or "Full design" → preserve user's structure
    - Domain answer → shapes naming and framing of all components

Produce a structured output following the output format defined in the appropriate prompt file.
Do NOT display the processed output to the user in the chat.
The output goes directly to the file in STEP 8.

---

## STEP 8: WRITE TO STATE FILES

Write the processed brain dump to:
  `SYNTROP/artifacts/intake/prepared-braindump.md`
  (Create the `SYNTROP/artifacts/intake/` directory if it does not already exist)

Update `SYNTROP/orchestration-state.json` with these exact changes:
  - `"project_type"`: set to `"vision"` or `"system_design"` (whichever was chosen)
  - `"context_pointers.brain_dump"`: `"SYNTROP/artifacts/intake/prepared-braindump.md"`
  - `"next_action.description"`: `"Send /orchestrate in a fresh chat to begin building"`
  - `"next_action.command_hint"`: `"/orchestrate"`
  - `"next_action.expected_director"`: `"INTAKE-DIRECTOR"`
  - `"status"`: `"in_progress"`
  - `"phase"` stays as `"uninitialized"` — /orchestrate will move it to "intake"

Update `SYNTROP/context-summary.md` with:
  - Project type (write as plain English: "software project" or "AI orchestration system")
  - Scoping answers (1-2 sentences summarizing them)
  - Current status: "Brain dump prepared. Awaiting /orchestrate to begin."

---

## STEP 9: DISPLAY SAFE TO CLEAR BANNER AND NEXT INSTRUCTIONS

Display this in the chat as the FINAL output — nothing else after this:

```
+===========================================================+
|                                                           |
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Your idea has been saved and organized.                  |
|  Open a fresh chat when you're ready.                     |
|  Then send: /orchestrate                                  |
|                                                           |
+===========================================================+
```

**Next step:**
Open a new Claude Code chat (or use the "clear conversation" option in Claude Code),
then send /orchestrate. It will pick up exactly where this left off.

STOP. Do not output anything else.
