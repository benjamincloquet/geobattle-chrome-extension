import { useEffect } from 'react';
import axios from 'axios';
import { useUser } from './userContext';

export default () => {
  const [{ profile: { id } }, dispatch] = useUser();

  useEffect(async () => {
    const res = await axios.get(`${process.env.API_URL}/battles`, { params: { profileId: id } });
    dispatch({ type: 'battles', payload: res.data.battles });
  }, []);
};
