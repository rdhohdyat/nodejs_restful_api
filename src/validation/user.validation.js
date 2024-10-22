import Joi from 'joi'

export  const registerUserValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
})

export  const loginUserValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})