'use strict';

var config = require('../config');
var mongoose = require('mongoose');
var Promeese = require('bluebird');

/** Promisification */
Promeese.promisifyAll(mongoose);

/** Connecting */
mongoose.connect(config.mongo.url);

/** Export mongoose object */
module.exports = mongoose;
