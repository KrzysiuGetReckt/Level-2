module.exports = {
    header:
    (token) => ({Authorization: `Bearer ${token}`}), // The header with the token to the api.
    getMailList: {
        url:
        () => `https://www.googleapis.com/gmail/v1/users/me/messages`,
    },
    getSpecificMail: {
        url: 
        (search) => `https://www.googleapis.com/gmail/v1/users/me/messages?q=from:${search}`,
    }, // Gets the specific E-mail by the result of searching the Mail database.
    getContentMail: {
        url:
        (emailId) => `https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}`,
    } // Gets the content of the E-mail by using the Email id.
}