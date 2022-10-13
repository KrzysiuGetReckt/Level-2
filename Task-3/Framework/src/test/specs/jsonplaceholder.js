const { expect} = require(`chai`);


const {GeneratorUtils, JsonUtils,  ObjectUtils } = require(`../../framework/utils`);
const { ApiStatusCodes, GenerationData, TestData} = require(`../../TestData`);
const {projectApiUtil } = require('../../projectUtils');

describe('Api - https://jsonplaceholder.typicode.com', async () => {
  it('Test Case 1', async () => {
    // Step 1
      posts = await projectApiUtil.getPosts();
    expect(posts.status).to.equal(ApiStatusCodes.ok, 'The "status code" should be 200');
    expect(ObjectUtils.isObjectSortedByAscending(posts.body, 'id'), 'The "object array" should be ascending on id').to.be.true;
    expect(await JsonUtils.isJson(posts.body), 'The "response body" should be a json').to.be.true;
    // Step 2
    const post99 = await projectApiUtil.getExactPost(TestData.post99.id);
    expect(post99.status).to.equal(ApiStatusCodes.ok, 'The "status code" should be 200');
    expect(post99.body.userId).to.equal(TestData.post99.userId, 'The "userId" should equal 10');
    expect(post99.body.id).to.equal(TestData.post99.id, 'The "id" of the "post" should equal 99');
    expect(post99.body.title, 'The post "title" shouldn\'t be empty').not.to.be.empty;
    expect(post99.body.body, 'The post "body" shouldn\'t be empty') .not.to.be.empty;
    // Step 3
    const post150 = await projectApiUtil.getExactPost(TestData.post150.id);
    expect(post150.status).to.equal(ApiStatusCodes.notFound, 'The status code should be 200');
    expect(post150.body, 'The post "body" should be empty').to.be.empty;
    // Step 4
    const post = {
      userId : TestData.post1.userId,
      body : GeneratorUtils.generateString(GenerationData.bodyLength),
      title: GeneratorUtils.generateString(GenerationData.titleLength)
    }
    const postSend = await projectApiUtil.postPost(post);
    expect(postSend.status).to.equal(ApiStatusCodes.created, 'The "status code" should be 200');
    expect(parseInt(postSend.body.userId)).to.equal(TestData.post1.userId, `The "post" id should be equal to ${TestData.post1.userId}`);
    expect(postSend.body.body).to.equal(post.body, `The "body" should be equal to the generated one: ${post.body}`);
    expect(postSend.body.title).to.equal(post.title, `The "title" should be equal to the generated one: ${post.title}`);
    expect(postSend.body.id, 'There should be an "id" property').to.exist;
    // Step 5
    const users = await projectApiUtil.getUsers();
    expect(users.status).to.equal(ApiStatusCodes.ok, 'The "status code" should be 200');
    expect(JsonUtils.isJson(users.body), 'The "response body" is not a JSON').to.be.true;
    const data = users.body.find((obj) => {return obj.id === TestData.user5.id;});
    expect(data).to.deep.equal(TestData.user5, 'The "data" should be the same to compare.');
    // Step 6
    const user5 = await projectApiUtil.getUsersById(TestData.user5.id);
    expect(user5.status).to.equal(ApiStatusCodes.ok, 'The "status code" should be 200');
    expect(data).to.deep.equal(user5.body, 'The "data" should be equal between the two objects');
    });
})