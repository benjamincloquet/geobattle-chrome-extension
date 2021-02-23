import React from 'react';
import PropTypes from 'prop-types';

const Challenge = ({ challenge, index }) => {
  const onClick = () => {
    const url = `https://www.geoguessr.com/challenge/${challenge.token}`;
    chrome.tabs.create({ url });
  };

  return (
    <>
      <p>
        {`Challenge ${index} : `}
        <a href="blank" onClick={onClick}>{challenge.map.name}</a>
      </p>
    </>
  );
};

Challenge.propTypes = {
  challenge: PropTypes.shape({
    token: PropTypes.string.isRequired,
    map: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Challenge;
