import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { DepartmentInterface } from '../Interfaces/Department.interface'
import { DepartmentFilter } from '../Interfaces/Filters/DepartmentFilter.interface'
import { GetDepartment } from '../Interfaces/Get/GetDepartment.interface'
import { GetProfessor } from '../Interfaces/Get/GetProfessor.interface'
import { PostDepartment } from '../Interfaces/Post/PostDepartment.interface'
import { PutDepartment } from '../Interfaces/Put/PutDepartment.interface'
import { ReportInterface } from '../Interfaces/Report.interface'

export class DepartmentService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getAll(request: Request, response: Response){
        const sucessMessage: string = "Departamentos encontrados com sucesso"
        const errorMessage: string = "Erro ao encontrar departamentos"
        const notFoundMessage: string = "Departamentos não encontrados"
    
        let result: DepartmentInterface[] = []
    
        try{

            const { 
                name
            } = request.query as any
            
            const deparmentFilter: DepartmentFilter = { name }

            const toBeFoundDepartment: DepartmentInterface[] = await this.repositoryUoW.departmentRepository.getAll(deparmentFilter)

            if(!!toBeFoundDepartment.length){
                return response.status(200).json(setApiResponse<DepartmentInterface[]>(toBeFoundDepartment, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<DepartmentInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<DepartmentInterface[]>(result, errorMessage, err.message))
        }
    }

    public async getDepartmentCoordinator(request: Request, response: Response){
        const sucessMessage: string = "Coordenador do departamento encontrado com sucesso"
        const errorMessage: string = "Erro ao encontrar coordenador do departamento"
        const notFoundMessage: string = "Coordenador do departamento não encontrado"
    
        let result: GetDepartment[] = []
    
        try{
            const departmentId: string = request.params.departmentId
            
            const toBeFoundDiscipline: GetDepartment[] = await this.repositoryUoW.departmentRepository.getDepartmentCoordinator(departmentId)
            
            if(!!toBeFoundDiscipline.length){
                return response.status(200).json(setApiResponse<GetDepartment[]>(toBeFoundDiscipline, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<GetDepartment[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<GetDepartment[]>(result, errorMessage, err.message))
        }    
    }

    public async getDepartmentChief(request: Request, response: Response){
        const sucessMessage: string = "Chefe do departamento encontrado com sucesso"
        const errorMessage: string = "Erro ao encontrar chefe do departamento"
        const notFoundMessage: string = "Chefe do departamento não encontrado"
    
        let result: GetDepartment[] = []
    
        try{
            const departmentId: string = request.params.departmentId
            
            const toBeFoundDiscipline: GetDepartment[] = await this.repositoryUoW.departmentRepository.getDepartmentChief(departmentId)
            
            if(!!toBeFoundDiscipline.length){
                return response.status(200).json(setApiResponse<GetDepartment[]>(toBeFoundDiscipline, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<GetDepartment[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<GetDepartment[]>(result, errorMessage, err.message))
        }    
    }

    public async create(request: Request, response: Response){    
        const sucessMessage: string = "Departamento criado com sucesso"
        const errorMessage: string = "Erro ao criar departamento"
        
        let result: GetDepartment[] = []
    
        try{
            const toBeCreatedDepartment: PostDepartment = request.body

            await this.repositoryUoW.beginTransaction();
            
            const departmentId: string = await this.repositoryUoW.departmentRepository.create(toBeCreatedDepartment)

            await this.repositoryUoW.commit();
            
            result.push({
                id: departmentId,
                ...toBeCreatedDepartment, 
                course_coordinator_id: undefined,
                department_head_id: undefined,
            })
            
            return response.status(200).json(setApiResponse<GetDepartment[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetDepartment[]>(result, errorMessage, err.message))
        }
    }
    
    public async update(request: Request, response: Response){    
        const sucessMessage: string = "Departamento atualizado com sucesso"
        const errorMessage: string = "Erro ao atualizar departamento"
        const notFoundMessage: string = "Departamento não encontrado"
        
        let result: GetDepartment[] = []
    
        try{
            const toBeupdatedDepartment: PutDepartment = request.body
            const departmentId: string = request.params.departmentId
            
            await this.repositoryUoW.beginTransaction();
            
            const updatedDepartments = await this.repositoryUoW.departmentRepository.update(toBeupdatedDepartment, departmentId)

            if(updatedDepartments.length == 0){
                await this.repositoryUoW.rollback();
                return response.status(404).json(setApiResponse<GetDepartment[]>(result, errorMessage, notFoundMessage))
            }

            await this.repositoryUoW.commit();

            result = updatedDepartments

            return response.status(200).json(setApiResponse<GetDepartment[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetDepartment[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "Departamento deletado com sucesso"
        const errorMessage: string = "Erro ao deletar departamento"
        
        let result: GetDepartment[] = []
    
        try{
            const departmentId: string = request.params.departmentId
            
            await this.repositoryUoW.beginTransaction();
            await this.repositoryUoW.departmentRepository.delete(departmentId)
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetDepartment[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetDepartment[]>(result, errorMessage, err.message))
        }
    }

    public async updateCourseCoordinator(request: Request, response: Response){    
        const sucessMessage: string = "Coordenador de curso atualizado com sucesso"
        const errorMessage: string = "Erro ao atualizar coordenador de curso"
        const departmentError: string = "O coordenador de curso precisa ser um professor do departamento";
        
        let result: GetDepartment[] = []
    
        try{
            const departmentId: string = request.params.departmentId
            const { 
                professorId
            } = request.query as any

            const newCoord: GetProfessor[] = await this.repositoryUoW.professorRepository.getById(professorId);

            if(newCoord[0].department_id != departmentId)
                return response.status(400).json(setApiResponse<GetDepartment[]>([], errorMessage, departmentError))
            
            await this.repositoryUoW.beginTransaction();
            
            const department:GetDepartment[] =  await this.repositoryUoW.departmentRepository.getById(departmentId);
            const coordinatorId = department[0].course_coordinator_id;
            
            // Transferência de revisões devido a troca de coordenador de curso
            if(coordinatorId){
                const toBeFoundReports: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllByReviewer(coordinatorId)
                toBeFoundReports.map( async (r) => {
                    await this.repositoryUoW.reportRepository.update({
                        status: "ABERTO"
                    }, r.id);
                    await this.repositoryUoW.reportLogRepository.create({
                        date: new Date(),
                        title: "Feedback denunciado",
                        description: "Revisão cancelada devido à troca de coordenador de curso"
                    }, r.id, coordinatorId);
                })
            }

            await this.repositoryUoW.departmentRepository.updateCourseCoordinator(departmentId, professorId);
            result =  await this.repositoryUoW.departmentRepository.getById(departmentId);
    
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetDepartment[]>(result, sucessMessage));
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetDepartment[]>(result, errorMessage, err.message))
        }
    }

    public async updateDepartmentHead(request: Request, response: Response){    
        const sucessMessage: string = "Chefe de departamento atualizado com sucesso"
        const errorMessage: string = "Erro ao atualizar chefe de departamento"
        const departmentError: string = "O chefe de departamento precisa ser um professor do departamento";
        
        let result: GetDepartment[] = []
    
        try{
            const departmentId: string = request.params.departmentId
            const { 
                professorId
            } = request.query as any
            
            const newHead: GetProfessor[] =  await this.repositoryUoW.professorRepository.getById(professorId);

            if(newHead[0].department_id != departmentId)
                return response.status(400).json(setApiResponse<GetDepartment[]>([], errorMessage, departmentError))

            await this.repositoryUoW.beginTransaction();

            const department:GetDepartment[] =  await this.repositoryUoW.departmentRepository.getById(departmentId);
            const departmentHeadId = department[0].department_head_id;
            console.log(departmentHeadId)
            // Transferência de revisões devido a troca de chefe de departamento
            if(departmentHeadId){
                const toBeFoundReports: ReportInterface[] = await this.repositoryUoW.reportRepository.getAllByReviewer(departmentHeadId)
                toBeFoundReports.map( async (r) => {
                    console.log(r)
                    await this.repositoryUoW.reportRepository.update({
                        status: "ABERTO"
                    }, r.id);
                    await this.repositoryUoW.reportLogRepository.create({
                        date: new Date(),
                        title: "Feedback denunciado",
                        description: "Revisão cancelada devido à troca de chefe de departamento"
                    }, r.id, departmentHeadId);
                })
            }
            
            await this.repositoryUoW.departmentRepository.updateDepartmentHead(departmentId, professorId);

            result =  await this.repositoryUoW.departmentRepository.getById(departmentId);
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetDepartment[]>(result, sucessMessage));
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetDepartment[]>(result, errorMessage, err.message))
        }
    }
}