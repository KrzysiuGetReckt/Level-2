const { ENVIRONMENT } = require('../environment/envConfig');
const Logger = require('../framework/logger');
const env = require(`../environment/${ENVIRONMENT}Environment`);
const apiUtil = require('../framework/utils/apiUtils');

module.exports = class ProjectApiUtil{
    static async getPosts(){
        Logger.info(`Get /Post info`);
        let request = `${env.apiUrl}/posts`;
        return apiUtil.get(request);
    }
    static async getExactPost(id){
        Logger.info(`Get exact /Post with id:  ${id}`);
        let request = `${env.apiUrl}/posts/${id}`;
        return apiUtil.get(request);
    }
    static async getUsers(){
        Logger.info(`Get /Users info`);
        let request = `${env.apiUrl}/users`;
        return apiUtil.get(request);
    }
    static async getUsersId(id){
        Logger.info(`Get /Users with id: ${id}`);
        let request = `${env.apiUrl}/users/${id}`;
        return apiUtil.get(request);
    }

    static async postPost(post){
        Logger.info(`Sending Post request to /Posts with userId: ${post.userId}, body: ${post.body}, title: ${post.title}`);
        let request = `${env.apiUrl}/posts`;
        let header = {'Accept': 'application/json'};
        return apiUtil.post(request, header , { userId: post.userId, body: post.body, title: post.title},)
    };
    
};