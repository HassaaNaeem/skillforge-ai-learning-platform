import api from '../../lib/api';
import type { Topic } from '../../types/topic';


export async function fetchTopics(): Promise<Topic[]> {
  const response = await api.get('/topics');
  return response.data.topics;
}

export async function getTopic(id: string): Promise<Topic> {
  const response = await api.get(`/topics/${id}`);
  return response.data.data;
}