#!/bin/bash
# ==============================================================================
# ORCHESTRATION WORKSPACE INITIALIZER
# ==============================================================================
# Creates the complete directory structure and initializes state files for
# the orchestration system. This script is idempotent - safe to run multiple
# times without corrupting existing data.
#
# Usage:
#   bash init-workspace.sh              # Initialize new workspace
#   bash init-workspace.sh --reset      # Reset workspace (clears all artifacts)
# ==============================================================================

set -euo pipefail

WORKSPACE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$WORKSPACE_DIR"

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ==============================================================================
# RESET MODE
# ==============================================================================
if [[ "${1:-}" == "--reset" ]]; then
    echo -e "${YELLOW}Resetting workspace...${NC}"

    # Remove runtime artifacts but preserve skill files
    rm -rf artifacts errors deployment progress-log.md

    # Reset state files to initial values
    cat > orchestration-state.json << 'STATEEOF'
{
  "version": "1.0.0",
  "project_id": null,
  "project_name": null,
  "created_at": null,
  "updated_at": null,
  "phase": "uninitialized",
  "step": null,
  "status": "pending",
  "current_director": null,
  "current_worker": null,
  "completed_phases": [],
  "completed_steps": [],
  "user_input": {
    "pending": false,
    "type": null,
    "questions_file": null,
    "context_message": null,
    "responses_received": []
  },
  "active_decisions": {},
  "error_state": {
    "has_error": false,
    "error_file": null,
    "recovery_attempted": false,
    "recovery_options_presented": false
  },
  "progress": {
    "percentage": 0,
    "phases_total": 5,
    "phases_completed": 0,
    "current_phase_steps_total": 0,
    "current_phase_steps_completed": 0
  },
  "context_pointers": {
    "brain_dump": null,
    "ssot": null,
    "requirements": null,
    "selected_approach": null,
    "blueprint": null,
    "implementation_plan": null,
    "file_index": "file-index.json"
  },
  "execution_tracking": {
    "total_implementation_steps": 0,
    "completed_implementation_steps": 0,
    "current_sprint": 0,
    "total_sprints": 0,
    "current_task_in_sprint": 0,
    "total_tasks_in_current_sprint": 0
  },
  "vision_anchors": [],
  "next_action": {
    "description": "Send /orchestrate followed by your project idea to begin",
    "command_hint": "/orchestrate [your idea]",
    "expected_director": "INTAKE-DIRECTOR",
    "expected_worker": "vision-clarifier"
  }
}
STATEEOF

    # Reset file index
    cat > file-index.json << 'INDEXEOF'
{
  "version": "1.0.0",
  "updated_at": null,
  "files": {},
  "by_phase": {
    "intake": [],
    "research": [],
    "architecture": [],
    "execution": [],
    "quality": []
  }
}
INDEXEOF

    # Reset context summary
    cat > context-summary.md << 'CTXEOF'
# Context Summary

**Project:** Not yet initialized
**Phase:** Uninitialized
**Step:** None
**Status:** Awaiting project initialization

## Key Decisions
None yet.

## Last Action
Workspace reset.

## Next Action
Send `/orchestrate [your idea]` to begin a new project.
CTXEOF

    echo -e "${GREEN}Workspace reset complete.${NC}"
    exit 0
fi

# ==============================================================================
# INITIALIZATION MODE
# ==============================================================================
echo -e "${GREEN}Initializing orchestration workspace...${NC}"

# --- Create Directory Structure ---
echo "Creating directory structure..."

# Skill directories (only if they don't already exist with content)
mkdir -p directors
mkdir -p workers
mkdir -p handlers

# Runtime artifact directories
mkdir -p artifacts/intake
mkdir -p artifacts/research
mkdir -p artifacts/architecture
mkdir -p artifacts/execution
mkdir -p artifacts/quality

# Support directories
mkdir -p errors
mkdir -p deployment

echo -e "  ${GREEN}+${NC} directories created"

