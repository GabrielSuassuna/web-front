export const ProfessorPaths = {
    "/professor": {
        "get": {
            "tags": ["Professor"],
            "summary": "Obtém todos os professores de um departamento.",
            "responses": {
                "200": {
                    "description": "OK - Professores obtidos com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": "1",
                                            "departmentId": "5",
                                            "siape": "03042",
                                            "name": "Rodrigo Marques",
                                        },
                                        {
                                            "id": "5",
                                            "departmentId": "5",
                                            "siape": "03148",
                                            "name": "Ricardo Martins",
                                        },
                                    ],
                                    "message" : "Success"
                                }, 
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/Professor"
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
                    "description": "Bad request - Requisição mal formatada ou inválida",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Requisição mal formatada ou inválida"
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
    "/professor/{departmentId}": {
        "post": {
            "tags": ["Professor"],
            "summary": "Cria um novo professor no departamento com os dados especificados.",
            "parameters": [
                {
                    "name": "departmentId",
                    "in": "path",
                    "description": "ID do departamento",
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
                            "siape": "03042",
                            "name": "Rodrigo Marques",
                            "about": "Rodrigo Marques é professor do departamento...",
                            "lattes_url": "lattes.cnpq.br/...",
                            "is_head_of_department": false,
                            "is_course_coordinator": false,
                        },
                        "schema": {
                            "$ref": "#/components/schemas/PostProfessor"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "OK - Professor criado com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": "1",
                                            "departmentId": "5",
                                            "siape": "03042",
                                            "name": "Rodrigo Marques",
                                            "about": "Rodrigo Marques é professor do departamento...",
                                            "lattes_url": "lattes.cnpq.br/...",
                                            "is_head_of_department": false,
                                            "is_course_coordinator": false,
                                        }
                                    ],
                                    "message" : "Success"
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
                "404": {
                    "description": "Not found - Departamento não encontrado",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Departamento não encontrado"
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
                    "description": "Bad request - Requisição mal formatada ou inválida",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Requisição mal formatada ou inválida"
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
    "/professor/{professorId}": {
        "get": {
            "tags": ["Professor"],
            "summary": "Obtém os dados de um professor especificado.",
            "parameters": [
                {
                    "name": "professorId",
                    "in": "path",
                    "description": "ID do professor",
                    "schema": {
                        "type": "string"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Professor obtido com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": "1",
                                            "departmentId": "5",
                                            "siape": "03042",
                                            "name": "Rodrigo Marques",
                                            "about": "Rodrigo Marques é professor do departamento...",
                                            "lattes_url": "lattes.cnpq.br/...",
                                            "is_head_of_department": false,
                                            "is_course_coordinator": false,
                                        }
                                    ],
                                    "message" : "Success"
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
                "404": {
                    "description": "Not found - Professor não encontrado",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Professor não encontrado"
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
                    "description": "Bad request - Requisição mal formatada ou inválida",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Requisição mal formatada ou inválida"
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
        "put": {
            "tags": ["Professor"],
            "summary": "Atualiza os dados de um professor especificado.",
            "parameters": [
                {
                    "name": "professorId",
                    "in": "path",
                    "description": "ID do professor",
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
                            "id": "1",
                            "departmentId": "5",
                            "siape": "03042",
                            "name": "Rodrigo Marques",
                            "about": "Rodrigo Marques é professor do departamento...",
                            "lattes_url": "lattes.cnpq.br/...",
                            "is_head_of_department": false,
                            "is_course_coordinator": false,
                        },
                        "schema": {
                            "$ref": "#/components/schemas/PutProfessor"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "OK - Professor editado com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [
                                        {
                                            "id": "1",
                                            "departmentId": "5",
                                            "siape": "03042",
                                            "name": "Rodrigo Marques",
                                            "about": "Rodrigo Marques é professor do departamento...",
                                            "lattes_url": "lattes.cnpq.br/...",
                                            "is_head_of_department": false,
                                            "is_course_coordinator": false,
                                        }
                                    ],
                                    "message" : "Success"
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
                "404": {
                    "description": "Not found - Professor não encontrado",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Professor não encontrado"
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
                    "description": "Bad request - Requisição mal formatada ou inválida",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Requisição mal formatada ou inválida"
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
            "tags": ["Professor"],
            "summary": "Deletar um professor especificado.",
            "security": [{
                "Bearer": []
            }],
            "parameters": [
                {
                    "name": "professorId",
                    "in": "path",
                    "description": "ID do Professor",
                    "schema": {
                        "type": "text"
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "OK - Professor deletado com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Professor deletado com sucesso"
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
                    "description": "Bad request - Requisição mal formatada ou inválida",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
                                "example": {
                                    "data": [],
                                    "message" : "Requisição mal formatada ou inválida"
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
}