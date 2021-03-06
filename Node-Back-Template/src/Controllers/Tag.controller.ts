import { Router, Request, Response } from 'express'
import { authHandler } from '../ApiHandlers/Authorization.handler'

import { ServiceUoW } from '../Service/ServiceUoW'

export class TagController {

    private prefixPath: string = "/tag"
    private router: Router
    private serviceUoW: ServiceUoW

    constructor(){
        this.serviceUoW = new ServiceUoW()
        this.router = Router();
    }
 
    public getRouter() {
        this.router.get(`${this.prefixPath}`, (request: Request, response: Response) => this.getAll(request, response));
        this.router.get(`${this.prefixPath}/:tagId`, (request: Request, response: Response) => this.getById(request, response));
        this.router.post(`${this.prefixPath}`, authHandler,(request: Request, response: Response) => this.create(request, response));
        this.router.put(`${this.prefixPath}/:tagId`, authHandler,(request: Request, response: Response) => this.update(request, response));
        this.router.delete(`${this.prefixPath}/:tagId`, authHandler,(request: Request, response: Response) => this.delete(request, response));
        
        return this.router
    }

    private getAll(request: Request, response: Response){
        this.serviceUoW.tagService.getAll(request, response)
    }

    private getById(request: Request, response: Response){
        this.serviceUoW.tagService.getById(request, response)
    }

    private create(request: Request, response: Response){
        this.serviceUoW.tagService.create(request, response)
    }

    private update(request: Request, response: Response){
        this.serviceUoW.tagService.update(request, response)
    }

    private delete(request: Request, response: Response){
        this.serviceUoW.tagService.delete(request, response)
    }

}