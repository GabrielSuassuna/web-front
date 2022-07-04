import { Client } from "pg";
import { Database } from "../Database";
import { Migration } from "../../Interfaces/Migration/Migration.interface";

export class HasTagMigration implements Migration {
  private client: Client;

  constructor() {
    this.client = new Database().getClient();
  }

  run(): Promise<string> {
    const SQL = `
            CREATE TABLE has_tag(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                feedback_id serial NOT NULL, 
                tag_id serial NOT NULL, 
                FOREIGN KEY (feedback_id) REFERENCES feedback (id),
                FOREIGN KEY (tag_id) REFERENCES tag (id)
            );

            CREATE SEQUENCE has_tag_seq
            START 1
            INCREMENT 1;
        `;

    return new Promise((resolve, reject) => {
      this.client.query(SQL, (err, res) => {
        if (err) {
          reject(`Error while applying HasTag migration; Stack: ${err}`);
        } else {
          resolve("");
        }
      });
    });
  }

  drop(): Promise<string> {
    const SQL = `
            DROP TABLE IF EXISTS has_tag;
            
            DROP SEQUENCE has_tag_seq;
        `;

    return new Promise((resolve, reject) => {
      this.client.query(SQL, (err, res) => {
        if (err) {
          reject(`Error while dropping HasTag table; Stack: ${err}`);
        } else {
          resolve("");
        }
      });
    });
  }
}
