const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');
const ElementStateProvider = require('../../framework/element/elementStateProvider');


class HelpForm extends BaseForm {

  constructor() {
    super('.help-form', 'Help form of Inyerface');
  }

  get helpFormButton() {return new Element('//button[contains(@class, "help-form__send-to-bottom-button")]',
                                            '"Send to bottom" button')}
  get hiddenHelpFormDiv() {return new Element('//div[contains(@class, "help-form") and contains(@class, "is-hidden")]', '"Help Form div with status" div ')}

  async clickSendToBottom(){
    return this.helpFormButton.click();
  }
  
  async checkIfHelpFormIsHidden(){
    return this.hiddenHelpFormDiv.state().isExisting();
  }
}

module.exports = new HelpForm();
