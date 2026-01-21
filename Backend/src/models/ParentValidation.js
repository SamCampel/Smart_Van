const Joi = require('joi');

const parentSchema = Joi.object({
    name_parent: Joi.string().min(3).max(255).required().messages({
        'string.empty': 'O nome completo é obrigatório',
        'any.required': 'O nome completo é obrigatório'
    }),

    cpf: Joi.string().pattern(/^\d{11}$/).required().messages({
        'string.pattern.base': 'CPF deve conter exatamente 11 dígitos',
        'any.required': 'CPF é obrigatório'
    }),
    
    email: Joi.string().email().required().messages({
        'string.email': 'E-mail deve ser válido',
        'any.required': 'E-mail é obrigatório'
    }),

    phone: Joi.string().pattern(/^(\d{10,11})?$/).messages({
        'string.pattern.base': 'Telefone deve conter 10 ou 11 dígitos'
    }),

    password: Joi.string().min(6).required().messages({
        'string.min': 'Senha deve ter pelo menos 6 caracteres',
        'any.required': 'Senha é obrigatória'
    })
});

module.exports = parentSchema;