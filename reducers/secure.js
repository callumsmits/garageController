import * as actionTypes from '../actions/actionTypes.js';

const secure = (state = 'OFF', action) => {
  switch (action.type) {
    case actionTypes.UNSECURE_DOOR:
      if (state === 'OFF') {
        return 'TURN_ON_REQUEST';
      }
      return state;
    case actionTypes.TURN_ON_REQUEST_COMPLETE:
      if (state === 'TURN_ON_REQUEST') {
        if (action.payload.secure !== 1) {
          return 'OFF';
        }
        return 'TURNING_ON';
      }
      return state;
    case actionTypes.TURN_ON_TIMEOUT:
      if (state === 'TURNING_ON') {
        return 'ON';
      }
      return state;
    case actionTypes.SECURE_DOOR:
      return 'OFF';
    default:
      return state;
  }
};

export default secure;
