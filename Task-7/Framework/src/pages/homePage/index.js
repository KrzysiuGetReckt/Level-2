const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');
const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 

module.exports = new class HomePage extends BaseForm {

  constructor() {
    super('//section[@data-event-title="titre test"]', `Home page of ${env.startUrl}`);
  }

  get continiueWithoutAgreeingButton() {return new Element('//span[@class="didomi-continue-without-agreeing"]', '"Continoue without agreeing" link')}  
  get newslettersButton() {return new Element('//a[@aria-label="Newsletters"]', '"Newsletter" link')}

  async clickContiniueWithoutAgreeing(){
    return this.continiueWithoutAgreeingButton.click();
  }

  async clickNewsletters(){
    return this.newslettersButton.click();
  }
}