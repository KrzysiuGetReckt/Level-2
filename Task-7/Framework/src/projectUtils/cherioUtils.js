const cherio = require('cheerio');
const { Logger } = require('../framework');

module.exports = class CherioUtils{
    /**
    * Gets the link from the subscription decoded message.
    * @param {string} stringHtml the html string
    * @param {string} tag the tag where the attribute is located
    * @param {string} attribute the attribute that we are picking from
    * @returns {string} message the text of the attribute
    */
    static getLinkSubscriptionEmail(stringHtml, tag, attribute){
        const message = cherio.load(stringHtml);
        Logger.info('Getting the Link from the subscription Email');
        return message(tag).attr(attribute);
    } 
}