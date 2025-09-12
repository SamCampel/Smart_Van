const express = require('express');
const router = express.Router();
const ParentController = require('../controllers/ParentController');

router.post('/', ParentController.create);

module.exports = router;