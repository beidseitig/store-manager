const productService = require('../services/productService');
const httpCodes = require('../helpers/httpCodes');

const getAll = async (_req, res) => {
  try {
    const products = await productService.getAll();
    if (!products) {
      return res.status(httpCodes.NOT_FOUND).json({ message: 'Product not found' });
    }
    res.status(httpCodes.OK).json(products);
  } catch (err) {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getById(id);
    if (!product || product.length < 1) {
      return res.status(httpCodes.NOT_FOUND).json({ message: 'Product not found' });
    }
    res.status(httpCodes.OK).json(product);
  } catch (err) {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

module.exports = { getAll, getById };