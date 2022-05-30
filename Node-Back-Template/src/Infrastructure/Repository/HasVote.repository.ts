import { QueryHandler } from "../Handlers/Query.handler"

import { HasVoteInterface } from "../../Interfaces/HasVote.interface"
import { Client } from "pg"
import { GetHasVote } from "../../Interfaces/Get/GetHasVote.interface"
import { PostHasVote } from "../../Interfaces/Post/PostHasVote.interface"
import { PutHasVote } from "../../Interfaces/Put/HasVote.interface"

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
            SELECT * FROM has_vote WHERE id = $1
        `

        const values = [
            hasVoteId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(hasVote: PostHasVote): Promise<string> {
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
          hasVote.feedback_id,
          hasVote.student_id,
          hasVote.is_upvote,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(hasVote: PutHasVote, hasVoteId: string): Promise<void> {
        const SQL = `
            UPDATE has_vote
            SET feedback_id = $1,
                student_id = $2,
                is_upvote = $3
            WHERE id = $4
        `
        const values = [
          hasVote.feedback_id,
          hasVote.student_id,
          hasVote.is_upvote,
          hasVoteId,
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(hasVoteId: string): Promise<void> {
        const SQL = `
            DELETE FROM has_vote
            WHERE id = $1
        `
        const values = [
          hasVoteId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}