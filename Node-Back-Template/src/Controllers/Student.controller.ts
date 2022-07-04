import { Router, Request, Response } from 'express'
import { authHandler } from '../ApiHandlers/Authorization.handler'

import { ServiceUoW } from '../Service/ServiceUoW'

export class StudentController {

    private prefixPath: string = "/student"
    private router: Router
    private serviceUoW: ServiceUoW

    constructor(){
        this.serviceUoW = new ServiceUoW()
        this.router = Router();
    }
 
    public getRouter() {
        this.router.get(`${this.prefixPath}/:studentId`, authHandler,(request: Request, response: Response) => this.getById(request, response));
        this.router.post(`${this.prefixPath}`, (request: Request, response: Response) => this.create(request, response));
        this.router.put(`${this.prefixPath}/:studentId`, authHandler,(request: Request, response: Response) => this.update(request, response));
        this.router.delete(`${this.prefixPath}/:studentId`, authHandler,(request: Request, response: Response) => this.delete(request, response));
        
        return this.router
    }

    private getById(request: Request, response: Response){
        this.serviceUoW.studentService.getById(request, response)
    }

    private create(request: Request, response: Response){
        this.serviceUoW.studentService.create(request, response)
    }

    private update(request: Request, response: Response){
        this.serviceUoW.studentService.update(request, response)
    }

    private delete(request: Request, response: Response){
        this.serviceUoW.studentService.delete(request, response)
    }

}