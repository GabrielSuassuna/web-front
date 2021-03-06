import { Router, Request, Response } from 'express'
import { authHandler } from '../ApiHandlers/Authorization.handler'

import { ServiceUoW } from '../Service/ServiceUoW'

export class FAQController {

    private prefixPath: string = "/faq"
    private router: Router
    private serviceUoW: ServiceUoW

    constructor(){
        this.serviceUoW = new ServiceUoW()
        this.router = Router();
    }
 
    public getRouter() {
        this.router.get(`${this.prefixPath}`, (request: Request, response: Response) => this.getAll(request, response));
        this.router.post(`${this.prefixPath}`, authHandler,(request: Request, response: Response) => this.create(request, response));
        this.router.put(`${this.prefixPath}/:faqId`, authHandler,(request: Request, response: Response) => this.update(request, response));
        this.router.delete(`${this.prefixPath}/:faqId`, authHandler,(request: Request, response: Response) => this.delete(request, response));
        
        return this.router
    }

    private getAll(request: Request, response: Response){
        this.serviceUoW.faqService.getAll(request, response)
    }

    private create(request: Request, response: Response){
        this.serviceUoW.faqService.create(request, response)
    }

    private update(request: Request, response: Response){
        this.serviceUoW.faqService.update(request, response)
    }

    private delete(request: Request, response: Response){
        this.serviceUoW.faqService.delete(request, response)
    }

}