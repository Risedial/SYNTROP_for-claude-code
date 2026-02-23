# Troubleshooting Guide

## Common Issues and Solutions

---

### Issue: "No project found" when running `/orchestrate continue`

**Cause:** The `orchestration-state.json` file doesn't exist or is in the initial `uninitialized` state.

**Solution:**
1. Check that `orchestration-state.json` exists in the workspace root
2. If missing, run `bash init-workspace.sh` to create it
3. Start a new project with `/orchestrate [your idea]`

---

### Issue: Chat doesn't seem to know what happened before

**Cause:** This is expected behavior. Each fresh chat starts with zero history and reads state from files.

**Solution:**
1. Verify `orchestration-state.json` has the correct `phase` and `step`
2. Check `context-summary.md` reflects recent progress
3. Send `/orchestrate continue` and the system will read state and resume

---

### Issue: System is stuck on "awaiting_user_input" but I already answered

**Cause:** The response wasn't saved to state, possibly due to an interrupted chat.

**Solution:**
1. Open `orchestration-state.json`
2. Check `user_input.pending` - if true, the system is still waiting
3. Send your answer again in a new chat
4. If the original answer was saved (check `artifacts/{phase}/user-response-*.json`), manually set `user_input.pending` to false and `status` to "in_progress"

---

### Issue: `orchestration-state.json` appears corrupted

**Symptoms:** JSON parse errors, missing fields, or inconsistent values.

**Solution:**
1. Check if a backup exists: `orchestration-state.backup.json`
2. If so, copy it over: `cp orchestration-state.backup.json orchestration-state.json`
3. If no backup, the STATE-VALIDATOR handler will attempt repair on next `/orchestrate continue`
4. As a last resort, reconstruct state manually:
   - Check `progress-log.md` for the last known good state
   - Check which artifacts exist in `artifacts/` to determine completed phases
   - Set the state to the last completed step

**Manual state reconstruction:**
```json
{
  "phase": "execution",
  "step": "sprint-execution",
  "status": "in_progress",
  "current_director": "EXECUTION-DIRECTOR",
  "current_worker": "step-executor",
  "completed_phases": ["intake", "research", "architecture"]
}
```
Fill in the fields you know and let the STATE-VALIDATOR fix the rest.

---

### Issue: System reports "blocked_error"

**Cause:** A worker encountered an error it couldn't auto-recover from.

**Solution:**
1. Send `/orchestrate continue` - the system will present recovery options
2. Options typically include: Retry, Skip, Roll Back, or Provide Guidance
3. Choose the appropriate option based on the error description
4. If the error persists, check the error file in `errors/` for details

---

### Issue: Execution phase seems to repeat the same tasks

**Cause:** Idempotency check may be failing, or state wasn't updated after task completion.

**Solution:**
1. Check `artifacts/execution/step-logs/` for task completion logs
2. Verify `execution_tracking` in `orchestration-state.json` shows correct position
3. If `current_task_in_sprint` is wrong, manually update it to the correct value
4. Check that task log files have `"status": "completed"` for finished tasks

---

### Issue: Context seems too large / system is slow

**Cause:** Too many files accumulated, context window approaching limits.

**Solution:**
1. The CONTEXT-MONITOR handler normally manages this automatically
2. If needed, manually archive completed phase artifacts:
   ```bash
   mkdir -p artifacts/archive
   mv artifacts/intake/*.json artifacts/archive/ # Keep SSOT
   mv artifacts/research/*.json artifacts/archive/ # Keep selected-approach
   ```
3. Keep essential files: SSOT, requirements.json, selected-approach.md, blueprint.md, implementation-plan.json
4. Regenerate `context-summary.md` with a concise summary

---

### Issue: Want to skip a phase or step

**Solution:**
Manually edit `orchestration-state.json`:
```json
{
  "phase": "desired-phase",
  "step": "desired-step",
  "status": "in_progress",
  "current_director": "DESIRED-DIRECTOR",
  "current_worker": "desired-worker"
}
```
Add the skipped phase to `completed_phases` if skipping an entire phase.

**Warning:** Skipping phases may cause issues if later phases depend on artifacts from skipped phases.

---

### Issue: Want to go back to a previous phase

**Solution:**
1. Edit `orchestration-state.json`:
   - Set `phase` to the desired phase
   - Set `step` to the first step of that phase
   - Set `current_director` and `current_worker` accordingly
   - Remove the phase from `completed_phases`
2. The system will re-execute from that point
3. Existing artifacts for the phase will be overwritten (idempotency)

---

### Issue: init-workspace.sh fails

**Solution:**
1. Ensure you have bash available: `which bash`
2. Ensure you have write permissions in the workspace
3. Run with verbose output: `bash -x init-workspace.sh`
4. Manually create directories if needed:
   ```bash
   mkdir -p directors workers handlers
   mkdir -p artifacts/{intake,research,architecture,execution,quality}
   mkdir -p errors deployment
   ```

---

### Issue: System asks the same questions repeatedly

**Cause:** User responses aren't being saved to artifacts or state isn't advancing.

**Solution:**
1. Check `artifacts/{phase}/user-response-*.json` files exist
2. Check `orchestration-state.json` → `user_input.responses_received` has the response path
3. Check `step` has advanced past the question-asking step
4. If stuck, manually advance the step:
   - Find the next step in the relevant director's Step Registry
   - Update `step` and `current_worker` in state

---

## State File Reference

### Key Fields to Check

| Field | Expected Values | When to Check |
|-------|----------------|---------------|
| `phase` | uninitialized, intake, research, architecture, execution, quality, complete | Always |
| `step` | Step name from current director's registry | When system seems lost |
| `status` | pending, in_progress, awaiting_user_input, awaiting_approval, blocked_error, completed | When nothing happens |
| `user_input.pending` | true/false | When answers seem ignored |
| `error_state.has_error` | true/false | When system reports errors |
| `execution_tracking.current_sprint` | 1-N | During execution phase |
| `execution_tracking.current_task_in_sprint` | 1-N | During execution phase |

### Valid Phase-Director Mappings

| Phase | Director |
|-------|----------|
| intake | INTAKE-DIRECTOR |
| research | RESEARCH-DIRECTOR |
| architecture | ARCHITECTURE-DIRECTOR |
| execution | EXECUTION-DIRECTOR |
| quality | QUALITY-DIRECTOR |
| complete | (none) |

---

## Getting Help

If you encounter an issue not covered here:
1. Check `/orchestrate status` for current system state
2. Read `context-summary.md` for a human-readable overview
3. Check `errors/` directory for detailed error logs
4. Review the relevant director's `.md` file for step-by-step flow
5. As a last resort, `/orchestrate reset` and start fresh
