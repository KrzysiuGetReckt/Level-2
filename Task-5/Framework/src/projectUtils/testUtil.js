const { DateUtils } = require("../framework/utils");

module.exports = class TestUtil{
    static saveTest(name, statusId, projectId, sessionId, testStartTime){
        return {
            name: name,
            statusId: statusId,
            //test method is provided by env.
            projectId: projectId,
            sessionId: sessionId,
            testStartTime: testStartTime,
            testEndTime: DateUtils.currentDate(),
            //env is provided by env
            browser: browser.requestedCapabilities.browserName,
        }
    }
}