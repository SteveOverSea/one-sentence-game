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
        const story = await getOne(id);
        const contributors = story.contributors;
        contributors.push(email);

        await fetch("stories/" + id, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',                                                              
            body: JSON.stringify({ contributors })
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
        const foundStory = allStories.find(story => story.is_end == false && story.is_locked == false);
        console.log(foundStory);
        return foundStory;
    } catch (error) {
        console.log(error);
    }
}

export async function addSentence(id, sentence, is_end) {
    try {
        //get sentences
        const story = await getOne("id");
        const sentences = story.sentences;
        sentences.push(sentence);
        const last_sentence = sentence;

        await fetch("stories/" + id, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',                                                              
            body: JSON.stringify({ sentences, last_sentence, is_end })
        });

        if(is_end) 
            document.getElementById("info-p").textContent = "story finished.";

        document.getElementById("restart").addEventListener("click", async () => await prepareInput());

    } catch (err) {
            console.log(err);
    }
}