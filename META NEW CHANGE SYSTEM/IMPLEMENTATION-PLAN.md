# SYNTROP System Redesign — Implementation Plan

> **Generated from**: `SYNTROP-VISION.md` (full read) + live file research across all affected files.
> **Executor**: A fresh Claude Code session can execute each step using only this document.
> No re-reading of SYNTROP-VISION.md is required.

---

## Pre-Implementation Research Findings

These findings were gathered by reading every affected file before writing this plan.
Discrepancies between SYNTROP-VISION.md and actual file contents are flagged with **⚠️ DISCREPANCY**.

### Current Root Structure (confirmed via `ls`)
```
CEO-ORCHESTRATOR.md
CLAUDE.md
context-summary.md
conversation.md
directors/
file-index.json
handlers/
init-workspace.sh
orchestration-state.json
progress-log.md
README.md
SYNTROP-VISION.md            ← not moved (stays at root)
SYNTROP-brand-package/       ← untracked, stays at root
implementation-plan-prompt.md ← untracked, stays at root
TROUBLESHOOTING.md
USER-GUIDE.md
USER-START-HERE/
  vision-to-braindump.md
  vision-to-orchestration-braindump.md
workers/
.claude/
  commands/
    orchestrate.md
```

### ⚠️ DISCREPANCY 1 — USER-START-HERE/README.md does not exist
SYNTROP-VISION.md Section 10 Step 14 says "Delete USER-START-HERE/README.md". This file does not exist.
**Resolution**: Skip the deletion step entirely. USER-START-HERE/ contains only the two files being moved to SYNTROP/.

### ⚠️ DISCREPANCY 2 — Root "exactly 4 items" goal is not fully achievable
SYNTROP-VISION.md Section 8 says root should contain exactly 4 items. Currently there are additional untracked files (SYNTROP-VISION.md, SYNTROP-brand-package/, implementation-plan-prompt.md) that are not addressed by the redesign. After all moves, root will contain: `.claude/`, `SYNTROP/`, `USER-START-HERE/`, `README.md`, plus these extra files.
**Resolution**: Flag but do not act. The 4-item goal applies to orchestration files only.

### ⚠️ DISCREPANCY 3 — Path resolution: CEO-ORCHESTRATOR.md internal paths will break after move
SYNTROP-VISION.md Section 4.5 Change 1 states that `orchestration-state.json` "remains valid (relative from inside SYNTROP/)". This is incorrect. Claude Code executes all file operations relative to the workspace root, not relative to the file being read. After moving CEO-ORCHESTRATOR.md to SYNTROP/, any instruction inside it to `Read orchestration-state.json` will fail because the file is now at `SYNTROP/orchestration-state.json`.

**Affected paths inside CEO-ORCHESTRATOR.md that the VISION does NOT specify updating but MUST be updated:**
- `Read orchestration-state.json` → `Read SYNTROP/orchestration-state.json`
- `Read context-summary.md` → `Read SYNTROP/context-summary.md`
- `Read file-index.json` → `Read SYNTROP/file-index.json`
- `Read progress-log.md` → `Read SYNTROP/progress-log.md`
- `bash init-workspace.sh` → `bash SYNTROP/init-workspace.sh`
- All `artifacts/` paths → `SYNTROP/artifacts/`
- All `directors/` paths → `SYNTROP/directors/`
- All `workers/` paths → `SYNTROP/workers/`
- All `handlers/` paths → `SYNTROP/handlers/`
- All `errors/` paths → `SYNTROP/errors/`
- All `deployment/` paths → `SYNTROP/deployment/`

**Resolution**: Phase 3 of this plan includes all VISION-specified CEO changes AND these additional path updates, clearly marked. These are required deviations for correct operation.

### ⚠️ DISCREPANCY 4 — init-workspace.sh: file_index path embedded in generated JSON
init-workspace.sh uses self-anchoring (`$(dirname "${BASH_SOURCE[0]}")`) so it will correctly run from SYNTROP/ after the move. However, the orchestration-state.json it generates contains `"file_index": "file-index.json"`. After the move, the CEO (running from workspace root context) reading this path would look for `file-index.json` at the workspace root, not `SYNTROP/file-index.json`.

SYNTROP-VISION.md says "no content changes needed" to init-workspace.sh.
**Resolution**: Flag but defer. The CEO path updates in Phase 3 will be the authoritative fix for how paths are resolved. If the CEO is updated to explicitly read `SYNTROP/file-index.json` (rather than reading the path from state), the embedded value becomes irrelevant.

### ⚠️ DISCREPANCY 5 — Director and worker files also contain broken artifact paths
All 5 director files and all worker files reference `artifacts/`, `errors/`, and `deployment/` as root-relative paths. After moving to SYNTROP/, these break unless Claude Code interprets them relative to SYNTROP/.

SYNTROP-VISION.md says workers should not be modified. For directors, only banner and command_hint changes are specified.
**Resolution**: This plan includes ONLY the VISION-specified director changes (banners + command_hints). Document the artifact path issue as a known gap requiring follow-up testing. If paths break during a live `/orchestrate` run, the affected directors and workers will need content updates not covered by this plan.

### Current `orchestrate.md` Key Strings (exact, for find-replace)
- Line 1 Step 1: `Read the file CEO-ORCHESTRATOR.md in the workspace root`
- Line 2 routing: `- If \`$ARGUMENTS\` equals "continue" OR is empty → Execute the CEO's CONTINUE PROTOCOL`
- References to `orchestration-state.json` (bare, no prefix): appears in Step 2 routing logic
- References to `context-summary.md`, `file-index.json`: appear in Step 3 CEO protocol description

