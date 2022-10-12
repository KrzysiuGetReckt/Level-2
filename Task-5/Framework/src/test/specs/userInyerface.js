const { expect } = require('chai');

const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`);
const { IntrestPage, HomePage, LoginPage } = require('../../pages');
const userInformation = require('../../testData/userInformation');
const { GeneratorUtils, DbUtils, DateUtils, ArrayUtils} = require('../../framework/utils');
const Login = require('../steps/login');
const HelpForm = require('../../forms/helpForm');
const CookieForm = require('../../forms/cookieForm');
const ProjectDbUtil = require('../../projectUtils/projectDbUtil');

const testStartTime = DateUtils.currentDate();

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
    await HomePage.waitForFormIsOpened();
    await HomePage.clickHere();
    await LoginPage.waitForFormIsOpened(); //the 1 / 4 card is open.
    await Login.loginNext(loginCredentials);
    await LoginPage.clickNext();
    await IntrestPage.waitForFormIsOpened(); // the 2 / 4 card is open.
    await IntrestPage.resetIntrests();

    let pickOutIntrests = await ArrayUtils.selectNumberOfItems(userInformation.generationSettings.intrests, 3);
    for (const pickOutIntrest of pickOutIntrests){
      await IntrestPage.clickIntrest(pickOutIntrest);
    }
    await IntrestPage.clickNext();
    expect(await IntrestPage.checkIfUploadErrorIsDisplayed()).to.be.true;
    expect(await IntrestPage.checkIfIntrestErrorIsDisplayed()).to.be.false;
  });
  it('Test Case 2 - check if Help Form is hidden', async () => {
    await HomePage.waitForFormIsOpened();
    await HomePage.clickHere();
    await LoginPage.waitForFormIsOpened();
    await HelpForm.clickSendToBottom();
    expect(await HelpForm.checkIfHelpFormIsHidden()).to.be.true;
  });
  it('Test Case 3 - check if Cookie form is closed', async () => {
    await HomePage.waitForFormIsOpened();
    await HomePage.clickHere();
    await LoginPage.waitForFormIsOpened();
    await CookieForm.waitTillCookiesAreDisplayed();
    await CookieForm.clickNoNotReallyNo();
    expect(await CookieForm.checkIfCookiesExist()).to.be.false;
  });
  it('Test Case 4 - Validate that the timer starts at 00:00', async () => {
    await HomePage.waitForFormIsOpened();
    await HomePage.clickHere();
    await LoginPage.waitForFormIsOpened();
    expect(await LoginPage.getTimerTime()).to.be.equal(userInformation.expected.timer);
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