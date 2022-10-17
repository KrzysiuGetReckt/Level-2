module.exports = class DateUtils{
    /**
    * Creates a date that is proper for SQL databases
    * @returns {string} result of gathering the current date.
    */
    static currentDate(){
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}