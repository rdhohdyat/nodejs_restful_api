import {Router} from "express";
import {createSale, getAllSales} from "../controller/sales.controller.js";

const saleRouter = new Router();

saleRouter.get("/", getAllSales)
saleRouter.post("/create-sale", createSale);


export default saleRouter;