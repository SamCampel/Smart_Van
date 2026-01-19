const Joi = require('joi');

const driverSchema = Joi.object({
    name_driver: Joi.string().min(3).max(255).required().messages({
        'string.empty': 'O nome completo é obrigatório',
        'any.required': 'O nome completo é obrigatório'
    }),

    cpf: Joi.string()
        .length(11)
        .pattern(/^\d+$/)
        .optional()
        .messages({
            'string.pattern.base': 'CPF deve conter apenas números',
            'string.length': 'CPF deve ter 11 dígitos'
        }),


    email: Joi.string().email().required().messages({
        'string.email': 'Email inválido',
        'any.required': 'Email é obrigatório'
    }),

    phone: Joi.string()
        .pattern(/^(\d{10,11})$/)
        .optional()
        .messages({
            'string.pattern.base': 'Telefone deve conter 10 ou 11 dígitos'
        }),

    password: Joi.string().min(6).required().messages({
        'string.min': 'Senha deve ter no mínimo 6 caracteres',
        'any.required': 'Senha é obrigatória'
    })
});

module.exports = driverSchema;