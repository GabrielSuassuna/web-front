import { Request, Response } from 'express'
import { setApiResponse } from '../ApiHandlers/ApiResponse.handler'
import { RepositoryUoW } from '../Infrastructure/Repository/RepositoryUoW'
import { GetTag } from '../Interfaces/Get/GetTag.interface'
import { PostTag } from '../Interfaces/Post/PostTag.interface'
import { PutTag } from '../Interfaces/Put/PutTag.interface'
import { TagInterface } from '../Interfaces/Tag.interface'

export class TagService {
    private repositoryUoW: RepositoryUoW

    constructor(){
        this.repositoryUoW = new RepositoryUoW()
    }

    public async getAll(request: Request, response: Response){
        const sucessMessage: string = "Tags encontrados com sucesso"
        const errorMessage: string = "Erro ao encontrar tags"
        const notFoundMessage: string = "Tags não encontrados"
    
        let result: TagInterface[] = []
    
        try{
            const toBeFoundTags: TagInterface[] = await this.repositoryUoW.tagRepository.getAll()

            if(!!toBeFoundTags.length){
                return response.status(200).json(setApiResponse<TagInterface[]>(toBeFoundTags, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<TagInterface[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<TagInterface[]>(result, errorMessage, err.message))
        }
    }

    public async getById(request: Request, response: Response){
        const sucessMessage: string = "Tag encontrado com sucesso"
        const errorMessage: string = "Erro ao encontrar tag"
        const notFoundMessage: string = "Tag não encontrado"
    
        let result: GetTag[] = []
    
        try{
            const tagId: string = request.params.tagId
            
            const toBeFoundTag: GetTag[] = await this.repositoryUoW.tagRepository.getById(tagId)
            
            if(!!toBeFoundTag.length){
                return response.status(200).json(setApiResponse<GetTag[]>(toBeFoundTag, sucessMessage))
            }
            
            return response.status(404).json(setApiResponse<GetTag[]>(result, notFoundMessage))
        }
        catch(err: any){
            return response.status(400).json(setApiResponse<GetTag[]>(result, errorMessage, err.message))
        }    
    }

    public async create(request: Request, response: Response){    
        const sucessMessage: string = "Tag criado com sucesso"
        const errorMessage: string = "Erro ao criar tag"
        
        let result: GetTag[] = []
    
        try{
            const toBeCreatedTag: PostTag = request.body

            await this.repositoryUoW.beginTransaction();
            
            const professorId: string = await this.repositoryUoW.tagRepository.create(toBeCreatedTag)

            await this.repositoryUoW.commit();
            
            result.push({
                id: professorId,
                ...toBeCreatedTag, 
            })
            
            return response.status(200).json(setApiResponse<GetTag[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetTag[]>(result, errorMessage, err.message))
        }
    }
    
    public async update(request: Request, response: Response){    
        const sucessMessage: string = "Tag atualizado com sucesso"
        const errorMessage: string = "Erro ao atualizar tag"
        const notFoundMessage: string = "Tag não encontrada"
        
        let result: GetTag[] = []
    
        try{
            const toBeupdatedTag: PutTag = request.body
            const tagId: string = request.params.tagId
            
            await this.repositoryUoW.beginTransaction();
            
            const updatedTags = await this.repositoryUoW.tagRepository.update(toBeupdatedTag, tagId)

            if(updatedTags.length == 0){
                await this.repositoryUoW.rollback();
                return response.status(404).json(setApiResponse<GetTag[]>(result, errorMessage, notFoundMessage))
            }
            
            await this.repositoryUoW.commit();

            result = updatedTags

            return response.status(200).json(setApiResponse<GetTag[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetTag[]>(result, errorMessage, err.message))
        }
    }

    public async delete(request: Request, response: Response){    
        const sucessMessage: string = "Tag deletado com sucesso"
        const errorMessage: string = "Erro ao deletar tag"
        
        let result: GetTag[] = []
    
        try{
            const tagId: string = request.params.tagId
            
            await this.repositoryUoW.beginTransaction();
            await this.repositoryUoW.tagRepository.delete(tagId)
            await this.repositoryUoW.commit();

            return response.status(200).json(setApiResponse<GetTag[]>(result, sucessMessage))
        }
        catch(err: any){
            await this.repositoryUoW.rollback();
            return response.status(400).json(setApiResponse<GetTag[]>(result, errorMessage, err.message))
        }
    }
}