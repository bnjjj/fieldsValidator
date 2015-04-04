'use strict';
//Coenen Benjamin
//@bnj25
//Made with love

module.exports = {
  isValidWithMongo: require('./lib/mongoose').isValidWithMongo,
  isValidWithCustoms: require('./lib/params').isValidWithCustoms,
  isValidWithSwagger: require('./lib/swagger').isValidWithSwagger
};
