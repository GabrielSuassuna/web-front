import { QueryHandler } from "../Handlers/Query.handler"

import { StudentNotificationInterface } from "../../Interfaces/StudentNotification.interface"
import { Client } from "pg"
import { GetStudentNotification } from "../../Interfaces/Get/GetStudentNotification.interface"
import { PostStudentNotification } from "../../Interfaces/Post/PostStudentNotification.interface"
import { PutStudentNotification } from "../../Interfaces/Put/PutStudentNotification.interface"

export class StudentNotificationRepository {
    queryHandler: QueryHandler<GetStudentNotification>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<StudentNotificationInterface[]>{
        const SQL = `
            SELECT * FROM student_notification
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(studentNotificationId: string): Promise<GetStudentNotification[]>{
        const SQL = `
            SELECT * FROM student_notification WHERE id = $1
        `

        const values = [
            studentNotificationId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(studentNotification: PostStudentNotification, studentId: string): Promise<string> {
        const newId = await this.queryHandler.getSequence("student_notification")
        
        const SQL = `
            INSERT INTO student_notification(
                id,
                student_id,
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
          studentId,
          studentNotification.message,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(studentNotification: PutStudentNotification, studentNotificationId: string, studentId: string): Promise<void> {
        const SQL = `
            UPDATE student_notification
            SET is_upvote = $1
            WHERE id = $2
                AND student_id = $3
        `
        const values = [
          studentNotification.message,
          studentNotificationId,
          studentId,
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(studentNotificationId: string, studentId: string): Promise<void> {
        const SQL = `
            DELETE FROM student_notification
            WHERE id = $1
                AND student_id = $2
        `
        const values = [
          studentNotificationId,
          studentId,
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}