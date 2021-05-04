const express = require("express");
const stories = express.Router();
const data = require("./data");

stories.get("/", (req, res) => {
    res.send(data);
});

stories.get("/:id", (req, res) => {
    res.send(data.find(el => el.id == req.params.id));
});

// maybe too specific
stories.patch("/:id", (req, res) => {
    console.log(req.body);
    const story = data.find(story => story.id == req.params.id);
    story.sentences.push(story.lastSentence);
    story.lastSentence = req.body.sentence;
    story.isEnd = req.body.isEnd;
    console.log(story);
    res.status(201);
})

stories.post("/:id", (req, res) => {
    
});

module.exports = stories;

