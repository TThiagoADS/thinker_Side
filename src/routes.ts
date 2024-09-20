import { Router, Request, Response } from "express";
import multer from 'multer';
import uploadConfig from "./Config/multer";
import { CreateUserController } from "./Controllers/User/CreateUserController";
import { AuthUserController } from "./Controllers/User/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./Controllers/User/DetailUserController";
import { RemoveUserController } from "./Controllers/User/RemoveUserController";
import { CreateCategoryController } from "./Controllers/Category/CreateCategoryController";
import { EditCategoryController } from "./Controllers/Category/EditCategoryController";
import { ListCategoryController } from "./Controllers/Category/ListCategoryController";
import { RemoveCategoryController } from "./Controllers/Category/RemoveCategoryController";
import { CreateProductController } from "./Controllers/Product/CreateProductController";
import { EditProductController } from "./Controllers/Product/EditProductController";
import { ListProductByCategoryController } from "./Controllers/Product/ListProductByCategoryController";
import { ListProductsController } from "./Controllers/Product/ListProductsController";
import { RemoveProductController } from "./Controllers/Product/RemoveProductController";
import { SaleProductController } from "./Controllers/Sale/SaleProductController";


const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

router.get("/test", (request: Request, response: Response) => {
    return response.json({ ok: true });
});

// User Routes
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.delete('/user/remove', new RemoveUserController().handle);

// Category Routes
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.put("/category/edit", isAuthenticated, new EditCategoryController().handle);
router.get("/category/all", isAuthenticated, new ListCategoryController().handle);
router.delete("/category/remove", isAuthenticated, new RemoveCategoryController().handle)

// Product Routes
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);
router.put("/product/edit", isAuthenticated, upload.single("file"), new EditProductController().handle);
router.get("/product", isAuthenticated, new ListProductByCategoryController().handle);
router.get("/products", isAuthenticated, new ListProductsController().handle);
router.delete("/product/remove", isAuthenticated, new RemoveProductController().handle);

//Sale Router
router.put("/sale/product", isAuthenticated, new SaleProductController().handle);


export { router };