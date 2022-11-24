const http = require("http");
const chalk = require("chalk");

const port = 3000;

const server = http.createServer((req, res) => {
    res.end("Server started successfully");
});

server.listen(port, () => {
    console.log(chalk.greenBright(`Server is listening on port ${port}`));
});
