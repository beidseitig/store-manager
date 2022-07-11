const express = require('express');
const productController = require('../controllers/productController');
const idValidation = require('../middlewares/idMiddleware');
const nameValidation = require('../middlewares/nameMiddleware');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.add);
router.put('/:id', nameValidation, productController.update);
router.delete('/:id', idValidation, productController.erase);

module.exports = router;