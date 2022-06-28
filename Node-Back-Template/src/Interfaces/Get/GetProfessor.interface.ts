import { GetTag } from "./GetTag.interface"

export interface GetProfessor {
  id: string
  department_id: string
  department_name: string
  siape: string
  name: string
  about: string
  lattes_url: string
  tags?: GetTag[]
}