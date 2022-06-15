import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { FAQInterface } from '../Interfaces/FAQ.interface'
import { GetFAQ } from '../Interfaces/Get/GetFAQ.interface'
import { PostFAQ } from '../Interfaces/Post/PostFAQ.interface'
import { PutFAQ } from '../Interfaces/Put/PutFAQ.interface'

export class FAQService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getAll(request: Request, response: Response){
        const sucessMessage: string = "Professor encontrados com sucesso"
        const errorMessage: string = "Erro ao encontrar professor"
        const notFoundMessage: string = "Professores não encontrados"
    
        let result: FAQInterface[] = []
    
        try{
            const toBeFoundFAQ: FAQInterface[] = await this.repositoryUoW.faqRepository.getAll()

            if(!!toBeFoundFAQ.length){
                return response.status(200).json(setApiResponse<FAQInterface[]>(toBeFoundFAQ, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<FAQInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<FAQInterface[]>(result, errorMessage, err.message))
        }
    }

    public async create(request: Request, response: Response){    
        const sucessMessage: string = "Pergunta criado com sucesso"
        const errorMessage: string = "Erro ao criar pergunta"
        
        let result: GetFAQ[] = []
    
        try{
            const toBeCreatedFAQ: PostFAQ = request.body

            await this.repositoryUoW.beginTransaction();
            
            const faqId: string = await this.repositoryUoW.faqRepository.create(toBeCreatedFAQ)

            await this.repositoryUoW.commit();
            
            result.push({
                id: faqId,
                ...toBeCreatedFAQ, 
            })
            
            return response.status(200).json(setApiResponse<GetFAQ[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetFAQ[]>(result, errorMessage, err.message))
        }
    }
    
    public async update(request: Request, response: Response){    
        const sucessMessage: string = "Pergunta atualizada com sucesso"
        const errorMessage: string = "Erro ao atualizar pergunta"
        const notFoundMessage: string = "Pergunta não encontrada"
        
        let result: GetFAQ[] = []
    
        try{
            const toBeupdatedStudent: PutFAQ = request.body
            const faqId: string = request.params.faqId
            
            await this.repositoryUoW.beginTransaction();
            
            const updatedFaqs = await this.repositoryUoW.faqRepository.update(toBeupdatedStudent, faqId)

            if(updatedFaqs.length == 0){
                await this.repositoryUoW.rollback();
                return response.status(404).json(setApiResponse<GetFAQ[]>(result, errorMessage, notFoundMessage))
            }

            await this.repositoryUoW.commit();

            result = updatedFaqs

            return response.status(200).json(setApiResponse<GetFAQ[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetFAQ[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "Pergunta deletada com sucesso"
        const errorMessage: string = "Erro ao deletar pergunta"
        
        let result: GetFAQ[] = []
    
        try{
            const faqId: string = request.params.faqId
            
            await this.repositoryUoW.beginTransaction();
            await this.repositoryUoW.faqRepository.delete(faqId)
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetFAQ[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetFAQ[]>(result, errorMessage, err.message))
        }
    }
}