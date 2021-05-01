import * as server from "./simulateDB.js";

document.addEventListener("DOMContentLoaded", prepareInput)

export function prepareInput() {

    document.getElementById("previous-input").hidden = false;
    document.getElementById("user-input").hidden = false;
    document.getElementById("info").hidden = true;
    document.getElementById("email-form").hidden = true;

    let data = server.getServerData();

    updateDOM(data);

    document.getElementById("add-button").addEventListener("click", addSentence);
    document.getElementById("end-button").addEventListener("click", finishStory);

}

function updateDOM(data) {
    document.getElementById("story-heading").textContent = data.title;
    document.getElementById("previous").textContent = "... " + data.lastSentence;
}

function addSentence(e) {
    const newSentence = getInputAndPrepareEmailInput();
    server.sendNewSentence(newSentence, false);
}

function finishStory(e) {
    const newSentence = getInputAndPrepareEmailInput();
    server.sendNewSentence(newSentence, true);
}

function getInputAndPrepareEmailInput() {
    const sentenceInput = document.getElementById("sentence-input");
    const newSentence = sentenceInput.value;
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

    return newSentence;
}

function toggleHidden (el) {
    el.hidden = !el.hidden;
}

function saveEmail(e) {
    e.preventDefault();
}