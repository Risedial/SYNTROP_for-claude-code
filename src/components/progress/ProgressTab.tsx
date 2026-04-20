import React from 'react';
import { useStore } from '../../store/useStore';
import {
  computeTopicStats,
  computeEstimatedScore,
  isReadyToTest,
} from '../../lib/analytics';
import { ScoreDisplay } from './ScoreDisplay';
import { TopicGrid } from './TopicGrid';
import { WeakTopics } from './WeakTopics';

export function ProgressTab() {
  const questions = useStore((s) => s.questions);
  const topicStats = computeTopicStats(questions);
  const score = computeEstimatedScore(topicStats);
  const ready = isReadyToTest(topicStats, score);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '8px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Progress</h2>
      <ScoreDisplay estimatedScore={score} isReadyToTest={ready} />
      <div>
        <div style={sectionLabelStyle}>Topics</div>
        <TopicGrid topicStats={topicStats} />
      </div>
      <WeakTopics topicStats={topicStats} />
    </div>
  );
}
