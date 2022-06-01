import { StudentService } from '../Service/Student.service'
import { AuthController } from './Auth.controller'
import { FAQController } from './FAQ.controller'
import { ProfessorController } from './Professor.controller'
import { StudentController } from './Student.controller'

export class ControllerUoW{

    private controllers: any = []

    constructor(){
        this.controllers = [
            new AuthController(),
            new ProfessorController(),
            new StudentController(),
            new FAQController()
        ]
    }

    public getControllers(){
        return this.controllers
    }
}