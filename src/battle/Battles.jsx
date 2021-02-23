import React from 'react';
import { Link } from 'react-router-dom';
import { useUserState } from '../userContext';
import useFetchBattles from '../useFetchBattles';
import Divider from '../divider/Divider';
import './Battles.scss';

const Battles = () => {
  useFetchBattles();
  const { battles } = useUserState();

  const renderBattles = () => {
    if (battles.length === 0) {
      return <p>Create or join a battle to start playing !</p>;
    }
    return battles.map((battle) => (
      <Link key={battle.id} className="battles__link" to={`/battle/${battle.id}`}>{battle.name}</Link>
    ));
  };

  return (
    <>
      <h1 className="title">My battles</h1>
      <Divider />
      <div className="battles">
        {battles ? renderBattles() : null}
      </div>
    </>
  );
};

export default Battles;
