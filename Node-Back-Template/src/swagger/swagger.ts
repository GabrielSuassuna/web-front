import { Professor } from './Models/Professor.swagger'
import { Lecturing } from './Models/Lecturing.swagger'
import { Department } from './Models/Department.swagger'
import { Discipline } from './Models/Discipline.swagger'
import { Feedback } from './Models/Feedback.swagger'
import { Tag } from './Models/Tag.swagger'
import { Report } from './Models/Report.swagger'

import { PostAuth } from './Models/Post/Auth.swagger'

import { GetProfessor } from './Models/Get/Professor.swagger'
import { PutProfessor } from './Models/Put/Professor.swagger'
import { PostProfessor } from './Models/Post/Professor.swagger'

import { GetLecturing } from './Models/Get/Lecturing.swagger'

import { PostDepartment } from './Models/Post/Department.swagger'
import { PutDepartment } from './Models/Put/Department.swagger'

import { GetStudent } from './Models/Get/Student.swagger'
import { PostStudent } from './Models/Post/Student.swagger'
import { PutStudent } from './Models/Put/Student.swagger'

import { GetDiscipline } from './Models/Get/Discipline.swagger'
import { PostDiscipline } from './Models/Post/Discipline.swagger'
import { PutDiscipline } from './Models/Put/Discipline.swagger'

import { GetFaq } from './Models/Get/Faq.swagger'
import { PostFaq } from './Models/Post/Faq.swagger'
import { PutFaq } from './Models/Put/Faq.swagger'

import { GetFeedback } from './Models/Get/Feedback.swagger'
import { PostFeedback } from './Models/Post/Feedback.swagger'

import { GetHasVote } from './Models/Get/HasVote.swagger'
import { PostHasVote } from './Models/Post/HasVote.swagger'
import { PutHasVote } from './Models/Put/HasVote.swagger'

import { GetTag } from './Models/Get/Tag.swagger'
import { PostTag } from './Models/Post/Tag.swagger'
import { PutTag } from './Models/Put/Tag.swagger'

import { GetNotification } from './Models/Get/Notification.swagger'

import { GetReport } from './Models/Get/Report.swagger'
import { GetReportLog } from './Models/Get/ReportLog.swagger'
import { PostReport } from './Models/Post/Report.swagger'
import { PutReportLog } from './Models/Put/ReportLog.swagger'

import { AuthPaths } from './Paths/Auth.swagger'
import { ProfessorPaths } from './Paths/Professor.swagger'
import { LecturingPaths } from './Paths/Lecturing.swagger'
import { DepartmentPaths } from './Paths/Department.swagger'
import { StudentPaths } from './Paths/Student.swagger'
import { DisciplinePaths } from './Paths/Discipline.swagger'
import { FaqPaths } from './Paths/Faq.swagger'
import { FeedbackPaths } from './Paths/Feedback.swagger'
import { HasVotePaths } from './Paths/HasVote.swagger'
import { TagPaths } from './Paths/Tag.swagger'
import { NotificationPaths } from './Paths/Notification.swagger'
import { ReportPaths } from './Paths/Report.swagger'

export const swaggerDocument = {
    "openapi": "3.0.1",
    "info": {
        "version": "1.0.0",
        "title": "Web API Document",
        "license": {
          "name": 'Apache 2.0',
          "url": 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    "basePath": "/",
    "schemes": ["http"],
    "host": "localhost:3000",
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "tags": [
        {
          "name": "Auth",
          "description": "Todos os endpoints relacionados com a autenticação de usuários."
        },
        {
          "name": "Professor",
          "description": "Todos os endpoints relacionados com membros do corpo docente."
        },
        {
          "name": "Lecturing",
          "description": "Todos os endpoints relacionados com disciplinas ministradas por um membro do corpo docente."
        },
        {
          "name": "Department",
          "description": "Todos os endpoints relacionados com departamentos."
        },
        {
          "name": "Student",
          "description": "Todos os endpoints relacionados com membros do corpo discente."
        },
        {
          "name": "Discipline",
          "description": "Todos os endpoints relacionados com disciplinas."
        },
        {
          "name": "Faq",
          "description": "Todos os endpoints relacionados com perguntas frequentes (FAQ)."
        },
        {
          "name": "Feedback",
          "description": "Todos os endpoints relacionados com feedbacks."
        },
        {
          "name": "HasVote",
          "description": "Todos os endpoints relacionados com interações com feedbacks."
        },
        {
          "name": "Tag",
          "description": "Todos os endpoints relacionados com tags (características)."
        },
        {
          "name": "Notification",
          "description": "Todos os endpoints relacionados com notificações."
        },
        {
          "name": "Report",
          "description": "Todos os endpoints relacionados com denúncias."
        }
    ],
    "paths": {
      ...AuthPaths,
      ...ProfessorPaths,
      ...LecturingPaths,
      ...DepartmentPaths,
      ...StudentPaths,
      ...DisciplinePaths,
      ...FaqPaths,
      ...FeedbackPaths,
      ...HasVotePaths,
      ...TagPaths,
      ...NotificationPaths,
      ...ReportPaths,
    },
    "components": {
      "schemas":{
        PostAuth,
        Professor,
        GetProfessor,
        PutProfessor,
        PostProfessor,
        Lecturing,
        GetLecturing,
        Department,
        PostDepartment,
        PutDepartment,
        GetStudent,
        PostStudent,
        PutStudent,
        Discipline,
        GetDiscipline,
        PostDiscipline,
        PutDiscipline,
        GetFaq,
        PostFaq,
        PutFaq,  
        Feedback,
        GetFeedback,
        PostFeedback,
        GetHasVote,
        PostHasVote,
        PutHasVote,
        Tag,
        GetTag,
        PostTag,
        PutTag,
        GetNotification,
        Report,
        GetReport,
        GetReportLog,
        PostReport,
        PutReportLog,
      },
      "securitySchemes": {
        "Bearer": {
          "type": "http",
          "in": "header",
          "description": "JWT Authorization header using the Bearer scheme.",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      }
    },
}