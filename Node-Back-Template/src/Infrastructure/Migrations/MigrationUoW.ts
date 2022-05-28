import { StudentMigration } from './Student.migration'
import { FAQMigration } from './FAQ.migration'

export class MigrationUoW {
    constructor(){
    }

    private async run() {
        await new StudentMigration().run()
        await new FAQMigration().run()
    }

    private async drop() {
        await new StudentMigration().drop()
        await new FAQMigration().drop()
    }

    async reset() {
        try{
            await this.drop()
            await this.run()
            //console.log("Migration ENABLED and SUCCESSFULLY EXECUTED")
        }catch(err: any){
            throw new Error(err)
        }
    }
}