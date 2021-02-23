/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import axios from 'axios';
import { useField } from 'react-form';

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
  } = useField('token', { validate: validateChallengeLink, filterValue: filterChallengeLink, defaultValue: '' });

  return (
    <>
      <input {...getInputProps()} />
      <p className="error">{isTouched && error ? error : null }</p>
    </>
  );
};

export default ChallengeLinkField;
