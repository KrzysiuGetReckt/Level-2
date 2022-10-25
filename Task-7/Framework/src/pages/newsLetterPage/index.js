const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');
const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 

module.exports = new class NewsletterPage extends BaseForm {

  constructor() {
    super('//span[contains(text(), "Our newsletters")]', `NewsLetter page of $${env.startUrl}`);
  }

  newsLetterOption = (subscriptionPlanId) => {return new Element(`//label[@for="${subscriptionPlanId}"][1]`, `The subscription plan: ${subscriptionPlanId}`)};
  newsLetterSeePreview = (subscriptionPlanId) => {return new Element(`//*[@id="${subscriptionPlanId}"]/../../a`, `The preview of: ${subscriptionPlanId}`)}
  get newsLetterOptionsLabels() {return new Element('//form[@id="newsletters-form"]//label[@for][1]', '"Select all newsLetterOptions"')};

  async getNewsLetterOptionsAttribute(){
    return this.newsLetterOptionsLabels.getAttributeFromElements('for');
  }

  async getNewsLetterAttribute(subscriptionPlanId){
    return this.newsLetterSeePreview(subscriptionPlanId).getAttributeFromElements('href');
  }

  async clickNewsLetterOption(subscriptionPlanId){
    await this.newsLetterOption(subscriptionPlanId).scrollIntoView();
    return this.newsLetterOption(subscriptionPlanId).click();
  }

  async clickNewsLetterPreview(subscriptionPlanId){
    await this.newsLetterSeePreview(subscriptionPlanId).scrollIntoView();
    return this.newsLetterSeePreview(subscriptionPlanId).click();
  }
}
