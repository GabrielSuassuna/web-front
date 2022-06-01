import { Client } from 'pg'
import { Database } from '../Database'
import { Migration } from '../../Interfaces/Migration/Migration.interface'

export class StudentNotificationMigration implements Migration{
    private client: Client

    constructor(){
        this.client = new Database().getClient()
    }

    run(): Promise<string>{
        const SQL = `
            CREATE TABLE student_notification(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                student_id serial NOT NULL, 
                message TEXT NOT NULL,
                FOREIGN KEY (student_id) REFERENCES student (id)
            );

            CREATE SEQUENCE student_notification_seq
            START 1
            INCREMENT 1;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while applying StudentNotification migration; Stack: ${err}`)
                }
                else{
                    resolve("")
                }
            })
        })
    }

    drop(): Promise<string>{
        const SQL = `
            DROP TABLE student_notification;
            
            DROP SEQUENCE student_notification_seq;
        `

        return new Promise((resolve, reject) => {
            this.client.query(SQL, (err, res) => {
                if (err) {
                    reject(`Error while dropping StudentNotification table; Stack: ${err}`)
                }else{
                    resolve("")
                }
            })
        })  
    }
}