import { Router, Request, Response } from 'express'
import { authHandler } from '../ApiHandlers/Authorization.handler'

import { ServiceUoW } from '../Service/ServiceUoW'

export class ReportController {

    private prefixPath: string = "/report"
    private router: Router
    private serviceUoW: ServiceUoW

    constructor(){
        this.serviceUoW = new ServiceUoW()
        this.router = Router();
    }
 
    public getRouter() {
        this.router.get(`${this.prefixPath}`, authHandler,(request: Request, response: Response) => this.getAllOpen(request, response));
        this.router.post(`${this.prefixPath}`, authHandler,(request: Request, response: Response) => this.create(request, response));
        this.router.get(`${this.prefixPath}/professor/:professorId`, authHandler,(request: Request, response: Response) => this.getByAuthor(request, response));
        this.router.get(`${this.prefixPath}/reviewer/:professorId`, authHandler,(request: Request, response: Response) => this.getByReviewer(request, response));
        this.router.get(`${this.prefixPath}/:reportId`, authHandler,(request: Request, response: Response) => this.getById(request, response));
        this.router.delete(`${this.prefixPath}/:reportId`, authHandler,(request: Request, response: Response) => this.delete(request, response));
        this.router.put(`${this.prefixPath}/:reportId`, authHandler,(request: Request, response: Response) => this.update(request, response));
        
        return this.router
    }

    private getAllOpen(request: Request, response: Response){
        this.serviceUoW.reportService.getAllOpen(request, response)
    }
    
    private getByAuthor(request: Request, response: Response){
      this.serviceUoW.reportService.getByAuthor(request, response)
    }
  
    private getByReviewer(request: Request, response: Response){
      this.serviceUoW.reportService.getByReviewer(request, response)
    }

    private getById(request: Request, response: Response){
        this.serviceUoW.reportService.getById(request, response)
    }

    private create(request: Request, response: Response){
        this.serviceUoW.reportService.create(request, response)
    }

    private update(request: Request, response: Response){
        this.serviceUoW.reportService.update(request, response)
    }

    private delete(request: Request, response: Response){
        this.serviceUoW.reportService.delete(request, response)
    }

}