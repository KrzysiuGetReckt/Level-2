const { expect } = require('chai');

const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`);
const { intrestPage, homePage, loginPage } = require('../../pages');
const userInformation = require('../../testData/userInformation');
const { GeneratorUtils, DbUtils, DateUtils, ArrayUtils} = require('../../framework/utils');
const login = require('../steps/login');
const HelpForm = require('../../forms/helpForm');
const CookieForm = require('../../forms/cookieForm');
const ProjectDbUtil = require('../../projectUtils/projectDbUtil');

const testStartTime = DateUtils.currentDate();
let testCaseStartTime = null;

describe('User Inyerface', async () => {
  before(async function(){
    await DbUtils.createConnection();
    await ProjectDbUtil.insertProject(env.projectName);
    await ProjectDbUtil.insertSessionId(testStartTime, env.sessionId);
  });
  beforeEach(async function(){
    testCaseStartTime = DateUtils.currentDate();
    await browser.url(env.startUrl);
  });

  it('Test case 1 - Check if properly picked 3 random intrest', async () => {
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
    await login.loginNext(loginCredentials);
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
  it('Test Case 2 - check if Help Form is hidden', async () => {
    await homePage.waitForFormIsOpened();
    await homePage.clickHere();
    await loginPage.waitForFormIsOpened();
    await HelpForm.clickSendToBottom();
    expect(await HelpForm.checkIfHelpFormIsHidden()).to.be.true;
  });
  it('Test Case 3 - check if Cookie form is closed', async () => {
    await homePage.waitForFormIsOpened();
    await homePage.clickHere();
    await loginPage.waitForFormIsOpened();
    await CookieForm.waitTillCookiesAreDisplayed();
    await CookieForm.clickNoNotReallyNo();
    expect(await CookieForm.checkIfCookiesExist()).to.be.false;
  });
  it('Test Case 4 - Validate that the timer starts at 00:00', async () => {
    await homePage.waitForFormIsOpened();
    await homePage.clickHere();
    await loginPage.waitForFormIsOpened();
    expect(await loginPage.getTimerTime()).to.be.equal(userInformation.expected.timer);
  });

  afterEach(async function(){
    await ProjectDbUtil.insertTest(env.sessionId, await this.currentTest.title, await this.currentTest.state, env.projectName, testStartTime,
                                  await DateUtils.currentDate());
    await ProjectDbUtil.insertLog(await this.currentTest.title);
    
  });

  after(async function () {
    await DbUtils.endConnection();
  });
})