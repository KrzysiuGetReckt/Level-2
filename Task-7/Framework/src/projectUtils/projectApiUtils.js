const { expect } = require('chai');

const { ApiUtils } = require('../framework/utils');
const { ApiRequests } = require('../test/testData');
const { ENVIRONMENT, TOKEN } = require('../environment/envConfig');
const { ApiStatusCodes } = require('../test/testData');
const env = require(`../environment/${ENVIRONMENT}Environment`); 
const Timeouts = require('../environment/timeouts')

module.exports = new class ProjectApiUtils{
    async checkEmailList(){
        let response = await ApiUtils.get(ApiRequests.getMailList.url(), ApiRequests.header(TOKEN));
        expect(response.status).to.equal(ApiStatusCodes.ok, 'The response code is not OK');
        return response.body.resultSizeEstimate;
    }

    async waitTillEmail(){
        return await browser.waitUntil(
            async () => (await this.checkEmailList()) != 0,
            {
                timeout: Timeouts.timeout,
                timeoutMsg: 'expected email not found after 50s',
                interval: Timeouts.interval,
            }
          );
    }
}