/* eslint-disable no-undef */
import React, { useEffect } from 'react';

const Popup = () => {
  useEffect(() => {
    const onExecuted = (result) => {
      console.log(result);
    };

    const onError = (error) => {
      console.log('error: ', error);
    };

    const handleResponseStarted = ({ method, url }) => {
      if (method === 'POST' && url === 'https://www.geoguessr.com/api/v3/challenges') {
        const challengeTokenRetrievalInjection = browser.tabs.executeScript({
          file: '/retrieveChallengeToken.js',
          allFrames: true,
        });
        challengeTokenRetrievalInjection.then(onExecuted, onError);
      }
    };

    const params = {
      urls: ['https://www.geoguessr.com/api/*'],
    };

    chrome.webRequest.onResponseStarted.addListener(handleResponseStarted, params, []);

    return () => {
      chrome.webRequest.onResponseStarted.removeListener(handleResponseStarted, params, []);
    };
  }, []);

  return (
    <div className="popup">
      <p>a</p>
    </div>
  );
};

export default Popup;
