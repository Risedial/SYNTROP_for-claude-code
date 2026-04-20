import type { QuestionRecord } from '../types/algorithm';
import { questions, TOPICS } from '../data/questions';

export interface TopicStat {
  topic: string;
  count: number;
  masteredCount: number;
  nearMasteryCount: number;
  masteryPercent: number;
}

export function computeTopicStats(
  questionRecords: Record<string, QuestionRecord>
): TopicStat[] {
  return TOPICS.map((topic) => {
    const topicQuestions = questions.filter((q) => q.topic === topic);
    const count = topicQuestions.length;
    const masteredCount = topicQuestions.filter(
      (q) =>
        questionRecords[q.id]?.state === 'mastered' ||
        questionRecords[q.id]?.state === 'maintenance'
    ).length;
    const nearMasteryCount = topicQuestions.filter(
      (q) => questionRecords[q.id]?.state === 'near_mastery'
    ).length;
    const masteryPercent =
      count === 0
        ? 0
        : ((masteredCount + nearMasteryCount * 0.5) / count) * 100;
    return { topic, count, masteredCount, nearMasteryCount, masteryPercent };
  });
}

export function computeEstimatedScore(topicStats: TopicStat[]): number {
  const totalQuestions = topicStats.reduce((sum, t) => sum + t.count, 0);
  if (totalQuestions === 0) return 0;
  const weightedSum = topicStats.reduce(
    (sum, t) => sum + t.masteryPercent * t.count,
    0
  );
  return weightedSum / totalQuestions;
}

export function isReadyToTest(topicStats: TopicStat[], score: number): boolean {
  return score >= 80 && topicStats.every((t) => t.masteryPercent >= 75);
}
