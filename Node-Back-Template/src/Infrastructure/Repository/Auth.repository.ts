import { QueryHandler } from "../Handlers/Query.handler"

import { Client } from "pg"
import { GetAuth } from "../../Interfaces/Get/Auth.interface"

export class AuthRepository {
    queryHandler: QueryHandler<{id: string}>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async validateProfessorCredentials(loginCredentials: GetAuth): Promise<string[]>{
        const SQL = `
            SELECT id 
              FROM Client 
             WHERE siape = $1
               AND password = $2;
        `

        const values = [
            loginCredentials.code,
            loginCredentials.password
        ]

        const result =  await this.queryHandler.runQuery(SQL, values)
        
        return [result[0].id]
    }

    public async validateStudentCredentials(loginCredentials: GetAuth): Promise<string[]>{
        const SQL = `
            SELECT id 
              FROM Client 
             WHERE registration = $1
               AND password = $2;
        `

        const values = [
            loginCredentials.code,
            loginCredentials.password
        ]

        const result =  await this.queryHandler.runQuery(SQL, values)
        
        return [result[0].id]
    }
}