import { AuthService } from './Auth.service'
import { DepartmentService } from './Department.service'
import { DisciplineService } from './Discipline.service'
import { FAQService } from './FAQ.service'
import { FeedbackService } from './Feedback.service'
import { LecturingService } from './Lecturing.service'
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
    public lecturingService: LecturingService
    public studentNotificationService: StudentNotificationService
    public professorNotificationService: ProfessorNotificationService
    public departmentService: DepartmentService
    public feedbackService: FeedbackService
    
    constructor(){
        this.authService = new AuthService()
        this.professorService = new ProfessorService()
        this.studentService = new StudentService()
        this.faqService = new FAQService()
        this.tagService = new TagService()
        this.disciplineService = new DisciplineService()
        this.lecturingService = new LecturingService()
        this.studentNotificationService = new StudentNotificationService()
        this.professorNotificationService = new ProfessorNotificationService()
        this.departmentService = new DepartmentService()
        this.feedbackService = new FeedbackService()
    }

}