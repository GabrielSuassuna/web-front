import { QueryHandler } from "../Handlers/Query.handler"

import { TagInterface } from "../../Interfaces/Tag.interface"
import { Client } from "pg"
import { GetTag } from "../../Interfaces/Get/GetTag.interface"
import { PostTag } from "../../Interfaces/Post/PostTag.interface"
import { PutTag } from "../../Interfaces/Put/PutTag.interface"

export class TagRepository {
    queryHandler: QueryHandler<GetTag>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<TagInterface[]>{
        const SQL = `
            SELECT * FROM tag
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(tagId: string): Promise<GetTag[]>{
        const SQL = `
            SELECT * FROM tag WHERE id = $1
        `

        const values = [
            tagId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(tag: PostTag): Promise<string> {
        const newId = await this.queryHandler.getSequence("tag")
        
        const SQL = `
            INSERT INTO tag(
                id,
                name,
                description
            )
            VALUES (
                $1,
                $2,
                $3
            )
        `
        const values = [
            newId,
            tag.name,
            tag.description,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(tag: PutTag, tagId: string): Promise<GetTag[]> {
        const SQL = `
            UPDATE tag
            SET name = $1,
                description = $2
            WHERE id = $3
            RETURNING *
        `
        const values = [
            tag.name,
            tag.description,
            tagId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(tagId: string): Promise<void> {
        const SQL = `
            DELETE FROM tag
            WHERE id = $1
        `
        const values = [
          tagId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}