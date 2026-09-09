export type AnonymousAnswer = {
  questionId: string;
  response: string;
  feedback?: string;
  score?: number;
  isCorrect?: boolean;
};

export type AnonymousSession = {
  id: string;
  topicId: string;
  mode: string;
  difficulty: string;
  answers: AnonymousAnswer[];
  createdAt: string;
};
