'use strict';
var _ = require('lodash');
var utils = require('./utils');

var isValidWithCustoms = function(requiredFields, fields) {
  utils.assertParams([fields, requiredFields]);
  var errors =  _.xor(_.keysIn(_.pick(fields, requiredFields)), requiredFields);
  if (!_.isEmpty(errors)) {
  	return 'Param(s) ' + errors.toString() + (errors.length > 1 ? ' are ' : ' is ') + 'required';
  }
  return null;
};

module.exports = {
  isValidWithCustoms: isValidWithCustoms
};