### Current `CEO-ORCHESTRATOR.md` Key Strings
- `bash init-workspace.sh` — NEW PROJECT PROTOCOL Step 1
- `"command_hint": "/orchestrate continue"` — appears in Quick Reference section
- `/orchestrate continue` — appears in all chat session end templates (4 locations)
- Chat end templates are markdown prose, NOT ASCII box format
- `Read orchestration-state.json` — INITIALIZATION Step 1
- `Read context-summary.md` — INITIALIZATION Step 3

### Current Director Files — All `command_hint` Values Found
All 5 directors have `"command_hint": "/orchestrate continue"` in their phase completion JSON blocks.
- INTAKE-DIRECTOR.md: 1 occurrence in phase completion action JSON
- RESEARCH-DIRECTOR.md: 1 occurrence in phase completion action JSON
- ARCHITECTURE-DIRECTOR.md: 1 occurrence in phase completion action JSON
- EXECUTION-DIRECTOR.md: 1 occurrence in phase completion action JSON + prose `Send /orchestrate continue to keep building.`
- QUALITY-DIRECTOR.md: `"command_hint": "/orchestrate status (to review) or /orchestrate reset (to start new project)"` — does NOT contain `/orchestrate continue`, no change needed

### Current Director Files — Stop Points Requiring SAFE TO CLEAR Banners
- **INTAKE-DIRECTOR**: After ssot-generation → user approval (ssot-approval step), after ssot-revision re-approval
- **RESEARCH-DIRECTOR**: After decision-matrix → approach selection pause, after technical-validation phase transition
- **ARCHITECTURE-DIRECTOR**: After implementation-planning → plan approval pause, after plan-approval phase transition
- **EXECUTION-DIRECTOR**: After each sprint → sprint boundary stop, after integration testing → phase transition
- **QUALITY-DIRECTOR**: After deployment-preparation → final review pause, after final approval → project complete

### Current USER-INPUT-HANDLER.md Structure
Sections: Identity → When This Handler Is Invoked → Question Formatting Protocol (Type 1/2/3) → Response Processing Protocol → Question Design Principles → Error Handling.
Missing: Chat State Banners section, AskUserQuestion Requirement section. The question format displays are markdown blocks (not popup interface references).

### `orchestration-state.json` Current Schema
Does not contain `project_type` field. Has `"file_index": "file-index.json"` in context_pointers.

---

## Implementation Sequence

Follow this exact order. Each phase depends on the previous.

---

## Phase 1 — File Moves

**Risk**: Do ALL moves before any content edits. Content edits reference new paths. Editing before moving leaves broken references.

### Step 1.1 — Create SYNTROP/ directory
**What**: Create the SYNTROP/ folder at workspace root.
**How**:
```bash
mkdir "SYNTROP"
```

### Step 1.2 — Move orchestration root files (git mv)
**What**: Move 9 standalone files from workspace root to SYNTROP/.
**How**:
```bash
git mv CEO-ORCHESTRATOR.md SYNTROP/CEO-ORCHESTRATOR.md
git mv init-workspace.sh SYNTROP/init-workspace.sh
git mv orchestration-state.json SYNTROP/orchestration-state.json
git mv context-summary.md SYNTROP/context-summary.md
git mv file-index.json SYNTROP/file-index.json
git mv progress-log.md SYNTROP/progress-log.md
git mv conversation.md SYNTROP/conversation.md
git mv USER-GUIDE.md SYNTROP/USER-GUIDE.md
git mv TROUBLESHOOTING.md SYNTROP/TROUBLESHOOTING.md
```
**Verify**: `ls SYNTROP/` should now show all 9 files.

### Step 1.3 — Move directors/ directory
**What**: Move the entire directors/ directory into SYNTROP/.
**How**:
```bash
git mv directors SYNTROP/directors
```
**Verify**: `ls SYNTROP/directors/` should show all 5 director files.

### Step 1.4 — Move workers/ directory
**What**: Move the entire workers/ directory into SYNTROP/.
**How**:
```bash
git mv workers SYNTROP/workers
```

### Step 1.5 — Move handlers/ directory
**What**: Move the entire handlers/ directory into SYNTROP/.
**How**:
```bash
git mv handlers SYNTROP/handlers
```

### Step 1.6 — Move and rename vision-to-braindump.md
**What**: Move `USER-START-HERE/vision-to-braindump.md` to `SYNTROP/vision-prompt.md`.
**Source**: `USER-START-HERE/vision-to-braindump.md`
**Destination**: `SYNTROP/vision-prompt.md`
**How**:
```bash
git mv USER-START-HERE/vision-to-braindump.md SYNTROP/vision-prompt.md
```

### Step 1.7 — Move and rename vision-to-orchestration-braindump.md
**What**: Move `USER-START-HERE/vision-to-orchestration-braindump.md` to `SYNTROP/system-design-prompt.md`.
**Source**: `USER-START-HERE/vision-to-orchestration-braindump.md`
**Destination**: `SYNTROP/system-design-prompt.md`
**How**:
```bash
git mv USER-START-HERE/vision-to-orchestration-braindump.md SYNTROP/system-design-prompt.md
```

### Phase 1 Completion Check
After all moves, verify:
```bash
ls SYNTROP/
# Expected: CEO-ORCHESTRATOR.md, context-summary.md, conversation.md,
#           directors/, file-index.json, handlers/, init-workspace.sh,
#           orchestration-state.json, progress-log.md, system-design-prompt.md,
#           TROUBLESHOOTING.md, USER-GUIDE.md, vision-prompt.md, workers/

ls
# Expected root: .claude/, CLAUDE.md, implementation-plan-prompt.md, IMPLEMENTATION-PLAN.md,
#                README.md, SYNTROP/, SYNTROP-brand-package/, SYNTROP-VISION.md,
#                USER-START-HERE/
```

