const DriverRepository = require ('../repositories/DriverRepository');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/auth');
const { id } = require('../models/DriverValidation');

const AuthService = {

    async login(email, password) {
        const driver = await DriverRepository.findByEmail(email);
        if (!driver) {
            throw new Error('Email ou senha inválidos');
        }
        
        const isValidPassword = await bcrypt.compare(password, driver.password_hash);
        if (!isValidPassword) {
            throw new Error('Email ou senha inválidos');
        }

        const token = generateToken({
            id: driver.id,
            email: driver.email,
            name: driver.name_driver
        });

        return{
            token,
            driver: {
                id: driver.id,
                email: driver.email,
                name: driver.name_driver,
                vehicle_plate: driver.vehicle_plate
            }
        };

        
    }
};

module.exports = AuthService;