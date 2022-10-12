const mysql = require('mysql2/promise');
const credensials = require('../../environment/credensialsEnviroment');

module.exports = new class DbUtils{

    /**
    * This is a DbUtils singleton.
    * Meaning that every time we call any function from here.
    * It reuses the inisial opened session to the database. 
    */

    static #instance = null;
    
    #connection = null; 

    static getInstance() {
        if (!dbUtils.#instance)
        dbUtils.#instance = new dbUtils();
        return dbUtils.#instance;
    }

    /**
    * Creates a Db connection and then return it or returns the existing one.
    * The if block is run if there is no existing connection.
    * In it we set up the connection parameters and establish the connection. 
    */

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

    /**
    * Ends the connection if there was one created.
    */

    async endConnection() {
        if(this.#connection){
            await this.#connection.end();
            this.#connection = null;
        }
    }

    /**
    * Sends a querry to the DB with the preestablished connection
    * If there is no connection we recreate it
    * @param {string} queryString the querry that is send to the DB
    * @returns {object} rows the generated rows from the DB
    */

    async query(queryString){
        if(this.#connection === null){
            this.createConnection();
        }
        const [rows, fields] = await this.#connection.execute(queryString);
        return rows;
    }
}