import { AuthService } from './Auth.service'
import { DisciplineService } from './Discipline.service'
import { FAQService } from './FAQ.service'
import { ProfessorService } from './Professor.service'
import { ProfessorNotificationService } from './ProfessorNotification.service'
import { StudentService } from './Student.service'
import { StudentNotificationService } from './StudentNotification.service'
import { TagService } from './Tag.service'
export class ServiceUoW {

    public authService: AuthService
    public professorService: ProfessorService
    public studentService: StudentService
    public faqService: FAQService
    public tagService: TagService
    public disciplineService: DisciplineService
    public studentNotificationService: StudentNotificationService
    public professorNotificationService: ProfessorNotificationService
    
    constructor(){
        this.authService = new AuthService()
        this.professorService = new ProfessorService()
        this.studentService = new StudentService()
        this.faqService = new FAQService()
        this.tagService = new TagService()
        this.disciplineService = new DisciplineService()
        this.studentNotificationService = new StudentNotificationService()
        this.professorNotificationService = new ProfessorNotificationService()
    }

}