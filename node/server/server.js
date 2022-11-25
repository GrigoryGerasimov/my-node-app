const express = require("express");
const path = require("path");
const chalk = require("chalk");
const { writeIntoDB, removeFromDB, readFromFile, initDB } = require("../module_controllers/commands.js");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../pages"));

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.urlencoded({
    extended: true
}));

app.get("/", async (req, res) => {
    initDB();
    res.render("../pages/index", {
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
    // res.sendFile(path.resolve(__dirname, "../pages/notfound.html"));
});

app.post("/", async (req, res) => {
    const { param, content } = req.body;
    writeIntoDB({ [param]: content });
    res.render("../pages/index", {
        title: "OS Info App",
        legend: "Your Current OS",
        labelProp: "Property",
        labelVal: "Value",
        btnSave: "Save",
        properties: await readFromFile(path.resolve(__dirname, "../module_controllers/os/osInfo.json")),
        createdStamp: true,
        labelCreated: "New property has been successfully added"
    })
    // res.send("Congratulations! Your information has been successfully added into OS database");
});

app.delete("/:key", async (req, res) => {
    await removeFromDB(req.params.key);
    res.render("../pages/index",{
        title: "OS Info App",
        legend: "Your Current OS",
        labelProp: "Property",
        labelVal: "Value",
        btnSave: "Save",
        properties: await readFromFile(path.resolve(__dirname, "../module_controllers/os/osInfo.json")),
        createdStamp: false
    })
});

app.listen(port, () => {
    console.log(chalk.greenBright(`Server started listening on port ${port}`));
});
