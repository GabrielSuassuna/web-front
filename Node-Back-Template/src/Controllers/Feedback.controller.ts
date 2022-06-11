import { Router, Request, Response } from 'express'

import { ServiceUoW } from '../Service/ServiceUoW'

export class FeedbackController {

    private prefixPath: string = "/feedback"
    private router: Router
    private serviceUoW: ServiceUoW

    constructor(){
        this.serviceUoW = new ServiceUoW()
        this.router = Router();
    }
 
    public getRouter() {
        this.router.get(`${this.prefixPath}`, (request: Request, response: Response) => this.getAll(request, response));
        this.router.post(`${this.prefixPath}`, (request: Request, response: Response) => this.create(request, response));
        this.router.get(`${this.prefixPath}/:feedbackId`, (request: Request, response: Response) => this.getById(request, response));
        this.router.delete(`${this.prefixPath}/:feedbackId`, (request: Request, response: Response) => this.delete(request, response));
        this.router.get(`${this.prefixPath}/student/:studentId`, (request: Request, response: Response) => this.getStudentFeedbacks(request, response));
        this.router.get(`${this.prefixPath}/professor/:professorId`, (request: Request, response: Response) => this.getProfessorFeedbacks(request, response));
        
        return this.router
    }

    private getAll(request: Request, response: Response){
        this.serviceUoW.feedbackService.getAll(request, response)
    }

    private getById(request: Request, response: Response){
        this.serviceUoW.feedbackService.getById(request, response)
    }

    private create(request: Request, response: Response){
      this.serviceUoW.feedbackService.create(request, response)
    }

    private getStudentFeedbacks(request: Request, response: Response){
        this.serviceUoW.feedbackService.getStudentFeedbacks(request, response)
    }

    private getProfessorFeedbacks(request: Request, response: Response){
        this.serviceUoW.feedbackService.getProfessorFeedbacks(request, response)
    }

    private delete(request: Request, response: Response){
        this.serviceUoW.feedbackService.delete(request, response)
    }

}