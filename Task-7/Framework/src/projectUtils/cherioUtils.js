const cherio = require('cheerio');

module.exports = class CherioUtils{
    /**
    * Accepts string that is a html document to load it as a document from where we are able
    * to get specidic information out. In this case the script gets a specific atrribute string
    * from a specific html tag.
    * @param {string} stringHtml the html string
    * @param {string} tag the tag where the attribute is located
    * @param {string} attribute the attribute that we are picking from
    * @returns {string} message the text of the attribute
    */
    static getTagAttributeFromString(stringHtml, tag, attribute){
        let message = cherio.load(stringHtml);
        return message(tag).attr(attribute);
    } 
}