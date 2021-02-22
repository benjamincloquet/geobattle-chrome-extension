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

const isChallengeURL = (url) => url.includes('challenges/') && !url.includes('invite');

const getProfileId = async () => {
  try {
    const res = await fetch('https://www.geoguessr.com/api/v3/profiles/me');
    const json = await res.json();
    return json.id;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getChallengeToken = async (url) => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json.challenge.token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getGameToken = async (challengeToken) => {
  try {
    const res = await fetch(`https://www.geoguessr.com/api/v3/challenges/${challengeToken}/game`);
    const json = await res.json();
    return json.token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const sendResult = async (token, result) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, result }),
    };
    await fetch('http://localhost:5000/api/result', options);
  } catch (err) {
    console.log(err);
  }
};

const onGameResult = (token) => async ({ method, url }) => {
  if (method === 'POST') {
    try {
      const res = await fetch(url);
      const result = await res.json();
      console.log(await sendResult(token, result));
      if (result.state === 'finished') {
        // remove listener
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const hasPlayerJoinedChallenge = async (profileId, token) => {
  if (!profileId || !token) {
    return false;
  }
  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profileId, token }),
    };
    await fetch('http://localhost:5000/api/joined', options);
    return true;
  } catch (err) {
    return false;
  }
};

const onChallengeStarted = async (token) => {
  const profileId = await getProfileId();
  if (hasPlayerJoinedChallenge(profileId, token)) {
    const gameToken = await getGameToken(token);
    if (gameToken) {
      chrome.webRequest.onResponseStarted.addListener(
        onGameResult(token),
        { urls: [`https://www.geoguessr.com/api/v3/games/${gameToken}`] },
        [],
      );
    }
  }
};

chrome.webRequest.onResponseStarted.addListener(
  async ({ method, url }) => {
    if (method === 'POST' && isChallengeURL(url)) {
      const token = await getChallengeToken(url);
      if (token) {
        onChallengeStarted(token);
      }
    }
  },
  { urls: ['https://www.geoguessr.com/api/v3/challenges/*'] },
  [],
);
