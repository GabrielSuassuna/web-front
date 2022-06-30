import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { ReportFilter } from '../Interfaces/Filters/ReportFilter.interface'
import { GetReport } from '../Interfaces/Get/GetReport.interface'
import { PostReport } from '../Interfaces/Post/PostReport.interface'
import { ReportInterface } from '../Interfaces/Report.interface'
import { PutReport } from '../Interfaces/Put/PutReport.interface'
import { GetFeedback } from '../Interfaces/Get/GetFeedback.interface'
import { GetReportLog } from '../Interfaces/Get/GetReportLog.interface'
import { PostReportLog } from '../Interfaces/Post/PostReportLog.interface'
import { PutReportUpdate } from '../Interfaces/Put/PutReportUpdate.interface'
import { GetDepartment } from '../Interfaces/Get/GetDepartment.interface'
import { GetProfessor } from '../Interfaces/Get/GetProfessor.interface'
import { PostStudentNotification } from '../Interfaces/Post/PostStudentNotification.interface'
import { PostProfessorNotification } from '../Interfaces/Post/PostProfessorNotification.interface'

export class ReportService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getAllOpen(request: Request, response: Response){
        const errorMessage: string = "Erro ao encontrar denúncia"
        const notFoundMessage: string = "Denúncias não encontradas"
        const notAuthorizedMessage: string = "Usuário não autorizado para ver denúncias abertas"
    
        let result: ReportInterface[] = []
    
