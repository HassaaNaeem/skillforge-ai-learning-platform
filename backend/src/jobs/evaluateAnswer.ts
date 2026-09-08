export const queueName = "evaluate-answer"

export type EvaluateAnswerJob = {
    kind: "auth" | "anon"
    sessionId: string
    questionId: string
}