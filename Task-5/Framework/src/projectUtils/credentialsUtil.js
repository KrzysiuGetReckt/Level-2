const { ENVIRONMENT } = require('../environment/envConfig');
const env = require(`../environment/${ENVIRONMENT}Environment`); 
const { GeneratorUtils } = require("../framework/utils");


module.exports = class CredentialsUtil{
    static generateAuthorName(){
        return GeneratorUtils.generateLetters(1, true)+GeneratorUtils.generateLetters(env.generationSettings.lenght, false);
    }
    static generateAuthorLogin(){
        return GeneratorUtils.generateString(env.generationSettings.lenght);
    }
    static generateEmail(){
        return `${GeneratorUtils.generateLetters(env.generationSettings.lenght)}@gmail.com`;
    }
}