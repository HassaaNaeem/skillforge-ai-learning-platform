export type Topic = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  _count?: {
    questions: number;
  };
};
