module.exports = class StringUtils {

  /**
  * Remove all spaces from string
  * @param {string} str current string
  * @returns {string} string without spaces
  */
  static removeAllSpacesFromString(str) {
    return str.replace(/\s/g, '');
  }

  /**
  * Convert string to number
  * @param {string} str number like string
  * @returns {number} number
  */
  static convertStringToNumber(str) {
    return Number.parseInt(str, 10);
  }

  /**
  * Replace all symbols from string
  * @param {string} str current string
  * @param {string} oldSymb replaceable character
  * @param {string} newSymb replacement character
  * @returns {string} string without spaces
  */
  static replaceSymbols(str, oldSymb, newSymb = '') {
    const re = new RegExp(oldSymb, 'g');
    return str.replace(re, newSymb);
  }
};