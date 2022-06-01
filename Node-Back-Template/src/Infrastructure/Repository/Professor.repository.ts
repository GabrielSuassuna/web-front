import { QueryHandler } from "../Handlers/Query.handler"

import { ProfessorInterface } from "../../Interfaces/Professor.interface"
import { Client } from "pg"
import { GetProfessor } from "../../Interfaces/Get/GetProfessor.interface"
import { PostProfessor } from "../../Interfaces/Post/PostProfessor.interface"
import { PutProfessor } from "../../Interfaces/Put/PutProfessor.interface"

export class ProfessorRepository {
    queryHandler: QueryHandler<GetProfessor>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<ProfessorInterface[]>{
        const SQL = `
            SELECT * FROM professor
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(professorId: string): Promise<GetProfessor[]>{
        const SQL = `
            SELECT * FROM professor WHERE id = $1
        `

        const values = [
            professorId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(professor: PostProfessor, departmentId: string): Promise<string> {
        const newId = await this.queryHandler.getSequence("professor")
        
        const SQL = `
            INSERT INTO professor(
                id,
                department_id,
                siape,
                password,
                name,
                about,
                lattes_url,
                is_head_of_department,
                is_course_coordinator
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
                $9
            )
        `
        const values = [
          newId,
          departmentId,
          professor.siape,
          professor.password,
          professor.name,
          professor.about,
          professor.lattes_url,
          professor.is_head_of_department,
          professor.is_course_coordinator
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(professor: PutProfessor, professorId: string, departmentId: string): Promise<void> {
        const SQL = `
            UPDATE professor
            SET siape = $1,
                password = $2,
                name = $3,
                about = $4,
                lattes_url = $5,
                is_head_of_department = $6,
                is_course_coordinator =$7
            WHERE id = $8
              AND department_id = $9
        `
        const values = [
          professor.siape,
          professor.password,
          professor.name,
          professor.about,
          professor.lattes_url,
          professor.is_head_of_department,
          professor.is_course_coordinator,
          professorId,
          departmentId
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(professorId: string): Promise<void> {
        const SQL = `
            DELETE FROM professor
            WHERE id = $1
        `
        const values = [
          professorId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}