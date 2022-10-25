const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`); 

module.exports = {
    header:
    (token) => ({Authorization: `Bearer ${token}`}), // The header with the token to the api.
    getMailList: {
        url:
        () => `${env.apiBeggining}/users/me/messages`,
    },
    getSpecificMail: {
        url: 
        (search) => `${env.apiBeggining}/users/me/messages?q=from:${search}`,
    }, // Gets the specific E-mail by the result of searching the Mail database.
    getContentMail: {
        url:
        (emailId) => `${env.apiBeggining}/users/me/messages/${emailId}`,
    } // Gets the content of the E-mail by using the Email id.
}