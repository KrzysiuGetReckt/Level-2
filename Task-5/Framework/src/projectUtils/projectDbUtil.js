const Logger = require(`../framework/logger`);
const dbUtils = require(`../framework/utils/dbUtils`);
const { ENVIRONMENT } = require(`../environment/envConfig`);
const env = require(`../environment/testEnvironment`);
const fileUtil = require("../framework/utils/fileUtils");

module.exports = new class projectDbUtil {
    async selectAllProjects(){
        return dbUtils.query(`SELECT * FROM project`);
    }

    async getProjectId(){
        return dbUtils.query(`SELECT id FROM project WHERE name LIKE '${env.projectName}'`);
    }

    async getSessionId(){
        return dbUtils.query(`SELECT id FROM session WHERE session_key LIKE '${env.sessionId}'`);
    }

    async getTestId(testName){
        return dbUtils.query(`SELECT id FROM test WHERE name LIKE '${testName}'`);
    }
    
    async getStateId(state){
        return dbUtils.query(`SELECT id FROM status WHERE name LIKE '${state}'`)
    }

    async insertProject(){
        let result = await this.getProjectId();
        if(result.length === 0){
            return dbUtils.query(`INSERT INTO project
            (id, name)
            VALUES
            (Null, '${env.projectName}')`);
        }
    }

    async insertSessionId(testStartTime){
        let result = await this.getSessionId();
        if(result.length === 0){
            return dbUtils.query(`INSERT INTO session
            (id, session_key, created_time, build_number)
            VALUES
            (NULL, '${env.sessionId}', ${testStartTime}, '${env.buildNumber}')`);
        }
    }

    async insertTest(testName, status, testStartTime, testEndTime){
        let result = await this.getTestId();
        if(result.length === 0){
            const projectId = await this.getProjectId();
            const sessionId = await this.getSessionId();
            const stateId = await this.getStateId(status.toUpperCase());
            return dbUtils.query(`
            INSERT INTO test 
            (id, name, status_id, method_name, project_id, session_id, start_time, end_time, env, browser, author_id)
            VALUES 
            (NULL, '${testName}', ${stateId[0]['id']}, '${env.testMethodName}', ${projectId[0]['id']}, ${sessionId[0]['id']}, '${testStartTime}', '${testEndTime}', '${env.envName}', '${env.browser}', NULL)`
            );   
        }
    }

    async insertLog(testName){
        const testId = await this.getTestId(testName);
        const logs = fileUtil.readFile(process.cwd() + '/logs/logs.txt');
        return dbUtils.query(`INSERT INTO log
        (id, content, is_exception, test_id)
        VALUES
        (Null, '${logs}', 0, ${testId[0]['id']})`);
    }
}