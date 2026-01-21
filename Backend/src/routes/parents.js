const express = require('express');
const router = express.Router();
const ParentController = require('../controllers/ParentController');
const parentSchema = require('../validations/parentValidation');
const validate = require('../middlewares/validate');

router.post('/', validate(parentSchema), ParentController.create);

module.exports = router;