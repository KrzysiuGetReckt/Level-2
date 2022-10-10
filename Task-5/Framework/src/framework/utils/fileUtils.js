const fs = require('fs');
const path = require('path');
const process = require('process');

const Logger = require('../logger');

module.exports = class fileUtil{
    static readFile(path){
        Logger.info(process.cwd());
        return fs.readFileSync(path, 'utf8')
    }
}