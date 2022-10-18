const { expect} = require(`chai`);

const {GeneratorUtils, JsonUtils,  ObjectUtils } = require(`../../framework/utils`);
const { ApiStatusCodes, GenerationData, TestData} = require(`../../TestData`);
const {ProjectApiUtil } = require('../../projectUtils');
const { ENVIRONMENT } = require('../environment/envConfig');
const env = require(`../environment/${ENVIRONMENT}Environment`);

describe(`Api - ${env.apiUrl}`, async () => {
  it('Test Case 1', async () => {
    // Step 1
      posts = await ProjectApiUtil.getPosts();
    expect(posts.status).to.equal(ApiStatusCodes.ok, `The "status code" should be ${ApiStatusCodes.ok}`);
    expect(ObjectUtils.isObjectSortedByAscending(posts.body, 'id'), 'The "object array" should be ascending on id').to.be.true;
    expect(await JsonUtils.isJson(posts.body), 'The "response body" should be a json').to.be.true;
    // Step 2
    const postNumber99 = await ProjectApiUtil.getExactPost(TestData.postNumber99.id);
    expect(postNumber99.status).to.equal(ApiStatusCodes.ok, `The "status code" should be ${ApiStatusCodes.ok}`);
    expect(postNumber99.body.userId).to.equal(TestData.postNumber99.userId, `The "userId" should equal ${TestData.postNumber99.userId}`);
    expect(postNumber99.body.id).to.equal(TestData.postNumber99.id, `The "id" of the "post" should equal ${TestData.postNumber99.id}`);
    expect(postNumber99.body.title, 'The post "title" shouldn\'t be empty').not.to.be.empty;
    expect(postNumber99.body.body, 'The post "body" shouldn\'t be empty') .not.to.be.empty;
    // Step 3
    const postNumber150 = await ProjectApiUtil.getExactPost(TestData.postNumber150.id);
    expect(postNumber150.status).to.equal(ApiStatusCodes.notFound, `The "status code" should be ${ApiStatusCodes.notFound}`);
    expect(postNumber150.body, 'The post "body" should be empty').to.be.empty;
    // Step 4
    const newPostInfo = {
      userId : TestData.postNumber1.userId,
      body : GeneratorUtils.generateString(GenerationData.bodyLength),
      title: GeneratorUtils.generateString(GenerationData.titleLength)
    }
    const newCreatedPost = await ProjectApiUtil.postPost(newPostInfo);
    expect(newCreatedPost.status).to.equal(ApiStatusCodes.created, `The "status code" should be ${ApiStatusCodes.created}`);
    expect(parseInt(newCreatedPost.body.userId)).to.equal(TestData.postNumber1.userId, `The "post" id should be equal to ${TestData.postNumber1.userId}`);
    expect(newCreatedPost.body.body).to.equal(newPostInfo.body, `The "body" should be equal to the generated one: ${newPostInfo.body}`);
    expect(newCreatedPost.body.title).to.equal(newPostInfo.title, `The "title" should be equal to the generated one: ${newPostInfo.title}`);
    expect(newCreatedPost.body.id, 'There should be an "id" property').to.exist;
    // Step 5
    const users = await ProjectApiUtil.getUsers();
    expect(users.status).to.equal(ApiStatusCodes.ok, `The "status code" should be ${ApiStatusCodes.ok}`);
    expect(JsonUtils.isJson(users.body), 'The "response body" is not a JSON').to.be.true;
    const data = users.body.find((obj) => {return obj.id === TestData.userNumber5.id;});
    expect(data).to.deep.equal(TestData.userNumber5, 'The "data" should be the same to compare.');
    // Step 6
    const userNumber5 = await ProjectApiUtil.getUsersById(TestData.userNumber5.id);
    expect(userNumber5.status).to.equal(ApiStatusCodes.ok, `The "status code" should be ${ApiStatusCodes.ok}`);
    expect(data).to.deep.equal(userNumber5.body, 'The "data" should be equal between the two objects');
    });
})