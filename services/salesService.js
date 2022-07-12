const salesModels = require('../models/salesModel');

const addSale = async (sale) => {
  const saleId = await salesModels.addSaleDate();
  await Promise.all(sale.map(
    (product) => salesModels.addProductSales(saleId, product.productId, product.quantity),
  ));

  return { id: saleId, soldItens: sale };
};

module.exports = addSale;