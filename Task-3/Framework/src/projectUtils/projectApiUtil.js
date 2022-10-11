const unirest = require('unirest');

const { ENVIRONMENT } = require('../environment/envConfig');
const Logger = require('../framework/logger');
const env = require(`../environment/${ENVIRONMENT}Environment`);
const apiUtil = require('../framework/utils/apiUtils');

module.exports = class ProjectApiUtil{
    static getPosts(){
        Logger.info(`Sending Get request at: ${env.apiUrl}/post`);
        return apiUtil.get(`${env.apiUrl}/posts`);
    }
    static getExactPost(id){
        Logger.info(`Sending Get request at: ${env.apiUrl}/post${id}`);
        return apiUtil.get(`${env.apiUrl}/posts/${id}`);
    }
    static getUsers(){
        Logger.info(`Sending Get request at: ${env.apiUrl}/users`);
        return apiUtil.get(`${env.apiUrl}/users`);
    }
    static getUsersId(id){
        Logger.info(`Sending Get request at: ${env.apiUrl}/users/${id}`);
        return apiUtil.get(`${env.apiUrl}/users/${id}`);
    }

    static postPostTypeSendUserIdBodyTitle(post){
        Logger.info(`Sending Post request at: ${env.apiUrl}/post, userId: ${post.userId}, body: ${post.body}, title: ${post.title}`);
        return apiUtil.post(`${env.apiUrl}/posts`).send({
            userId: post.userId,
            body: post.body,
            title: post.title
        });
    }
};