const { ENVIRONMENT } = require(`../environment/envConfig`);
const Logger = require("../framework/logger");
const env = require(`../environment/${ENVIRONMENT}Environment`);
const { FileUtils } = require("../framework/utils");

module.exports = class projectDbUtil {
    static async selectAllProjects(){
        return `SELECT * FROM project`;
    }
    static async getProjectId(projectName){
        return `SELECT id FROM project WHERE name LIKE '${projectName}'`;
    }
    static async getSessionId(id){
        return `SELECT id FROM session WHERE session_key LIKE '${id}'`;
    }
    static async getTestId(testName){
        return `SELECT id FROM test WHERE name LIKE '${testName}'`;
    }
    static async getTestIdById(testId){
        return `SELECT id FROM test WHERE id LIKE ${testId}`;
    }
    static async getTestIdByName(testName){
        return `SELECT id FROM test WHERE name LIKE '${testName}'`;
    }
    static async getTestProject(testId){
        return `SELECT project_id, author_id FROM test WHERE id LIKE ${testId}`;
    }
    static async getStateId(state){
        return `SELECT id FROM status WHERE name LIKE '${state}'`;
    }
    static async getAuthorIdByName(name){
        return `SELECT id FROM author WHERE name LIKE '${name}'`;
    }

    static async insertProject(projectName){
        return `INSERT INTO project
        (id, name)
        VALUES
        (Null, '${projectName}')`;
    }

    static async insertSessionId(testStartTime, sessionId){
        return `INSERT INTO session
        (id, session_key, created_time, build_number)
        VALUES
        (NULL, '${sessionId}', '${testStartTime}', ${env.buildNumber})`;   
    }

    static async insertTest(testData){
        return `
            INSERT INTO test 
            (id, name, status_id, method_name, project_id, session_id, start_time, end_time, env, browser, author_id)
            VALUES 
            (NULL, '${testData.name}', ${testData.statusId}, '${env.testMethodName}',
                    ${testData.projectId}, ${testData.sessionId}, '${testData.testStartTime}',
                    '${testData.testEndTime}', '${ENVIRONMENT}', '${testData.browser}', NULL)`;   
    }

    static async insertLog(testId){
        const logs = await FileUtils.readFile(process.cwd() + '/logs/logs.txt');
        return `INSERT INTO log
            (id, content, is_exception, test_id)
            VALUES
            (NULL, '${logs}', 0, ${testId})`;
    }

    static async insertAuthor(authorCredensials){
        return `INSERT INTO author
            (id, name, login, email)
            VALUES
            (NULL, '${authorCredensials.authorName}', '${authorCredensials.authorLogin}', '${authorCredensials.authorEmail}')`;
    }

    static async updateTest(data){
        return `UPDATE test
            SET
            project_id = ${data.projectId[0].id}, author_id = ${data.authorId[0].id}
            WHERE test.id = ${data.testId}`;
    }

    static async deleteTestById(id){
        return `DELETE FROM test 
        WHERE 
        test.id = ${id}`;
    }
}