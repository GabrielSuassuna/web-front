import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { ProfessorFilter } from '../Interfaces/Filters/ProfessorFilter.interface'
import { GetProfessor } from '../Interfaces/Get/GetProfessor.interface'
import { PostProfessor } from '../Interfaces/Post/PostProfessor.interface'
import { ProfessorInterface } from '../Interfaces/Professor.interface'
import { PutProfessor } from '../Interfaces/Put/PutProfessor.interface'

export class ProfessorService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getAll(request: Request, response: Response){
        const sucessMessage: string = "Professor encontrados com sucesso"
        const errorMessage: string = "Erro ao encontrar professor"
        const notFoundMessage: string = "Professores não encontrados"
    
        let result: ProfessorInterface[] = []
    
        try{
            
            const { 
                name, 
                departmentId, 
                siape
            } = request.query as any
            
            const professorFilter: ProfessorFilter = { name, departmentId, siape }

            const toBeFoundProfessors: ProfessorInterface[] = await this.repositoryUoW.professorRepository.getAll(professorFilter)

            if(!!toBeFoundProfessors.length){
                return response.status(200).json(setApiResponse<ProfessorInterface[]>(toBeFoundProfessors, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<ProfessorInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<ProfessorInterface[]>(result, errorMessage, err.message))
        }
    }

    public async getById(request: Request, response: Response){
        const sucessMessage: string = "Professor encontrado com sucesso"
        const errorMessage: string = "Erro ao encontrar professor"
        const notFoundMessage: string = "Professor não encontrado"
    
        let result: GetProfessor[] = []
    
        try{
            const professorId: string = request.params.professorId
            
            const toBeFoundProfessor: GetProfessor[] = await this.repositoryUoW.professorRepository.getById(professorId)
            
            if(!!toBeFoundProfessor.length){
                return response.status(200).json(setApiResponse<GetProfessor[]>(toBeFoundProfessor, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<GetProfessor[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<GetProfessor[]>(result, errorMessage, err.message))
        }    
    }

    public async create(request: Request, response: Response){    
        const sucessMessage: string = "Professor criado com sucesso"
        const errorMessage: string = "Erro ao criar professor"
        
        let result: GetProfessor[] = []
    
        try{
            const toBeCreatedProfessor: PostProfessor = request.body
            const { department_id } = toBeCreatedProfessor

            await this.repositoryUoW.beginTransaction();
            
            const professorId: string = await this.repositoryUoW.professorRepository.create(toBeCreatedProfessor, department_id)

            await this.repositoryUoW.commit();
            
            result.push({
                id: professorId,
                ...toBeCreatedProfessor, 
            })
            
            return response.status(200).json(setApiResponse<GetProfessor[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetProfessor[]>(result, errorMessage, err.message))
        }
    }
    
    public async update(request: Request, response: Response){    
        const sucessMessage: string = "Professor atualizado com sucesso"
        const errorMessage: string = "Erro ao atualizar professor"
        
        let result: GetProfessor[] = []
    
        try{
            const toBeupdatedProfessor: PutProfessor = request.body
            const professorId: string = request.params.professorId
            
            await this.repositoryUoW.beginTransaction();
            
            await this.repositoryUoW.professorRepository.update(toBeupdatedProfessor, professorId)

            await this.repositoryUoW.commit();

            result = await this.repositoryUoW.professorRepository.getById(professorId)

            return response.status(200).json(setApiResponse<GetProfessor[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetProfessor[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "Professor deletado com sucesso"
        const errorMessage: string = "Erro ao deletar professor"
        
        let result: GetProfessor[] = []
    
        try{
            const professorId: string = request.params.professorId
            
            await this.repositoryUoW.beginTransaction();
            await this.repositoryUoW.professorRepository.delete(professorId)
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetProfessor[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetProfessor[]>(result, errorMessage, err.message))
        }
    }
}