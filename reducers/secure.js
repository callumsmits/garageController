import * as actionTypes from '../actions/actionTypes.js';

const secure = (state = 'OFF', action) => {
  switch (action.type) {
    case actionTypes.TURN_ON_REQUEST:
      if (state === 'OFF') {
        return 'TURN_ON_REQUEST';
      }
      return state;
    case actionTypes.TURN_ON_REQUEST_COMPLETE:
      if (state === 'TURN_ON_REQUEST') {
        if (action.payload.secure !== 0) {
          return 'OFF';
        }
        return {
          state: 'TURNING_ON',
          id: action.payload.id,
        };
      }
      return state;
    case actionTypes.TURN_ON_TIMEOUT:
      if ((state.state === 'TURNING_ON') && (state.id === action.payload)) {
        return 'ON';
      }
      return state;
    case actionTypes.TURN_OFF_REQUEST:
      if (state === 'ON') {
        return 'TURN_OFF_REQUEST';
      }
      return state;
    case actionTypes.TURN_OFF_REQUEST_COMPLETE:
      if (state === 'TURN_OFF_REQUEST') {
        if ((action.error) || (action.payload.secure !== 1)) {
          return 'ON';
        }
        return 'OFF';
      }
      return state;
    case actionTypes.INITIAL_SET_SECURE_STATE:
      if (!action.error) {
        return action.payload;
      }
      return state;
    default:
      return state;
  }
};

export default secure;
