import React from 'react';
import { Link } from 'react-router-dom';
import './JoinBattleButton.scss';

const JoinBattleButton = () => <Link to="/join"><button type="button" className="join-battle-button">Join a battle</button></Link>;

export default JoinBattleButton;
