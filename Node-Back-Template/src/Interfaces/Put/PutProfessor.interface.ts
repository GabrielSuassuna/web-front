export interface PutProfessor {
  departmentId: string
  siape: string
  password: string
  name: string
  about: string
  lattes_url: string
  is_head_of_department: boolean
  is_course_coordinator: boolean
}