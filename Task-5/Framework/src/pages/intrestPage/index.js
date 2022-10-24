const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');
const ElementStateProvider = require('../../framework/element/elementStateProvider');


class HomePage extends BaseForm {

  constructor() {
    super('.avatar-and-interests-page', 'Intrest page of User Inyerface');
  }

  get downloadImageButton() { return new Element(
                              '//button[@name="button" and contains(text(), "Download image")]' ,
                              '"Download Image" button'); }                          
  get intrestErrorLi()      {return new Element(
                            '//li[@class="avatar-and-interests__error" and contains(text(), "Please choose 3 interests.")]',
                            '"Choose intrest Error" li'); }
  get uploadErrorLi()      {return new Element(
                            '//li[@class="avatar-and-interests__error" and contains(text(), "Please upload a picture")]',
                            '"Upload Error" li'); }
  
  get unselectAllCheckbox() {return new Element('//label[@for="interest_unselectall"]', '"Unselect all" checkbox'); }
  get nextButton() {return new Element('//button[@name="button" and contains(text(), "Next")]' ,'"Next" button'); }

  randomIntrest = (intrest) => {
    return new Element(`//label[@for="interest_${intrest}"]//span`, `"${intrest}" checkbox`);
  }

  async resetIntrests(){
    return this.unselectAllCheckbox.click();
  }
  async clickIntrest(intrest){
    return this.randomIntrest(intrest).click();
  }
  async clickNext(){
    return this.nextButton.click();
  }
  async checkIfIntrestErrorIsDisplayed(){
    return this.intrestErrorLi.state().isExisting();
  }
  async checkIfUploadErrorIsDisplayed(){
    return this.uploadErrorLi.state().isExisting();
  }
}

module.exports = new HomePage();
