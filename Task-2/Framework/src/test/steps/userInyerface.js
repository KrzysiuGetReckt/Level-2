const { ENVIRONMENT } = require('../../environment/envConfig');
const homePage = require('../../pages/homePage');
const credentialsPage = require('../../pages/credentialsPage');
const env = require(`../../environment/${ENVIRONMENT}Environment`);
const userInformation = require('../../testData/userInformation');
const { intrestPage, cookiePage } = require('../../pages');
const GeneratorUtils = require('../../framework/utils/generatorUtils');
const ArrayUtils = require('../../framework/utils/arrayUtils');
const { expect } = require('chai');
const helpFormPage = require('../../pages/helpFormPage');

describe('User Inyerface', async () => {
  
  it('Test Case 1', async () => {
    const email = GeneratorUtils.generateString(userInformation.generationSettings.Lenght);
    const password =  GeneratorUtils.generateOneCapitalLetter() + 
                      GeneratorUtils.generateOneNumberString() +
                      email;
    const mailServer = GeneratorUtils.generateString(userInformation.generationSettings.Lenght);
    const domains = [ '.org' , '.co.uk' , '.net' , '.gov' , '.de' , '.fr' , '.nl' , '.com' , '.be' , '.jpg'];
    const domain = GeneratorUtils.pickOneFromArray(domains);
    let intrests = ['ponies', 'polo', 'dough', 'snails', 'balls', 'postits',
                      'faucets', 'enveloppes', 'cables', 'questions', 'squares',
                      'purple', 'cotton', 'drywall', 'closets', 'tires', 'windows',
                      'mullets', 'cinnamon'];

    await browser.url(env.startUrl);
    await homePage.waitForFormIsOpened();
    await homePage.clickHere();
    await credentialsPage.waitForFormIsOpened(); //the 1 / 4 card is open.
    await credentialsPage.typePassword(password);
    await credentialsPage.typeEmail(email);
    await credentialsPage.typeDomain(mailServer);
    await credentialsPage.clickAddressDropdown();
    await credentialsPage.searchAdress(domain); 
    await credentialsPage.chooseAddress(domain);
    await credentialsPage.clickTermsandConditions();
    await credentialsPage.clickNext();
    await intrestPage.waitForFormIsOpened(); // the 2 / 4 card is open.
    await intrestPage.resetIntrests();
    for(let i = 0; i < 3; i++){
      let  pickedIntrest = await GeneratorUtils.pickOneFromArray(intrests);
      await intrestPage.clickIntrest(pickedIntrest);
      intrests = await ArrayUtils.removeExactItem(intrests, pickedIntrest);
    }
    await intrestPage.clickNext();
    expect(await intrestPage.checkIfIntrestErrorIsDisplayed()).to.be.false;

  });
  it('Test Case 2', async () => {
    await browser.url(env.startUrl);
    await homePage.waitForFormIsOpened();
    await homePage.clickHere();
    await credentialsPage.waitForFormIsOpened();
    await helpFormPage.clickSendToBottom();
    expect(await helpFormPage.checkIfHelpFormIsHidden()).to.be.true;
  });
  it('Test Case 3', async () => {
    await browser.url(env.startUrl);
    await homePage.waitForFormIsOpened();
    await homePage.clickHere();
    await credentialsPage.waitForFormIsOpened();
    await cookiePage.waitTillCookiesAreDisplayed();
    await cookiePage.clickNoNotReallyNo();
    expect(await cookiePage.checkIfCookiesExist()).to.be.false;
  });
  it('Test Case 4', async () => {
    await browser.url(env.startUrl);
    await homePage.waitForFormIsOpened();
    await homePage.clickHere();
    await credentialsPage.waitForFormIsOpened();
    expect(await credentialsPage.getTimerTime()).to.be.equal("00:00:00");
  });
})