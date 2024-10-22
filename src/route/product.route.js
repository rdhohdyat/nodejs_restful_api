import { Router } from "express";
import {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} from "../controller/product.controller.js";

const productRouter = new Router();

productRouter.get('/products', getAllProducts );
productRouter.get('/products/:id', getProductById);
productRouter.post('/create-product', createProduct );
productRouter.put('/update-product/:id', updateProduct );
productRouter.delete('/delete-product/:id', deleteProduct )

export default productRouter;