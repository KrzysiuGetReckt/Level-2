const { GeneratorUtils } = require("../framework/utils");
const { TestSettings } = require('../test/testData');


module.exports = class CredentialsUtil{
    static generateAuthorName(){
        return GeneratorUtils.generateLetters(1, true)+GeneratorUtils.generateLetters(TestSettings.generationSettings.lenght, false);
    }
    static generateAuthorLogin(){
        return GeneratorUtils.generateString(TestSettings.generationSettings.lenght);
    }
    static generateEmail(email = '@gmail.com'){
        return `${GeneratorUtils.generateLetters(TestSettings.generationSettings.lenght)}${email}`;
    }
}