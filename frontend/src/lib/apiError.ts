import axios from 'axios';

export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong') {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === 'string' && message.length > 0) return message;
    return error.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
