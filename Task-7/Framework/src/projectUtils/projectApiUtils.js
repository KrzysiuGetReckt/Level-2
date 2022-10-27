const { expect } = require('chai');

const { ApiUtils } = require('../framework/utils');
const { ApiRequests } = require('../test/testData');
const Timeouts = require('../environment/timeouts');
const { Logger } = require('../framework');

module.exports = new class ProjectApiUtils{
    async checkEmailList(TOKEN){
        const response = await ApiUtils.get(ApiRequests.getMailList.url(), ApiRequests.header(TOKEN));
        return { resultSize: response.body.resultSizeEstimate, statusCode: response.status };
    }

    async listOfEmails(TOKEN){
       const response = await ApiUtils.get(ApiRequests.getSpecificMail.url('noreply@euronews.com'), ApiRequests.header(TOKEN));
       return { emailId: response.body.messages[0].id, statusCode: response.status };
    }

    async bodyOfEmail(TOKEN, emailId){
        const response = await ApiUtils.get(ApiRequests.getContentMail.url(emailId), ApiRequests.header(TOKEN));
        return { bodyData: response.body.payload["parts"][0].body.data , statusCode: response.status };
    }

    async waitTillEmail(TOKEN){
        return browser.waitUntil(
            async () => ((await this.checkEmailList(TOKEN)).resultSize) != 0,
            {
                timeout: Timeouts.timeout,
                timeoutMsg: 'expected email not found after 50s',
                interval: Timeouts.interval,
            }
        );
    }
}