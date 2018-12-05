var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../server');

chai.use(chaiHttp);

describe('All', function() {
    describe('/GET product price', () => {
      it('it should retrieve a correct product price', (done) => {
        chai.request(server)
            .get('/products/13860428')
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('current_price');
                res.body.current_price.should.have.property('value');
              done();
            });
          });
      });
    
    describe('/GET product price with invalid id', () => {
      it('it should return an invalid product id message', (done) => {
        chai.request(server)
            .get('/products/1abc')
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
              done();
            });
          });
      });
});

