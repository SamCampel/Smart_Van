const Joi = require('joi');

const driverSchema = Joi.object({
    name_driver: Joi.string().min(3).max(255).required().messages({
        'string.empty': 'O nome do completo é obrigatório',
        'any.required': 'O nome do completo é obrigatório'
    }),

    cpf: Joi.string().length(11 ).pattern(/^\d+$/).required().messages({
        'string.pattern.base': 'CPF deve conter apenas números',
        'string.length': 'CPF deve ter 11 dígitos'
    }),

    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^(\d{10,11})?$/).messages({
        'string.pattern.base': 'Telefone deve conter 10 ou 11 dígitos'
    }),

    birth_date: Joi.date().max('now').required(),
    license_number: Joi.string().required(),

    vehicle_model: Joi.string().required(),
    vehicle_plate: Joi.string().pattern(/^[A-Z]{3}\d{4}$/).required().messages({
        'string.pattern.base': 'Placa deve estar no formato ABC1234'
    }),

    vehicle_capacity: Joi.number().integer().min(1).max(20).required(),

    regions_served: Joi.array().items(Joi.string()).min(1).required(),

    password: Joi.string().min(6).required()
});

module.exports =driverSchema