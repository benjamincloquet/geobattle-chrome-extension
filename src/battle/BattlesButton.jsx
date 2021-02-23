import React from 'react';
import { Link } from 'react-router-dom';
import './BattlesButton.scss';

const BattlesButton = () => <Link to="/battles"><button type="button" className="battle-button">My battles</button></Link>;

export default BattlesButton;
