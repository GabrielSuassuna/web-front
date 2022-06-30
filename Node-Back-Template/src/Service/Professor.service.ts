import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { ProfessorFilter } from '../Interfaces/Filters/ProfessorFilter.interface'
import { GetDepartment } from '../Interfaces/Get/GetDepartment.interface'
import { GetProfessor } from '../Interfaces/Get/GetProfessor.interface'
import { GetTag } from '../Interfaces/Get/GetTag.interface'
import { PostProfessor } from '../Interfaces/Post/PostProfessor.interface'
import { ProfessorInterface } from '../Interfaces/Professor.interface'
import { PutProfessor } from '../Interfaces/Put/PutProfessor.interface'

export class ProfessorService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getAll(request: Request, response: Response){
        const errorMessage: string = "Erro ao encontrar professores"
        const notFoundMessage: string = "Professores não encontrados"
    
        let result: ProfessorInterface[] = []
    
        try{
            
            const { 
                name, 
                departmentId, 
                siape,
                page,
                limit
            } = request.query as any
            
            const professorFilter: ProfessorFilter = { name, departmentId, siape, page, limit }

            const toBeFoundProfessors: ProfessorInterface[] = await this.repositoryUoW.professorRepository.getAll(professorFilter)

            if(!!toBeFoundProfessors.length){
                let nextPageFilter: ProfessorFilter = {
                    ...professorFilter,
                    limit: 1,
                    page: professorFilter.page*professorFilter.limit+1
                };
                const nextPage: ProfessorInterface[] = await this.repositoryUoW.professorRepository.getAll(nextPageFilter)
                let successMessage: string = `Professores encontrados com sucesso. last=${nextPage.length > 0 ? "FALSE" : "TRUE"}`
                return response.status(200).json(setApiResponse<ProfessorInterface[]>(toBeFoundProfessors, successMessage))
            }
            
            return response.status(404).json(setApiResponse<ProfessorInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<ProfessorInterface[]>(result, errorMessage, err.message))
        }
    }

    public async getById(request: Request, response: Response){
        const successMessage: string = "Professor encontrado com sucesso"
        const errorMessage: string = "Erro ao encontrar professor"
        const notFoundMessage: string = "Professor não encontrado"
    
        let result: GetProfessor[] = []
    
        try{
            const professorId: string = request.params.professorId
            
            const toBeFoundProfessor: GetProfessor[] = await this.repositoryUoW.professorRepository.getById(professorId)
            
            if(!toBeFoundProfessor.length){
                return response.status(404).json(setApiResponse<GetProfessor[]>(result, notFoundMessage))
            }

            const topTags: GetTag[] = await this.repositoryUoW.tagRepository.getTopProfessorTags(professorId);

            result = [{
                ...toBeFoundProfessor[0],
                tags: topTags
            }];

            return response.status(200).json(setApiResponse<GetProfessor[]>(result, successMessage))
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
            const { departmentId } = toBeCreatedProfessor

            await this.repositoryUoW.beginTransaction();
            
            const professorId: string = await this.repositoryUoW.professorRepository.create(toBeCreatedProfessor, departmentId)

            await this.repositoryUoW.commit();
            
            result = await this.repositoryUoW.professorRepository.getById(professorId)
            
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
        const notFoundMessage: string = "Professor não encontrado"
        
        let result: GetProfessor[] = []
    
        try{
            const toBeupdatedProfessor: PutProfessor = request.body
            const professorId: string = request.params.professorId
            
            await this.repositoryUoW.beginTransaction();
            
            const updatedProfessors = await this.repositoryUoW.professorRepository.update(toBeupdatedProfessor, professorId)

            if(updatedProfessors.length == 0){
                await this.repositoryUoW.rollback();
                return response.status(404).json(setApiResponse<GetProfessor[]>(result, errorMessage, notFoundMessage))
            }

            await this.repositoryUoW.commit();

            result = updatedProfessors

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
            const professor: GetProfessor[] = await this.repositoryUoW.professorRepository.getById(professorId)
            const departmentId: string = professor[0].department_id
            const department: GetDepartment[] = await this.repositoryUoW.departmentRepository.getById(departmentId)
            
            await this.repositoryUoW.beginTransaction();
            
            if(professorId == department[0].course_coordinator_id){
                console.log('Removing course coordinator')
                await this.repositoryUoW.departmentRepository.updateCourseCoordinator(departmentId, undefined)
            }
            if(professorId == department[0].department_head_id){
                console.log('Removing department head')
                await this.repositoryUoW.departmentRepository.updateDepartmentHead(departmentId, undefined)
            }

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