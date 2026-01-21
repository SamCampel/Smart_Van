const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido! Defina no .env antes de rodar a aplicação.');
}

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        throw new Error('Token inválido');
    }
};

module.exports = { generateToken, verifyToken };