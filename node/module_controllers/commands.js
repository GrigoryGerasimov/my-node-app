const fsSync = require("fs");
const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const { osInfo } = require("./db_initialstate.js");

const createNewFile = async (dirPath, fileName, fileText = "") => {
    const newFilePath = path.resolve(dirPath, fileName);
    try {
        if (!fsSync.existsSync(newFilePath)) {
            await fs.writeFile(newFilePath, JSON.stringify(fileText));
        } else await fs.appendFile(newFilePath, JSON.stringify(fileText));
    } finally {
        console.log(chalk.magenta("command completed"));
    }
};

const createNewDir = async newDirPath => {
    try {
        if (!fsSync.existsSync(newDirPath)) {
            await fs.mkdir(newDirPath);
            await createNewFile(newDirPath, "init.txt", "New folder created");
            return newDirPath;
        } else {
            await createNewFile(newDirPath, "init.txt", "Already existing folder initialized");
            return newDirPath
        }
    } finally {
        console.log(chalk.magenta("command completed"));
    }
};

const writeIntoDB = file => {
    const DB_PATH = "./os/osInfo.json";
    const DB = require(DB_PATH);
    DB.push(JSON.stringify(file));
    try {
        fsSync.writeFileSync(path.resolve(__dirname, DB_PATH), JSON.stringify([...new Set(DB)]));
    } catch (error) {
        console.log(chalk.red(error));
    } finally {
        console.log(chalk.magenta("command completed"));
    }
}

const amendInDB = file => {
    const DB_PATH = "./os/osInfo.json";
    const DB = require(DB_PATH);
    const amendedDB = DB.map(unit => {
        const parsedUnit = JSON.parse(unit);
        for (const key in parsedUnit) {
            if (key === file.param) parsedUnit[key] = file.content;
        }
        return JSON.stringify(parsedUnit);
    });
    try {
        fsSync.writeFileSync(path.resolve(__dirname, DB_PATH), JSON.stringify(amendedDB));
    } catch (error) {
        console.log(chalk.red(error));
    } finally {
        console.log(chalk.magenta("command completed"));
    }
};

const removeFromDB = async fileKey => {
    const DB_PATH = "./os/osInfo.json";
    const DB = require(DB_PATH);
    const updatedDB = DB.filter(item => {
        for (const itemKey in JSON.parse(item)) {
            if (itemKey !== fileKey) return true;
        }
    });
    await fs.writeFile(path.resolve(__dirname, DB_PATH), JSON.stringify(updatedDB));
};

const initDB = () => {
    const DB = require("./os/osInfo.json");
    const DB_INITIALSTATE = Array.isArray(DB) && DB.length ? DB : Object.keys(osInfo).map(key => JSON.stringify({[key]: osInfo[key]}));
    fsSync.writeFileSync(path.resolve(__dirname, "./os/osInfo.json"), JSON.stringify(DB_INITIALSTATE));
}

const readFromFile = async filePath => {
    try {
        const result = await fs.readFile(filePath, { encoding: "utf-8" });
        if (path.extname(filePath) === ".html") {
            return result;
        } else {
            console.log(chalk.green(JSON.parse(result)));
            return JSON.parse(result);
        }
    } catch (error) {
        console.log(chalk.red(error));
    } finally {
        console.log(chalk.magenta("command completed"));
    }
};

const removeFile = async filePath => {
    try {
        await fs.rm(filePath, { recursive: true });
    } catch (error) {
        console.log(chalk.red(error));
    } finally {
        console.log(chalk.magenta("command completed"));
    }
};

const removeDir = async dirPath => {
    try {
        await fs.rmdir(dirPath, { recursive: true });
    } catch (error) {
        console.log(chalk.red(error));
    } finally {
        console.log(chalk.magenta("command completed"));
    }
};

const truncateFile = async filePath => {
    try {
        await fs.truncate(filePath, 0);
    } catch (error) {
        console.log(chalk.red(error));
    } finally {
        console.log(chalk.magenta("command completed"));
    }
}

const copy = async (srcPath, destPath) => {
    try {
        await fs.copyFile(srcPath, destPath);
    } catch (error) {
        console.log(chalk.red(error));
    } finally {
        console.log(chalk.magenta("command completed"));
    }
};

const rename = async (oldPath, newPath) => {
    try {
        await fs.rename(oldPath, newPath);
    } catch (error) {
        console.log(chalk.red(error));
    } finally {
        console.log(chalk.magenta("command completed"));
    }
};

module.exports = {
    createNewDir,
    createNewFile,
    writeIntoDB,
    amendInDB,
    removeFromDB,
    initDB,
    readFromFile,
    removeFile,
    removeDir,
    truncateFile,
    copy,
    rename
};
