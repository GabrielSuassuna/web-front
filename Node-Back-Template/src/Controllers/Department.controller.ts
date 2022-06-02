import { Router, Request, Response } from 'express'
import { authHandler } from '../ApiHandlers/Authorization.handler'

import { ServiceUoW } from '../Service/ServiceUoW'

export class DepartmentController {

    private prefixPath: string = "/department"
    private router: Router
    private serviceUoW: ServiceUoW

    constructor(){
        this.serviceUoW = new ServiceUoW()
        this.router = Router();
    }
 
    public getRouter() {
        this.router.get(`${this.prefixPath}`, (request: Request, response: Response) => this.getAll(request, response));
        this.router.get(`${this.prefixPath}/:departmentId/getCoordinator`, (request: Request, response: Response) => this.getDepartmentCoordinator(request, response));
        this.router.get(`${this.prefixPath}/:departmentId/getDepartmentChief`, (request: Request, response: Response) => this.getDepartmentChief(request, response));
        this.router.post(`${this.prefixPath}`, authHandler, (request: Request, response: Response) => this.create(request, response));
        this.router.put(`${this.prefixPath}/:departmentId`, (request: Request, response: Response) => this.update(request, response));
        this.router.delete(`${this.prefixPath}/:departmentId`, (request: Request, response: Response) => this.delete(request, response));
        
        return this.router
    }

    private getAll(request: Request, response: Response){
        this.serviceUoW.departmentService.getAll(request, response)
    }

    private getDepartmentCoordinator(request: Request, response: Response){
        this.serviceUoW.departmentService.getDepartmentCoordinator(request, response)
    }

    private getDepartmentChief(request: Request, response: Response){
        this.serviceUoW.departmentService.getDepartmentChief(request, response)
    }

    private create(request: Request, response: Response){
        this.serviceUoW.departmentService.create(request, response)
    }

    private update(request: Request, response: Response){
        this.serviceUoW.departmentService.update(request, response)
    }

    private delete(request: Request, response: Response){
        this.serviceUoW.departmentService.delete(request, response)
    }

}