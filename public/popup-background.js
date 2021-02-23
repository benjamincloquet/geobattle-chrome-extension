const setPopup = (popup) => {
  chrome.browserAction.setPopup({ popup });
};

const queryTabsAndSetPopup = () => {
  chrome.tabs.query({ active: true, url: 'https://www.geoguessr.com/*' }, (tabs) => {
    const popup = tabs[0] ? 'index.html' : '';
    setPopup(popup);
  });
};

chrome.tabs.onActivated.addListener(() => {
  queryTabsAndSetPopup();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    queryTabsAndSetPopup();
  }
});