---

## Phase 2 — Path Reference Updates

### Step 2.1 — Update `.claude/commands/orchestrate.md`

**File**: `.claude/commands/orchestrate.md`

**Read the file first, then apply these 4 changes.**

---

**Change 2.1.A — Update CEO path in Step 1**

Find (exact string):
```
Read the file `CEO-ORCHESTRATOR.md` in the workspace root
```
Replace with:
```
Read the file `SYNTROP/CEO-ORCHESTRATOR.md` in the workspace root
```

---

**Change 2.1.B — Update all state file path references**

Find and replace ALL occurrences of these strings throughout the file:
| Find | Replace with |
|------|--------------|
| `` `CEO-ORCHESTRATOR.md` `` | `` `SYNTROP/CEO-ORCHESTRATOR.md` `` |
| `` `orchestration-state.json` `` | `` `SYNTROP/orchestration-state.json` `` |
| `` `context-summary.md` `` | `` `SYNTROP/context-summary.md` `` |
| `` `file-index.json` `` | `` `SYNTROP/file-index.json` `` |

Apply to every line in the file where these appear unquoted or quoted.

---

**Change 2.1.C — Replace the Step 2 routing block**

Find this exact block (from "- If `$ARGUMENTS` equals "continue"..." to end of the bullet list):
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

---

**Change 2.1.D — Add Step 3.5 (Session Context Display)**

After the existing "### Step 3: Follow CEO Protocol" section and before "### Step 4: End of Execution", insert this new section:

```markdown
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
```

---

### Step 2.2 — Update `CLAUDE.md`

**File**: `CLAUDE.md`

**Read the file first, then apply these 5 changes.**

---

**Change 2.2.A — Replace the Primary Command section and commands table**

Find (the entire table block, starting from `## Primary Command`):
```markdown
## Primary Command

**`/orchestrate`** is the only command you need. It handles everything:

| Command | Action |
|---------|--------|
| `/orchestrate [your idea]` | Start a new project from a brain dump |
| `/orchestrate continue` | Resume from where the last chat left off |
| `/orchestrate status` | Show current progress without executing |
| `/orchestrate reset` | Clear all project data and start fresh |
```
Replace with:
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

---

**Change 2.2.B — Replace the System Architecture diagram**

Find:
```
CEO-ORCHESTRATOR.md          ← Master controller (reads this every /orchestrate invocation)
├── directors/               ← 5 phase managers (Intake, Research, Architecture, Execution, Quality)
├── workers/                 ← 23 specialized task executors
└── handlers/                ← 4 support systems (Input, Errors, State, Context)
```
Replace with:
```
SYNTROP/CEO-ORCHESTRATOR.md     ← Master controller (reads this every /orchestrate invocation)
├── SYNTROP/directors/          ← 5 phase managers (Intake, Research, Architecture, Execution, Quality)
├── SYNTROP/workers/            ← 23 specialized task executors
└── SYNTROP/handlers/           ← 4 support systems (Input, Errors, State, Context)
```

---

**Change 2.2.C — Replace the Key Files table**

Find:
```markdown
| File | Purpose |
|------|---------|
| `orchestration-state.json` | System memory - tracks phase, step, decisions, progress |
| `context-summary.md` | Quick orientation - project name, current state, key decisions |
| `file-index.json` | Maps all generated artifacts to their file paths |
| `CEO-ORCHESTRATOR.md` | Full protocol for the master controller |
| `init-workspace.sh` | Creates directory structure (run automatically on first `/orchestrate`) |
```
Replace with:
```markdown
| File | Purpose |
|------|---------|
| `SYNTROP/orchestration-state.json` | System memory — tracks phase, step, decisions, progress |
| `SYNTROP/context-summary.md` | Quick orientation — project name, current state, key decisions |
| `SYNTROP/file-index.json` | Maps all generated artifacts to their file paths |
| `SYNTROP/CEO-ORCHESTRATOR.md` | Full protocol for the master controller |
| `SYNTROP/init-workspace.sh` | Creates directory structure (run automatically on first /orchestrate) |
```

---

**Change 2.2.D — Update Behavioral Rules**

Find:
```
1. When `/orchestrate` is invoked, read `CEO-ORCHESTRATOR.md` and follow its protocol exactly
2. Always read `orchestration-state.json` as the first action in any orchestration task
```
Replace with:
```
1. When `/orchestrate` is invoked, read `SYNTROP/CEO-ORCHESTRATOR.md` and follow its protocol exactly
2. Always read `SYNTROP/orchestration-state.json` as the first action in any orchestration task
```

---

**Change 2.2.E — Update Documentation links**

Find:
```
- `USER-GUIDE.md` - Detailed usage guide with examples
- `TROUBLESHOOTING.md` - Common issues and recovery procedures
```
Replace with:
```
- `SYNTROP/USER-GUIDE.md` — Detailed usage guide with examples
- `SYNTROP/TROUBLESHOOTING.md` — Common issues and recovery procedures
```

---

## Phase 3 — SYNTROP/CEO-ORCHESTRATOR.md Changes

**File**: `SYNTROP/CEO-ORCHESTRATOR.md` (already moved in Phase 1)

**Read the file first. Apply all changes below.**

**Risk**: This is the highest-risk file. Every change must be verified. Changes build on each other — complete them in order.

---

**Change 3.1 — Fix bash init-workspace.sh path** *(Required deviation — VISION does not specify this but it will break without it)*

Find:
```bash
bash init-workspace.sh
```
Replace with:
```bash
bash SYNTROP/init-workspace.sh
```
This appears in the NEW PROJECT PROTOCOL Step 1. There is exactly 1 occurrence.

