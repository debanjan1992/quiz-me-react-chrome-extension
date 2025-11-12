console.log("Quiz Me Now: Content script running...");

// Send the page's text to the background script
chrome.runtime.sendMessage({
  type: "PAGE_CONTENT",
  text: document.body.innerText || "No content found",
});
