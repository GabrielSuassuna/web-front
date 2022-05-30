import { QueryHandler } from "../Handlers/Query.handler"

import { LecturingInterface } from "../../Interfaces/Lecturing.interface"
import { Client } from "pg"
import { GetLecturing } from "../../Interfaces/Get/GetLecturing.interface"
import { PostLecturing } from "../../Interfaces/Post/PostLecturing.interface"
import { PutLecturing } from "../../Interfaces/Put/Lecturing.interface"

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

    public async create(lecturing: PostLecturing): Promise<string> {
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
          lecturing.professor_id,
          lecturing.discipline_id,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
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

    public async delete(lecturingId: string): Promise<void> {
        const SQL = `
            DELETE FROM lecturing
            WHERE id = $1
        `
        const values = [
          lecturingId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}