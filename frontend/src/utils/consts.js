const SEARCH_RESULT_TYPES = {
  DISCIPLINE: 'DISCIPLINE',
  LECTURING: 'LECTURING',
  FEEDBACK: 'FEEDBACK',
  PROFESSOR: 'PROFESSOR',
  REPORT: 'REPORT'
}

const REPORT_UPDATE_TYPES = {
  OPEN: 'ABERTO', // Denúncia aberta
  IN_REVISION: 'EM_REVISAO', // Denúncia aceita para revisão
  REMOVED: 'REMOVIDO', // Denúncia removida da plataforma
  REVOKED: 'REVOGADO', // Denúncia revogada pelo revisor
}

const REPORT_UPDATE_TRANSLATION = {
  OPEN: 'Feedback denunciado', // Denúncia aberta
  ABERTO: 'Feedback denunciado', // Denúncia aberta
  IN_REVISION: 'Feedback em revisão', // Denúncia aceita para revisão
  EM_REVISAO: 'Feedback em revisão', // Denúncia aceita para revisão
  REMOVED: 'Feedback removido da plataforma', // Denúncia removida da plataforma
  REMOVIDO: 'Feedback removido da plataforma', // Denúncia removida da plataforma
  REVOKED: 'Denúncia revogada pelo revisor', // Denúncia revogada pelo revisor
  REVOGADO: 'Denúncia revogada pelo revisor', // Denúncia revogada pelo revisor
}

const REPORT_UPDATE_FILLER = {
  [REPORT_UPDATE_TYPES.OPEN]: 'Denunciado por ', // Denúncia aberta
  [REPORT_UPDATE_TYPES.IN_REVISION]: 'Revisado por ', // Denúncia aceita para revisão
  [REPORT_UPDATE_TYPES.REMOVED]: 'Removido por ', // Denúncia removida da plataforma
  [REPORT_UPDATE_TYPES.REVOKED]: 'Revogada por ', // Denúncia revogada pelo revisor
}

const AUTH_LEVELS = {
  GUEST: 'GUEST', // Apenas usuário não logados
  STUDENT: 'STUDENT', // Estudantes
  PROFESSOR: 'PROFESSOR', // Professores
  HEAD: 'HEAD', // Coordenadores de curso e chefes de departamento
  ADMIN: 'ADMIN' // Administradores do sistema
}

const PAGE_LIMIT = 10;

export { SEARCH_RESULT_TYPES, REPORT_UPDATE_TYPES, REPORT_UPDATE_TRANSLATION, REPORT_UPDATE_FILLER, AUTH_LEVELS, PAGE_LIMIT }