const unirest = require('unirest');
const Logger = require('../framework/logger');

module.exports = class apiUtil{
    static postTypeSendUserIdBodyTitle(url , userId, body, title){
        Logger.info(`Sending Post request at: ${url}, userId: ${userId}, body: ${body}, title: ${title}`);
        return unirest.post(url).send({
            userId: userId,
            body: body,
            title: title
        });
    }
};