'use strict';
var assert = require('assert');
var _ = require('lodash');
var moment = require('moment');

function assertParams(paramsArray) {
  _.forEach(paramsArray, function(param) {
    assert(param, 'An argument is missing');
  });
}

function getSwaggerParams(swaggerObj, path, method) {
  return swaggerObj.paths[path][method].parameters;
}

function checkDate(dateToCheck) {
  return moment(dateToCheck).isValid();
}

function checkNumber(numberToCheck) {
	return !_.isNaN(parseInt(numberToCheck, 10));
}

function checkBoolean(booleanToCheck) {
  return booleanToCheck;
}

function checkArray(arrayToCheck) {
  return _.isArray(arrayToCheck) && !_.isEmpty(arrayToCheck);
}

module.exports = {
  assertParams: assertParams,
  checkDate: checkDate,
  checkNumber: checkNumber,
  getSwaggerParams: getSwaggerParams,
  checkBoolean: checkBoolean,
  checkArray: checkArray
};
