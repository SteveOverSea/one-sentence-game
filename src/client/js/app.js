import * as db from "./dataRequest";

document.addEventListener("DOMContentLoaded", prepareInput)

export async function prepareInput() {

    // reset DOM
    document.getElementById("previous-input").hidden = false;
    document.getElementById("user-input").hidden = false;
    document.getElementById("info").hidden = true;
    document.getElementById("email-form").hidden = true;

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

    document.getElementById("sentence-input").focus();


    document.getElementById("add-button").addEventListener("click", addSentence);
    document.getElementById("end-button").addEventListener("click", finishStory);
    //document.getElementById("popular").addEventListener("click", getPopular);
    //document.getElementById("random").addEventListener("click", getRandom);
}

function userPromptNewStory() {
    // ask user for title and enter new story
    document.getElementById("previous-input").hidden = true;
    document.getElementById("user-input").hidden = true;
    document.getElementById("title-input").value = "";
    const userPrompt = document.getElementById("user-prompt");
    userPrompt.hidden = false;

    document.getElementById("title-input").focus();


    userPrompt.addEventListener("submit", submitHandler);
}

async function submitHandler(e) {
    e.preventDefault();
    const title = document.getElementById("title-input").value;
    document.getElementById("previous-input").hidden = false;
    document.getElementById("user-input").hidden = false;
    document.getElementById("user-prompt").hidden = true;
    console.log("submit-titleform");
    prepareDOM(await db.add({ title }));
    document.getElementById("user-prompt").removeEventListener("submit",submitHandler);

}

function updateDOM(data) {
    document.getElementById("story-heading").textContent = data.title;

    if(data.lastSentence)
        document.getElementById("previous").textContent = "... " + data.lastSentence;
    else
        document.getElementById("previous").textContent = "";

    // save story id to element (safe?) - needed for eventhandlers
    document.getElementById("sentence-input").dataset.storyId = data.id;
}

function addSentence(e) {
    const newSentenceData = getInputAndPrepareEmailInput();
    db.addSentence(newSentenceData.id, newSentenceData.text, false);
}

function finishStory(e) {
    const newSentenceData = getInputAndPrepareEmailInput();
    db.addSentence(newSentenceData.id, newSentenceData.text, true);
}

function getInputAndPrepareEmailInput() {
    const sentenceInput = document.getElementById("sentence-input");
    const text = sentenceInput.value;
    const id = sentenceInput.dataset.storyId;
    sentenceInput.value = "";
    // check if there is a dot or add one at the end.
    // hide input and show email data and thanks for input! or contribute to another story
    const previousInput = document.getElementById("previous-input");
    const userInput = document.getElementById("user-input");
    const emailForm = document.getElementById("email-form");
    const infoDiv = document.getElementById("info");
   
    toggleHidden(previousInput);
    toggleHidden(userInput);
    toggleHidden(emailForm);
    toggleHidden(infoDiv);

    emailForm.addEventListener("submit", saveEmail);

    return { id, text };
}

function toggleHidden (el) {
    el.hidden = !el.hidden;
}

function saveEmail(e) {
    e.preventDefault();
}