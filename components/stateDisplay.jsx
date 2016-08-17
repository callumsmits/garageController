import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import styles from 'font-awesome/css/font-awesome.css';


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

  let secureText = '';
  if (secureState.state) {
    secureText = 'Unlocking';
  } else {
    switch (secureState) {
      case 'ON':
        secureText = 'Unlocked';
        break;
      case 'OFF':
        secureText = 'Secure';
        break;
      case 'TURN_ON_REQUEST':
        secureText = 'Unlocking';
        break;
      case 'TURN_OFF_REQUEST':
        secureText = 'Locking';
        break;
      default:
    }
  }

      // <FontAwesome name="lock" size="5x" cssModule={styles} />

  return (
    <div>
      <h3>{secureText}</h3>
      <h2>{stateText}</h2>
    </div>
  );
};

StateDisplay.propTypes = {
  doorState: PropTypes.string.isRequired,
  secureState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default StateDisplay;
