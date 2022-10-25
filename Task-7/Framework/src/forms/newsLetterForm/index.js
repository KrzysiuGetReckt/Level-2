const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');
const ElementStateProvider = require('../../framework/element/elementStateProvider');
const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 

const registerNewslettersForm = '//form[@id="register-newsletters-form"]';

module.exports = new class NewsLetterForm extends BaseForm {

  constructor() {
    super('#register-newsletters-form', `NewsLetter Form of ${env.startUrl}`);
  }
  
  get emailInput(){return new Element(`${registerNewslettersForm}//input[@type="email"]`, '"Email" input')};
  get emailSubmitButton(){return new Element( `${registerNewslettersForm}//input[@type="submit"]` , '"Email Submit" Button')};

  async setEmail(email){
    return this.emailInput.clearAndType(email);
  }

  async submitEmail(){
    return this.emailSubmitButton.click();
  }

}
