const httpCodes = require('../helpers/httpCodes');
const saleSchema = require('../schemas/salesSchema');
const productModel = require('../models/productModel');

const salesValidation = async (req, res, next) => {
  const sale = req.body;
  const { error } = await saleSchema.validate(sale);

  if (error) {
    const { message } = error;
    if (
      message === '"productId" is required' || message === '"quantity" is required'
    ) {
      return res.status(httpCodes.BAD_REQUEST).json({ message });
    }
  
    return res.satus(httpCodes.UNPROCESSABLE_ENTITY).json({ message });
  }

  next();
};

const idValidation = async (req, res, next) => {
  const getProduct = await productModel.getAll();
  const getId = getProduct.map((product) => product.id);
  const productId = req.body.map((e) => e.productId);

  const saleId = getId.includes(productId);

  if (!saleId) return res.status(httpCodes.NOT_FOUND).json({ message: 'Product not found' });

  next();
};

module.exports = { salesValidation, idValidation };