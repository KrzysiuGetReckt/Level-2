const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');
const ElementStateProvider = require('../../framework/element/elementStateProvider');
const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 

module.exports = new class CompleateSubscription extends BaseForm{
    constructor(){
        super('//div[@id="additional-data-modal"]/a[@class="close-modal "]', `"Compleate Subscription" Form of page ${env.startUrl}`);
    }
}