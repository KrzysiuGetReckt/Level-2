module.exports = class ObjectUtils{
    /**
    * Checks if an object is empty or not
    * @param {object} object that is empty or not
    * @returns True or False 
    */
    static isEmpty(object) {
        return Object.keys(object).length === 0;
    }
    /**
    * Returns an array crated from object entries by the value
    * @param {object} object with entries
    * @param {string} valueToPickFrom the value that should be picked
    * @returns {array} array of entries.
    */
   static createArrayFromObjectByValue(object, valueToPickFrom){
        let array = [];
        for (const [key, value] of Object.entries(object)) {
            array.push(`${value[valueToPickFrom]}`);
        }
        return array;
   }
}