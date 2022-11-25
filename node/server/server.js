const express = require("express");
const path = require("path");
const chalk = require("chalk");
const { writeIntoDB, readFromFile, initDB } = require("../module_controllers/commands.js");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../index"));

app.use(express.urlencoded({
    extended: true
}));

app.get("/", async (req, res) => {
    initDB();
    res.render("../index", {
        title: "OS Info App",
        legend: "Your Current OS",
        labelProp: "Property",
        labelVal: "Value",
        btnSave: "Save",
        properties: await readFromFile(path.resolve(__dirname, "../module_controllers/os/osInfo.json")),
        createdStamp: false
    });
});
app.get("/404", (req, res) => {
    res.sendStatus(404);
    // как вариант страницы 404, но со статусом 200
    // res.sendFile(path.resolve(__dirname, "../notfound.html"));
});
app.post("/", async (req, res) => {
    const { param, content } = req.body;
    writeIntoDB({ [param]: content });
    res.render("../index", {
        title: "OS Info App",
        legend: "Your Current OS",
        labelProp: "Property",
        labelVal: "Value",
        btnSave: "Save",
        btnGenInfo: "Generate OS info",
        properties: await readFromFile(path.resolve(__dirname, "../module_controllers/os/osInfo.json")),
        createdStamp: true
    })
    // res.send("Congratulations! Your information has been successfully added into OS database");
});

app.listen(port, () => {
    console.log(chalk.greenBright(`Server started listening on port ${port}`));
});
