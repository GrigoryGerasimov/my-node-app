const http = require("http");
const chalk = require("chalk");
const path = require("path");
const { readFromFile } = require("../module_controllers/commands");

const port = 3000;

const server = http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/") {
        const startPage = await readFromFile(path.resolve(__dirname, "../index.html"));
        res.end(startPage);
    }
});

server.listen(port, () => {
    console.log(chalk.greenBright(`Server is listening on port ${port}`));
});
