import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'load-location' }, (previousLocation) => {
      if (previousLocation) {
        history.push(previousLocation);
      }
    });
  }, []);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'save-location', payload: location });
  }, [location]);
};
