const Joi = require('joi');

const parentSchema = Joi.object({
    name_parent: Joi.string()
        .trim()
        .min(3)
        .max(255)
        .required(),

    cpf: Joi.string()
        .pattern(/^\d{11}$/)
        .required(),

    email: Joi.string()
        .trim()
        .email()
        .required(),

    phone: Joi.string()
        .trim()
        .allow('')
        .optional()
        .pattern(/^(\d{10,11})?$/),

    password: Joi.string()
        .min(6)
        .required()
});

module.exports = parentSchema;
