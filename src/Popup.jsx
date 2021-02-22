import React from 'react';
import {
  MemoryRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import useFetchUser from './useFetchUser';
import { useUserState } from './userContext';
import Home from './Home';
import Battles from './Battles';
import Battle from './Battle';
import './Popup.css';

const Popup = () => {
  useFetchUser();
  const { profile } = useUserState();

  return (
    <Router>
      <div className="popup">
        {profile
          ? (
            <Switch>
              <Route path="/battles">
                <Battles />
              </Route>
              <Route path="/battle/:battleId">
                <Battle />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          ) : <p>Loading...</p> }
      </div>
    </Router>
  );
};

export default Popup;
