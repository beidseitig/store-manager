const connection = require('../helpers/connection');

const addSaleDate = async () => {
  const [row] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );
  return row.insertId;
};

const addProductSales = async (saleId, productId, quantity) => {
  const [rows] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return rows.insertId;
};
module.exports = { addSaleDate, addProductSales };