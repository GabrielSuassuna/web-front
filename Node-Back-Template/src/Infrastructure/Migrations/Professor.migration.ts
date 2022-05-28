import { Client } from 'pg'
import { Database } from '../Database'
import { Migration } from '../../Interfaces/Migration/Migration.interface'

export class ProfessorMigration implements Migration{
    private client: Client

    constructor(){
        this.client = new Database().getClient()
    }

    run(): Promise<string>{
        const SQL = `
            CREATE TABLE professor(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                department_id serial NOT NULL, 
                siape TEXT NOT NULL,
                password TEXT NOT NULL,
                name TEXT NOT NULL,
                about TEXT NOT NULL,
                lattes_url TEXT NOT NULL,
                is_head_of_department BOOLEAN NOT NULL,
                is_course_coordinator BOOLEAN NOT NULL,
                FOREIGN KEY (department_id) REFERENCES department (id)
            );

            CREATE SEQUENCE professor_seq
            START 1
            INCREMENT 1;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while applying Professor migration; Stack: ${err}`)
                }
                else{
                    resolve("")
                }
            })
        })
    }

    drop(): Promise<string>{
        const SQL = `
            DROP TABLE professor;
            
            DROP SEQUENCE professor_seq;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while dropping Professor table; Stack: ${err}`)
                }else{
                    resolve("")
                }
            })
        })  
    }
}