import prismaClient from "../../prisma";
import { RemoveCategoryRequest } from '../../models/Category/RemoveCategoryRequest';

class RemoveCategoryService {
    async execute({ category_id }: RemoveCategoryRequest) {
        
        if (!category_id) {
            throw new Error('O ID da categoria é necessário.');
        }

        
        const categoryExists = await prismaClient.category.findUnique({
            where: {
                id: category_id,
            },
        });

        if (!categoryExists) {
            throw new Error('Categoria não encontrada.');
        }

        
        const category = await prismaClient.category.delete({
            where: {
                id: category_id,
            },
        });

        return category;
    }
}

export { RemoveCategoryService };
