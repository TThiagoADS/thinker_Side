import { Request, Response, NextFunction } from "express";
import { Payloads } from "../models/interfaces/Payloads";
import { verify } from "jsonwebtoken";

export function isAuthenticated(
    request: Request, response: Response, next: NextFunction
) {
    // Acessando o token JWT
    const authToken = request.headers.authorization;

    console.log("Authorization header:", authToken);

    if (!authToken) {
        return response.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = authToken.split(" ");

    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Verificação da chave secreta

    // Validar token
    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as Payloads;
        request.user_id = sub;
        return next();
    } catch (error) {
        console.error("Erro no verify:", error); // Log do erro no verify
        return response.status(401).json({ error: "Token inválido" });
    }
}
