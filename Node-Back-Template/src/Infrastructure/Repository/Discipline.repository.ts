import { QueryHandler } from "../Handlers/Query.handler"

import { DisciplineInterface } from '../../Interfaces/Discipline.interface'
import { Client } from "pg"
import { GetDiscipline } from "../../Interfaces/Get/GetDiscipline.interface"
import { PostDiscipline } from "../../Interfaces/Post/PostDiscipline.interface"
import { PutDiscipline } from "../../Interfaces/Put/Discipline.interface"

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
                name,
                description,
                hours,
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
            SET name = $1,
                description = $2,
                hours = $3
            WHERE id = $4
        `
        const values = [
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