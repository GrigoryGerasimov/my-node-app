const os = require("os");

const osInfo = {
    platform: os.platform(),
    freeMemory: os.freemem(),
    totalMemory: os.totalmem(),
    type: os.type(),
    homedir: os.homedir(),
    tmpdir: os.tmpdir(),
    hostname: os.hostname(),
    architecture: os.arch(),
    version: os.version(),
    uptime: os.uptime()
};

module.exports = {
    osInfo
};
