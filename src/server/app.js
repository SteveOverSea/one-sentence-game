const express = require("express");
const stories = require("./storiesRoute");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.static("dist"));
app.use(express.json());
app.use("/stories", stories);

module.exports = app;