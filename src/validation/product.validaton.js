import Joi from "joi"

export const productValidation = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    price: Joi.number().integer().required(),
    categoryId: Joi.number().integer().required()
});
