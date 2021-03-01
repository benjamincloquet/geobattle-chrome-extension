const GEOGUESSR_API_URL = 'https://www.geoguessr.com/api/v3';
const API_URL = 'https://geo-battle.herokuapp.com/api';

const isChallengeURL = (url) => url.includes('challenges/') && !url.includes('invite');

const getProfileId = async () => {
  try {
    const res = await fetch(`${GEOGUESSR_API_URL}/profiles/me`);
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
    const res = await fetch(`${GEOGUESSR_API_URL}/challenges/${challengeToken}/game`);
    const json = await res.json();
    return json.token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const sendResult = async (result) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result }),
    };
    await fetch(`${API_URL}/result`, options);
  } catch (err) {
    console.log(err);
  }
};

const onGameResult = (token) => async ({ method, url }) => {
  if (method === 'POST') {
    try {
      const res = await fetch(url);
      const {
        roundCount,
        state,
        player: {
          id,
          nick,
          pin,
          guesses,
        },
      } = await res.json();
      await sendResult({
        challengeToken: token,
        roundCount,
        player: {
          profileId: id,
          nick,
          avatarUrl: pin.url,
        },
        guesses,
      });
      if (state === 'finished') {
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
    await fetch(`${API_URL}/joined`, options);
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
        { urls: [`${GEOGUESSR_API_URL}/games/${gameToken}`] },
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
  { urls: [`${GEOGUESSR_API_URL}/challenges/*`] },
  [],
);
