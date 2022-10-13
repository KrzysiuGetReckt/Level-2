const { ENVIRONMENT } = require('../environment/envConfig');
const env = require(`../environment/${ENVIRONMENT}Environment`);
const Logger = require('../framework/logger');
const apiUtil = require('../framework/utils/apiUtils');

const posts = '/posts';
const users = '/users';
let header = {'Accept': 'application/json'};

module.exports = class ProjectApiUtil{
    static async getPosts(){
        Logger.info(`Get ${posts} info`);
        return apiUtil.get(`${env.apiUrl}${posts}`);
    }
    static async getExactPost(id){
        Logger.info(`Get exact ${posts} with id:  ${id}`);
        return apiUtil.get(`${env.apiUrl}${posts}/${id}`);
    }
    static async getUsers(){
        Logger.info(`Get ${users} info`);
        return apiUtil.get(`${env.apiUrl}${users}`);
    }
    static async getUsersById(id){
        Logger.info(`Get ${users} with id: ${id}`);
        return apiUtil.get(`${env.apiUrl}${users}/${id}`);
    }

    static async postPost(post){
        Logger.info(`Sent data to ${posts} with userId: ${post.userId}, body: ${post.body}, title: ${post.title}`);
        return apiUtil.post(`${env.apiUrl}${posts}`, header , { userId: post.userId, body: post.body, title: post.title},)
    };
    
};