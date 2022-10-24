const BaseForm = require("../../framework/baseForm");
const Element = require('../../framework/element');
const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 

module.exports = new class PreviewPage extends BaseForm{

    constructor(){
        super('//a[contains(text(), "Online version")]', `Newsletter Preview iframe of ${env.startUrl}`)
    }

    get unsubscribeLink(){return new Element('//a[contains(text(), "unsubscribe by clicking here")]', '"Unsubscribe here" Link')};

    async GetUnsubscribeAttribute(attribute){
        await this.unsubscribeLink.scrollIntoView();
        return this.unsubscribeLink.getAttributeFromElements(attribute);
    }
}