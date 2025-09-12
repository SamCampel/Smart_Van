const DriverRepository = require ('../repositories/DriverRepository');
const ParentRepository = require('../repositories/ParentRepository');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/auth');
const { id } = require('../models/DriverValidation');

const AuthService = {
    async login(email, password, userType) {
        let user;
        let userTable;

        if (userType === 'driver') {
            user = await DriverRepository.findByEmail(email);
            userTable = 'driver';
        } else if (userType === 'parent') {
            user = await ParentRepository.findByEmail(email);
            userTable = 'parent';
        } else {
            throw new Error('Tipo de usuário inválido');
        }

        if (!user) {
            throw new Error('Email ou senha inválidos');
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            throw new Error('Email ou senha inválidos');
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
            name: user.name || user.name_driver,
            userType: userTable
        });

        if (userType === 'driver') {
            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name_driver,
                    vehicle_plate: user.vehicle_plate,
                    userType: 'driver'
                }
            };
        } else {
            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    userType: 'parent'
                }
            };
        }
    }
};

module.exports = AuthService;