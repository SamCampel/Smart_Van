const AuthService = require ('../services/AuthService');

const AuthController = {
    async login(req,res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email e senha são obrigatórios'
                });
            }

            const result = await AuthService.login(email, password);
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
    }
};

module.exports = AuthController;