import { PrismaClient } from "@prisma/client";
import {hash} from "bcryptjs";
import {UserRequest} from "../../models/interfaces/User/UserRequest"

class CreateUserService{

    async execute({name, email, password}: UserRequest) {
        if(!name) {throw new Error("O campo nome é obrigatorio") }
        if(!email) {throw new Error("O campo email é obrigatorio") }
        if(!password) {throw new Error("A senha não pode ser vazia") }

        const userAlreadyExists = await PrismaClient.user.findFirst({ //verifica se o usuario ja possui login
            where : {
                email:email
            }
        })

        if (userAlreadyExists){
            throw new Error("Email alredy exists!");
        }
        //Crypto password user.
        const passwordHash = await hash(password,8);

        const user = PrismaClient.user.create({
            data: {
                name: name,
                email:email,
                password:passwordHash
            },
            select: {
                id:true,
                name:true,
                email:true
            }
        })

        return user;

    }

}

export {CreateUserService};