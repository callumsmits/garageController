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

  const secureProps = {
    name: 'question',
  };
  if (secureState.state) {
    secureProps.name = 'circle-o-notch';
    secureProps.spin = true;
  } else {
    switch (secureState) {
      case 'ON':
        secureProps.name = 'unlock';
        break;
      case 'OFF':
        secureProps.name = 'lock';
        break;
      case 'TURN_ON_REQUEST':
        secureProps.name = 'circle-o-notch';
        secureProps.spin = true;
        break;
      case 'TURN_OFF_REQUEST':
        secureProps.name = 'circle-o-notch';
        secureProps.spin = true;
        break;
      default:
    }
  }

  return (
    <div>
      <FontAwesome {...secureProps} size="3x" fixedWidth cssModule={styles} />
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
