const unirest = require('unirest');

const { ENVIRONMENT } = require('../environment/envConfig');
const Logger = require('../framework/logger');
const env = require(`../environment/${ENVIRONMENT}Environment`);
const apiUtil = require('../framework/utils/apiUtils');

module.exports = class projectApiUtil{
    static getPosts(){
        Logger.info(`Sending Get request at: ${env['api']}/post`);
        return unirest.get(`${env['api']}/posts`);
    }
    static getExactPost(id){
        Logger.info(`Sending Get request at: ${env['api']}/post${id}`);
        return unirest.get(`${env['api']}/posts/${id}`);
    }

    static postPostTypeSendUserIdBodyTitle(userId, body, title){
        Logger.info(`Sending Post request at: ${env['api']}/post, userId: ${userId}, body: ${body}, title: ${title}`);
        return apiUtil.post(`${env['api']}/posts`).send({
            userId: userId,
            body: body,
            title: title
        });
    }
};