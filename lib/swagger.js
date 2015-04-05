'use strict';
var _ = require('lodash');
var utils = require('./utils');

var typesCollection = {
  string: _.isString,
  integer: _.isNumber,
  double: _.isNumber,
  long: _.isNumber,
  float: _.isNumber,
  boolean: _.isBoolean,
  date: utils.checkDate,
  dateTime: utils.checkDate
};

var isValidWithSwagger = function(swaggerParams, fields) {
	var error = checkIntegrity(swaggerParams, fields);
  if (error) {
    return error;
  }
  var schema = swaggerParams;

  _.forEach(schema, function(parameter) {
    var type = typesCollection[parameter.type];
    if (parameter.required && !fields[parameter.name]) {
      error = 'Param ' + parameter.name + ' is required';
      return error;
    }

    if (!type) {
      error = 'Bad parameter type ' + parameter.name;
      return error;
    }

    if (fields[parameter.name] && !typesCollection[parameter.type](fields[parameter.name])) {
      error = 'Param ' + parameter.name + ' must be ' + parameter.type;
      return error;
    }
  });

  return error;
};

var checkIntegrity = function(swaggerParams, params) {
  utils.assertParams([params, swaggerParams]);
  if (_.isEmpty(params)) {
    return 'Params is empty';
  }
  if (_.isEmpty(swaggerParams)) { 
    return 'swaggerParams is empty';
  }
  return null;
};

module.exports = {
  isValidWithSwagger: isValidWithSwagger
};
