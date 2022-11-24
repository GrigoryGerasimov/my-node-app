const yargs = require("yargs");
const path = require("path");
const os = require("os");
const { createNewDir,
    createNewFile,
    readFromFile,
    removeFile,
    removeDir,
    truncateFile,
    copy,
    rename
} = require("./commands.js");

const osInfo = {
    platform: os.platform(),
    freeMemory: os.freemem(),
    totalMemory: os.totalmem(),
    cpus: os.cpus(),
    type: os.type(),
    constants: os.constants,
    homedir: os.homedir(),
    tmpdir: os.tmpdir(),
    hostname: os.hostname(),
    networkInterfaces: os.networkInterfaces(),
    architecture: os.arch(),
    version: os.version(),
    userInfo: os.userInfo(),
    uptime: os.uptime()
}

yargs.command({
    command: "newdir",
    builder: {
        newdirpath: {
            type: "string",
            description: "new directory path",
            demandOption: true
        }
    },
    description: "create a new directory",
    async handler({ newdirpath }) {
        await createNewDir(path.resolve(__dirname, newdirpath));
    }
});

yargs.command({
    command: "newfile",
    builder: {
        newfilename: {
            type: "string",
            description: "new file name",
            demandOption: true
        },
        newfiletext:{
            type: "string",
            description: "new file text",
            demandOption: false
        },
        dirpath: {
            type: "string",
            description: "new file dir path",
            demandOption: true
        }
    },
    description: "new file",
    async handler({ dirpath, newfilename, newfiletext }) {
        await createNewFile(path.resolve(__dirname, dirpath), newfilename, newfiletext);
    }
})

yargs.command({
    command: "readfile",
    builder: {
        filetitle: {
            type: "string",
            description: "test file name",
            demandOption: true
        }
    },
    description: "read from file",
    async handler({ filetitle }) {
        await readFromFile(filetitle);
    }
});

yargs.command({
    command: "osinfo",
    description: "write current os info",
    async handler() {
        const infoBlock = Object.keys(osInfo).map(key => ({ [key]: osInfo[key] }));
        await createNewFile(path.resolve(__dirname, "os"), "osInfo.json", infoBlock);
    }
})

yargs.command({
    command: "removefile",
    builder: {
        filepath: {
            type: "string",
            description: "path to file to be removed",
            demandOption: true
        }
    },
    description: "delete file",
    async handler({ filepath }) {
        await removeFile(path.resolve(__dirname, filepath));
    }
})

yargs.command({
    command: "removedir",
    builder: {
        dirpath: {
            type: "string",
            description: "path to dir to be removed",
            demandOption: true
        }
    },
    description: "delete dir",
    async handler({ dirpath }) {
        await removeDir(path.resolve(__dirname, dirpath));
    }
})

yargs.command({
    command: "truncfile",
    builder: {
        filepath: {
            type: "string",
            description: "path to file to be truncated",
            demandOption: true
        }
    },
    description: "truncate file",
    async handler({ filepath }) {
        await truncateFile(path.resolve(__dirname, filepath));
    }
})

yargs.command({
    command: "copy",
    builder: {
        src: {
            type: "string",
            description: "source of file to be copied from",
            demandOption: true
        },
        dest: {
            type: "string",
            description: "destionation of file to be copied into",
            demandOption: true
        }
    },
    description: "copy file",
    async handler({ src, dest }) {
        const sourcePath = path.join(__dirname, src);
        const destinationPath = path.join(__dirname, dest);
        await copy(sourcePath, destinationPath);
    }
})

yargs.command({
    command: "rename",
    builder: {
        oldpath: {
            type: "string",
            description: "old path of a file or dir to be renamed from",
            demandOption: true
        },
        newpath: {
            type: "string",
            description: "new path of a file or dir to be renamed for",
            demandOption: true
        }
    },
    description: "rename a file or dir",
    async handler({ oldpath, newpath }) {
        const oldPath = path.resolve(__dirname, oldpath);
        const newPath = path.resolve(__dirname, newpath);
        await rename(oldPath, newPath);
    }
})

yargs.parse();
