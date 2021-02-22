const fetchProfile = async (callback) => {
  try {
    const res = await fetch('https://www.geoguessr.com/api/v3/profiles/me');
    const data = await res.json();
    return callback({ data });
  } catch (err) {
    return callback({ data: null });
  }
};

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    if (message.type === 'profile') {
      fetchProfile(sendResponse);
      return true;
    }
    return false;
  },
);
