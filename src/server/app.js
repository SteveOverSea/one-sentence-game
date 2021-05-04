const express = require("express");
const stories = require("./storiesRoute");

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use("/stories", stories);

module.exports = app;