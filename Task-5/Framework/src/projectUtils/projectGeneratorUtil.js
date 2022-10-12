const Logger = require('../framework/logger');
const { GeneratorUtils } = require('../framework/utils')
module.exports = class ProjectGeneratorUtil{
    static randomDoubleNumber(){
        let number = GeneratorUtils.generateNumber(0,3) * 100 + GeneratorUtils.generateNumber(1, 9) * 11;
        if(number > 360){
            number = GeneratorUtils.generateNumber(0,3) * 100 + GeneratorUtils.generateNumber(1, 9) * 11;
        }
        return number;
    }
}