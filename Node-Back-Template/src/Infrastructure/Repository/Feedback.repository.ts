import { QueryHandler } from "../Handlers/Query.handler"

import { FeedbackInterface } from "../../Interfaces/Feedback.interface"
import { Client } from "pg"
import { GetFeedback } from "../../Interfaces/Get/GetFeedback.interface"
import { PostFeedback } from "../../Interfaces/Post/PostFeedback.interface"
import { PutFeedback } from "../../Interfaces/Put/Feedback.interface"

export class FeedbackRepository {
    queryHandler: QueryHandler<GetFeedback>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<FeedbackInterface[]>{
        const SQL = `
            SELECT * FROM feedback
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(feedbackId: string): Promise<GetFeedback[]>{
        const SQL = `
            SELECT * FROM feedback WHERE id = $1
        `

        const values = [
            feedbackId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(feedback: PostFeedback, lecturingId: string, studentId: string): Promise<string> {
        const newId = await this.queryHandler.getSequence("feedback")
        
        const SQL = `
            INSERT INTO feedback(
                id, 
                lecturing_id,  
                student_id,
                title,
                description,
                period,
                general_score,
                assiduity_score,
                clarity_score,
                relationship_score,
                date,
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11
            )
        `
        const values = [
          newId,
          lecturingId,  
          studentId,
          feedback.title,
          feedback.description,
          feedback.period,
          feedback.general_score,
          feedback.assiduity_score,
          feedback.clarity_score,
          feedback.relationship_score,
          feedback.date,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(feedback: PutFeedback, feedbackId: string, lecturingId: string, studentId: string): Promise<void> {
        const SQL = `
            UPDATE feedback
            SET title = $1,
                description = $2,
                period = $3,
                general_score = $4,
                assiduity_score = $5,
                clarity_score = $6,
                relationship_score = $7,
                date = $8,
            WHERE id = $9
              AND lecturing_id = $10
              AND student_id = $11
        `
        const values = [
          feedback.title,
          feedback.description,
          feedback.period,
          feedback.general_score,
          feedback.assiduity_score,
          feedback.clarity_score,
          feedback.relationship_score,
          feedback.date,
          feedbackId,
          lecturingId,
          studentId
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(feedbackId: string): Promise<void> {
        const SQL = `
            DELETE FROM feedback
            WHERE id = $1
        `
        const values = [
          feedbackId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}