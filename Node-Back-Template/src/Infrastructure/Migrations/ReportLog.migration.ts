import { Client } from "pg";
import { Database } from "../Database";
import { Migration } from "../../Interfaces/Migration/Migration.interface";

export class ReportLogMigration implements Migration {
  private client: Client;

  constructor() {
    this.client = new Database().getClient();
  }

  run(): Promise<string> {
    const SQL = `
            CREATE TABLE report_log(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                report_id serial NOT NULL,  
                author_id serial NOT NULL,  
                date TIMESTAMP NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                FOREIGN KEY (report_id) REFERENCES report (id),
                FOREIGN KEY (author_id) REFERENCES professor (id)
            );

            CREATE SEQUENCE report_log_seq
            START 1
            INCREMENT 1;
        `;

    return new Promise((resolve, reject) => {
      this.client.query(SQL, (err, res) => {
        if (err) {
          reject(`Error while applying ReportLog migration; Stack: ${err}`);
        } else {
          resolve("");
        }
      });
    });
  }

  drop(): Promise<string> {
    const SQL = `
            DROP TABLE IF EXISTS report_log;
            
            DROP SEQUENCE report_log_seq;
        `;

    return new Promise((resolve, reject) => {
      this.client.query(SQL, (err, res) => {
        if (err) {
          reject(`Error while dropping ReportLog table; Stack: ${err}`);
        } else {
          resolve("");
        }
      });
    });
  }
}
