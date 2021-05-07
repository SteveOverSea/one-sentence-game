const express = require("express");
const stories = express.Router();
const data = require("./data");
const { readData, writeData } = require("./fileHandler");

stories.get("/", async (req, res) => {
    res.send(await readData());
});

stories.get("/:id", async (req, res) => {
    const data = await readData();
    res.send(data.find(el => el.id == req.params.id));
});

// maybe too specific
stories.patch("/:id", async (req, res) => {
    const data = await readData();
    for(let i = 0; i < data.length; i++) {
        if(data[i].id == req.params.id) {
            data[i].sentences.push(req.body.sentence);
            data[i].lastSentence = req.body.sentence;
            data[i].isEnd = req.body.isEnd;
        }
    }
    
    await writeData(data);
    
    res.status(201).send();
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
    const data = await readData();
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
    await writeData(data);
    res.send(story);
    console.log(story);
});

module.exports = stories;

