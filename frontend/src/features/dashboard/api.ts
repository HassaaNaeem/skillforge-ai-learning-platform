import api from '../../lib/api';

export type DashboardTopic = {
  id: string;
  name: string;
  slug: string;
};

export type DashboardSession = {
  id: string;
  topicId: string;
  topicName: string;
  difficulty: string;
  startedAt: string;
  answerCount: number;
  averageScore: number | null;
};

export type DashboardData = {
  summary: {
    sessionCount: number;
    answerCount: number;
    averageScore: number | null;
    passRate: number | null;
  };
  sessions: DashboardSession[];
  chart: { label: string; averageScore: number | null }[];
  focusTopics: DashboardTopic[];
};

export async function getDashboard(): Promise<DashboardData> {
  const response = await api.get('/dashboard');
  return response.data.dashboard;
}

export async function saveFocusQueue(topicIds: string[]): Promise<string[]> {
  const response = await api.patch('/users/me/focus', { topicIds });
  return response.data.topicIds;
}
