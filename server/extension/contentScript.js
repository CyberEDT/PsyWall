/**
 * Content Script for PsyWall (MIDS)
 * Responsible for DOM extraction and alerting.
 */

console.log("[PsyWall MIDS] Content monitoring active.");

// Minimal logic for DOM extraction
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyzeSelf") {
        const pageText = document.body.innerText;
        sendResponse({ text: pageText });
    }
});
