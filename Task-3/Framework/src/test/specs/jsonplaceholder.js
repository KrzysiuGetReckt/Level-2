const { expect} = require(`chai`);

const { ENVIRONMENT } = require(`../../environment/envConfig`);
const env = require(`../../environment/${ENVIRONMENT}Environment`);
const {GeneratorUtils, JsonUtils,  ObjectUtils } = require(`../../framework/utils`);
const {apiStatusCodes, generationData, testData} = require(`../../testData`);
const {projectApiUtil } = require('../../projectUtils');

describe(`Api - https://jsonplaceholder.typicode.com`, async () => {
  it(`Test Case 1`, async () => {
    // Step 1
    let  posts = await projectApiUtil.getPosts();
    expect(await posts.status).to.equal(apiStatusCodes.statusCodes[200], `The status code should be 200`);
    expect(ObjectUtils.isObjectSortedByAscending(posts.body, `id`), `The object array should be ascending on id`).to.be.true;
    expect(await JsonUtils.isJson(posts.body), `The response body should be a json`).to.be.true;
    // Step 2
    let post99 = await projectApiUtil.getExactPost(testData.post99.id);
    expect(await post99.status).to.equal(apiStatusCodes.statusCodes[200], `The status code should be 200`);
    expect(await post99.body.userId).to.equal(testData.post99.userId, `The userId should equal 10`);
    expect(await post99.body.id).to.equal(testData.post99.id, `The id of the post should equal 99`);
    expect(await post99.body.title, `The post title shouldn't be empty`).not.to.be.empty;
    expect(await post99.body.body, `The post body shouldn't be empty`).not.to.be.empty;
    // Step 3
    let post150 = await projectApiUtil.getExactPost(testData.post150.id);
    expect(await post150.status).to.equal(apiStatusCodes.statusCodes[404], `The status code should be 200`);
    expect(post150.body, `The post body should be empty`).to.be.empty;
    // Step 4
    const post = {
      userId : testData.post1.userId,
      body : GeneratorUtils.generateString(generationData.bodyLength),
      title: GeneratorUtils.generateString(generationData.titleLength)
    }
    let postSend = await projectApiUtil.postPostTypeSendUserIdBodyTitle(post);
    expect(await postSend.status).to.equal(apiStatusCodes.statusCodes[201], `The status code should be 200`);
    expect(await parseInt(postSend.body.userId)).to.equal(testData.post1.userId, `The post id should be equal to ${testData.post1.userId}`);
    expect(await postSend.body.body).to.equal(post.body, `The body should be equal to the generated one: ${post.body}`);
    expect(await postSend.body.title).to.equal(post.title, `The title should be equal to the generated one: ${post.title}`);
    expect(await postSend.body.id, `There should be an id property`).to.exist;
    // Step 5
    let users = await projectApiUtil.getUsers();
    expect(await users.status).to.equal(apiStatusCodes.statusCodes[200], `The status code should be 200`);
    expect(JsonUtils.isJson(users.body), `The response body is not a JSON`).to.be.true;
    let data = users.body.find((obj) => {return obj.id === 5;});
    expect(data).to.deep.equal(testData.user5, `The data should be the same to compare.`);
    // Step 6
    let user5 = await projectApiUtil.getUsersId(testData.user5.id);
    expect(await user5.status).to.equal(apiStatusCodes.statusCodes[200], `The status code should be 200`);
    expect(data).to.deep.equal(user5.body, `The data should be equal between the two objects`);
    });
})