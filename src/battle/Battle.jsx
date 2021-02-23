/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchBattle from '../useFetchBattle';
import { useUserState } from '../userContext';
import Divider from '../divider/Divider';
import Loader from '../loader/Loader';
import Challenge from './Challenge';
import NewChallengeForm from './NewChallengeForm';
import './Battle.scss';

const Battle = () => {
  const { profile } = useUserState();
  const { battleId } = useParams();
  const { battle, challenges, refresh } = useFetchBattle(battleId);

  const renderBattle = () => (
    <>
      <h1 className="title">{battle.name}</h1>
      <p className="battle__id">{battleId}</p>
      <Divider />
      <div className="battle">
        {challenges.length > 0 ? (
          <>
            <div className="battle__challenges">
              {challenges.map((challenge, index) => (
                <Challenge key={challenge.id} challenge={challenge} index={index} />
              ))}
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
              <Challenge challenge={{ token: 'a', map: { name: 'zgeg' } }} index={1} />
            </div>
            <Divider />
          </>
        ) : null }
        <h1 className="title">Add a challenge</h1>
        {profile.id === battle.profileId
          ? (
            <NewChallengeForm battleId={battleId} onAfterSubmit={refresh} />
          ) : null}
      </div>
    </>
  );

  return battle && challenges ? renderBattle() : <Loader />;
};

export default Battle;
