/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'react-form';

const validateBattleId = (value) => {
  if (!value) {
    return 'Enter a battle ID';
  }
  return false;
};

const BattleIdField = () => {
  const {
    meta: { error, isTouched }, getInputProps,
  } = useField('battleId', { validate: validateBattleId, defaultValue: '' });

  return (
    <>
      <input {...getInputProps()} />
      <p className="error">{isTouched && error ? error : null }</p>
    </>
  );
};

export default BattleIdField;
