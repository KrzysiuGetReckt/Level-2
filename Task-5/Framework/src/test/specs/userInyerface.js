const { expect } = require('chai');

const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 
const credensialsEnviroment = require('../../environment/credensialsEnviroment');
const { IntrestPage, HomePage, LoginPage } = require('../../pages');
const { GeneratorUtils, DatabaseUtils, DateUtils, ArrayUtils, FileUtils} = require('../../framework/utils');
const { insertSessionId, getProjectId, insertProject,
        getStateId, getSessionId, insertTest, getTestIdByName,
        insertLog } = require('../testData/queries')
const { Login } = require('../steps');
const HelpForm = require('../../forms/helpForm');
const CookieForm = require('../../forms/cookieForm');
const TestUtil = require('../../projectUtils/testUtil');

const testStartTime = DateUtils.currentDate();
const db = new DatabaseUtils;

describe('User Inyerface', async () => {
  before(async function(){
    await db.createConnection(credensialsEnviroment);
    await db.query(insertSessionId(await DateUtils.currentDate(), await browser.sessionId));
    const result = await db.query(getProjectId(env.projectName));
    if(Object.keys(result[0]).length == false){
        await db.query(insertProject(env.projectName));
    }
  });
  beforeEach(async function(){
    await browser.url(env.startUrl);
  });
  it('Test case 1 - Check if properly picked 3 random intrest', async () => {
    const loginCredentials = {
      email : GeneratorUtils.generateString(env.generationSettings.lenght),
      password :  GeneratorUtils.generateLetters(1, true) + 
                  GeneratorUtils.generateNumbersString(1) +
                  GeneratorUtils.generateString(env.generationSettings.lenght),
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

    const pickOutIntrests = await ArrayUtils.selectNumberOfItems(env.generationSettings.intrests, 3);
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
    const state = await this.currentTest.state;
    const statusId = await db.query(getStateId(await state.toUpperCase()));
    const projectId = await db.query(getProjectId(await env.projectName));
    const sessionId = await db.query(getSessionId(await browser.sessionId));

    await db.query(insertTest(TestUtil.saveTest(this.currentTest.title, statusId, projectId, sessionId, testStartTime)));

    const testId = await db.query(getTestIdByName(this.currentTest.title));
    const logs = await FileUtils.readFile(process.cwd() + '/logs/logs.txt');
    await db.query(insertLog(testId[0][0].id, logs));
  });

  after(async function () {
    await db.endConnection();
  });
})