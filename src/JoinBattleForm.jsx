/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { useForm, useField } from 'react-form';
import { useUserState } from './userContext';

const validateBattleId = (value) => {
  if (!value) {
    return 'Enter a battle ID';
  }
  return false;
};

const BattleIdField = () => {
  const {
    meta: { error, isTouched }, getInputProps,
  } = useField('battleId', { validate: validateBattleId });

  return (
    <>
      <input {...getInputProps()} />
      <p>{isTouched && error ? error : null }</p>
    </>
  );
};

const JoinBattleForm = () => {
  const { profile } = useUserState();
  // const history = useHistory();

  const {
    Form, meta: {
      isSubmitting, canSubmit, isTouched, error,
    }, setMeta,
  } = useForm({
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${process.env.API_URL}/join`, { profile, params: values });
        console.log(res.data.battle);
        setMeta((meta) => ({ ...meta, error: false }));
        // history.push(`/battle/${values.battleId}`);
      } catch (err) {
        setMeta((meta) => ({ ...meta, error: "Couldn't join battle !" }));
      }
    },
  });

  return (
    <Form>
      <div>
        <label htmlFor="battleIdField">
          Battle ID :
          {' '}
          <BattleIdField />
        </label>
      </div>
      <div>
        <button type="submit" disabled={!canSubmit}>Join</button>
      </div>
      <p>{isSubmitting ? 'Joining...' : null}</p>
      <p>{isTouched && error ? error : null}</p>
    </Form>
  );
};

export default JoinBattleForm;
