import { GetTag } from "./GetTag.interface"

export interface GetDiscipline {
  id: string
  code: string
  name: string
  description: string
  hours: number
  tags?: GetTag[]
  feedback_count?: number
  general_score?: number
}