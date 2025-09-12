const ParentService = require('../services/ParentService');

const ParentController = {
    async create(req, res) {
        try {
            const parentData = req.body;
            const newParent = await ParentService.registerParent(parentData);

            return res.status(201).json({
                success: true,
                message: 'Responsável cadastrado com sucesso!',
                data: newParent
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = ParentController;