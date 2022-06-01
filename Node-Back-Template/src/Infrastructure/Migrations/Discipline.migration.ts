import { Client } from 'pg'
import { Database } from '../Database'
import { Migration } from '../../Interfaces/Migration/Migration.interface'

export class DisciplineMigration implements Migration{
    private client: Client

    constructor(){
        this.client = new Database().getClient()
    }

    run(): Promise<string>{
        const SQL = `
            CREATE TABLE discipline(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                code TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                hours SMALLINT NOT NULL
            );

            CREATE SEQUENCE discipline_seq
            START 1
            INCREMENT 1;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while applying Discipline migration; Stack: ${err}`)
                }
                else{
                    resolve("")
                }
            })
        })
    }

    drop(): Promise<string>{
        const SQL = `
            DROP TABLE discipline;
            
            DROP SEQUENCE discipline_seq;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while dropping Discipline table; Stack: ${err}`)
                }else{
                    resolve("")
                }
            })
        })  
    }
}