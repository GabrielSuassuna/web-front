import { QueryHandler } from "../Handlers/Query.handler"

import { ProfessorNotificationInterface } from "../../Interfaces/ProfessorNotification.interface"
import { Client } from "pg"
import { GetProfessorNotification } from "../../Interfaces/Get/GetProfessorNotification.interface"
import { PostProfessorNotification } from "../../Interfaces/Post/PostProfessorNotification.interface"
import { PutProfessorNotification } from "../../Interfaces/Put/PutProfessorNotification.interface"

export class ProfessorNotificationRepository {
    queryHandler: QueryHandler<GetProfessorNotification>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<ProfessorNotificationInterface[]>{
        const SQL = `
            SELECT * FROM professor_notification
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getAllByProfessorId(professorId: string): Promise<GetProfessorNotification[]>{
        const SQL = `
            SELECT * FROM professor_notification WHERE professor_id = $1
        `

        const values = [
            professorId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)
    }

    public async getById(professorNotificationId: string): Promise<GetProfessorNotification[]>{
        const SQL = `
            SELECT * FROM professor_notification WHERE id = $1
        `

        const values = [
            professorNotificationId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(professorNotification: PostProfessorNotification, professorId: string): Promise<string> {
        const newId = await this.queryHandler.getSequence("professor_notification")
        
        const SQL = `
            INSERT INTO professor_notification(
                id,
                professor_id,
                message
            )
            VALUES (
                $1,
                $2,
                $3
            )
        `
        const values = [
          newId,
          professorId,
          professorNotification.message,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(professorNotification: PutProfessorNotification, professorNotificationId: string, professorId: string): Promise<void> {
        const SQL = `
            UPDATE professor_notification
            SET is_upvote = $1
            WHERE id = $2
                AND professor_id = $3
        `
        const values = [
          professorNotification.message,
          professorNotificationId,
          professorId,
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(professorNotificationId: string): Promise<void> {
        const SQL = `
            DELETE FROM professor_notification
            WHERE id = $1
        `
        const values = [
          professorNotificationId,
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}