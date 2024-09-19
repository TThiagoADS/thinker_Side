import prismaClient from "../../prisma";
import { EditCategoryRequest } from "../../models/Category/EditCategoryRequest";

class EditCategoryService {
    async execute({ name, category_id }: EditCategoryRequest) {
        // Verificar se os argumentos são válidos
        if (!category_id || !name || category_id.trim() === "" || name.trim() === "") {
            throw new Error("Invalid arguments to edit category (name, category_id)");
        }

        // Editar a categoria no banco de dados
        const categoryEdited = await prismaClient.category.update({
            where: {
                id: category_id
            },
            data: {
                name: name
            }
        });

        // Retornar a categoria editada
        return categoryEdited;
    }
}

export { EditCategoryService };
