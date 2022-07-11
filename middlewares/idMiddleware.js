const productService = require('../services/productService');
const httpStatus = require('../helpers/httpCodes');

const idAuthentication = async (req, res, next) => {
  const { id } = req.params;
  const result = await productService.getById(id);

  if (!result || result.length < 1) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });
  }
  next();
};

module.exports = idAuthentication;