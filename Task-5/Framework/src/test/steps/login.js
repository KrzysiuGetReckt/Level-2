const { LoginPage } = require("../../pages");

class LoginSteps {
    async loginNext(loginObject){
        await LoginPage.typePassword(loginObject.password);
        await LoginPage.typeEmail(loginObject.email);
        await LoginPage.typeDomain(loginObject.mailServer);
        await LoginPage.clickAddressDropdown();
        await LoginPage.chooseAddress(loginObject.domain);
        await LoginPage.clickTermsAndConditions();
    }
}

module.exports = new LoginSteps();