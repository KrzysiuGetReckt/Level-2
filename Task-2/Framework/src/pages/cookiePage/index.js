const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');
const ElementStateProvider = require('../../framework/element/elementStateProvider');


class CredentialsPage extends BaseForm {

  constructor() {
    super('.cookies', 'Cookie alert');
  }

  get cookies() {return new ElementStateProvider('.cookies', 'Cookie alert'); }
  get notReallyNoButton() {return new Element('//button[contains(text(), "Not really, no")]', '"Not really, no" button'); }

  async clickNoNotReallyNo(){
    return this.notReallyNoButton.click();
  }

  async waitTillCookiesAreDisplayed(){
    return this.cookies.waitForDisplayed();
  }
  async checkIfCookiesExist(){
    return this.cookies.isExisting();
  }
}

module.exports = new CredentialsPage();
