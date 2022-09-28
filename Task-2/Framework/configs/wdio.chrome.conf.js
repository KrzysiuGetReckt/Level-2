const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        maxInstances: 3,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
          args: ['--incognito', '--no-sandbox', '--disable-dev-shm-usage']//, '--headless']
        }
      },
    ],
    services: ['chromedriver'], // chromedriver
  }
};