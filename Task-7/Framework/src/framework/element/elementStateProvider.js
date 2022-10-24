const timeouts = require('../../environment/timeouts');
const Logger = require('../logger');

const elementState = {
  exist: 'exist',
  enabled: 'enabled',
  clickable: 'clickable',
  displayed: 'displayed'
};

module.exports = class ElementStateProvider {

  constructor(locator, name) {
    this.locator = locator;
    this.name = name;
  }

  async isExisting() {
    Logger.info(`Is element "${this.name}" existing`);
    return (await $(this.locator)).isExisting();
  }

  async isClickable() {
    Logger.info(`Is element "${this.name}" clickable`);
    return (await $(this.locator)).isClickable();
  }

  async isDisplayed() {
    Logger.info(`Is element "${this.name}" displayed`);
    return (await $(this.locator)).isDisplayed();
  }

  async isEnabled() {
    Logger.info(`Is element "${this.name}" enabled`);
    return (await $(this.locator)).isEnabled();
  }

  async waitForExist(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this.locator)).waitForExist(options);
    return this._waitFor(func, { timeout, interval, reverse }, elementState.exist);
  }

  async waitForEnabled(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this.locator)).waitForEnabled(options);
    return this._waitFor(func, { timeout, interval, reverse }, elementState.enabled);
  }

  async waitForDisplayed(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this.locator)).waitForDisplayed(options);
    return this._waitFor(func, { timeout, interval, reverse }, elementState.displayed);
  }

  async waitForDisappiar(timeout = timeouts.disappear, interval = timeouts.polling, reverse = true) {
    const func = async (options) => await (await $(this.locator)).waitForDisplayed(options);
    return this._waitFor(func, { timeout, interval, reverse }, elementState.displayed);
  }

  async waitForClickable(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this.locator)).waitForClickable(options);
    return this._waitFor(func, { timeout, interval, reverse }, elementState.clickable);
  }

  async assertIsExist(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this.locator)).waitForExist(options);
    return this._assertIs(func, { timeout, interval, reverse }, elementState.exist);
  }

  async assertIsEnabled(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this.locator)).waitForEnabled(options);
    return this._assertIs(func, { timeout, interval, reverse }, elementState.enabled);
  }

  async assertIsDisplayed(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this.locator)).waitForDisplayed(options);
    return this._assertIs(func, { timeout, interval, reverse }, elementState.displayed);
  }

  async assertIsClickable(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this.locator)).waitForClickable(options);
    return this._assertIs(func, { timeout, interval, reverse }, elementState.clickable);
  }

  async _waitFor(func, options, state) {
    state = options.reverse === false ? state : `not ${state}`;
    Logger.info(`Waiting (${options.timeout} ms) for element "${this.name}" is ${state}`);
    try {
      await func(options);
      return true;
    } catch {
      return false;
    }
  }

  async _assertIs(func, options, state) {
    state = options.reverse === false ? state : `not ${state}`;
    Logger.info(`Assertion that element "${this.name}" is ${state}`);
    options.timeoutMsg = `Element "${this.name}" was not in state "${state}". Locator: ${this.locator}`;
    return func(options);
  }
};