import * as db from "./dataRequest";

document.addEventListener("DOMContentLoaded", prepareInput)

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
    //document.getElementById("popular").addEventListener("click", getPopular);
    //document.getElementById("random").addEventListener("click", getRandom);
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
        score: 0 
    }
    prepareDOM(await db.add(story));
    document.getElementById("user-prompt").removeEventListener("submit",submitHandler);

}

function updateDOM(data) {
    document.getElementById("story-heading").textContent = data.title;

    console.log(data.last_sentence);
    if(data.last_sentence && data.last_sentence.length > 0)
        document.getElementById("previous").textContent = data.last_sentence;
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
}

function hideMainContent() {
    document.getElementById("user-input").classList.toggle("hidden");
    document.getElementById("buttons").classList.toggle("hidden");
    document.getElementById("previous-input").classList.toggle("hidden");
}