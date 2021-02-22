/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useForm, useField } from 'react-form';
import { useUserState } from './userContext';

const validateChallengeLink = async (value) => {
  if (!value) {
    return 'Enter a challenge link';
  }
  try {
    await axios.get(`https://www.geoguessr.com/api/v3/challenges/${value}`);
    return false;
  } catch (err) {
    return 'Enter a valid challenge link';
  }
};

const filterChallengeLink = (value) => {
  const challengeToken = value.split('https://www.geoguessr.com/challenge/')[1];
  return challengeToken;
};

const ChallengeLinkField = () => {
  const {
    meta: { error, isTouched }, getInputProps,
  } = useField('token', { validate: validateChallengeLink, filterValue: filterChallengeLink });

  return (
    <>
      <input {...getInputProps()} />
      <p>{isTouched && error ? error : null }</p>
    </>
  );
};

const NewChallengeForm = ({ battleId, onAfterSubmit }) => {
  const { profile } = useUserState();

  const {
    Form, meta: {
      isSubmitting, canSubmit, isTouched, error,
    }, setMeta,
  } = useForm({
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${process.env.API_URL}/challenge`, { profile, params: { ...values, battleId } });
        console.log(res.data.battle);
        setMeta((meta) => ({ ...meta, error: false }));
        onAfterSubmit();
      } catch (err) {
        setMeta((meta) => ({ ...meta, error: "Couldn't add a new challenge !" }));
      }
    },
  });

  return (
    <Form>
      <div>
        <label htmlFor="challengeLinkField">
          Challenge link :
          {' '}
          <ChallengeLinkField />
        </label>
      </div>
      <div>
        <button type="submit" disabled={!canSubmit}>Add</button>
      </div>
      <p>{isSubmitting ? 'Adding...' : null}</p>
      <p>{isTouched && error ? error : null}</p>
    </Form>
  );
};

NewChallengeForm.propTypes = {
  battleId: PropTypes.string.isRequired,
  onAfterSubmit: PropTypes.func.isRequired,
};

export default NewChallengeForm;
