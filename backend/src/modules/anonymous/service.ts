import { randomUUID } from "node:crypto"
import { client } from "../../config/redis.js"
import type { AnonymousSession } from "./types.js"
import type { CreateAnonymousSessionInput } from './schema.js';
import { AppError } from "../../utils/AppError.js";

export async function createSession(input: CreateAnonymousSessionInput): Promise<AnonymousSession> {
    const {topicId, mode, difficulty} = input
    const sessionId = randomUUID()
    const session = {
        id: sessionId,
        topicId,
        mode,
        difficulty,
        answers:[],
        createdAt: new Date().toISOString(),
    }
    const key = `anon:session:${sessionId}`
    await client.set(key, JSON.stringify(session), 'EX', 60 * 45)
    return session
}

export async function getSession(sessionId: string): Promise<AnonymousSession | null>{
    const key = `anon:session:${sessionId}`
    const raw = await client.get(key)
    if(!raw) return null
    return JSON.parse(raw) as AnonymousSession
}

export async function addAnswer(sessionId: string, questionId: string, response: string): Promise<AnonymousSession> {
    const session = await getSession(sessionId)
    if(!session) throw new AppError(404, "Session not found")
    const existingAnswer = session.answers.find(answer => answer.questionId === questionId)
    if(existingAnswer) throw new AppError(400, "Question already answered")
    session.answers.push({
        questionId,
        response,
    })
    const key = `anon:session:${sessionId}`
    await client.set(key, JSON.stringify(session), 'EX', 60 * 45)
    return session
}