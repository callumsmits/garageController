import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';
import componentStyles from '../css/stateDisplay.css';

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

  let divClass = componentStyles.intermediate;
  const secureProps = {
    name: 'question',
  };
  if (secureState.state) {
    secureProps.name = 'circle-o-notch';
    secureProps.spin = true;
    divClass = componentStyles.intermediate;
  } else {
    switch (secureState) {
      case 'ON':
        secureProps.name = 'unlock';
        divClass = componentStyles.unsecure;
        break;
      case 'OFF':
        secureProps.name = 'lock';
        divClass = componentStyles.secure;
        break;
      case 'TURN_ON_REQUEST':
        secureProps.name = 'circle-o-notch';
        secureProps.spin = true;
        divClass = componentStyles.intermediate;
        break;
      case 'TURN_OFF_REQUEST':
        secureProps.name = 'circle-o-notch';
        secureProps.spin = true;
        divClass = componentStyles.intermediate;
        break;
      default:
    }
  }
  divClass += ` ${componentStyles.box}`;
  return (
    <div className={divClass}>
      <div className={componentStyles.innerbox}>
        <FontAwesome
          {...secureProps}
          size="2x"
          fixedWidth
          className={componentStyles.icon}
          cssModule={faStyles}
        />
        <span className={componentStyles.text}>{stateText}</span>
      </div>
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
