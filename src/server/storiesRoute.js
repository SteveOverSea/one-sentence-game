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
    const story = data.find(story => story.id == req.params.id);
    story.sentences.push(req.body.sentence);
    story.lastSentence = req.body.sentence;
    story.isEnd = req.body.isEnd;
    res.status(201).send();
})

stories.post("/", (req, res) => {
    const story = req.body;
    if(!story.id) {
        story.id = data.length + 1;
    }
    if(!story.sentences) {
        story.sentences = [];
    }
    if(!story.lastSentence) {
        story.lastSentence = "";
    }
    if(!story.contributors) {
        story.contributors = [];
    }
    if(story.isEnd === undefined) {
        story.isEnd = false;
    }
    if(story.isLocked === undefined) {
        story.isLocked = false;
    }
    if(!story.score) {
        story.score = 0;
    }

    data.push(story);
    res.send(story);
});

module.exports = stories;

