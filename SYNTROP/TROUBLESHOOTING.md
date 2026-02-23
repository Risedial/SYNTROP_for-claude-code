# Troubleshooting Guide

## Common Issues and Solutions

---

### Issue: "No project found" when running `/orchestrate`

**Cause:** The `SYNTROP/orchestration-state.json` file doesn't exist or is in the initial `uninitialized` state.

**Solution:**
1. Check that `SYNTROP/orchestration-state.json` exists in your workspace
2. If missing, run `bash SYNTROP/init-workspace.sh` to create it
3. Start a new project with `/start` or `/orchestrate [your idea]`

---

### Issue: Chat doesn't seem to know what happened before

**Cause:** This is expected behavior. Each fresh chat starts with zero history and reads state from files.

**Solution:**
1. Verify `SYNTROP/orchestration-state.json` has the correct `phase` and `step`
2. Check `SYNTROP/context-summary.md` reflects recent progress
3. Send `/orchestrate` and the system will read state and resume

---

### Issue: System is stuck on "awaiting_user_input" but I already answered

**Cause:** The response wasn't saved to state, possibly due to an interrupted chat.

**Solution:**
1. Open `SYNTROP/orchestration-state.json`
2. Check `user_input.pending` — if true, the system is still waiting
3. Send your answer again in a new chat
4. If the original answer was saved (check `artifacts/{phase}/user-response-*.json`), manually set `user_input.pending` to false and `status` to "in_progress"

---

### Issue: `SYNTROP/orchestration-state.json` appears corrupted

**Symptoms:** JSON parse errors, missing fields, or inconsistent values.

**Solution:**
1. Check if a backup exists: `SYNTROP/orchestration-state.backup.json`
2. If so, copy it over: `cp SYNTROP/orchestration-state.backup.json SYNTROP/orchestration-state.json`
3. If no backup, the STATE-VALIDATOR handler will attempt repair on next `/orchestrate`
4. As a last resort, reconstruct state manually:
   - Check `SYNTROP/progress-log.md` for the last known good state
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
1. Send `/orchestrate` — the system will present recovery options
2. Options typically include: Retry, Skip, Roll Back, or Provide Guidance
3. Choose the appropriate option based on the error description
4. If the error persists, check the error file in `errors/` for details

---

### Issue: System reports vision drift

**Cause:** The `vision-alignment-checker` detected significant drift between recent implementation work and your vision anchors (the non-negotiable requirements captured during Intake).

**Solution:**
1. Check `errors/vision-drift-{timestamp}.json` to see which anchors were affected
2. Send `/orchestrate` — the system will present alignment options
3. Options include: correct the drift, adjust the anchor definition, or force-continue with acknowledged drift

---

### Issue: Context limit reached mid-phase

**Cause:** The CONTEXT-MONITOR hit its RED or CRITICAL threshold.

**Solution:**
1. The system normally handles this automatically — it stops cleanly with a **SAFE TO CLEAR** banner
2. Open a fresh Claude Code chat and send `/orchestrate` — it resumes seamlessly from the last saved step
3. If the chat stopped without a clean banner, check `SYNTROP/context-summary.md` to identify the last completed step, then send `/orchestrate`

---

### Issue: Missing artifact error

**Cause:** A worker tried to read an artifact from a prior phase that was never generated.

**Solution:**
1. Check `SYNTROP/orchestration-state.json` → `context_pointers` to see which paths are expected
2. Verify the artifact exists at the listed path
3. If missing, roll back to the phase that should have generated it:
   - Edit `SYNTROP/orchestration-state.json` and set `phase` and `step` back to that phase
   - Remove that phase from `completed_phases`
4. Send `/orchestrate` — the system will regenerate the missing artifact

---

### Issue: Execution phase seems to repeat the same tasks

**Cause:** Idempotency check may be failing, or state wasn't updated after task completion.

**Solution:**
1. Check `artifacts/execution/step-logs/` for task completion logs
2. Verify `execution_tracking` in `SYNTROP/orchestration-state.json` shows the correct position
3. Check that task log files have `"status": "completed"` for finished tasks

---

### Issue: Context seems too large / system is slow

**Cause:** Too many files accumulated, context window approaching limits.

**Solution:**
1. The CONTEXT-MONITOR handler normally manages this automatically
2. If needed, manually archive completed phase artifacts:
   ```bash
   mkdir -p artifacts/archive
   mv artifacts/intake/*.json artifacts/archive/   # Keep SSOT
   mv artifacts/research/*.json artifacts/archive/ # Keep selected-approach
   ```
3. Keep essential files: SSOT, requirements.json, selected-approach.md, blueprint.md, implementation-plan.json
4. Regenerate `SYNTROP/context-summary.md` with a concise summary

---

### Issue: Want to skip a phase or step

**Solution:**
Manually edit `SYNTROP/orchestration-state.json`:
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
1. Edit `SYNTROP/orchestration-state.json`:
   - Set `phase` to the desired phase
   - Set `step` to the first step of that phase
   - Set `current_director` and `current_worker` accordingly
   - Remove the phase from `completed_phases`
2. The system will re-execute from that point
3. Existing artifacts for the phase will be overwritten (idempotency)

---

### Issue: `SYNTROP/init-workspace.sh` fails

**Solution:**
1. Ensure you have bash available: `which bash`
2. Ensure you have write permissions in the workspace
3. Run with verbose output: `bash -x SYNTROP/init-workspace.sh`

---

### Issue: System asks the same questions repeatedly

**Cause:** User responses aren't being saved to artifacts or state isn't advancing.

**Solution:**
1. Check `artifacts/{phase}/user-response-*.json` files exist
2. Check `SYNTROP/orchestration-state.json` → `user_input.responses_received` has the response path
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
| `project_type` | null, "vision", "system_design" | When Intake behaves unexpectedly |
| `step` | Step name from current director's registry | When system seems lost |
| `status` | pending, in_progress, awaiting_user_input, awaiting_approval, blocked_error, complete | When nothing happens |
| `user_input.pending` | true/false | When answers seem ignored |
| `error_state.has_error` | true/false | When system reports errors |

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
2. Read `SYNTROP/context-summary.md` for a human-readable overview
3. Check `errors/` directory for detailed error logs
4. Review the relevant director's file at `SYNTROP/directors/` for step-by-step flow
5. As a last resort, `/orchestrate reset` and start fresh
