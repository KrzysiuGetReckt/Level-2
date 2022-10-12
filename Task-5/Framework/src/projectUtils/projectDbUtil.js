const { ENVIRONMENT } = require(`../environment/envConfig`);
const env = require(`../environment/testEnvironment`);
const Logger = require("../framework/logger");
const { FileUtils, DbUtils } = require("../framework/utils");
const dbUtils = require("../framework/utils/dbUtils");

module.exports = new class projectDbUtil {
    async selectAllProjects(){
        return DbUtils.query(`SELECT * FROM project`);
    }
    async getProjectId(projectName){
        return DbUtils.query(`SELECT id FROM project WHERE name LIKE '${projectName}'`);
    }
    async getSessionId(id){
        return DbUtils.query(`SELECT id FROM session WHERE session_key LIKE '${id}'`);
    }
    async getTestId(testName){
        return DbUtils.query(`SELECT id FROM test WHERE name LIKE '${testName}'`);
    }
    async getTestIdById(testId){
        return DbUtils.query(`SELECT id FROM test WHERE id LIKE ${testId}`);
    }
    async getTestProjectIdAuthorIdById(testId){
        return DbUtils.query(`SELECT project_id, author_id FROM test WHERE id LIKE ${testId}`);
    }
    async getStateId(state){
        return DbUtils.query(`SELECT id FROM status WHERE name LIKE '${state}'`);
    }
    async getAuthorIdByName(name){
        return DbUtils.query(`SELECT id FROM author WHERE name LIKE '${name}'`);
    }

    async insertProject(projectName){
        let result = await this.getProjectId(projectName);
        if(result.length === 0){
            return DbUtils.query(`INSERT INTO project
            (id, name)
            VALUES
            (Null, '${projectName}')`);
        }
    }

    async insertSessionId(testStartTime, id){
        let result = await this.getSessionId(id);
        if(result.length === 0){
            return DbUtils.query(`INSERT INTO session
            (id, session_key, created_time, build_number)
            VALUES
            (NULL, ${id}, '${testStartTime}', ${env.buildNumber})`);
        }
    }

    async insertTest(sessionId, testName, status, projectName, testStartTime, testEndTime){
        const session_Id = await this.getSessionId(sessionId);
        const stateId = await this.getStateId(status.toUpperCase());
        const projectId = await this.getProjectId(projectName);
        Logger.info(stateId[0].id + " this is the id.")
        return DbUtils.query(`
            INSERT INTO test 
            (id, name, status_id, method_name, project_id, session_id, start_time, end_time, env, browser, author_id)
            VALUES 
            (NULL, '${testName}', ${stateId[0].id}, '${env.testMethodName}', ${projectId[0].id}, ${session_Id[0].id}, '${testStartTime}', '${testEndTime}', '${env.envName}', '${env.browser}', NULL)`
        );   
    }

    async insertLog(testName){
        const testId = await this.getTestId(testName);
        const logs = FileUtils.readFile(process.cwd() + '/logs/logs.txt');
        return DbUtils.query(`INSERT INTO log
            (id, content, is_exception, test_id)
            VALUES
            (Null, '${logs}', 0, ${testId[0]['id']})`
        );
    }

    async insertAuthor(authorCredensials){
        let result = await this.getAuthorIdByName(authorCredensials.authorName);
        if(result.length === 0){
            return DbUtils.query(`INSERT INTO author
            (id, name, login, email)
            VALUES
            (Null, '${authorCredensials.authorName}', '${authorCredensials.authorLogin}', '${authorCredensials.authorEmail}')`
        )};
    }

    async updateTestProjectIdAuthorIdWithId(data){
        let result = await this.getTestIdById(data.testId);
        if(result.length === 1){
            return dbUtils.query(`UPDATE test
            SET
            project_id = ${data.projectId[0].id}, author_id = ${data.authorId[0].id}
            WHERE test.id = ${data.testId}`
        )};
    }

    async deleteTestById(id){
        return dbUtils.query(`DELETE FROM test 
        WHERE 
        test.id = ${id}`);
    }
}