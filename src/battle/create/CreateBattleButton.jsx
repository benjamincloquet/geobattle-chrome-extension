import React from 'react';
import { Link } from 'react-router-dom';
import './CreateBattleButton.scss';

const CreateBattleButton = () => <Link to="/create"><button type="button" className="create-battle-button">Create a battle</button></Link>;

export default CreateBattleButton;
