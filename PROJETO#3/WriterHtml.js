const fs = require("fs");
const util = require("util");

class WriterHtml {
    constructor() {
        this.writer = util.promisify(fs.writeFile);
    }

    async Write (fileName, data) {
        try {
            await this.writer(fileName, data);
            return true;

        } catch (error) {
            return false;
        }
        
    }
}

module.exports = WriterHtml;