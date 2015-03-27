'use strict';
var assert = require('assert');
var _ = require('lodash');

var assertParams = function(paramsArray) {
	_.forEach(paramsArray, function(param) {
		assert(param, 'An argument is missing');
	});
};

module.exports = {
	assertParams: assertParams
};
