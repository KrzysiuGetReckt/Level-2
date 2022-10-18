const { ENVIRONMENT } = require('../environment/envConfig');
const env = require(`../environment/${ENVIRONMENT}Environment`);
const { Logger } = require('../framework/');
const { ApiUtil } = require('../framework/utils');

const posts = '/posts';
const users = '/users';
const header = {'Accept': 'application/json'};

module.exports = class ProjectApiUtil{
    static async getPosts(){
        Logger.info(`Get ${posts} info`);
        return ApiUtil.get(`${env.apiUrl}${posts}`);
    }
    static async getExactPost(id){
        Logger.info(`Get exact ${posts} with id:  ${id}`);
        return ApiUtil.get(`${env.apiUrl}${posts}/${id}`);
    }
    static async getUsers(){
        Logger.info(`Get ${users} info`);
        return ApiUtil.get(`${env.apiUrl}${users}`);
    }
    static async getUsersById(id){
        Logger.info(`Get ${users} with id: ${id}`);
        return ApiUtil.get(`${env.apiUrl}${users}/${id}`);
    }

    static async postPost(post){
        Logger.info(`Sent data to ${posts} with userId: ${post.userId}, body: ${post.body}, title: ${post.title}`);
        return ApiUtil.post(`${env.apiUrl}${posts}`, header , { userId: post.userId, body: post.body, title: post.title},)
    };
    
};