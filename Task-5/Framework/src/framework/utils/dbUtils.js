const mysql = require('mysql2/promise');
const credensials = require('../../environment/credensialsEnviroment');
const Logger = require('../logger');

module.exports = new class dbUtils{

    static #instance = null;
    
    #connection = null; 

    static getInstance() {
        if (!dbUtils.#instance)
        dbUtils.#instance = new dbUtils();
        return dbUtils.#instance;
    }

    async createConnection() {
        if(this.#connection === null){
            this.#connection = await mysql.createConnection({
                host: credensials.host,
                user: credensials.user,
                password: credensials.password,
                database: credensials.database
            });
        }
        return this.#connection;
    }

    async endConnection() {
        if(this.#connection){
            await this.#connection.end();
            this.#connection = null;
        }
    }

    async query(queryString){
        if(this.#connection === null){
            this.createConnection();
        }
        const [rows, fields] = await this.#connection.execute(queryString);
        return rows;
    }
}