import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma/index";
import { AuthRequest } from "../../models/interfaces/User/auth/AuthRequest";

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        if (!email) {
            throw new Error("Campo email é obrigatório!");
        }

        if (!password) {
            throw new Error("Campo senha é obrigatório!");
        }

        // Verificação de dados
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("Email ou senha inválidos!");
        }

        // Verificação de senha
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Senha inválida!");
        }

        // Gerar token JWT
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn: "30d" // tempo de expiração do token
            }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}

export { AuthUserService };
