const { expect, assert} = require('chai');

const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`);
const { GeneratorUtils } = require('../../framework/utils');
const JsonUtils = require('../../framework/utils/jsonUtils');
const ObjectUtils = require('../../framework/utils/objectUtils');
const testData = require('../../testData/testData');
const generationData = require('../../testData/generationData')
const apiStatusCodes = require('../../testData/apiStatusCodes.json');
const projectApiUtil = require('../../projectUtils/projectApiUtil');
const apiUtil = require('../../framework/utils/apiUtils');

describe('User Inyerface', async () => {
  it('Test Case 1', async () => {
    // Step 1
    let  posts = await projectApiUtil.getPosts();
    expect(await posts.status).to.be.equal(apiStatusCodes.statusCodes[200]);
    expect(ObjectUtils.isObjectSortedByAscending(posts.body, "id")).to.be.true;
    expect(await JsonUtils.isJson(posts.body)).to.be.true;
    // Step 2
    let post99 = await projectApiUtil.getExactPost(testData.post99.id);
    expect(await post99.status).to.be.equal(apiStatusCodes.statusCodes[200]);
    expect(await post99.body['userId']).to.be.equal(testData.post99.userId);
    expect(await post99.body['id']).to.be.equal(testData.post99.id);
    expect(await ObjectUtils.isEmpty(post99.body['title'])).to.be.false;
    expect(await ObjectUtils.isEmpty(post99.body['body'])).to.be.false;
    // Step 3
    let post150 = await projectApiUtil.getExactPost(testData.post150.id);
    expect(await post150.status).to.be.equal(apiStatusCodes.statusCodes[404]);
    expect(post150.body).to.be.empty;
    // Step 4
    let body = GeneratorUtils.generateString(generationData.bodyLength);
    let title = GeneratorUtils.generateString(generationData.titleLength);
    let postSend = await projectApiUtil.postPostTypeSendUserIdBodyTitle(testData.post1.id, body, title);
    expect(await postSend.status).to.be.equal(apiStatusCodes.statusCodes[201]);
    expect(await postSend.body['userId']).to.be.equal(`${testData.post1.id}`);
    expect(await postSend.body['body']).to.be.equal(body);
    expect(await postSend.body['title']).to.be.equal(title);
    expect(await postSend.body.hasOwnProperty('id')).to.be.true;
    // Step 5
    let users = await apiUtil.get(`${env['api']}/users`);
    expect(await users.status).to.be.equal(apiStatusCodes.statusCodes[200]);
    expect(JsonUtils.isJson(users.body), "The response body is not a JSON").to.be.true;
    let data = users.body[testData.user5.id - 1]; // the object starts at 0 rather than 1...
    let compare = testData.user5;
    expect(data).to.deep.equal(compare);
    // Step 6
    let user5 = await apiUtil.get(`${env['api']}/users/5`);
    expect(await user5.status).to.be.equal(apiStatusCodes.statusCodes[200]);
    expect(data).to.deep.equal(user5.body);
    });
})