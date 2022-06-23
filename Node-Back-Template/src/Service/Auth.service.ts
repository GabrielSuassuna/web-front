import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'

import { GetAuth } from '../Interfaces/Get/Auth.interface'

import { sign } from 'jsonwebtoken'

export class AuthService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async validateAdminCredentials(request: Request, response: Response){
        const sucessMessage: string = "Login efetuado com sucesso"
        const errorMessage: string = "Login não autorizado"
    
        let result: string[] = []
        
        try{
            const authCredentials: GetAuth = request.body
            
            
            if(authCredentials.code == '1234' && authCredentials.password == '1234'){
                const secret = process.env.JWT_SECRET
                if(!secret)
                  return response.status(401).json({ data: [], message: 'Problema ao decodificar o token' });
                
                const token = sign(
                    {
                        id: 1000
                    }, 
                    secret, 
                    {
                        expiresIn: 3000
                    }
                )
                result = [token]
                return response.status(200).json(setApiResponse<string[]>(result, sucessMessage))
            }
            
            return response.status(401).json(setApiResponse<string[]>(result, errorMessage))
        }
        catch(err: any){
            return response.status(401).json(setApiResponse<string[]>(result, errorMessage, err.message))
        }
    }

    public async validateProfessorCredentials(request: Request, response: Response){
        const sucessMessage: string = "Login efetuado com sucesso"
        const errorMessage: string = "Login não autorizado"
    
        let result: string[] = []

        try{
            const authCredentials: GetAuth = request.body
            
            const toBeFoundClient: string[] = await this.repositoryUoW.authRepository.validateProfessorCredentials(authCredentials)
            
            if(!!toBeFoundClient.length){
                const secret = process.env.JWT_SECRET
                if(!secret)
                  return response.status(401).json({ data: [], message: 'Problema ao decodificar o token' });
                
                const token = sign(
                    {
                        id: toBeFoundClient[0]
                    }, 
                    secret, 
                    {
                        expiresIn: 3000
                    }
                )
                result = [token]
                return response.status(200).json(setApiResponse<string[]>(result, sucessMessage))
            }
            
            return response.status(401).json(setApiResponse<string[]>(result, errorMessage))
        }
        catch(err: any){
            return response.status(401).json(setApiResponse<string[]>(result, errorMessage, err.message))
        }
    }

    public async validateStudentCredentials(request: Request, response: Response){
        const sucessMessage: string = "Login efetuado com sucesso"
        const errorMessage: string = "Login não autorizado"
    
        let result: string[] = []

        try{
            const authCredentials: GetAuth = request.body
            const toBeFoundClient: string[] = await this.repositoryUoW.authRepository.validateStudentCredentials(authCredentials)
            
            if(!!toBeFoundClient.length){
                const secret = process.env.JWT_SECRET
                if(!secret)
                  return response.status(401).json({ data: [], message: 'Problema ao decodificar o token' });
                
                const token = sign(
                    {
                        id: toBeFoundClient[0]
                    }, 
                    secret, 
                    {
                        expiresIn: 3000
                    }
                )
                result = [token]
                return response.status(200).json(setApiResponse<string[]>(result, sucessMessage))
            }
            
            return response.status(401).json(setApiResponse<string[]>(result, errorMessage))
        }
        catch(err: any){
            return response.status(401).json(setApiResponse<string[]>(result, errorMessage, err.message))
        }
    }
}