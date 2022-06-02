export const ReportPaths = {
    "/report": {
        "get": {
            "tags": ["Report"],
            "summary": "Obtém todos as denúncias. Necessita de autenticação de docente. (Ainda não implementado)",
            "security": [{
                "Bearer": []
            }],
            "parameters": [
                {
                    "name": "authorId",
                    "in": "query",
                    "description": "ID do autor da denúncia",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "assignedRevisorId",
                    "in": "query",
                    "description": "ID do revisor que já optou por revisar a denúncia",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "revisorId",
                    "in": "query",
                    "description": "ID do revisor que está vendo as denúncias abertas",
                    "schema": {
                        "type": "string"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Denúncias obtidas com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": "1",
                                            "feedbackName": "Odeio esse professor",
                                            "authorName": "Rodrigo Marques",
                                            "authorSiape": "03042",
                                            "revisorName": "Ricardo Martins",
                                            "revisorSiape": "1242",
                                        },
                                        {
                                            "id": "1",
                                            "feedbackName": "Odeio esse professor",
                                            "authorName": "Rodrigo Marques",
                                            "authorSiape": "03042",
                                        },
                                    ],
                                    "message" : "Denúnias obtidas com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/Report"
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "404": {
                    "description": "Not found - Professores não encontrados",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Professores não encontrados"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "400": {
                    "description": "Bad request - Erro ao obter professores",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao obter professores"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "401": {
                    "description": "Unauthorized - Problema ao decodificar o token",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Problema ao decodificar o token"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "500": {
                    "description": "Internal Server Error - Falha ao processar a requisição",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Falha ao processar a requisição"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
            }
        },
        "post": {
            "tags": ["Report"],
            "summary": "Cria uma nova denúncia com os dados especificados. Necessita de autenticação de docente. (Ainda não implementado)",
            "security": [{
                "Bearer": []
            }],
            "requestBody": {
                "content": {
                    "application/json": {
                        "required": ["data", "message"],
                        "example": {    
                            "feedbackId": "1",
                            "authorId": "1",
                        },
                        "schema": {
                            "$ref": "#/components/schemas/PostReport"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "OK - Denúncia criada com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {    
                                            "id": "1",
                                            "feedbackId": "1",
                                            "authorId": "1",
                                            "status": "OPEN"
                                        }
                                    ],
                                    "message" : "Denúncia criada com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/GetProfessor"
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "400": {
                    "description": "Bad request - Erro ao criar denúncia",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao criar denúncia"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "401": {
                    "description": "Unauthorized - Problema ao decodificar o token",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Problema ao decodificar o token"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "500": {
                    "description": "Internal Server Error - Falha ao processar a requisição",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Falha ao processar a requisição"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },

            }
        },
    },
    "/report/{reportId}": {
        "get": {
            "tags": ["Report"],
            "summary": "Obtém os dados de uma denúncia especificada. Necessita de autenticação de docente. (Ainda não implementado)",
            "security": [{
                "Bearer": []
            }],
            "parameters": [
                {
                    "name": "reportId",
                    "in": "path",
                    "description": "ID da denúncia",
                    "schema": {
                        "type": "string"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Denúncia obtida com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "report": [    
                                        {
                                            "id": "1",
                                            "feedbackId": "1",
                                            "authorId": "1",
                                            "reviewerId": "1",
                                            "status": "OPEN",
                                        }
                                    ],
                                    "logs": [
                                        {    
                                            "id": "1",
                                            "date": "01/01/2022",
                                            "title": "Denúncia Aberta",
                                            "authorName": "Rodrigo Marques",
                                        },
                                        {    
                                            "id": "2",
                                            "date": "02/01/2022",
                                            "title": "Denúncia aceita para revisão",
                                            "description": "Vou dar uma olhada",
                                            "authorName": "Ricardo Martins",
                                        }
                                    ],
                                    "message" : "Denúncia obtida com sucesso"
                                }, 
                                "properties": {
                                    "report": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/GetReport"
                                        }
                                    },
                                    "logs": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/GetReportLog"
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "404": {
                    "description": "Not found - Denúncia não encontrada",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Denúncia não encontrada"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "400": {
                    "description": "Bad request - Erro ao obter denúncia",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao obter denúncia"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "401": {
                    "description": "Unauthorized - Problema ao decodificar o token",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Problema ao decodificar o token"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "500": {
                    "description": "Internal Server Error - Falha ao processar a requisição",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Falha ao processar a requisição"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
            }
        },
        "delete": {
            "tags": ["Report"],
            "summary": "Deletar uma denúncia especificada. Necessita de autenticação de docente. (Ainda não implementado)",
            "security": [{
                "Bearer": []
            }],
            "parameters": [
                {
                    "name": "reportId",
                    "in": "path",
                    "description": "ID da Denúncia",
                    "schema": {
                        "type": "text"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Denúncia deletada com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Denúncia deletada com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "400": {
                    "description": "Bad request - Erro ao deletar denúncia",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao deletar denúncia"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "401": {
                    "description": "Unauthorized - Problema ao decodificar o token",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Problema ao decodificar o token"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "500": {
                    "description": "Internal Server Error - Falha ao processar a requisição",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Falha ao processar a requisição"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
            }
        },
    },
    "report/update/{reportId}": {
        "put": {
            "tags": ["Report"],
            "summary": "Atualiza uma denúncia especificada. Necessita de autenticação de docente. (Ainda não implementado)",
            "security": [{
                "Bearer": []
            }],
            "parameters": [
                {
                    "name": "reportId",
                    "in": "path",
                    "description": "ID da denúncia",
                    "schema": {
                        "type": "string"
                    }
                },
            ],
            "requestBody": {
                "content": {
                    "application/json": {
                        "required": ["data", "message"],
                        "example": {    
                            "status": "REVOKE",
                            "date": "01/01/2020",
                            "description": "Estou revogando essa deúncia",
                            "authorId": "Rodrigo Marques",
                        },
                        "schema": {
                            "$ref": "#/components/schemas/PutReportLog"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "OK - Denúncia atualizada com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "report": [    
                                        {
                                            "id": "1",
                                            "feedbackId": "1",
                                            "authorId": "1",
                                            "reviewerId": "1",
                                            "status": "REVOKED",
                                        }
                                    ],
                                    "logs": [
                                        {    
                                            "id": "1",
                                            "date": "01/01/2022",
                                            "title": "Denúncia Aberta",
                                            "authorName": "Ricardo Martins",
                                        },
                                        {    
                                            "id": "2",
                                            "date": "02/01/2022",
                                            "title": "Denúncia aceita para revisão",
                                            "description": "Vou dar uma olhada",
                                            "authorName": "Rodrigo Marques",
                                        },
                                        {    
                                            "id": "3",
                                            "date": "03/01/2022",
                                            "title": "Denúncia revogada",
                                            "description": "Estou revogando essa deúncia",
                                            "authorName": "Rodrigo Marques",
                                        }
                                    ],
                                    "message" : "Denúncia atualizada com sucesso"
                                }, 
                                "properties": {
                                    "report": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/GetReport"
                                        }
                                    },
                                    "logs": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/GetReportLog"
                                        }
                                    },   
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "404": {
                    "description": "Not found - Denúncia não encontrada",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Denúncia não encontrada"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "400": {
                    "description": "Bad request - Erro ao atualizar denúncia",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao atualizar denúncia"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "401": {
                    "description": "Unauthorized - Problema ao decodificar o token",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Problema ao decodificar o token"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
                "500": {
                    "description": "Internal Server Error - Falha ao processar a requisição",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Falha ao processar a requisição"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                        }
                                    },    
                                    "message": {
                                        "type": "string"
                                    },
                                },
                            }
                        }
                    },
                },
            }
        },
    },

}