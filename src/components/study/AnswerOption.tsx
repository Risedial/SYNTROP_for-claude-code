import React from 'react';

interface AnswerOptionProps {
  text: string;
  index: number;
  selectedIndex: number | null;
  correctIndex: number;
  onSelect: (index: number) => void;
}

export function AnswerOption({ text, index, selectedIndex, correctIndex, onSelect }: AnswerOptionProps) {
  const isAnswered = selectedIndex !== null;
  const isSelected = selectedIndex === index;
  const isCorrectOption = index === correctIndex;

  const getButtonStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      width: '100%',
      minHeight: '44px',
      padding: '12px 16px',
      border: '1px solid var(--color-border)',
      borderRadius: '10px',
      background: 'var(--color-bg-elevated)',
      color: 'var(--color-text-primary)',
      cursor: isAnswered ? 'default' : 'pointer',
      textAlign: 'left',
      fontFamily: 'inherit',
      fontSize: '0.9375rem',
      lineHeight: '1.5',
      transition: 'background 0.15s, border-color 0.15s, opacity 0.15s',
    };

    if (!isAnswered) return base;

    // selected-correct
    if (isSelected && isCorrectOption) {
      return {
        ...base,
        background: 'var(--color-state-correct-bg)',
        borderColor: 'var(--color-state-correct)',
        color: 'var(--color-state-correct)',
      };
    }

    // selected-incorrect
    if (isSelected && !isCorrectOption) {
      return {
        ...base,
        background: 'var(--color-state-incorrect-bg)',
        borderColor: 'var(--color-state-incorrect)',
        color: 'var(--color-state-incorrect)',
      };
    }

    // revealed-correct (not selected, but is the correct answer)
    if (!isSelected && isCorrectOption) {
      return {
        ...base,
        background: 'var(--color-state-correct-bg)',
        borderColor: 'var(--color-state-correct)',
        color: 'var(--color-text-primary)',
        opacity: 0.9,
      };
    }

    // dimmed (not selected, not correct)
    return { ...base, opacity: 0.35 };
  };

  const letterStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1,
  };

  return (
    <button
      style={getButtonStyle()}
      onClick={() => !isAnswered && onSelect(index)}
      disabled={isAnswered}
      aria-pressed={isSelected}
    >
      <span style={letterStyle}>{String.fromCharCode(65 + index)}</span>
      <span>{text}</span>
    </button>
  );
}
