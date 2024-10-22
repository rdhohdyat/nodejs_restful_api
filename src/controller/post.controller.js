import {prismaClient} from "../application/database.js";
import postService from "../service/post.service.js";

export const getAllPosts = async (req, res) => {
    const posts = await postService.getAllPost()

    return res.status(200).json({
        status: "success",
        message: "Posts retrieved successfully",
        data: posts
    })
}

export const getAllPostsByUsername = async (req, res) => {
    const posts = await prismaClient.post.findMany({
        where : {
            username: req.params.username
        }
    })

    if(!posts) {
        return res.status(404).json({
            status: "error",
            message: "No posts found with this username"
        })
    }

    res.status(200).json({
        status: "success",
        message: "Posts retrieved successfully",
        data: posts
    })
}

export const createPost = async (req, res, next) => {
    try {
        const result = await postService.createPost(req.body);

        if (result) {
            res.status(200).json({
                status: "success",
                message: "successfully created post",
                data: result
            })
        }
    } catch (e) {
        next(e)
    }
}

export const updatePost = async (req, res, next) => {
   try {
       const result = await postService.updatePost(req.body, req.params.id);

       if (result) {
           res.status(200).json({
               status: "success",
               message: "Successfully updated post",
               data: result
           })
       }
   }catch (e) {
       next(e)
   }
}

export const deletePost = async (req, res, next) => {
    const postId = parseInt(req.params.id)
    try {
        const result = await postService.deletePost(postId);

        if(result) {
            res.status(200).json({
                status: "success",
                message: "Successfully deleted post",
            })
        }
    }catch (e) {
        next(e)
    }
}