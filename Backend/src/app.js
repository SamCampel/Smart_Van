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

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
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