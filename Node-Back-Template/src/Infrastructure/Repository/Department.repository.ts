import { QueryHandler } from "../Handlers/Query.handler"

import { DepartmentInterface } from "../../Interfaces/Department.interface"
import { Client } from "pg"
import { GetDepartment } from "../../Interfaces/Get/GetDepartment.interface"
import { PostDepartment } from "../../Interfaces/Post/PostDepartment.interface"
import { PutDepartment } from "../../Interfaces/Put/PutDepartment.interface"
import { DepartmentFilter } from "../../Interfaces/Filters/DepartmentFilter.interface"

export class DepartmentRepository {
    queryHandler: QueryHandler<GetDepartment>

    constructor(client: Client){
        this.queryHandler = new QueryHandler(client)
    }

    public async getAll(departmentFilter: DepartmentFilter | null = null): Promise<DepartmentInterface[]>{
        const SQL = `
            SELECT * FROM department
        `

        let values: any[] = []

        const { sqlWithFilter, valuesWithFilter } = this.applyGetAllFilters(SQL, values, departmentFilter)
        
        return await this.queryHandler.runQuery(sqlWithFilter, valuesWithFilter)
    }

    public async getById(departmentId: string): Promise<GetDepartment[]>{
        const SQL = `
            SELECT * FROM department WHERE id = $1
        `

        const values = [
            departmentId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async getDepartmentCoordinator(departmentId: string): Promise<GetDepartment[]>{
        const SQL = `
            SELECT p.*
              FROM professor as p
              INNER JOIN department as d 
              ON p.id = d.course_coordinator_id
             WHERE d.id = $1
        `

        const values = [
            departmentId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async getDepartmentChief(departmentId: string): Promise<GetDepartment[]>{
        const SQL = `
            SELECT p.*
              FROM professor as p
              INNER JOIN department as d 
              ON p.id = d.department_head_id
             WHERE d.id = $1
        `

        const values = [
            departmentId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async create(department: PostDepartment): Promise<string> {
        const newId = await this.queryHandler.getSequence("department")
        
        const SQL = `
            INSERT INTO department(
                id,
                name,
                description,
                department_head_id,
                course_coordinator_id
            )
            VALUES (
                $1,
                $2,
                $3,
                NULL,
                NULL
            )
        `
        const values = [
            newId,
            department.name,
            department.description,
        ]

        await this.queryHandler.runQuery(SQL, values)
        
        return newId;
    }
    
    public async update(department: PutDepartment, departmentId: string): Promise<void> {
        const SQL = `
            UPDATE department
            SET name = $1,
                description = $2,
                course_coordinator_id = $3,
                department_head_id = $4
            WHERE id = $5
        `
        const values = [
            department.name,
            department.description,
            department.course_coordinator_id,
            department.department_head_id,
            departmentId
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async updateCourseCoordinator(departmentId: string, professorId?: string): Promise<void> {
        const SQL = `
            UPDATE department
            SET course_coordinator_id = $1
            WHERE id = $2
        `
        const values = [
            professorId,
            departmentId
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async updateDepartmentHead(departmentId: string, professorId?: string): Promise<void> {
        const SQL = `
            UPDATE department
            SET department_head_id = $1
            WHERE id = $2
        `
        const values = [
            professorId,
            departmentId
        ]
        
        await this.queryHandler.runQuery(SQL, values)
    }

    public async delete(departmentId: string): Promise<void> {
        const SQL = `
            DELETE FROM department
            WHERE id = $1
        `
        const values = [
          departmentId
        ]

        await this.queryHandler.runQuery(SQL, values)
    }

    private applyGetAllFilters(SQL: string, values: any[], deparmentFilter: DepartmentFilter | null = null){
        let sqlWithFilter = SQL
        let valuesWithFilter = values

        sqlWithFilter += 'WHERE 0=0'

        if(deparmentFilter?.name){
            values.push(`%${deparmentFilter.name}%`)
            sqlWithFilter += ` AND name LIKE $${values.length}`
        }
        
        return { sqlWithFilter, valuesWithFilter }
    }
}