const { ENVIRONMENT } = require('../environment/envConfig');
const env = require(`../environment/${ENVIRONMENT}Environment`); 
const { GeneratorUtils } = require("../framework/utils");


module.exports = class CredentialsUtil{
    static generateAuthorName(){
        return GeneratorUtils.generateCapitalLetters(1)+GeneratorUtils.generateStringSmallLetters(env.generationSettings.lenght);
    }
    static generateAuthorLogin(){
        return GeneratorUtils.generateString(env.generationSettings.lenght);
    }
    static generateEmail(){
        return `${GeneratorUtils.generateString(env.generationSettings.lenght)}@gmail.com`;
    }
}