import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import useFetchUser from '../useFetchUser';
import { useUserState } from '../userContext';
import useHistoryStorage from '../useHistoryStorage';
import JoinBattle from '../battle/join/JoinBattle';
import CreateBattle from '../battle/create/CreateBattle';
import Home from '../home/Home';
import Battles from '../battle/Battles';
import Battle from '../battle/Battle';
import Loader from '../loader/Loader';
import BackButton from '../back/BackButton';
import './Popup.scss';

const Popup = () => {
  useHistoryStorage();
  useFetchUser();
  const { profile } = useUserState();

  return (
    <div className="popup">
      {profile
        ? (
          <>
            <Switch>
              <Route path="/join">
                <JoinBattle />
              </Route>
              <Route path="/create">
                <CreateBattle />
              </Route>
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
            <BackButton />
          </>
        ) : <Loader /> }
    </div>
  );
};

export default Popup;
