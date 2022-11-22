const fsSync = require("fs");
const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const createNewFile = async (dirPath, fileName, fileText) => {
    const newFilePath = path.resolve(dirPath, fileName);
    try {
        if (!fsSync.existsSync(newFilePath)) {
            await fs.writeFile(newFilePath, JSON.stringify(fileText));
        } else await fs.appendFile(newFilePath, JSON.stringify(fileText));
    } finally {
        console.log(chalk.magenta("command completed"))
    }
};

const createNewDir = async dirName => {
    const newDirPath = path.resolve(__dirname, dirName);
    try {
        if (!fsSync.existsSync(newDirPath)) {
            await fs.mkdir(newDirPath);
            await createNewFile(newDirPath, "testFile.txt", "New file in new folder created");
            return newDirPath;
        } else {
            await createNewFile(newDirPath, "testFile.txt", "New file in already existing folder created");
            return newDirPath
        };
    } finally {
        console.log(chalk.magenta("command completed"))
    }
};

const readFromFile = async fileName => {
    try {
        const result = await fs.readFile(path.join(__dirname, fileName), { encoding: "utf-8" });
        console.log(chalk.green(JSON.parse(result)));
    } catch (error) {
        console.log(chalk.red(error));
    } finally {
        console.log(chalk.magenta("command completed"))
    }
};

module.exports = {
    createNewDir,
    createNewFile,
    readFromFile
};
