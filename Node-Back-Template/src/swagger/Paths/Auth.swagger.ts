export const AuthPaths = {
    "/authStudent": {
        "post": {
            "tags": ["Auth"],
            "summary": "Realiza a autenticação de um estudante.",
            "security": [{
                "Bearer": []
            }],
            "requestBody": {
                "content": {
                    "application/json": {
                        "required": ["data", "message"],
                        "schema": {
                            "$ref": "#/components/schemas/PostAuth"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "OK - Aluno autenticado com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
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
                    "description": "Unauthorized - Erro durante a autenticação",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
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
    "/authProfessor": {
        "post": {
            "tags": ["Auth"],
            "summary": "Realiza a autenticação de um professor.",
            "security": [{
                "Bearer": []
            }],
            "requestBody": {
                "content": {
                    "application/json": {
                        "required": ["data", "message"],
                        "schema": {
                            "$ref": "#/components/schemas/PostAuth"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "OK - Professor autenticado com sucesso",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
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
                    "description": "Unauthorized- Erro durante a autenticação",
                    "content": {
                        "application/json": {
                            "required": ["data", "message"],
                            "schema": {
                                "type": "object",
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