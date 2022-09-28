const timeouts = require('../../environment/timeouts');
const Element = require('../element');
const Logger = require('../logger');

module.exports = class BaseForm {

  constructor(locator, name) {
    this.locator = locator;
    this.name = name;
    this.form = new Element(this.locator, this.name);
  }

  getFormName = () => this.name;

  async isFormOpened() {
    const isOpened = await this.form.state().isExisting();
    Logger.info(`Form "${this.name}" is opened - "${isOpened}"`);
    return isOpened;
  }

  async waitForFormIsOpened() {
    Logger.info(`Waiting for form "${this.name}" to load`);
    const isOpened = await this.form.state().waitForExist(timeouts.pageLoadTime);
    Logger.info(`Form "${this.name}" is opened - "${isOpened}"`);
    return isOpened;
  }
};