---

**Change 3.2 — Update INITIALIZATION Step 1 path**

Find (under `## INITIALIZATION: First Actions in Every Fresh Chat`, Step 1):
```
Read orchestration-state.json
```
Replace with:
```
Read SYNTROP/orchestration-state.json
```

---

**Change 3.3 — Update INITIALIZATION Step 3 path**

Find (under INITIALIZATION, Step 3):
```
Read context-summary.md
```
Replace with:
```
Read SYNTROP/context-summary.md
```

---

**Change 3.4 — Update INITIALIZATION Step 4: command detection block — add project_type awareness**

Find the block under "IF arguments == "continue" OR arguments is empty/blank:" (exact block):
```
IF arguments == "continue" OR arguments is empty/blank:
  → Execute CONTINUE PROTOCOL
```
Replace with:
```
IF arguments == "continue" OR arguments is empty/blank:
  Read SYNTROP/orchestration-state.json
  IF phase = "uninitialized":
    IF context_pointers.brain_dump is set to a file path:
      → Execute NEW PROJECT PROTOCOL using the file at that path as the brain dump
    ELSE:
      → Display: "No project found. Run /start first, then send /orchestrate."
      → STOP
  ELSE:
    → Execute CONTINUE PROTOCOL (existing behavior)
```

---

**Change 3.5 — NEW PROJECT PROTOCOL: add archive step (Step 3a)**

After the existing "Step 3: Save Brain Dump" block and before "Step 4: Initialize State", insert:

```markdown
### Step 3a: Archive prepared-braindump.md (prevents double-pickup)
IF the brain dump was loaded from `SYNTROP/artifacts/intake/prepared-braindump.md`:
  Rename that file to `SYNTROP/artifacts/intake/prepared-braindump-used.md`
  Update `SYNTROP/file-index.json` to reflect the new filename
  Rationale: If the user accidentally sends /orchestrate again in the same or a new chat
  before progressing, the system will not start a duplicate new project.
```

---

**Change 3.6 — NEW PROJECT PROTOCOL: pass project_type to INTAKE-DIRECTOR**

Find the "Step 4: Initialize State" block. Inside the JSON object shown, after the `"status": "in_progress"` line, add:
```json
"intake_mode": "[the project_type value from state — either 'vision' or 'system_design']",
```
This signals INTAKE-DIRECTOR which processing strategy to apply.

Also update the `context_pointers.brain_dump` path in Step 4's JSON:
Find:
```json
"brain_dump": "artifacts/intake/raw-brain-dump.md",
```
Replace with:
```json
"brain_dump": "SYNTROP/artifacts/intake/raw-brain-dump.md",
```

And in Step 3 (Save Brain Dump):
Find:
```
Write the user's brain dump text to `artifacts/intake/raw-brain-dump.md`.
```
Replace with:
```
Write the user's brain dump text to `SYNTROP/artifacts/intake/raw-brain-dump.md`.
```

---

**Change 3.7 — Replace ALL chat session end templates with ASCII box banners**

Find the entire `## CHAT SESSION END TEMPLATE` section (from `## CHAT SESSION END TEMPLATE` to the end of the Project Complete block). Replace the ENTIRE section with:

```markdown
## CHAT SESSION END TEMPLATE

Every chat session must end with a clear banner to the user.

### When Waiting for User Input (questions pending):
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

### When Stopping at a Phase Boundary or Context Limit (state is saved):
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

### When Project is Fully Complete:
```
+===========================================================+
|                  PROJECT COMPLETE                         |
|                                                           |
|  All deliverables are in the deployment/ directory.       |
|  /orchestrate status   — review summary                   |
|  /orchestrate reset    — start a new project              |
+===========================================================+
```
```

---

**Change 3.8 — Update Quick Reference: File Locations**

Find the `## QUICK REFERENCE: File Locations` section block:
```
State:        orchestration-state.json
File Index:   file-index.json
Context:      context-summary.md
Progress:     progress-log.md

Directors:    directors/{NAME}-DIRECTOR.md
Workers:      workers/{name}.md
Handlers:     handlers/{NAME}.md

Artifacts:    artifacts/{phase}/{file}
Errors:       errors/{type}-{timestamp}.json
Deployment:   deployment/
```
Replace with:
```
State:        SYNTROP/orchestration-state.json
File Index:   SYNTROP/file-index.json
Context:      SYNTROP/context-summary.md
Progress:     SYNTROP/progress-log.md

Directors:    SYNTROP/directors/{NAME}-DIRECTOR.md
Workers:      SYNTROP/workers/{name}.md
Handlers:     SYNTROP/handlers/{NAME}.md

Artifacts:    SYNTROP/artifacts/{phase}/{file}
Errors:       SYNTROP/errors/{type}-{timestamp}.json
Deployment:   SYNTROP/deployment/
```

---

**Change 3.9 — Update Quick Reference: User Commands — remove all /orchestrate continue**

Find the `## QUICK REFERENCE: User Commands` block:
```
/orchestrate [idea]     → Start new project
/orchestrate continue   → Resume from current state
/orchestrate            → Same as continue (if project exists)
/orchestrate status     → Show progress
/orchestrate reset      → Clear everything and start over
[any text]              → If awaiting input, treated as user response
```
Replace with:
```
/start                  → Onboarding wizard — run this first for any new project
/orchestrate [idea]     → Start new project directly (skips /start wizard)
/orchestrate            → Resume current project (auto-detects where you left off)
/orchestrate status     → Show progress
/orchestrate reset      → Clear everything and start over
[any text]              → If awaiting input, treated as user response
```

---

**Change 3.10 — Update CONTINUE PROTOCOL Step 2: Director paths**

