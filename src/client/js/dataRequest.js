import { prepareInput } from "./app"

async function getAll() {
    try {
        const allStories = await ( await fetch("/stories") ).json();
        return allStories;
    } catch (error) {
        console.log(error);
    }
}

async function getOne(id) {
    try {
        const story = await ( await fetch("/stories/" + id) ).json();
        return story;
    } catch (error) {
        console.log(error)
    };
}

export async function add(story) {
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
    try {
        const allStories = await getAll();
        return allStories.find(story => story.isEnd == false && story.isLocked == false);

    } catch (error) {
        console.log(error);
    }
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