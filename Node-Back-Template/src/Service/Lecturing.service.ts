import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { LecturingFilter } from '../Interfaces/Filters/LecturingFilter.interface'
import { GetLecturing } from '../Interfaces/Get/GetLecturing.interface'
import { PostLecturing } from '../Interfaces/Post/PostLecturing.interface'
import { LecturingInterface } from '../Interfaces/Lecturing.interface'
import { GetTag } from '../Interfaces/Get/GetTag.interface'

export class LecturingService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getAll(request: Request, response: Response){
        const errorMessage: string = "Erro ao encontrar disciplinas ministradas"
        const notFoundMessage: string = "Disciplinas ministradas não encontradas"
    
        let result: LecturingInterface[] = []
    
        try{
            
            const { 
              disciplineName,
              disciplineCode,
              disciplineHours,
              professorName,
              professorSiape,
              professorDepartmentName,
              professorDepartmentId,
              page,
              limit
            } = request.query as any
            
            const lecturingFilter: LecturingFilter = { disciplineName, disciplineCode, disciplineHours, professorName, professorSiape, professorDepartmentName, professorDepartmentId, page, limit}

            const toBeFoundLecturings: LecturingInterface[] = await this.repositoryUoW.lecturingRepository.getAll(lecturingFilter)

            if(!!toBeFoundLecturings.length){
                let nextPageFilter: LecturingFilter = {
                    ...lecturingFilter,
                    limit: 1,
                    page: lecturingFilter.page*lecturingFilter.limit+1
                };
                const nextPage: LecturingInterface[] = await this.repositoryUoW.lecturingRepository.getAll(nextPageFilter)
                let successMessage: string = `Disciplinas ministradas encontradas com sucesso. last=${nextPage.length > 0 ? "FALSE" : "TRUE"}`
                return response.status(200).json(setApiResponse<LecturingInterface[]>(toBeFoundLecturings, successMessage))
            }
            
            return response.status(404).json(setApiResponse<LecturingInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<LecturingInterface[]>(result, errorMessage, err.message))
        }
    }

    public async getById(request: Request, response: Response){
        const sucessMessage: string = "Disciplina ministrada encontrada com sucesso"
        const errorMessage: string = "Erro ao encontrar disciplina ministrada"
        const notFoundMessage: string = "Disciplina ministrada não encontrada"
    
        let result: GetLecturing[] = []
    
        try{
            const lecturingId: string = request.params.lecturingId
            
            const toBeFoundLecturing: GetLecturing[] = await this.repositoryUoW.lecturingRepository.getById(lecturingId)
            
            if(!toBeFoundLecturing.length){
                return response.status(404).json(setApiResponse<GetLecturing[]>(result, notFoundMessage))   
            }

            const topTags: GetTag[] = await this.repositoryUoW.tagRepository.getTopLecturingTags(lecturingId);
            
            result = [{
                ...toBeFoundLecturing[0],
                tags: topTags
            }];

            return response.status(200).json(setApiResponse<GetLecturing[]>(result, sucessMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<GetLecturing[]>(result, errorMessage, err.message))
        }    
    }

    public async create(request: Request, response: Response){    
        const sucessMessage: string = "Disciplina ministrada criada com sucesso"
        const errorMessage: string = "Erro ao criar disciplina ministrada"
        const alreadyExistsMsg: string = "Disciplina ministrada já registrada no sistema"
        
        let result: GetLecturing[] = []
    
        try{
            const toBeCreatedLecturing: PostLecturing = request.body
            const { disciplineId, professorId } = toBeCreatedLecturing

            await this.repositoryUoW.beginTransaction();
            
            const numberOfReg = await this.repositoryUoW.lecturingRepository.getByProfessorAndDiscipline(professorId, disciplineId);
            if(numberOfReg.length != 0){
                await this.repositoryUoW.rollback();
                return response.status(400).json(setApiResponse<GetLecturing[]>(numberOfReg, errorMessage, alreadyExistsMsg))
            }
            
            const lecturingId: string = await this.repositoryUoW.lecturingRepository.create(professorId, disciplineId)

            await this.repositoryUoW.commit();
            
            result = await this.repositoryUoW.lecturingRepository.getById(lecturingId)
            
            return response.status(200).json(setApiResponse<GetLecturing[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetLecturing[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "Disciplina ministrada deletada com sucesso"
        const errorMessage: string = "Erro ao deletar disciplina ministrada"
        
        let result: GetLecturing[] = []
    
        try{
            const lecturingId: string = request.params.lecturingId

            await this.repositoryUoW.beginTransaction();
            await this.repositoryUoW.lecturingRepository.delete(lecturingId)
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetLecturing[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetLecturing[]>(result, errorMessage, err.message))
        }
    }
}