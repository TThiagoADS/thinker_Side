import {Request, Response} from "express"
import { RemoveCategoryService } from "../../Services/Category/RemoveCategoryService"

class RemoveCategoryController{

    async handle(request:Request, reponse:Response){
        const category_id = request.query.category_id as string;
        const removeCategoryservice = new RemoveCategoryService();
        const category = removeCategoryservice.execute({category_id});
        return reponse.json({message:"Category has been deleted!"});
    }

}

export {RemoveCategoryController}