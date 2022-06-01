import { AuthController } from './Auth.controller'
import { DisciplineController } from './Discipline.controller'
import { FAQController } from './FAQ.controller'
import { ProfessorController } from './Professor.controller'
import { StudentController } from './Student.controller'
import { TagController } from './Tag.controller'

export class ControllerUoW{

    private controllers: any = []

    constructor(){
        this.controllers = [
            new AuthController(),
            new ProfessorController(),
            new StudentController(),
            new FAQController(),
            new TagController(),
            new DisciplineController()
        ]
    }

    public getControllers(){
        return this.controllers
    }
}