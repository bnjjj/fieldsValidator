'use strict';
var assert = require('assert');
var _ = require('lodash');

var assertParams = function(paramsArray) {
  _.forEach(paramsArray, function(param) {
    assert(param, 'An argument is missing');
  });
};

var getSwaggerParams = function(swaggerObj, path, method) {
  return swaggerObj.paths[path][method].parameters;
};

module.exports = {
  assertParams: assertParams
};
