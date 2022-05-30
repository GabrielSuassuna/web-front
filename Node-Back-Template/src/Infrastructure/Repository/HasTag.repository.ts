import { QueryHandler } from "../Handlers/Query.handler"

import { HasTagInterface } from "../../Interfaces/HasTag.interface"
import { Client } from "pg"
import { GetHasTag } from "../../Interfaces/Get/GetHasTag.interface"
import { PostHasTag } from "../../Interfaces/Post/PostHasTag.interface"
import { PutHasTag } from "../../Interfaces/Put/HasTag.interface"

export class HasTagRepository {
    queryHandler: QueryHandler<GetHasTag>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<HasTagInterface[]>{
        const SQL = `
            SELECT * FROM has_tag
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(hasTagId: string): Promise<GetHasTag[]>{
        const SQL = `
            SELECT * FROM has_tag WHERE id = $1
        `

        const values = [
            hasTagId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(hasTag: PostHasTag): Promise<string> {
        const newId = await this.queryHandler.getSequence("has_tag")
        
        const SQL = `
            INSERT INTO has_tag(
                id,
                feedback_id,
                tag_id,
            )
            VALUES (
                $1,
                $2,
                $3
            )
        `
        const values = [
          newId,
          hasTag.feedback_id,
          hasTag.tag_id,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(hasTag: PutHasTag, hasTagId: string): Promise<void> {
        const SQL = `
            UPDATE has_tag
            SET feedback_id = $1,
                tag_id = $2
            WHERE id = $3
        `
        const values = [
          hasTag.feedback_id,
          hasTag.tag_id,
          hasTagId,
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(hasTagId: string): Promise<void> {
        const SQL = `
            DELETE FROM has_tag
            WHERE id = $1
        `
        const values = [
          hasTagId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}