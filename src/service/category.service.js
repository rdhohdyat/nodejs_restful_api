import {prismaClient} from "../application/database.js";
import {categoryValidation} from "../validation/category.validation.js";
import {validate} from "../validation/validation.js";


const getAllCategory = async () => {
    const categories = await prismaClient.category.findMany()

    if(!categories){
        throw new Error("Category not found.");
    }

    return categories;
}
const createCategory = async (request) => {
    const category = await validate(categoryValidation, request);

    if(!category){
        throw new Error("Bad request")
    }

    return prismaClient.category.create({
        data: category,
        select : {
            name: true,
        }
    })
}
const updateCategory = async (request, id) => {
    const updateCategory = await validate(categoryValidation, request);

    if(!updateCategory){
        throw new Error("Bad request");
    }

    return prismaClient.category.update({
        where: {
            id: Number(id)
        },
        data : updateCategory,
        select : {
            name: true,
        }
    })
}
const deleteCategory = async (id) => {
    const deleteCategory = await prismaClient.category.delete({
        where: {
            id: Number(id)
        }
    })

    if(!deleteCategory){
        throw new Error("failed to delete category");
    }

    return deleteCategory;
}

export default {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory
}