import { useStore } from '../store/useStore';
import { buildSessionQueue } from '../lib/sessionBuilder';
import { applyAnswer, isFastTap } from '../lib/algorithm';
import { seedFromSessionId } from '../lib/prng';
import { questions } from '../data/questions';
import type { Question } from '../types/content';
import type { SessionRecord } from '../types/session';

export function useSession() {
  function startSession(): void {
    const { sessionCount, questions: questionRecords, setCurrentSession } =
      useStore.getState();
    const sessionId = crypto.randomUUID();
    const sessionNumber = sessionCount + 1;
    const queue = buildSessionQueue(questionRecords, sessionNumber, sessionId);
    const session: SessionRecord = {
      sessionId,
      sessionNumber,
      startedAt: new Date().toISOString(),
      seed: seedFromSessionId(sessionId),
      queue,
      currentIndex: 0,
      questionDisplayTime: null,
      fastTapPending: [],
      isComplete: false,
    };
    setCurrentSession(session);
  }

  function markQuestionDisplayed(): void {
    const { currentSession, setCurrentSession } = useStore.getState();
    if (!currentSession) return;
    setCurrentSession({ ...currentSession, questionDisplayTime: Date.now() });
  }

  function recordAnswer(correct: boolean, answerTime: number): void {
    const { currentSession, questions: questionRecords, updateQuestion, setCurrentSession } =
      useStore.getState();
    if (!currentSession || currentSession.isComplete) return;

    const currentId = currentSession.queue[currentSession.currentIndex];
    if (!currentId) return;

    const displayTime = currentSession.questionDisplayTime ?? answerTime;
    const fastTap = isFastTap(displayTime, answerTime);

    let updatedFastTapPending = currentSession.fastTapPending;

    if (fastTap) {
      updatedFastTapPending = [...currentSession.fastTapPending, currentId];
    } else {
      const record = questionRecords[currentId];
      if (record) {
        const updated = applyAnswer(record, correct, currentSession.sessionId, false);
        // Track lastMaintenanceSession for mastered/maintenance questions (session tracker responsibility)
        if (record.state === 'mastered' || record.state === 'maintenance') {
          updated.lastMaintenanceSession = currentSession.sessionNumber;
        }
        updateQuestion(currentId, updated);
      }
    }

    setCurrentSession({
      ...currentSession,
      currentIndex: currentSession.currentIndex + 1,
      questionDisplayTime: null,
      fastTapPending: updatedFastTapPending,
    });
  }

  function nextQuestion(): void {
    const { currentSession, setCurrentSession, incrementSessionCount } =
      useStore.getState();
    if (!currentSession) return;

    if (currentSession.currentIndex >= currentSession.queue.length) {
      if (currentSession.fastTapPending.length > 0) {
        // Flush fast-tap pending to end of queue
        setCurrentSession({
          ...currentSession,
          queue: [...currentSession.queue, ...currentSession.fastTapPending],
          fastTapPending: [],
        });
      } else {
        // Session complete
        setCurrentSession({ ...currentSession, isComplete: true });
        incrementSessionCount();
      }
    }
  }

  function getCurrentQuestion(): Question | null {
    const { currentSession } = useStore.getState();
    if (!currentSession || currentSession.isComplete) return null;
    const id = currentSession.queue[currentSession.currentIndex];
    if (!id) return null;
    return questions.find((q) => q.id === id) ?? null;
  }

  function endSession(): void {
    const { setCurrentSession, markDirty } = useStore.getState();
    setCurrentSession(null);
    markDirty();
  }

  return {
    startSession,
    markQuestionDisplayed,
    recordAnswer,
    nextQuestion,
    getCurrentQuestion,
    endSession,
  };
}
