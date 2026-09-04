import api from '../../lib/api';
import type { Topic } from '../../types/topic';


export async function fetchTopics(): Promise<Topic[]> {
  const response = await api.get('/topics');
  return response.data.topics;
}
