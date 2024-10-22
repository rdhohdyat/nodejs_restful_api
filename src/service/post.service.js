import {postValidation} from "../validation/post.validation.js";
import {validate} from "../validation/validation.js";
import {prismaClient} from "../application/database.js";

const createPost = async (request) => {
    const post = await validate(postValidation, request);

    return prismaClient.post.create({
        data: post,
        select: {
            title: true,
            content: true,
        }
    })
}

const updatePost = async (request, id) => {
    const postIsExist = await prismaClient.post.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!postIsExist) {
        throw new Error("Post is not exist");
    }

    const post = await validate(postValidation, request);

    return prismaClient.post.update({
        data: post,
        where: {
            id: Number(id)
        },
        select: {
            title: true,
            content: true,
        }
    })
}

const deletePost = async (id) => {
    if (typeof id !== "number") {
        throw new Error("Id is not a number");
    }

    const post = await prismaClient.post.findUnique({
        where: {
            id
        }
    })

    if(!post) {
        throw new Error("Post is not exist");
    }

    return prismaClient.post.delete({
        where: {
            id
        }
    })
}

const getAllPost = async() => {
    const posts = await prismaClient.post.findMany();

    if(!posts) {
        throw new Error("No post");
    }

    return posts;
}


export default {
    createPost,
    updatePost,
    deletePost,
    getAllPost
}