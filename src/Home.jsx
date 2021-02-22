import React from 'react';
import { Link } from 'react-router-dom';
import NewBattleForm from './NewBattleForm';
import JoinBattleForm from './JoinBattleForm';
import { useUserState } from './userContext';

const Home = () => {
  const { profile } = useUserState();

  const renderGreeting = () => (profile ? (
    <p>{`Hello ${profile?.nick || ''}!`}</p>
  ) : null);

  return (
    <div>
      <h1>{process.env.APP_NAME}</h1>
      {renderGreeting()}
      <NewBattleForm />
      <JoinBattleForm />
      <Link to="/battles"><button type="button">My Battles</button></Link>
    </div>
  );
};

export default Home;
