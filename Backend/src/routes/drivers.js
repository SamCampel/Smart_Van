const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/DriverController');
const driverSchema = require('../models/DriverValidation');
const validate = require('../middlewares/validation');

router.post('/', validate(driverSchema), DriverController.create);

router.get('/', DriverController.getAll);
router.get('/:id', DriverController.getById);

module.exports = router;