const express = require('express');
const router = express.Router();
const ParentController = require('../controllers/ParentController');
const parentSchema = require('../models/ParentValidation');
const validate = require('../middlewares/validation');

router.post('/', validate(parentSchema), ParentController.create);

module.exports = router;