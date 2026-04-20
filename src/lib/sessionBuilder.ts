import type { QuestionRecord } from '../types/algorithm';
import { mulberry32, seedFromSessionId, seededShuffle } from './prng';
import { isMaintenanceDue } from './algorithm';

/**
 * Builds the ordered queue of question IDs for a study session.
 *
 * Tier classification:
 *   ACTIVE_NEW:      state = 'active' | 'new'
 *   NEAR_MASTERY:    state = 'near_mastery'
 *   MAINTENANCE_DUE: state = 'mastered' | 'maintenance' AND maintenance is due
 *
 * Assembly order:
 *   ACTIVE_NEW (shuffled) with NEAR_MASTERY interleaved 1:5,
 *   followed by MAINTENANCE_DUE (shuffled).
 *
 * fastTapPending questions are appended during the session by useSession — not here.
 */
export function buildSessionQueue(
  questionRecords: Record<string, QuestionRecord>,
  sessionNumber: number,
  sessionId: string
): string[] {
  const prng = mulberry32(seedFromSessionId(sessionId));

  const activeNew: string[] = [];
  const nearMastery: string[] = [];
  const maintenanceDue: string[] = [];

  for (const record of Object.values(questionRecords)) {
    if (record.state === 'active' || record.state === 'new') {
      activeNew.push(record.id);
    } else if (record.state === 'near_mastery') {
      nearMastery.push(record.id);
    } else if (isMaintenanceDue(record, sessionNumber)) {
      maintenanceDue.push(record.id);
    }
  }

  const shuffledActive = seededShuffle(activeNew, prng);
  const shuffledNearMastery = seededShuffle(nearMastery, prng);
  const shuffledMaintenance = seededShuffle(maintenanceDue, prng);

  // Interleave: insert one NEAR_MASTERY question every 5 ACTIVE questions
  const assembled: string[] = [];
  let nmIndex = 0;

  for (let i = 0; i < shuffledActive.length; i++) {
    assembled.push(shuffledActive[i]);
    if ((i + 1) % 5 === 0 && nmIndex < shuffledNearMastery.length) {
      assembled.push(shuffledNearMastery[nmIndex++]);
    }
  }

  // Append any remaining NEAR_MASTERY after ACTIVE is exhausted
  while (nmIndex < shuffledNearMastery.length) {
    assembled.push(shuffledNearMastery[nmIndex++]);
  }

  // MAINTENANCE_DUE at end
  assembled.push(...shuffledMaintenance);

  return assembled;
}
