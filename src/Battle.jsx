/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchBattle from './useFetchBattle';
import { useUserState } from './userContext';
import NewChallengeForm from './NewChallengeForm';

const Battle = () => {
  const { profile } = useUserState();
  const { battleId } = useParams();
  const { battle, challenges, refresh } = useFetchBattle(battleId);

  return battle && challenges ? (
    <div>
      <p>{`${battle.name} (${battleId})`}</p>
      {challenges.map((challenge) => <p>{challenge.token}</p>)}
      {profile.id === battle.profileId
        ? (
          <NewChallengeForm battleId={battleId} onAfterSubmit={refresh} />
        ) : null}
    </div>
  ) : <p>Loading...</p>;
};

export default Battle;
