import { PaginationFilter } from "./Pagination.interface"

export interface FeedbackFilter extends PaginationFilter {
  disciplineName: string
  disciplineCode: string
  disciplineHours: number
  professorName: string
  professorSiape: string
  professorDepartmentName: string
  professorDepartmentId: string
  title: string
  period: string
}