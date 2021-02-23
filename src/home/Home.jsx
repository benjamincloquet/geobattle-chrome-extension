import React from 'react';
import Greeting from '../greeting/Greeting';
import Divider from '../divider/Divider';
import JoinBattleButton from '../battle/join/JoinBattleButton';
import CreateBattleButton from '../battle/create/CreateBattleButton';
import BattlesButton from '../battle/BattlesButton';
import './Home.scss';

const Home = () => (
  <>
    <h1 className="title">{process.env.APP_NAME}</h1>
    <Greeting />
    <Divider />
    <div className="home">
      <JoinBattleButton />
      <CreateBattleButton />
      <BattlesButton />
    </div>
  </>
);

export default Home;
