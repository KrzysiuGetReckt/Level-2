const { DateUtils } = require("../framework/utils");

module.exports = class TestUtil{
    static saveTest(name, statusId, projectId, sessionId, testStartTime){
        const testData = {
            name: name,
            statusId: statusId[0][0].id,
            //test method is provided by env.
            projectId: projectId[0][0].id,
            sessionId: sessionId[0][0].id,
            testStartTime: testStartTime,
            testEndTime: DateUtils.currentDate(),
            //env is provided by env
            browser: browser.requestedCapabilities.browserName,
        }
        return testData;
    }
}