# SYSTEM BUILDER PROMPT

## Context
You have been provided with a complete conversation detailing an agentic workflow methodology. the file name for the conversation is @conversation.md This conversation contains the full system architecture, philosophy, and implementation details for building complex projects through AI orchestration.

## Your Task
Analyze the provided conversation and **recreate this exact system with one critical architectural change**: every micro-modular step must execute in a **fresh Claude Code chat session** with zero conversation history.

## Core Architectural Principle
**Stateless Execution, Stateful Workspace**

Each fresh chat must:
- Read state files to understand current position
- Execute its designated step(s)
- Update state files with results
- Stop cleanly for next fresh chat
- Require ZERO conversation history to function

## Deliverables

Create the complete system with these components:

### 1. CEO-ORCHESTRATOR.md
The master controller that:
- Initializes workspace on first run
- Reads `orchestration-state.json` to determine current step
- Loads appropriate director skill
- Executes current step
- Updates state files
- Displays next command for user (if multi-step) OR requests user input OR signals completion
- **Critical**: Each fresh chat running CEO-ORCHESTRATOR must seamlessly continue from exact stopping point

### 2. Five Director Skills
Create complete skills for:
- `INTAKE-DIRECTOR.md` - Vision clarification and requirements
- `RESEARCH-DIRECTOR.md` - Approach analysis and selection
- `ARCHITECTURE-DIRECTOR.md` - Blueprint and implementation planning
- `EXECUTION-DIRECTOR.md` - Building and validation
- `QUALITY-DIRECTOR.md` - Verification and deployment prep

Each director must:
- Read state to understand context
- Execute its workflow steps
- Delegate to worker skills
- Update state with progress
- Work perfectly in fresh chat with zero history

### 3. 20+ Worker Skills
Create specialized worker skills (examples):
- `vision-clarifier.md`
- `requirements-extractor.md`
- `single-source-of-truth-generator.md`
- `approach-researcher.md`
- `pros-cons-analyzer.md`
- `decision-matrix-builder.md`
- `blueprint-architect.md`
- `dependency-mapper.md`
- `implementation-planner.md`
- `environment-setup.md`
- `step-executor.md`
- `validation-runner.md`
- `vision-verifier.md`
- `quality-checker.md`
- `documentation-generator.md`
- `deployment-preparer.md`
- [Create additional workers as needed based on conversation analysis]

### 4. Support Systems
- `USER-INPUT-HANDLER.md` - Formats questions, processes responses
- `ERROR-RECOVERY.md` - Handles failures and recovery
- `STATE-VALIDATOR.md` - Validates state file integrity
- `CONTEXT-MONITOR.md` - Manages file reading efficiency
- `init-workspace.sh` - Initializes directory structure

### 5. State Management System

Design `orchestration-state.json` schema that tracks:
- Current phase and step
- Completed phases and steps
- Active decisions made
- User input requirements
- Error states
- Progress percentage
- Next action to execute
- All context needed for fresh chat to continue

### 6. User Commands

Define the exact commands users send:

**Initial:** `/orchestrate [brain dump]`
**Continue:** `/orchestrate continue` (or just `/orchestrate` for auto-continue)
**Status:** `/orchestrate status` (shows current progress)
**Reset:** `/orchestrate reset` (starts over)

### 7. Fresh Chat Execution Flow

Document the exact flow:
```
Fresh Chat 1:
  User: /orchestrate [idea]
  Claude: Reads state (new project)
          Initializes workspace
          Runs INTAKE → vision-clarifier
          Generates questions
          Updates state: awaiting_user_input
          Displays questions
          [CHAT ENDS]

Fresh Chat 2:
  User: [Answers to questions]
  Claude: Reads state (in intake, has questions answered)
          Runs INTAKE → requirements-extractor
          Runs INTAKE → SSOT-generator
          Requests approval
          Updates state: awaiting_approval
          [CHAT ENDS]

Fresh Chat 3:
  User: Approved
  Claude: Reads state (intake complete, ready for research)
          Transitions to RESEARCH phase
          Runs research workflows
          Presents approach options
          Updates state: awaiting_approach_selection
          [CHAT ENDS]

[Continue pattern through all phases]
```

## Critical Requirements

1. **Zero Conversation History Dependency**
   - Every skill must be executable in isolation
   - All context comes from reading workspace files
   - No "as I mentioned earlier" or "based on our previous discussion"

2. **Idempotent Execution**
   - Running the same step twice produces same result
   - State updates are atomic
   - No corruption from repeated execution

3. **Comprehensive State Tracking**
   - State file contains ALL information needed
   - File index maps content to locations
   - Context summary provides quick orientation
   - Decision log tracks all choices made

4. **Self-Contained Prompts**
   - Each skill includes complete instructions
   - Specifies exactly what files to read
   - Defines precise output requirements
   - Updates state before stopping

5. **Graceful Interruption Handling**
   - Can stop at any point
   - Next fresh chat resumes perfectly
   - No progress lost
   - No duplicate work

6. **User Input Optimization**
   - Batch questions when possible
   - Multiple choice preferred
   - Clear context provided
   - Recommendations included

7. **Error Recovery**
   - Errors logged to files
   - Recovery options presented
   - State marked as blocked
   - Next chat addresses error first

## Quality Standards

Your recreated system must achieve:
- ✅ 100% success rate across fresh chats
- ✅ Zero ambiguity in state transitions
- ✅ Complete projects with 95%+ vision fidelity
- ✅ Minimal user interaction (5-10 inputs total)
- ✅ Production-ready deliverables
- ✅ Comprehensive documentation
- ✅ Deployment-ready packages

## Output Format

Provide:

1. **Complete file structure** with all skills as separate markdown documents
2. **orchestration-state.json schema** with detailed field explanations
3. **init-workspace.sh** script with full setup logic
4. **User guide** explaining how to use the system
5. **Example execution** showing a project from start to finish across multiple fresh chats
6. **Troubleshooting guide** for common issues

## Analysis Instructions

1. Read the entire provided conversation carefully
2. Extract the core methodology and principles
3. Identify all system components mentioned
4. Understand the hierarchical skill architecture
5. Note the state management approach
6. Recognize the user interaction patterns
7. Capture the quality assurance mechanisms
8. Comprehend the error handling philosophy

Then rebuild the system with fresh-chat architecture as the foundation.

## Success Criteria

The system is complete when:
- A user can send `/orchestrate [idea]` in a fresh chat
- Answer questions across multiple fresh chats
- Receive a fully built, tested, documented, deployment-ready project
- Without ever needing conversation history
- With 100% reliability and consistency

---

**Begin by analyzing the conversation, then create the complete system.**
