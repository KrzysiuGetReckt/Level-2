const { expect } = require('chai');
const cherio = require('cheerio');

const { ENVIRONMENT, TOKEN } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 
const { HomePage, NewsLetterPage, ConfirmationPage, PreviewPage, NewsletterUnsubscriptionPage } = require('../../pages');
const { ApiUtils, GeneratorUtils } = require('../../framework/utils');
const { NewsLetterForm, CompleateSubscription } = require('../../forms');
const { ApiRequests, TestData} = require('../testData');
const { TestSteps } = require('../steps');
const Timeouts = require('../../environment/timeouts');

describe(`Testing Google Api with ${env.startUrl}`, async () => {
  beforeEach(async function(){
    await browser.url(env.startUrl);
  });
  it('Euronews Gmail API', async () => {
    await HomePage.waitForFormIsOpened();
    await HomePage.clickContiniueWithoutAgreeing();
    await HomePage.clickNewsletters();
    await NewsLetterPage.waitForFormIsOpened();
    let options = await NewsLetterPage.getNewsLetterOptionsAttribute('for');
    options.pop();  // Deleting option 1 and last because they don't work on the Euronews site. 
    options.shift();
    const store = options[0]; // Deleting the third option as it doesn't work too...
    options.shift();
    options.shift();
    options.unshift(store);
    const pickedNewsletter = GeneratorUtils.pickOneFromObject(options);
    await NewsLetterPage.clickNewsLetterOption(pickedNewsletter);
    await NewsLetterForm.waitForFormIsOpened();
    await NewsLetterForm.isFormOpened();
    await NewsLetterForm.setEmail(TestData.email);
    await NewsLetterForm.submitEmail();
    await CompleateSubscription.waitForFormIsOpened();
    await browser.waitUntil(
      async () => (await TestSteps.checkEmailList()) != 0,
      {
          timeout: Timeouts.timeout,
          timeoutMsg: 'expected email not found after 50s',
          interval: Timeouts.interval,
      }
    );
    let response = await ApiUtils.get(ApiRequests.getSpecificMail.url('noreply@euronews.com'), ApiRequests.header(TOKEN)); //Getting the emails
    expect(response.status).to.equal(200, 'The response code is not OK');
    response = await ApiUtils.get(ApiRequests.getContentMail.url(response.body.messages[0].id), ApiRequests.header(TOKEN)); //Getting the body of the exact email.
    expect(response.status).to.equal(200, 'The response code is not OK');
    const encodedMessage = response.body.payload["parts"][0].body.data;
    const decodedMessage = await Buffer.from(encodedMessage, 'base64').toString('ascii'); //Decoding the body.
    let message = cherio.load(decodedMessage);
    message = message('a').attr('href');
    await browser.url(message);
    await ConfirmationPage.isFormOpened();
    await ConfirmationPage.clickBackToSite();
    await HomePage.isFormOpened();
    await HomePage.clickNewsletters();
    let attribute = await NewsLetterPage.getNewsLetterAAttribute(pickedNewsletter, 'href');
    await NewsLetterPage.clickNewsLetterPreview(pickedNewsletter);

    let newsletterOpened ={
      xpath: 'css selector',
      locator: `${attribute} > iframe`
    }
    const iframeLocator = await browser.findElement(newsletterOpened.xpath, newsletterOpened.locator);
    await browser.switchToFrame(iframeLocator);
    await PreviewPage.waitForFormIsOpened();
    attribute = await PreviewPage.GetUnsubscribeAttribute('href');
    await browser.url(attribute[0]);
    await NewsletterUnsubscriptionPage.waitForFormIsOpened();
    await NewsletterUnsubscriptionPage.setEmailText(TestData.email);
    await NewsletterUnsubscriptionPage.clickConfirmUnsubscription();
    await NewsletterUnsubscriptionPage.isUnsubscriptionMessageDisplayed(); //Checking if the text is displayed.
    expect(await TestSteps.checkEmailList()).to.equal(1);

  });
})