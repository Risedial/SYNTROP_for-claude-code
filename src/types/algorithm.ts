export type QuestionState =
  | 'new'
  | 'active'
  | 'near_mastery'
  | 'mastered'
  | 'maintenance';

export interface ExposureRecord {
  sessionId: string;
  correct: boolean;
  isFastTap: boolean;
}

export interface QuestionRecord {
  id: string;
  state: QuestionState;

  // Streak tracking (deliberate answers only; fast-tap answers do not count)
  consecutiveCorrect: number;

  // Session IDs in which the question was answered correctly at least once
  // Used for "2+ distinct sessions" requirement for Mastered threshold
  correctSessionIds: string[];

  // Last 5 deliberate exposures (not fast-tap); oldest first
  // Used for reversal check (correct followed by incorrect in last 5)
  recentExposures: ExposureRecord[];

  // Timestamps and scheduling
  masteredAt: string | null;           // ISO-8601 timestamp when state reached 'mastered'
  lastMaintenanceSession: number | null; // session number of most recent maintenance appearance

  // Stats (informational only, not used in algorithm)
  totalAttempts: number;
  totalCorrect: number;
  firstSeenSession: number | null;
}
