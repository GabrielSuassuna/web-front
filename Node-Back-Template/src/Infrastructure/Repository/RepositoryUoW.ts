import { Client } from "pg";
import { Database } from "../Database";
import { QueryHandler } from "../Handlers/Query.handler";
import { DepartmentRepository } from "./Department.repository";
import { DisciplineRepository } from "./Discipline.repository";
import { FAQRepository } from "./FAQ.repository";
import { StudentRepository } from "./Student.repository";
import { TagRepository } from "./Tag.repository";
import { ProfessorRepository } from "./Professor.repository";
import { LecturingRepository } from "./Lecturing.repository";
import { FeedbackRepository } from "./Feedback.repository";
import { HasTagRepository } from "./HasTag.repository";
import { HasVoteRepository } from "./HasVote.repository";
import { ReportRepository } from "./Report.repository";
import { ReportLogRepository } from "./ReportLog.repository";

export class RepositoryUoW {

    private client: Client
    private queryHandler: QueryHandler<void>

    departmentRepository: DepartmentRepository
    disciplineRepository: DisciplineRepository
    faqRepository: FAQRepository
    studentRepository: StudentRepository
    tagRepository: TagRepository
    professorRepository: ProfessorRepository
    lecturingRepository: LecturingRepository
    feedbackRepository: FeedbackRepository
    hasTagRepository: HasTagRepository
    hasVoteRepository: HasVoteRepository
    reportRepository: ReportRepository
    reportLogRepository: ReportLogRepository

    constructor(){
        this.client = new Database().getClient();

        this.queryHandler = new QueryHandler<void>(this.client);

        this.departmentRepository = new DepartmentRepository(this.client)
        this.disciplineRepository = new DisciplineRepository(this.client)
        this.faqRepository = new FAQRepository(this.client)
        this.studentRepository = new StudentRepository(this.client)
        this.tagRepository = new TagRepository(this.client)
        this.professorRepository = new ProfessorRepository(this.client)
        this.lecturingRepository = new LecturingRepository(this.client)
        this.feedbackRepository = new FeedbackRepository(this.client)
        this.hasTagRepository = new HasTagRepository(this.client)
        this.hasVoteRepository = new HasVoteRepository(this.client)
        this.reportRepository = new ReportRepository(this.client)
        this.reportLogRepository = new ReportLogRepository(this.client)
    }

    public beginTransaction(){
        try{
            const SQL = `
                BEGIN
            `

            this.queryHandler.runQuery(SQL);
        }catch(err: any){
            throw new Error(`Error beginning transaction; Stack: ${err}`)
        }
        
    }

    public commit(){
        try{
            const SQL = `
                COMMIT
            `

            this.queryHandler.runQuery(SQL);
        }catch(err: any){
            throw new Error(`Error committing transaction; Stack: ${err}`)
        }
    }

    public rollback(){
        try{
            const SQL = `
                ROLLBACK
            `

            this.queryHandler.runQuery(SQL);
        }catch(err: any){
            throw new Error(`Error rollbacking transaction; Stack: ${err}`)
        }
    }
}