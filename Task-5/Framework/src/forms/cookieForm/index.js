const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');
const ElementStateProvider = require('../../framework/element/elementStateProvider');


class CookieForm extends BaseForm {

  constructor() {
    super('.cookies', 'Cookie alert');
  }

  get cookies() {return new Element('.cookies', 'Cookie alert'); }
  get notReallyNoButton() {return new Element('//button[contains(text(), "Not really, no")]', '"Not really, no" button'); }

  async clickNoNotReallyNo(){
    return this.notReallyNoButton.click();
  }

  async waitTillCookiesAreDisplayed(){
    return this.cookies.state().waitForDisplayed();
  }
  async checkIfCookiesExist(){
    return this.cookies.state().isExisting();
  }
}

module.exports = new CookieForm();
