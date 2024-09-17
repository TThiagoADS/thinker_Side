import {Router, Request, Response, request } from "express"
import { CreateUserController } from "./Controllers/User/CreateUserController";

const router = Router();
router.get("/test",(request: Request, response:Response) => {
    return response.json({ok: true});
});

//User routes
router.post('/user', new CreateUserController().handle)

export {router};