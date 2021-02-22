/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, useField } from 'react-form';

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
  const history = useHistory();

  const {
    Form, meta: {
      isSubmitting, canSubmit, isTouched, error,
    },
  } = useForm({
    onSubmit: async (values) => {
      history.push(`/battle/${values.battleId}`);
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
