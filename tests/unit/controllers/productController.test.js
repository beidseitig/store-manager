const sinon = require("sinon");
const { expect } = require("chai");

const productService = require("../../../services/productService");
const productController = require("../../../controllers/productController");

describe('Testa o controller', () => {
  describe('Testa a chamada de informações do banco de dados', () => {
    describe('Testa se o payload é válido', async () => {
      const response = {};
      const request = {};
      const payload = [{
        name: 'Primeiro produto',
      }]

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(payload);

        sinon.stub(productService, "getAll").resolves(payload);
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
        expect(response.json.calledWith(payload)).to.equal(true);
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
  });

  describe('Testa o cadastro de produtos do banco de dados', () => {
    describe('Testa o cadastro quando o payload é válido', async () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = {
          id: 1,
          name: "Primeiro produto",
        };
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
      });

      it('Cadastro concluido com o código 201', async () => {
        await productController.add(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      })
    })

    describe('Testa o cadastro quando o payload é inválido', async () => {
      const response = {};
      const request = {};

      before(async () => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
      });

      it('Cadastro falhou com o código 500', async () => {
        await productController.add(request, response);
        expect(response.status.calledWith(500)).to.be.true;
      })
    })
  });

  describe('Testa a atualização de informações do banco de dados', () => {
    describe('Testa a atualização quando o payload é válido', async () => {
      const response = {};
      const request = {
        params: {
          id: 1,
        },
      };

      before(async () => {
        request.body = {
          id: 1,
          name: "Primeira atualização",
        };
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
      });

      it('Atualização concluida com o código 200', async () => {
        await productController.update(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      })
    })

    describe('Testa a atualização quando o payload é inválido', async () => {
      const response = {};
      const request = {
        params: {
          id: 1,
        },
      };

      before(async () => {
        request.body = {
          id: 1,
          name: "Primeira atualização",
        };
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
      });

      it('Cadastro falhou com o código 500', async () => {
        await productController.update(request, response);
        expect(response.status.calledWith(500)).to.be.true;
      })
    })
  });
})