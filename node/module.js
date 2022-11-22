const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const noteBase = require("../db.json");
const pathName = path.join(__dirname, "db.json");

const add = async title => {
    const note = {
        id: Date.now().toString(),
        title
    };

    noteBase.push(note);

    await fs.writeFile(pathName, JSON.stringify(noteBase));
};

const checkFormat = data => Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];

const read = async () => {
    // операция с буффером
    // const notes  = await fs.readFile(pathName);
    // const resultToRead = Buffer.from(notes).toString("utf-8");

    const resultToRead = await fs.readFile(pathName, {
        encoding: "utf-8"
    })

    console.log(chalk.rgb(255, 255, 202)("Receiving data from db started"));
    console.log(checkFormat(resultToRead));
    console.log(chalk.rgb(254, 136, 116)("Data from db received"));

    return checkFormat(resultToRead);
};

const printStyled = async () => {
    const resultToPrint = await read();

    for (const resultItem of resultToPrint) {
        console.log(chalk.blue(resultItem.id), chalk.magenta(resultItem.title));
    }
}

const remove = async id => {
    const updatedNoteBase = noteBase.filter(note => note.id !== id);

    await fs.writeFile(pathName, JSON.stringify(updatedNoteBase));

    console.log(chalk.red(`note with id ${id} has been successfully removed from db`));
}

module.exports = {
    add,
    read,
    printStyled,
    remove
};
