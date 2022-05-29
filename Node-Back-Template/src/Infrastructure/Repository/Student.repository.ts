import { QueryHandler } from "../Handlers/Query.handler"

import { StudentInterface } from '../../Interfaces/Student.interface'
import { Client } from "pg"
import { GetStudent } from "../../Interfaces/Get/GetStudent.interface"
import { PostStudent } from "../../Interfaces/Post/PostStudent.interface"
import { PutStudent } from "../../Interfaces/Put/Student.interface"

export class StudentRepository {
    queryHandler: QueryHandler<GetStudent>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<StudentInterface[]>{
        const SQL = `
            SELECT * FROM student
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(studentId: string): Promise<GetStudent[]>{
        const SQL = `
            SELECT * FROM student WHERE id = $1
        `

        const values = [
            studentId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(student: PostStudent): Promise<string> {
        const newId = await this.queryHandler.getSequence("student")
        
        const SQL = `
            INSERT INTO student(
                id,
                registration,
                name,
                password
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
            student.registration,
            student.name,
            student.password,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(student: PutStudent, studentId: string): Promise<void> {
        const SQL = `
            UPDATE student
            SET registration = $1,
                name = $2,
                password = $3
            WHERE id = $4
        `
        const values = [
            student.registration,
            student.name,
            student.password,
            studentId
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(studentId: string): Promise<void> {
        const SQL = `
            DELETE FROM student
            WHERE id = $1
        `
        const values = [
          studentId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}