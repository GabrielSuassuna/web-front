import { Client } from './Models/Client.swagger'
import { Address } from './Models/Address.swagger'
import { Professor } from './Models/Professor.swagger'
import { Lecturing } from './Models/Lecturing.swagger'

import { PostClient } from './Models/Post/PostClient.swagger'
import { GetAddress } from './Models/Get/Address.swagger'
import { PutAddress } from './Models/Put/Address.swagger'
import { PostAddress } from './Models/Post/Address.swagger'

import { GetClient } from './Models/Get/Client.swagger'
import { PutClient } from './Models/Put/PutClient.swagger'

import { PostAuth } from './Models/Post/Auth.swagger'

import { GetProfessor } from './Models/Get/Professor.swagger'
import { PutProfessor } from './Models/Put/Professor.swagger'
import { PostProfessor } from './Models/Post/Professor.swagger'

import { GetLecturing } from './Models/Get/Lecturing.swagger'

import { AuthPaths } from './Paths/Auth.swagger'
import { AddressPaths } from './Paths/Address.swagger'
import { ClientPaths } from './Paths/Client.swagger'
import { ProfessorPaths } from './Paths/Professor.swagger'
import { LecturingPaths } from './Paths/Lecturing.swagger'

export const swaggerDocument = {
    "openapi": "3.0.1",
    "info": {
        "version": "1.0.0",
        "title": "Web API Document",
        "license": {
          "name": 'Apache 2.0',
          "url": 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    "basePath": "/",
    "schemes": ["http"],
    "host": "localhost:3000",
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "tags": [
        {
          "name": "Auth",
          "description": "Todos os endpoints relacionados com a autenticação de usuários."
        },
        {
          "name": "Professor",
          "description": "Todos os endpoints relacionados com membros do corpo docente."
        },
        {
          "name": "Lecturing",
          "description": "Todos os endpoints relacionados com disciplinas ministradas por um membro do corpo docente."
        },
        {
          "name": "Client",
          "description": "All Client related endpoints"
        },
        {
          "name": "Address",
          "description": "All Address related endpoints"
        }
    ],
    "paths": {
      ...AuthPaths,
      ...ProfessorPaths,
      ...LecturingPaths,
      ...ClientPaths,
      ...AddressPaths,
    },
    "components": {
      "schemas":{
        PostAuth,
        Professor,
        GetProfessor,
        PutProfessor,
        PostProfessor,
        Lecturing,
        GetLecturing,
        Client,
        GetClient,
        PostClient,
        PutClient,
        Address,
        GetAddress,
        PutAddress,
        PostAddress,
      },
      "securitySchemes": {
        "Bearer": {
          "type": "http",
          "in": "header",
          "description": "JWT Authorization header using the Bearer scheme.",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      }
    },
}