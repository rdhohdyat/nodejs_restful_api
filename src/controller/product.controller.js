import productService from "../service/product.service.js";

export const getAllProducts = async (req, res) => {
    const products = await productService.getAllProducts()

    if (!products) {
        return res.status(404).json({
            status: "error",
            message: "bad request"
        })
    }

    return res.status(200).json({
        status: "success",
        message: "Get all products",
        data: products
    })
}

export const createProduct = async (req, res) => {
    const product = await productService.createProduct(req.body)

    if (!product) {
        return res.status(404).json({
            status: "error",
            message: "failed to create product",
        })
    }

    return res.status(200).json({
        status: "success",
        message: "create product is successfully",
        data: product
    })
}

export const updateProduct = async (req, res) => {
    const productUpdate = await productService.updateProduct(req.body, req.params.id)

    if (!productUpdate) {
        return res.status(404).json({
            status: "error",
            message: "failed to update product",
        })
    }

    return res.status(200).json({
        status: "success",
        message: "update product is successfully",
        data : productUpdate
    })
}

export const deleteProduct = async (req, res) => {
    const deleteProduct = await productService.deleteProduct(req.params.id)

    if(!deleteProduct) {
        return res.status(404).json({
            status: "error",
            message : "failed to delete this product",
        })
    }

    return res.status(200).json({
        status: "success",
        message : "delete product is successfully",
    })
}

export const getProductById = async (req, res) => {
    const product = await productService.detailProduct(req.params.id)

    if(!product){
        return res.status(404).json({
            status: "error",
            message : "product is not found"
        })
    }

    return res.status(200).json({
        status : "success",
        message : "get product is successfully",
        data : product
    })
}
