# Technical Explainer

> **Source of Truth:** `metadata/system-facts.json`
> **Audience:** Developers evaluating {{PRODUCT_NAME}} for adoption or contribution. Assumes comfort with AI tools, CLIs, and software architecture concepts.

---

## What {{PRODUCT_NAME}} Actually Is

{{PRODUCT_NAME}} is a hierarchical prompt-based orchestration framework implemented as 33 markdown skill files. It runs inside Claude Code (Anthropic's CLI) and extends it with a structured multi-session project pipeline.

It is **not**:
- A SaaS product or hosted service
- A standalone application
- A model-agnostic agent framework
- A compiled tool with a binary

It **is**:
- A structured set of markdown files that Claude Code reads as skill instructions
- A state machine architecture that enables multi-session continuity
- A hierarchical delegation chain (CEO → Director → Worker)
- A 5-phase project pipeline from brain dump to deployment-ready output

---

## The State Machine: Core Technical Innovation

The fundamental problem {{PRODUCT_NAME}} solves is **context window death**: Claude Code is excellent within a session, but real projects span multiple sessions. Without structure, every session starts from zero.

### The mechanism

Every session follows this cycle:

```
Session Start
    │
    ▼
Read orchestration-state.json
    │
    ├── What phase am I in?
    ├── What step within this phase?
    ├── What decisions have been made?
    ├── What files have been created?
    └── What is the next action?
    │
    ▼
Execute next action(s)
    │
    ▼
Update orchestration-state.json
    │
    ▼
Session End (clean stopping point)
```

### What the state file records

```json
{
  "project": {
    "name": "...",
    "description": "...",
    "ssot_path": "..."
  },
  "current_phase": "execution",
  "current_step": "sprint_2",
  "phases_completed": ["intake", "research", "architecture"],
  "decisions": [
    {
      "phase": "research",
      "decision": "Use PostgreSQL for persistence",
      "rationale": "Selected over SQLite for production readiness; over MongoDB to avoid document-model complexity for this schema",
      "timestamp": "..."
    }
  ],
  "file_index": {
    "ssot": "project/ssot.md",
    "architecture_blueprint": "project/blueprint.md",
    "sprint_plan": "project/sprints.md",
    "source_root": "project/src/"
  },
  "next_action": "Execute sprint_3: implement authentication middleware"
}
```

This schema is human-readable. Any developer can open the file and understand the full project state.

---

## The Skill File Architecture

### Why skill files instead of code?

Skill files are markdown documents with structured sections that Claude Code interprets as instructions. This design choice has specific implications:

1. **Readable and modifiable by anyone** — No compilation, no build step. Change a worker file, the behavior changes immediately.
2. **Observable** — When something behaves unexpectedly, you read the relevant skill file to understand why.
3. **Composable** — Adding a new capability means adding a new worker file and registering it with the appropriate Director.
4. **Debuggable** — Each file has a narrow scope. When phase execution fails, you know which file to examine.

### The delegation chain

```
/orchestrate command
        │
        ▼
CEO-ORCHESTRATOR.md
  Reads state → determines current phase → routes to appropriate Director
        │
        ├──► intake-director.md (Phase 1)
        │         └── vision-clarifier.md
        │         └── requirements-extractor.md
        │         └── ssot-generator.md
        │
        ├──► research-director.md (Phase 2)
        │         └── approach-researcher.md
        │         └── decision-matrix-builder.md
        │         └── recommendation-generator.md
        │
        ├──► architecture-director.md (Phase 3)
        │         └── blueprint-architect.md
        │         └── dependency-mapper.md
        │         └── sprint-planner.md
        │
        ├──► execution-director.md (Phase 4)
        │         └── environment-setup.md
        │         └── step-executor.md
        │         └── sprint-validator.md
        │         └── integration-tester.md
        │
        └──► quality-director.md (Phase 5)
                  └── vision-verifier.md
                  └── quality-checker.md
                  └── doc-generator.md
                  └── deployment-packager.md

Cross-cutting Handlers (invoked as needed):
  ├── user-input-handler.md
  ├── error-recovery-handler.md
  ├── state-validation-handler.md
  └── context-monitor-handler.md
```

**Total: 1 CEO + 5 Directors + 23 Workers + 4 Handlers = 33 skill files**

---

## The 5 Phases: Inputs, Processes, Outputs

### Phase 1: Intake

**Input:** Raw brain dump — messy, contradictory, incomplete ideas acceptable.

**What happens:**
1. `vision-clarifier` generates targeted clarifying questions
2. User answers
3. `requirements-extractor` identifies functional requirements, constraints, and success criteria
4. `ssot-generator` produces the Single Source of Truth document
5. User reviews and approves SSOT

**Output:** Approved SSOT document — structured requirements spec, accepted by user.

**State transition:** Phase 1 complete. `decisions[]` updated with SSOT approval. `file_index.ssot` set.

---

### Phase 2: Research

**Input:** Approved SSOT.

**What happens:**
1. `approach-researcher` investigates 3-5 implementation approaches
2. `decision-matrix-builder` scores each approach against project requirements
3. `recommendation-generator` synthesizes recommendation with rationale
4. User reviews options and selects approach

**Output:** Selected technical approach, documented in decisions log with rationale.

**State transition:** Phase 2 complete. Selected approach recorded in state.

---

### Phase 3: Architecture

**Input:** Approved SSOT + selected approach.

**What happens:**
1. `blueprint-architect` creates full technical blueprint (system components, interfaces, data models)
2. `dependency-mapper` identifies all dependencies and integration points
3. `sprint-planner` generates sprint-based implementation plan with scope and acceptance criteria per sprint
4. User reviews blueprint + sprint plan and approves

**Output:** Approved technical blueprint and sprint plan.

**State transition:** Phase 3 complete. `file_index.architecture_blueprint` and `file_index.sprint_plan` set.

---

### Phase 4: Execution

**Input:** Approved blueprint + sprint plan.

**What happens (per sprint):**
1. `environment-setup` configures the development environment for the sprint
2. `step-executor` implements sprint scope
3. `sprint-validator` verifies implementation against sprint acceptance criteria
4. `integration-tester` runs integration tests (at defined checkpoints)
5. State updated: sprint marked complete, next sprint ready

**Session behavior:** Each session executes one sprint or major task block. State records completion and next action. `/orchestrate continue` begins the next sprint.

**Output:** Functional software, sprint by sprint.

**State transition:** Per-sprint updates. Full phase complete when all sprints are validated.

---

### Phase 5: Quality

**Input:** Functional software from execution.

**What happens:**
1. `vision-verifier` compares final output against original SSOT
2. `quality-checker` runs quality verification (code review, test coverage, performance basics)
3. `doc-generator` creates project documentation (README, API docs, architecture notes)
4. `deployment-packager` finalizes configuration and deployment scripts
5. User performs final review

**Output:** Deployment-ready project — source code + tests + documentation + configuration + deployment scripts.

---

## Error Handling and Recovery

The four handler systems operate as cross-cutting concerns that any Director or Worker can invoke:

**User Input Handler:** When instructions are ambiguous or missing required context, this handler generates targeted clarifying questions rather than guessing or halting.

**Error Recovery Handler:** When execution fails (file write error, test failure, unexpected state), this handler:
1. Records the error in state
2. Attempts automated recovery based on error type
3. If recovery fails, produces a clear description of the failure and recommended intervention
4. Updates state to reflect current valid state before the error

**State Validation Handler:** Before every session, validates:
- State file is syntactically valid JSON
- All referenced files in `file_index` exist
- Current phase/step are valid states
- No circular dependencies in decision log

If validation fails, the handler reports the specific corruption and provides recovery options.

**Context Monitor Handler:** Monitors available context window during session execution. When context approaches a threshold, signals the current worker to complete the current unit of work and write updated state before the session ends naturally.

---

## Key Design Properties

### Stateless Execution

Each session is stateless at the conversational level — Claude does not use previous conversation history. All project context comes from file reads at session start. This is intentional:

- No dependency on conversation history persistence (which varies across Claude clients)
- Any session can be run on any Claude Code instance with access to the project files
- Session failures don't corrupt accumulated context

### Clean Stopping Points

The system is designed to stop between phases and between sprints, not mid-task. Workers are instructed to reach a defined stopping point before writing state. This means:

- State reflects completed work, not work-in-progress
- Re-running after an interruption doesn't produce duplicate work
- Session length is flexible — run one sprint or three, state handles it correctly

### Observable State

All project decisions, phase transitions, and file creation events are written to the state file with timestamps and rationale. This creates:

- An audit trail of the project build
- Debugging information when something goes wrong
- A human-readable project history that serves as documentation

---

## Extension Points

{{PRODUCT_NAME}} is designed to be extended. The primary extension mechanisms:

**Adding a worker:** Create a new markdown skill file with the worker instruction format. Register it with the appropriate Director by updating the Director's skill file to invoke the new worker when relevant.

**Adding a phase:** Create a new Director skill file. Update CEO-ORCHESTRATOR.md to route to the new Director in the appropriate sequence. Update state schema to include the new phase.

**Modifying phase behavior:** Edit the Director or Worker skill files directly. The behavior changes immediately — no rebuild required.

**Custom state fields:** The state schema is extensible JSON. Workers can write custom fields that other workers in the same phase can read. Document custom fields in the relevant skill file.

---

## Requirements Summary

| Requirement | Details |
|---|---|
| Runtime | Claude Code CLI (Anthropic) |
| Model | Any Claude model available in Claude Code |
| Subscription | Claude Pro or Max (required by Claude Code) |
| OS | Any OS supported by Claude Code |
| Setup | `/orchestrate` on first run, `init-workspace.sh` auto-executes |
| File access | Read/write access to project directory |
| Additional infrastructure | None |
| Additional API keys | None |
