import { useEffect, useState } from 'react';
import type { Question } from '../../types/content';
import { useSession } from '../../hooks/useSession';
import { useStore } from '../../store/useStore';
import { AnswerOption } from './AnswerOption';
import { ExplanationPanel } from './ExplanationPanel';

interface QuestionCardProps {
  question: Question;
  onDone: () => void;
}

export function QuestionCard({ question, onDone }: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFastTap, setIsFastTap] = useState(false);
  const { markQuestionDisplayed, recordAnswer, nextQuestion } = useSession();

  // Record display time when question mounts
  useEffect(() => {
    markQuestionDisplayed();
  }, []);

  function handleSelect(index: number) {
    if (selectedIndex !== null) return;
    const answerTime = Date.now();

    // Read displayTime from store synchronously (no subscription needed)
    const { currentSession } = useStore.getState();
    const displayTime = currentSession?.questionDisplayTime ?? answerTime;
    const fast = answerTime - displayTime < 2000;

    setIsFastTap(fast);
    setSelectedIndex(index);
    recordAnswer(index === question.correctIndex, answerTime);
  }

  function handleNext() {
    nextQuestion();
    onDone();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Topic label */}
      <span style={{
        display: 'inline-block',
        alignSelf: 'flex-start',
        padding: '4px 12px',
        borderRadius: '20px',
        background: 'rgba(124, 106, 232, 0.12)',
        border: '1px solid rgba(124, 106, 232, 0.28)',
        color: 'var(--color-accent-purple)',
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        {question.topic}
      </span>

      {/* Question text */}
      <p style={{
        fontSize: '1.0625rem',
        fontWeight: 500,
        color: 'var(--color-text-primary)',
        lineHeight: '1.6',
        margin: 0,
      }}>
        {question.question}
      </p>

      {/* Answer options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {question.options.map((text, i) => (
          <AnswerOption
            key={i}
            text={text}
            index={i}
            selectedIndex={selectedIndex}
            correctIndex={question.correctIndex}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Explanation panel — shown after answer */}
      {selectedIndex !== null && (
        <ExplanationPanel
          explanation={question.explanation}
          isCorrect={selectedIndex === question.correctIndex}
          isFastTap={isFastTap}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
