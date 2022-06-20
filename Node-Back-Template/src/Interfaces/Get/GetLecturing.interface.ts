export interface GetLecturing {
  id: string,
  discipline_id?: string,
  professor_id?: string,
  discipline_name: string,
  discipline_code: string,
  professor_name: string,
  professor_siape: string,
  professor_department: string,
  feedback_count: number,
  average_score: number
}