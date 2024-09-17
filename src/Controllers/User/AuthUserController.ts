import { Request, Response } from "express";
import { AuthUserService } from "../../Services/User/AuthUserService";
import { AuthRequest } from "../../models/interfaces/User/auth/AuthRequest";

class AuthUserController {
    async handle(request: Request, response: Response) {
        const { email, password }: AuthRequest = request.body;

        const authUserService = new AuthUserService();
        
        try {
            const auth = await authUserService.execute({
                email, 
                password
            });

            return response.json(auth);
        } catch (error) {
            return response.status(400).json({ error: "Dados invalidos." });
        }
    }
}

export { AuthUserController };
