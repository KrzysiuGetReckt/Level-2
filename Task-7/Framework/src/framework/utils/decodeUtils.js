const { Logger } = require('../../framework');

module.exports = class DecodeUtils {
    /**
    * Encodes a variable to a string.
    * @param {string} encodedMessage the message to encode
    * @param {string} decode the coding of the message
    * @param {string} encode the type to encode to
    * @returns {string} result the encoding
    */
    static encode(encodedMessage, decode, encode){
        Logger.info('Decoding the message');
        return Buffer.from(encodedMessage, decode).toString(encode);
    }
}