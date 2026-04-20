import type { QuestionRecord, ExposureRecord } from '../types/algorithm';

const FAST_TAP_MS = 2000;
const NEAR_MASTERY_THRESHOLD = 2;       // consecutive correct for near_mastery
const MASTERY_STREAK_THRESHOLD = 3;     // consecutive correct for mastered
const MASTERY_SESSION_THRESHOLD = 2;    // distinct correct sessions for mastered
const REVERSAL_WINDOW = 5;              // exposures to check for reversals
const MAINTENANCE_INTERVAL = 10;        // sessions between maintenance reviews

export function isFastTap(displayTime: number, answerTime: number): boolean {
  return (answerTime - displayTime) < FAST_TAP_MS;
}

export function hasReversalInWindow(exposures: ExposureRecord[]): boolean {
  // A reversal is a correct answer followed by an incorrect answer
  const window = exposures.slice(-REVERSAL_WINDOW);
  for (let i = 0; i < window.length - 1; i++) {
    if (window[i].correct && !window[i + 1].correct) return true;
  }
  return false;
}

export function applyAnswer(
  record: QuestionRecord,
  correct: boolean,
  sessionId: string,
  fastTap: boolean
): QuestionRecord {
  const next = { ...record };

  if (fastTap) {
    // Fast-tap: no state change, no streak update
    return next;
  }

  // Build exposure record
  const exposure: ExposureRecord = { sessionId, correct, isFastTap: false };
  const recentExposures = [...record.recentExposures, exposure].slice(-REVERSAL_WINDOW);

  next.totalAttempts += 1;
  if (correct) next.totalCorrect += 1;
  next.recentExposures = recentExposures;

  if (!correct) {
    // Deliberate miss: demotion
    if (record.state === 'new') {
      next.state = 'active';
    } else {
      // active, near_mastery, mastered, maintenance → active
      next.state = 'active';
    }
    next.consecutiveCorrect = 0;
    return next;
  }

  // Correct deliberate answer
  next.consecutiveCorrect = record.consecutiveCorrect + 1;

  // Track correct sessions
  if (!next.correctSessionIds.includes(sessionId)) {
    next.correctSessionIds = [...record.correctSessionIds, sessionId];
  }

  // State transitions
  switch (record.state) {
    case 'new':
      // new → active on first attempt
      next.state = 'active';
      break;

    case 'active':
      if (next.consecutiveCorrect >= NEAR_MASTERY_THRESHOLD) {
        next.state = 'near_mastery';
      }
      break;

    case 'near_mastery':
      if (
        next.consecutiveCorrect >= MASTERY_STREAK_THRESHOLD &&
        next.correctSessionIds.length >= MASTERY_SESSION_THRESHOLD &&
        !hasReversalInWindow(recentExposures)
      ) {
        next.state = 'mastered';
        next.masteredAt = new Date().toISOString();
        next.consecutiveCorrect = 0;
      }
      break;

    case 'mastered':
    case 'maintenance':
      // Correct maintenance answer → enter/stay in maintenance state
      next.state = 'maintenance';
      next.lastMaintenanceSession = record.lastMaintenanceSession; // updated by session tracker
      break;
  }

  return next;
}

export function isMaintenanceDue(
  record: QuestionRecord,
  currentSessionNumber: number
): boolean {
  if (record.state !== 'mastered' && record.state !== 'maintenance') return false;
  if (record.lastMaintenanceSession === null) return true;
  return (currentSessionNumber - record.lastMaintenanceSession) >= MAINTENANCE_INTERVAL;
}
