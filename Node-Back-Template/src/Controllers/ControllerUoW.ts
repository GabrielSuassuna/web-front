import { AuthController } from './Auth.controller'
import { DepartmentController } from './Department.controller'
import { DisciplineController } from './Discipline.controller'
import { FAQController } from './FAQ.controller'
import { LecturingController } from './Lecturing.controller'
import { NotificationController } from './Notification.controller'
import { ProfessorController } from './Professor.controller'
import { StudentController } from './Student.controller'
import { TagController } from './Tag.controller'
import { FeedbackController } from './Feedback.controller'
import { HasVoteController } from './HasVote.controller'
import { ReportController } from './Report.controller'

export class ControllerUoW{

    private controllers: any = []

    constructor(){
        this.controllers = [
            new AuthController(),
            new ProfessorController(),
            //new StudentController(),
            //new FAQController(),
            //new TagController(),
            //new DisciplineController(),
            //new LecturingController(),
            //new NotificationController(),
            new DepartmentController(),
            new FeedbackController(),
            new HasVoteController(),
            new ReportController(),
        ]
    }

    public getControllers(){
        return this.controllers
    }
}