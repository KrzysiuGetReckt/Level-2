const unirest = require('unirest');
const Logger = require('../logger');

module.exports = class apiUtil{
    static get(url){
        Logger.info(`Sending Get request at: ${url}`);
        return unirest.get(url);
    }
    static post(url){
        Logger.info(`Sending Post request at: ${url}`);
        return unirest.post(url);
    }
};