import { StudentMigration } from './Student.migration'
import { FAQMigration } from './FAQ.migration'
import { DepartmentMigration } from './Department.migration'
import { DisciplineMigration } from './Discipline.migration'
import { TagMigration } from './Tag.migration'
import { ProfessorMigration } from './Professor.migration'
import { StudentNotificationMigration } from './StudentNotification.migration'
import { ProfessorNotificationMigration } from './ProfessorNotification.migration'
import { LecturingMigration } from './Lecturing.migration'
import { FeedbackMigration } from './Feedback.migration'
import { HasTagMigration } from './HasTag.migration'
import { HasVoteMigration } from './HasVote.migration'
import { ReportMigration } from './Report.migration'
import { ReportLogMigration } from './ReportLog.migration'

export class MigrationUoW {
    constructor(){
    }

    private async run() {
        
        await new StudentMigration().run()
        await new FAQMigration().run()
        await new DepartmentMigration().run()
        await new DisciplineMigration().run()
        await new TagMigration().run()
        await new ProfessorMigration().run()
        await new LecturingMigration().run()
        await new StudentNotificationMigration().run()
        await new ProfessorNotificationMigration().run()
        await new FeedbackMigration().run()
        await new HasTagMigration().run()
        await new HasVoteMigration().run()
        await new ReportMigration().run()
        await new ReportLogMigration().run()
        
    }

    private async drop() {
        
        await new ReportLogMigration().drop()
        await new ReportMigration().drop()
        await new HasVoteMigration().drop()        
        await new HasTagMigration().drop()
        await new FeedbackMigration().drop()
        await new ProfessorNotificationMigration().drop()
        await new StudentNotificationMigration().drop()
        await new LecturingMigration().drop()
        await new ProfessorMigration().drop()
        await new TagMigration().drop()
        await new DisciplineMigration().drop()
        await new DepartmentMigration().drop()
        await new FAQMigration().drop()
        await new StudentMigration().drop()
        
    }

    async reset() {
        try{
            // await this.drop()
            // await this.run()
            //console.log("Migration ENABLED and SUCCESSFULLY EXECUTED")
        }catch(err: any){
            throw new Error(err)
        }
    }
}