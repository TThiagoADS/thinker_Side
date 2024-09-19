import { Request, Response } from "express";
import { EditCategoryService } from "../../Services/Category/EditCategoryService";

class EditCategoryController {
    async handle(req: Request, res: Response) {
        const { name, category_id } = req.body;
        if (!name || !category_id) {
            return res.status(400).json({ error: "Invalid name or category_id" });
        }

        const editCategoryService = new EditCategoryService();

        try {
            const categoryEdited = await editCategoryService.execute({ name, category_id });
            return res.json(categoryEdited);
        } catch (error) {
            return res.status(400).json({ error:"Error" });
        }
    }
}

export { EditCategoryController };
