const { ENVIRONMENT } = require(`../environment/envConfig`);
const env = require(`../environment/testEnvironment`);
const { FileUtils, DbUtils } = require("../framework/utils");

module.exports = class projectDbUtil {
    static async selectAllProjects(){
        let query = `SELECT * FROM project`;
        return DbUtils.query(query);
    }
    static async getProjectId(projectName){
        let query = `SELECT id FROM project WHERE name LIKE '${projectName}'`
        return DbUtils.query(query);
    }
    static async getSessionId(id){
        let query = `SELECT id FROM session WHERE session_key LIKE '${id}'`
        return DbUtils.query(query);
    }
    static async getTestId(testName){
        let query = `SELECT id FROM test WHERE name LIKE '${testName}'`
        return DbUtils.query(query);
    }
    static async getTestIdById(testId){
        let query = `SELECT id FROM test WHERE id LIKE ${testId}`
        return DbUtils.query(query);
    }
    static async getTestProject(testId){
        let query = `SELECT project_id, author_id FROM test WHERE id LIKE ${testId}`
        return DbUtils.query(query);
    }
    static async getStateId(state){
        let query = `SELECT id FROM status WHERE name LIKE '${state}'`
        return DbUtils.query(query);
    }
    static async getAuthorIdByName(name){
        let query = `SELECT id FROM author WHERE name LIKE '${name}'`
        return DbUtils.query(query);
    }

    static async insertProject(projectName){
        let result = await this.getProjectId(projectName);
        if(result.length === 0){
            let query = `INSERT INTO project
            (id, name)
            VALUES
            (Null, '${projectName}')`
            return DbUtils.query(query);
        }
    }

    static async insertSessionId(testStartTime, id){
        let result = await this.getSessionId(id);
        if(result.length === 0){
            let query = `INSERT INTO session
            (id, session_key, created_time, build_number)
            VALUES
            (NULL, ${id}, '${testStartTime}', ${env.buildNumber})`
            return DbUtils.query(query);
        }
    }

    static async insertTest(sessionId, testName, status, projectName, testStartTime, testEndTime){
        const session_Id = await this.getSessionId(sessionId);
        const stateId = await this.getStateId(status.toUpperCase());
        const projectId = await this.getProjectId(projectName);
        let query = `
            INSERT INTO test 
            (id, name, status_id, method_name, project_id, session_id, start_time, end_time, env, browser, author_id)
            VALUES 
            (NULL, '${testName}', ${stateId[0].id}, '${env.testMethodName}', ${projectId[0].id}, ${session_Id[0].id}, '${testStartTime}', '${testEndTime}', '${env.envName}', '${env.browser}', NULL)`;
        return DbUtils.query(query);   
    }

    static async insertLog(testName){
        const testId = await this.getTestId(testName);
        const logs = FileUtils.readFile(process.cwd() + '/logs/logs.txt');
        let query = `INSERT INTO log
            (id, content, is_exception, test_id)
            VALUES
            (Null, '${logs}', 0, ${testId[0]['id']})`
        return DbUtils.query(query);
    }

    static async insertAuthor(authorCredensials){
        let result = await this.getAuthorIdByName(authorCredensials.authorName);
        if(result.length === 0){
            let query = `INSERT INTO author
            (id, name, login, email)
            VALUES
            (Null, '${authorCredensials.authorName}', '${authorCredensials.authorLogin}', '${authorCredensials.authorEmail}')`;
            return DbUtils.query(query)
        };
    }

    static async updateTest(data){
        let result = await this.getTestIdById(data.testId);
        if(result.length === 1){
            let query = `UPDATE test
            SET
            project_id = ${data.projectId[0].id}, author_id = ${data.authorId[0].id}
            WHERE test.id = ${data.testId}`;
            return DbUtils.query(query)
        };
    }

    static async deleteTestById(id){
        let query = `DELETE FROM test 
        WHERE 
        test.id = ${id}`;
        return DbUtils.query(query);
    }
}