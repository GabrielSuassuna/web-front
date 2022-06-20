import { PaginationFilter } from "./Pagination.interface"

export interface DisciplineFilter extends PaginationFilter{
    name: string
    code: string
    hours: string
}