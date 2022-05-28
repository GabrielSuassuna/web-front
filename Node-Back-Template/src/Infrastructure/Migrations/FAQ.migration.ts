import { Client } from 'pg'
import { Database } from '../Database'
import { Migration } from '../../Interfaces/Migration/Migration.interface'

export class FAQMigration implements Migration{
    private client: Client

    constructor(){
        this.client = new Database().getClient()
    }

    run(): Promise<string>{
        const SQL = `
            CREATE TABLE FAQ(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                question TEXT NOT NULL,
                answer TEXT NOT NULL
            );

            CREATE SEQUENCE faq_sec
            START 1
            INCREMENT 1;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while applying FAQ migration; Stack: ${err}`)
                }
                else{
                    resolve("")
                }
            })
        })
    }

    drop(): Promise<string>{
        const SQL = `
            DROP TABLE FAQ;
            
            DROP SEQUENCE faq_sec;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while dropping FAQ table; Stack: ${err}`)
                }else{
                    resolve("")
                }
            })
        })  
    }
}