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
   /**
    * Returns an true or false depending if the objects value is ascending or not.
    * @param {object} object with entries
    * @param {string} valueToPickFrom the value that should be picked
    * @returns {boolean} true or false.
    */
   static isObjectSortedByAscending(object, valueToPickFrom){
        for(let i = 1; i < object.length; i++){
            return object[i][valueToPickFrom] === 0 || object[i][valueToPickFrom] >= object[i - 1][valueToPickFrom];
        }
   }
}