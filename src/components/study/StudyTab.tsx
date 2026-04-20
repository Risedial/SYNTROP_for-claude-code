import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { useSession } from '../../hooks/useSession';
import type { Question } from '../../types/content';
import { QuestionCard } from './QuestionCard';
import { SessionSummary } from './SessionSummary';

export function StudyTab() {
  const currentSession = useStore(s => s.currentSession);
  const { startSession, getCurrentQuestion } = useSession();

  // activeQuestion is managed here so QuestionCard is never re-keyed mid-explanation.
  // We only advance to the next question when QuestionCard explicitly signals done.
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [questionKey, setQuestionKey] = useState(0);

  // Start a session on first mount if none exists
  useEffect(() => {
    if (!currentSession) {
      startSession();
    }
  }, []);

  // Load the first question whenever a new session begins (sessionId changes)
  useEffect(() => {
    if (currentSession && !currentSession.isComplete) {
      const q = getCurrentQuestion();
      setActiveQuestion(q);
      setQuestionKey(k => k + 1);
    }
  }, [currentSession?.sessionId]);

  // Called by QuestionCard after nextQuestion() has already been invoked
  function handleQuestionDone() {
    const next = getCurrentQuestion();
    setActiveQuestion(next);
    setQuestionKey(k => k + 1);
  }

  // No session yet — startSession() in flight
  if (!currentSession) {
    return (
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        color: 'var(--color-text-muted)',
        fontSize: '0.9375rem',
      }}>
        Starting session…
      </div>
    );
  }

  // Session complete — show summary
  if (currentSession.isComplete) {
    return (
      <div style={{ padding: '20px' }}>
        <SessionSummary />
      </div>
    );
  }

  // Waiting for activeQuestion to be set
  if (!activeQuestion) {
    return (
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        color: 'var(--color-text-muted)',
        fontSize: '0.9375rem',
      }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <QuestionCard
        key={questionKey}
        question={activeQuestion}
        onDone={handleQuestionDone}
      />
    </div>
  );
}
