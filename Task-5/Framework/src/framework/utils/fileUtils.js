const fs = require('fs');
const path = require('path');
const process = require('process');

const Logger = require('../logger');

module.exports = class fileUtil{
    /**
    * Reads and returns the contents of a file
    * @param {string} path the relative path to the file
    * @returns {object} the read contents of the file.
    */
    static readFile(path){
        Logger.info(process.cwd());
        return fs.readFileSync(path, 'utf8')
    }
}