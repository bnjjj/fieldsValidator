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
  date: checkDate,
  dateTime: checkDate
};

var checkSwagger = function(swaggerParams, fields) {
	var error = null;
  if (error = checkIntegrity(swaggerParams, fields)) {
    return error;
  }
  var valueToOmit = [];
  var schema = swaggerParams;

  _.forEach(schema, function(parameter) {
    var type = typesCollection[parameter.type];
    if (parameter.required && !fields[parameter.name]) {
      return error = 'Param ' + parameter.name + ' is required';
    }

    if (!type) {
      return error = 'Bad parameter type ' + parameter.name;
    }

    if (fields[parameter.name] && !typesCollection[parameter.type](fields[parameter.name])) {
      return error = 'Param ' + parameter.name + ' must be ' + parameter.type;
    }
  });

  return error;
};

var checkDate = function(dateToCheck) {
  return (!moment(dateToCheck).isValid() ? 'Param ' + parameter.name + ' must be a date': null);
};

var checkIntegrity = function(swaggerParams, params) {
  utils.assertParams([params, swaggerParams]);
  if (_.isEmpty(params)) {
    return 'Params is empty';
  }
  if (_.isEmpty(swaggerParams)) { 
    return 'swaggerParams is undefined';
  }
  return null;
};

module.exports = {
  checkSwagger: checkSwagger
};
