const { loginPage } = require("../../pages");

class LoginSteps {
    async login(loginObject){
        await loginPage.typePassword(loginObject.password);
        await loginPage.typeEmail(loginObject.email);
        await loginPage.typeDomain(loginObject.mailServer);
        await loginPage.clickAddressDropdown();
        await loginPage.chooseAddress(loginObject.domain);
        await loginPage.clickTermsAndConditions();
    }
}

module.exports = new LoginSteps();