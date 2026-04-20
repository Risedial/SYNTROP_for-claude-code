import React from 'react';
import type { Skill } from '../../types/content';

interface SkillCardProps {
  skill: Skill;
  isExpanded: boolean;
  onToggle: () => void;
}

export function SkillCard({ skill, isExpanded, onToggle }: SkillCardProps) {
  const cardStyle: React.CSSProperties = {
    background: 'var(--color-bg-elevated)',
    border: `1px solid ${isExpanded ? 'var(--color-accent-purple)' : 'var(--color-border)'}`,
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'border-color 0.2s',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    cursor: 'pointer',
    minHeight: '44px',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    color: 'var(--color-text-primary)',
    fontFamily: 'inherit',
  };

  const categoryBadgeStyle: React.CSSProperties = {
    fontSize: '0.6875rem',
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: '99px',
    background: 'rgba(124, 106, 232, 0.18)',
    color: 'var(--color-accent-purple)',
    flexShrink: 0,
    letterSpacing: '0.02em',
  };

  const chevronStyle: React.CSSProperties = {
    flexShrink: 0,
    marginLeft: '8px',
    color: 'var(--color-text-muted)',
    transition: 'transform 0.25s',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    fontSize: '0.75rem',
  };

  const bodyStyle: React.CSSProperties = {
    maxHeight: isExpanded ? '2000px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.35s ease',
  };

  const dividerStyle: React.CSSProperties = {
    borderTop: '1px solid var(--color-divider)',
  };

  const bodyInnerStyle: React.CSSProperties = {
    padding: '0 16px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '6px',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--color-text-primary)',
    lineHeight: '1.5',
    margin: 0,
  };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  };

  return (
    <div style={cardStyle}>
      <button style={headerStyle} onClick={onToggle} aria-expanded={isExpanded}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
          <span style={{ fontWeight: 600, fontSize: '0.9375rem', flex: 1 }}>
            {skill.skillName}
          </span>
          <span style={categoryBadgeStyle}>{skill.category}</span>
        </div>
        <span style={chevronStyle}>▼</span>
      </button>

      <div style={bodyStyle}>
        <div style={dividerStyle} />
        <div style={bodyInnerStyle}>
          <div>
            <div style={sectionLabelStyle}>Objective</div>
            <p style={textStyle}>{skill.objective}</p>
          </div>

          <div>
            <div style={sectionLabelStyle}>Steps</div>
            <ol style={listStyle}>
              {skill.steps.map((step, i) => (
                <li key={i} style={textStyle}>{step}</li>
              ))}
            </ol>
          </div>

          <div>
            <div style={sectionLabelStyle}>Common Errors</div>
            <ul style={listStyle}>
              {skill.commonErrors.map((err, i) => (
                <li
                  key={i}
                  style={{ ...textStyle, color: 'var(--color-state-incorrect)' }}
                >
                  • {err}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={sectionLabelStyle}>Evaluation Criteria</div>
            <ul style={listStyle}>
              {skill.evaluationCriteria.map((crit, i) => (
                <li
                  key={i}
                  style={{ ...textStyle, color: 'var(--color-state-correct)' }}
                >
                  ✓ {crit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
