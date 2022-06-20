import { QueryHandler } from "../Handlers/Query.handler"

import { HasVoteInterface } from "../../Interfaces/HasVote.interface"
import { Client } from "pg"
import { GetHasVote } from "../../Interfaces/Get/GetHasVote.interface"
import { PostHasVote } from "../../Interfaces/Post/PostHasVote.interface"
import { PutHasVote } from "../../Interfaces/Put/PutHasVote.interface"

export class HasVoteRepository {
    queryHandler: QueryHandler<GetHasVote>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<HasVoteInterface[]>{
        const SQL = `
            SELECT * FROM has_vote
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(hasVoteId: string): Promise<GetHasVote[]>{
        const SQL = `
            SELECT * FROM has_vote 
            WHERE id = $1
        `

        const values = [
            hasVoteId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async getByFeedbackAndStudent(feedbackId: string, studentId: string): Promise<GetHasVote[]>{
        const SQL = `
            SELECT * FROM has_vote 
            WHERE feedback_id = $1
                AND student_id = $2
        `

        const values = [
            feedbackId,
            studentId,
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(hasVote: PostHasVote, feedbackId: string, studentId: string): Promise<string> {
        const newId = await this.queryHandler.getSequence("has_vote")
        
        const SQL = `
            INSERT INTO has_vote(
                id,
                feedback_id,
                student_id,
                is_upvote
            )
            VALUES (
                $1,
                $2,
                $3,
                $4
            )
        `
        const values = [
          newId,
          feedbackId,
          studentId,
          hasVote.isUpvote,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(hasVote: PutHasVote, feedbackId: string, studentId: string): Promise<GetHasVote[]> {
        const SQL = `
            UPDATE has_vote
            SET is_upvote = $1
            WHERE feedback_id = $2
                AND student_id = $3
            RETURNING *
        `
        const values = [
          hasVote.isUpvote,
          feedbackId,
          studentId,
        ]

        console.log(values)
        
        return await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(feedbackId: string, studentId: string): Promise<void> {
        const SQL = `
            DELETE FROM has_vote
            WHERE feedback_id = $1
                AND student_id = $2
        `
        const values = [
            feedbackId,
            studentId,
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

    public async deleteByFeedbackId(feedbackId: string): Promise<void> {
        const SQL = `
            DELETE FROM has_vote
            WHERE feedback_id = $1
        `
        const values = [
            feedbackId,
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}