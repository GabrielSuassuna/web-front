import { Client } from "pg";
import { Database } from "../Database";
import { Migration } from "../../Interfaces/Migration/Migration.interface";

export class HasVoteMigration implements Migration {
  private client: Client;

  constructor() {
    this.client = new Database().getClient();
  }

  run(): Promise<string> {
    const SQL = `
            CREATE TABLE has_vote(
                id serial PRIMARY KEY UNIQUE NOT NULL, 
                feedback_id serial NOT NULL, 
                student_id serial NOT NULL, 
                is_upvote BOOLEAN NOT NULL,
                FOREIGN KEY (feedback_id) REFERENCES feedback (id),
                FOREIGN KEY (student_id) REFERENCES student (id)
            );

            CREATE SEQUENCE has_vote_seq
            START 1
            INCREMENT 1;
        `;

    return new Promise((resolve, reject) => {
      this.client.query(SQL, (err, res) => {
        if (err) {
          reject(`Error while applying HasVote migration; Stack: ${err}`);
        } else {
          resolve("");
        }
      });
    });
  }

  drop(): Promise<string> {
    const SQL = `
            DROP TABLE IF EXISTS has_vote;
            
            DROP SEQUENCE has_vote_seq;
        `;

    return new Promise((resolve, reject) => {
      this.client.query(SQL, (err, res) => {
        if (err) {
          reject(`Error while dropping HasVote table; Stack: ${err}`);
        } else {
          resolve("");
        }
      });
    });
  }
}
