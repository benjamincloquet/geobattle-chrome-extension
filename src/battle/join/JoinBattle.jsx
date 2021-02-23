import React from 'react';
import Divider from '../../divider/Divider';
import JoinBattleForm from './JoinBattleForm';
import './JoinBattle.scss';

const JoinBattle = () => (
  <>
    <h1 className="title">Join a battle</h1>
    <Divider />
    <JoinBattleForm />
  </>
);

export default JoinBattle;
