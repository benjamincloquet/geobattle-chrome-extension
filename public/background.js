const setPopup = (popup) => {
  chrome.browserAction.setPopup({ popup });
};

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, url: 'https://www.geoguessr.com/*' }, (tabs) => {
    if (tabs[0]) {
      console.log('geo');
      setPopup('index.html');
    } else {
      setPopup('');
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, url: 'https://www.geoguessr.com/*' }, (tabs) => {
      if (tabs[0]) {
        console.log('geo');
        setPopup('index.html');
      } else {
        setPopup('');
      }
    });
  }
});
