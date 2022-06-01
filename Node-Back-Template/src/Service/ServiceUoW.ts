import { AuthService } from './Auth.service'
import { FAQService } from './FAQ.service'
import { ProfessorService } from './Professor.service'
import { StudentService } from './Student.service'
import { TagService } from './Tag.service'

export class ServiceUoW {

    public authService: AuthService
    public professorService: ProfessorService
    public studentService: StudentService
    public faqService: FAQService
    public tagService: TagService
    
    constructor(){
        this.authService = new AuthService()
        this.professorService = new ProfessorService()
        this.studentService = new StudentService()
        this.faqService = new FAQService()
        this.tagService = new TagService()
    }

}