const {expect} = require('chai');

const DbUtils = require('../../framework/utils/dbUtils');
const { ProjectDbUtil } = require('../../projectUtils');
const dbTestData = require('../../testData/dbTestData');

describe('User Inyerface', async () => {
    before(async function(){
        await DbUtils.createConnection();
        await ProjectDbUtil.insertAuthor(dbTestData);
        await ProjectDbUtil.insertProject(dbTestData.projectName)
    });
    beforeEach(async function(){

    });
    it('TC-2. Processing of test data', async () => {
        for(const value of dbTestData.table.numbers){
            let data = {
                testId: value,
                projectId: await ProjectDbUtil.getProjectId(dbTestData.projectName),
                authorId: await ProjectDbUtil.getAuthorIdByName(dbTestData.authorName)
            }
            await ProjectDbUtil.updateTestProjectIdAuthorIdWithId(data);
            let newRows = await ProjectDbUtil.getTestProjectIdAuthorIdById(data.testId);
            expect(newRows[0].project_id).to.equal(data.projectId[0].id, `The project id is not equal to ${data.projectId[0].id}`);
            expect(newRows[0].author_id).to.equal(data.authorId[0].id, `The project id is not equal to ${data.authorId[0].id}`);
        }
    });

    after(async function(){
        for(const value of dbTestData.table.numbers){
            await ProjectDbUtil.deleteTestById(value);
            let result = await ProjectDbUtil.getTestIdById(value);
            expect(result.length).to.equal(0);
        }
        DbUtils.endConnection();
    })
});