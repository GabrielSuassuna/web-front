import { QueryHandler } from "../Handlers/Query.handler"

import { FeedbackInterface } from "../../Interfaces/Feedback.interface"
import { Client } from "pg"
import { GetFeedback } from "../../Interfaces/Get/GetFeedback.interface"
import { PostFeedback } from "../../Interfaces/Post/PostFeedback.interface"
import { PutFeedback } from "../../Interfaces/Put/PutFeedback.interface"
import { FeedbackFilter } from "../../Interfaces/Filters/FeedbackFilter.interface"

export class FeedbackRepository {
    queryHandler: QueryHandler<GetFeedback>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(feedbackFilter: FeedbackFilter | null = null): Promise<FeedbackInterface[]>{
        const SQL = `
            SELECT 
                f.id as id,
                f.title as title,
                p.name as professor_name,
                p.siape as professor_siape,
                d.name as discipline_name,
                d.code as discipline_code,
                f.general_score as general_score,
                f.date as date,
                i.upvote_count as upvote_count,
                i.downvote_count as downvote_count
            FROM feedback as f
                INNER JOIN lecturing as l on f.lecturing_id = l.id
                INNER JOIN professor as p on l.professor_id = p.id
                INNER JOIN discipline as d on l.discipline_id = d.id
                INNER JOIN (
                    SELECT fe.id as feedback_id, 
                        SUM(CASE WHEN hv.is_upvote IS TRUE THEN 1 ELSE 0 END) as upvote_count,
                        SUM(CASE WHEN hv.is_upvote IS TRUE THEN 0 ELSE 1 END) as downvote_count
                    FROM feedback as fe
                        INNER JOIN has_vote as hv on fe.id = hv.feedback_id
                    GROUP BY fe.id
                ) as i on i.feedback_id = f.id
        `

        let values: any[] = []

        const { sqlWithFilter, valuesWithFilter } = this.applyGetAllFilters(SQL, values, feedbackFilter)
        
        return await this.queryHandler.runQuery(sqlWithFilter, valuesWithFilter)
    }

    public async getStudentFeedbacks(studentId: string, feedbackFilter: FeedbackFilter | null = null): Promise<FeedbackInterface[]>{
        const SQL = `
            SELECT 
                f.id as id,
                f.title as title,
                p.name as professor_name,
                p.siape as professor_siape,
                d.name as discipline_name,
                d.code as discipline_code,
                f.general_score as general_score,
                f.date as date,
                i.upvote_count as upvote_count,
                i.downvote_count as downvote_count
            FROM feedback as f
                INNER JOIN lecturing as l on f.lecturing_id = l.id
                INNER JOIN professor as p on l.professor_id = p.id
                INNER JOIN discipline as d on l.discipline_id = d.id
                INNER JOIN (
                    SELECT fe.id as feedback_id, 
                        SUM(CASE WHEN hv.is_upvote IS TRUE THEN 1 ELSE 0 END) as upvote_count,
                        SUM(CASE WHEN hv.is_upvote IS TRUE THEN 0 ELSE 1 END) as downvote_count
                    FROM feedback as fe
                        INNER JOIN has_vote as hv on fe.id = hv.feedback_id
                    GROUP BY fe.id
                ) as i on i.feedback_id = f.id
            WHERE f.student_id = $1
        `
        
        const values = [
            studentId
        ]

        const { sqlWithFilter, valuesWithFilter } = this.applyGetAllFilters(SQL, values, feedbackFilter)
        
        return await this.queryHandler.runQuery(sqlWithFilter, valuesWithFilter)
    }

    public async getProfessorFeedbacks(professorId: string, feedbackFilter: FeedbackFilter | null = null): Promise<FeedbackInterface[]>{
        const SQL = `
            SELECT 
                f.id as id,
                f.title as title,
                p.name as professor_name,
                p.siape as professor_siape,
                d.name as discipline_name,
                d.code as discipline_code,
                f.general_score as general_score,
                f.date as date,
                i.upvote_count as upvote_count,
                i.downvote_count as downvote_count
            FROM feedback as f
                INNER JOIN lecturing as l on f.lecturing_id = l.id
                INNER JOIN professor as p on l.professor_id = p.id
                INNER JOIN discipline as d on l.discipline_id = d.id
                INNER JOIN (
                    SELECT fe.id as feedback_id, 
                        SUM(CASE WHEN hv.is_upvote IS TRUE THEN 1 ELSE 0 END) as upvote_count,
                        SUM(CASE WHEN hv.is_upvote IS TRUE THEN 0 ELSE 1 END) as downvote_count
                    FROM feedback as fe
                        INNER JOIN has_vote as hv on fe.id = hv.feedback_id
                    GROUP BY fe.id
                ) as i on i.feedback_id = f.id
            WHERE l.professor_id = $1
        `
        
        const values = [
            professorId
        ]

        const { sqlWithFilter, valuesWithFilter } = this.applyGetAllFilters(SQL, values, feedbackFilter)
        
        return await this.queryHandler.runQuery(sqlWithFilter, valuesWithFilter)
    }

