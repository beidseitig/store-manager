const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  if (!products) return [];
  return products;
};

const getById = async (id) => {
  const [product] = await productModel.getById(id);
  if (!product) return [];
  return product;
};

const add = async (name) => {
  if (!name) return false;
  const product = await productModel.add(name);
  return product;
};

module.exports = { getAll, getById, add };