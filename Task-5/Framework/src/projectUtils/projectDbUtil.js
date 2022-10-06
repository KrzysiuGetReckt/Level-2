const Logger = require('../framework/logger');
const dbUtils = require('../framework/utils/dbUtils');
module.exports = new class projectDbUtil {
    async selectAllProjects(){
        return dbUtils.query('SELECT * FROM `project`');
    }
}