Find the phase routing block:
```
phase = "intake"       → Read directors/INTAKE-DIRECTOR.md, follow its instructions
phase = "research"     → Read directors/RESEARCH-DIRECTOR.md, follow its instructions
phase = "architecture" → Read directors/ARCHITECTURE-DIRECTOR.md, follow its instructions
phase = "execution"    → Read directors/EXECUTION-DIRECTOR.md, follow its instructions
phase = "quality"      → Read directors/QUALITY-DIRECTOR.md, follow its instructions
```
Replace with:
```
phase = "intake"       → Read SYNTROP/directors/INTAKE-DIRECTOR.md, follow its instructions
phase = "research"     → Read SYNTROP/directors/RESEARCH-DIRECTOR.md, follow its instructions
phase = "architecture" → Read SYNTROP/directors/ARCHITECTURE-DIRECTOR.md, follow its instructions
phase = "execution"    → Read SYNTROP/directors/EXECUTION-DIRECTOR.md, follow its instructions
phase = "quality"      → Read SYNTROP/directors/QUALITY-DIRECTOR.md, follow its instructions
```

---

**Change 3.11 — Update CONTINUE PROTOCOL Step 4: state file update references**

Scan the CONTINUE PROTOCOL Step 4 block. Find references to state files and update:

Find:
```
Update `orchestration-state.json` with latest progress
Update `file-index.json` with any new files
Update `context-summary.md` with latest status
Update `progress-log.md` with log entry
```
Replace with:
```
Update `SYNTROP/orchestration-state.json` with latest progress
Update `SYNTROP/file-index.json` with any new files
Update `SYNTROP/context-summary.md` with latest status
Update `SYNTROP/progress-log.md` with log entry
```

---

**Change 3.12 — Update NEW PROJECT PROTOCOL: Steps 5 and 6 context paths**

Find in NEW PROJECT PROTOCOL Step 5 (Update File Index):
```
Add `artifacts/intake/raw-brain-dump.md` to `file-index.json`.
```
Replace with:
```
Add `SYNTROP/artifacts/intake/raw-brain-dump.md` to `SYNTROP/file-index.json`.
```

Find in NEW PROJECT PROTOCOL Step 7 (Begin Intake):
```
Load and follow `directors/INTAKE-DIRECTOR.md` instructions.
```
Replace with:
```
Load and follow `SYNTROP/directors/INTAKE-DIRECTOR.md` instructions.
```

---

**Change 3.13 — Update STATUS PROTOCOL: Read paths**

Find in STATUS PROTOCOL Step 1:
```
Read:
- `orchestration-state.json` (current position)
- `progress-log.md` (history)
- `context-summary.md` (quick overview)
```
Replace with:
```
Read:
- `SYNTROP/orchestration-state.json` (current position)
- `SYNTROP/progress-log.md` (history)
- `SYNTROP/context-summary.md` (quick overview)
```

Find in STATUS PROTOCOL Step 2:
```
Follow `workers/progress-reporter.md`
```
Replace with:
```
Follow `SYNTROP/workers/progress-reporter.md`
```

---

**Change 3.14 — Update ERROR RECOVERY PROTOCOL: handler path**

Find:
```
Load and follow `handlers/ERROR-RECOVERY.md`:
```
Replace with:
```
Load and follow `SYNTROP/handlers/ERROR-RECOVERY.md`:
```

---

**Change 3.15 — Update STATE MACHINE DIAGRAM: director paths**

Find in the COMPLETE STATE MACHINE DIAGRAM section:
```
[NEW PROJECT PROTOCOL]
    ↓
[INTAKE DIRECTOR]
```
No path references exist in the diagram itself, so no changes needed here.

---

**Change 3.16 — Update USER INPUT PROTOCOL: handler path**

Find:
```
Follow `handlers/USER-INPUT-HANDLER.md` to:
```
Replace with:
```
Follow `SYNTROP/handlers/USER-INPUT-HANDLER.md` to:
```

---

**Change 3.17 — Update SELF-MONITORING: STATE-VALIDATOR path**

Find:
```
Is `orchestration-state.json` valid? (STATE-VALIDATOR)
```
Replace with:
```
Is `SYNTROP/orchestration-state.json` valid? (STATE-VALIDATOR)
```

Find:
```
Validate state integrity
→ If corrupted: attempt repair before proceeding
```
Then find the STATE-VALIDATOR reference in INITIALIZATION Step 2:
```
Apply the STATE-VALIDATOR protocol (handlers/STATE-VALIDATOR.md):
```
Replace with:
```
Apply the STATE-VALIDATOR protocol (SYNTROP/handlers/STATE-VALIDATOR.md):
```

---

**Change 3.18 — PHASE TRANSITION LOGIC: update completed phases JSON**

In the PHASE TRANSITION LOGIC section, verify no hardcoded file paths exist. This section uses only field names and percentage values — no changes needed.

---

## Phase 4 — Director File Changes (All 5)

**Files** (already moved to SYNTROP/directors/ in Phase 1):
- `SYNTROP/directors/INTAKE-DIRECTOR.md`
- `SYNTROP/directors/RESEARCH-DIRECTOR.md`
- `SYNTROP/directors/ARCHITECTURE-DIRECTOR.md`
- `SYNTROP/directors/EXECUTION-DIRECTOR.md`
- `SYNTROP/directors/QUALITY-DIRECTOR.md`

**Read each file before editing.**

---

### Step 4.1 — All 5 Directors: Update command_hint in phase completion JSON

**Change A (applies to INTAKE, RESEARCH, ARCHITECTURE, EXECUTION directors)**

In each director's Phase Completion Actions JSON block, find:
```json
"command_hint": "/orchestrate continue",
```
Replace with:
```json
"command_hint": "/orchestrate",
```

