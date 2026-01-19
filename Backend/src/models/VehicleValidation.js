const Joi = require('joi');

const vehicleSchema = Joi.object({
  birth_date: Joi.date().max('now').required(),
  license_number: Joi.string().required(),
  vehicle_model: Joi.string().required(),
  vehicle_plate: Joi.string()
    .pattern(/^[A-Z]{3}\d{4}$/)
    .required(),
  vehicle_capacity: Joi.number().integer().min(1).max(20).required(),
  regions_served: Joi.array().items(Joi.string()).min(1).required()
});

module.exports = vehicleSchema;