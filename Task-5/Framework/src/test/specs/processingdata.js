const {expect} = require('chai');

const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 
const { DatabaseUtils } = require('../../framework/utils');
const { ProjectDbUtil, CredentialsUtil } = require('../../projectUtils');
const credensialsEnviroment = require('../../environment/credensialsEnviroment');
const Logger = require('../../framework/logger');

const db = new DatabaseUtils;
const credentials = {
    authorName: CredentialsUtil.generateAuthorName(),
    authorLogin: CredentialsUtil.generateAuthorLogin(),
    authorEmail: CredentialsUtil.generateEmail(),
}

describe('Database Test', async () => {
    before(async function(){
        await db.createConnection(credensialsEnviroment);
        await db.query(await ProjectDbUtil.insertAuthor(credentials));
        let result = await db.query(await ProjectDbUtil.getProjectId(env.projectName));
        if(result.length === 0){
            await db.query(await ProjectDbUtil.insertProject(env.projectName));
        }
    });
    beforeEach(async function(){

    });
    it('TC-2. Processing of test data', async () => {
        for(const value of env.table.numbers){
            let projectId = await db.query(await ProjectDbUtil.getProjectId(await env.projectName));
            let authorId = await db.query(await ProjectDbUtil.getAuthorIdByName(await credentials.authorName));
            let data = {
                testId: value,
                projectId: projectId[0].id,
                authorId: authorId[0].id
            }
            await db.query(await ProjectDbUtil.updateTest(data));
            let newRows = await db.query(await ProjectDbUtil.getTestProject(data.testId));
            expect(newRows[0].project_id).to.equal(data.projectId, `The project id is not equal to ${data.projectId}`);
            expect(newRows[0].author_id).to.equal(data.authorId, `The author id is not equal to ${data.authorId}`);
        }
    });

    after(async function(){
        for(const value of env.table.numbers){
            await db.query(await ProjectDbUtil.deleteTestById(value));
            let result = await db.query(await ProjectDbUtil.getTestIdById(value));
            expect(result.length).to.equal(0, 'The record is not deleted');
        }
        db.endConnection();
    })
});