**QUALITY-DIRECTOR exception**: Its `command_hint` is already `"/orchestrate status (to review) or /orchestrate reset (to start new project)"` — no change needed.

---

### Step 4.2 — All 5 Directors: Add SAFE TO CLEAR banner at each stop point

For each stop point listed below, add the SAFE TO CLEAR banner as the FINAL output before stopping. The banner text uses the actual phase name and must read the `progress.percentage` value from `SYNTROP/orchestration-state.json`.

**Banner template to insert at each stop point:**
```
+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  [Phase name] complete. Progress saved.                   |
|  Open a fresh chat and send: /orchestrate                 |
|  Overall progress: {X}%                                   |
+===========================================================+
```
Replace `[Phase name]` and `{X}%` as specified per director below.

---

**INTAKE-DIRECTOR — Stop Points:**

*Stop point 1*: After SSOT is generated and presented for approval (the `ssot-approval` step). The system pauses waiting for user approval.

Locate the section where SSOT is displayed for approval. Add BEFORE the pause:
```
+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Intake — SSOT ready for your review.                     |
|  Answer the approval question above, then you can clear.  |
|  Overall progress: {X}%                                   |
+===========================================================+
```
*(Note: This is technically a DO NOT CLEAR moment during approval — but the VISION specifies SAFE banners at all stop points. The DO NOT CLEAR banner from USER-INPUT-HANDLER will appear above the questions, and the SAFE banner appears after.)*

*Stop point 2*: At the phase completion block, after user has approved the SSOT and state transitions to research.

After the phase completion JSON block, add:
```
+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Intake complete. Progress saved.                         |
|  Open a fresh chat and send: /orchestrate                 |
|  Overall progress: 20%                                    |
+===========================================================+
```

---

**RESEARCH-DIRECTOR — Stop Points:**

*Stop point 1*: After decision matrix is displayed and user must select an approach (the `approach-selection` step pause).

After the decision matrix display, add:
```
+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Research — approach selection ready.                     |
|  Answer the selection question above, then you can clear. |
|  Overall progress: {X}%                                   |
+===========================================================+
```

*Stop point 2*: At phase completion, after technical validation passes and state transitions to architecture.

After the phase completion JSON block, add:
```
+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Research complete. Progress saved.                       |
|  Open a fresh chat and send: /orchestrate                 |
|  Overall progress: 40%                                    |
+===========================================================+
```

---

**ARCHITECTURE-DIRECTOR — Stop Points:**

*Stop point 1*: After implementation plan is displayed and user must approve (the `plan-approval` step pause).

After the plan display, add:
```
+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Architecture — plan ready for your review.               |
|  Answer the approval question above, then you can clear.  |
|  Overall progress: {X}%                                   |
+===========================================================+
```

*Stop point 2*: At phase completion, after user approves plan and state transitions to execution.

After the phase completion JSON block, add:
```
+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Architecture complete. Progress saved.                   |
|  Open a fresh chat and send: /orchestrate                 |
|  Overall progress: 60%                                    |
+===========================================================+
```

---

**EXECUTION-DIRECTOR — Stop Points:**

*Stop point 1 (sprint stop display block)*: Replace the existing sprint stop display block.

Find the exact block:
```markdown
## Execution Progress

Sprint {N}/{total}: {sprint_name}
Tasks completed: {done}/{total_in_sprint}
Overall: {completed_steps}/{total_steps} tasks ({percentage}%)

[Progress bar visualization]

Send `/orchestrate continue` to keep building.
```
Replace with:
```markdown
## Execution Progress

Sprint {N}/{total}: {sprint_name}
Tasks completed: {done}/{total_in_sprint}
Overall: {completed_steps}/{total_steps} tasks ({percentage}%)

[Progress bar visualization]

Sprint {N} of {total} complete. Progress saved.

+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Sprint {N} of {total} complete.                          |
|  Open a fresh chat and send: /orchestrate                 |
|  Overall progress: {X}%                                   |
+===========================================================+
```

*Stop point 2*: At phase completion, after integration testing passes and state transitions to quality.

After the phase completion JSON block, add:
```
+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Execution complete. Progress saved.                      |
|  Open a fresh chat and send: /orchestrate                 |
|  Overall progress: 80%                                    |
+===========================================================+
```

---

**QUALITY-DIRECTOR — Stop Points:**

*Stop point 1*: After deployment package is prepared and final review is presented.

After the final review display block (which ends with "Reply with A or B"), add:
```
+===========================================================+
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Quality — final review ready.                            |
|  Answer the review question above, then you can clear.    |
|  Overall progress: {X}%                                   |
+===========================================================+
```

*Stop point 2 (Project Complete)*: After user approves final deliverables. Replace the existing `## CHAT SESSION END TEMPLATE` behavior at the quality phase end with:

```
+===========================================================+
|                  PROJECT COMPLETE                         |
|                                                           |
|  All deliverables are in the deployment/ directory.       |
|  /orchestrate status   — review summary                   |
|  /orchestrate reset    — start a new project              |
+===========================================================+
```

---

### Step 4.3 — INTAKE-DIRECTOR: Add prepared-braindump detection

**File**: `SYNTROP/directors/INTAKE-DIRECTOR.md`

Locate the section that routes to the `vision-clarifier` worker (the `vision-clarification` step). This is in the Step Routing Logic.

Find the routing case for `"vision-clarification"` (or the block that delegates to vision-clarifier). Insert this check BEFORE the delegation:

