import api from '../../lib/api';
import type { User } from '../../types/auth';

export async function uploadAvatar(file: File): Promise<User> {
  const form = new FormData();
  form.append('avatar', file);
  const response = await api.post('/users/me/avatar', form);
  return response.data.user;
}
