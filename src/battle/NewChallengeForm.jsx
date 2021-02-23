import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useForm } from 'react-form';
import { useUserState } from '../userContext';
import ChallengeLinkField from './ChallengeLinkField';

const NewChallengeForm = ({ battleId, onAfterSubmit }) => {
  const { profile } = useUserState();

  const {
    Form, meta: {
      isSubmitting, canSubmit, isTouched, error,
    }, setMeta,
  } = useForm({
    onSubmit: async (values) => {
      try {
        const { data: { map: { name } } } = await axios.get(`https://www.geoguessr.com/api/v3/challenges/${values.token}`);
        await axios.post(`${process.env.API_URL}/challenge`, { profile, params: { ...values, battleId, map: { name } } });
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
