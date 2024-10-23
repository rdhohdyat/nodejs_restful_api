import categoryService from "../service/category.service.js";

export const getAllCategories = async (req, res) => {
    const categories = await categoryService.getAllCategory()

    if(!categories){
        return res.status(404).json({
            status : "error",
            message : "No category found"
        })
    }

    return res.status(200).json({
        status : "success",
        message : "Get all categories is successfully",
        data : categories
    })
}

export const createCategory = async (req, res) => {
    const product = await categoryService.createCategory(req.body);

    if(!product) {
        return res.status(400).json({
            status: "error",
            message : "failed to create a category"
        })
    }

    return res.status(200).json({
        status: "success",
        message: "create category is successfully",
        data: product
    })
}

export const updateCategory = async (req, res) => {
    const updateCategory = await categoryService.updateCategory(req.body, req.params.id);

    if(!updateCategory) {
        return res.status(400).send({
            status: "error",
            message: "failed to update category",
        })
    }

    res.status(200).json({
        status: "success",
        message: "update category is successfully",
        data: updateCategory
    })
}

export const deleteCategory = async (req, res) => {
    const deleteCategory = await categoryService.deleteCategory(req.params.id)

    if(!deleteCategory) {
        return res.status(400).json({
            status: "error",
            message: "failed to delete category",
        })
    }

    return res.status(200).json({
        status: "success",
        message: "delete category is successfully",
    })
}