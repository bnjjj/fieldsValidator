'use strict';
var _ = require('lodash');
var utils = require('./utils');
var moment = require('moment');

function isValidWithMongo(model, params, omitRequired, omissions) {
  var error = checkIntegrity(model, params, omissions);
  if (error) {
    return error;
  }
  var valueToOmit = ['__v', '_id'];
  var schema = _.omit(model.schema.paths, _.assign(valueToOmit, omissions));

  _.forEach(schema, function(attribute, name) {
    if (attribute.options.required && !params[name] && !omitRequired) { 
      error = 'Param ' + name + ' is required';
      return error;
    }
    if (params[name] && attribute.options.type === String && !_.isString(params[name])) { 
      error = 'Param ' + name + ' must be a string';
      return error;
    }
    if (params[name] && attribute.options.type === Date && !moment(params[name]).isValid()) { 
      error = 'Param ' + name + ' must be a date';
      return error;
    }
    if (params[name] && attribute.options.type === Number && !utils.checkNumber(params[name])) { 
      error = 'Param ' + name + ' must be a number';
      return error;
    }
    if (params[name] && attribute.options.type === Array && !utils.checkArray(params[name])) { 
      error = 'Param ' + name + ' must be an array';
      return error;
    }
    if (params[name] != null && attribute.options.type === Boolean && !params[name]) { 
      error = 'Param ' + name + ' must be a boolean';
      return error;
    }
    if (params[name] && attribute.instance === 'ObjectID' && !_.isString(params[name])) {
      error = 'Param ' + name + ' must be a string';
      return error;
    }
  });

  return error;
}

function checkIntegrity(model, params, omissions) {
  // utils.assertParams([params, model]);
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
}

function getValuesInSchema(model, additions, omissions) {
  var valuesInSchema = _.map(model.schema.paths, function (args, name) {
    return (_.includes(omissions, name) ? 'null' : name);
  });

  if (additions != null) {
    valuesInSchema = _.union(valuesInSchema, _.isArray(additions) ? additions : [additions]);
  }

  return _.without(valuesInSchema, '__v', '_id', 'null');
}

function createWithMongo(model, body, additions, omissions) {
  return _.pick(body, getValuesInSchema(model, additions, omissions));
}

module.exports = {
  isValidWithMongo: isValidWithMongo,
  getValuesInSchema: getValuesInSchema,
  createWithMongo: createWithMongo
};
