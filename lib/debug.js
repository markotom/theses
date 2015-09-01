'use strict';

var debug = require('debug');

/** Reporters */
var reporters = ['database'];

/** Default reporter */
module.exports = debug('log');

/** Create reporter methods */
reporters.forEach(function (reporter) {
  module.exports[reporter] = debug(reporter);
  module.exports[reporter].info = debug(reporter + ':info');
  module.exports[reporter].error = debug(reporter + ':error');
});
