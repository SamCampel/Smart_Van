const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/DriverController');

router.post('/', DriverController.create);

router.get('/', DriverController.getAll);

router.get('/:id', DriverController.getById);

module.exports = router;