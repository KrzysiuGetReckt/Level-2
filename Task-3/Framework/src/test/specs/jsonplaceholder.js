const { expect, use } = require('chai');
const unirest = require('unirest');
const { ENVIRONMENT } = require('../../environment/envConfig');
const { GeneratorUtils } = require('../../framework/utils');
const env = require(`../../environment/${ENVIRONMENT}Environment`);
const ArrayUtil = require('../../framework/utils/arrayUtils');
const JsonUtils = require('../../framework/utils/jsonUtils');
const ObjectUtils = require('../../framework/utils/objectUtils');

describe('User Inyerface', async () => {
//   it('Test Case 1', async () => {
//     let response = await unirest.get('https://jsonplaceholder.typicode.com/posts').type('json');
//     expect(await response.status).to.be.equal(200);
//     let stringid = [];
//     for (const [key, value] of Object.entries(response.body)) {
//         stringid.push(`${value['id']}`);
//     }
//     let numberids = ArrayUtil.stringNumbersToNumbers(stringid);
//     expect(await ArrayUtil.isAscending(numberids)).to.be.true;
//     expect(await JsonUtils.isJson(response.body)).to.be.true;
//   });
//   it('Test Case 2', async () => {
//     let response = await unirest.get('https://jsonplaceholder.typicode.com/posts/99').type('json');
//     expect(await response.status).to.be.equal(200);
//     expect(await response.body['userId']).to.be.equal(10);
//     expect(await response.body['id']).to.be.equal(99);
//     expect(await ObjectUtils.isEmpty(response.body['title'])).to.be.false;
//     expect(await ObjectUtils.isEmpty(response.body['body'])).to.be.false;
//   });
    it('Test Case 3', async () => {
        let response = await unirest.get('https://jsonplaceholder.typicode.com/posts/150').type('json');
        expect(await response.status).to.be.equal(404);
        expect(await ObjectUtils.isEmpty(response.body)).to.be.true;
    });
    it('Test Case 4', async () => {
        let body = GeneratorUtils.generateString(10);
        let title = GeneratorUtils.generateString(10);
        let response = await unirest
        .post('https://jsonplaceholder.typicode.com/posts')
        .type('json')
        .send({
            userId: 1,
            body: body,
            title: title
        })
        expect(await response.status).to.be.equal(201);
        expect(await response.body['userId']).to.be.equal(1);
        expect(await response.body['body']).to.be.equal(body);
        expect(await response.body['title']).to.be.equal(title);
        expect(await response.body.hasOwnProperty('id')).to.be.true;
    });
    it('Test Case 4', async () => {
        let response = await unirest.get('https://jsonplaceholder.typicode.com/users').type('json');
        expect(await response.status).to.be.equal(200);
        let user = response.body[4];
        expect()
    });
})