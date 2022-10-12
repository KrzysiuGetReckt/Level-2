const unirest = require('unirest');
const Logger = require('../logger');

module.exports = class ApiUtil{
    /**
    * Send a get request to an specific url
    * @param {string} url the url that the get request will be sent on
    * @return Returns a request body with the gathered information. 
    */
    static async get(url){
        Logger.info(`Sending Get request at: ${url}`);
        return unirest.get(url);
    }
    /**
    * Send a post request to an specific url
    * @param {string} url the url that the get request will be sent on
    * @param {object} header the optional paramaters for the post request
    * @param {object} data the information send to the API 
    * Formated in a object = { key: value, ..., key: value} format.
    * @return Returns a request body with the gathered information. 
    */
    static async post(url, header, data){
        Logger.info(`Sending Post request at: ${url}`);
        return unirest.post(url).headers(header).send(data);
    }
};