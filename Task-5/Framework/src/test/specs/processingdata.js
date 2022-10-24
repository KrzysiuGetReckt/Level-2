const {expect} = require('chai');

const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 
const { DatabaseUtils } = require('../../framework/utils');
const { insertAuthor, getProjectId, insertProject, getAuthorIdByName, updateTest, getTestProject, deleteTestById, getTestIdById } = require('../testData/queries');
const credensialsEnviroment = require('../../environment/credensialsEnviroment');
const { TestSettings } = require('../testData');
const { Credentials } = require('../steps');

const db = new DatabaseUtils();

describe('Database Test', async () => {
    before(async function(){
        await db.createConnection(credensialsEnviroment);
        await db.query(insertAuthor(Credentials));
        const result = await db.query(getProjectId(env.projectName));
        if(Object.keys(result[0]).length == false){
            await db.query(insertProject(env.projectName));
        }
    });
    it('TC-2. Processing of test data', async () => {
        for(const value of TestSettings.table.numbers){
            const projectId = await db.query(getProjectId(await env.projectName));
            const authorId = await db.query(getAuthorIdByName(await Credentials.authorName));
            const data = {
                testId: value,
                projectId: projectId[0][0].id,
                authorId: authorId[0][0].id
            }
            await db.query(updateTest(data));
            const newRows = await db.query(getTestProject(data.testId));
            expect(newRows[0][0].project_id).to.equal(data.projectId, `The project id is not equal to ${data.projectId}`);
            expect(newRows[0][0].author_id).to.equal(data.authorId, `The author id is not equal to ${data.authorId}`);
        }
    });

    after(async function(){
        for(const value of TestSettings.table.numbers){
            await db.query(deleteTestById(value));
            const result = await db.query(getTestIdById(value));
            expect(Object.keys(result[0]).length).to.equal(0, 'The record is not deleted');
        }
        db.endConnection();
    })
});