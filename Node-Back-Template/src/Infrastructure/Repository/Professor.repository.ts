import { QueryHandler } from "../Handlers/Query.handler"

import { ProfessorInterface } from "../../Interfaces/Professor.interface"
import { Client } from "pg"
import { GetProfessor } from "../../Interfaces/Get/GetProfessor.interface"
import { PostProfessor } from "../../Interfaces/Post/PostProfessor.interface"
import { PutProfessor } from "../../Interfaces/Put/PutProfessor.interface"
import { ProfessorFilter } from "../../Interfaces/Filters/ProfessorFilter.interface"

export class ProfessorRepository {
    queryHandler: QueryHandler<GetProfessor>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(professorFilter: ProfessorFilter | null = null): Promise<ProfessorInterface[]>{
        const SQL = `
            SELECT 
                p.id,
                p.department_id,
                d.name as department_name,
                p.siape,
                p.name
            FROM professor as p
                INNER JOIN department as d on p.department_id = d.id
        `

        let values: any[] = []

        const { sqlWithFilter, valuesWithFilter } = this.applyGetAllFilters(SQL, values, professorFilter)
        
        return await this.queryHandler.runQuery(sqlWithFilter, valuesWithFilter)
    }

    public async getById(professorId: string): Promise<GetProfessor[]>{
        const SQL = `
            SELECT 
                p.id,
                p.department_id,
                d.name as department_name,
                p.siape,
                p.name,
                p.about,
                p.lattes_url
            FROM professor as p
                INNER JOIN department as d on d.id = p.department_id
            WHERE p.id = $1
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
                lattes_url
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7
            )
        `
        const values = [
          newId,
          departmentId,
          professor.siape,
          professor.password,
          professor.name,
          professor.about,
          professor.lattesUrl
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(professor: PutProfessor, professorId: string): Promise<GetProfessor[]> {
        const SQL = `
            UPDATE professor
            SET siape = $1,
                name = $2,
                about = $3,
                lattes_url = $4,
                department_id = $5
                ${
                    professor.password ? 
                    ', password = $7 ':''
                }
            WHERE id = $6 
            RETURNING *
        `
        let values = [
          professor.siape,
          professor.name,
          professor.about,
          professor.lattesUrl,
          professor.departmentId,
          professorId,
        ]

        if(professor.password)
            values.push(professor.password)
        
        return await this.queryHandler.runQuery(SQL, values)
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

    
    private applyGetAllFilters(SQL: string, values: any[], professorFilter: ProfessorFilter | null = null){
        let sqlWithFilter = SQL
        let valuesWithFilter = values

        sqlWithFilter += 'WHERE 0=0'

        if(professorFilter?.name){
            values.push(`%${professorFilter.name}%`)
            sqlWithFilter += ` AND name LIKE $${values.length}`
        }
        if(professorFilter?.departmentId){
            values.push(professorFilter.departmentId)
            sqlWithFilter += ` AND department_id = $${values.length}`
        }
        if(professorFilter?.siape){
            values.push(professorFilter.siape)
            sqlWithFilter += ` AND siape = $${values.length}`
        }

        if(professorFilter?.limit != null && professorFilter?.page != null){
            values.push(professorFilter?.limit || 5)
            sqlWithFilter += ` ORDER BY id LIMIT $${values.length}`
            
            values.push(professorFilter?.page || 2)
            sqlWithFilter += ` OFFSET ($${values.length} - 1)`
            
            values.push(professorFilter?.limit || 5)
            sqlWithFilter += ` * $${values.length}`
        }
    
        return { sqlWithFilter, valuesWithFilter }
    }
}