import { generateQuiz } from "./utils/gemini";

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "GENERATE_QUIZ") {
    console.log("Background script received GENERATE_QUIZ message");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      if (activeTab && activeTab.id) {
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTab.id },
            files: ["content.js"],
          },
          () => console.log("Content script injected")
        );
      }
    });
  } else if (message.type === "PAGE_CONTENT") {
    console.log("Background script received PAGE_CONTENT");

    generateQuiz(message.text)
      .then((quizData) => {
        console.log('Quiz Data', quizData);
        chrome.runtime.sendMessage({ type: "QUIZ_GENERATED", data: quizData });
      })
      .catch((error) => {
        console.error("Error generating quiz:", error);
        chrome.runtime.sendMessage({
          type: "QUIZ_GENERATION_FAILED",
          error: error.message,
        });
      });
  }
  return true;
});