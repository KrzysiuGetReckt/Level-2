module.exports = class GeneratorUtils{
    /**
    * Generate a random string with characters of set lenght
    * @param {number} number the lenght of the string
    * @returns {string} result the generated string
    */
    static generateString(number){
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < number; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    /**
    * Generate a random CapitalLetter
    * @returns {string} string with one capital Letter.
    */
    static generateOneCapitalLetter(){
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let charactersLength = characters.length;
        return characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    /**
    * Generate a random number to pick from an array
    * @param {array} array the array to pick from
    * @param {randomPick} generated random number of maximum lenght of the array.
    * @returns {array[randomPick]} array[randomPick] the array element that's randomly picked.
    */
    static pickOneFromArray(array){
        let randomPick = Math.floor(Math.random() * array.length);
        return array[randomPick];
    }
    /**
    * Generate one random number
    * @returns {string} string with one number.
    */
    static generateOneNumberString(){
        let characters = "0123456789";
        let charactersLength = characters.length;
        return characters.charAt(Math.floor(Math.random() * charactersLength));
    }
};