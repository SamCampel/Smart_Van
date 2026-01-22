const AuthService = require('../services/AuthService');

const AuthController = {

    async login(req, res) {
        try {
            const { email, password, userType } = req.body;

            if (!email || !password || !userType) {
                return res.status(400).json({
                    success: false,
                    message: 'Email, senha e tipo de usuário são obrigatórios'
                });
            }

            const result = await AuthService.login(email, password, userType);

            return res.status(200).json({
                success: true,
                message: 'Login realizado com sucesso',
                data: result
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    },

    async register(req, res) {
        try {
            const { name_parent, cpf, email, phone, password } = req.body;

            if (!name_parent || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Nome, email e senha são obrigatórios'
                });
            }

            const result = await AuthService.registerParent({
                name_parent,
                cpf,
                email,
                phone,
                password
            });

            return res.status(201).json({
                success: true,
                ...result
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = AuthController;