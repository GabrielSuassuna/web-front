export interface PostFeedback {
  lecturingId: string
  studentId: string
  title: string
  description: string
  period: string
  generalScore: number
  assiduityScore: number
  clarityScore: number
  relationshipScore: number
  date: Date
  tags: string[]
}