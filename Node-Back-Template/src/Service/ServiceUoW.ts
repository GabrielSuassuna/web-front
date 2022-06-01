import { AuthService } from './Auth.service'
import { ProfessorService } from './Professor.service'

export class ServiceUoW {

    public authService: AuthService
    public professorService: ProfessorService

    constructor(){
        this.authService = new AuthService()
        this.professorService = new ProfessorService()
    }

}