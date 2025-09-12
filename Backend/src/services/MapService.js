const axios = require('axios');
require('dotenv').config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const MapService = {
    async geocodeAddress(address) {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`);

            if (response.data.status === 'OK') {
                return response.data.results[0].geometry.location;
            } else {
                throw new Error('Erro no geocoding: ' + response.data.status);

            }
        } catch (error) {
            console.error('Erro no MapService.geocodeAddress: ', error.message);
            throw error;
        }
    },

    async calculateRoutes(origin, destination) {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`);

            if (response.data.status === 'OK') {
                return {
                    distance: response.data.routes[0].legs[0].distance,
                    duration: response.data.routes[0].legs[0].duration,
                    polyline: response.data.routes[0].overview_polyline.points
                };
            } else {
                throw new Error('Erro no cálculo de rota: ' + response.data.status)
            }

        } catch (error) {
            console.error('Erro no MapService.calculateRoute:', error.message);
            throw error;
        }
    }
};

module.exports = MapService;