        try{
            
            const { 
                viewerId,
                authorName, 
                authorSiape,
                title,
                page,
                limit
            } = request.query as any

            
            const reportFilter: ReportFilter = { authorName, authorSiape, title, page, limit }

            const viewer: GetProfessor[] = await this.repositoryUoW.professorRepository.getById(viewerId);
            const department: GetDepartment[] = await this.repositoryUoW.departmentRepository.getById(viewer[0].department_id);

            if(viewerId != department[0].course_coordinator_id && viewerId != department[0].department_head_id)
              return response.status(401).json(setApiResponse<ReportInterface[]>(result, notAuthorizedMessage))

            const toBeFoundReports: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllOpen(viewerId, viewer[0].department_id, reportFilter)

            if(!!toBeFoundReports.length){
                let nextPageFilter: ReportFilter = {
                    ...reportFilter,
                    limit: 1,
                    page: reportFilter.page*reportFilter.limit+1
                };
                const nextPage: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllOpen(viewerId, viewer[0].department_id, nextPageFilter)
                let successMessage: string = `Denúncias encontrados com sucesso. last=${nextPage.length > 0 ? "FALSE" : "TRUE"}`
                return response.status(200).json(setApiResponse<ReportInterface[]>(toBeFoundReports, successMessage))
            }
            
            return response.status(404).json(setApiResponse<ReportInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<ReportInterface[]>(result, errorMessage, err.message))
        }
    }

    public async getByAuthor(request: Request, response: Response){
      const errorMessage: string = "Erro ao encontrar denúncia"
      const notFoundMessage: string = "Denúncias não encontradas"
  
      let result: ReportInterface[] = []
  
      try{
        
          const authorId: string = request.params.professorId
          const { 
              reviewerName, 
              reviewerSiape,
              status,
              title,
              page,
              limit
          } = request.query as any
          
          const reportFilter: ReportFilter = { reviewerName, reviewerSiape, status, title, page, limit }

          const toBeFoundReports: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllByAuthor(authorId, reportFilter)

          if(!!toBeFoundReports.length){
            let nextPageFilter: ReportFilter = {
                ...reportFilter,
                limit: 1,
                page: reportFilter.page*reportFilter.limit+1
            };
            const nextPage: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllByAuthor(authorId, nextPageFilter)
            let successMessage: string = `Denúncias encontrados com sucesso. last=${nextPage.length > 0 ? "FALSE" : "TRUE"}`
            return response.status(200).json(setApiResponse<ReportInterface[]>(toBeFoundReports, successMessage))
          }
          
          return response.status(404).json(setApiResponse<ReportInterface[]>(result, notFoundMessage))
      }
      catch(err: any){
          return response.status(400).json(setApiResponse<ReportInterface[]>(result, errorMessage, err.message))
      }
    }

    public async getByReviewer(request: Request, response: Response){
      const errorMessage: string = "Erro ao encontrar denúncia"
      const notFoundMessage: string = "Denúncias não encontradas"
  
      let result: ReportInterface[] = []
  
      try{
        
          const reviewerId: string = request.params.professorId
          const { 
              authorName, 
              authorSiape,
              status,
              title,
              page,
              limit
          } = request.query as any
          
          const reportFilter: ReportFilter = { authorName, authorSiape, status, title, page, limit }

          const toBeFoundReports: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllByReviewer(reviewerId, reportFilter)

          if(!!toBeFoundReports.length){
            let nextPageFilter: ReportFilter = {
                ...reportFilter,
                limit: 1,
                page: reportFilter.page*reportFilter.limit+1
            };
            const nextPage: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllByReviewer(reviewerId, nextPageFilter)
            let successMessage: string = `Denúncias encontrados com sucesso. last=${nextPage.length > 0 ? "FALSE" : "TRUE"}`
            return response.status(200).json(setApiResponse<ReportInterface[]>(toBeFoundReports, successMessage))
          }
          
          return response.status(404).json(setApiResponse<ReportInterface[]>(result, notFoundMessage))
      }
      catch(err: any){
          return response.status(400).json(setApiResponse<ReportInterface[]>(result, errorMessage, err.message))
      }
    }

    public async getById(request: Request, response: Response){
        const sucessMessage: string = "Report encontrado com sucesso"
        const errorMessage: string = "Erro ao encontrar report"
        const notFoundMessage: string = "Report não encontrado"
    
        let result: GetReport[] = []
    
        try{
            const reportId: string = request.params.reportId
            
            const toBeFoundReport: GetReport[] = await this.repositoryUoW.reportRepository.getById(reportId)
            const toBeFoundFeedback: GetFeedback[] = await this.repositoryUoW.feedbackRepository.getById(toBeFoundReport[0].feedback_id)
            const toBeFoundLogs: GetReportLog[] = await this.repositoryUoW.reportLogRepository.getAll(reportId)
            
            if(!!toBeFoundReport.length){
                result = [
                  {
                    ...toBeFoundReport[0],
                    feedback: toBeFoundFeedback[0],
                    logs: toBeFoundLogs
                  }
                ]
                return response.status(200).json(setApiResponse<GetReport[]>(result, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<GetReport[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<GetReport[]>(result, errorMessage, err.message))
        }    
    }

    public async create(request: Request, response: Response){    
        const sucessMessage: string = "Report criado com sucesso"
        const errorMessage: string = "Erro ao criar report"
        
        let result: GetReport[] = []
    
        try{
            const toBeCreatedReport: PostReport = request.body
            const { feedbackId, authorId, description, date } = toBeCreatedReport

            await this.repositoryUoW.beginTransaction();
            
            const reportId: string = await this.repositoryUoW.reportRepository.create(feedbackId, authorId)

            const toBeCreatedReportLog: PostReportLog = {
              date: date,
              title: 'Feedback denunciado',
              description: description,
            }

            await this.repositoryUoW.reportLogRepository.create(toBeCreatedReportLog, reportId, authorId)
            
            const toBeFoundReport: GetReport[] = await this.repositoryUoW.reportRepository.getById(reportId)
            const toBeFoundFeedback: GetFeedback[] = await this.repositoryUoW.feedbackRepository.getById(toBeFoundReport[0].feedback_id)
            const toBeFoundLogs: GetReportLog[] = await this.repositoryUoW.reportLogRepository.getAll(reportId)
            
            await this.repositoryUoW.commit();

            result = [
              {
                ...toBeFoundReport[0],
                feedback: toBeFoundFeedback[0],
                logs: toBeFoundLogs
              }
            ]

            const student = await this.repositoryUoW.studentRepository.getByFeedbackId(feedbackId)
            const notification: PostStudentNotification = {
                student_id: student[0].id,
                message: "Seu feedback foi denunciado, não se preocupe, você permanece anônimo, mas tente não fazer isso de novo."
            }
            await this.repositoryUoW.studentNotificationRepository.create(notification, student[0].id);

            return response.status(200).json(setApiResponse<GetReport[]>(toBeFoundReport, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetReport[]>(result, errorMessage, err.message))
        }
    }
    
    public async update(request: Request, response: Response){    
        const sucessMessage: string = "Report atualizado com sucesso"
        const errorMessage: string = "Erro ao atualizar report"
        const notFoundMessage: string = "Report não encontrado"
        
        let result: GetReport[] = []
    
        try{
            const toBeupdatedReport: PutReport = request.body
            const reportId: string = request.params.reportId
            
            await this.repositoryUoW.beginTransaction();
            
            const toBeCreatedReportLog: PostReportLog = {
              date: toBeupdatedReport.date,
              title: toBeupdatedReport.title,
              description: toBeupdatedReport.description,
            }

            await this.repositoryUoW.reportLogRepository.create(toBeCreatedReportLog, reportId, toBeupdatedReport.authorId)

            const toBeUpdatedReportLog:PutReportUpdate = {
              reviewerId: toBeupdatedReport.status === "EM_REVISAO" ? toBeupdatedReport.authorId : undefined,
              status: toBeupdatedReport.status
            }
            
            const updatedReports = await this.repositoryUoW.reportRepository.update(toBeUpdatedReportLog, reportId)
            
            if(updatedReports.length == 0){
                await this.repositoryUoW.rollback();
                return response.status(404).json(setApiResponse<GetReport[]>(result, errorMessage, notFoundMessage))
            }

            const toBeFoundReport: GetReport[] = await this.repositoryUoW.reportRepository.getById(reportId)
            const toBeFoundFeedback: GetFeedback[] = await this.repositoryUoW.feedbackRepository.getById(toBeFoundReport[0].feedback_id)
            const toBeFoundLogs: GetReportLog[] = await this.repositoryUoW.reportLogRepository.getAll(reportId)
            
            await this.repositoryUoW.commit();

            result = [
              {
                ...toBeFoundReport[0],
                feedback: toBeFoundFeedback[0],
                logs: toBeFoundLogs
              }
            ]

            if(toBeupdatedReport.authorId != toBeFoundReport[0].author_id){
                const notification: PostProfessorNotification = {
                    professor_id: toBeFoundReport[0].author_id,
                    message: "Houve uma atualização na sua denúncia."
                }
                await this.repositoryUoW.professorNotificationRepository.create(notification, toBeFoundReport[0].author_id);
            }

            return response.status(200).json(setApiResponse<GetReport[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetReport[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "Report deletado com sucesso"
        const errorMessage: string = "Erro ao deletar report"
        
        let result: GetReport[] = []
    
        try{
            const reportId: string = request.params.reportId
            
            await this.repositoryUoW.beginTransaction();
            
            await this.repositoryUoW.reportLogRepository.deleteByReportId(reportId)
            await this.repositoryUoW.reportRepository.delete(reportId)

            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetReport[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetReport[]>(result, errorMessage, err.message))
        }
    }
}