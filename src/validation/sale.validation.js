import Joi from 'joi';

export const saleValidation = Joi.object({
    username: Joi.string().required(),
    totalAmount: Joi.number().integer().positive().required(),
    paymentMethod: Joi.string().valid('cash', 'credit', 'debit').required(),
    saleItems: Joi.array().items(
        Joi.object({
            productId: Joi.number().integer().required(),
            quantity: Joi.number().integer().positive().required(),
            price: Joi.number().integer().positive().required(),
            totalPrice: Joi.number().integer().positive().required(),
        })
    ).min(1).required()
});
