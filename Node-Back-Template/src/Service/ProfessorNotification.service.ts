import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { ProfessorNotificationInterface } from '../Interfaces/ProfessorNotification.interface'
import { GetProfessorNotification } from '../Interfaces/Get/GetProfessorNotification.interface'

export class ProfessorNotificationService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getByUserId(request: Request, response: Response){
        const sucessMessage: string = "Notificações encontradas com sucesso"
        const errorMessage: string = "Erro ao encontrar notificações"
        const notFoundMessage: string = "Notificações não encontradas"
    
        let result: ProfessorNotificationInterface[] = []
    
        try{
            const professorId: string = request.params.professorId
            const toBeFoundProfessorNotification: ProfessorNotificationInterface[] = await this.repositoryUoW.professorNotificationRepository.getAllByProfessorId(professorId)

            if(!!toBeFoundProfessorNotification.length){
                return response.status(200).json(setApiResponse<ProfessorNotificationInterface[]>(toBeFoundProfessorNotification, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<ProfessorNotificationInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<ProfessorNotificationInterface[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "Notificação deletada com sucesso"
        const errorMessage: string = "Erro ao deletar notificação"
        
        let result: GetProfessorNotification[] = []
    
        try{
            const notificationId: string = request.params.notificationId
            
            await this.repositoryUoW.beginTransaction();
            await this.repositoryUoW.professorNotificationRepository.delete(notificationId)
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetProfessorNotification[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetProfessorNotification[]>(result, errorMessage, err.message))
        }
    }
}