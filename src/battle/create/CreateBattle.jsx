import React from 'react';
import Divider from '../../divider/Divider';
import CreateBattleForm from './CreateBattleForm';
import './CreateBattle.scss';

const CreateBattle = () => (
  <>
    <h1 className="title">Create a battle</h1>
    <Divider />
    <CreateBattleForm />
  </>
);

export default CreateBattle;
