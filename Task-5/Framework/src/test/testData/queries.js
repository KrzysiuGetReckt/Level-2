const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 

module.exports = {
    getProjectId: 
    (projectName) => `SELECT id FROM project WHERE name LIKE '${projectName}'`,
    
    getProjectId: 
    (projectName) => `SELECT id FROM project WHERE name LIKE '${projectName}'`,

    getSessionId:
    (id) => `SELECT id FROM session WHERE session_key LIKE '${id}'`,

    getTestId:
    (testName) => `SELECT id FROM test WHERE name LIKE '${testName}'`,

    getTestIdById:
    (testId) => `SELECT id FROM test WHERE id LIKE ${testId}`,

    getTestIdByName:
    (testName) => `SELECT id FROM test WHERE name LIKE '${testName}'`,

    getTestProject:
    (testId) => `SELECT project_id, author_id FROM test WHERE id LIKE ${testId}`,

    getStateId: 
    (state) => `SELECT id FROM status WHERE name LIKE '${state}'`,

    getAuthorIdByName:
    (name) => `SELECT id FROM author WHERE name LIKE '${name}'`,

    insertAuthor: 
        (authorCredensials) => `INSERT INTO author
            (id, name, login, email)
            VALUES
            (NULL, '${authorCredensials.authorName}', '${authorCredensials.authorLogin}', '${authorCredensials.authorEmail}')`,
    
    insertProject:
    (projectName) => `INSERT INTO project
        (id, name)
        VALUES
        (Null, '${projectName}')`,

    insertSessionId:
    (testStartTime, sessionId) => `INSERT INTO session
        (id, session_key, created_time, build_number)
        VALUES
        (NULL, '${sessionId}', '${testStartTime}', ${env.buildNumber})`,

    insertTest:
    (testData) => `
    INSERT INTO test 
    (id, name, status_id, method_name, project_id, session_id, start_time, end_time, env, browser, author_id)
    VALUES 
    (NULL, '${testData.name}', ${testData.statusId}, '${env.testMethodName}',
            ${testData.projectId}, ${testData.sessionId}, '${testData.testStartTime}',
           '${testData.testEndTime}', '${ENVIRONMENT}', '${testData.browser}', NULL)`,
    
    insertLog: 
    (testId, logs) => `INSERT INTO log
        (id, content, is_exception, test_id)
        VALUES
        (NULL, '${logs}', 0, ${testId})`,

    insertAuthor:
    (authorCredensials) => `INSERT INTO author
        (id, name, login, email)
        VALUES
        (NULL, '${authorCredensials.authorName}', '${authorCredensials.authorLogin}', '${authorCredensials.authorEmail}')`,
    
    updateTest:
    (data) => `UPDATE test
        SET
        project_id = ${data.projectId}, author_id = ${data.authorId}
        WHERE test.id = ${data.testId}`,

    deleteTestById:
    (id) => `DELETE FROM test 
    WHERE 
    test.id = ${id}`,
}