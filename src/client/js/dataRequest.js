import { prepareInput } from "./app"

async function getAll() {
    const allStories = await ( await fetch("/stories") ).json();
    return allStories;
}

async function getOne(id) {
    const story = await ( await fetch("/stories/" + id) ).json();
    return story;
}

export async function add(story) {
    console.log("add");
    console.log(story);
    try {
        const response = await fetch("stories", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',                                                              
            body: JSON.stringify(story)
        });

        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export async function saveEmailToStory(id, email) {
    try {
        await fetch("stories/saveEmail/" + id, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',                                                              
            body: JSON.stringify({ email })
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getReadyStory() {
    const allStories = await getAll();
    return allStories.find(story => story.isEnd == false && story.isLocked == false);
}

export async function addSentence(id, sentence, isEnd) {
    try {
        await fetch("stories/" + id, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',                                                              
            body: JSON.stringify({ sentence, isEnd })
        });

        if(isEnd) 
            document.getElementById("info-p").textContent = "story finished.";

        document.getElementById("restart").addEventListener("click", () => prepareInput());

    } catch (err) {
            console.log(err);
    }
}