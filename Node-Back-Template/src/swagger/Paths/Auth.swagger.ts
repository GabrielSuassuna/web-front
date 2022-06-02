export const AuthPaths = {
    "/auth/admin": {
        "post": {
            "tags": ["Auth"],
            "summary": "Realiza a autenticação de um administrador de sistema.",
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
                    "description": "OK - Admin autenticado com sucesso",
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
    "/auth/student": {
        "post": {
            "tags": ["Auth"],
            "summary": "Realiza a autenticação de um estudante.",
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
    "/auth/professor": {
        "post": {
            "tags": ["Auth"],
            "summary": "Realiza a autenticação de um professor.",
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