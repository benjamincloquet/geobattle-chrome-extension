import React from 'react';
import { Link } from 'react-router-dom';
import './BattleButton.scss';

const BattleButton = () => <Link to="/battles"><button type="button" className="battle-button">My battles</button></Link>;

export default BattleButton;
