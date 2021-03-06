import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { DisciplineInterface } from '../Interfaces/Discipline.interface'
import { DisciplineFilter } from '../Interfaces/Filters/DisciplineFilter.interface'
import { GetDiscipline } from '../Interfaces/Get/GetDiscipline.interface'
import { GetTag } from '../Interfaces/Get/GetTag.interface'
import { PostDiscipline } from '../Interfaces/Post/PostDiscipline.interface'
import { PutDiscipline } from '../Interfaces/Put/PutDiscipline.interface'

export class DisciplineService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getAll(request: Request, response: Response){
        const errorMessage: string = "Erro ao encontrar disciplinas"
        const notFoundMessage: string = "Disciplinas não encontradas"
    
        let result: DisciplineInterface[] = []
    
        try{
            
            const { 
                name, 
                code, 
                hours,
                page,
                limit
            } = request.query as any
            
            const disciplineFilter: DisciplineFilter = { name, code, hours, page, limit }
            const toBeFoundDiscipline: DisciplineInterface[] = await this.repositoryUoW.disciplineRepository.getAll(disciplineFilter)

            if(!!toBeFoundDiscipline.length){
                let nextPageFilter: DisciplineFilter = {
                    ...disciplineFilter,
                    limit: 1,
                    page: disciplineFilter.page*disciplineFilter.limit+1
                };
                const nextPage: DisciplineInterface[] = await this.repositoryUoW.disciplineRepository.getAll(nextPageFilter)
                let successMessage: string = `Disciplinas encontradas com sucesso. last=${nextPage.length > 0 ? "FALSE" : "TRUE"}`
                return response.status(200).json(setApiResponse<DisciplineInterface[]>(toBeFoundDiscipline, successMessage))
            }

            return response.status(404).json(setApiResponse<DisciplineInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<DisciplineInterface[]>(result, errorMessage, err.message))
        }
    }

    public async getById(request: Request, response: Response){
        const sucessMessage: string = "Disciplina encontrado com sucesso"
        const errorMessage: string = "Erro ao encontrar disciplina"
        const notFoundMessage: string = "Disciplina não encontrada"
    
        let result: GetDiscipline[] = []
    
        try{
            const disciplineId: string = request.params.disciplineId
            
            const toBeFoundDiscipline: GetDiscipline[] = await this.repositoryUoW.disciplineRepository.getById(disciplineId)
            
            if(!toBeFoundDiscipline.length){
                return response.status(404).json(setApiResponse<GetDiscipline[]>(result, notFoundMessage))
            }

            const topTags: GetTag[] = await this.repositoryUoW.tagRepository.getTopDisciplineTags(disciplineId);

            result = [{
                ...toBeFoundDiscipline[0],
                tags: topTags
            }];

            return response.status(200).json(setApiResponse<GetDiscipline[]>(result, sucessMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<GetDiscipline[]>(result, errorMessage, err.message))
        }    
    }

    public async create(request: Request, response: Response){    
        const sucessMessage: string = "Disciplina criado com sucesso"
        const errorMessage: string = "Erro ao criar disciplina"
        
        let result: GetDiscipline[] = []
    
        try{
            const toBeCreatedDiscipline: PostDiscipline = request.body

            await this.repositoryUoW.beginTransaction();
            
            const disciplineId: string = await this.repositoryUoW.disciplineRepository.create(toBeCreatedDiscipline)

            await this.repositoryUoW.commit();
            
            result.push({
                id: disciplineId,
                ...toBeCreatedDiscipline, 
            })
            
            return response.status(200).json(setApiResponse<GetDiscipline[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetTag[]>(result, errorMessage, err.message))
        }
    }
    
    public async update(request: Request, response: Response){    
        const sucessMessage: string = "Disciplina atualizada com sucesso"
        const errorMessage: string = "Erro ao atualizar disciplina"
        const notFoundMessage: string = "Disciplina não encontrada"
        
        let result: GetDiscipline[] = []
    
        try{
            const toBeupdatedDiscipline: PutDiscipline = request.body
            const disciplineId: string = request.params.disciplineId
            
            await this.repositoryUoW.beginTransaction();
            
            const updatedDisciplines = await this.repositoryUoW.disciplineRepository.update(toBeupdatedDiscipline, disciplineId)

            if(updatedDisciplines.length == 0){
                await this.repositoryUoW.rollback();
                return response.status(404).json(setApiResponse<GetDiscipline[]>(result, errorMessage, notFoundMessage))
            }

            await this.repositoryUoW.commit();

            result = updatedDisciplines

            return response.status(200).json(setApiResponse<GetDiscipline[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetDiscipline[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "Disciplina deletada com sucesso"
        const errorMessage: string = "Erro ao deletar disciplina"
        
        let result: GetDiscipline[] = []
    
        try{
            const disciplineId: string = request.params.disciplineId
            
            await this.repositoryUoW.beginTransaction();
            await this.repositoryUoW.disciplineRepository.delete(disciplineId)
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetDiscipline[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetDiscipline[]>(result, errorMessage, err.message))
        }
    }
}