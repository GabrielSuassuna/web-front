import { AuthController } from './Auth.controller'
import { ProfessorController } from './Professor.controller'

export class ControllerUoW{

    private controllers: any = []

    constructor(){
        this.controllers = [
            new AuthController(),
            new ProfessorController()
        ]
    }

    public getControllers(){
        return this.controllers
    }
}