import { QueryHandler } from "../Handlers/Query.handler"

import { LecturingInterface } from "../../Interfaces/Lecturing.interface"
import { Client } from "pg"
import { GetLecturing } from "../../Interfaces/Get/GetLecturing.interface"
import { PutLecturing } from "../../Interfaces/Put/PutLecturing.interface"
import { LecturingFilter } from "../../Interfaces/Filters/LecturingFilter.interface"

export class LecturingRepository {
    queryHandler: QueryHandler<GetLecturing>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(lecturingFilter: LecturingFilter | null = null): Promise<LecturingInterface[]>{
        const SQL = `
            SELECT
                l.id as id,
                d.name as discipline_name,
                d.code as discipline_code,
                p.name as professor_name,
                p.siape as professor_siape,
                dpt.name as professor_department,
                fc.feedback_count as feedback_count,
                av.average_score as average_score
            FROM
                lecturing as l
                inner join discipline as d on l.discipline_id = d.id
                inner join professor as p on l.professor_id = p.id
                inner join department as dpt on p.department_id = dpt.id
                inner join (
                    SELECT le.id as lecturing_id,
                        count(DISTINCT fe.id) as feedback_count 
                    FROM lecturing as le
                        LEFT OUTER JOIN feedback as fe  on fe.lecturing_id = le.id
                    GROUP BY le.id
                ) as fc on l.id = fc.lecturing_id
                inner join (
                    SELECT le.id as lecturing_id,
                        avg(CASE WHEN fe.general_score IS NULL THEN -1 ELSE fe.general_score END) as average_score 
                    FROM lecturing as le
                        LEFT OUTER JOIN feedback as fe  on fe.lecturing_id = le.id
                    GROUP BY le.id
                ) as av on l.id = av.lecturing_id
        `

        let values: any[] = []

        const { sqlWithFilter, valuesWithFilter } = this.applyGetAllFilters(SQL, values, lecturingFilter)
        
        return await this.queryHandler.runQuery(sqlWithFilter, valuesWithFilter)
    }

    public async getById(lecturingId: string): Promise<GetLecturing[]>{
        const SQL = `
            SELECT l.* as lecturing_id,
                count(DISTINCT f.id) as feedback_count ,
                avg(CASE WHEN f.general_score IS NULL THEN -1 ELSE f.general_score END) as average_score 
            FROM lecturing as l
                LEFT OUTER JOIN feedback as f on f.lecturing_id = l.id
            WHERE l.id = $1
            GROUP BY l.id
        `

        const values = [
            lecturingId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async getByProfessorAndDiscipline(professorId: string, disciplineId: string): Promise<GetLecturing[]>{
        const SQL = `
            SELECT *
            FROM lecturing as l
            WHERE l.professor_id = $1
                AND l.discipline_id = $2
        `

        const values = [
            professorId,
            disciplineId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(professorId: string, disciplineId: string): Promise<string> {
        const newId = await this.queryHandler.getSequence("lecturing")
        
        const SQL = `
            INSERT INTO lecturing(
                id,
                professor_id,
                discipline_id
            )
            VALUES (
                $1,
                $2,
                $3
            )
        `
        const values = [
          newId,
          professorId,
          disciplineId,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }

    public async delete(lecturingId: string): Promise<void> {
        const SQL = `
            DELETE FROM lecturing
            WHERE id = $1
        `
        const values = [
          lecturingId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

    private applyGetAllFilters(SQL: string, values: any[], lecturingFilter: LecturingFilter | null = null){
        let sqlWithFilter = SQL
        let valuesWithFilter = values

        sqlWithFilter += 'WHERE 0=0'

        if(lecturingFilter?.disciplineName){
            values.push(`%${lecturingFilter.disciplineName}%`)
            sqlWithFilter += ` AND d.name LIKE $${values.length}`
        }
        if(lecturingFilter?.disciplineCode){
            values.push(`%${lecturingFilter.disciplineCode}%`)
            sqlWithFilter += ` AND d.code LIKE $${values.length}`
        }
        if(lecturingFilter?.professorName){
            values.push(`%${lecturingFilter.professorName}%`)
            sqlWithFilter += ` AND p.name LIKE $${values.length}`
        }
        if(lecturingFilter?.professorSiape){
            values.push(`%${lecturingFilter.professorSiape}%`)
            sqlWithFilter += ` AND p.siape LIKE $${values.length}`
        }
        if(lecturingFilter?.professorDepartmentName){
            values.push(`%${lecturingFilter.professorDepartmentName}%`)
            sqlWithFilter += ` AND dpt.name LIKE $${values.length}`
        }
        if(lecturingFilter?.professorDepartmentId){
            values.push(`%${lecturingFilter.professorDepartmentId}%`)
            sqlWithFilter += ` AND p.department_id = $${values.length}`
        }
        
        return { sqlWithFilter, valuesWithFilter }
    }

}