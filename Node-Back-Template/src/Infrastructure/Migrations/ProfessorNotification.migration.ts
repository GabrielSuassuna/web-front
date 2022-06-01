import { Client } from 'pg'
import { Database } from '../Database'
import { Migration } from '../../Interfaces/Migration/Migration.interface'

export class ProfessorNotificationMigration implements Migration{
    private client: Client

    constructor(){
        this.client = new Database().getClient()
    }

    run(): Promise<string>{
        const SQL = `
            CREATE TABLE professor_notification(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                professor_id serial NOT NULL, 
                message TEXT NOT NULL,
                FOREIGN KEY (professor_id) REFERENCES professor (id)
            );

            CREATE SEQUENCE professor_notification_seq
            START 1
            INCREMENT 1;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while applying ProfessorNotification migration; Stack: ${err}`)
                }
                else{
                    resolve("")
                }
            })
        })
    }

    drop(): Promise<string>{
        const SQL = `
            DROP TABLE professor_notification;
            
            DROP SEQUENCE professor_notification_seq;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while dropping ProfessorNotification table; Stack: ${err}`)
                }else{
                    resolve("")
                }
            })
        })  
    }
}