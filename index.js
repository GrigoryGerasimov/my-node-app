const yargs = require("yargs");
const pckg = require("./package.json");
const { add, read, printStyled, remove } = require("./module");

yargs.version(pckg.version);

yargs.command({
    command: "add",
    builder: {
        title: {
            type: "string",
            description: "Some prompt title for a note",
            demandOption: true
        }
    },
    description: "add title",
    async handler({ title }) {
        await add(title);
    }
});

yargs.command({
    command: "read",
    builder: {
        title: {
            type: "string",
            description: "Some propmt title to read from",
            demandOption: false
        }
    },
    description: "read title",
    async handler() {
        // await read();
        await printStyled();
    }
});

yargs.command({
    command: "remove",
    builder: {
        id: {
            type: "string",
            description: "note id",
            demandOption: true
        }
    },
    description: "Remove a note by id",
    async handler({ id }) {
        await remove(id);
    }

})

yargs.parse();
