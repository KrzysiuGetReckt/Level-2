const { expect } = require('chai');

const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`);
const { intrestPage } = require('../../pages');
const userInformation = require('../../testData/userInformation');
const GeneratorUtils = require('../../framework/utils/generatorUtils');
const ArrayUtils = require('../../framework/utils/arrayUtils');
const homePage = require('../../pages/homePage');
const loginPage = require('../../pages/loginPage');
const login = require('../steps/login');
const helpForm = require('../../forms/helpForm');
const cookieForm = require('../../forms/cookieForm');

describe('User Inyerface', async () => {
  beforeEach(async function(){
    await browser.url(env.startUrl);
  });

  it('Test Case 1', async () => {
    const loginCredentials = {
      email : GeneratorUtils.generateString(userInformation.generationSettings.Lenght),
      password :  GeneratorUtils.generateCapitalLetters(1) + 
                  GeneratorUtils.generateNumbersString(1) +
                  GeneratorUtils.generateNumbersString(userInformation.generationSettings.Lenght),
      mailServer : GeneratorUtils.generateString(userInformation.generationSettings.Lenght),
      domain : GeneratorUtils.pickOneFromArray(userInformation.generationSettings.domains)
    }
    await homePage.waitForFormIsOpened();
    await homePage.clickHere();
    await loginPage.waitForFormIsOpened(); //the 1 / 4 card is open.
    await login.login(loginCredentials);
    await loginPage.clickNext();
    await intrestPage.waitForFormIsOpened(); // the 2 / 4 card is open.
    await intrestPage.resetIntrests();

    let pickOutIntrests = await ArrayUtils.selectNumberOfItems(userInformation.generationSettings.intrests, 3);
    for (const pickOutIntrest of pickOutIntrests){
      await intrestPage.clickIntrest(pickOutIntrest);
    }
    await intrestPage.clickNext();
    expect(await intrestPage.checkIfUploadErrorIsDisplayed()).to.be.true;
    expect(await intrestPage.checkIfIntrestErrorIsDisplayed()).to.be.false;
  });
  it('Test Case 2', async () => {
    await homePage.waitForFormIsOpened();
    await homePage.clickHere();
    await loginPage.waitForFormIsOpened();
    await helpForm.clickSendToBottom();
    expect(await helpForm.checkIfHelpFormIsHidden()).to.be.true;
  });
  it('Test Case 3', async () => {
    await homePage.waitForFormIsOpened();
    await homePage.clickHere();
    await loginPage.waitForFormIsOpened();
    await cookieForm.waitTillCookiesAreDisplayed();
    await cookieForm.clickNoNotReallyNo();
    expect(await cookieForm.checkIfCookiesExist()).to.be.false;
  });
  it('Test Case 4', async () => {
    await homePage.waitForFormIsOpened();
    await homePage.clickHere();
    await loginPage.waitForFormIsOpened();
    expect(await loginPage.getTimerTime()).to.be.equal(userInformation.expected.timer);
  });
})