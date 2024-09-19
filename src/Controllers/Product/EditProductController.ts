import {Request, Response} from "express"
import {EditProductService} from "../../Services/Product/EditProductService"
import {EditProductRequest} from "../../models/Product/EditProductRequest"

class EditProductController{
    async handle(request:Request, response:Response){
        const {amount,banner,description,price,name,product_id}:EditProductRequest = request.body;
        const editProductService = new EditProductService();
        const productEdited = editProductService.execute({amount,banner,description,price,name,product_id});
        return response.json(productEdited);
    }
}

export {EditProductController}