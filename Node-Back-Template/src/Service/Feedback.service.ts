import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { FeedbackFilter } from '../Interfaces/Filters/FeedbackFilter.interface'
import { GetDepartment } from '../Interfaces/Get/GetDepartment.interface'
import { GetFeedback } from '../Interfaces/Get/GetFeedback.interface'
import { PostFeedback } from '../Interfaces/Post/PostFeedback.interface'
import { FeedbackInterface } from '../Interfaces/Feedback.interface'
import { PutFeedback } from '../Interfaces/Put/PutFeedback.interface'
import { TagInterface } from '../Interfaces/Tag.interface'
import { GetHasTag } from '../Interfaces/Get/GetHasTag.interface'

export class FeedbackService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getAll(request: Request, response: Response){
        const sucessMessage: string = "Feedbacks encontrados com sucesso"
        const errorMessage: string = "Erro ao encontrar feedbacks"
        const notFoundMessage: string = "Feedbacks não encontrados"
    
        let result: FeedbackInterface[] = []
    
        try{
            
            const { 
              professorName,
              professorSiape,
              disciplineName,
              disciplineCode,
              title,
            } = request.query as any
            
            const feedbackFilter: FeedbackFilter = { professorName, professorSiape, disciplineName, disciplineCode, title }

            let toBeFoundFeedbacks: FeedbackInterface[] = await this.repositoryUoW.feedbackRepository.getAll(feedbackFilter)

            for(let i = 0; i < toBeFoundFeedbacks.length; i++){
                const toBeFoundTags: GetHasTag[] = await this.repositoryUoW.hasTagRepository.getByFeedbackId(toBeFoundFeedbacks[i].id)
                toBeFoundFeedbacks[i].tags = toBeFoundTags.map(t => t.tag_name)
            }

            console.log(toBeFoundFeedbacks[0])

            if(!!toBeFoundFeedbacks.length){
                return response.status(200).json(setApiResponse<FeedbackInterface[]>(toBeFoundFeedbacks, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<FeedbackInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<FeedbackInterface[]>(result, errorMessage, err.message))
        }
    }

    public async getStudentFeedbacks(request: Request, response: Response){
      const sucessMessage: string = "Feedbacks encontrados com sucesso"
      const errorMessage: string = "Erro ao encontrar feedbacks"
      const notFoundMessage: string = "Feedbacks não encontrados"
  
      let result: FeedbackInterface[] = []
  
      try{
          const studentId: string = request.params.studentId
          
          const { 
            professorName,
            professorSiape,
            disciplineName,
            disciplineCode,
            title,
          } = request.query as any
          
          const feedbackFilter: FeedbackFilter = { professorName, professorSiape, disciplineName, disciplineCode, title }

          const toBeFoundFeedbacks: FeedbackInterface[] = await this.repositoryUoW.feedbackRepository.getStudentFeedbacks(studentId, feedbackFilter)

          for(let i = 0; i < toBeFoundFeedbacks.length; i++){
            const toBeFoundTags: GetHasTag[] = await this.repositoryUoW.hasTagRepository.getByFeedbackId(toBeFoundFeedbacks[i].id)
            toBeFoundFeedbacks[i].tags = toBeFoundTags.map(t => t.tag_name)
          }

          if(!!toBeFoundFeedbacks.length){
              return response.status(200).json(setApiResponse<FeedbackInterface[]>(toBeFoundFeedbacks, sucessMessage))
          }
          
          return response.status(404).json(setApiResponse<FeedbackInterface[]>(result, notFoundMessage))
      }
      catch(err: any){
          return response.status(400).json(setApiResponse<FeedbackInterface[]>(result, errorMessage, err.message))
      }
    }

    public async getProfessorFeedbacks(request: Request, response: Response){
      const sucessMessage: string = "Feedbacks encontrados com sucesso"
      const errorMessage: string = "Erro ao encontrar feedbacks"
      const notFoundMessage: string = "Feedbacks não encontrados"
  
      let result: FeedbackInterface[] = []
  
      try{
          const professorId: string = request.params.professorId
          
          const { 
            professorName,
            professorSiape,
            disciplineName,
            disciplineCode,
            title,
          } = request.query as any
          
          const feedbackFilter: FeedbackFilter = { professorName, professorSiape, disciplineName, disciplineCode, title }

          const toBeFoundFeedbacks: FeedbackInterface[] = await this.repositoryUoW.feedbackRepository.getProfessorFeedbacks(professorId, feedbackFilter)

          for(let i = 0; i < toBeFoundFeedbacks.length; i++){
            const toBeFoundTags: GetHasTag[] = await this.repositoryUoW.hasTagRepository.getByFeedbackId(toBeFoundFeedbacks[i].id)
            toBeFoundFeedbacks[i].tags = toBeFoundTags.map(t => t.tag_name)
          }
          
          if(!!toBeFoundFeedbacks.length){
              return response.status(200).json(setApiResponse<FeedbackInterface[]>(toBeFoundFeedbacks, sucessMessage))
          }

          return response.status(404).json(setApiResponse<FeedbackInterface[]>(result, notFoundMessage))
      }
      catch(err: any){
          return response.status(400).json(setApiResponse<FeedbackInterface[]>(result, errorMessage, err.message))
      }
    }

    public async getById(request: Request, response: Response){
        const sucessMessage: string = "Feedback encontrado com sucesso"
        const errorMessage: string = "Erro ao encontrar feedback"
        const notFoundMessage: string = "Feedback não encontrado"
    
        let result: GetFeedback[] = []
    
        try{
            const feedbackId: string = request.params.feedbackId
            
            const toBeFoundFeedback: GetFeedback[] = await this.repositoryUoW.feedbackRepository.getById(feedbackId)
            
            if(!!toBeFoundFeedback.length){
                return response.status(200).json(setApiResponse<GetFeedback[]>(toBeFoundFeedback, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<GetFeedback[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<GetFeedback[]>(result, errorMessage, err.message))
        }    
    }

    public async create(request: Request, response: Response){    
        const sucessMessage: string = "Feedback criado com sucesso"
        const errorMessage: string = "Erro ao criar feedback"
        
        let result: GetFeedback[] = []
    
        try{
            const toBeCreatedFeedback: PostFeedback = request.body
            const { lecturing_id, student_id } = toBeCreatedFeedback

            await this.repositoryUoW.beginTransaction();

            const feedbackId: string = await this.repositoryUoW.feedbackRepository.create(toBeCreatedFeedback, lecturing_id, student_id)

            for(let tagIndex in toBeCreatedFeedback.tags){
                await this.repositoryUoW.hasTagRepository.create(feedbackId, toBeCreatedFeedback.tags[tagIndex])
            }

            const toBeFoundFeedback: GetFeedback[] = await this.repositoryUoW.feedbackRepository.getById(feedbackId)
            const toBeFoundTags: GetHasTag[] = await this.repositoryUoW.hasTagRepository.getByFeedbackId(feedbackId)

            const tagsArray = toBeFoundTags.map(t => t.tag_name);

            console.log(feedbackId)
            console.log(toBeFoundFeedback)

            result = [{
                ...toBeFoundFeedback[0],
                tags: tagsArray
            }]

            await this.repositoryUoW.commit();
            
            return response.status(200).json(setApiResponse<GetFeedback[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetFeedback[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "Feedback deletado com sucesso"
        const errorMessage: string = "Erro ao deletar feedback"
        
        let result: GetFeedback[] = []
    
        try{
            const feedbackId: string = request.params.feedbackId
            
            await this.repositoryUoW.beginTransaction();

            await this.repositoryUoW.reportLogRepository.deleteByFeedbackId(feedbackId)
            await this.repositoryUoW.reportRepository.deleteByFeedbackId(feedbackId)
            await this.repositoryUoW.hasTagRepository.deleteByFeedbackId(feedbackId)
            await this.repositoryUoW.hasVoteRepository.deleteByFeedbackId(feedbackId)
            await this.repositoryUoW.feedbackRepository.delete(feedbackId)
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetFeedback[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetFeedback[]>(result, errorMessage, err.message))
        }
    }
}