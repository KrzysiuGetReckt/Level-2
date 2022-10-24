const BaseForm = require("../../framework/baseForm");
const Element = require('../../framework/element');
const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 

class ConfirmationPage extends BaseForm{

    constructor(){
        super('//h1[contains(text(), "Your subscription has been successfully confirmed.")]', `Newsletter Confirmation page of ${env.startUrl}`);
    }

    get backToSiteButton() {return new Element('//a[@aria-label="Back to the site"]', '"Back to site" Button')};

    async clickBackToSite(){
        return this.backToSiteButton.click();
    }
}

module.exports = new ConfirmationPage();