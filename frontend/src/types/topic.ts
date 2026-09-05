export type Question = {
  id: string;
  topicId: string;
  type: string;
  difficulty: string;
  prompt: string;
  createdAt: string;
};

export type Topic = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  _count?: {
    questions: number;
  };
  questions?: Question[];
};
