const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');
const ElementStateProvider = require('../../framework/element/elementStateProvider');
const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 

class NewsLetterForm extends BaseForm {

  constructor() {
    super('#register-newsletters-form', `NewsLetter Form of ${env.startUrl}`);
  }
  
  get emailInput(){return new Element('//form[@id="register-newsletters-form"]//input[@type="email"]', '"Email" input')};
  get emailSubmitButton(){return new Element( '//form[@id="register-newsletters-form"]//input[@type="submit"]' , '"Email Submit" Button')};

  async setEmail(email){
    return this.emailInput._clearAndSetText(email);
  }

  async submitEmail(){
    return this.emailSubmitButton.click();
  }

}

module.exports = new NewsLetterForm();
