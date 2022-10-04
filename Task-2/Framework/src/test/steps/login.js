const { loginPage } = require("../../pages");

class LoginSteps {
    async login(password, email, mailServer, domain){
        await loginPage.typePassword(password);
        await loginPage.typeEmail(email);
        await loginPage.typeDomain(mailServer);
        await loginPage.clickAddressDropdown();
        await loginPage.chooseAddress(domain);
        await loginPage.clickTermsAndConditions();
    }
}

module.exports = new LoginSteps();