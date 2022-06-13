import { Router, Request, Response } from 'express'
import { authHandler } from '../ApiHandlers/Authorization.handler'

import { ServiceUoW } from '../Service/ServiceUoW'

export class NotificationController {

    private prefixPath: string = "/notification"
    private router: Router
    private serviceUoW: ServiceUoW

    constructor(){
        this.serviceUoW = new ServiceUoW()
        this.router = Router();
    }
 
    public getRouter() {
        this.router.get(`${this.prefixPath}/student/:studentId`, authHandler,(request: Request, response: Response) => this.getStudentNotification(request, response));
        this.router.get(`${this.prefixPath}/professor/:professorId`, authHandler,(request: Request, response: Response) => this.getProfessorNotification(request, response));
        this.router.delete(`${this.prefixPath}/student/:notificationId`, authHandler,(request: Request, response: Response) => this.deleteStudentNotification(request, response));
        this.router.delete(`${this.prefixPath}/professor/:notificationId`, authHandler,(request: Request, response: Response) => this.deleteProfessorNotification(request, response));
        

        
        return this.router
    }

    private getStudentNotification(request: Request, response: Response){
        this.serviceUoW.studentNotificationService.getByUserId(request, response)
    }

    private getProfessorNotification(request: Request, response: Response){
        this.serviceUoW.professorNotificationService.getByUserId(request, response)
    }

    private deleteStudentNotification(request: Request, response: Response){
        this.serviceUoW.studentNotificationService.delete(request, response)
    }

    private deleteProfessorNotification(request: Request, response: Response){
        this.serviceUoW.professorNotificationService.delete(request, response)
    }

}