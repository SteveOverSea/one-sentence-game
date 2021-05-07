const fs = require("fs").promises;

const filePath = "./src/server/stories.json";

// big errors if there is no file

async function readData() {
    try {
        const data = await fs.readFile(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
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
  
