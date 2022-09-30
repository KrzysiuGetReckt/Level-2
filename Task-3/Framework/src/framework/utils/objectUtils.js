module.exports = class ObjectUtils{
    /**
    * Checks if an object is empty or not
    * @param {object} object that is empty or not
    * @returns True or False 
    */
    static isEmpty(object) {
        return Object.keys(object).length === 0;
    }
}