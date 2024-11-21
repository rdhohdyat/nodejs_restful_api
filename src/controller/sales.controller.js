import salesService from "../service/sale.service.js";

export const createSale = async (req, res) => {
  try {
    const sale = await salesService.createSale(req.body);

    return res.status(200).json({
      status: "success",
      message: "create sale is successfully",
      data: sale,
    });
  } catch (err) {
    res.status(400).json({
      message: "create sale is failed",
      error: err.message,
    });
  }
};

export const getAllSales = async (req, res) => {
  const sales = await salesService.getAllSales();

  if (sales.length < 1) {
    return res.status(200).json({
      message: "sale is empty, please create a sale",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "get all sales",
    data: sales,
  });
};
