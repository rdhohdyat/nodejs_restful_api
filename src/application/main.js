//libs
import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";

//router
import router from "../route/user.route.js";
import productRouter from "../route/product.route.js";
import categoryRouter from "../route/category.route.js";
import saleRouter from "../route/sale.route.js";

export const app = express();
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(cors());

app.use("/api/users", router);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/sale", saleRouter);

app.listen(5000, async () => {
  console.log("Server running on port 5000...");
});
