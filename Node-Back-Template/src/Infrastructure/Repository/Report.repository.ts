import { QueryHandler } from "../Handlers/Query.handler"

import { ReportInterface } from "../../Interfaces/Report.interface"
import { Client } from "pg"
import { GetReport } from "../../Interfaces/Get/GetReport.interface"
import { PostReport } from "../../Interfaces/Post/PostReport.interface"
import { PutReport } from "../../Interfaces/Put/PutReport.interface"
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
                p.name as author_name,
                p.siape as author_siape  
            FROM report as r
                INNER JOIN professor as p on r.author_id = p.id
            WHERE status like $1
                AND r.author_id != $2
                AND p.department_id = $3
        `

        const values = [
            'ABERTO',
            viewerId,
            departmentId,
        ]

        return await this.queryHandler.runQuery(SQL, values)
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

        return await this.queryHandler.runQuery(SQL, values)
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

        return await this.queryHandler.runQuery(SQL, values)
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
          report.reviewer_id,
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

        if(reportFilter?.feedbackName){
            values.push(`%${reportFilter.feedbackName}%`)
            sqlWithFilter += ` AND p.name LIKE $${values.length}`
        }
        if(reportFilter?.authorName){
            values.push(`%${reportFilter.authorName}%`)
            sqlWithFilter += ` AND p.siape LIKE $${values.length}`
        }
        if(reportFilter?.authorSiape){
            values.push(`%${reportFilter.authorSiape}%`)
            sqlWithFilter += ` AND d.name LIKE $${values.length}`
        }
        if(reportFilter?.reviewerName){
            values.push(`%${reportFilter.reviewerName}%`)
            sqlWithFilter += ` AND d.code LIKE $${values.length}`
        }
        if(reportFilter?.reviewerSiape){
            values.push(`%${reportFilter.reviewerSiape}%`)
            sqlWithFilter += ` AND f.title LIKE $${values.length}`
        }
        if(reportFilter?.status){
            values.push(`%${reportFilter.status}%`)
            sqlWithFilter += ` AND f.title LIKE $${values.length}`
        }
        
        return { sqlWithFilter, valuesWithFilter }
    }

}