```markdown
BEFORE running vision-clarifier worker:
  Check if `SYNTROP/artifacts/intake/prepared-braindump-used.md` exists
  OR check if `SYNTROP/orchestration-state.json` context_pointers.brain_dump is set:

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

## Phase 5 — Handler Changes

### Step 5.1 — Update `SYNTROP/handlers/USER-INPUT-HANDLER.md`

**File**: `SYNTROP/handlers/USER-INPUT-HANDLER.md`

**Read the file first.**

---

**Change 5.1.A — Insert Chat State Banners section**

Find the line:
```markdown
## When This Handler Is Invoked
```
Immediately AFTER this section heading (and its content describing the 3 invocation scenarios), insert a new section. Place it BEFORE `## Question Formatting Protocol`:

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
Display this banner ONLY after state is fully saved and next_action is set in
SYNTROP/orchestration-state.json. This is the ONLY signal the user receives that
it is safe to clear the chat. Never display this banner before state is confirmed saved.

+===========================================================+
|                                                           |
|                  SAFE TO CLEAR CHAT                       |
|                                                           |
|  Progress saved. Open a fresh chat when ready.            |
|  Send: /orchestrate                                       |
|                                                           |
+===========================================================+
```

---

**Change 5.1.B — Insert AskUserQuestion Requirement section**

After the `## Chat State Banners` section added above, and BEFORE `## Question Formatting Protocol`, insert:

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

---

**Change 5.1.C — Append DO NOT CLEAR banner to all 3 question format display examples**

For each of the three question type display format blocks (Type 1: Multiple Choice, Type 2: Free Text, Type 3: Approval), add the DO NOT CLEAR banner as the LAST line of the displayed text format example.

**Type 1 — Multiple Choice displayed text format**: Find the block ending with:
```
Reply with: A, B, or C
```
Add after it:
```

+===========================================================+
|                                                           |
|                  DO NOT CLEAR CHAT                        |
|                                                           |
|  Questions are pending. Reply in this chat.               |
|  State is NOT saved until you answer.                     |
|                                                           |
+===========================================================+
```

**Type 2 — Free Text displayed text format**: Find the block ending with:
```
Reply with your answer.
```
Add after it:
```

+===========================================================+
|                                                           |
|                  DO NOT CLEAR CHAT                        |
|                                                           |
|  Questions are pending. Reply in this chat.               |
|  State is NOT saved until you answer.                     |
|                                                           |
+===========================================================+
```

**Type 3 — Approval displayed text format**: Find the block ending with:
```
Reply with: A, B, or C
```
(the one inside the approval format, which differs from Type 1 by context) Add after it:
```

+===========================================================+
|                                                           |
|                  DO NOT CLEAR CHAT                        |
|                                                           |
|  Questions are pending. Reply in this chat.               |
|  State is NOT saved until you answer.                     |
|                                                           |
+===========================================================+
```

---

## Phase 6 — Schema Update

### Step 6.1 — Update `SYNTROP/orchestration-state.json`

**File**: `SYNTROP/orchestration-state.json`

Add `"project_type": null` immediately after the `"version": "1.0.0"` line.

**Find** (exact lines 2-3 of the file):
```json
{
  "version": "1.0.0",
  "project_id": null,
```
**Replace with**:
```json
{
  "version": "1.0.0",
  "project_type": null,
  "project_id": null,
```

