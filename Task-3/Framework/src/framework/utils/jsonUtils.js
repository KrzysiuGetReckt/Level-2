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
}