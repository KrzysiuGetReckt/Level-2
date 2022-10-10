module.exports = class dateUtils{
    static currentDate(){
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}