# --- Initialize State File (only if it doesn't exist or is uninitialized) ---
if [ ! -f "orchestration-state.json" ]; then
    echo "Creating initial orchestration-state.json..."
    cat > orchestration-state.json << 'STATEEOF'
{
  "version": "1.0.0",
  "project_id": null,
  "project_name": null,
  "created_at": null,
  "updated_at": null,
  "phase": "uninitialized",
  "step": null,
  "status": "pending",
  "current_director": null,
  "current_worker": null,
  "completed_phases": [],
  "completed_steps": [],
  "user_input": {
    "pending": false,
    "type": null,
    "questions_file": null,
    "context_message": null,
    "responses_received": []
  },
  "active_decisions": {},
  "error_state": {
    "has_error": false,
    "error_file": null,
    "recovery_attempted": false,
    "recovery_options_presented": false
  },
  "progress": {
    "percentage": 0,
    "phases_total": 5,
    "phases_completed": 0,
    "current_phase_steps_total": 0,
    "current_phase_steps_completed": 0
  },
  "context_pointers": {
    "brain_dump": null,
    "ssot": null,
    "requirements": null,
    "selected_approach": null,
    "blueprint": null,
    "implementation_plan": null,
    "file_index": "file-index.json"
  },
  "execution_tracking": {
    "total_implementation_steps": 0,
    "completed_implementation_steps": 0,
    "current_sprint": 0,
    "total_sprints": 0,
    "current_task_in_sprint": 0,
    "total_tasks_in_current_sprint": 0
  },
  "vision_anchors": [],
  "next_action": {
    "description": "Send /orchestrate followed by your project idea to begin",
    "command_hint": "/orchestrate [your idea]",
    "expected_director": "INTAKE-DIRECTOR",
    "expected_worker": "vision-clarifier"
  }
}
STATEEOF
    echo -e "  ${GREEN}+${NC} orchestration-state.json created"
else
    echo -e "  ${YELLOW}~${NC} orchestration-state.json already exists (preserved)"
fi

# --- Initialize File Index (only if it doesn't exist) ---
if [ ! -f "file-index.json" ]; then
    echo "Creating initial file-index.json..."
    cat > file-index.json << 'INDEXEOF'
{
  "version": "1.0.0",
  "updated_at": null,
  "files": {},
  "by_phase": {
    "intake": [],
    "research": [],
    "architecture": [],
    "execution": [],
    "quality": []
  }
}
INDEXEOF
    echo -e "  ${GREEN}+${NC} file-index.json created"
else
    echo -e "  ${YELLOW}~${NC} file-index.json already exists (preserved)"
fi

# --- Initialize Context Summary (only if it doesn't exist) ---
if [ ! -f "context-summary.md" ]; then
    echo "Creating initial context-summary.md..."
    cat > context-summary.md << 'CTXEOF'
# Context Summary

**Project:** Not yet initialized
**Phase:** Uninitialized
**Step:** None
**Status:** Awaiting project initialization

## Key Decisions
None yet.

## Last Action
Workspace initialized.

## Next Action
Send `/orchestrate [your idea]` to begin a new project.
CTXEOF
    echo -e "  ${GREEN}+${NC} context-summary.md created"
else
    echo -e "  ${YELLOW}~${NC} context-summary.md already exists (preserved)"
fi

# --- Initialize Progress Log (only if it doesn't exist) ---
if [ ! -f "progress-log.md" ]; then
    echo "Creating initial progress-log.md..."
    cat > progress-log.md << 'LOGEOF'
# Project Progress Log

**Status:** Initialized
**Started:** Pending

## Phases
- Intake (0%)
- Research (0%)
- Architecture (0%)
- Execution (0%)
- Quality (0%)
LOGEOF
    echo -e "  ${GREEN}+${NC} progress-log.md created"
else
    echo -e "  ${YELLOW}~${NC} progress-log.md already exists (preserved)"
fi

# --- Verify Structure ---
echo ""
echo "Verifying workspace structure..."

REQUIRED_DIRS=(
    "directors"
    "workers"
    "handlers"
    "artifacts/intake"
    "artifacts/research"
    "artifacts/architecture"
    "artifacts/execution"
    "artifacts/quality"
    "errors"
    "deployment"
)

REQUIRED_FILES=(
    "orchestration-state.json"
    "file-index.json"
    "context-summary.md"
    "progress-log.md"
)

ALL_OK=true

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "  ${GREEN}ok${NC} $dir/"
    else
        echo -e "  ${RED}MISSING${NC} $dir/"
        ALL_OK=false
    fi
done

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}ok${NC} $file"
    else
        echo -e "  ${RED}MISSING${NC} $file"
        ALL_OK=false
    fi
done

echo ""
if [ "$ALL_OK" = true ]; then
    echo -e "${GREEN}Workspace initialized successfully.${NC}"
    echo ""
    echo "Next step: Send '/orchestrate [your idea]' in a fresh Claude Code chat."
else
    echo -e "${RED}Workspace initialization had issues. Check errors above.${NC}"
    exit 1
fi
