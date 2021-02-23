import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './BackButton.scss';

const BackButton = () => {
  const history = useHistory();
  const location = useLocation();

  const onClick = () => {
    history.goBack();
  };

  console.log(location);

  return location.pathname === '/' ? null : <button type="button" className="back-button" onClick={onClick}>Back</button>;
};

export default BackButton;
