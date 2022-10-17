const { expect } = require('chai');

const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 
const credensialsEnviroment = require('../../environment/credensialsEnviroment');
const { IntrestPage, HomePage, LoginPage } = require('../../pages');
const { GeneratorUtils, DatabaseUtils, DateUtils, ArrayUtils} = require('../../framework/utils');
const { Login } = require('../steps');
const HelpForm = require('../../forms/helpForm');
const CookieForm = require('../../forms/cookieForm');
const { ProjectDbUtil } = require('../../projectUtils');

const testStartTime = DateUtils.currentDate();
const db = new DatabaseUtils;

describe('User Inyerface', async () => {
  before(async function(){
    await db.createConnection(credensialsEnviroment);
    await db.query(await ProjectDbUtil.insertSessionId(await DateUtils.currentDate(), await browser.sessionId));
    let result = await db.query(await ProjectDbUtil.getProjectId(await env.projectName));
    if(result.length === 0){
      await db.query(await ProjectDbUtil.insertProject(env.projectName));
    }
  });
  beforeEach(async function(){
    await browser.url(env.startUrl);
  });
  it('Test case 1 - Check if properly picked 3 random intrest', async () => {
    const loginCredentials = {
      email : GeneratorUtils.generateString(env.generationSettings.lenght),
      password :  GeneratorUtils.generateCapitalLetters(1) + 
                  GeneratorUtils.generateNumbersString(1) +
                  GeneratorUtils.generateNumbersString(env.generationSettings.lenght),
      mailServer : GeneratorUtils.generateString(env.generationSettings.lenght),
      domain : GeneratorUtils.pickOneFromArray(env.generationSettings.domains)
    }
    await HomePage.waitForFormIsOpened();
    await HomePage.clickHere();
    await LoginPage.waitForFormIsOpened(); //the 1 / 4 card is open.
    await Login.loginNext(loginCredentials);
    await LoginPage.clickNext();
    await IntrestPage.waitForFormIsOpened(); // the 2 / 4 card is open.
    await IntrestPage.resetIntrests();

    let pickOutIntrests = await ArrayUtils.selectNumberOfItems(env.generationSettings.intrests, 3);
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
    expect(await LoginPage.getTimerTime()).to.be.equal(env.expected.timer);
  });

  afterEach(async function(){
    let state = await this.currentTest.state;
    let statusId = await db.query(await ProjectDbUtil.getStateId(await state.toUpperCase()));
    let projectId = await db.query(await ProjectDbUtil.getProjectId(await env.projectName));
    let sessionId = await db.query(await ProjectDbUtil.getSessionId(await browser.sessionId));

    const testData = {
      name: await this.currentTest.title,
      statusId: statusId[0].id,
      //test method is provided by env.
      projectId: projectId[0].id,
      sessionId: sessionId[0].id,
      testStartTime: testStartTime,
      testEndTime: await DateUtils.currentDate(),
      //env is provided by env
      browser: await browser.requestedCapabilities.browserName,
    }
    await db.query(await ProjectDbUtil.insertTest(testData));
    let testId = await db.query(await ProjectDbUtil.getTestIdByName(testData.name));
    await db.query(await ProjectDbUtil.insertLog(testId[0].id));
  });

  after(async function () {
    await db.endConnection();
  });
})