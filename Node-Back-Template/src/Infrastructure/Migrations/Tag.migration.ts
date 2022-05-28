import { Client } from 'pg'
import { Database } from '../Database'
import { Migration } from '../../Interfaces/Migration/Migration.interface'

export class TagMigration implements Migration{
    private client: Client

    constructor(){
        this.client = new Database().getClient()
    }

    run(): Promise<string>{
        const SQL = `
            CREATE TABLE Tag(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                name TEXT NOT NULL,
                description TEXT NOT NULL
            );

            CREATE SEQUENCE tag_sec
            START 1
            INCREMENT 1;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while applying Tag migration; Stack: ${err}`)
                }
                else{
                    resolve("")
                }
            })
        })
    }

    drop(): Promise<string>{
        const SQL = `
            DROP TABLE Tag;
            
            DROP SEQUENCE tag_sec;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while dropping Tag table; Stack: ${err}`)
                }else{
                    resolve("")
                }
            })
        })  
    }
}