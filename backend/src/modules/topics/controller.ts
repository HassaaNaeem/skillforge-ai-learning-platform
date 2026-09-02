import type { Request, Response } from 'express';
import { getTopic, getTopics } from "./service.js"

export async function getTopicsController(req: Request, res: Response){
    const topics = await getTopics()
    return res.status(200).json({topics})
}

export async function getTopicController(req: Request, res: Response){
    const {id} = req.params as {id: string}
    if(!id) return res.status(400).json({error: 'Topic ID is required'})
    const topic = await getTopic(id)
    if(!topic) return res.status(404).json({error: 'Topic not found'})
    return res.status(200).json({data: topic})
}