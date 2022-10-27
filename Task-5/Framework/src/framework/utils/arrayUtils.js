const Logger = require("../logger");
const GeneratorUtils = require("./generatorUtils");

module.exports = class ArrayUtils{
    /**
    * Removing an exact item form an array
    * @param {array} array The array of items
    * @param {number} item the index of the item
    * @returns {array} the new array 
    */
    static removeExactItem(array , item){
        Logger.info(`Removing exact item.`);
        let index = array.indexOf(item);
        if(index !== -1){
            array.splice(index, 1);
        }
        return array;
    }
    /**
    * Pick out an exact number of items from array without duplications
    * and return them as an array
    * @param {array} array the array from where we pick out items
    * @param {number} number the number of items needed
    * @returns {string} result the generated string
    */
    static selectNumberOfItems(array, number){
        Logger.info('Selecting items from the array.')
        let pickedItems = [];
        for(let i = 0; i < number; i++){
            let pickedItem = GeneratorUtils.pickOneFromArray(array);
            array = this.removeExactItem(array, pickedItem);
            pickedItems.push(pickedItem);
        }
        return pickedItems;
    }
}