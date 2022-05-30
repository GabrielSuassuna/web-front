import { QueryHandler } from "../Handlers/Query.handler"

import { ReportInterface } from "../../Interfaces/Report.interface"
import { Client } from "pg"
import { GetReport } from "../../Interfaces/Get/GetReport.interface"
import { PostReport } from "../../Interfaces/Post/PostReport.interface"
import { PutReport } from "../../Interfaces/Put/PutReport.interface"

export class ReportRepository {
    queryHandler: QueryHandler<GetReport>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<ReportInterface[]>{
        const SQL = `
            SELECT * FROM report
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(reportId: string): Promise<GetReport[]>{
        const SQL = `
            SELECT * FROM report WHERE id = $1
        `

        const values = [
            reportId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(report: PostReport): Promise<string> {
        const newId = await this.queryHandler.getSequence("report")
        
        const SQL = `
            INSERT INTO report(
                id,
                feedback_id,
                author_id,
                revisor_id,
                status
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5
            )
        `
        const values = [
          newId,
          report.feedback_id,
          report.author_id,
          report.revisor_id,
          report.status,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(report: PutReport, reportId: string): Promise<void> {
        const SQL = `
            UPDATE report
            SET feedback_id = $1,
                author_id = $2,
                revisor_id = $3,
                status = $4
            WHERE id = $5
        `
        const values = [
          report.feedback_id,
          report.author_id,
          report.revisor_id,
          report.status,
          reportId,
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(reportId: string): Promise<void> {
        const SQL = `
            DELETE FROM report
            WHERE id = $1
        `
        const values = [
          reportId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}