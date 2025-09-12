const DriverRepository = require('../repositories/DriverRepository');
const driverSchema = require('../models/DriverValidation');
const bcrypt = require('bcryptjs');

const DriverService = {
    async registerDriver(driverData) {
        //validate data
        try {
            const { error, value } = driverSchema.validate(driverData);
            if (error) {
                throw new Error(error.details[0].message);
            };

            //add hash 
            const saltRounds = 12;
            driverData.password_hash = await bcrypt.hash(driverData.password, saltRounds);

            delete driverData.password;

            const result = await DriverRepository.createDriver(driverData);

            return {
                id: result.insertId,
                name_driver: driverData.name_driver,
                email: driverData.email,
                vehicle_plate: driverData.vehicle_plate,
                ...driverData
            };

        } catch (error) {
            throw error;
        }
    },

    async getAllDrivers() {
        try {
            const drivers = await DriverRepository.getAll();
            return drivers;
        } catch (error) {
            throw error;
        }
    },

    async getDriverById(id) {
        try {
            const driver = await DriverRepository.getById(id);
            if(!driver) {
                throw new Error('Motorista não encontrado');
            }

            return driver;
        } catch (error) {
            throw error;
        }

    }
};

module.exports = DriverService;