const AuthService = require ('../services/AuthService');

const AuthController = {
    async login(req,res) {
        try {
            const { email, password, userType } = req.body;
            if (!email || !password || !userType ) {
                return res.status(400).json({
                    success: false,
                    message: 'Email, senha e tipo de usuário são obrigatórios '
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
    }
};

module.exports = AuthController;