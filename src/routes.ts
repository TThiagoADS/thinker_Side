import {Router, Request, Response} from "express"
import { CreateUserController } from "./Controllers/User/CreateUserController";
import { AuthUserController } from "./Controllers/User/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./Controllers/User/DetailUserController";
import { RemoveUserController } from "./Controllers/User/RemoveUserController";
import { CreateCategoryController } from "./Controllers/Category/CreateCategoryController";
import { EditCategoryController } from "./Controllers/Category/EditCategoryController";
import { ListCategoryController } from "./Controllers/Category/ListCategoryController";
import multer from "multer";
import uploadConfig from "./Config/multer"
import { CreateProductController } from "./Controllers/Product/CreateProductController";
import {EditProductController} from "./Controllers/Product/EditProductController"
import { ListProductByCategoryController } from "./Controllers/Product/ListProductByCategoryController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp")); //pasta para imagens
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
router.delete("/category/delete", new RemoveUserController().handle) //deleta a categoria

//product routes
router.post("/product", upload.single("file"),new CreateProductController().handle)
router.put("/product/edit",upload.single("file"), new EditProductController().handle)
router.get("/products", new ListProductByCategoryController().handle)

export {router};