import React from 'react';
import { skills } from '../../data/skills';
import { useStore } from '../../store/useStore';
import { SkillCard } from './SkillCard';

export function SkillsTab() {
  const skillsExpandedId = useStore((s) => s.skillsExpandedId);
  const setSkillsExpanded = useStore((s) => s.setSkillsExpanded);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px 20px',
    maxWidth: 'var(--max-content-width)',
    margin: '0 auto',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    fontSize: '1.25rem',
    color: 'var(--color-text-primary)',
    margin: '0 0 4px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Skills Guide</h2>
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          isExpanded={skillsExpandedId === skill.id}
          onToggle={() =>
            setSkillsExpanded(skillsExpandedId === skill.id ? null : skill.id)
          }
        />
      ))}
    </div>
  );
}
