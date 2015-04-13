'use strict';
var assert = require('assert');
var _ = require('lodash');
var moment = require('moment');

var assertParams = function(paramsArray) {
  _.forEach(paramsArray, function(param) {
    assert(param, 'An argument is missing');
  });
};

var getSwaggerParams = function(swaggerObj, path, method) {
  return swaggerObj.paths[path][method].parameters;
};

var checkDate = function(dateToCheck) {
  return moment(dateToCheck).isValid();
};

var checkNumber = function(numberToCheck) {
	return _.isNaN(parseInt(numberToCheck, 10));
};

var checkBoolean = function(booleanToCheck) {
  return booleanToCheck;
};

module.exports = {
  assertParams: assertParams,
  checkDate: checkDate,
  checkNumber: checkNumber,
  getSwaggerParams: getSwaggerParams,
  checkBoolean: checkBoolean
};
