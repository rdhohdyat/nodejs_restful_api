import {Router} from "express";
import {getAllPosts,getAllPostsByUsername, createPost, updatePost, deletePost} from "../controller/post.controller.js";

const postRouter = Router()

postRouter.get('/', getAllPosts);
postRouter.get('/:username', getAllPostsByUsername);
postRouter.post('/create-post', createPost);
postRouter.put('/update-post/:id', updatePost);
postRouter.delete('/delete-post/:id', deletePost);

export default postRouter;



