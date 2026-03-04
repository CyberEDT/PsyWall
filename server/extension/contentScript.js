/**
 * Content Script for Cognitive Firewall
 * Responsible for DOM extraction and alerting.
 */

console.log("[Cognitive Firewall] Content monitoring active.");

// Minimal logic for DOM extraction
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyzeSelf") {
        const pageText = document.body.innerText;
        sendResponse({ text: pageText });
    }
});
