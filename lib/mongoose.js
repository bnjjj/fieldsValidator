'use strict';
var _ = require('lodash');
var utils = require('./utils');

var checkSchema = function(params, model, omissions) {
  utils.assertParams([params, model]);
  var valueToOmit = ['__v', '_id'];
  var schema = _.omit(model.schema.paths, _.assign(valueToOmit, omissions));
  var error = null;

  _.forEach(schema, function(attribute, name) {
    if (attribute.options.required && !params[name]) {
      error = {
        message: 'Params ' + name + ' is required'
      };
    }
    if (params[name] && attribute.options.type === String && !_.isString(params[name])) {
      error = {
        message: 'Params ' + name + ' must be a string'
      };
    }
    if (params[name] && attribute.options.type === Date && !_.isDate(params[name])) {
      error = {
        message: 'Params ' + name + ' must be a date'
      };
    }
    if (params[name] && attribute.options.type === Number && !_.isNumber(params[name])) {
      error = {
        message: 'Params ' + name + ' must be a number'
      };
    }
    if (params[name] && attribute.options.type === Array && !_.isNumber(params[name])) {
      error = {
        message: 'Params ' + name + ' must be an array'
      };
    }
    if (params[name] && attribute.options.type === Boolean && !_.isBoolean(params[name])) {
      error = {
        message: 'Params ' + name + ' must be a boolean'
      };
    }
  });

  return error;
};

module.exports = {
  checkSchema: checkSchema
};
