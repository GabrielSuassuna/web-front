import { QueryHandler } from "../Handlers/Query.handler"

import { ReportLogInterface } from "../../Interfaces/ReportLog.interface"
import { Client } from "pg"
import { GetReportLog } from "../../Interfaces/Get/GetReportLog.interface"
import { PostReportLog } from "../../Interfaces/Post/PostReportLog.interface"
import { PutReportLog } from "../../Interfaces/Put/PutReportLog.interface"

export class ReportLogRepository {
    queryHandler: QueryHandler<GetReportLog>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(): Promise<ReportLogInterface[]>{
        const SQL = `
            SELECT * FROM report_log
        `

        return await this.queryHandler.runQuery(SQL)
    }

    public async getById(reportLogId: string): Promise<GetReportLog[]>{
        const SQL = `
            SELECT * FROM report_log WHERE id = $1
        `

        const values = [
            reportLogId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(reportLog: PostReportLog, reportId: string, authorId: string): Promise<string> {
        const newId = await this.queryHandler.getSequence("report_log")
        
        const SQL = `
            INSERT INTO report_log(
                id,
                report_id,
                author_id,
                date,
                title,
                description
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )
        `
        const values = [
          newId,
          reportId,
          authorId,
          reportLog.date,
          reportLog.title,
          reportLog.description,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(reportLog: PutReportLog, reportLogId: string, reportId: string, authorId: string): Promise<void> {
        const SQL = `
            UPDATE report_log
            SET date = $1,
                title = $2,
                description = $3
            WHERE id = $4
              AND report_id = $5
              AND author_id = $6
        `
        const values = [
          reportLog.date,
          reportLog.title,
          reportLog.description,
          reportLogId,
          reportId,
          authorId
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(reportLogId: string, reportId: string, authorId: string): Promise<void> {
        const SQL = `
            DELETE FROM report_log
            WHERE id = $1
                AND report_id = $2
                AND author_id = $3
        `
        const values = [
          reportLogId,
          reportId,
          authorId,
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

}