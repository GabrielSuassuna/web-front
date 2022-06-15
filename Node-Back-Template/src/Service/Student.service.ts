import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { GetStudent } from '../Interfaces/Get/GetStudent.interface'
import { PostStudent } from '../Interfaces/Post/PostStudent.interface'
import { PutStudent } from '../Interfaces/Put/PutStudent.interface'

export class StudentService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async create(request: Request, response: Response){    
        const sucessMessage: string = "Estudante criado com sucesso"
        const errorMessage: string = "Erro ao criar estudante"
        
        let result: GetStudent[] = []
    
        try{
            const toBeCreatedStudent: PostStudent = request.body

            await this.repositoryUoW.beginTransaction();
            
            const studentId: string = await this.repositoryUoW.studentRepository.create(toBeCreatedStudent)

            await this.repositoryUoW.commit();
            
            result.push({
                id: studentId,
                ...toBeCreatedStudent, 
            })
            
            return response.status(200).json(setApiResponse<GetStudent[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetStudent[]>(result, errorMessage, err.message))
        }
    }
    
    public async update(request: Request, response: Response){    
        const sucessMessage: string = "Estudante atualizado com sucesso"
        const errorMessage: string = "Erro ao atualizar estudante"
        const notFoundMessage: string = "Estudante não encontrado"
        
        let result: GetStudent[] = []
    
        try{
            const toBeupdatedStudent: PutStudent = request.body
            const studentId: string = request.params.studentId
            
            await this.repositoryUoW.beginTransaction();
            
            const updatedStudents = await this.repositoryUoW.studentRepository.update(toBeupdatedStudent, studentId)

            if(updatedStudents.length == 0){
                await this.repositoryUoW.rollback();
                return response.status(404).json(setApiResponse<GetStudent[]>(result, errorMessage, notFoundMessage))
            }
            
            await this.repositoryUoW.commit();

            result = updatedStudents

            return response.status(200).json(setApiResponse<GetStudent[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetStudent[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "Estudante deletado com sucesso"
        const errorMessage: string = "Erro ao deletar estudante"
        
        let result: GetStudent[] = []
    
        try{
            const studentId: string = request.params.studentId
            
            await this.repositoryUoW.beginTransaction();
            await this.repositoryUoW.studentRepository.delete(studentId)
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetStudent[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetStudent[]>(result, errorMessage, err.message))
        }
    }
}