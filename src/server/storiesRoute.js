const express = require("express");
const stories = express.Router();
const data = require("./data");
const { readData, writeData } = require("./fileHandler");
const StoryData = require("./models/story");

const storyData = new StoryData();

stories.get("/", async (req, res) => {
    //res.send(await readData());
    const story = await storyData.index();
    res.send(story);
});

stories.get("/:id", async (req, res) => {
    const story = await storyData.show(req.params.id);
    res.send(story);
    // const data = await readData();
    // res.send(data.find(el => el.id == req.params.id));
});

stories.patch("/:id", async (req, res) => {
    const story = await storyData.edit(req.params.id, req.body);
    res.send(story);
});

stories.patch("/saveEmail/:id", async (req, res) => {
    const data = await readData();
    for(let i = 0; i < data.length; i++) {
        if(data[i].id == req.params.id) {
            data[i].contributors.push(req.body.email);
        }
    }
    
    await writeData(data);
    
    res.status(201).send();
});

stories.post("/", async (req, res) => {
    const newStory = await storyData.create(req.body);
    res.send(newStory);
});

stories.delete("/:id", async (req, res) => {
    const story = await storyData.delete(req.params.id);
    res.json(story);
});

module.exports = stories;

