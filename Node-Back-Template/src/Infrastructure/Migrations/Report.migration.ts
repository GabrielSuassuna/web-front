import { Client } from 'pg'
import { Database } from '../Database'
import { Migration } from '../../Interfaces/Migration/Migration.interface'

export class ReportMigration implements Migration{
    private client: Client

    constructor(){
        this.client = new Database().getClient()
    }

    run(): Promise<string>{
        const SQL = `
            CREATE TABLE report(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                feedback_id serial NOT NULL,  
                author_id serial NOT NULL,  
                reviewer_id serial, 
                status TEXT NOT NULL,
                FOREIGN KEY (feedback_id) REFERENCES feedback (id),
                FOREIGN KEY (author_id) REFERENCES professor (id),
                FOREIGN KEY (reviewer_id) REFERENCES professor (id)
            );

            CREATE SEQUENCE report_seq
            START 1
            INCREMENT 1;
            
            ALTER TABLE report ALTER COLUMN reviewer_id DROP NOT NULL;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while applying Report migration; Stack: ${err}`)
                }
                else{
                    resolve("")
                }
            })
        })
    }

    drop(): Promise<string>{
        const SQL = `
            DROP TABLE report;
            
            DROP SEQUENCE report_seq;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while dropping Report table; Stack: ${err}`)
                }else{
                    resolve("")
                }
            })
        })  
    }
}