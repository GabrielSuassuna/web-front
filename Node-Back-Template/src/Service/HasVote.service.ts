import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { GetHasVote } from '../Interfaces/Get/GetHasVote.interface'
import { PostHasVote } from '../Interfaces/Post/PostHasVote.interface'
import { PutHasVote } from '../Interfaces/Put/PutHasVote.interface'

export class HasVoteService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async create(request: Request, response: Response){    
        const sucessMessage: string = "Interação criada com sucesso"
        const errorMessage: string = "Erro ao criar interação"
        
        let result: GetHasVote[] = []
    
        try{
            const toBeCreatedHasVote: PostHasVote = request.body
            const { feedback_id, student_id } = toBeCreatedHasVote

            await this.repositoryUoW.beginTransaction();
            
            const hasVoteId: string = await this.repositoryUoW.hasVoteRepository.create(toBeCreatedHasVote, feedback_id, student_id)

            await this.repositoryUoW.commit();
            
            result.push({
                id: hasVoteId,
                ...toBeCreatedHasVote, 
            })
            
            return response.status(200).json(setApiResponse<GetHasVote[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetHasVote[]>(result, errorMessage, err.message))
        }
    }
    
    public async update(request: Request, response: Response){    
        const sucessMessage: string = "Interação atualizada com sucesso"
        const errorMessage: string = "Erro ao atualizar interação"
        
        let result: GetHasVote[] = []
    
        try{
            const toBeupdatedHasVote: PutHasVote = request.body
            const feedbackId: string = request.params.feedbackId
            const { 
              studentId,
            } = request.query as any

            await this.repositoryUoW.beginTransaction();
            
            await this.repositoryUoW.hasVoteRepository.update(toBeupdatedHasVote, feedbackId, studentId)

            await this.repositoryUoW.commit();

            result = await this.repositoryUoW.hasVoteRepository.getByFeedbackAndStudent(feedbackId, studentId)

            return response.status(200).json(setApiResponse<GetHasVote[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetHasVote[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "HasVote deletado com sucesso"
        const errorMessage: string = "Erro ao deletar hasVote"
        
        let result: GetHasVote[] = []
    
        try{
            const feedbackId: string = request.params.feedbackId
            const { 
              studentId,
            } = request.query as any
            
            await this.repositoryUoW.beginTransaction();
            await this.repositoryUoW.hasVoteRepository.delete(feedbackId, studentId)
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetHasVote[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetHasVote[]>(result, errorMessage, err.message))
        }
    }
}