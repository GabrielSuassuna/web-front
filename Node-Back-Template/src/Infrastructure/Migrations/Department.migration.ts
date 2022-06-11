import { Client } from 'pg'
import { Database } from '../Database'
import { Migration } from '../../Interfaces/Migration/Migration.interface'

export class DepartmentMigration implements Migration{
    private client: Client

    constructor(){
        this.client = new Database().getClient()
    }

    run(): Promise<string>{
        const SQL = `
            CREATE TABLE department(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                department_head_id serial,
                course_coordinator_id serial,
                name TEXT NOT NULL,
                description TEXT NOT NULL
            );

            CREATE SEQUENCE department_seq
            START 1
            INCREMENT 1;

            ALTER TABLE department ALTER COLUMN department_head_id DROP NOT NULL;
            ALTER TABLE department ALTER COLUMN course_coordinator_id DROP NOT NULL;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while applying Department migration; Stack: ${err}`)
                }
                else{
                    resolve("")
                }
            })
        })
    }

    drop(): Promise<string>{
        const SQL = `
            DROP TABLE department;
            
            DROP SEQUENCE department_seq;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while dropping Department table; Stack: ${err}`)
                }else{
                    resolve("")
                }
            })
        })  
    }
}