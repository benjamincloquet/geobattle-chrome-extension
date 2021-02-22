/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import axios from 'axios';
import { useForm, useField } from 'react-form';
import { useUserState } from './userContext';

const validateBattleName = (value) => {
  if (!value) {
    return 'Enter a battle name';
  }
  return false;
};

const BattleNameField = () => {
  const {
    meta: { error, isTouched }, getInputProps,
  } = useField('battleName', { validate: validateBattleName });

  return (
    <>
      <input {...getInputProps()} />
      <p>{isTouched && error ? error : null }</p>
    </>
  );
};

const NewBattleForm = () => {
  const { profile } = useUserState();

  const {
    Form, meta: {
      isSubmitting, canSubmit, isTouched, error,
    }, setMeta,
  } = useForm({
    onSubmit: async (values) => {
      try {
        await axios.post(`${process.env.API_URL}/battle`, { profile, params: values });
        setMeta((meta) => ({ ...meta, error: false }));
      } catch (err) {
        setMeta((meta) => ({ ...meta, error: "Couldn't create a new battle !" }));
      }
    },
  });

  return (
    <Form>
      <div>
        <label htmlFor="battleNameField">
          Battle name :
          {' '}
          <BattleNameField />
        </label>
      </div>
      <div>
        <button type="submit" disabled={!canSubmit}>Create</button>
      </div>
      <p>{isSubmitting ? 'Creating...' : null}</p>
      <p>{isTouched && error ? error : null}</p>
    </Form>
  );
};

export default NewBattleForm;
