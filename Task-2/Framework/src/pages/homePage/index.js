const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/element');
const Logger = require('../../framework/logger');


class HomePage extends BaseForm {

  constructor() {
    super('.start__button', 'Home page of User Inyerface');
  }

  get hereLinkButton() {return new Element('.start__link', '"Here" link'); }
  
  async clickHere(){
    return this.hereLinkButton.click();
  }
}

module.exports = new HomePage();
