import { GetFeedback } from "./GetFeedback.interface"
import { GetReportLog } from "./GetReportLog.interface"

export interface GetReport {
  id: string
  feedback_id: string
  author_id: string
  reviewer_id: string
  author_name: string
  author_siape: string
  reviewer_name?: string
  reviewer_siape?: string
  status: string
  feedback: GetFeedback
  title: string
  logs: GetReportLog[]
}