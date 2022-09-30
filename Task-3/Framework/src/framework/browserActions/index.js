const Logger = require('../logger');

module.exports = async function () {

  await browser.overwriteCommand('url', async (origFunction, url) => {
    Logger.info(`Open url "${url}"`);
    await origFunction(url);
  });

  await browser.overwriteCommand('reloadSession', async (origFunction) => {
    Logger.info('Reload browser session');
    await origFunction();
  });

  await browser.overwriteCommand('refresh', async (origFunction) => {
    Logger.info('Refresh the current page');
    await origFunction();
  });

  await browser.addCommand('getCurrentUrl', function () {
    Logger.info('Get current url');
    return this.getUrl();
  });

  await browser.addCommand('swithToLastWindow', async function () {
    Logger.info('Switch to last window');
    const windows = await this.getWindowHandles();
    return this.switchToWindow(windows.pop());
  });
};