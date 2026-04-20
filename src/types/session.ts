export interface SessionRecord {
  sessionId: string;         // crypto.randomUUID()
  sessionNumber: number;     // 1-indexed, increments per session
  startedAt: string;         // ISO-8601
  seed: number;              // numeric seed for mulberry32 (derived from sessionId hash)

  // Ordered queue of question IDs for this session
  queue: string[];
  currentIndex: number;

  // Timing for fast-tap detection
  questionDisplayTime: number | null;  // Date.now() when current question was shown

  // Questions fast-tapped in this session awaiting repeat
  fastTapPending: string[];

  // Whether session is complete
  isComplete: boolean;
}
