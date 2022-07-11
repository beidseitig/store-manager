const sinon = require("sinon");
const { expect } = require("chai");

const productService = require("../../../services/productService");
const productController = require("../../../controllers/productController");

describe('Testa o controller', () => {
  describe('Testa se o payload é válido', async () => {
    const response = {};
    const request = {};

    before(async () => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "getAll").returns([{}]);
    })

    after(async () => {
      productService.getAll.restore();
    });

    it('Testa se retorna o status 200', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })

    it('Testa se retorna um arquivo json', async () => {
      await productController.getAll(request, response);
      expect(response.json.calledWith([{}])).to.be.true;
    })
  })

  describe('Testa se o payload é inválido', async () => {
    const response = {};
    const request = {};

    before(async () => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "getAll").returns({});
    })

    after(async () => {
      productService.getAll.restore();
    });

    it('Testa se retorna o status 400', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(400)).to.be.false;
    })

    it('Testa se retorna um arquivo json', async () => {
      await productController.getAll(request, response);
      expect(response.json.calledWith({})).to.be.true;
    })
  })
})