
interface ExplanationPanelProps {
  explanation: string;
  isCorrect: boolean;
  isFastTap: boolean;
  onNext: () => void;
}

export function ExplanationPanel({ explanation, isCorrect, isFastTap, onNext }: ExplanationPanelProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
      {/* Result badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        alignSelf: 'flex-start',
        padding: '6px 14px',
        borderRadius: '20px',
        background: isCorrect ? 'var(--color-state-correct-bg)' : 'var(--color-state-incorrect-bg)',
        border: `1px solid ${isCorrect ? 'var(--color-state-correct)' : 'var(--color-state-incorrect)'}`,
        color: isCorrect ? 'var(--color-state-correct)' : 'var(--color-state-incorrect)',
        fontWeight: 600,
        fontSize: '0.875rem',
      }}>
        <span>{isCorrect ? '✓' : '✗'}</span>
        <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
      </div>

      {/* Fast-tap warning */}
      {isFastTap && (
        <div style={{
          padding: '10px 14px',
          borderRadius: '8px',
          background: 'rgba(245, 166, 35, 0.1)',
          border: '1px solid rgba(245, 166, 35, 0.35)',
          color: '#F5A623',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}>
          ⚡ Answered too quickly — this question will repeat at the end of your session to confirm your knowledge.
        </div>
      )}

      {/* Explanation text */}
      <div style={{
        padding: '14px 16px',
        borderRadius: '10px',
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)',
        fontSize: '0.9375rem',
        lineHeight: '1.65',
      }}>
        {explanation}
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        style={{
          padding: '14px 24px',
          borderRadius: '10px',
          background: 'var(--gradient-mode-1)',
          border: 'none',
          color: '#fff',
          fontFamily: 'inherit',
          fontSize: '0.9375rem',
          fontWeight: 600,
          cursor: 'pointer',
          minHeight: '44px',
          transition: 'opacity 0.15s',
        }}
      >
        Next Question
      </button>
    </div>
  );
}
