import {Request, Response} from "express"
import {CreateProductService} from "../../Services/Product/CreateProductService"
import {ProductRequest} from "../../models/Product/ProductRequest"
import { CreateCategoryService } from "../../Services/Category/CreateCategoryService";

class CreateProductController{
    async handle(request:Request, response:Response){
        const {name, price, description,banner, category_id,amount}: ProductRequest = request.body;
        const createProductService = new CreateProductService

        if(!request.file){
            //throw new Error("Error sending image")
        } else {
            const {originalname, filename:banner} = request.file;
            const product = await createProductService.execute({
                name,
                price,
                description,
                banner,
                category_id,
                amount
            });
            
            return response.json(product)
        }

    }
}

export {CreateProductController}