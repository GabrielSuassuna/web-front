import { Router, Request, Response } from 'express'

import { ServiceUoW } from '../Service/ServiceUoW'

export class LecturingController {

    private prefixPath: string = "/lecturing"
    private router: Router
    private serviceUoW: ServiceUoW

    constructor(){
        this.serviceUoW = new ServiceUoW()
        this.router = Router();
    }
 
    public getRouter() {
        this.router.get(`${this.prefixPath}`, (request: Request, response: Response) => this.getAll(request, response));
        this.router.post(`${this.prefixPath}`, (request: Request, response: Response) => this.create(request, response));
        this.router.get(`${this.prefixPath}/:lecturingId`, (request: Request, response: Response) => this.getById(request, response));
        this.router.delete(`${this.prefixPath}/:lecturingId`, (request: Request, response: Response) => this.delete(request, response));
        
        return this.router
    }

    private getAll(request: Request, response: Response){
        this.serviceUoW.lecturingService.getAll(request, response)
    }

    private getById(request: Request, response: Response){
        this.serviceUoW.lecturingService.getById(request, response)
    }

    private create(request: Request, response: Response){
        this.serviceUoW.lecturingService.create(request, response)
    }

    private update(request: Request, response: Response){
        this.serviceUoW.lecturingService.update(request, response)
    }

    private delete(request: Request, response: Response){
        this.serviceUoW.lecturingService.delete(request, response)
    }

}