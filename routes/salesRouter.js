const express = require('express');
const salesController = require('../controllers/salesController');
const salesMiddleware = require('../middlewares/salesMiddleware');

const router = express.Router();

router.post('/', salesMiddleware.salesValidation, salesMiddleware.idValidation, salesController);

module.exports = router;