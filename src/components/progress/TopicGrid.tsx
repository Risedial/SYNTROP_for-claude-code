import React from 'react';
import type { TopicStat } from '../../lib/analytics';

const SHORT_NAMES: Record<string, string> = {
  'CPR Level C': 'CPR',
  'AED': 'AED',
  'Airway Management': 'Airway',
  'Wound Care and Bleeding': 'Wounds',
  'Burns': 'Burns',
  'Bone, Joint, and Muscle Injuries': 'Injuries',
  'Shock': 'Shock',
  'Medical Emergencies': 'Medical',
  'Environmental Emergencies': 'Environ.',
  'Poisoning and Overdose': 'Poisoning',
  'Scene Safety and Assessment': 'Scene Safety',
};

interface TopicGridProps {
  topicStats: TopicStat[];
}

function getCellColors(pct: number): { bg: string; border: string; color: string } {
  if (pct < 50) {
    return { bg: 'rgba(229, 67, 67, 0.12)', border: '#E54343', color: '#E54343' };
  }
  if (pct <= 80) {
    return { bg: 'rgba(245, 166, 35, 0.12)', border: '#F5A623', color: '#F5A623' };
  }
  return { bg: 'rgba(45, 181, 93, 0.12)', border: '#2DB55D', color: '#2DB55D' };
}

export function TopicGrid({ topicStats }: TopicGridProps) {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  };

  return (
    <div style={gridStyle}>
      {topicStats.map((stat) => {
        const pct = Math.round(stat.masteryPercent);
        const colors = getCellColors(stat.masteryPercent);

        const cellStyle: React.CSSProperties = {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 6px',
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          textAlign: 'center',
          gap: '4px',
        };

        const nameStyle: React.CSSProperties = {
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          lineHeight: 1.2,
        };

        const pctStyle: React.CSSProperties = {
          fontSize: '1rem',
          fontWeight: 700,
          color: colors.color,
          lineHeight: 1,
        };

        return (
          <div key={stat.topic} style={cellStyle}>
            <span style={nameStyle}>{SHORT_NAMES[stat.topic] ?? stat.topic}</span>
            <span style={pctStyle}>{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}
