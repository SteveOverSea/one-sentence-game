import { prepareInput } from "./app.js"

let storyData = {
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
    isEnd: false
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