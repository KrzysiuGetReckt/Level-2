const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');

class LoginPage extends BaseForm {

  constructor() {
    super('.login-form-with-pw-check', 'Credentials page of User Inyerface');
  }

  inputContainsPlaceholder = (placeHolderName) => {return `//input[contains(@placeholder, "${placeHolderName}")]`; }

  get timerDiv() {return new Element('.timer', '"Time" div')}
  get passwordInput() {return new Element(this.inputContainsPlaceholder('Choose Password'), '"Password" input')};
  get emailInput() {return new Element(this.inputContainsPlaceholder('Your email'), '"Your Email" input'); }
  get domainInput() {return new Element(this.inputContainsPlaceholder('Domain'), '"Domain" input'); }
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
  async chooseAddress(domain){
    await this.addressList(domain).scrollIntoView();
    return this.addressList(domain).click();
  }
  async clickTermsAndConditions(){
    return this.termsAndConditionsChekbox.click();
  }
  async clickNext(){
    return this.nextLink.click();
  }


}

module.exports = new LoginPage();
