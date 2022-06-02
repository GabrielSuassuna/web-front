export const FeedbackPaths = {
    "/feedback": {
        "get": {
            "tags": ["Feedback"],
            "summary": "Obtém todos os feedbacks.",
            "parameters": [
                {
                    "name": "disciplineCode",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "disciplineName",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "professorSiape",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "professorName",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "title",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Feedbacks obtidos com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": "1",
                                            "disciplineCode": "1",
                                            "disciplineName": "Algoritmos Aproximativos",
                                            "professorSiape":"1",
                                            "professorName": "Renan Marques",
                                            "title": "Ótimo professor!",
                                            "generalScore": 10,
                                            "date": "01/01/2022",
                                            "upvotes": 5,
                                            "downvotes": 2,
                                        },
                                        {
                                            "id": "2",
                                            "disciplineCode": "1",
                                            "disciplineName": "Algoritmos Aproximativos",
                                            "professorSiape":"1",
                                            "professorName": "Renan Marques",
                                            "title": "Péssimo professor!",
                                            "generalScore": 1,
                                            "date": "02/01/2022",
                                            "upvotes": 0,
                                            "downvotes": 20,
                                        },
                                    ],
                                    "message" : "Feedbacks obtidos com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/Feedback"
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
                    "description": "Not found - Feedbacks não encontrados",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Feedbacks não encontrados"
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
                    "description": "Bad request - Erro ao obter feedbacks",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao obter feedbacks"
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
                }
            }
        },
        "post": {
            "tags": ["Feedback"],
            "summary": "Cria um novo feedback com os dados especificados. Necessita de autenticação de estudante.",
            "security": [{
                "Bearer": []
            }],
            "requestBody": {
                "content": {
                    "application/json": {
                        "required": ["data", "message"],
                        "example": {
                            "id": "1",
                            "lecturingId": "1",
                            "studentId": "1",
                            "title": "Ótimo professor!",
                            "description": "O professor é...",
                            "period":"2020.2",
                            "generalScore": 10,
                            "assiduityScore": 10,
                            "clarityScore": 10,
                            "relationshipScore": 10,
                            "date": "01/01/2022",
                        },
                        "schema": {
                            "$ref": "#/components/schemas/PostFeedback"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "OK - Feedback criado com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": "1",
                                            "lecturingId": "1",
                                            "studentId": "1",
                                            "title": "Ótimo professor!",
                                            "description": "O professor é...",
                                            "period":"2020.2",
                                            "generalScore": 10,
                                            "assiduityScore": 10,
                                            "clarityScore": 10,
                                            "relationshipScore": 10,
                                            "date": "01/01/2022",
                                            "upvotes": 0,
                                            "downvotes": 0,
                                            "hasVoted": 'NONE',
                                        }
                                    ],
                                    "message" : "Feedback criado com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/GetFeedback"
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
                    "description": "Bad request - Erro ao criar feedback",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao criar feedback"
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
    "/feedback/{feedbackId}": {
        "get": {
            "tags": ["Feedback"],
            "summary": "Obtém o feedback especificado.",
            "parameters": [
                {
                    "name": "feedbackId",
                    "in": "path",
                    "description": "ID do feedback",
                    "schema": {
                        "type": "string"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Feedback obtido com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": "1",
                                            "disciplineCode": "1",
                                            "disciplineName": "Algoritmos Aproximativos",
                                            "professorSiape":"1",
                                            "professorName": "Renan Marques",
                                            "title": "Ótimo professor!",
                                            "generalScore": 10,
                                            "date": "01/01/2022",
                                            "upvotes": 5,
                                            "downvotes": 2,
                                        }
                                    ],
                                    "message" : "Feedback obtido com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/Feedback"
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
                    "description": "Not found - Feedback não encontrado",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Feedback não encontrado"
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
                    "description": "Bad request - Erro ao obter feedback",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao obter feedback"
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
                }
            }
        },
        "delete":{
            "tags": ["Feedback"],
            "summary": "Deleta um feedback especificado. Necessita da autenticação do estudante criador.",
            "security": [{
                "Bearer": []
            }],
            "parameters": [
                {
                    "name": "feedbackId",
                    "in": "path",
                    "description": "ID do Feedback",
                    "schema": {
                        "type": "text"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Feedback deletado com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Feedback deletado com sucesso"
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
                    "description": "Bad request - Erro ao deletar feedback",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao deletar feedback"
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
    "/feedback/student/{studentId}": {
        "get": {
            "tags": ["Feedback"],
            "summary": "Obtém todos os feedbacks autorados por um aluno.",
            "parameters": [
                {
                    "name": "studentId",
                    "in": "path",
                    "description": "ID do estudante autor do feedback",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "disciplineCode",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "disciplineName",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "professorSiape",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "professorName",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "title",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Feedbacks obtidos com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": "1",
                                            "disciplineCode": "1",
                                            "disciplineName": "Algoritmos Aproximativos",
                                            "professorSiape":"1",
                                            "professorName": "Renan Marques",
                                            "title": "Ótimo professor!",
                                            "generalScore": 10,
                                            "date": "01/01/2022",
                                            "upvotes": 5,
                                            "downvotes": 2,
                                        },
                                        {
                                            "id": "2",
                                            "disciplineCode": "1",
                                            "disciplineName": "Algoritmos Aproximativos",
                                            "professorSiape":"1",
                                            "professorName": "Renan Marques",
                                            "title": "Péssimo professor!",
                                            "generalScore": 1,
                                            "date": "02/01/2022",
                                            "upvotes": 0,
                                            "downvotes": 20,
                                        },
                                    ],
                                    "message" : "Feedbacks obtidos com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/Feedback"
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
                    "description": "Not found - Feedbacks não encontrados",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Feedbacks não encontrados"
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
                    "description": "Bad request - Erro ao obter feedbacks",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao obter feedbacks"
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
                }
            }
        },
    },
    "/feedback/professor/{professorId}": {
        "get": {
            "tags": ["Feedback"],
            "summary": "Obtém todos os feedbacks feitos a um professor.",
            "parameters": [
                {
                    "name": "professorId",
                    "in": "path",
                    "description": "ID do professor",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "disciplineCode",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "disciplineName",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "title",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Feedbacks obtidos com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": "1",
                                            "disciplineCode": "1",
                                            "disciplineName": "Algoritmos Aproximativos",
                                            "professorSiape":"1",
                                            "professorName": "Renan Marques",
                                            "title": "Ótimo professor!",
                                            "generalScore": 10,
                                            "date": "01/01/2022",
                                            "upvotes": 5,
                                            "downvotes": 2,
                                        },
                                        {
                                            "id": "2",
                                            "disciplineCode": "1",
                                            "disciplineName": "Algoritmos Aproximativos",
                                            "professorSiape":"1",
                                            "professorName": "Renan Marques",
                                            "title": "Péssimo professor!",
                                            "generalScore": 1,
                                            "date": "02/01/2022",
                                            "upvotes": 0,
                                            "downvotes": 20,
                                        },
                                    ],
                                    "message" : "Feedbacks obtidos com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/Feedback"
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
                    "description": "Not found - Feedbacks não encontrados",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Feedbacks não encontrados"
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
                    "description": "Bad request - Erro ao obter feedbacks",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao obter feedbacks"
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
                }
            }
        },
    }
}