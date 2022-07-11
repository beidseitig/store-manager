const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const productModel = require('../../../models/productModel');

describe('Testando o model da lista de produtos do banco de dados', () => {
  const payload = [{
    id: 1,
    name: 'Primeiro produto',
  }]

  before(async () => {
    sinon.stub(connection, "execute").returns(payload);
  })

  after(async () => {
    connection.execute.restore();
  })

  describe('Testa a resposta da lista de produtos do banco de dados', () => {
    it('Testa se retornar um objeto', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.a('object');
    });

    it('Testa as propriedades do objeto', async () => {
      const result = await productModel.getAll();
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
    });

    it('Testa se retorna um produto pelo id',  async () => {
      const result = await productModel.getById(1);
      expect(result.name).to.be.equal('Primeiro produto');
    });

  })
})