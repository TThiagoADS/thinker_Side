import { Request, Response } from "express";
import { RemoveUserService } from "../../Services/User/RemoveUserService";

class RemoveUserController {
    async handle(request: Request, response: Response) {
        const user_id = request?.query.user_id as string;
        const removeUserService = new RemoveUserService();

        try {
            // Aguarde a execução do serviço de remoção
            const removeUser = await removeUserService.execute({ user_id });
            return response.json(removeUser);
        } catch (error) {
            // Tratar erro caso o usuário não exista
            if (error.message === 'Usuário não encontrado.') {
                return response.status(404).json({ error: error.message });
            }
            // Tratar outros erros
            return response.status(500).json({ error: 'Erro ao remover usuário.' });
        }
    }
}

export { RemoveUserController };
