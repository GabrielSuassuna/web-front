import { PaginationFilter } from "./Pagination.interface"

export interface FeedbackFilter extends PaginationFilter {
  professorName: string
  professorSiape: string
  disciplineName: string
  disciplineCode: string
  title: string
}