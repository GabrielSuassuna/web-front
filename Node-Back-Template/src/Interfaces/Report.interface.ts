export interface ReportInterface {
  id: string
  feedback_id: string
  author_id: string
  reviewer_id: string
  author_name: string
  author_siape: string
  reviewer_name?: string
  reviewer_siape?: string
  status: string
  title: string
}