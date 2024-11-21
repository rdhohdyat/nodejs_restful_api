import productService from "../service/product.service.js";
import fileService from "../service/file.service.js";

export const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();

  if (!products) {
    return res.status(400).json({
      message: "bad request",
    });
  }

  return res.status(200).json({
    message: "Get all products",
    data: products,
  });
};

export const createProduct = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.image;
    const imageUrl = await fileService.processFileUpload(file, req, "product");

    const productData = {
      ...req.body,
      image: imageUrl,
    };

    const product = await productService.createProduct(productData);

    return res.status(200).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred",
      error: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const file = req.files ? req.files.image : null

    const product = await productService.detailProduct(req.params.id)

    if(!product){
      return res.status(400).json({message : "Product not found"})
    }

    let imageUrl = product.image

    if(file){
      imageUrl = await fileService.updateFileUpload(file,req, "product", product.image.split("/").pop());
    }

    const productUpdate = await productService.updateProduct(
      {...req.body, image: imageUrl},
      req.params.id
    );
    
    return res.status(200).json({
      message: "update product is successfully",
      data: productUpdate,
    });
  } catch (err) {
    return res.status(400).json({
      message: "failed to update product",
      error: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await productService.detailProduct(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.image) {
      const fileName = product.image.split("/").pop();
      const fileDeleted = await fileService.deleteFile(
        req,
        "product",
        fileName
      );

      if (!fileDeleted) {
        return res.status(500).json({
          message: "Failed to delete the image file",
        });
      }
    }

    await productService.deleteProduct(req.params.id);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete the product",
      error: err.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.detailProduct(req.params.id);
    return res.status(200).json({
      message: "get product is successfully",
      data: product,
    });
  } catch (err) {
    return res.status(400).json({
      message: "product is not found",
      error: err.message,
    });
  }
};
