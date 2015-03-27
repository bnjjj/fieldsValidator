'use strict';
var _ = require('lodash');
var utils = require('./utils');

var checkFieldsRequired = function(collection, requiredFields) {
  utils.assertParams([collection, requiredFields]);
  return (_.isEmpty(_.xor(_.keysIn(_.pick(collection, requiredFields)), requiredFields)));
};

module.exports = {
  checkFieldsRequired: checkFieldsRequired
};
