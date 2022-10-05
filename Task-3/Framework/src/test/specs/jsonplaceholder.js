const { expect} = require('chai');
const unirest = require('unirest');

const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`);
const { GeneratorUtils } = require('../../framework/utils');
const JsonUtils = require('../../framework/utils/jsonUtils');
const ObjectUtils = require('../../framework/utils/objectUtils');
const testData = require('../../testData/testData.json');
const apiStatusCodes = require('../../testData/apiStatusCodes.json');
const projectApiUtil = require('../../projectUtils/projectApiUtil');
const apiUtil = require('../../framework/utils/apiUtils');

describe('User Inyerface', async () => {
  it('Test Case 1', async () => {
    // Step 1
    let  response = await apiUtil.get(`${env['api']}/posts`, `json`);
    expect(await response.status).to.be.equal(apiStatusCodes.Codes[200]);
    expect(await ObjectUtils.isAscending(response.body, "id")).to.be.true;
    expect(await JsonUtils.isJson(response.body)).to.be.true;
    // Step 2
    response = await apiUtil.get(`${env['api']}/posts/99`, `json`);
    expect(await response.status).to.be.equal(apiStatusCodes.Codes[200]);
    expect(await response.body['userId']).to.be.equal(testData.posts['User id 99'].userId);
    expect(await response.body['id']).to.be.equal(testData.posts['User id 99'].id);
    expect(await ObjectUtils.isEmpty(response.body['title'])).to.be.false;
    expect(await ObjectUtils.isEmpty(response.body['body'])).to.be.false;
    // Step 3
    response = await apiUtil.get(`${env['api']}/posts/150`, `json`);
    expect(await response.status).to.be.equal(apiStatusCodes.Codes[404]);
    expect(await ObjectUtils.isEmpty(response.body)).to.be.true;
    // Step 4
    let body = GeneratorUtils.generateString(testData['generator data']['body length']);
    let title = GeneratorUtils.generateString(testData['generator data']['title length']);
    response = await projectApiUtil.postTypeSendUserIdBodyTitle(`${env['api']}/posts`, 1, body, title);
    expect(await response.status).to.be.equal(apiStatusCodes.Codes[201]);
    expect(await response.body['userId']).to.be.equal('1');
    expect(await response.body['body']).to.be.equal(body);
    expect(await response.body['title']).to.be.equal(title);
    expect(await response.body.hasOwnProperty('id')).to.be.true;
    // Step 5
    response = await apiUtil.get(`${env['api']}/users`, `json`);
    expect(await response.status).to.be.equal(apiStatusCodes.Codes[200]);
    expect(JsonUtils.isJson(response.body), "The response body is not a JSON").to.be.true;
    let data = response.body[4];
    let compare = testData.users['User id 5'];
    expect(JsonUtils.jsonCompare(data, compare), "User id 5 data is wrong").to.be.true;
    // Step 6
    response = await apiUtil.get(`${env['api']}/users/5`, `json`);
    expect(await response.status).to.be.equal(apiStatusCodes.Codes[200]);
    expect(JsonUtils.jsonCompare(data, response.body, "The new response is not equal to earlier one.")).to.be.true;
    });
})