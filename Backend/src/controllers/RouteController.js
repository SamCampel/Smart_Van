const MapService = require('../services/MapService');

const RouteController = {
    async calculateRoute(req, res) {
        try {
            const { origin, destination} = req.body;

            if(!origin || !destination) {
                return res.status(400).json ({
                    success: false,
                    message: 'Origem e destino são obrigatórios.'
                });
            }

            const routeData = await MapService.calculateRoutes(origin, destination);
        
            return res.status(200).json({
                success: true,
                data: routeData
            });
        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = RouteController;