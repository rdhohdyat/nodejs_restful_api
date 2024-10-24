import productService from "../service/product.service.js";

export const getAllProducts = async (req, res) => {
    const products = await productService.getAllProducts()

    if (!products) {
        return res.status(400).json({
            message: "bad request"
        })
    }

    return res.status(200).json({
        message: "Get all products",
        data: products
    })
}

export const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body)
        return res.status(200).json({
            message: "create product is successfully",
            data: product
        })
    }catch(err) {
        res.status(400).json({
            message: "is failed",
            error: err.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const productUpdate = await productService.updateProduct(req.body, req.params.id)
        return res.status(200).json({
            message: "update product is successfully",
            data : productUpdate
        })
    }catch (err){
        res.status(400).json({
            message: "failed to update product",
            error: err.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await productService.deleteProduct(req.params.id)

        return res.status(200).json({
            message : "delete product is successfully",
        })
    }catch(err) {
        return res.status(400).json({
            message : "failed to delete this product",
            error : err.message
        })
    }
}

export const getProductById = async (req, res) => {
    const product = await productService.detailProduct(req.params.id)

    if(!product){
        return res.status(400).json({
            message : "product is not found"
        })
    }

    return res.status(200).json({
        message : "get product is successfully",
        data : product
    })
}
