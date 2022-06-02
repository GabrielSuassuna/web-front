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
            SELECT * 
              FROM professor 
             WHERE department_id = $1
               AND is_course_coordinator = TRUE
        `

        const values = [
            departmentId
        ]
        
        return await this.queryHandler.runQuery(SQL, values)

    }

    public async getDepartmentChief(departmentId: string): Promise<GetDepartment[]>{
        const SQL = `
            SELECT * 
              FROM professor 
             WHERE department_id = $1
               AND is_head_of_department = TRUE
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
                description
            )
            VALUES (
                $1,
                $2,
                $3
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
                description = $2
            WHERE id = $3
        `
        const values = [
            department.name,
            department.description,
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
        console.log({ sqlWithFilter, valuesWithFilter })
        return { sqlWithFilter, valuesWithFilter }
    }
}