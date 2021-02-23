import React from 'react';
import { useUserState } from '../userContext';
import './Greeting.scss';

const Greeting = () => {
  const { profile } = useUserState();

  return <p className="greeting">{`Hello ${profile?.nick ?? ''}!`}</p>;
};

export default Greeting;
