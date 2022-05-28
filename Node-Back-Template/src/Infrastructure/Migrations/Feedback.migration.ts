import { Client } from 'pg'
import { Database } from '../Database'
import { Migration } from '../../Interfaces/Migration/Migration.interface'

export class FeedbackMigration implements Migration{
    private client: Client

    constructor(){
        this.client = new Database().getClient()
    }

    run(): Promise<string>{
        const SQL = `
            CREATE TABLE feedback(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                lecturing_id serial NOT NULL,  
                student_id serial NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                period TEXT NOT NULL,
                general_score FLOAT8 NOT NULL,
                assiduity_score SMALLINT NOT NULL,
                clarity_score SMALLINT NOT NULL,
                relationship_score SMALLINT NOT NULL,
                date DATE NOT NULL,
                FOREIGN KEY (lecturing_id) REFERENCES lecturing (id),
                FOREIGN KEY (student_id) REFERENCES student (id)
            );

            CREATE SEQUENCE feedback_seq
            START 1
            INCREMENT 1;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while applying Feedback migration; Stack: ${err}`)
                }
                else{
                    resolve("")
                }
            })
        })
    }

    drop(): Promise<string>{
        const SQL = `
            DROP TABLE feedback;
            
            DROP SEQUENCE feedback_seq;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while dropping Feedback table; Stack: ${err}`)
                }else{
                    resolve("")
                }
            })
        })  
    }
}