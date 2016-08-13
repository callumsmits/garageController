import React, { PropTypes } from 'react';

const StateDisplay = ({ doorState, secureState }) => {
  let stateText = '';
  switch (doorState) {
    case 'CLOSED':
      stateText = 'Closed';
      break;
    case 'OPEN':
      stateText = 'Open';
      break;
    case 'CLOSING':
      stateText = 'Closing';
      break;
    case 'OPENING':
      stateText = 'Opening';
      break;
    default:
      stateText = 'Unknown';
  }

  return (
    <div>
      <h2>{stateText}</h2>
    </div>
  );
};

StateDisplay.propTypes = {
  doorState: PropTypes.string.isRequired,
  secureState: PropTypes.string.isRequired,
};

export default StateDisplay;
