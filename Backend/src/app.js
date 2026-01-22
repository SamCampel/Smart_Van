const express = require('express');
const pool = require('./config/database');
const driverRoutes = require('./routes/drivers');
const authRoutes = require('./routes/auth');
const MapService = require('./services/MapService');
const routeRoutes = require('./routes/routes');
const parentRoutes = require('./routes/parents');
const geoProxyRoutes = require('./routes/geoProxy');
const geoRoutes = require('./routes/geo');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

app.set('trust proxy', 1);

app.use(helmet());

const allowedOrigins = [
  'https://route-guardian.vercel.app',
  'https://route-guardian-rdcur7v0a-samuels-projects-b63dc5c1.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Não permitido pelo CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Muitas requisições, tente novamente mais tarde.'
});

app.use(limiter);

app.use('/api/drivers', driverRoutes);
app.use('/api', authRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/geo', geoProxyRoutes);
app.use('/api/geo', geoRoutes);

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('Conexão com o banco de dados bemsucedida:', rows[0].result);
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message);
    }
}

async function testGeocoding() {
    try{
        const location = await MapService.geocodeAddress('Alameda Santos, São Paulo');
        console.log('Coordenadas: ', location);

    } catch (error) {
        console.error('Erro ao testar geocoding: ', error.message);
    }
}

testConnection();
testGeocoding();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});