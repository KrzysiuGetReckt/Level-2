const BaseForm = require("../../framework/baseForm");
const Element = require('../../framework/element');
const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`);
const Timeouts = require('../../environment/timeouts'); 

module.exports = new class NewsletterUnsubscriptionPage extends BaseForm{

    constructor(){
        super('//h3[contains(text(), "Newsletter unsubscription")]', `Newsletter unsubscription page of: ${env.startUrl}`);
    }

    get emailInput(){return new Element('#email', '"Email" Input')};
    get confirmUnsubscriptionButton(){return new Element('//button[contains(text(), "Confirm unsubscription")]' , '"Confirm unsubscription" Button')};
    get unsubscriptionMessage(){return new Element('//strong[contains(text(), "You are unsubscribed.")]', '"Unsubscription" Text')};

    async setEmailText(email){
        return this.emailInput.clearAndType(email);
    }

    async clickConfirmUnsubscription(){
        this.confirmUnsubscriptionButton.click();
    }

    async isUnsubscriptionMessageDisplayed(){
        this.unsubscriptionMessage.state().assertIsDisplayed(Timeouts.timeout, Timeouts.interval);
    }
}