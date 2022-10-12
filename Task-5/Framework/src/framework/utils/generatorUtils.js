module.exports = class GeneratorUtils{
    /**
    * Generate a random string with characters of set lenght
    * @param {int} number the length of the string
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
    * Generate a random string of Capital Letters
    * @param {int} number the length of the string
    * @returns {string} result the generated string of capital letters.
    */
    static generateCapitalLetters(number){
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let charactersLength = characters.length;
        for(let i=0; i < number; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
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
    * Generate random numbers as a string
    * @param {int} number the length of the string
    * @returns {string} string with one number.
    */
    static generateNumbersString(number){
        let result ="";
        let characters = '0123456789';
        let charactersLength = characters.length;
        for(let i=0; i < number; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;   
    }

    /**
    * Generating a number between the minimal value and the maximum.
    * @param {int} min the minimal value
    * @param {int} max the maximal value
    * @returns {int} the random number in the range <min, max>
    */
    static generateNumber(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};