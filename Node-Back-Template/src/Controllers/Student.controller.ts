import { Router, Request, Response } from 'express'

import { ServiceUoW } from '../Service/ServiceUoW'

export class ProfessorController {

    private prefixPath: string = "/auth"
    private router: Router
    private serviceUoW: ServiceUoW

    constructor(){
        this.serviceUoW = new ServiceUoW()
        this.router = Router();
    }
 
    public getRouter() {
        this.router.post(`${this.prefixPath}`, (request: Request, response: Response) => this.create(request, response));
        this.router.put(`${this.prefixPath}/:studentId`, (request: Request, response: Response) => this.update(request, response));
        this.router.delete(`${this.prefixPath}/:studentId`, (request: Request, response: Response) => this.delete(request, response));
        
        return this.router
    }

    private create(request: Request, response: Response){
        this.serviceUoW.professorService.create(request, response)
    }

    private update(request: Request, response: Response){
        this.serviceUoW.professorService.update(request, response)
    }

    private delete(request: Request, response: Response){
        this.serviceUoW.professorService.delete(request, response)
    }

}