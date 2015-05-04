'use strict';
var expect = require('chai').expect;
var swaggerUtils = require('../lib/swagger');
var utils = require('../lib/utils');
var config = require('./config');
var error = {};
var result = null;

module.exports = function () {
  var loginTest = utils.getSwaggerParams(config.swaggerObj, '/login', 'post');
  var signupTest = utils.getSwaggerParams(config.swaggerObj, '/signup', 'post');
  var badTest = utils.getSwaggerParams(config.badSwaggerObj, '/login', 'post');

  describe('+ swagger file :', function () {
    // it('Return an assert error', function (done) {

    //   var result = mongooseUtils.checkSchema(null, []);
    //   expect(result).to.throw('AssertionError: An argument is missing');
    //   // done();
    // });

    describe('- Return an error :', function () {
      it('Return an error of email required field', function () {
        result = swaggerUtils.isValidWithSwagger(loginTest, config.params[0]);
        error = 'Param email is required';
        expect(result).to.not.be.a('null');
        expect(result).to.equal(error);
      });
      
      it('Return an error of email type', function () {
        result = swaggerUtils.isValidWithSwagger(loginTest, config.params[7]);
        error = 'Param email must be string';
        expect(result).to.not.be.a('null');
        expect(result).to.equal(error);
      });

      it('Return an error about date', function () {
        result = swaggerUtils.isValidWithSwagger(signupTest, config.params[3]);
        error = 'Param birthdate must be date';
        expect(result).to.not.be.a('null');
        expect(result).to.equal(error);
      });

      it('Return an error about number', function () {
        result = swaggerUtils.isValidWithSwagger(signupTest, config.params[11]);
        error = 'Param age must be integer';
        expect(result).to.not.be.a('null');
        expect(result).to.equal(error);
      });

      it('Return an error with a bad swagger Object', function () {
        result = swaggerUtils.isValidWithSwagger(badTest, config.params[3]);
        error = 'Bad parameter type email';
        expect(result).to.not.be.a('null');
        expect(result).to.equal(error);
      });

      it('Return an error with an empty params array', function () {
        result = swaggerUtils.isValidWithSwagger(loginTest, {});
        error = 'Params is empty';
        expect(result).to.not.be.a('null');
        expect(result).to.equal(error);
      });

      it('Return an error with an empty swagger Object', function () {
        result = swaggerUtils.isValidWithSwagger({}, config.params[3]);
        error = 'swaggerParams is empty';
        expect(result).to.not.be.a('null');
        expect(result).to.equal(error);
      });

    });

    describe('- Return an null object :', function () {
      // it('Return an null object with a string date', function () {
      //   result = swaggerUtils.isValidWithSwagger(config.UserModel, config.params[4]);
      //   expect(result).to.be.a('null');
      // });

      it('with a date', function () {
        result = swaggerUtils.isValidWithSwagger(loginTest, config.params[3]);
        error = 'Param birthdate must be date';
        expect(result).to.be.a('null');
      });

      it('with a good number', function () {
        result = swaggerUtils.isValidWithSwagger(loginTest, config.params[12]);
        expect(result).to.be.a('null');
      });

      it('with a js date', function () {
        result = swaggerUtils.isValidWithSwagger(signupTest, config.params[5]);
        expect(result).to.be.a('null');
      });

    });
  });
};
