import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

export function authHandler(request: Request, response: Response, next: NextFunction){
    const secret = process.env.JWT_SECRET
    if(!secret)
      return response.status(401).json({ data: [], message: 'Problema ao decodificar o token' });
      
    let token: string = <string>request.headers['authorization'];
    if (!token) return response.status(401).json({ data: [], message: 'Problema ao decodificar o token' });
    
    const splitedToken = token.replace("Bearer ", "")
    
    verify(splitedToken, secret, function(err, decoded) {
      if (err) return response.status(500).json({ data: [], message: 'Falha ao processar a requisição.' });
      
      next();
    });
}