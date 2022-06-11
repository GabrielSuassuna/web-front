export interface GetFeedback {
  id: string
  lecturing_id: string
  student_id: string
  title: string
  professor_name: string
  professor_siape: string
  discipline_name: string
  discipline_code: string
  description: string
  period: string
  general_score: number
  assiduity_score: number
  clarity_score: number
  relationship_score: number
  date: Date
  tags: string[]
}