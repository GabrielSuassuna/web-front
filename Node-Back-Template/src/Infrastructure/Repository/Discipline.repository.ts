import { QueryHandler } from "../Handlers/Query.handler"

import { DisciplineInterface } from "../../Interfaces/Discipline.interface"
import { Client } from "pg"
import { GetDiscipline } from "../../Interfaces/Get/GetDiscipline.interface"
import { PostDiscipline } from "../../Interfaces/Post/PostDiscipline.interface"
import { PutDiscipline } from "../../Interfaces/Put/PutDiscipline.interface"
import { DisciplineFilter } from "../../Interfaces/Filters/DisciplineFilter.interface"

export class DisciplineRepository {
    queryHandler: QueryHandler<GetDiscipline>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(disciplineFilter: DisciplineFilter | null = null): Promise<DisciplineInterface[]>{
        const SQL = `
            SELECT *
            FROM discipline
        `

        let values: any[] = []

        const { sqlWithFilter, valuesWithFilter } = this.applyGetAllFilters(SQL, values, disciplineFilter)
        
        return await this.queryHandler.runQuery(sqlWithFilter, valuesWithFilter)
    }

    public async getById(disciplineId: string): Promise<GetDiscipline[]>{
        const SQL = `
            SELECT d.*, 
                COUNT(DISTINCT f.id) as feedback_count,
                AVG(f.general_score) as general_score
            FROM discipline as d
                LEFT OUTER JOIN lecturing as l on d.id = l.discipline_id
                LEFT OUTER JOIN feedback as f on l.id = f.lecturing_id
            WHERE d.id = $1
            GROUP BY d.id
        `

        const values = [
            disciplineId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(discipline: PostDiscipline): Promise<string> {
        const newId = await this.queryHandler.getSequence("discipline")
        
        const SQL = `
            INSERT INTO discipline(
                id,
                code,
                name,
                description,
                hours
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5
            )
        `
        const values = [
            newId,
            discipline.code,
            discipline.name,
            discipline.description,
            discipline.hours,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(discipline: PutDiscipline, disciplineId: string): Promise<GetDiscipline[]> {
        const SQL = `
            UPDATE discipline
            SET code = $1,
                name = $2,
                description = $3,
                hours = $4
            WHERE id = $5
            RETURNING *
        `
        const values = [
            discipline.code,
            discipline.name,
            discipline.description,
            discipline.hours,
            disciplineId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(disciplineId: string): Promise<void> {
        const SQL = `
            DELETE FROM discipline
            WHERE id = $1
        `
        const values = [
          disciplineId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

    private applyGetAllFilters(SQL: string, values: any[], disciplineFilter: DisciplineFilter | null = null){
        let sqlWithFilter = SQL
        let valuesWithFilter = values

        sqlWithFilter += 'WHERE 0=0'

        if(disciplineFilter?.name){
            values.push(`%${disciplineFilter.name}%`)
            sqlWithFilter += ` AND name LIKE $${values.length}`
        }
        if(disciplineFilter?.code){
            values.push(`%${disciplineFilter.code}%`)
            sqlWithFilter += ` AND code LIKE $${values.length}`
        }
        if(disciplineFilter?.hours){
            values.push(disciplineFilter.hours)
            sqlWithFilter += ` AND hours = $${values.length}`
        }
        
        if(disciplineFilter?.limit != null && disciplineFilter?.page != null){
            values.push(disciplineFilter?.limit || 5)
            sqlWithFilter += ` ORDER BY id LIMIT $${values.length}`

            values.push(disciplineFilter?.page || 2)
            sqlWithFilter += ` OFFSET ($${values.length} - 1)`

            values.push(disciplineFilter?.limit || 5)
            sqlWithFilter += ` * $${values.length}`
        }
        
        return { sqlWithFilter, valuesWithFilter }
    }
}