import { prepareInput } from "./app"

let database = [
    {
        id: 1,
        title: "The crazy grandma on her cheesy motorbike",
        sentences: [
            "There was an old grandma and she loved to ride motorbikes.",
            "Her husband was dead, but all she had was his motorbike.",
            "So she decided to make a trip.",
            "Unfortunately, she couldn't ride her bike.",
            "It was broken and she was left on the road alone"
        ],
        lastSentence: "Then she made a stop at gas station.",
        contributors: [
            "example@email.com",
            "dorf@stadt.de",
            "hans-juergen@homeschool.at"
        ],
        isEnd: true
    },
    {
        id: 2,
        title: "A normal day",
        sentences: [
            "It was a day of sunshine, when something strange happend",
            "The dog made the sound of the cat and cats behaved like chickens.",
            "Human pealed bananas with their feet.",
            "They asked the local orang-utan for help"
        ],
        lastSentence: "Then she made a stop at gas station.",
        contributors: [
            "example@email.com",
            "dorf@stadt.de",
            "hans-juergen@homeschool.at"
        ],
        isEnd: true
    }
];

// database REST API

function getAll() {
    return database;
}

function getOne(id) {
    return database.filter(story => story.id == id);
}

function add(story) {
    story["id"] = database.length + 1;
    database.push(story);
}

export function getStory() {
    return getAll().find(story => story.isEnd == false)
}

export function getServerData() {
    // simulates database
    return {
        title: storyData.title,
        lastSentence: storyData.lastSentence
    };
}

export function sendNewSentence(newSentence, isEnd) {
    if(!isEnd) {
        storyData.sentences.push(storyData.lastSentence);
        storyData.lastSentence = newSentence;
        
        prepareInput();
    } else {
        storyData.sentences.push(storyData.lastSentence, newSentence);
        storyData.isEnd = true;

        // start new story, inform the contributors
        document.getElementById("info-p").textContent = "story finished.";
    }

    console.log(storyData);
    
}