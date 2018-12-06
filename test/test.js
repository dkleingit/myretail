var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../server');
var models = require('../models');
const testGetProductId = '13860428';
const testPutProductId = '123';

chai.use(chaiHttp);

describe('All', function() {
  
    //set up tests
    before(function(done) {
      models.product.upsert ({product_id: testPutProductId, current_price: 1198, currency_code: 'USD'}, 
      (err, result) => {
        should.not.exist(err);
        done();
      });
    });
    
    describe('/GET product price', () => {
      it('it should retrieve a correct product price', (done) => {
        chai.request(server)
            .get('/products/' + testGetProductId)
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
      
      describe('/PUT product price', () => {
      it('it should update a product price', (done) => {
        chai.request(server)
            .put('/products/' + testPutProductId)
            .send({current_price: 599})
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('current_price');
                res.body.current_price.should.have.property('value');
                res.body.current_price.value.should.equal(5.99);
              done();
            });
          });
      });
      
      describe('/PUT product price with invalid price', () => {
      it('it should return an invalid price message', (done) => {
        chai.request(server)
            .put('/products/' + testPutProductId)
            .send({current_price: 'abc'})
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
            
              done();
            });
          });
      });
      
      //tear down
      after(function(done) {
        models.product.removeByProductId (testPutProductId, 
        (err, result) => {
          should.not.exist(err);
          done();
        });
    });
});

