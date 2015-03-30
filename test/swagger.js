'use strict';
var expect = require('chai').expect;
var swaggerUtils = require('../lib/swagger');
var utils = require('../lib/utils');
var config = require('./config');
var error = {};
var result = null;

module.exports = function() {
  var loginTest = utils.getSwaggerParams(config.swaggerObj, '/login', 'post');
  var signupTest = utils.getSwaggerParams(config.swaggerObj, '/signup', 'post');

  describe('+ swagger file :', function() {
    // it('Return an assert error', function(done) {

    //   var result = mongooseUtils.checkSchema(null, []);
    //   expect(result).to.throw('AssertionError: An argument is missing');
    //   // done();
    // });

    describe('- Return an error :', function() {
      it('Return an error of email required field', function() {
        result = swaggerUtils.checkSwagger(loginTest, config.params[0]);
        error = 'Param email is required';
        expect(result).to.not.be.a('null');
        expect(result).to.equal(error);
      });

      it('Return an error of email type', function() {
        result = swaggerUtils.checkSwagger(loginTest, config.params[7]);
        error = 'Param email must be string';
        expect(result).to.not.be.a('null');
        expect(result).to.equal(error);
      });

      it('Return an error about date', function() {
        result = swaggerUtils.checkSwagger(signupTest, config.params[3]);
        error = 'Param birthdate must be date';
        expect(result).to.not.be.a('null');
        expect(result).to.equal(error);
      });

      it('Return an error with an empty params array', function() {
        result = swaggerUtils.checkSwagger(config.UserModel, {});
        error = 'Params is empty';
        expect(result).to.not.be.a('null');
        expect(result).to.equal(error);
      });
    });

    describe('- Return an null object :', function() {
      // it('Return an null object with a string date', function() {
      //   result = swaggerUtils.checkSwagger(config.UserModel, config.params[4]);
      //   expect(result).to.be.a('null');
      // });

      it('Return an error about date', function() {
        result = swaggerUtils.checkSwagger(loginTest, config.params[3]);
        error = 'Param birthdate must be date';
        expect(result).to.be.a('null');
      });

      it('Return an null object with a js date', function() {
        result = swaggerUtils.checkSwagger(signupTest, config.params[5]);
        expect(result).to.be.a('null');
      });

    });
  });
};
