const loggerSetup = require('./loggerSetup');

let Logger = null;

Logger = loggerSetup();

module.exports = Logger;