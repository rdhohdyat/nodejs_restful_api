import {prismaClient} from "../application/database.js";
import {productValidation} from "../validation/product.validaton.js";
import {validate} from "../validation/validation.js";

const createProduct = async (request) => {
    const product = validate(productValidation, request)

    return prismaClient.product.create({
        data : product,
        select : {
            name: true,
            description: true,
            price: true
        }
    })
}

const updateProduct = async (request, id) => {
    const product = validate(productValidation, request)

    if(typeof id !== "number"){
        return throw new Error("Product id is must be a number");
    }

    const productIsExists = await prismaClient.product.findUnique({
        where : {
            id: Number(id)
        }
    })

    if(!productIsExists) {
        return  throw new Error("Product not found");
    }

    return prismaClient.product.update({
        data : product,
        where : {
            id: Number(id)
        }
    })
}

const deleteProduct = async (id) => {
    const productIsExist = await prismaClient.product.findUnique({
        where : {
            id: Number(id)
        }
    })

    if (!productIsExist) {
        return throw new Error("Product already exists");
    }

    return prismaClient.product.delete({
        where : {
            id: Number(id)
        }
    })
}

const detailProduct = async (id) => {

    if(typeof id !== "number"){
        return throw new Error("Product id must be a number");
    }

    const product = await  prismaClient.product.findUnique({
        where : {
            id: Number(id)
        },
    })

    if (!product) {
        return throw new Error("Product is not already exists");
    }

    return product
}


export default {
    createProduct,
    updateProduct,
    deleteProduct,
    detailProduct
}