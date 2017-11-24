var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var app;

chai.use(chaiHttp);

describe('Adder', () => {
  before(() => {
    app = require('../app.js');
  });
  after(() => {
    app.close();
  });
  it('should have an /adder', (done) => {
    chai
      .request(app)
      .get('/adder')
      .send({
        p1: 1,
        p2: 2
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.not.have.status(404);
        done();
      });
  });
  it('should be able to add 1 and 2', (done) => {
    chai
      .request(app)
      .get('/adder')
      .query({
        num1: 1,
        num2: 2
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('result', 3);
        done();
      });
  });

});