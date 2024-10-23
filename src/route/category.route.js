import {Router} from 'express';
import {createCategory, deleteCategory, getAllCategories, updateCategory} from "../controller/category.controller.js";

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories)
categoryRouter.post('/create-category', createCategory)
categoryRouter.put('/update-category', updateCategory)
categoryRouter.delete('/delete-category/:id', deleteCategory)


export default categoryRouter;