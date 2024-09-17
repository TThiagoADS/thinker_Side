import prismaClient from '../../prisma';
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/interfaces/User/UserRequest"

class CreateUserService {

    async execute({name, email, password}: UserRequest) {
        if(!name) {throw new Error("O campo nome é obrigatorio") }
        if(!email) {throw new Error("O campo email é obrigatorio") }
        if(!password) {throw new Error("A senha não pode ser vazia") }

        const userAlreadyExists = await prismaClient.user.findFirst({ //verifica se o usuario já possui cadrastro
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("Email already exists");
        }

        // Encriptando a nossa senha do usuário
        const passwordHash = await hash(password, 8);

        // Criando nosso usuário
        const user = prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user;
    }
}

export { CreateUserService }