const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

describe('Testando a lista de produtos do banco de dados', () => {
  const payload = [{
    name: 'Primeiro produto',
  }]

  before(async () => {
    sinon.stub(productModel, "getAll").returns(payload);
    sinon.stub(productModel, "getById").returns(payload[0]);
  })

  after(async () => {
    productModel.getAll.restore();
  })

  describe('Testa a resposta da lista de produtos do banco de dados', () => {
    it('Testa se retornar um array', async () => {
      const result = await productService.getAll();
      expect(result).to.be.a('array');
    });

    it('Testa se retorna um produto pelo id',  async () => {
      const result = await productService.getById(1);
      expect(result).to.be.a('object');
    });
  })
})