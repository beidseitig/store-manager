const salesService = require('../services/salesService');
const httpCodes = require('../helpers/httpCodes');

const addSale = async (req, res) => {
  try {
    const sale = req.body;
    const doneSale = await salesService.addSale(sale);
    res.satus(httpCodes.CREATED).json(doneSale);
  } catch (err) {
    return res.status(httpCodes.BAD_REQUEST).json({ message: err });
  }
};

module.exports = addSale;