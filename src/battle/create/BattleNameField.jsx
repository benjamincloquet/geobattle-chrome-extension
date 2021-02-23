/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'react-form';

const validateBattleName = (value) => {
  if (!value) {
    return 'Enter a battle name';
  }
  return false;
};

const BattleNameField = () => {
  const {
    meta: { error, isTouched }, getInputProps,
  } = useField('battleName', { validate: validateBattleName, defaultValue: '' });

  return (
    <>
      <input {...getInputProps()} />
      <p className="error">{isTouched && error ? error : null }</p>
    </>
  );
};

export default BattleNameField;
