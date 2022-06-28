const SEARCH_RESULT_TYPES = {
  DISCIPLINE: 'DISCIPLINE',
  LECTURING: 'LECTURING',
  FEEDBACK: 'FEEDBACK',
  PROFESSOR: 'PROFESSOR',
}

const REPORT_UPDATE_TYPES = {
  OPENED: 'OPENED', // Denúncia aberta
  ACCEPTED: 'ACCEPTED', // Denúncia aceita para revisão
  CANCELLED: 'CANCELLED', // Revisão cancelada pelo revisor
  REMOVED: 'REMOVED', // Denúncia removida da plataforma
  REVOKED: 'REVOKED', // Denúncia revogada pelo revisor
  REOPENED: 'REOPENED', // Denúncia reaberta pelo professor
}

const REPORT_UPDATE_TRANSLATION = {
  OPENED: 'Feedback denunciado', // Denúncia aberta
  ACCEPTED: 'Feedback aceito para revisão', // Denúncia aceita para revisão
  CANCELLED: 'Revisão cancelada pelo revisor', // Revisão cancelada pelo revisor
  REMOVED: 'Feedback removido da plataforma', // Denúncia removida da plataforma
  REVOKED: 'Denúncia revogada pelo revisor', // Denúncia revogada pelo revisor
  REOPENED: 'Denúncia reaberta', // Denúncia reaberta pelo professor  
}

const REPORT_UPDATE_FILLER = {
  OPENED: 'Denunciado por', // Denúncia aberta
  ACCEPTED: 'Aceito por', // Denúncia aceita para revisão
  CANCELLED: 'Cancelado por', // Revisão cancelada pelo revisor
  REMOVED: 'Removidor por', // Denúncia removida da plataforma
  REVOKED: 'Revogado por', // Denúncia revogada pelo revisor
  REOPENED: 'Reaberto por', // Denúncia reaberta pelo professor  
}

const DUMMY_AUTH_TOKEN = "THIS IS A DUMMY TOKEN PLEASE REPLACE ME I'M ONLY FOR TESTING"

const DUMMY_STUDENT_ID = 1;

export { SEARCH_RESULT_TYPES, REPORT_UPDATE_TYPES, REPORT_UPDATE_TRANSLATION, REPORT_UPDATE_FILLER, DUMMY_AUTH_TOKEN, DUMMY_STUDENT_ID }