'use strict';
var expect = require('chai').expect;
var paramsUtils = require('../lib/params');
var config = require('./config');
var result = null;

module.exports = function() {
  describe('+ Params file :', function() {
    describe('- Return an error :', function() {
      it('Return an error with an object without color', function() {
        result = paramsUtils.checkFieldsRequired(config.requiredFields, config.params[3]);
        expect(result).to.not.be.a('null');
        expect(result).to.equal('Param(s) color is required');
      });
      it('Return an error with an object without color and password', function() {
        result = paramsUtils.checkFieldsRequired(config.requiredFields, config.params[1]);
        expect(result).to.not.be.a('null');
        expect(result).to.equal('Param(s) password,color are required');
      });
    });


    describe('- Don\'t return an error :', function() {
      it('With right parameters', function() {
        result = paramsUtils.checkFieldsRequired(config.requiredFields, config.params[6]);
        expect(result).to.be.a('null');
      });
    });
  });
};
