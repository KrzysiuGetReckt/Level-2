const { expect } = require('chai');

const { ENVIRONMENT} = require('../../environment/envConfig');
const { EMAIL, TOKEN } = require('../../environment/credensialsEnviroment');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 
const { HomePage, NewsLetterPage, ConfirmationPage, PreviewPage, NewsletterUnsubscriptionPage } = require('../../pages');
const { GeneratorUtils, DecodeUtils } = require('../../framework/utils');
const { NewsLetterForm, CompleateSubscription } = require('../../forms');
const { ApiStatusCodes, TestData} = require('../testData');
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
    const options = await NewsLetterPage.getNewsLetterOptionsAttribute();
    const pickedIndex = GeneratorUtils.getRandomNumberExceptGivenOnes(Object.keys(options).length, TestData.excludItems);
    await NewsLetterPage.clickNewsLetterOption(options[pickedIndex]);
    await NewsLetterForm.waitForFormIsOpened();
    await NewsLetterForm.isFormOpened();
    await NewsLetterForm.setEmail(EMAIL);
    await NewsLetterForm.submitEmail();
    await CompleateSubscription.waitForFormIsOpened();
    await ProjectApiUtils.waitTillEmail(TOKEN);
    const listOfEmails = await ProjectApiUtils.listOfEmails(TOKEN); //Getting the emails
    expect(listOfEmails.statusCode).to.equal(ApiStatusCodes.ok, 'The response code is not OK');
    const emailBodyText = await ProjectApiUtils.bodyOfEmail(TOKEN, listOfEmails.emailId); //Getting the body of the exact email
    expect(emailBodyText.statusCode).to.equal(ApiStatusCodes.ok, 'The response code is not OK');
    await browser.url(await CherioUtils.getLinkSubscriptionEmail(await DecodeUtils.encode(emailBodyText.bodyData, TestData.decodeFrom, TestData.encodeTo), TestData.htmlA, TestData.htmlHrefAttribute)); 
    await ConfirmationPage.isFormOpened();
    await ConfirmationPage.clickBackToSite();
    await HomePage.isFormOpened();
    await HomePage.clickNewsletters();
    const hrefAttribute = await NewsLetterPage.getNewsLetterAttribute(options[pickedIndex]);
    await NewsLetterPage.clickNewsLetterPreview(options[pickedIndex]);
    await PreviewPage.changeToIframe(hrefAttribute);  
    await PreviewPage.waitForFormIsOpened();
    await browser.url(await PreviewPage.getUnsubscribeUrl());
    await NewsletterUnsubscriptionPage.waitForFormIsOpened();
    await NewsletterUnsubscriptionPage.setEmailText(EMAIL);
    await NewsletterUnsubscriptionPage.clickConfirmUnsubscription();
    await NewsletterUnsubscriptionPage.isUnsubscriptionMessageDisplayed(); //Checking if the text is displayed.
    const emailList = await ProjectApiUtils.checkEmailList(TOKEN);
    expect(emailList.statusCode).to.equal(ApiStatusCodes.ok, 'The response code is not OK');
    expect(emailList.resultSize).to.equal(1);
  });
})