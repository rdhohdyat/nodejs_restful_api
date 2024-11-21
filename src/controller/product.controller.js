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
    const productUpdate = await productService.updateProduct(
      req.body,
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
    const deleteProduct = await productService.deleteProduct(req.params.id);

    return res.status(200).json({
      message: "delete product is successfully",
    });
  } catch (err) {
    return res.status(400).json({
      message: "failed to delete this product",
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
