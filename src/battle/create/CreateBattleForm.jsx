import React from 'react';
import axios from 'axios';
import { useForm } from 'react-form';
import { useHistory } from 'react-router-dom';
import { useUserState } from '../../userContext';
import BattleNameField from './BattleNameField';

const CreateBattleForm = () => {
  const { profile } = useUserState();
  const history = useHistory();

  const {
    Form, meta: {
      isSubmitting, canSubmit, isTouched, error,
    }, setMeta,
  } = useForm({
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${process.env.API_URL}/battle`, { profile, params: values });
        history.push(`/battle/${res.data.battle.id}`);
        setMeta((meta) => ({ ...meta, error: false }));
      } catch (err) {
        setMeta((meta) => ({ ...meta, error: "Couldn't create a new battle !" }));
      }
    },
  });

  return (
    <Form>
      <label htmlFor="battleNameField">
        Battle name :
        {' '}
        <BattleNameField />
      </label>
      <button type="submit" disabled={!canSubmit}>Create</button>
      <p className="subtext">{isSubmitting ? 'Creating...' : null}</p>
      <p className="error">{isTouched && error ? error : null}</p>
    </Form>
  );
};

export default CreateBattleForm;
