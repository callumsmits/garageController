import React, { PropTypes } from 'react';
import faStyles from 'font-awesome/css/font-awesome.css';
import FontAwesome from './reactFontAwesome.jsx';
import componentStyles from '../css/stateDisplay.css';

const StateDisplay = ({ doorState, secureState }) => {
  const stateText = (function doorStateToText() {
    switch (doorState) {
      case 'CLOSED':
        return 'Closed';
      case 'OPEN':
        return 'Open';
      case 'CLOSING':
        return 'Closing';
      case 'OPENING':
        return 'Opening';
      default:
        return 'Unknown';
    }
  }());

  const secureProps = (function secureStateToIconProps() {
    if (secureState.state) {
      return { name: 'circle-o-notch', spin: true };
    }
    switch (secureState) {
      case 'ON':
        return { name: 'unlock' };
      case 'OFF':
        return { name: 'lock' };
      case 'TURN_ON_REQUEST':
        return { name: 'circle-o-notch', spin: true };
      case 'TURN_OFF_REQUEST':
        return { name: 'circle-o-notch', spin: true };
      default:
        return { name: 'question' };
    }
  }());

  const divClassColour = (function secureStateToDivClassColour() {
    if (secureState.state) {
      return componentStyles.intermediate;
    }
    switch (secureState) {
      case 'ON':
        return componentStyles.unsecure;
      case 'OFF':
        return componentStyles.secure;
      case 'TURN_ON_REQUEST':
        return componentStyles.intermediate;
      case 'TURN_OFF_REQUEST':
        return componentStyles.intermediate;
      default:
        return componentStyles.intermediate;
    }
  }());
  const divClass = `${divClassColour} ${componentStyles.box}`;
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
