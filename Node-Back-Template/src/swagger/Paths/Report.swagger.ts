export const ReportPaths = {
    "/report": {
        "get": {
            "tags": ["Report"],
            "summary": "Obtém todos as denúncias em aberto que podem ser revisadas. Necessita de autenticação de docente.",
            "security": [{
                "Bearer": []
            }],
            "parameters": [
                {
                    "name": "viewerId",
                    "in": "query",
                    "description": "Id do usuário atual",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "feedbackName",
                    "in": "query",
                    "description": "Nome do feedback",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "authorName",
                    "in": "query",
                    "description": "Nome do autor da denúncia",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "authorSiape",
                    "in": "query",
                    "description": "SIAPE do autor da denúncia",
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
                                            "status": "ABERTA"
                                        },
                                        {
                                            "id": "1",
                                            "feedbackName": "Odeio esse professor",
                                            "authorName": "Rodrigo Marques",
                                            "authorSiape": "03042",
                                            "status": "ABERTA"
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
            "summary": "Cria uma nova denúncia com os dados especificados. Necessita de autenticação de docente.",
            "security": [{
                "Bearer": []
            }],
            "requestBody": {
                "content": {
                    "application/json": {
                        "required": ["data", "message"],
                        "example": {    
                            "feedback_id": "1",
                            "author_id": "1",
                            "description": "O feedback contém...",
                            "date": "01/01/2020"
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
                                            "status": "ABERTA"
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
    "/report/professor/{professorId}": {
        "get": {
            "tags": ["Report"],
            "summary": "Obtém todos as denúncias feitas pelo professor especificado. Necessita de autenticação de docente.",
            "security": [{
                "Bearer": []
            }],
            "parameters": [
                {
                    "name": "professorId",
                    "in": "path",
                    "description": "ID do autor da denúncia",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "feedbackName",
                    "in": "query",
                    "description": "Nome do feedback",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "reviewerName",
                    "in": "query",
                    "description": "Nome do revisor da denúncia",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "reviewerSiape",
                    "in": "query",
                    "description": "SIAPE do revisor da denúncia",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "status",
                    "in": "query",
                    "description": "Status da denúncia",
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
                                            "reviewerName": "Ricardo Martins",
                                            "reviewerSiape": "1242",
                                            "status": "EM REVISÃO"
                                        },
                                        {
                                            "id": "2",
                                            "feedbackName": "Odeio muito esse professor",
                                            "authorName": "Rodrigo Marques",
                                            "authorSiape": "03042",
                                            "reviewerName": "Ricardo Martins",
                                            "reviewerSiape": "1242",
                                            "status": "EM REVISÃO"
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
                    "description": "Not found - Denúncias não encontradas",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Denúncias não encontradas"
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
                    "description": "Bad request - Erro ao obter denúncias",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao obter denúncias"
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
    "/report/reviewer/{professorId}": {
        "get": {
            "tags": ["Report"],
            "summary": "Obtém todos as denúncias que estão sendo revisadas pelo professor especificado. Necessita de autenticação de docente.",
            "security": [{
                "Bearer": []
            }],
            "parameters": [
                {
                    "name": "professorId",
                    "in": "path",
                    "description": "ID do revisor da denúncia",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "feedbackName",
                    "in": "query",
                    "description": "Nome do feedback",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "authorName",
                    "in": "query",
                    "description": "Nome do autor da denúncia",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "authorSiape",
                    "in": "query",
                    "description": "SIAPE do autor da denúncia",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "status",
                    "in": "query",
                    "description": "Status da denúncia",
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
                                            "reviewerName": "Ricardo Martins",
                                            "reviewerSiape": "1242",
                                        },
                                        {
                                            "id": "2",
                                            "feedbackName": "Odeio muito esse professor",
                                            "authorName": "Rodrigo Marques",
                                            "authorSiape": "03042",
                                            "reviewerName": "Ricardo Martins",
                                            "reviewerSiape": "1242",
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
                    "description": "Not found - Denúncias não encontradas",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Denúncias não encontradas"
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
                    "description": "Bad request - Erro ao obter denúncias",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao obter denúncias"
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
            "summary": "Obtém os dados de uma denúncia especificada. Necessita de autenticação de docente.",
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
            "summary": "Deletar uma denúncia especificada. Necessita de autenticação de docente.",
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
            "summary": "Atualiza uma denúncia especificada. Necessita de autenticação de docente.",
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
                            "author_id": "1234",
                            "status": "REVOGADA",
                            "date": "01/01/2020",
                            "title": "Denúncia revogada",
                            "description": "Estou revogando essa deúncia",
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