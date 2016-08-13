import React, { PropTypes } from 'react';

const StateChangeButton = ({ doorState, secureState, onStateButtonClick }) => {
  let buttonText = '';
  if (doorState === 'CLOSED') {
    buttonText = 'Open door';
  } else {
    buttonText = 'Close door';
  }

  return (
    <div>
      <button type="button" onClick={onStateButtonClick}>{buttonText}</button>
    </div>
  );
};

StateChangeButton.propTypes = {
  doorState: PropTypes.string.isRequired,
  secureState: PropTypes.string.isRequired,
  onStateButtonClick: PropTypes.func.isRequired,
};

export default StateChangeButton;
