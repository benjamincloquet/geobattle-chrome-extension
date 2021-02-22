import React from 'react';
import { Link } from 'react-router-dom';
import { useUserState } from './userContext';
import useFetchBattles from './useFetchBattles';

const Battles = () => {
  useFetchBattles();
  const { battles } = useUserState();

  const renderBattles = () => battles.map((battle) => (
    <div>
      <Link to={`/battle/${battle.id}`}>{battle.name}</Link>
    </div>
  ));

  return battles ? renderBattles() : <p>No battles</p>;
};

export default Battles;
