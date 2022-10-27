const BaseForm = require("../../framework/baseForm");
const Element = require('../../framework/element');
const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 

module.exports = new class PreviewPage extends BaseForm{

    constructor(){
        super('//a[contains(text(), "Online version")]', `Newsletter Preview iframe of ${env.startUrl}`)
    }

    iframeLocator(attribute){return new Element(`${attribute} > iframe`, '"IframeId" Iframe')};
    get unsubscribeLink(){return new Element('//a[contains(text(), "unsubscribe by clicking here")]', '"Unsubscribe here" Link')};

    async getUnsubscribeUrl(){
        await this.unsubscribeLink.scrollIntoView();
        const href = await this.unsubscribeLink.getAttributeFromElements('href');
        return href[0]; 
    }

    async changeToIframe(attribute){
        return browser.switchToFrame(await browser.findElement('css selector', await this.iframeLocator(attribute).locator));
    }
}