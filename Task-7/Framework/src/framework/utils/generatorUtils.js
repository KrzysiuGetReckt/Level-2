const { Logger } = require('../../framework');

module.exports = class GeneratorUtils{
    /**
    * Generate a random string with characters of set lenght
    * @param {int} number the length of the string
    * @returns {string} result the generated string
    */
    static generateString(number){
        Logger.info('Generating a random string');
        let result           = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( let i = 0; i < number; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    /**
    * Generate a random string with letters of set lenght
    * @param {int} number the length of the string
    * @param {boolean} size - Default undefined not changing the behaviour of the method.
    * @returns {string} result the generated string
    */

    static generateLetters(number, size = undefined){
        Logger.info('Generating random string without numbers.')
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for ( let i = 0; i < number; i++){
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        if(size === true){
            return result.toUpperCase();
        }
        if(size === false){
            return result.toLowerCase();
        }
        return result;
    }
    /**
    * Generate random numbers as a string
    * @param {int} number the length of the string
    * @returns {string} string with one number.
    */
    static generateNumbersString(number){
        Logger.info('Generating random string of numbers');
        let result ='';
        const characters = '0123456789';
        for(let i=0; i < number; i++){
            result += characters.charAt(Math.floor(Math.random() * characters.length));
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
        Logger.info('Picking one random element form array');
        let randomPick = Math.floor(Math.random() * array.length);
        return array[randomPick];
    }
    /**
    * Generate a random number to pick the value fro an object
    * @param {object} object to pick from
    * @param {int} keys the number of keys present in the object.
    * @returns {object[int[int]]} object[keys[keys.length * Math.random() << 0]] the objects element that's randomly picked.
    */
    static pickOneFromObject(object){
        Logger.info('Picking one random value from an object');
        const keys = Object.keys(object);
        return object[keys[keys.length * Math.random() << 0]];
    }

    /**
    * Generating a number between the minimal value and the maximum.
    * @param {int} min the minimal value
    * @param {int} max the maximal value
    * @returns {int} the random number in the range <min, max>
    */
    static generateNumber(min, max){
        Logger.info(`Generating a number between ${min} and ${max}`);
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generate a random number expect the ones given.
     * @param {number} length of the number. 
     * @param {array} numbersNotToInclude an array of numbers that shouldn't be included in the random pick.
     * @returns the generated number with the exeption.
     */
    static getRandomNumberExceptGivenOnes(length, numbersNotToInclude) {
        Logger.info(`Generating a number of lenght ${length} and excluding ${JSON.stringify(numbersNotToInclude)}`);
        let num;
        while (!num || numbersNotToInclude.includes(num)) {
            num = Math.floor(Math.random() * length);
        }
        return num;
    }
};