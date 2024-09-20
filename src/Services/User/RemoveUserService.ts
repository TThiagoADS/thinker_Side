import prismaClient from "../../prisma";

class RemoveUserService {
    async execute({ user_id }: { user_id: string }) {
        // Verifica se o usuário existe
        const userExists = await prismaClient.user.findUnique({
            where: { id: user_id },
        });

        if (!userExists) {
            throw new Error('Usuário não encontrado.');
        }

        // Remove o usuário
        const removeUser = await prismaClient.user.delete({
            where: { id: user_id },
        });

        return removeUser;
    }
}

export { RemoveUserService };
