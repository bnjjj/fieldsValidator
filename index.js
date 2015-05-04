'use strict';
//Coenen Benjamin
//@bnj25
//Made with love
var mongoose = require('./lib/mongoose');

module.exports = {
  isValidWithMongo: mongoose.isValidWithMongo,
  isValidWithCustoms: require('./lib/params').isValidWithCustoms,
  isValidWithSwagger: require('./lib/swagger').isValidWithSwagger,
  getValuesInSchema: mongoose.getValuesInSchema,
  createWithMongo: mongoose.createWithMongo
};
