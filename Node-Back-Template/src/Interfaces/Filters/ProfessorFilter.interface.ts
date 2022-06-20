import { PaginationFilter } from "./Pagination.interface"

export interface ProfessorFilter extends PaginationFilter {
    name: string
    siape: string
    departmentId: string
}