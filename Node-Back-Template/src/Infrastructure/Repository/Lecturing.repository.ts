import { QueryHandler } from "../Handlers/Query.handler"

import { LecturingInterface } from "../../Interfaces/Lecturing.interface"
import { Client } from "pg"
import { GetLecturing } from "../../Interfaces/Get/GetLecturing.interface"
import { PutLecturing } from "../../Interfaces/Put/PutLecturing.interface"

export class LecturingRepository {
    queryHandler: QueryHandler<GetLecturing>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<LecturingInterface[]>{
        const SQL = `
            SELECT * FROM lecturing
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(lecturingId: string): Promise<GetLecturing[]>{
        const SQL = `
            SELECT * FROM lecturing WHERE id = $1
        `

        const values = [
            lecturingId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(professorId: string, disciplineId: string): Promise<string> {
        const newId = await this.queryHandler.getSequence("lecturing")
        
        const SQL = `
            INSERT INTO lecturing(
                id,
                professor_id,
                discipline_id,
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
          disciplineId,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    // TODO: Dar uma olhada nesse update e ver se ele é necessário
    public async update(lecturing: PutLecturing, lecturingId: string): Promise<void> {
        const SQL = `
            UPDATE lecturing
            SET professor_id = $1,
                discipline_id = $2
            WHERE id = $3
        `
        const values = [
          lecturing.professor_id,
          lecturing.discipline_id,
          lecturingId,
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(lecturingId: string, professorId: string, disciplineId: string): Promise<void> {
        const SQL = `
            DELETE FROM lecturing
            WHERE id = $1
                AND professor_id = $2
                AND discipline_id = $3
        `
        const values = [
          lecturingId,
          professorId,
          disciplineId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}