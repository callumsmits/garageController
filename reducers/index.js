import { combineReducers } from 'redux';

const garageReducer = (state = { secure: 'OFF', door: 'CLOSED' }, action) => {
  switch (action.type) {
    case 'UNSECURE_DOOR':
      if (state.secure === 'OFF') {
        return Object.assign({}, state, {
          secure: 'TURNING_ON',
        });
      }
      return state;
    case 'TURN_ON_TIMEOUT':
      if (state.secure === 'TURNING_ON') {
        return Object.assign({}, state, {
          secure: 'ON',
        });
      }
      return state;
    case 'SECURE_DOOR':
      return Object.assign({}, state, {
        secure: 'OFF',
      });
    default:
      return state;
  }
};

export default garageReducer;
