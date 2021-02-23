import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-form';
import { useUserState } from '../../userContext';
import BattleIdField from './BattleIdField';

const JoinBattleForm = () => {
  const { profile } = useUserState();
  const history = useHistory();

  const {
    Form, meta: {
      isSubmitting, canSubmit, isTouched, error,
    }, setMeta,
  } = useForm({
    onSubmit: async (values) => {
      try {
        await axios.post(`${process.env.API_URL}/join`, { profile, params: values });
        setMeta((meta) => ({ ...meta, error: false }));
        history.push(`/battle/${values.battleId}`);
      } catch (err) {
        setMeta((meta) => ({ ...meta, error: "Couldn't join battle !" }));
      }
    },
  });

  return (
    <Form>
      <label htmlFor="battleIdField">
        Battle ID :
        {' '}
        <BattleIdField />
      </label>
      <button type="submit" disabled={!canSubmit}>Join</button>
      <p className="subtext">{isSubmitting ? 'Joining...' : null}</p>
      <p className="error">{isTouched && error ? error : null}</p>
    </Form>
  );
};

export default JoinBattleForm;
