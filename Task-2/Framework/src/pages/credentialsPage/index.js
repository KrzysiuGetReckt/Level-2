const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');


class CredentialsPage extends BaseForm {

  constructor() {
    super('.login-form-with-pw-check', 'Credentials page of User Inyerface');
  }

  get timerDiv() {return new Element('.timer', '"Time" div')}
  get passwordInput() {return new Element('//input[contains(@placeholder, "Choose Password")]', '"Password" input'); }
  get emailInput() {return new Element('//input[contains(@placeholder, "Your email")]', '"Your Email" input'); }
  get domainInput() {return new Element('//input[contains(@placeholder, "Domain")]', '"Domain" input'); }
  get addressDropdown() {return new Element('.dropdown__field', '"Adress droptdown" inputList'); }
  addressList = (domain) => {
    return new Element('//div[contains(text(),"'
    + domain +
    '") and @class="dropdown__list-item"]', '"Domain adress" inputOption', 'inputOption');
  };                                    
  get termsAndConditionsChekbox() {return new Element('.checkbox__box', '"Terms & Conditions" checkbox'); }
  get nextLink() {return new Element('//a[contains(text(),"Next")]', '"Next" link'); } 


  async getTimerTime(){
    return this.timerDiv.getText();
  }
  async typePassword(text){
    return this.passwordInput.clearAndType(text);
  }
  async typeEmail(text){
    return this.emailInput.clearAndType(text);
  }
  async typeDomain(text){
    return this.domainInput.clearAndType(text);
  }
  async clickAddressDropdown(){
    return this.addressDropdown.click();
  }
  async searchAdress(domain){
    return this.addressList(domain).scrollIntoView();
  }
  async chooseAddress(domain){
    return this.addressList(domain).click();
  }
  async clickTermsandConditions(){
    return this.termsAndConditionsChekbox.click();
  }
  async clickNext(){
    return this.nextLink.click();
  }


}

module.exports = new CredentialsPage();
