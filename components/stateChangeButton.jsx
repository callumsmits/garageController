import React, { PropTypes } from 'react';

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


  return (
    <div>
      <button type="button" onClick={clickFunction}>{buttonText}</button>
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
