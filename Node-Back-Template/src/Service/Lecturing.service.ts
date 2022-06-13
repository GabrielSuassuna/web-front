import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { LecturingFilter } from '../Interfaces/Filters/LecturingFilter.interface'
import { GetDepartment } from '../Interfaces/Get/GetDepartment.interface'
import { GetLecturing } from '../Interfaces/Get/GetLecturing.interface'
import { PostLecturing } from '../Interfaces/Post/PostLecturing.interface'
import { LecturingInterface } from '../Interfaces/Lecturing.interface'
import { PutLecturing } from '../Interfaces/Put/PutLecturing.interface'

export class LecturingService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getAll(request: Request, response: Response){
        const sucessMessage: string = "Disciplinas ministradas encontradas com sucesso"
        const errorMessage: string = "Erro ao encontrar disciplinas ministradas"
        const notFoundMessage: string = "Disciplinas ministradas não encontradas"
    
        let result: LecturingInterface[] = []
    
        try{
            
            const { 
              disciplineName,
              disciplineCode,
              professorName,
              professorSiape,
              professorDepartmentName,
              professorDepartmentId,
            } = request.query as any
            
            const lecturingFilter: LecturingFilter = { disciplineName, disciplineCode, professorName, professorSiape, professorDepartmentName, professorDepartmentId}

            console.log(lecturingFilter)
            //const toBeFoundLecturings: LecturingInterface[] = await this.repositoryUoW.lecturingRepository.getAll()
            const toBeFoundLecturings: LecturingInterface[] = await this.repositoryUoW.lecturingRepository.getAll(lecturingFilter)

            if(!!toBeFoundLecturings.length){
                return response.status(200).json(setApiResponse<LecturingInterface[]>(toBeFoundLecturings, sucessMessage))
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
            
            if(!!toBeFoundLecturing.length){
                return response.status(200).json(setApiResponse<GetLecturing[]>(toBeFoundLecturing, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<GetLecturing[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<GetLecturing[]>(result, errorMessage, err.message))
        }    
    }

    public async create(request: Request, response: Response){    
        const sucessMessage: string = "Disciplina ministrada criada com sucesso"
        const errorMessage: string = "Erro ao criar disciplina ministrada"
        
        let result: GetLecturing[] = []
    
        try{
            const toBeCreatedLecturing: PostLecturing = request.body
            const { discipline_id, professor_id } = toBeCreatedLecturing

            await this.repositoryUoW.beginTransaction();
            
            const lecturingId: string = await this.repositoryUoW.lecturingRepository.create(professor_id, discipline_id)

            await this.repositoryUoW.commit();
            
            result.push({
                id: lecturingId,
                ...toBeCreatedLecturing, 
                feedback_count: 0
            })
            
            return response.status(200).json(setApiResponse<GetLecturing[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetLecturing[]>(result, errorMessage, err.message))
        }
    }
    
    public async update(request: Request, response: Response){    
        const sucessMessage: string = "Disciplina ministrada atualizada com sucesso"
        const errorMessage: string = "Erro ao atualizar disciplina ministrada"
        
        let result: GetLecturing[] = []
    
        try{
            const toBeupdatedLecturing: PutLecturing = request.body
            const lecturingId: string = request.params.lecturingId
            
            await this.repositoryUoW.beginTransaction();
            
            await this.repositoryUoW.lecturingRepository.update(toBeupdatedLecturing, lecturingId)

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