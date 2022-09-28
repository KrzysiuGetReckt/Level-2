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
}