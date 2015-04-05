'use strict';
var expect = require('chai').expect;
var mongooseUtils = require('../lib/mongoose');
var config = require('./config');
var error = {};
var result = null;

module.exports = function() {
	describe('+ mongoose file :', function() {
		// it('Return an assert error', function(done) {
		//   console.log('ici', typeof result);

		//   var result = mongooseUtils.isValidWithMongo(null, []);
		//   expect(result).to.throw('AssertionError: An argument is missing');
		//   // done();
		// });

		describe('- Return an error :', function() {
			it('Return an error of email required field', function() {
				result = mongooseUtils.isValidWithMongo(config.UserModel, config.params[0]);
				error = 'Param email is required';
				expect(result).to.not.be.a('null');
				expect(result).to.equal(error);
			});

			it('Return an error of firstname type', function() {
				result = mongooseUtils.isValidWithMongo(config.UserModel, config.params[1]);
				error = 'Param firstname must be a string';
				expect(result).to.not.be.a('null');
				expect(result).to.equal(error);
			});

			it('Return an error about date', function() {
				result = mongooseUtils.isValidWithMongo(config.UserModel, config.params[3]);
				error = 'Param birthdate must be a date';
				expect(result).to.not.be.a('null');
				expect(result).to.equal(error);
			});

			it('Return an error about number type', function() {
				result = mongooseUtils.isValidWithMongo(config.UserModel, config.params[8]);
				error = 'Param colorType must be a number';
				expect(result).to.not.be.a('null');
				expect(result).to.equal(error);
			});

			it('Return an error about boolean type', function() {
				result = mongooseUtils.isValidWithMongo(config.UserModel, config.params[9]);
				error = 'Param public must be a boolean';
				expect(result).to.not.be.a('null');
				expect(result).to.equal(error);
			});

			it('Return an error about array type', function() {
				result = mongooseUtils.isValidWithMongo(config.UserModel, config.params[10]);
				error = 'Param friends must be an array';
				expect(result).to.not.be.a('null');
				expect(result).to.equal(error);
			});

			it('Return an error with an empty params array', function() {
				result = mongooseUtils.isValidWithMongo(config.UserModel, {});
				error = 'Params is empty';
				expect(result).to.not.be.a('null');
				expect(result).to.equal(error);
			});

			it('Return an error with an empty model', function() {
				result = mongooseUtils.isValidWithMongo(null, config.params[10]);
				error = 'Model is undefined';
				expect(result).to.not.be.a('null');
				expect(result).to.equal(error);
			});

			it('Return an error with a bad omission object', function() {
				result = mongooseUtils.isValidWithMongo(config.UserModel, config.params[4], 'aaa');
				expect(result).to.not.be.a('null');
				expect(result).to.equal('Omissions must be an array');
			});
		});

		describe('- Return an null object :', function() {
			it('Return an null object with a string date', function() {
				result = mongooseUtils.isValidWithMongo(config.UserModel, config.params[4]);
				expect(result).to.be.a('null');
			});

			it('Return an null object with a js date', function() {
				result = mongooseUtils.isValidWithMongo(config.UserModel, config.params[5]);
				expect(result).to.be.a('null');
			});

			it('Return an null object', function() {
				result = mongooseUtils.isValidWithMongo(config.UserModel, config.params[2]);
				expect(result).to.be.a('null');
			});
		});
	});
};
