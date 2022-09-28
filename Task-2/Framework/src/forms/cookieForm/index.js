const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');

class CookieForm extends BaseForm {

  constructor() {
    super('//*[@id="rcc-confirm-button"]', 'Cookie page');
  }

  get acceptButton() { return new Element('//*[@id="rcc-confirm-button"]', 'Accept cookie button'); }

  /**
   * Click accept button
   * @returns {Promise<any>} result
   */
  async clickButtonAccept() {
    return this.acceptButton.click();
  }
  
  /**
   * Check than accept button is present
   * @returns {Promise<any>} result
   */
  async isButtonAcceptPresent() {
    return this.acceptButton.state().assertIsDisplayed();
  }
}

module.exports = new CookieForm();
