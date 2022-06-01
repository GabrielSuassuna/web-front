import { Router, Request, Response } from 'express'

import { ServiceUoW } from '../Service/ServiceUoW'

export class AuthController {

    private prefixPath: string = "/auth"
    private router: Router
    private serviceUoW: ServiceUoW

    constructor(){
        this.serviceUoW = new ServiceUoW()
        this.router = Router();
    }
 
    public getRouter() {
        this.router.post(`${this.prefixPath}/professor`, (request: Request, response: Response) => this.loginAsProfessor(request, response));
        this.router.post(`${this.prefixPath}/student`, (request: Request, response: Response) => this.loginAsStudent(request, response));

        return this.router
    }

    private loginAsProfessor(request: Request, response: Response){
        this.serviceUoW.authService.validateProfessorCredentials(request, response)
    }

    private loginAsStudent(request: Request, response: Response){
        this.serviceUoW.authService.validateStudentCredentials(request, response)
    }
}