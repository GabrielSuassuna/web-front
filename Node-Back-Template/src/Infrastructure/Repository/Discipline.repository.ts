import { QueryHandler } from "../Handlers/Query.handler"

import { DisciplineInterface } from "../../Interfaces/Discipline.interface"
import { Client } from "pg"
import { GetDiscipline } from "../../Interfaces/Get/GetDiscipline.interface"
import { PostDiscipline } from "../../Interfaces/Post/PostDiscipline.interface"
import { PutDiscipline } from "../../Interfaces/Put/PutDiscipline.interface"

export class DisciplineRepository {
    queryHandler: QueryHandler<GetDiscipline>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<DisciplineInterface[]>{
        const SQL = `
            SELECT * FROM discipline
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(disciplineId: string): Promise<GetDiscipline[]>{
        const SQL = `
            SELECT * FROM discipline WHERE id = $1
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
                hours,
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
    
    public async update(discipline: PutDiscipline, disciplineId: string): Promise<void> {
        const SQL = `
            UPDATE discipline
            SET code = $1,
                name = $2,
                description = $3,
                hours = $4
            WHERE id = $5
        `
        const values = [
            discipline.code,
            discipline.name,
            discipline.description,
            discipline.hours,
            disciplineId
        ]
        
        await this.queryHandler.runQuery(SQL, values)
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

}