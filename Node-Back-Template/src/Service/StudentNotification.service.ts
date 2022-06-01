import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { StudentNotificationInterface } from '../Interfaces/StudentNotification.interface'
import { GetStudentNotification } from '../Interfaces/Get/GetStudentNotification.interface'

export class StudentNotificationService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getByUserId(request: Request, response: Response){
        const sucessMessage: string = "Notificações encontradas com sucesso"
        const errorMessage: string = "Erro ao encontrar notificações"
        const notFoundMessage: string = "Notificações não encontradas"
    
        let result: StudentNotificationInterface[] = []
    
        try{
            const studentId: string = request.params.studentId
            const toBeFoundStudentNotification: StudentNotificationInterface[] = await this.repositoryUoW.studentNotificationRepository.getAllByStudentId(studentId)

            if(!!toBeFoundStudentNotification.length){
                return response.status(200).json(setApiResponse<StudentNotificationInterface[]>(toBeFoundStudentNotification, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<StudentNotificationInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<StudentNotificationInterface[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "Notificação deletada com sucesso"
        const errorMessage: string = "Erro ao deletar notificação"
        
        let result: GetStudentNotification[] = []
    
        try{
            const notificationId: string = request.params.notificationId
            
            await this.repositoryUoW.beginTransaction();
            await this.repositoryUoW.studentNotificationRepository.delete(notificationId)
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetStudentNotification[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetStudentNotification[]>(result, errorMessage, err.message))
        }
    }
}