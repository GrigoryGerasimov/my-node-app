const yargs = require("yargs");
const path = require("path");
const fsSync = require("fs");
const fs = require("fs/promises");
const { createNewDir,
    createNewFile,
    readFromFile } = require("./commands.js");

yargs.command({
    command: "newdir",
    builder: {
        newdirname: {
            type: "string",
            description: "new directory name",
            demandOption: true
        }
    },
    description: "create a new directory",
    async handler({ newdirname }) {
        await createNewDir(newdirname);
    }
});

yargs.command({
    command: "newfile",
    builder: {
        newfilename: {
            type: "string",
            description: "new file name",
            demandOption: true
        }
    },
    description: "new file",
    async handler({ newfilename }) {
        await createNewFile(newfilename, process.argv[2]);
    }
})

yargs.command({
    command: "readfile",
    builder: {
        fileTitle: {
            type: "string",
            description: "test file name",
            demandOption: true
        }
    },
    description: "read from file",
    async handler({ fileTitle }) {
        await readFromFile(fileTitle);
    }
});

yargs.parse();