    public async getById(feedbackId: string): Promise<GetFeedback[]>{
        const SQL = `
        SELECT 
            f.id as id,
            f.lecturing_id as lecturing_id,
            f.title as title,
            f.description as description,
            f.period as period,
            f.general_score as general_score,
            f.assiduity_score as assiduity_score,
            f.clarity_score as clarity_score,
            f.relationship_score as relationship_score,
            f.date as date,
            p.name as professor_name,
            p.siape as professor_siape,
            d.name as discipline_name,
            d.code as discipline_code,
            i.upvote_count as upvote_count,
            i.downvote_count as downvote_count
        FROM feedback as f
            INNER JOIN lecturing as l on f.lecturing_id = l.id
            INNER JOIN professor as p on l.professor_id = p.id
            INNER JOIN discipline as d on l.discipline_id = d.id
            INNER JOIN (
                SELECT fe.id as feedback_id, 
                    SUM(CASE WHEN hv.is_upvote IS TRUE THEN 1 ELSE 0 END) as upvote_count,
                    SUM(CASE WHEN hv.is_upvote IS TRUE THEN 0 ELSE 1 END) as downvote_count
                FROM feedback as fe
                    INNER JOIN has_vote as hv on fe.id = hv.feedback_id
                GROUP BY fe.id
            ) as i on i.feedback_id = f.id
        WHERE f.id = $1
        `

        const values = [
            feedbackId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(feedback: PostFeedback, lecturingId: string, studentId: string): Promise<string> {
        const newId = await this.queryHandler.getSequence("feedback")
        
        const SQL = `
            INSERT INTO feedback(
                id, 
                lecturing_id,  
                student_id,
                title,
                description,
                period,
                general_score,
                assiduity_score,
                clarity_score,
                relationship_score,
                date
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11
            )
        `
        const values = [
          newId,
          lecturingId,  
          studentId,
          feedback.title,
          feedback.description,
          feedback.period,
          feedback.general_score,
          feedback.assiduity_score,
          feedback.clarity_score,
          feedback.relationship_score,
          feedback.date,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(feedback: PutFeedback, feedbackId: string): Promise<void> {
        const SQL = `
            UPDATE feedback
            SET title = $1,
                description = $2,
                period = $3,
                general_score = $4,
                assiduity_score = $5,
                clarity_score = $6,
                relationship_score = $7,
                date = $8
            WHERE id = $9
        `
        const values = [
          feedback.title,
          feedback.description,
          feedback.period,
          feedback.general_score,
          feedback.assiduity_score,
          feedback.clarity_score,
          feedback.relationship_score,
          feedback.date,
          feedbackId
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(feedbackId: string): Promise<void> {
        const SQL = `
            DELETE FROM feedback
            WHERE id = $1
        `
        const values = [
          feedbackId,
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

    private applyGetAllFilters(SQL: string, values: any[], feedbackFilter: FeedbackFilter | null = null){
        let sqlWithFilter = SQL
        let valuesWithFilter = values

        if(values.length === 0)
            sqlWithFilter += 'WHERE 0=0'

        if(feedbackFilter?.professorName){
            values.push(`%${feedbackFilter.professorName}%`)
            sqlWithFilter += ` AND p.name LIKE $${values.length}`
        }
        if(feedbackFilter?.professorSiape){
            values.push(`%${feedbackFilter.professorSiape}%`)
            sqlWithFilter += ` AND p.siape LIKE $${values.length}`
        }
        if(feedbackFilter?.disciplineName){
            values.push(`%${feedbackFilter.disciplineName}%`)
            sqlWithFilter += ` AND d.name LIKE $${values.length}`
        }
        if(feedbackFilter?.disciplineCode){
            values.push(`%${feedbackFilter.disciplineCode}%`)
            sqlWithFilter += ` AND d.code LIKE $${values.length}`
        }
        if(feedbackFilter?.title){
            values.push(`%${feedbackFilter.title}%`)
            sqlWithFilter += ` AND f.title LIKE $${values.length}`
        }
        
        return { sqlWithFilter, valuesWithFilter }
    }

}