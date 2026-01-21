const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/DriverController');
const driverSchema = require('../validations/driverValidation');
const validate = require('../middlewares/validate');

router.post('/', validate(driverSchema), DriverController.create);

router.get('/', DriverController.getAll);
router.get('/:id', DriverController.getById);

module.exports = router;