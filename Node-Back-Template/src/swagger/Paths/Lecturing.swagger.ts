export const LecturingPaths = {
    "/lecturing": {
        "get": {
            "tags": ["Lecturing"],
            "summary": "Obtém todas as disciplinas ministradas.",
            "parameters": [
                {
                    "name": "disciplineName",
                    "in": "query",
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
                    "name": "professorName",
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
                    "name": "professorDepartmentName",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "professorDepartmentId",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "OK - Disciplinas ministradas obtidas com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": 8,
                                            "discipline_name": "Disciplina 1",
                                            "discipline_code": "Disciplina1",
                                            "professor_name": "Professor 2",
                                            "professor_siape": "123123123",
                                            "professor_department": "Departamento 1",
                                            "feedback_count": 1,
                                            "average_score": 10
                                        },
                                        {
                                            "id": 9,
                                            "discipline_name": "Disciplina 2",
                                            "discipline_code": "Disciplina2",
                                            "professor_name": "Professor 3",
                                            "professor_siape": "12312454",
                                            "professor_department": "Departamento 2",
                                            "feedback_count": 12,
                                            "average_score": 8.7
                                        },
                                    ],
                                    "message" : "Disciplinas ministradas obtidas com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/Lecturing"
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
                    "description": "Not found - Disciplinas Ministradas não encontradas",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Disciplinas Ministradas não encontrados"
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
                    "description": "Bad request - Erro ao obter disciplinas ministradas",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao obter disciplinas ministradas"
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
            "tags": ["Lecturing"],
            "summary": "Estabelece uma nova disciplina ministrada. Necessita de autenticação do professor ou administrador.",
            "security": [{
                "Bearer": []
            }],
            "requestBody": {
                "content": {
                    "application/json": {
                        "required": ["data", "message"],
                        "example": {    
                            "disciplineId": "1",
                            "professorId": "1",
                        },
                        "schema": {
                            "$ref": "#/components/schemas/PostLecturing"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "OK - Disciplina ministrada criada com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": 8,
                                            "professor_id": 1,
                                            "discipline_id": 1,
                                            "feedback_count": "0",
                                            "average_score": 0
                                        }
                                    ],
                                    "message" : "Disciplina ministrada criada com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/GetLecturing"
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
                    "description": "Bad request - Erro ao criar disciplina ministrada",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao criar disciplina ministrada"
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
    "/lecturing/{lecturingId}": {
        "get": {
            "tags": ["Lecturing"],
            "summary": "Obtém os dados de uma disciplina ministrada especificada.",
            "parameters": [
                {
                    "name": "lecturingId",
                    "in": "path",
                    "description": "ID do relacionamento de disciplina ministrada",
                    "schema": {
                        "type": "string"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Disciplina ministrada obtida com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": 8,
                                            "professor_id": 11,
                                            "discipline_id": 2,
                                            "feedback_count": "1",
                                            "average_score": 10
                                        }
                                    ],
                                    "message" : "Disciplina ministrada obtida com sucesso"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/GetLecturing"
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
                    "description": "Not found - Disciplina ministrada não encontrada",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Disciplina ministrada não encontrada"
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
                    "description": "Bad request - Erro ao obter disciplina ministrada",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao obter disciplina ministrada"
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
        "delete": {
            "tags": ["Lecturing"],
            "summary": "Deletar um relacionamento de disciplina ministrada por um professor especificado. Necessita da autenticação do professor da disciplina.",
            "security": [{
                "Bearer": []
            }],
            "parameters": [
                {
                    "name": "lecturingId",
                    "in": "path",
                    "description": "ID do relacionamento de disciplina ministrada",
                    "schema": {
                        "type": "text"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Relacionamento de disciplina ministrada deletado com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Relacionamento de disciplina ministrada deletado com sucesso"
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
                    "description": "Bad request - Erro ao deletar relacionamento de disciplina ministrada",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Erro ao deletar relacionamento de disciplina ministrada"
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