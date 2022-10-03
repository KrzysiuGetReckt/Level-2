module.exports = class JsonUtils{
    /**
    * Checks if item is a valid json.
    * @param {object} item the thing that should be checked
    * @returns True or False 
    */
    static isJson(item) {
        item = typeof item !== "string"
            ? JSON.stringify(item)
            : item;
    
        try {
            item = JSON.parse(item);
        } catch (e) {
            return false;
        }
    
        if (typeof item === "object" && item !== null) {
            return true;
        }
    
        return false;
    }
    /**
    * Checks if the FULL json object is the same with the supposed data.
    * @param {object} jsonItem the json object that should be checked.
    * @param {object} jsonItemCompareTo the json that we are comparing against
    * @returns True or False 
    */
   static jsonCompare(jsonItem, jsonItemCompareTo){
    return JSON.stringify(jsonItem) === JSON.stringify(jsonItemCompareTo);
   }
}