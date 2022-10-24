const Logger = require('../logger');
const ElementStateProvider = require('./elementStateProvider');

const maskedValue = '********';

module.exports = class Element {

  constructor(locator, name) {
    this.locator = locator;
    this.name = name;
  }

  state = () => new ElementStateProvider(this.locator, this.name);

  async click() {
    Logger.info(`Click at "${this.name}"`);
    await this.state().assertIsClickable();
    await (await $(this.locator)).click();
  }

  async clickByOffset(x, y) {
    Logger.info(`Click by offset {x: ${x}, y:${y}} at "${this.name}"`);
    await this.state().assertIsClickable();
    await (await $(this.locator)).click({x, y});
  }

  async getText() {
    Logger.info(`Get text from element "${this.name}"`);
    await this.state().assertIsExist();
    const text = await (await $(this.locator)).getText();
    Logger.info(`Received text "${text}"`);
    return text;
  }

  async getTextFromElements() {
    Logger.info(`Get text from elements "${this.name}"`);
    await this.state().assertIsExist();
    const elements = await (await $$(this.locator));
    return Promise.all(elements.map(async (el) => el.getText()));
  }

  async getAttributeFromElements(attribute) {
    Logger.info(`Get attribute "${attribute}" from elements "${this.name}"`);
    await this.state().assertIsExist();
    const elements = await (await $$(this.locator));
    return Promise.all(elements.map(async (el) => el.getAttribute(attribute)));
  }

  async type(value) {
    await this._setText(value, false);
  }

  async typeSecret(value) {
    await this._setText(value, true);
  }

  async clearAndType(value) {
    await this._clearAndSetText(value, false);
  }

  async clearAndTypeSecret(value) {
    await this._clearAndSetText(value, true);
  }

  async _setText(value, maskValueInLog) {
    Logger.info(`Type text "${maskValueInLog ? maskedValue : value}" into element "${this.name}"`);
    await this.state().assertIsExist();
    await (await $(this.locator)).setValue(value);
  }

  async _clearAndSetText(value, maskValueInLog) {
    Logger.info(`Clear and type text "${maskValueInLog ? maskedValue : value}" into element "${this.name}"`);
    await this.state().assertIsExist();
    const elem = await $(this.locator);
    await elem.clearValue();
    await elem.setValue(value);
  }

  async getPlaceholder() {
    Logger.info(`Get placeholder from element "${this.name}"`);
    await this.state().assertIsExist();
    const text = await (await $(this.locator)).getAttribute('placeholder');
    Logger.info(`Received placeholder "${text}"`);
    return text;
  }

  async getElementsCount() {
    Logger.info(`Get count of elements "${this.name}"`);
    await this.state().assertIsExist();
    const elements = await (await $$(this.locator));
    return elements.length;
  }

  async scrollIntoView() {
    Logger.info(`Scroll element "${this.name}" into viewport`);
    await this.state().assertIsExist();
    const elem = await (await $(this.locator));
    return elem.scrollIntoView();
  }
};