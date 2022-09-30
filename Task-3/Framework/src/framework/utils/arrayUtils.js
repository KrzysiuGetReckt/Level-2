const GeneratorUtils = require("./generatorUtils");

module.exports = class ArrayUtils{
    /**
    * Generate a random string with characters of set lenght
    * @param {number} number the lenght of the string
    * @returns {string} result the generated string
    */
    static removeExactItem(array , item){
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
        let pickedItems = [];
        for(let i = 0; i < number; i++){
            let pickedItem = GeneratorUtils.pickOneFromArray(array);
            array = this.removeExactItem(array, pickedItem);
            pickedItems.push(pickedItem);
        }
        return pickedItems;
    }
    /**
    * Changes an array of string numbers to array with proper numbers
    * @param {array} array with the string numbers
    * @returns {array} array with numbers 
    */
    static stringNumbersToNumbers(array){
        return array.map(str => {return Number(str)});
    }
    /**
    * Checks if the array has ascending numbers in it
    * @param {array} array with the string numbers
    * @returns {boolean} returns true or false. 
    */
    static isAscending(array) {
        return array.every(function (x, i) {
            return i === 0 || x >= array[i - 1];
        });
    }
}