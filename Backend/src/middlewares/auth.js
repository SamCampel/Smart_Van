const { verifyToken } = require ('../utils/auth');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token de acesso requerido'
        });
    }

    try{
        const decoded = verifyToken(token);
        req.driver = decoded;
        next();

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Token inválido ou expirado'
        });
    }
};

module.exports = authenticateToken;