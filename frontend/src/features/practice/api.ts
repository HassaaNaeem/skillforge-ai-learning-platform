import api from "../../lib/api";

export async function createPracticeSession(topicId: string, mode: 'practice' | 'exam', difficulty: 'easy' | 'medium' | 'hard') {
    const response = await api.post("/practice/sessions", {topicId, mode, difficulty})
    return response.data.practiceSession
}

export async function createAnonymousSession(topicId: string, mode: 'practice' | 'exam', difficulty: 'easy' | 'medium' | 'hard'){
    const response = await api.post("/anonymous/sessions", {topicId, mode, difficulty})
    return response.data.session
}

export async function getPracticeSession(sessionId: string) {
  const response = await api.get(`/practice/sessions/${sessionId}`);
  return response.data.practiceSession;
}

export async function getAnonymousSession(sessionId: string) {
  const response = await api.get(`/anonymous/sessions/${sessionId}`);
  return response.data.session;
}

export async function submitPracticeAnswer(
  sessionId: string,
  questionId: string,
  response: string,
) {
  const result = await api.post(`/practice/sessions/${sessionId}/answers`, {
    questionId,
    response,
  });
  return result.data.answer;
}

export async function submitAnonymousAnswer(
  sessionId: string,
  questionId: string,
  response: string,
) {
  const result = await api.post(`/anonymous/sessions/${sessionId}/answers`, {
    questionId,
    response,
  });
  return result.data.session;
}