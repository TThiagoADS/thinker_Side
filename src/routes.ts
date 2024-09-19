import {Router, Request, Response} from "express"
import { CreateUserController } from "./Controllers/User/CreateUserController";
import { AuthUserController } from "./Controllers/User/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./Controllers/User/DetailUserController";
import { RemoveUserController } from "./Controllers/User/RemoveUserController";
import { CreateCategoryController } from "./Controllers/Category/CreateCategoryController";
import { EditCategoryController } from "./Controllers/Category/EditCategoryController";
import { ListCategoryController } from "./Controllers/Category/ListCategoryController";

const router = Router();
router.get("/test",(request: Request, response:Response) => {
    return response.json({ok: true});
});

//User routes
router.post('/user', new CreateUserController().handle) //cria um usuario
router.post('/session', new AuthUserController().handle) //obtem o token
router.get('/me', isAuthenticated, new DetailUserController().handle) //encontra o id do usuario
router.delete("/user/remove", new RemoveUserController().handle) //remove o ususario pelo id

//category routes
router.post("/category", new CreateCategoryController().handle) //cria uma categoria
router.put("/category/edit", new EditCategoryController().handle) //edita uma categoria
router.get("/category/all", new ListCategoryController().handle) //busca todas as categorias

export {router};