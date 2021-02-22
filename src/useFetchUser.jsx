import { useEffect } from 'react';
import { useUserDispatch } from './userContext';

export default () => {
  const dispatch = useUserDispatch();

  useEffect(() => {
    chrome.tabs.query({ url: 'https://www.geoguessr.com/*' }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'profile' }, ({ data }) => {
          dispatch({ type: 'profile', payload: data });
        });
      }
    });
  }, []);
};
