import * as actionTypes from '../actions/actionTypes.js';

const secure = (state = 'OFF', action) => {
  switch (action.type) {
    case actionTypes.UNSECURE_DOOR:
      if (state === 'OFF') {
        return 'TURN_ON_REQUEST';
      }
      return state;
    case actionTypes.TURN_ON_REQUEST_COMPLETE:
      return 'TURNING_ON';
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
