export const EVALUATE_QUEUE = 'evaluate-answer';

export type EvaluateAnswerJob = {
  kind: 'auth' | 'anon';
  sessionId: string;
  questionId: string;
};
