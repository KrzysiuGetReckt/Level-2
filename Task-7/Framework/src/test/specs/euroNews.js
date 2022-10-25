const { expect } = require('chai');

const { ENVIRONMENT} = require('../../environment/envConfig');
const { EMAIL, TOKEN } = require('../../environment/credensialsEnviroment');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 
const { HomePage, NewsLetterPage, ConfirmationPage, PreviewPage, NewsletterUnsubscriptionPage } = require('../../pages');
const { ApiUtils, GeneratorUtils, DecodeUtils } = require('../../framework/utils');
const { NewsLetterForm, CompleateSubscription } = require('../../forms');
const { ApiRequests, ApiStatusCodes, TestData} = require('../testData');
const { ProjectApiUtils, CherioUtils } = require('../../projectUtils');

describe(`Testing Google Api with ${env.startUrl}`, async () => {
  beforeEach(async function(){
    await browser.url(env.startUrl);
  });
  it('Euronews Gmail API', async () => {
    await HomePage.waitForFormIsOpened();
    await HomePage.clickContiniueWithoutAgreeing();
    await HomePage.clickNewsletters();
    await NewsLetterPage.waitForFormIsOpened();
    let options = await NewsLetterPage.getNewsLetterOptionsAttribute();
    let pickedIndex = await GeneratorUtils.getRandomNumberExceptGivenOnes(Object.length(options), array);
    await NewsLetterPage.clickNewsLetterOption(options[pickedIndex]);
    await NewsLetterForm.waitForFormIsOpened();
    await NewsLetterForm.isFormOpened();
    await NewsLetterForm.setEmail(EMAIL);
    await NewsLetterForm.submitEmail();
    await CompleateSubscription.waitForFormIsOpened();
    await ProjectApiUtils.waitTillEmail();
    let response = await ApiUtils.get(ApiRequests.getSpecificMail.url('noreply@euronews.com'), ApiRequests.header(TOKEN)); //Getting the emails
    expect(response.status).to.equal(ApiStatusCodes.ok, 'The response code is not OK');
    response = await ApiUtils.get(ApiRequests.getContentMail.url(response.body.messages[0].id), ApiRequests.header(TOKEN)); //Getting the body of the exact email
    expect(response.status).to.equal(ApiStatusCodes.ok, 'The response code is not OK');
    const encodedMessage = response.body.payload["parts"][0].body.data;
    const decodedMessage = await DecodeUtils.encode(encodedMessage, 'base64', 'ascii'); //Decoding the body
    //Getting the href from the html document that is the decoded E-mail message
    //And going to that specific url
    await browser.url(await CherioUtils.getTagAttributeFromString(decodedMessage, 'a', 'href')); 
    await ConfirmationPage.isFormOpened();
    await ConfirmationPage.clickBackToSite();
    await HomePage.isFormOpened();
    await HomePage.clickNewsletters();
    const hrefAttribute = await NewsLetterPage.getNewsLetterAttribute(pickedNewsletter);
    await NewsLetterPage.clickNewsLetterPreview(pickedNewsletter);
    await PreviewPage.changeToIframe(hrefAttribute);
    await PreviewPage.waitForFormIsOpened();
    const url = await PreviewPage.getUnsubscribeUrl();
    await browser.url(url[0]);
    await NewsletterUnsubscriptionPage.waitForFormIsOpened();
    await NewsletterUnsubscriptionPage.setEmailText(EMAIL);
    await NewsletterUnsubscriptionPage.clickConfirmUnsubscription();
    await NewsletterUnsubscriptionPage.isUnsubscriptionMessageDisplayed(); //Checking if the text is displayed.
    expect(await ProjectApiUtils.checkEmailList()).to.equal(1);
  });
})