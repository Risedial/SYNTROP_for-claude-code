import React from 'react';

interface ScoreDisplayProps {
  estimatedScore: number;
  isReadyToTest: boolean;
}

export function ScoreDisplay({ estimatedScore, isReadyToTest }: ScoreDisplayProps) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '24px 20px',
    background: 'var(--color-bg-elevated)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
  };

  const scoreRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2px',
  };

  const scoreStyle: React.CSSProperties = {
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 300,
    fontSize: '3.5rem',
    lineHeight: 1,
    color: 'var(--color-text-primary)',
    letterSpacing: '-0.02em',
  };

  const percentStyle: React.CSSProperties = {
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 300,
    fontSize: '1.5rem',
    color: 'var(--color-text-muted)',
  };

  const bannerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'var(--color-state-correct-bg)',
    border: '1px solid var(--color-state-correct)',
    borderRadius: '8px',
    color: 'var(--color-state-correct)',
    fontSize: '0.875rem',
    fontWeight: 600,
  };

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>Estimated Exam Score</span>
      <div style={scoreRowStyle}>
        <span style={scoreStyle}>{Math.round(estimatedScore)}</span>
        <span style={percentStyle}>%</span>
      </div>
      {isReadyToTest && (
        <div style={bannerStyle}>
          <span>✓</span>
          <span>Ready to Test</span>
        </div>
      )}
    </div>
  );
}
