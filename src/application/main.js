import express from "express";
import router from "../route/user.route.js";
import postRouter from "../route/post.route.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/users", router);
app.use("/api/posts", postRouter);

app.listen(5000, async () => {
    console.log("Server running on port 5000...");
})