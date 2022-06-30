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
                    "name": "title",
                    "in": "query",
                    "description": "Título do feedback",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "page",
                    "in": "query",
                    "description": "Página atual que se deseja obter",
                    "schema": {
                        "type": "number"
                    }
                },
                {
                    "name": "limit",
                    "in": "query",
                    "description": "Número de elementos por página",
                    "schema": {
                        "type": "number"
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
                                            "feedback_id": 10,
                                            "feedback_name": "Odeio esse professor",
                                            "author_name": "Rodrigo Marques",
                                            "author_siape": "03042",
                                            "status": "ABERTA"
                                        },
                                        {
                                            "id": "1",
                                            "feedback_id": 10,
                                            "feedback_name": "Odeio esse professor",
                                            "author_name": "Rodrigo Marques",
                                            "author_siape": "03042",
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
                            "feedbackId": "1",
                            "authorId": "1",
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
                                            "feedback_id": "1",
                                            "author_id": "1",
                                            "status": "ABERTA"
                                        }
                                    ],
                                    "message" : "Denúncia criada com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/GetReport"
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
                {
                    "name": "title",
                    "in": "query",
                    "description": "Título do feedback",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "page",
                    "in": "query",
                    "description": "Página atual que se deseja obter",
                    "schema": {
                        "type": "number"
                    }
                },
                {
                    "name": "limit",
                    "in": "query",
                    "description": "Número de elementos por página",
                    "schema": {
                        "type": "number"
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
                                            "id": 11,
                                            "feedback_id": 25,
                                            "author_id": 11,
                                            "status": "ABERTO",
                                            "author_name": "Professor 2",
                                            "author_siape": "123123133",
                                            "reviewer_name": "Professor 2",
                                            "reviewer_siape": "123123123"
                                        },
                                        {
                                            "id": 12,
                                            "feedback_id": 26,
                                            "author_id": 12,
                                            "status": "ABERTO",
                                            "author_name": "Professor 2",
                                            "author_siape": "123123133",
                                            "reviewer_name": "Professor 3",
                                            "reviewer_siape": "123123123"
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
                    "name": "title",
                    "in": "query",
                    "description": "Título do feedback",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "page",
                    "in": "query",
                    "description": "Página atual que se deseja obter",
                    "schema": {
                        "type": "number"
                    }
                },
                {
                    "name": "limit",
                    "in": "query",
                    "description": "Número de elementos por página",
                    "schema": {
                        "type": "number"
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
                                            "id": 11,
                                            "feedback_id": 25,
                                            "author_id": 11,
                                            "status": "ABERTO",
                                            "author_name": "Professor 1",
                                            "author_siape": "123123133",
                                            "reviewer_name": "Professor 2",
                                            "reviewer_siape": "123123123"
                                        },
                                        {
                                            "id": 12,
                                            "feedback_id": 26,
                                            "author_id": 12,
                                            "status": "ABERTO",
                                            "author_name": "Professor 3",
                                            "author_siape": "123123133",
                                            "reviewer_name": "Professor 2",
                                            "reviewer_siape": "123123123"
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
                                    "data": [
                                        {
                                          "id": 11,
                                          "feedback_id": 25,
                                          "author_id": 11,
                                          "reviewer_id": null,
                                          "status": "ABERTO",
                                          "feedback": {
                                            "id": 25,
                                            "lecturing_id": 8,
                                            "title": "Ótimo professor!",
                                            "description": "O professor é...",
                                            "period": "2020.2",
                                            "general_score": 10,
                                            "assiduity_score": 10,
                                            "clarity_score": 10,
                                            "relationship_score": 10,
                                            "date": "2022-01-01T03:00:00.000Z",
                                            "professor_name": "Professor 2",
                                            "professor_siape": "123123123",
                                            "discipline_name": "Disciplina 1",
                                            "discipline_code": "Disciplina1",
                                            "upvote_count": "1",
                                            "downvote_count": "0"
                                          },
                                          "logs": [
                                            {
                                              "id": 9,
                                              "report_id": 11,
                                              "author_id": 11,
                                              "date": "2020-01-01T03:00:00.000Z",
                                              "title": "Feedback denunciado",
                                              "description": "O feedback contém...",
                                              "author_name": "Professor 2",
                                              "author_siape": "Professor 2"
                                            }
                                          ]
                                        }
                                      ],
                                      "message": "Report encontrado com sucesso",
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
                            "authorId": "1234",
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
                                    "data": [
                                        {
                                          "id": 11,
                                          "feedback_id": 25,
                                          "author_id": 11,
                                          "reviewer_id": 10,
                                          "status": "EM_REVISAO",
                                          "feedback": {
                                            "id": 25,
                                            "lecturing_id": 8,
                                            "title": "Ótimo professor!",
                                            "description": "O professor é...",
                                            "period": "2020.2",
                                            "general_score": 10,
                                            "assiduity_score": 10,
                                            "clarity_score": 10,
                                            "relationship_score": 10,
                                            "date": "2022-01-01T03:00:00.000Z",
                                            "professor_name": "Professor 2",
                                            "professor_siape": "123123123",
                                            "discipline_name": "Disciplina 1",
                                            "discipline_code": "Disciplina1",
                                            "upvote_count": "1",
                                            "downvote_count": "0"
                                          },
                                          "logs": [
                                            {
                                              "id": 10,
                                              "report_id": 11,
                                              "author_id": 10,
                                              "date": "2020-01-01T03:00:00.000Z",
                                              "title": "Em revisão",
                                              "description": "Estou revisando essa denúncia",
                                              "author_name": "Professor 1",
                                              "author_siape": "Professor 1"
                                            },
                                            {
                                              "id": 9,
                                              "report_id": 11,
                                              "author_id": 11,
                                              "date": "2020-01-01T03:00:00.000Z",
                                              "title": "Feedback denunciado",
                                              "description": "O feedback contém...",
                                              "author_name": "Professor 2",
                                              "author_siape": "Professor 2"
                                            }
                                          ]
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

}