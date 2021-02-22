import { useState, useEffect } from 'react';
import axios from 'axios';

export default (battleId) => {
  const [battle, setBattle] = useState(null);
  const [challenges, setChallenges] = useState(null);

  const fetchBattle = async () => {
    const battleRes = await axios.get(`${process.env.API_URL}/battle`, { params: { battleId } });
    setBattle(battleRes.data.battle);
    const challengesRes = await axios.get(`${process.env.API_URL}/challenges`, { params: { battleId } });
    setChallenges(challengesRes.data.challenges);
  };

  useEffect(async () => {
    await fetchBattle();
  }, []);

  return { battle, challenges, refresh: fetchBattle };
};
