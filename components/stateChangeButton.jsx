import React, { PropTypes } from 'react';

import style from '../css/stateChangeButton.css';

const StateChangeButton = ({ doorState, secureState, unsecureAndOpenDoor, closeAndSecureDoor }) => {
  let buttonText = '';
  let clickFunction = unsecureAndOpenDoor;
  if (doorState === 'CLOSED') {
    buttonText = 'Open door';
    clickFunction = unsecureAndOpenDoor;
  } else {
    buttonText = 'Close door';
    clickFunction = closeAndSecureDoor;
  }

  let disabled = false;
  if (!((doorState === 'OPEN') || (doorState === 'CLOSED'))) {
    disabled = true;
  }

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
