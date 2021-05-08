const express = require("express");
const { reset } = require("nodemon");
const stories = express.Router();
const StoryData = require("./models/story");

const storyData = new StoryData();

stories.get("/", async (req, res) => {
    //res.send(await readData());
    const story = await storyData.index();
    res.send(story);
});

stories.get("/popular", async (req, res) => {
    const query = "SELECT * FROM stories ORDER BY score LIMIT 3";
    const popStories = await storyData.customShow(query);
    res.send(popStories);
});

stories.get("/random", async (req, res) => {
    const query = "SELECT * FROM stories ORDER BY RANDOM() LIMIT 1";
    const randStory = await storyData.customShow(query);
    res.send(randStory);
});

stories.get("/:id", async (req, res) => {
    const story = await storyData.show(req.params.id);
    res.send(story);
});

stories.patch("/:id", async (req, res) => {
    const story = await storyData.edit(req.params.id, req.body);
    res.send(story);
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

