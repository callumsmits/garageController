import React, { PropTypes } from 'react';

import style from '../css/stateChangeButton.css';

const StateChangeButton = ({ doorState, secureState, unsecureAndOpenDoor, closeAndSecureDoor }) => {
  const isDoorClosed = (doorState === 'CLOSED');
  const buttonText = isDoorClosed ? 'Open door' : 'Close door';
  const clickFunction = isDoorClosed ? unsecureAndOpenDoor : closeAndSecureDoor;

  const disabled = !((doorState === 'OPEN')
    || ((doorState === 'CLOSED') && (secureState === 'OFF')));

  return (
    <div className={style.box}>
      <button
        type="button"
        className={style.btn}
        onClick={clickFunction}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </div>
  );
};

StateChangeButton.propTypes = {
  doorState: PropTypes.string.isRequired,
  secureState: PropTypes.string.isRequired,
  unsecureAndOpenDoor: PropTypes.func.isRequired,
  closeAndSecureDoor: PropTypes.func.isRequired,
};

export default StateChangeButton;
