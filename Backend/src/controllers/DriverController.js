const { message } = require('../models/DriverValidation');
const DriverService = require('../services/DriverService');

const DriverController = {
    async create(req, res) {
        try {
            const driverData = req.body;
            const newDriver = await DriverService.registerDriver(driverData);

            return res.status(201).json({
                success: true,
                message: 'Cadastro de motorista realizado com sucesso',
                data: newDriver
            });
        } catch (error) {
            console.error('Erro no controller:', error);

            return res.status(400).json({
                success: false,
                message: error.message || 'Erro ao cadastrar motorista'
            });
        }
    },

    async getAll(req, res) {
        try {
            const drivers = await DriverService.getAllDrivers();
            return res.status(200).json({
                success: true,
                data: drivers
            });
        } catch (error) {
            return res.status(500).json({
                success:false,
                message: 'Erro ao buscar motoristas'
            });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const driver = await DriverService.getDriverById(id);
            return res.status(200).json({
                success: true,
                data: driver
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = DriverController;