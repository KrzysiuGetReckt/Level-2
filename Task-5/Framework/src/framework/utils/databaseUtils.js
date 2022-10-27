const mysql = require('mysql2/promise');
const Logger = require('../logger');

module.exports = class DatabaseUtils{
    
    _connection = null; 

    constructor(){
    }

    /**
    * Checks if there is an established connection.
    * If there is none the .ping() creates a error that is immiedietly catched.
    * So if the connection is created it returns true and if there is an error it returns false.
    */

    async _isConnectionCreated(){
        try {
            Logger.info('Checking the connection');
            this._connection.ping();
            return true;
        } catch (error) {
            Logger.info('Connection is not created');
            return false;
        }
    }
    

    /**
    * This checks if there is an established connection.
    * If there is none. It throws an error stopping the program. 
    */

    async isConnectionEstablished(){
        if(!await this._isConnectionCreated()){
            throw new Error('The connection is not established');
        }
    }

    /**
    * This checks if there is NO established connection.
    * If there is none. It throws an error stopping the program. 
    */

    async isConnectionNotEstablished(){
        if(await this._isConnectionCreated()){
            throw new Error('The connection is established');
        }
    }

    /**
    * Creates a Db connection and then return it or returns the existing one.
    * The if block is run if there is no existing connection.
    * In it we set up the connection parameters and establish the connection. 
    */

    async createConnection(dbConfig) {
        try {
            Logger.info('Creating the connection');
            if(await this._isConnectionCreated() === false){
                this._connection = await mysql.createConnection(dbConfig);
            }
            this.isConnectionEstablished();
            return this._connection;
        } catch (err) {
            Logger.info('The connections was not created')
            throw err;
        }
    }

    /**
    * Ends the connection if there was one created.
    */

    async endConnection() {
        try{
            Logger.info('Ending the connection to the database');
            await this._connection.end();
            this.isConnectionNotEstablished();
        }catch(err){
            Logger.info('The connection was not ended');
            throw err;
        }
    }

    /**
    * Sends a querry to the DB with the preestablished connection
    * If there is no connection we recreate it
    * @param {string} queryString the querry that is send to the DB
    * @returns {object} rows the generated rows from the DB
    */

    async query(queryString){
        try{
            await this.isConnectionEstablished();
            Logger.info(`Executing query to Database.`);
            const [rows, fields] = await this._connection.execute(queryString);
            return [rows, fields];
        }catch(err){
            Logger.info('The querry was not executed');
            throw err;
        }
    }
}