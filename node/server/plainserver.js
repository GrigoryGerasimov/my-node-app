const http = require("http");
const chalk = require("chalk");
const path = require("path");
const { readFromFile, writeIntoDB } = require("../module_controllers/commands");

const port = 3000;

const server = http.createServer(async (req, res) => {
    const startPage = await readFromFile(path.resolve(__dirname, "../index.ejs"));
    const notfoundPage = await readFromFile(path.resolve(__dirname, "../notfound.html"));
    if (req.method === "GET") {
        res.setHeader("Content-Type", "text-html");
        switch (req.url) {
            case "/": {
                res.writeHead(200);
                res.end(startPage);
                break;
            }
            case "/404": {
                res.writeHead(404);
                res.end(notfoundPage);
                break;
            }
        }
    } else if (req.method === "POST") {
        let received;
        req.on("data", data => {
            received = Buffer.from(data).toString("utf-8");
        });
        req.on("end", async () => {
            const param = received
                .slice(0, received.indexOf("&"))
                .split("=")[1];
            const content = received
                .slice(received.indexOf("&") + 1)
                .split("=")[1]
                .replace(/\+/g, " ");
            await writeIntoDB({ [param]: content });
            await readFromFile(path.join(__dirname, "../module_controllers/os/osInfo.json"));
        });
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        res.end(startPage);
    }
});

server.listen(port, () => {
    console.log(chalk.greenBright(`Server is listening on port ${port}`));
});
