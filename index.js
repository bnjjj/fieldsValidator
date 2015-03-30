'use strict';
//Coenen Benjamin
//@bnj25
//Made with love

module.exports = {
  checkSchema: require('./lib/mongoose').checkSchema,
  checkFieldsRequired: require('./lib/params').checkFieldsRequired,
  checkSwagger: require('./lib/swagger').checkSwagger
};
