const { expect } = require('chai');

const { ApiUtils } = require("../../framework/utils");
const { ApiRequests } = require('../testData');
const { ENVIRONMENT, TOKEN } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 


module.exports = new class TestSeps{

    async checkEmailList(){
        let response = await ApiUtils.get(ApiRequests.getMailList.url(), ApiRequests.header(TOKEN));
        expect(response.status).to.equal(200, 'The response code is not OK');
        return response.body.resultSizeEstimate;
    }
}