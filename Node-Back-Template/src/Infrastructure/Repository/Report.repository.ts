import { QueryHandler } from "../Handlers/Query.handler"

import { ReportInterface } from "../../Interfaces/Report.interface"
import { Client } from "pg"
import { GetReport } from "../../Interfaces/Get/GetReport.interface"
import { PutReportUpdate } from "../../Interfaces/Put/PutReportUpdate.interface"
import { ReportFilter } from "../../Interfaces/Filters/ReportFilter.interface"

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

    public async getAllOpen(viewerId: string, departmentId: string, reportFilter: ReportFilter | null = null): Promise<ReportInterface[]>{
        const SQL = `
            SELECT r.*, 
                au.name as author_name,
                au.siape as author_siape  
            FROM report as r
                INNER JOIN professor as au on r.author_id = au.id
            WHERE status like $1
                AND r.author_id != $2
                AND au.department_id = $3
        `

        const values = [
            'ABERTO',
            viewerId,
            departmentId,
        ]

        const { sqlWithFilter, valuesWithFilter } = this.applyGetAllFilters(SQL, values, reportFilter)
        
        return await this.queryHandler.runQuery(sqlWithFilter, valuesWithFilter)
    }

    public async getAllByAuthor(authorId: string, reportFilter: ReportFilter | null = null): Promise<ReportInterface[]>{
        const SQL = `
            SELECT r.*, 
                au.name as author_name,
                au.siape as author_siape, 
                re.name as reviewer_name,
                re.siape as reviewer_siape 
            FROM report as r
                INNER JOIN professor as au on r.author_id = au.id
                INNER JOIN professor as re on r.author_id = re.id
            WHERE r.author_id = $1
        `

        const values = [
            authorId
        ]

        const { sqlWithFilter, valuesWithFilter } = this.applyGetAllFilters(SQL, values, reportFilter)
        
        return await this.queryHandler.runQuery(sqlWithFilter, valuesWithFilter)
    }

    public async getAllByReviewer(reviewerId: string, reportFilter: ReportFilter | null = null): Promise<ReportInterface[]>{
        const SQL = `
            SELECT r.*, 
                au.name as author_name,
                au.siape as author_siape, 
                re.name as reviewer_name,
                re.siape as reviewer_siape 
            FROM report as r
                INNER JOIN professor as au on r.author_id = au.id
                INNER JOIN professor as re on r.author_id = re.id
            WHERE r.reviewer_id = $1
        `

        const values = [
            reviewerId
        ]

        const { sqlWithFilter, valuesWithFilter } = this.applyGetAllFilters(SQL, values, reportFilter)
        
        return await this.queryHandler.runQuery(sqlWithFilter, valuesWithFilter)
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

    public async create(feedbackId: string, authorId: string): Promise<string> {
        const newId = await this.queryHandler.getSequence("report")
        
        const SQL = `
            INSERT INTO report(
                id,
                feedback_id,
                author_id,
                reviewer_id,
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
          feedbackId,
          authorId,
          null,
          'ABERTO',
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(report: PutReportUpdate, reportId: string): Promise<GetReport[]> {
        const SQL = `
            UPDATE report
            SET reviewer_id = $1,
                status = $2
            WHERE id = $3
            RETURNING *
        `
        const values = [
          report.reviewerId,
          report.status,
          reportId,
        ]
        
        return await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(reportId: string): Promise<void> {
        const SQL = `
            DELETE FROM report
            WHERE id = $1
        `
        const values = [
          reportId,
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

    public async deleteByFeedbackId(feedbackId: string): Promise<void> {
        const SQL = `
            DELETE FROM report
            WHERE feedback_id = $1
        `
        const values = [
            feedbackId,
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

    private applyGetAllFilters(SQL: string, values: any[], reportFilter: ReportFilter | null = null){
        let sqlWithFilter = SQL
        let valuesWithFilter = values

        if(values.length === 0)
            sqlWithFilter += 'WHERE 0=0'
        if(reportFilter?.authorName){
            values.push(`%${reportFilter.authorName}%`)
            sqlWithFilter += ` AND au.name LIKE $${values.length}`
        }
        if(reportFilter?.authorSiape){
            values.push(`%${reportFilter.authorSiape}%`)
            sqlWithFilter += ` AND au.siape LIKE $${values.length}`
        }
        if(reportFilter?.reviewerName){
            values.push(`%${reportFilter.reviewerName}%`)
            sqlWithFilter += ` AND re.name LIKE $${values.length}`
        }
        if(reportFilter?.reviewerSiape){
            values.push(`%${reportFilter.reviewerSiape}%`)
            sqlWithFilter += ` AND re.siape LIKE $${values.length}`
        }
        if(reportFilter?.status){
            values.push(`%${reportFilter.status}%`)
            sqlWithFilter += ` AND r.status LIKE $${values.length}`
        }
        
        values.push(reportFilter?.limit || 5)
        sqlWithFilter += ` ORDER BY id LIMIT $${values.length}`

        values.push(reportFilter?.page || 2)
        sqlWithFilter += ` OFFSET ($${values.length} - 1)`

        values.push(reportFilter?.limit || 5)
        sqlWithFilter += ` * $${values.length}`

        return { sqlWithFilter, valuesWithFilter }
    }

}