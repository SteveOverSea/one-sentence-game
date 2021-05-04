const fs = require("fs").promises;

const filePath = "./src/server/stories.json";

async function readData() {
    try {
        const data = await fs.readFile(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
        //no file there
        if(error.errno == -2)
            return [];
    }
  }

async function writeData(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), { flag: "w+"});
    } catch (error) {
        console.error(error);
    }
}

module.exports = { readData, writeData };
  