**Valid values for `project_type`**:
- `null` — not yet set (user hasn't run /start)
- `"vision"` — user chose to build a software project
- `"system_design"` — user chose to build an AI orchestration system

---

## Phase 7 — Prompt File Modifications

### Step 7.1 — Update `SYNTROP/vision-prompt.md`

**File**: `SYNTROP/vision-prompt.md` (moved from `USER-START-HERE/vision-to-braindump.md`)

**Read the file first.** Do NOT change any existing content. Prepend the following section to the TOP of the file (before all existing content):

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

### Step 7.2 — Update `SYNTROP/system-design-prompt.md`

**File**: `SYNTROP/system-design-prompt.md` (moved from `USER-START-HERE/vision-to-orchestration-braindump.md`)

**Read the file first.** Do NOT change any existing content. Prepend the following section to the TOP of the file (before all existing content):

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

## Phase 8 — New Files

### Step 8.1 — Create `.claude/commands/start.md`

**File**: `.claude/commands/start.md` (new file)

**Note on AskUserQuestion research (from SYNTROP-VISION.md Section 9.1)**: The VISION asks to research whether AskUserQuestion is valid in `allowed-tools`. Based on existing Claude Code documentation, `AskUserQuestion` is a built-in Claude Code tool available in slash command contexts. Multiple sequential calls are supported. The "Other" option automatically adds a free-text input field when `AskUserQuestion` is used. The frontmatter field name is `allowed-tools` (hyphenated). Empty `argument-hint` is valid.

**Full file content**:

```markdown
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
```

---

### Step 8.2 — Create `USER-START-HERE/PLEASE_OPEN_ME.md`

**File**: `USER-START-HERE/PLEASE_OPEN_ME.md` (new file)

**Full file content**:

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

## Phase 9 — Deletions

### Step 9.1 — Skip: USER-START-HERE/README.md does not exist

**⚠️ DISCREPANCY**: SYNTROP-VISION.md Section 10 Step 14 says to delete `USER-START-HERE/README.md`. This file does not exist in the workspace. The directory only contains the two vision files (already moved in Phase 1). No action needed.

---

## Phase 10 — Full Rewrites

### Step 10.1 — Rewrite `README.md`

**File**: `README.md` (workspace root)

**Read the current file first, then replace its entire content with the following:**

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

## Phase 11 — Audit

### Step 11.1 — Grep for remaining root-level path references

Run these searches after completing all phases. Any match indicates a missed update.

```bash
# Check for unpreFixed orchestration file references in .claude/commands/
grep -r "orchestration-state\.json" .claude/commands/ | grep -v "SYNTROP/"
grep -r "CEO-ORCHESTRATOR\.md" .claude/commands/ | grep -v "SYNTROP/"
grep -r "context-summary\.md" .claude/commands/ | grep -v "SYNTROP/"
grep -r "file-index\.json" .claude/commands/ | grep -v "SYNTROP/"

# Check for /orchestrate continue anywhere in the workspace
grep -r "orchestrate continue" SYNTROP/ .claude/ CLAUDE.md README.md

# Check for bare init-workspace.sh references (not prefixed with SYNTROP/)
grep -r "bash init-workspace\.sh" SYNTROP/CEO-ORCHESTRATOR.md | grep -v "SYNTROP/init"

# Check for unpreFixed director/worker/handler paths in CEO
grep "Read directors/" SYNTROP/CEO-ORCHESTRATOR.md
grep "Read workers/" SYNTROP/CEO-ORCHESTRATOR.md
grep "Read handlers/" SYNTROP/CEO-ORCHESTRATOR.md

# Verify no orchestration files remain at workspace root
ls *.json *.sh *.md | grep -v "CLAUDE.md\|README.md\|SYNTROP-VISION.md\|IMPLEMENTATION-PLAN.md"
```

### Step 11.2 — Verify SYNTROP/ directory completeness

```bash
ls SYNTROP/
# Expected files:
#   CEO-ORCHESTRATOR.md
#   context-summary.md
#   conversation.md
#   file-index.json
#   init-workspace.sh
#   orchestration-state.json
#   progress-log.md
#   system-design-prompt.md
#   TROUBLESHOOTING.md
#   USER-GUIDE.md
#   vision-prompt.md
#
# Expected subdirectories:
#   directors/  workers/  handlers/

ls SYNTROP/directors/
# Expected: ARCHITECTURE-DIRECTOR.md, EXECUTION-DIRECTOR.md, INTAKE-DIRECTOR.md,
#           QUALITY-DIRECTOR.md, RESEARCH-DIRECTOR.md

ls SYNTROP/handlers/
# Expected: CONTEXT-MONITOR.md, ERROR-RECOVERY.md, STATE-VALIDATOR.md, USER-INPUT-HANDLER.md
```

### Step 11.3 — Verify new files exist

```bash
ls .claude/commands/
# Expected: orchestrate.md, start.md

ls USER-START-HERE/
# Expected: PLEASE_OPEN_ME.md only (vision files moved to SYNTROP/)
```

---

## Verification Checklist

Derived from SYNTROP-VISION.md Section 8. Verify ALL items after implementation.

### File Structure
- [ ] `.claude/commands/` contains `orchestrate.md` AND `start.md`
- [ ] `SYNTROP/` contains all 9 moved standalone files plus `vision-prompt.md` and `system-design-prompt.md`
- [ ] `SYNTROP/directors/` contains exactly 5 director files
- [ ] `SYNTROP/workers/` contains all 23 worker files
- [ ] `SYNTROP/handlers/` contains 4 handler files
- [ ] `USER-START-HERE/` contains exactly 1 file: `PLEASE_OPEN_ME.md`
- [ ] No orchestration files remain at workspace root (only `.claude/`, `SYNTROP/`, `USER-START-HERE/`, `README.md`, `CLAUDE.md`, and pre-existing extras like `SYNTROP-VISION.md`)

### /start Command
- [ ] Running `/start` in a fresh chat with uninitialized state immediately triggers AskUserQuestion popup — no typed input needed
- [ ] Every structured question appears as AskUserQuestion popup (not chat prose)
- [ ] After brain dump is submitted, SAFE TO CLEAR banner appears as final output
- [ ] `SYNTROP/orchestration-state.json` has `project_type` set to `"vision"` or `"system_design"` after /start completes
- [ ] `SYNTROP/artifacts/intake/prepared-braindump.md` exists with structured content after /start completes
- [ ] Running `/start` when `phase != "uninitialized"` stops immediately with a message pointing to `/orchestrate` and `/orchestrate reset`

### /orchestrate Command
- [ ] Bare `/orchestrate` with an active project (phase != uninitialized) continues from last saved position
- [ ] Bare `/orchestrate` after `/start` completes runs NEW PROJECT PROTOCOL using prepared-braindump.md
- [ ] Bare `/orchestrate` with no prepared brain dump and uninitialized state shows helpful message pointing to `/start`
- [ ] Session context and guidance rules display at start of every `/orchestrate` invocation
- [ ] DO NOT CLEAR banner appears below every question set
- [ ] SAFE TO CLEAR banner appears after every phase/sprint save point
- [ ] No instance of `/orchestrate continue` remains in any file in the workspace

### Documentation
- [ ] `README.md` renders on GitHub with clear marketing copy and a visually distinct bordered instruction box (the `<table>` element)
- [ ] `USER-START-HERE/PLEASE_OPEN_ME.md` uses zero technical jargon and clearly describes the two commands (`/start` and `/orchestrate`)

### Known Gaps (require follow-up after initial implementation)
- [ ] Artifact paths inside director files (`artifacts/`, `errors/`, `deployment/`) — after moving to `SYNTROP/directors/`, these paths will be interpreted relative to workspace root, which may not match where SYNTROP/init-workspace.sh creates them. Test a live `/orchestrate` run and update director paths if file-not-found errors occur.
- [ ] Same issue applies to all 23 worker files — test and update paths as needed.
- [ ] `SYNTROP/init-workspace.sh` writes `"file_index": "file-index.json"` in the state it creates — verify CEO can resolve this path correctly after Phase 3 changes are applied.

---

*End of IMPLEMENTATION-PLAN.md*
