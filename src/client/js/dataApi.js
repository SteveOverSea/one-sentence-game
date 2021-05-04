//import { prepareInput } from "./app"

// database REST API

async function getAll() {
    const allStories = await ( await fetch("/stories") ).json();
    return allStories;
}

async function getOne(id) {
    const story = await ( await fetch("/stories/" + id) ).json();
    return story;
}

function add(story) {
    //todo: add post request
}

export async function getUnfinishedStory() {
    const allStories = await getAll();
    return allStories.find(story => story.isEnd == false);
}

export async function addSentence(id, sentence, isEnd) {
    console.log(id, sentence, isEnd);
    if(!isEnd) {
        
        //prepareInput();
    } else {

        // start new story, inform the contributors
        document.getElementById("info-p").textContent = "story finished.";
    }

    try {
        await fetch("stories/" + id, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',                                                              
            body: JSON.stringify({ sentence, isEnd })
        });
    } catch (err) {
        console.log(err);
    }
}