import prismaClient from '../../prisma/index';

interface RemoveProductRequest {
    product_id: string;
}

class RemoveProductService {
    async execute({ product_id }: RemoveProductRequest) {
        if (!product_id) {
            throw new Error("Id do produto não foi enviado!");
        }


        const productExists = await prismaClient.product.findUnique({
            where: {
                id: product_id
            }
        });

        if (!productExists) {
            throw new Error("Produto não encontrado!");
        }

        const removeProduct = await prismaClient.product.delete({
            where: {
                id: product_id
            }
        });

        return removeProduct;
    }
}

export { RemoveProductService };
