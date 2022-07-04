import { Client } from "pg";
import { Database } from "../Database";
import { Migration } from "../../Interfaces/Migration/Migration.interface";

export class LecturingMigration implements Migration {
  private client: Client;

  constructor() {
    this.client = new Database().getClient();
  }

  run(): Promise<string> {
    const SQL = `
            CREATE TABLE lecturing(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                professor_id serial NOT NULL, 
                discipline_id serial NOT NULL, 
                FOREIGN KEY (professor_id) REFERENCES professor (id),
                FOREIGN KEY (discipline_id) REFERENCES discipline (id)
            );

            CREATE SEQUENCE lecturing_seq
            START 1
            INCREMENT 1;
        `;

    return new Promise((resolve, reject) => {
      this.client.query(SQL, (err, res) => {
        if (err) {
          reject(`Error while applying Lecturing migration; Stack: ${err}`);
        } else {
          resolve("");
        }
      });
    });
  }

  drop(): Promise<string> {
    const SQL = `
            DROP TABLE IF EXISTS lecturing;
            
            DROP SEQUENCE lecturing_seq;
        `;

    return new Promise((resolve, reject) => {
      this.client.query(SQL, (err, res) => {
        if (err) {
          reject(`Error while dropping Lecturing table; Stack: ${err}`);
        } else {
          resolve("");
        }
      });
    });
  }
}
