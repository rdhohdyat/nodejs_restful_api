import Joi from "joi"

export const productValidation = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number(),
    categoryId: Joi.number()
});
