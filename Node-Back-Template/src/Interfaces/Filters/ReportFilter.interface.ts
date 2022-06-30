import { PaginationFilter } from "./Pagination.interface"

export interface ReportFilter extends PaginationFilter {
    authorName?: string
    authorSiape?: string
    reviewerName?: string
    reviewerSiape?: string
    status?: string
    title?: string
}