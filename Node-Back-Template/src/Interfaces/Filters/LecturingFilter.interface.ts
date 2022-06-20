import { PaginationFilter } from "./Pagination.interface"

export interface LecturingFilter extends PaginationFilter {
  disciplineName: string
  disciplineCode: string
  professorName: string
  professorSiape: string
  professorDepartmentName: string
  professorDepartmentId: string
}