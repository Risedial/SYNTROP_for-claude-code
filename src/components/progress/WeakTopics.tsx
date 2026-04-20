import React from 'react';
import type { TopicStat } from '../../lib/analytics';

interface WeakTopicsProps {
  topicStats: TopicStat[];
}

export function WeakTopics({ topicStats }: WeakTopicsProps) {
  const weak = [...topicStats]
    .sort((a, b) => a.masteryPercent - b.masteryPercent)
    .slice(0, 3);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
  };

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>Focus Areas</div>
      {weak.map((stat) => {
        const pct = Math.round(stat.masteryPercent);

        const rowStyle: React.CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
        };

        const nameStyle: React.CSSProperties = {
          fontSize: '0.875rem',
          color: 'var(--color-text-primary)',
        };

        const pctStyle: React.CSSProperties = {
          fontSize: '0.875rem',
          fontWeight: 600,
          color: pct < 50 ? 'var(--color-state-incorrect)' : '#F5A623',
        };

        return (
          <div key={stat.topic} style={rowStyle}>
            <span style={nameStyle}>{stat.topic}</span>
            <span style={pctStyle}>{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}
