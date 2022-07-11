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

const add = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await productService.add(name);

    if (!product.name || product.length < 1) {
      return res
        .status(httpCodes.BAD_REQUEST)
        .json({ message: '"name" is required' });
    }
    // https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/422
    if (product.name.length < 5) {
      return res
        .status(httpCodes.UNPROCESSABLE_ENTITY)
        .json({ message: '"name" length must be at least 5 characters long' });
    }

    res.status(httpCodes.CREATED).json(product);
  } catch (err) {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const product = await productService.update(id, name);
    if (!product || product.length < 1) {
      return res.status(httpCodes.NOT_FOUND).json({ message: 'Product not found' });
    }
    const updateProduct = await productService.updategetById(id);
    
    res.status(httpCodes.OK).json(updateProduct);
  } catch (err) {
    res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productService.erase(id);

    if (product === null || product < 1) {
      return res.status(httpCodes.NO_CONTENT).json({ message: 'Product not found' });
    }
    res.status(httpCodes.OK);
  } catch (err) {
    res.status(httpCodes.INTERNAL_SERVER).send(err);
  }
};

module.exports = { getAll, getById, add, update, erase };