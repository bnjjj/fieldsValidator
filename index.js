'use strict';

module.exports = {
  checkSchema: require('./lib/mongoose').checkSchema,
  checkFieldsRequired: require('./lib/params').checkFieldsRequired
};
