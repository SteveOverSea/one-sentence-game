import * as db from "./dataRequest";

document.addEventListener("DOMContentLoaded", prepareInput);
document.getElementById("restart").addEventListener("click", async () => await prepareInput());
document.getElementById("popular").addEventListener("click", getPopular);
    document.getElementById("random").addEventListener("click", getRandom);

export async function prepareInput() {


    // reset DOM
    document.getElementById("previous-input").classList.remove("hidden");
    document.getElementById("user-input").classList.remove("hidden");
    document.getElementById("buttons").classList.remove("hidden");
    document.getElementById("info").classList.add("hidden");
    document.getElementById("email-form").classList.add("hidden");
    document.getElementById("email-response").classList.add("hidden");

    //get an unfinished story or create a new one
    let storyData = await db.getReadyStory();
    if(storyData) {
        prepareDOM(storyData)
    } else {
        userPromptNewStory();
    }
}

function prepareDOM(storyData) {
    updateDOM(storyData);

    const sentenceInput = document.getElementById("sentence-input");

    sentenceInput.focus();

    sentenceInput.addEventListener("keydown", () => {
        sentenceInput.style.height = `${sentenceInput.scrollHeight}px`;
        // set Timeout?
    });


    document.getElementById("add-button").addEventListener("click", addSentence);
    document.getElementById("end-button").addEventListener("click", finishStory);
}

function userPromptNewStory() {
    // ask user for title and enter new story
    hideMainContent();

    document.getElementById("title-input").value = "";
    const userPrompt = document.getElementById("user-prompt");
    toggleHidden(userPrompt);

    document.getElementById("title-input").focus();


    userPrompt.addEventListener("submit", submitHandler);
}

async function submitHandler(e) {
    e.preventDefault();
    const title = document.getElementById("title-input").value;
    toggleHidden(document.getElementById("previous-input"));
    toggleHidden(document.getElementById("user-input"));
    toggleHidden(document.getElementById("user-prompt"));
    toggleHidden(document.getElementById("buttons"));

    const story =  {
        title,
        sentences: [],
        lastSentence: "",
        is_end: false,
        is_locked: false,
        contributors: [],
        score: 0 
    }
    prepareDOM(await db.add(story));
    document.getElementById("user-prompt").removeEventListener("submit",submitHandler);

}

function updateDOM(data) {
    document.getElementById("story-heading").textContent = data.title;

    if(data.last_sentence && data.last_sentence.length > 0)
        document.getElementById("previous").textContent = data.last_sentence;
    else
        document.getElementById("previous").textContent = "";

    // save story id to element (safe?) - needed for eventhandlers
    document.getElementById("sentence-input").dataset.storyId = data.id;
}

async function addSentence(e) {
    const newSentenceData = getInputAndPrepareEmailInput();
    await db.addSentence(newSentenceData.id, newSentenceData.text, false);
}

async function finishStory(e) {
    const newSentenceData = getInputAndPrepareEmailInput();
    await db.addSentence(newSentenceData.id, newSentenceData.text, true);
    document.getElementById("info-p").textContent = "story finished.";
}

function getInputAndPrepareEmailInput() {
    const sentenceInput = document.getElementById("sentence-input");
    const text = sentenceInput.value;
    const id = sentenceInput.dataset.storyId;
    sentenceInput.value = "";
    // check if there is a dot or add one at the end.
    // hide input and show email data and thanks for input! or contribute to another story
    const emailForm = document.getElementById("email-form");
    const infoDiv = document.getElementById("info");
   
    hideMainContent();
    toggleHidden(emailForm);
    toggleHidden(infoDiv);

    emailForm.addEventListener("submit", saveEmail);

    return { id, text };
}

function toggleHidden (el) {
    el.classList.toggle("hidden");
}

async function saveEmail(e) {
    e.preventDefault();
    const id = document.getElementById("sentence-input").dataset.storyId;
    const email = document.getElementById("email-input").value;
    const success = await db.saveEmailToStory(id, email);

    e.target.classList.add("hidden");
    const emailResponse = document.getElementById("email-response");

    if(success) {
        emailResponse.textContent = "Thank you.";
    } else {
        emailResponse.textContent = "Something bad happend.";
    }
    
    toggleHidden(emailResponse);
    document.getElementById("email-input").value = "";
}

function hideMainContent() {
    document.getElementById("user-input").classList.toggle("hidden");
    document.getElementById("buttons").classList.toggle("hidden");
    document.getElementById("previous-input").classList.toggle("hidden");
}

async function getPopular(e) {
    e.preventDefault();
    const popStories = await (await fetch("/stories/popular")).json();
    showPopup(popStories);
}

async function getRandom(e) {
    e.preventDefault();
    const randStory = await (await fetch("/stories/random")).json();
    showPopup(randStory);
}

function showPopup(data) {
    const popup = document.getElementById("popup");
    popup.classList.remove("hidden");

    const popupText = document.getElementById("popup-text");

    document.getElementById("popup-close").addEventListener("click", e => {
        e.preventDefault();
        popup.classList.add("hidden");
        popupText.textContent = "";
    });

    if (data.length > 1) {
        data.forEach(story => {
            popupText.textContent += story.title + "\n";
        });

    } else {
        popupText.textContent = data[0].title + ": ";
        data[0].sentences.forEach(sentence => {
            popupText.textContent += sentence + "\n";
        });
    }
}