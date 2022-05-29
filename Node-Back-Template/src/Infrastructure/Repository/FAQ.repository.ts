import { QueryHandler } from "../Handlers/Query.handler"

import { FAQInterface } from '../../Interfaces/FAQ.interface'
import { Client } from "pg"
import { GetFAQ } from "../../Interfaces/Get/GetFAQ.interface"
import { PostFAQ } from "../../Interfaces/Post/PostFAQ.interface"
import { PutFAQ } from "../../Interfaces/Put/FAQ.interface"

export class FAQRepository {
    queryHandler: QueryHandler<GetFAQ>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<FAQInterface[]>{
        const SQL = `
            SELECT * FROM faq
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(faqId: string): Promise<GetFAQ[]>{
        const SQL = `
            SELECT * FROM faq WHERE id = $1
        `

        const values = [
            faqId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(faq: PostFAQ): Promise<string> {
        const newId = await this.queryHandler.getSequence("faq")
        
        const SQL = `
            INSERT INTO faq(
                id,
                question,
                answer,
            )
            VALUES (
                $1,
                $2,
                $3
            )
        `
        const values = [
            newId,
            faq.question,
            faq.answer,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(faq: PutFAQ, faqId: string): Promise<void> {
        const SQL = `
            UPDATE faq
            SET question = $1,
                answer = $2
            WHERE id = $3
        `
        const values = [
            faq.question,
            faq.answer,
            faqId
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(faqId: string): Promise<void> {
        const SQL = `
            DELETE FROM faq
            WHERE id = $1
        `
        const values = [
          faqId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}