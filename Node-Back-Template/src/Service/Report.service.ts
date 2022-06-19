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

export class ReportService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getAllOpen(request: Request, response: Response){
        const sucessMessage: string = "Denúncias encontrados com sucesso"
        const errorMessage: string = "Erro ao encontrar denúncia"
        const notFoundMessage: string = "Denúncias não encontradas"
        const notAuthorizedMessage: string = "Usuário não autorizado para ver denúncias abertas"
    
        let result: ReportInterface[] = []
    
        try{
            
            const { 
                viewerId,
                authorName, 
                authorSiape
            } = request.query as any

            
            const reportFilter: ReportFilter = { authorName, authorSiape }

            const viewer: GetProfessor[] = await this.repositoryUoW.professorRepository.getById(viewerId);
            const department: GetDepartment[] = await this.repositoryUoW.departmentRepository.getById(viewer[0].department_id);

            if(viewerId != department[0].course_coordinator_id && viewerId != department[0].department_head_id)
              return response.status(401).json(setApiResponse<ReportInterface[]>(result, notAuthorizedMessage))

            const toBeFoundReports: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllOpen(viewerId, viewer[0].department_id, reportFilter)
            //const toBeFoundReports: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllOpen(viewerId, viewer[0].department_id)

            if(!!toBeFoundReports.length){
                return response.status(200).json(setApiResponse<ReportInterface[]>(toBeFoundReports, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<ReportInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<ReportInterface[]>(result, errorMessage, err.message))
        }
    }

    public async getByAuthor(request: Request, response: Response){
      const sucessMessage: string = "Denúncias encontrados com sucesso"
      const errorMessage: string = "Erro ao encontrar denúncia"
      const notFoundMessage: string = "Denúncias não encontradas"
  
      let result: ReportInterface[] = []
  
      try{
        
          const authorId: string = request.params.professorId
          const { 
              reviewerName, 
              reviewerSiape,
              status,
          } = request.query as any
          
          const reportFilter: ReportFilter = { reviewerName, reviewerSiape, status }

          //const toBeFoundReports: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllByAuthor(authorId, reportFilter)
          const toBeFoundReports: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllByAuthor(authorId, reportFilter)

          if(!!toBeFoundReports.length){
              return response.status(200).json(setApiResponse<ReportInterface[]>(toBeFoundReports, sucessMessage))
          }
          
          return response.status(404).json(setApiResponse<ReportInterface[]>(result, notFoundMessage))
      }
      catch(err: any){
          return response.status(400).json(setApiResponse<ReportInterface[]>(result, errorMessage, err.message))
      }
    }

    public async getByReviewer(request: Request, response: Response){
      const sucessMessage: string = "Denúncias encontrados com sucesso"
      const errorMessage: string = "Erro ao encontrar denúncia"
      const notFoundMessage: string = "Denúncias não encontradas"
  
      let result: ReportInterface[] = []
  
      try{
        
          const reviewerId: string = request.params.professorId
          const { 
              authorName, 
              authorSiape,
              status,
          } = request.query as any
          
          const reportFilter: ReportFilter = { authorName, authorSiape, status }

          //const toBeFoundReports: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllByReviewer(reviewerId, reportFilter)
          const toBeFoundReports: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllByReviewer(reviewerId, reportFilter)

          if(!!toBeFoundReports.length){
              return response.status(200).json(setApiResponse<ReportInterface[]>(toBeFoundReports, sucessMessage))
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
            const { feedback_id, author_id, description, date } = toBeCreatedReport

            await this.repositoryUoW.beginTransaction();
            
            const reportId: string = await this.repositoryUoW.reportRepository.create(feedback_id, author_id)

            const toBeCreatedReportLog: PostReportLog = {
              date: date,
              title: 'Feedback denunciado',
              description: description,
            }

            await this.repositoryUoW.reportLogRepository.create(toBeCreatedReportLog, reportId, author_id)
            
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

            await this.repositoryUoW.reportLogRepository.create(toBeCreatedReportLog, reportId, toBeupdatedReport.author_id)

            const toBeUpdatedReportLog:PutReportUpdate = {
              reviewer_id: toBeupdatedReport.status === "EM REVISÃO" ? toBeupdatedReport.author_id : undefined,
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