const loggerSetup = require('./loggerSetup');

var Logger = null;

Logger = loggerSetup();

module.exports = Logger;