let historyLocation = null;

chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    if (message.type === 'load-location') {
      sendResponse(historyLocation);
    } else if (message.type === 'save-location') {
      historyLocation = message.payload;
      return true;
    }
    return false;
  },
);
