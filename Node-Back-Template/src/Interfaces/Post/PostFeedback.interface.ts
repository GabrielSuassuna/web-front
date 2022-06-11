export interface PostFeedback {
  lecturing_id: string
  student_id: string
  title: string
  description: string
  period: string
  general_score: number
  assiduity_score: number
  clarity_score: number
  relationship_score: number
  date: Date
}