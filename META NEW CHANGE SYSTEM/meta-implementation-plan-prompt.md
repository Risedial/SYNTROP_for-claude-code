Read the file @SYNTROP-VISION.md in the workspace root. It is a complete, standalone specification — no other context is needed.

Your task is to create a detailed implementation plan for the full SYNTROP system redesign described in that document.

Save the plan to a new file at the workspace root: `IMPLEMENTATION-PLAN.md`

The plan must cover every change described in SYNTROP-VISION.md Sections 3–4 and follow the implementation sequence from Section 10. For each step in the sequence, include:

1. **What**: The exact action (create file, move file, edit file, delete file)
2. **Where**: Full file paths (source and destination where applicable)
3. **How**: Specific content changes — exact strings to find and replace, exact sections to add, exact fields to update. Be precise enough that another Claude Code session can execute each step without re-reading SYNTROP-VISION.md.
4. **Risk**: Any dependency or ordering constraint (e.g., "must happen before step X")

Before writing the plan, complete the research tasks from Section 9 of SYNTROP-VISION.md:
- Read `.claude/commands/orchestrate.md` to understand the current file structure and exact strings that need updating
- Read `CEO-ORCHESTRATOR.md` to identify all current path references and banner formats
- Read `init-workspace.sh` to check whether it uses self-anchored paths or hardcoded root-relative paths
- Read `SYNTROP/orchestration-state.json` (if it exists at the new path) or `orchestration-state.json` (root) to confirm current schema
- Read all 5 director files to identify every `command_hint` value and every stop-point that needs a SAFE TO CLEAR banner
- Read `handlers/USER-INPUT-HANDLER.md` to understand its current structure before adding the new sections
- Read `CLAUDE.md` to understand what currently needs updating

Use the research findings to make the plan concrete and executable. Flag any discrepancies between what SYNTROP-VISION.md specifies and what the files currently contain.

Group the plan into these phases:
- **Phase 1 — File moves** (git mv operations)
- **Phase 2 — Path reference updates** (orchestrate.md, CLAUDE.md)
- **Phase 3 — CEO-ORCHESTRATOR.md changes**
- **Phase 4 — Director file changes** (all 5)
- **Phase 5 — Handler changes** (USER-INPUT-HANDLER.md)
- **Phase 6 — Schema update** (orchestration-state.json)
- **Phase 7 — Prompt file modifications** (vision-prompt.md, system-design-prompt.md)
- **Phase 8 — New files** (start.md command, PLEASE_OPEN_ME.md)
- **Phase 9 — Deletions** (USER-START-HERE/README.md)
- **Phase 10 — Full rewrites** (root README.md)
- **Phase 11 — Audit** (grep for missed path references)

End the plan with a verification checklist derived from Section 8 of SYNTROP-VISION.md.
