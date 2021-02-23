import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import Popup from './popup/Popup';
import { UserProvider } from './userContext';
import './index.scss';

ReactDOM.render(
  <UserProvider>
    <Router>
      <Popup />
    </Router>
  </UserProvider>, document.getElementById('root'),
);
