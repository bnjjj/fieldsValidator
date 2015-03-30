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

module.exports = {
  assertParams: assertParams,
  checkDate: checkDate,
  getSwaggerParams: getSwaggerParams
};
