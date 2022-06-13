import { Router, Request, Response } from 'express'
import { authHandler } from '../ApiHandlers/Authorization.handler'

import { ServiceUoW } from '../Service/ServiceUoW'

export class HasVoteController {

    private prefixPath: string = "/hasVote"
    private router: Router
    private serviceUoW: ServiceUoW

    constructor(){
        this.serviceUoW = new ServiceUoW()
        this.router = Router();
    }
 
    public getRouter() {
        this.router.post(`${this.prefixPath}/:feedbackId`, authHandler,(request: Request, response: Response) => this.create(request, response));
        this.router.delete(`${this.prefixPath}/:feedbackId`, authHandler,(request: Request, response: Response) => this.delete(request, response));
        this.router.put(`${this.prefixPath}/:feedbackId`, authHandler,(request: Request, response: Response) => this.update(request, response));
        
        return this.router
    }

    private create(request: Request, response: Response){
        this.serviceUoW.hasVoteService.create(request, response)
    }

    private delete(request: Request, response: Response){
        this.serviceUoW.hasVoteService.delete(request, response)
    }

    private update(request: Request, response: Response){
        this.serviceUoW.hasVoteService.update(request, response)
    }

}