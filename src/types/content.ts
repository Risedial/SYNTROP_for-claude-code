export type QuestionType = 'multiple-choice' | 'true-false';

export interface Question {
  id: string;
  topic: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Skill {
  id: string;
  skillName: string;
  category: string;
  objective: string;
  steps: string[];
  commonErrors: string[];
  evaluationCriteria: string[];
}
