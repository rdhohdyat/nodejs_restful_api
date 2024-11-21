import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { saleValidation } from "../validation/sale.validation.js";

const createSale = async (request) => {
  const sale = await validate(saleValidation, request);

  if (!sale) {
    throw new Error("Bad request: Sale data is invalid");
  }

  const createdSale = await prismaClient.sale.create({
    data: {
      username: sale.username,
      totalAmount: sale.totalAmount,
      paymentMethod: sale.paymentMethod,
    },
  });

  await prismaClient.saleItem.createMany({
    data: sale.saleItems.map((item) => ({
      saleId: createdSale.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.totalPrice,
    })),
  });

  return {
    id: createdSale.id,
    username: createdSale.username,
    totalAmount: createdSale.totalAmount,
    paymentMethod: createdSale.paymentMethod,
  };
};

const getAllSales = async () => {
  const sales = await prismaClient.sale.findMany({
    include: {
      saleItems: true,
    },
  });

  return sales || [];
};

const deleteSale = async (id) => {
  const sale = await prismaClient.sale.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!sale) {
    throw new Error("Sale is not found");
  }

  return await prismaClient.sale.delete({
    where: {
      id: Number(id),
    },
  });
};

export default {
  createSale,
  getAllSales,
  deleteSale,
};
