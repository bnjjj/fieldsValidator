'use strict';
var _ = require('lodash');
var utils = require('./utils');
var moment = require('moment');

var checkSchema = function(model, params, omissions) {
  var error = null;
  if (error = checkIntegrity(model, params, omissions)) {
    return error;
  }
  var valueToOmit = ['__v', '_id'];
  var schema = _.omit(model.schema.paths, _.assign(valueToOmit, omissions));

  _.forEach(schema, function(attribute, name) {
    if (attribute.options.required && !params[name]) {
      return error = 'Param ' + name + ' is required';
    }
    if (params[name] && attribute.options.type === String && !_.isString(params[name])) {
      return error = 'Param ' + name + ' must be a string';
    }
    if (params[name] && attribute.options.type === Date && !moment(params[name]).isValid()) {
      return error = 'Param ' + name + ' must be a date';
    }
    if (params[name] && attribute.options.type === Number && !_.isNumber(params[name])) {
      return error = 'Param ' + name + ' must be a number';
    }
    if (params[name] && attribute.options.type === Array && !_.isArray(params[name])) {
      return error = 'Param ' + name + ' must be an array';
    }
    if (params[name] && attribute.options.type === Boolean && !_.isBoolean(params[name])) {
      return error = 'Param ' + name + ' must be a boolean';
    }
  });

  return error;
};

var checkIntegrity = function(model, params, omissions) {
  utils.assertParams([params, model]);
  if (_.isEmpty(params)) {
    return 'Params is empty';
  }
  if (_.isEmpty(model)) { 
    return 'Model is undefined';
  }
  if (omissions && !_.isArray(omissions)) {
    return 'Omissions must be an array';
  }
  return null;
};

module.exports = {
  checkSchema: checkSchema
};
