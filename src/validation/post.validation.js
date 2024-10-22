import Joi from 'joi'

export  const postValidation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string(),
    username: Joi.string().required()
})