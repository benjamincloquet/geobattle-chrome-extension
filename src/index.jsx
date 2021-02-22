import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';
import { UserProvider } from './userContext';
import './index.css';

ReactDOM.render(
  <UserProvider>
    <Popup />
  </UserProvider>, document.getElementById('root'),
);
