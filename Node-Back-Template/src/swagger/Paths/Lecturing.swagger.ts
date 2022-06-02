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
                    "name": "disciplineHours",
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
                                            "id": "1",
                                            "disciplineId": "1",
                                            "disciplineName": "Algoritmos Aproximativos",
                                            "disciplineCode": "CK0101",
                                            "professorId": "1",
                                            "professorName": "Rodrigo Marques",
                                            "professorSiape": "1234",
                                            "professorDepartment": "Departamento de Computação",
                                            "averageScore": 8.7,
                                            "numberOfFeedbacks": 12,
                                        },
                                        {
                                            "id": "2",
                                            "disciplineId": "1",
                                            "disciplineName": "Algoritmos Aproximativos",
                                            "disciplineCode": "CK0101",
                                            "professorId": "6",
                                            "professorName": "Rodrigo Silva",
                                            "professorSiape": "5233",
                                            "professorDepartment": "Departamento de Estatística",
                                            "averageScore": "8",
                                            "numberOfFeedbacks": 1,
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
                                            "id": "1",
                                            "disciplineId": "1",
                                            "disciplineName": "Algoritmos Aproximativos",
                                            "disciplineCode": "CK0101",
                                            "professorId": "1",
                                            "professorName": "Rodrigo Marques",
                                            "professorSiape": "1234",
                                            "professorDepartment": "Departamento de Computação",
                                            "averageScore": 9,
                                            "numberOfFeedbacks": 12,
                                            "assiduityScore": 9,
                                            "clarityScore": 10,
                                            "relationshipScore": 9.5,
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